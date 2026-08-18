import { randomUUID } from "crypto";
import { z } from "zod";

interface ServerlessRequest {
  method?: string;
  body: unknown;
  headers: Record<string, string | string[] | undefined>;
}

interface ServerlessResponse {
  setHeader(name: string, value: string): unknown;
  status(code: number): { json(payload: unknown): void; end(): void };
}

const inquirySchema = z.object({
  type: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9_-]{2,40}$/)
    .default("GENERAL"),
  email: z.email().max(254),
  name: z.string().trim().max(120).optional(),
  organization: z.string().trim().max(160).optional(),
  message: z.string().trim().max(4000).optional(),
});

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

function clientIp(req: ServerlessRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  return typeof fwd === "string" ? fwd.split(",")[0].trim() : "unknown";
}

async function notifyByEmail(payload: {
  id: string;
  type: string;
  email: string;
  name?: string;
  organization?: string;
  message?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev",
      to: [to],
      subject: `[AIABASD Lead][${payload.type}] ${payload.id}`,
      text: [
        `Reference: ${payload.id}`,
        `Type: ${payload.type}`,
        `Email: ${payload.email}`,
        `Name: ${payload.name ?? "—"}`,
        `Organization: ${payload.organization ?? "—"}`,
        "",
        payload.message ?? "",
      ].join("\n"),
    }),
  });
  return response.ok;
}

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (rateLimited(clientIp(req))) {
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

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid inquiry payload." });
    return;
  }

  const id = randomUUID().slice(0, 8);

  // Serverless has no durable disk: without a notification channel configured,
  // admitting the lead would silently lose it — fail honestly instead so the
  // UI shows its error state and the visitor can email directly.
  const delivered = await notifyByEmail({ id, ...parsed.data }).catch(() => false);
  if (!delivered) {
    console.error(`[PROTOCOL][FAILURE] Lead ${id} (${parsed.data.type}) dropped: no delivery channel configured`);
    res.status(503).json({ error: "Lead capture is not configured on this deployment. Please email contact@aiabasd.org." });
    return;
  }

  console.log(`[PROTOCOL][SUCCESS] Lead ${id} captured via ${parsed.data.type}`);
  res.status(200).json({ success: true, message: "Institutional inquiry archived", reference: id });
}
