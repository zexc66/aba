import { z } from "zod";
import { allowConfiguredOrigin, requestClientIp } from "./cors.js";

interface ServerlessRequest { method?: string; body: unknown; headers: Record<string, string | string[] | undefined>; }
interface ServerlessResponse { setHeader(name: string, value: string): unknown; status(code: number): ServerlessResponse; json(payload: unknown): void; end(): void; }

const trackSchema = z.object({
  consent: z.literal(true),
  path: z.string().trim().max(200).regex(/^\/[A-Za-z0-9\-._~!$&'()*+,;=:@%/?]*$/),
  event: z.enum(["service_view", "intelligence_view", "match_start", "match_submit", "investor_access_start", "investor_access_submit"]).optional(),
});

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) { hits.set(ip, { count: 1, resetAt: now + 60_000 }); return false; }
  entry.count += 1;
  return entry.count > 120;
}

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (!allowConfiguredOrigin(req, res)) return;
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }
  if (rateLimited(requestClientIp(req))) { res.status(429).json({ error: "Too many requests. Please try again later." }); return; }

  let body: unknown = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = null; } }
  const parsed = trackSchema.safeParse(body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid payload." }); return; }

  const path = parsed.data.path.split("?")[0].split("#")[0] || "/";
  const payload = { path, ...(parsed.data.event ? { event: parsed.data.event } : {}), retentionDays: 90 };
  const webhook = process.env.ANALYTICS_WEBHOOK_URL;
  if (!webhook) {
    res.setHeader("X-Analytics-Storage", "none");
    res.status(204).end();
    return;
  }

  try {
    const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    res.setHeader("X-Analytics-Storage", response.ok ? "webhook" : "unavailable");
  } catch {
    console.error("[ANALYTICS][WARN] Configured webhook unavailable");
    res.setHeader("X-Analytics-Storage", "unavailable");
  }
  // Analytics is best-effort. The response never claims durable Vercel storage.
  res.status(204).end();
}
