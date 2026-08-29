import { createHmac, timingSafeEqual } from "crypto";
import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_ROOM_DIR = path.resolve(__dirname, "..", "data-room");
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

// Load root .env (no dependency; Node >= 20.6). Serverless path gets env from
// the platform, so this only matters for the self-hosted/Docker path.
try {
  process.loadEnvFile(path.resolve(__dirname, "..", ".env"));
} catch {
  // No .env file — env vars may still come from the host environment.
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Access keys are director-issued, never self-serve. Comma-separated pairs:
 *  VAULT_ACCESS_KEYS="executive@fund.com:KEY1,analyst@dfa.gov:KEY2" */
function accessKeys(): Map<string, string> {
  const map = new Map<string, string>();
  const raw = process.env.VAULT_ACCESS_KEYS ?? "";
  for (const pair of raw.split(",")) {
    const idx = pair.indexOf(":");
    if (idx <= 0) continue;
    const email = pair.slice(0, idx).trim().toLowerCase();
    const key = pair.slice(idx + 1).trim();
    if (email && key) map.set(email, key);
  }
  return map;
}

function sessionSecret(): string | null {
  const secret = process.env.VAULT_SESSION_SECRET;
  if (!secret || secret.length < 16) return null;
  return secret;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function issueToken(email: string): string | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const payload = `${email}.${Date.now() + SESSION_TTL_MS}`;
  return `${Buffer.from(payload, "utf-8").toString("base64url")}.${sign(payload, secret)}`;
}

function verifyToken(token: string | undefined): { email: string } | null {
  const secret = sessionSecret();
  if (!secret || !token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  let payload: string;
  try {
    payload = Buffer.from(token.slice(0, dot), "base64url").toString("utf-8");
  } catch {
    return null;
  }
  if (!safeEqual(sign(payload, secret), token.slice(dot + 1))) return null;
  const lastDot = payload.lastIndexOf(".");
  if (lastDot <= 0) return null;
  const expiry = Number(payload.slice(lastDot + 1));
  const email = payload.slice(0, lastDot);
  if (!Number.isFinite(expiry) || expiry <= Date.now() || !email) return null;
  return { email };
}

function bearerOf(req: express.Request): string | undefined {
  const header = req.headers.authorization;
  if (typeof header !== "string" || !header.startsWith("Bearer ")) return undefined;
  return header.slice(7);
}

export interface VaultDocument {
  name: string;
  size: number;
  modified: string;
}

async function listDocuments(): Promise<VaultDocument[]> {
  let entries: import("fs").Dirent[];
  try {
    entries = await fs.readdir(DATA_ROOM_DIR, { withFileTypes: true });
  } catch {
    return []; // No data-room directory yet — honest empty state.
  }
  const docs: VaultDocument[] = [];
  for (const entry of entries) {
    // "." hidden files and the operator README are never served
    if (!entry.isFile() || entry.name.startsWith(".") || entry.name === "README.md") continue;
    const stat = await fs.stat(path.join(DATA_ROOM_DIR, entry.name));
    docs.push({ name: entry.name, size: stat.size, modified: stat.mtime.toISOString() });
  }
  return docs.sort((a, b) => a.name.localeCompare(b.name));
}

export function vaultLimiter({ windowMs, max }: { windowMs: number; max: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const now = Date.now();
    const key = "vault";
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }
    entry.count += 1;
    if (entry.count > max) {
      res.setHeader("Retry-After", Math.ceil((entry.resetAt - now) / 1000));
      res.status(429).json({ error: "Too many attempts. Please try again later." });
      return;
    }
    next();
  };
}

export function registerVaultRoutes(app: express.Express): void {
  const authLimiter = vaultLimiter({ windowMs: 15 * 60_000, max: 10 });

  app.post("/api/vault/auth", authLimiter, (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const key = typeof req.body?.key === "string" ? req.body.key.trim() : "";

    if (!email || !key) {
      res.status(400).json({ error: "Email and access key are required." });
      return;
    }
    if (!sessionSecret()) {
      res.status(503).json({ error: "Vault is not configured on this deployment. Please email contact@aiabasd.org." });
      return;
    }

    const expected = accessKeys().get(email);
    if (!expected || !safeEqual(key, expected)) {
      console.log(`[VAULT][DENIED] Failed authentication attempt`);
      res.status(401).json({ error: "Invalid credentials." });
      return;
    }

    const token = issueToken(email);
    if (!token) {
      res.status(503).json({ error: "Vault is not configured on this deployment." });
      return;
    }
    console.log(`[VAULT][SUCCESS] Session issued (8h)`);
    res.status(200).json({ token, expiresInMs: SESSION_TTL_MS });
  });

  app.get("/api/vault/documents", (req, res) => {
    const session = verifyToken(bearerOf(req));
    if (!session) {
      res.status(401).json({ error: "Session expired. Please authenticate again." });
      return;
    }
    listDocuments()
      .then((docs) => res.status(200).json({ documents: docs }))
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  });

  app.get("/api/vault/documents/:name", (req, res) => {
    const session = verifyToken(bearerOf(req));
    if (!session) {
      res.status(401).json({ error: "Session expired. Please authenticate again." });
      return;
    }
    const requested = typeof req.params.name === "string" ? req.params.name : "";
    // Only plain filenames inside data-room/ — traversal and hidden files are rejected.
    if (!requested || requested.startsWith(".") || requested.includes("/") || requested.includes("\\")) {
      res.status(400).json({ error: "Invalid document name." });
      return;
    }
    const resolved = path.join(DATA_ROOM_DIR, requested);
    if (path.dirname(resolved) !== DATA_ROOM_DIR) {
      res.status(400).json({ error: "Invalid document name." });
      return;
    }
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Disposition", `attachment; filename="${requested.replace(/["\\]/g, "")}"`);
    res.sendFile(resolved, (err) => {
      if (err && !res.headersSent) res.status(404).json({ error: "Document not found." });
    });
  });
}
