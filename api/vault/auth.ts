import { authenticate, SESSION_TTL_MS, vaultStorageAvailable } from "../../server/vault-core.js";
import { requestClientIp } from "../cors.js";

interface ServerlessRequest { method?: string; body: unknown; headers: Record<string, string | string[] | undefined>; }
interface ServerlessResponse { setHeader(name: string, value: string): unknown; status(code: number): ServerlessResponse; json(payload: unknown): void; end(): void; }

const hits = new Map<string, { count: number; resetAt: number }>();

function limited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) { hits.set(ip, { count: 1, resetAt: now + 15 * 60_000 }); return false; }
  entry.count += 1;
  return entry.count > 10;
}

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }
  if (limited(requestClientIp(req))) { res.setHeader("Retry-After", "900"); res.status(429).json({ error: "Too many attempts. Please try again later." }); return; }
  if (!(await vaultStorageAvailable())) { res.status(503).json({ error: "Vault storage is not configured on this deployment. Please email contact@aiabasd.org." }); return; }

  let body: unknown = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = null; } }
  const input = body as { email?: unknown; key?: unknown } | null;
  const result = authenticate(input?.email, input?.key);
  if (result === "unconfigured") { res.status(503).json({ error: "Vault is not configured on this deployment. Please email contact@aiabasd.org." }); return; }
  if (result === "invalid") { res.status(400).json({ error: "Invalid credentials." }); return; }
  res.status(200).json({ token: result, expiresInMs: SESSION_TTL_MS });
}
