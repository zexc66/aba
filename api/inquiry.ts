import { randomUUID } from "crypto";
import { z } from "zod";
import { allowConfiguredOrigin, requestClientIp } from "./cors.js";

interface ServerlessRequest {
  method?: string;
  body: unknown;
  headers: Record<string, string | string[] | undefined>;
}

interface ServerlessResponse {
  setHeader(name: string, value: string): unknown;
  status(code: number): { json(payload: unknown): void; end(): void };
}

const label = z
  .string()
  .trim()
  .max(60)
  .regex(/^[^<>{};$`\\]*$/)
  .optional();
const longLabel = z.string().trim().max(500).regex(/^[^<>{};$`\\]*$/).optional();

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
  partyType: label,
  sectors: longLabel,
  countries: longLabel,
  capabilities: longLabel,
  capitalBand: label,
  targetProject: z.string().trim().max(160).optional(),
  targetService: label,
  role: label,
  interest: z.string().trim().max(500).optional(),
  consent: z.literal(true),
  locale: z.enum(["en", "ar", "fr"]).optional(),
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

type InquiryDeliveryPayload = {
  id: string;
  type: string;
  email: string;
  stage: "new";
  priority: "normal";
  name?: string;
  organization?: string;
  sector?: string;
  region?: string;
  ticket?: string;
  timeline?: string;
  partyType?: string;
  sectors?: string;
  countries?: string;
  capabilities?: string;
  capitalBand?: string;
  targetProject?: string;
  targetService?: string;
  role?: string;
  interest?: string;
  locale?: "en" | "ar" | "fr";
  consent: true;
  message?: string;
};

function deliveryPayload(id: string, data: z.infer<typeof inquirySchema>): InquiryDeliveryPayload {
  return {
    id,
    type: data.type,
    email: data.email,
    stage: "new",
    priority: "normal",
    name: data.name,
    organization: data.organization,
    sector: data.sector,
    region: data.region,
    ticket: data.ticket,
    timeline: data.timeline,
    partyType: data.partyType,
    sectors: data.sectors,
    countries: data.countries,
    capabilities: data.capabilities,
    capitalBand: data.capitalBand,
    targetProject: data.targetProject,
    targetService: data.targetService,
    role: data.role,
    interest: data.interest,
    locale: data.locale,
    consent: data.consent,
    message: data.message,
  };
}

async function notifyByEmail(payload: InquiryDeliveryPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.error(`[PROTOCOL][EMAIL_CONFIG] Missing ${!apiKey ? "RESEND_API_KEY" : "LEAD_NOTIFY_EMAIL"}`);
    return false;
  }

  try {
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
          `Stage: ${payload.stage}`,
          `Priority: ${payload.priority}`,
          `Name: ${payload.name ?? "—"}`,
          `Organization: ${payload.organization ?? "—"}`,
          `Sector: ${payload.sector ?? "—"}`,
          `Region: ${payload.region ?? "—"}`,
          `Ticket: ${payload.ticket ?? "—"}`,
          `Timeline: ${payload.timeline ?? "—"}`,
          `Party type: ${payload.partyType ?? "—"}`,
          `Role: ${payload.role ?? "—"}`,
          `Interest: ${payload.interest ?? "—"}`,
          `Sectors: ${payload.sectors ?? "—"}`,
          `Countries: ${payload.countries ?? "—"}`,
          `Capabilities: ${payload.capabilities ?? "—"}`,
          `Capital band: ${payload.capitalBand ?? "—"}`,
          `Target project: ${payload.targetProject ?? "—"}`,
          `Target service: ${payload.targetService ?? "—"}`,
          "",
          payload.message ?? "",
        ].join("\n"),
      }),
    });
    if (!response.ok) console.error(`[PROTOCOL][EMAIL_REJECTED] Resend returned HTTP ${response.status}`);
    return response.ok;
  } catch (error) {
    console.error(`[PROTOCOL][EMAIL_FAILURE] Resend request failed: ${error instanceof Error ? error.name : "unknown"}`);
    return false;
  }
}

