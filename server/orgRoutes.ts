import express, { type Express } from "express";
import { randomUUID } from "crypto";
import { PLATFORM_ORG_SLUG, inviteSchema, serviceClient, slugFromLead, sendInvitationEmail } from "./org";
import { getInquiry, updateInquiry } from "./storage";
import { LEAD_STAGES } from "./workflow";

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

  /** Creates (or reuses) a project room for a lead and invites the lead's
   *  email. Advances the lead to active-development with a history entry. */
  app.post("/api/admin/leads/:id/room", express.json({ limit: "8kb" }), async (req, res) => {
    const token = req.headers["x-admin-token"];
    if (!process.env.ADMIN_TOKEN || typeof token !== "string" || token !== process.env.ADMIN_TOKEN) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const id = req.params.id;
    if (typeof id !== "string" || !/^[a-f0-9]{8}$/.test(id)) {
      res.status(400).json({ error: "Invalid lead id." });
      return;
    }
    const lead = await getInquiry(id);
    if (!lead) {
      res.status(404).json({ error: "Inquiry not found" });
      return;
    }
    const revision = typeof req.body?.revision === "number" ? req.body.revision : -1;
    if ((lead.revision ?? 0) !== revision) {
      res.status(409).json({ error: "Inquiry changed. Reload before saving." });
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

    const slug = slugFromLead(lead.targetProject);
    let room = (await client.from("rooms").select("id,project_slug,title").eq("org_id", org.id).eq("project_slug", slug).maybeSingle()).data as
      | { id: string; project_slug: string; title: string }
      | null;
    let created = false;
    if (!room) {
      const title = `${lead.organization || lead.email} — ${slug}`.slice(0, 160);
      const inserted = await client
        .from("rooms")
        .insert({ org_id: org.id, project_slug: slug, title })
        .select("id,project_slug,title")
        .single();
      if (inserted.error || !inserted.data) {
        res.status(500).json({ error: "Room creation failed." });
        return;
      }
      room = inserted.data;
      created = true;
      await client.from("activity_log").insert({
        room_id: room.id,
        action: "room-created",
        detail: (lead.organization || "").slice(0, 500),
      });
    }

    let invited = false;
    if (lead.email && lead.consent) {
      const upserted = await client
        .from("org_invites")
        .upsert(
          {
            org_id: org.id,
            email: lead.email.toLowerCase(),
            role: "member",
            token: randomUUID(),
            accepted_at: null,
          },
          { onConflict: "org_id,email" }
        )
        .select("token")
        .single();
      if (!upserted.error && upserted.data) {
        invited = true;
        const origin = process.env.PUBLIC_APP_ORIGIN || "https://aiabasd.org";
        void sendInvitationEmail(lead.email, `${origin}/accept-invite?token=${upserted.data.token}`);
      }
    }

    const stage = lead.stage && (LEAD_STAGES as readonly string[]).includes(lead.stage) ? lead.stage : "active-development";
    const workflow = await updateInquiry(id, {
      stage: stage === "new" || stage === "qualified" || stage === "introduced" || stage === "assessment" ? "active-development" : (stage as typeof LEAD_STAGES[number]),
      assignee: lead.assignee ?? "",
      nextAction: lead.nextAction ?? "",
      revision: lead.revision ?? 0,
    });
    if (workflow.status === "conflict") {
      res.status(409).json({ error: "Inquiry changed. Reload before saving." });
      return;
    }

    res.status(200).json({ success: true, roomId: room.id, created, invited });
  });
}
