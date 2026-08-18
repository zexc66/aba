import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";
import { generateChatResponse } from "./services/chatService";
import { saveInquiry } from "./storage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// `type` is sanitized (word chars only) rather than allow-listed: new client
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

  app.post("/api/chat", chatLimiter, (req, res) => {
    const parsed = chatSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: "Invalid message. Maximum 2000 characters." });
      return;
    }
    res.json({ response: generateChatResponse(parsed.data.message) });
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

    res.status(200).json({
      success: true,
      message: "Institutional inquiry archived",
      reference: entry.id,
    });
  });

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
