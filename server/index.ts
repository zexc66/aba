import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";
import { generateChatResponse } from "./services/chatService";
import { aiConfigured, generateAiResponse } from "./services/aiChat";
import { saveInquiry, listInquiries } from "./storage";
import { notifyLead, acknowledgeLead } from "./notify";
import { recordPageview, readAnalytics } from "./analytics";
import { registerVaultRoutes } from "./vault";
import { registerRssRoute } from "./rss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// `type` is sanitized (word chars only) rather than allow-listed: new client
// audiences keep working without a server deploy. Structured intake fields are
// single-line labels (no control chars) chosen from client-side selects.
const label = z
  .string()
  .trim()
  .max(60)
  .regex(/^[^<>{};$`\\]*$/)
  .optional();

const inquirySchema = z.object({
  type: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9_-]{2,40}$/)
    .default("GENERAL"),
  email: z.email().max(254),
  name: z.string().trim().max(120).optional(),
  organization: z.string().trim().max(160).optional(),
  sector: label,
  region: label,
  ticket: label,
  timeline: label,
  locale: z.enum(["en", "ar", "fr"]).optional(),
  message: z.string().trim().max(4000).optional(),
});

const chatSchema = z.object({
  message: z.string().trim().min(1).max(2000),
});

function rateLimit({ windowMs, max }: { windowMs: number; max: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const key = req.ip ?? req.socket.remoteAddress ?? "unknown";
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
      res
        .status(429)
        .json({ error: "Too many requests. Please try again later." });
      return;
    }
    next();
  };
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "64kb" }));

  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()"
    );
    next();
  });

  const chatLimiter = rateLimit({ windowMs: 60_000, max: 30 });
  const inquiryLimiter = rateLimit({ windowMs: 60_000, max: 10 });

  app.post("/api/chat", chatLimiter, async (req, res) => {
    const parsed = chatSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: "Invalid message. Maximum 2000 characters." });
      return;
    }
    // Grounded assistant when configured; honest fallback to the rule-based
    // service on any failure so the visitor always gets an answer.
    if (aiConfigured()) {
      try {
        const aiResponse = await generateAiResponse(parsed.data.message);
        res.json({ response: aiResponse, source: "grounded" });
        return;
      } catch (error) {
        console.error("[CHAT][WARN] Grounded assistant failed, falling back:", error instanceof Error ? error.message : error);
      }
    }
    res.json({ response: generateChatResponse(parsed.data.message), source: "rules" });
  });

  app.post("/api/inquiry", inquiryLimiter, async (req, res) => {
    const parsed = inquirySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid inquiry payload." });
      return;
    }

    const entry = await saveInquiry(parsed.data);

    // No PII in standard logs — full record lives in the secure JSON store only
    console.log(
      `[PROTOCOL][SUCCESS] Lead ${entry.id} captured via ${entry.type}`
    );

    notifyLead(entry);
    acknowledgeLead(entry);

    res.status(200).json({
      success: true,
      message: "Institutional inquiry archived",
      reference: entry.id,
    });
  });

  const trackSchema = z.object({
    path: z.string().trim().max(200).regex(/^\/[A-Za-z0-9\-._~!$&'()*+,;=:@%/?]*$/),
  });

  app.post("/api/track", rateLimit({ windowMs: 60_000, max: 120 }), (req, res) => {
    const parsed = trackSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid payload." });
      return;
    }
    // Anonymous daily pageview buckets only — no IP, no UA, no identifiers
    recordPageview(parsed.data.path)
      .then(() => res.status(204).end())
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  });

  app.get("/api/admin/stats", (req, res) => {
    const token = req.headers["x-admin-token"];
    const expected = process.env.ADMIN_TOKEN;
    if (!expected || typeof token !== "string" || token !== expected) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    readAnalytics()
      .then((stats) => res.status(200).json(stats))
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  });

  app.get("/api/admin/leads", (req, res) => {
    const token = req.headers["x-admin-token"];
    const expected = process.env.ADMIN_TOKEN;
    if (!expected || typeof token !== "string" || token !== expected) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    listInquiries()
      .then((leads) =>
        res
          .status(200)
          .json({ leads: leads.slice().reverse() })
      )
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  });

  registerVaultRoutes(app);
  registerRssRoute(app);

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("/{*splat}", (req, res) => {
    if (req.path.startsWith("/api/")) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });

  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      if (
        typeof err === "object" &&
        err !== null &&
        (("status" in err &&
          typeof err.status === "number" &&
          err.status === 400) ||
          ("statusCode" in err &&
            typeof err.statusCode === "number" &&
            err.statusCode === 400))
      ) {
        res.status(400).json({ error: "Invalid JSON body." });
        return;
      }
      console.error("Unhandled error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  );

  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
