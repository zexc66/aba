import express, { type Express } from "express";
import { randomUUID } from "crypto";
import { PLATFORM_ORG_SLUG, inviteSchema, serviceClient } from "./org";

async function sendInvitationEmail(to: string, acceptUrl: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev",
        to: [to],
        subject: "AIABASD — Workspace invitation / دعوة مساحة العمل",
        text: [
          "You have been invited to the AIABASD project-room workspace.",
          "Accept your invitation by opening this one-time link:",
          acceptUrl,
          "",
          "تمت دعوتك إلى مساحة عمل غرف مشاريع التحالف. اقبل الدعوة عبر الرابط أعلاه.",
          "",
          "If you were not expecting this invitation, ignore this email.",
        ].join("\n"),
      }),
    });
  } catch {
    // Best effort: the invite row exists and can be re-sent.
  }
}

export function registerOrgRoutes(app: Express): void {
  app.post("/api/admin/org/invite", express.json({ limit: "8kb" }), async (req, res) => {
    const token = req.headers["x-admin-token"];
    if (!process.env.ADMIN_TOKEN || typeof token !== "string" || token !== process.env.ADMIN_TOKEN) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const parsed = inviteSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid invitation payload." });
      return;
    }
    const client = serviceClient();
    if (!client) {
      res.status(503).json({ error: "Member access is not configured." });
      return;
    }
    const org = (await client.from("organizations").select("id").eq("slug", PLATFORM_ORG_SLUG).maybeSingle()).data;
    if (!org) {
      res.status(500).json({ error: "Platform organization is missing." });
      return;
    }
    const inviteToken = randomUUID();
    const upserted = await client
      .from("org_invites")
      .upsert(
        {
          org_id: org.id,
          email: parsed.data.email.toLowerCase(),
          role: parsed.data.role,
          token: inviteToken,
          accepted_at: null,
        },
        { onConflict: "org_id,email" }
      )
      .select("token")
      .single();
    if (upserted.error || !upserted.data) {
      res.status(500).json({ error: "Invitation could not be stored." });
      return;
    }
    const origin = process.env.PUBLIC_APP_ORIGIN || "https://aiabasd.org";
    const acceptUrl = `${origin}/accept-invite?token=${upserted.data.token}`;
    void sendInvitationEmail(parsed.data.email, acceptUrl);
    res.status(200).json({ success: true, acceptUrl });
  });
}
