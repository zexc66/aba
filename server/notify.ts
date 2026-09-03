/** Optional lead delivery channels for the self-hosted path.
 *  Both are fire-and-forget: a notification failure never loses the lead
 *  (the record is already persisted) — it is only logged. */

interface LeadPayload {
  id: string;
  type: string;
  email: string;
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
  stage?: string;
  priority?: string;
  message?: string;
}

export async function notifyByEmail(payload: LeadPayload): Promise<boolean> {
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
        `Stage: ${payload.stage ?? "new"}`,
        `Priority: ${payload.priority ?? "normal"}`,
        "",
        payload.message ?? "",
      ].join("\n"),
    }),
  });
  return response.ok;
}

export async function notifyByWebhook(payload: LeadPayload): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New AIABASD lead ${payload.id} [${payload.type}] from ${payload.organization ?? payload.email}`,
      lead: payload,
    }),
  });
  return response.ok;
}

/** Deliver through every configured channel; never throws. */
export function notifyLead(payload: LeadPayload): void {
  const channels: Promise<boolean>[] = [];
  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL) {
    channels.push(notifyByEmail(payload).catch(() => false));
  }
  if (process.env.LEAD_WEBHOOK_URL) {
    channels.push(notifyByWebhook(payload).catch(() => false));
  }
  if (channels.length === 0) return;
  void Promise.all(channels).then((results) => {
    if (results.some((ok) => !ok)) {
      console.error(`[PROTOCOL][WARN] Lead ${payload.id}: one or more notification channels failed`);
    }
  });
}

type Locale = "en" | "ar" | "fr";

async function sendEmail(to: string, subject: string, text: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev",
      to: [to],
      subject,
      text,
    }),
  });
  return response.ok;
}

const ACK_COPY: Record<Locale, { subject: string; body: (id: string) => string }> = {
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

const WELCOME_COPY: Record<Locale, { subject: string; body: string }> = {
  en: {
    subject: "AIABASD — Subscription confirmed",
    body: "Thank you for subscribing to updates from the African International Alliance for Business & Sustainable Development.\n\nYou will receive occasional institutional updates — program milestones, governance notes, and public announcements. No marketing, no data sharing.\n\nYou were already on our list if this was not you — no action is needed.",
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

function normalizeLocale(value: unknown): Locale {
  return value === "ar" || value === "fr" ? value : "en";
}

/** Acknowledge the inquirer with their reference ID. Fire-and-forget. */
export function acknowledgeLead(payload: LeadPayload & { locale?: string }): void {
  const locale = normalizeLocale(payload.locale);
  const copy = payload.type === "NEWSLETTER" ? WELCOME_COPY[locale] : ACK_COPY[locale];
  const body = typeof copy.body === "function" ? copy.body(payload.id) : copy.body;
  void sendEmail(payload.email, copy.subject, body).catch(() => false);
}
