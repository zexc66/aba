import { allowConfiguredOrigin, requestClientIp } from "./cors.js";
import { acceptInvite } from "../server/org.js";

interface ServerlessRequest {
  method?: string;
  body: unknown;
  headers: Record<string, string | string[] | undefined>;
}

interface ServerlessResponse {
  setHeader(name: string, value: string): unknown;
  status(code: number): { json(payload: unknown): void; end(): void };
}

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 10;
}

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  if (!allowConfiguredOrigin(req, res)) return;

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (rateLimited(requestClientIp(req))) {
    res.status(429).json({ error: "Too many requests. Please try again later." });
    return;
  }

  let body: unknown = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }
  const token = (body as { token?: unknown } | null)?.token;
  if (typeof token !== "string") {
    res.status(400).json({ error: "invalid" });
    return;
  }

  const auth = req.headers.authorization;
  const jwt = typeof auth === "string" && auth.startsWith("Bearer ") ? auth.slice(7) : undefined;

  const outcome = await acceptInvite(token, jwt);
  res.status(outcome.status).json(outcome.body);
}
