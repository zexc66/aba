import { createHmac, timingSafeEqual } from "crypto";
import fs from "fs/promises";
import path from "path";

try {
  process.loadEnvFile(path.resolve(process.cwd(), ".env"));
} catch {
  // Hosted runtimes inject environment variables directly.
}

export const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

// Self-hosted and Vercel both resolve this from the project root. A custom path
// is supported for object-storage mounts, but is never accepted from a client.
export const DATA_ROOM_DIR = path.resolve(process.env.VAULT_DATA_ROOM_DIR ?? path.join(process.cwd(), "data-room"));
const VAULT_SENTINEL_VALUE = "AIABASD_VAULT_READY";

export interface VaultDocument {
  name: string;
  size: number;
  modified: string;
}

export interface VaultFile {
  name: string;
  size: number;
  modified: string;
  body: Buffer;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Access keys are director-issued, never self-serve. */
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
  return secret && secret.length >= 16 ? secret : null;
}

export function vaultConfigured(): boolean {
  return Boolean(sessionSecret() && accessKeys().size > 0 && vaultStorageConfigured());
}

/** Vercel requires an explicit mounted filesystem; its default filesystem is ephemeral. */
export function vaultStorageConfigured(): boolean {
  if (process.env.VERCEL) {
    return process.env.VAULT_STORAGE_MODE === "filesystem" &&
      Boolean(process.env.VAULT_DATA_ROOM_DIR) &&
      Boolean(storageSentinelName());
  }
  return true;
}

function storageSentinelName(): string | null {
  const name = process.env.VAULT_STORAGE_SENTINEL?.trim();
  return name && /^[A-Za-z0-9][A-Za-z0-9._-]{0,100}$/.test(name) ? name : null;
}

export async function vaultStorageAvailable(): Promise<boolean> {
  if (!vaultStorageConfigured()) return false;
  try {
    const stat = await fs.stat(DATA_ROOM_DIR);
    if (!stat.isDirectory()) return false;
    if (!process.env.VERCEL) return true;

    const sentinel = storageSentinelName();
    if (!sentinel) return false;
    const sentinelStat = await fs.stat(path.join(DATA_ROOM_DIR, sentinel));
    if (!sentinelStat.isFile()) return false;
    return (await fs.readFile(path.join(DATA_ROOM_DIR, sentinel), "utf-8")).trim() === VAULT_SENTINEL_VALUE;
  } catch {
    return false;
  }
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function issueToken(email: string): string | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const payload = `${email}.${Date.now() + SESSION_TTL_MS}`;
  return `${Buffer.from(payload, "utf-8").toString("base64url")}.${sign(payload, secret)}`;
}

export function verifyToken(token: string | undefined): { email: string } | null {
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

export function bearerToken(header: unknown): string | undefined {
  return typeof header === "string" && header.startsWith("Bearer ") ? header.slice(7) : undefined;
}

export function authenticate(emailInput: unknown, keyInput: unknown): string | "invalid" | "unconfigured" {
  if (!vaultConfigured()) return "unconfigured";
  const email = typeof emailInput === "string" ? emailInput.trim().toLowerCase() : "";
  const key = typeof keyInput === "string" ? keyInput.trim() : "";
  if (!email || !key) return "invalid";
  const expected = accessKeys().get(email);
  if (!expected || !safeEqual(key, expected)) return "invalid";
  return issueToken(email) ?? "unconfigured";
}

/** Only simple, visible filenames are eligible for the data room. */
export function isSafeDocumentName(name: string): boolean {
  return Boolean(
    name &&
      name !== "README.md" &&
      !name.startsWith(".") &&
      !name.includes("/") &&
      !name.includes("\\") &&
      !name.includes("\0") &&
      /^[A-Za-z0-9][A-Za-z0-9._ -]{0,180}$/.test(name)
  );
}

export async function listDocuments(): Promise<VaultDocument[]> {
  let entries: import("fs").Dirent[];
  try {
    entries = await fs.readdir(DATA_ROOM_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const docs: VaultDocument[] = [];
  for (const entry of entries) {
    if (!entry.isFile() || entry.name === storageSentinelName() || !isSafeDocumentName(entry.name)) continue;
    try {
      const stat = await fs.stat(path.join(DATA_ROOM_DIR, entry.name));
      if (stat.isFile()) docs.push({ name: entry.name, size: stat.size, modified: stat.mtime.toISOString() });
    } catch {
      // A file removed during listing is simply omitted.
    }
  }
  return docs.sort((a, b) => a.name.localeCompare(b.name));
}

export async function readDocument(name: string): Promise<VaultFile | null> {
  if (!isSafeDocumentName(name) || name === storageSentinelName()) return null;
  const candidate = path.resolve(DATA_ROOM_DIR, name);
  if (path.dirname(candidate) !== DATA_ROOM_DIR) return null;

  try {
    // Resolve symlinks before reading so a document cannot escape the data room.
    const resolved = await fs.realpath(candidate);
    if (path.dirname(resolved) !== DATA_ROOM_DIR) return null;
    const stat = await fs.stat(resolved);
    if (!stat.isFile()) return null;
    return { name, size: stat.size, modified: stat.mtime.toISOString(), body: await fs.readFile(resolved) };
  } catch {
    return null;
  }
}
