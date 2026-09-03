import { generateChatResponse } from "../server/services/chatService.js";
import { allowConfiguredOrigin, requestClientIp } from "./cors.js";
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

const hits = new Map<string, { count: number; resetAt: number }>();

const chatSchema = z.object({
  message: z.string().trim().min(1).max(2000),
  locale: z.enum(["en", "ar", "fr"]).optional(),
});

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 30;
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

  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid message. Maximum 2000 characters." });
    return;
  }

  // Public chat is intentionally deterministic until structured fact IDs
  // and citations exist for model output. Never expose free-form Gemini text.
  res.status(200).json({ response: generateChatResponse(parsed.data.message, parsed.data.locale), source: "rules" });
}
