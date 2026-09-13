import { useState } from "react";

type Locale3 = "en" | "ar" | "fr";

const COPY = {
  en: { title: "Invite a member", email: "Institutional email", role: "Role", coordinator: "Coordinator", member: "Member", send: "Send invitation", sending: "Sending…", ready: "Invitation ready — share this one-time link or it was emailed if delivery is configured:", copy: "Copy link", copied: "Copied", failed: "The invitation could not be created. Check the connection and retry." },
  ar: { title: "دعوة عضو", email: "البريد المؤسسي", role: "الدور", coordinator: "منسق", member: "عضو", send: "إرسال الدعوة", sending: "جارٍ الإرسال…", ready: "الدعوة جاهزة — شارك رابط الاستخدام الواحد أو أُرسل بالبريد إذا كان الإرسال مهيأً:", copy: "نسخ الرابط", copied: "تم النسخ", failed: "تعذر إنشاء الدعوة. تحقق من الاتصال وأعد المحاولة." },
  fr: { title: "Inviter un membre", email: "E-mail institutionnel", role: "Rôle", coordinator: "Coordinateur", member: "Membre", send: "Envoyer l'invitation", sending: "Envoi…", ready: "Invitation prête — partagez ce lien à usage unique ou il a été envoyé si l'envoi est configuré :", copy: "Copier le lien", copied: "Copié", failed: "L'invitation n'a pas pu être créée. Vérifiez la connexion et réessayez." },
};

export default function AdminInvite({ token, locale }: { token: string; locale: Locale3 }) {
  const t = COPY[locale];
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"coordinator" | "member">("member");
  const [state, setState] = useState<"idle" | "busy" | "failed">("idle");
  const [acceptUrl, setAcceptUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const field = "mt-2 min-h-11 w-full border border-white/20 bg-[#11111a] px-3 py-2 text-sm text-[#fdfcfb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007]";

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (state === "busy") return;
    setState("busy");
    setCopied(false);
    try {
      const response = await fetch("/api/admin/org/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ email: email.trim(), role }),
      });
      if (!response.ok) throw new Error("rejected");
      const body = (await response.json()) as { acceptUrl?: string };
      setAcceptUrl(typeof body.acceptUrl === "string" ? body.acceptUrl : "");
      setEmail("");
      setState("idle");
    } catch {
      setState("failed");
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-[rgba(253,252,251,0.15)] pb-3">
        <h2 className="t-meta text-xs text-[#fdfcfb]/60 tracking-[0.12em]">ORG_INVITES</h2>
      </div>
      <form onSubmit={submit} className="grid items-end gap-4 md:grid-cols-[minmax(0,1fr)_10rem_auto]">
        <label className="text-sm">
          {t.email}
          <input required type="email" autoComplete="email" maxLength={254} dir="ltr" className={field} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="text-sm">
          {t.role}
          <select className={field} value={role} onChange={(e) => setRole(e.target.value as "coordinator" | "member")}>
            <option value="member">{t.member}</option>
            <option value="coordinator">{t.coordinator}</option>
          </select>
        </label>
        <button type="submit" disabled={state === "busy"} className="min-h-11 border border-[#f2a007]/60 px-4 py-2 text-sm text-[#f2a007] transition-colors hover:border-[#f2a007] hover:bg-[#f2a007]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] disabled:opacity-50">
          {state === "busy" ? t.sending : t.send}
        </button>
      </form>
      {acceptUrl && (
        <div role="status" className="space-y-2 border border-[#f2a007]/30 bg-[#f2a007]/5 p-4">
          <p className="text-sm text-[#fdfcfb]/80">{t.ready}</p>
          <div className="flex flex-wrap items-center gap-3">
            <code dir="ltr" className="t-data min-w-0 flex-1 break-all text-xs text-[#f2a007]">{acceptUrl}</code>
            <button
              type="button"
              className="min-h-11 shrink-0 border border-white/25 px-3 py-2 text-xs text-[#fdfcfb] hover:border-[#f2a007] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007]"
              onClick={() => {
                void navigator.clipboard.writeText(acceptUrl).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                });
              }}
            >
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>
      )}
      {state === "failed" && <p role="alert" className="text-sm text-red-300">{t.failed}</p>}
    </section>
  );
}
