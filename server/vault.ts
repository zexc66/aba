import express from "express";
import { authenticate, bearerToken, listDocuments, readDocument, SESSION_TTL_MS, verifyToken, vaultStorageAvailable } from "./vault-core";

export { type VaultDocument } from "./vault-core";

export function vaultLimiter({ windowMs, max }: { windowMs: number; max: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    const key = _req.ip ?? _req.socket.remoteAddress ?? "unknown";
    const now = Date.now();
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

function contentDisposition(name: string): string {
  return `attachment; filename="${name}"`;
}

export function registerVaultRoutes(app: express.Express): void {
  const authLimiter = vaultLimiter({ windowMs: 15 * 60_000, max: 10 });

  app.post("/api/vault/auth", authLimiter, async (req, res) => {
    if (!(await vaultStorageAvailable())) {
      res.status(503).json({ error: "Vault storage is not configured on this deployment. Please email contact@aiabasd.org." });
      return;
    }
    const result = authenticate(req.body?.email, req.body?.key);
    if (result === "unconfigured") {
      res.status(503).json({ error: "Vault is not configured on this deployment. Please email contact@aiabasd.org." });
      return;
    }
    if (result === "invalid") {
      res.status(400).json({ error: "Invalid credentials." });
      return;
    }
    res.status(200).json({ token: result, expiresInMs: SESSION_TTL_MS });
  });

  app.get("/api/vault/documents", async (req, res) => {
    if (!(await vaultStorageAvailable())) {
      res.status(503).json({ error: "Vault storage is not configured on this deployment. Please email contact@aiabasd.org." });
      return;
    }
    if (!verifyToken(bearerToken(req.headers.authorization))) {
      res.status(401).json({ error: "Session expired. Please authenticate again." });
      return;
    }
    res.status(200).json({ documents: await listDocuments() });
  });

  app.get("/api/vault/documents/:name", async (req, res) => {
    if (!(await vaultStorageAvailable())) {
      res.status(503).json({ error: "Vault storage is not configured on this deployment. Please email contact@aiabasd.org." });
      return;
    }
    if (!verifyToken(bearerToken(req.headers.authorization))) {
      res.status(401).json({ error: "Session expired. Please authenticate again." });
      return;
    }
    const document = await readDocument(typeof req.params.name === "string" ? req.params.name : "");
    if (!document) {
      res.status(404).json({ error: "Document not found." });
      return;
    }
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "private, no-store");
    res.setHeader("Content-Disposition", contentDisposition(document.name));
    res.setHeader("Content-Length", String(document.size));
    res.type("application/octet-stream").send(document.body);
  });
}