async function notifyByWebhook(payload: InquiryDeliveryPayload): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New AIABASD lead ${payload.id} [${payload.type}]`,
      // Explicit delivery shape: accepted inquiry fields only; no raw request
      // body, access keys, or server secrets are forwarded.
      lead: payload,
    }),
  });
  return response.ok;
}

const ACK_COPY: Record<string, { subject: string; body: (id: string) => string }> = {
  en: {
    subject: "AIABASD — Inquiry received",
    body: (id) =>
      `Thank you for reaching out to the African International Alliance for Business & Sustainable Development.\n\nYour inquiry has been registered under reference ${id}. A partner typically responds within two business days.\n\nPlease keep this reference for correspondence. No action is required from you.`,
  },
  ar: {
    subject: "AIABASD — تم استلام استفسارك",
    body: (id) =>
      `شكراً لتواصلك مع التحالف الدولي الأفريقي للأعمال والتنمية المستدامة.\n\nتم تسجيل استفسارك تحت الرقم المرجعي ${id}. وعادةً يرد أحد الشركاء خلال يومي عمل.\n\nيرجى الاحتفاظ بهذا الرقم للمراسلات. لا حاجة لأي إجراء من جانبك.`,
  },
  fr: {
    subject: "AIABASD — Demande reçue",
    body: (id) =>
      `Merci d'avoir contacté l'Alliance Internationale Africaine pour les Affaires et le Développement Durable.\n\nVotre demande a été enregistrée sous la référence ${id}. Un associé répond généralement sous deux jours ouvrés.\n\nVeuillez conserver cette référence pour toute correspondance. Aucune action n'est requise de votre part.`,
  },
};

const WELCOME_COPY: Record<string, { subject: string; body: string }> = {
  en: {
    subject: "AIABASD — Subscription confirmed",
    body: "Thank you for subscribing to updates from the African International Alliance for Business & Sustainable Development.\n\nYou will receive occasional institutional updates — program milestones, governance notes, and public announcements. No marketing, no data sharing.",
  },
  ar: {
    subject: "AIABASD — تم تأكيد الاشتراك",
    body: "شكراً لاشتراكك في التحديثات من التحالف الدولي الأفريقي للأعمال والتنمية المستدامة.\n\nستصلك تحديثات مؤسسية من حين لآخر — معالم البرامج وملاحظات الحوكمة والإعلانات العامة. بلا رسائل تسويقية وبلا مشاركة بيانات.",
  },
  fr: {
    subject: "AIABASD — Abonnement confirmé",
    body: "Merci de vous être abonné aux mises à jour de l'Alliance Internationale Africaine pour les Affaires et le Développement Durable.\n\nVous recevrez occasionnellement des mises à jour institutionnelles — jalons de programmes, notes de gouvernance et annonces publiques. Pas de marketing, pas de partage de données.",
  },
};

async function sendVisitorEmail(
  to: string,
  locale: string | undefined,
  type: string,
  id: string
): Promise<void> {
  const localeKey = locale === "ar" || locale === "fr" ? locale : "en";
  const copy = type === "NEWSLETTER" ? WELCOME_COPY[localeKey] : ACK_COPY[localeKey];
  const body = typeof copy.body === "function" ? copy.body(id) : copy.body;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev",
      to: [to],
      subject: copy.subject,
      text: body,
    }),
  }).catch(() => undefined);
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

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => issue.path.join(".") || "payload");
    console.warn(`[PROTOCOL][REJECT] Inquiry validation failed: ${fields.join(",")}`);
    res.status(400).json({ error: "Invalid inquiry payload.", fields });
    return;
  }

  const id = randomUUID().slice(0, 8);

  // Serverless has no durable disk: without a notification channel configured,
  // admitting the lead would silently lose it — fail honestly instead so the
  // UI shows its error state and the visitor can email directly.
  const delivered = (
    await Promise.all([
      notifyByEmail(deliveryPayload(id, parsed.data)).catch(() => false),
      notifyByWebhook(deliveryPayload(id, parsed.data)).catch(() => false),
    ])
  ).some(Boolean);
  if (!delivered) {
    console.error(`[PROTOCOL][FAILURE] Lead ${id} (${parsed.data.type}) dropped: no delivery channel configured`);
    res.status(503).json({ error: "Lead capture is not configured on this deployment. Please email contact@aiabasd.org." });
    return;
  }

  console.log(`[PROTOCOL][SUCCESS] Lead ${id} captured via ${parsed.data.type}`);
  if (process.env.RESEND_API_KEY) {
    void sendVisitorEmail(parsed.data.email, parsed.data.locale, parsed.data.type, id);
  }
  res.status(200).json({ success: true, message: "Institutional inquiry archived", reference: id });
}
