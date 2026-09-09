import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, ArrowLeft, UserPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { catalogProjectOptions } from "@/platform";
import { trackEvent } from "@/services/analytics";
import { localizedLinkPath } from "@/localePath";

const VAULT_TOKEN_KEY = "aiabasd-vault-token";

export default function InvestorLogin() {
  const [, setLocation] = useLocation();
  const { lang, content, isRTL } = useLanguageContext();
  const t = content.investor;

  const [mode, setMode] = useState<"auth" | "request">("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [partyType, setPartyType] = useState("");
  const [interest, setInterest] = useState("");
  const [targetProject, setTargetProject] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    trackEvent("investor_access_start");
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    trackEvent("investor_access_submit");

    try {
      const response = await fetch("/api/vault/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, key }),
      });

      if (response.ok) {
        const body = (await response.json()) as { token?: string };
        if (typeof body.token === "string" && body.token) {
          try {
            sessionStorage.setItem(VAULT_TOKEN_KEY, body.token);
          } catch {
            // Storage unavailable — token kept in memory is not enough for the
            // next page; surface it honestly.
            toast.error(t.authNetwork);
            return;
          }
          setLocation("/investor-portal/vault");
          return;
        }
        toast.error(t.authFailed);
      } else if (response.status === 401 || response.status === 400) {
        toast.error(t.authFailed);
      } else {
        toast.error(t.authNetwork);
      }
    } catch {
      toast.error(t.authNetwork);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setIsLoading(true);
    trackEvent("investor_access_submit");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "INVESTOR_ACCESS",
          email,
          organization,
          role,
          partyType,
          interest,
          targetProject,
          message,
          consent: true,
          locale: lang,
        }),
      });

      if (response.ok) {
        toast.success(t.toastSuccess);
        toast.info(t.toastQueued);
        setLocation("/");
      } else {
        toast.error(t.toastFailed);
      }
    } catch {
      toast.error(t.toastNetwork);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#0b0b10] text-[#fdfcfb] flex flex-col justify-between p-6 md:p-12 relative ${isRTL ? "font-arabic" : "font-sans"}`}
    >
      <SEO
        title={`${t.vaultTitle} | AIABASD`}
        description={t.subtitle}
        lang={lang}
        url="/investor-portal"
      />

      <header className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 py-4">
        <Link href={localizedLinkPath("/", lang)} asChild>
          <a className="inline-flex items-center gap-2 t-meta text-xs text-[#fdfcfb]/70 hover:text-[#f2a007] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2">
            <ArrowLeft size={14} className="rtl:-scale-x-100 shrink-0" aria-hidden="true" />
            <span>{t.backLabel}</span>
          </a>
        </Link>

        <div className="flex items-center gap-2 t-meta text-xs font-semibold text-[#f2a007]">
          <ShieldCheck size={16} aria-hidden="true" />
          <span>{t.secureLabel}</span>
        </div>
      </header>

      <div className="w-full max-w-md mx-auto my-auto z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-[#11111a] p-8 md:p-10 border border-white/15 shadow-[0_24px_48px_-12px_rgba(90,31,46,0.25)] space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-[#5a1f2e]/20 text-[#f2a007] border border-[#5a1f2e]/40 flex items-center justify-center mx-auto">
              {mode === "auth" ? <Lock size={22} aria-hidden="true" /> : <UserPlus size={22} aria-hidden="true" />}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#fdfcfb] tracking-tight">
              {mode === "auth" ? t.vaultTitle : t.requestAccessTitle}
            </h1>
            <p className="text-sm text-[#fdfcfb]/60 leading-relaxed">
              {mode === "auth" ? t.vaultSubtitle : t.requestAccessNote}
            </p>
          </div>

          {mode === "auth" ? (
            <form onSubmit={handleAuth} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="investor-auth-email" className="block t-meta text-[10px] text-[#fdfcfb]/70">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#fdfcfb]/40 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="investor-auth-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full bg-white/[0.06] border border-white/15 ps-11 pe-4 py-3 text-sm text-[#fdfcfb] placeholder:text-[#fdfcfb]/45 outline-none focus:border-[#f2a007] focus-visible:ring-1 focus-visible:ring-[#f2a007] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="investor-access-key" className="block t-meta text-[10px] text-[#fdfcfb]/70">
                  {t.keyLabel}
                </label>
                <div className="relative">
                  <KeyRound
                    size={16}
                    className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#fdfcfb]/40 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="investor-access-key"
                    type="password"
                    required
                    value={key}
                    onChange={e => setKey(e.target.value)}
                    placeholder={t.keyPlaceholder}
                    autoComplete="off"
                    className="w-full bg-white/[0.06] border border-white/15 ps-11 pe-4 py-3 text-sm text-[#fdfcfb] placeholder:text-[#fdfcfb]/45 outline-none focus:border-[#f2a007] focus-visible:ring-1 focus-visible:ring-[#f2a007] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-12 bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 active:bg-[#5a1f2e]/80 active:scale-[0.99] text-[#fdfcfb] t-meta text-xs font-bold uppercase tracking-wider py-3 px-6 transition-[color,background-color,border-color,transform] shadow-[0_4px_12px_rgba(90,31,46,0.3)] flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-40 mt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    <span className="whitespace-nowrap">{t.verifying}</span>
                  </>
                ) : (
                  <>
                    <span className="whitespace-nowrap">{t.cta}</span>
                    <ArrowRight size={16} className="rtl:-scale-x-100 shrink-0" aria-hidden="true" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMode("request")}
                className="w-full text-center t-meta text-xs text-[#f2a007] hover:text-[#f2a007]/80 transition-colors cursor-pointer py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2"
              >
                {t.requestCta}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRequest} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="investor-request-email" className="block t-meta text-[10px] text-[#fdfcfb]/70">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#fdfcfb]/40 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="investor-request-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full bg-white/[0.06] border border-white/15 ps-11 pe-4 py-3 text-sm text-[#fdfcfb] placeholder:text-[#fdfcfb]/45 outline-none focus:border-[#f2a007] focus-visible:ring-1 focus-visible:ring-[#f2a007] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="investor-organization" className="block t-meta text-[10px] text-[#fdfcfb]/70">
                    {t.organizationLabel}
                  </label>
                  <input
                    id="investor-organization"
                    required
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    placeholder={t.organizationPlaceholder}
                    className="w-full bg-white/[0.06] border border-white/15 px-4 py-3 text-sm text-[#fdfcfb] placeholder:text-[#fdfcfb]/45 outline-none focus:border-[#f2a007] focus-visible:ring-1 focus-visible:ring-[#f2a007] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="investor-role" className="block t-meta text-[10px] text-[#fdfcfb]/70">
                    {t.roleLabel}
                  </label>
                  <input
                    id="investor-role"
                    required
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder={t.rolePlaceholder}
                    className="w-full bg-white/[0.06] border border-white/15 px-4 py-3 text-sm text-[#fdfcfb] placeholder:text-[#fdfcfb]/45 outline-none focus:border-[#f2a007] focus-visible:ring-1 focus-visible:ring-[#f2a007] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="investor-party" className="block t-meta text-[10px] text-[#fdfcfb]/70">
                    {t.partyTypeLabel}
                  </label>
                  <input
                    id="investor-party"
                    required
                    value={partyType}
                    onChange={e => setPartyType(e.target.value)}
                    placeholder={t.partyTypePlaceholder}
                    className="w-full bg-white/[0.06] border border-white/15 px-4 py-3 text-sm text-[#fdfcfb] placeholder:text-[#fdfcfb]/45 outline-none focus:border-[#f2a007] focus-visible:ring-1 focus-visible:ring-[#f2a007] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="investor-interest" className="block t-meta text-[10px] text-[#fdfcfb]/70">
                    {t.interestLabel}
                  </label>
                  <input
                    id="investor-interest"
                    required
                    value={interest}
                    onChange={e => setInterest(e.target.value)}
                    placeholder={t.interestPlaceholder}
                    className="w-full bg-white/[0.06] border border-white/15 px-4 py-3 text-sm text-[#fdfcfb] placeholder:text-[#fdfcfb]/45 outline-none focus:border-[#f2a007] focus-visible:ring-1 focus-visible:ring-[#f2a007] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="investor-project" className="block t-meta text-[10px] text-[#fdfcfb]/70">
                  {t.targetProjectLabel}
                </label>
                <select
                  id="investor-project"
                  value={targetProject}
                  onChange={e => setTargetProject(e.target.value)}
                  className="w-full bg-[#11111a] border border-white/15 px-4 py-3 text-sm text-[#fdfcfb] outline-none focus:border-[#f2a007] focus-visible:ring-1 focus-visible:ring-[#f2a007] transition-colors"
                >
                  <option value="" className="bg-[#11111a] text-[#fdfcfb]/60">
                    {t.targetProjectPlaceholder}
                  </option>
                  {catalogProjectOptions.map(project => (
                    <option key={project.slug} value={project.slug} className="bg-[#11111a] text-[#fdfcfb]">
                      {project.title[lang]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="investor-message" className="block t-meta text-[10px] text-[#fdfcfb]/70">
                  {t.messageLabel}
                </label>
                <textarea
                  id="investor-message"
                  required
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full resize-none bg-white/[0.06] border border-white/15 px-4 py-3 text-sm text-[#fdfcfb] placeholder:text-[#fdfcfb]/45 outline-none focus:border-[#f2a007] focus-visible:ring-1 focus-visible:ring-[#f2a007] transition-colors"
                />
              </div>

              <label htmlFor="investor-consent" className="flex items-start gap-3 border-t border-white/10 pt-4 text-xs leading-relaxed text-[#fdfcfb]/70 cursor-pointer">
                <input
                  id="investor-consent"
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="mt-0.5 accent-[#f2a007] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-1"
                />
                <span>
                  <span className="font-semibold text-[#fdfcfb]">{t.privacyConsentLabel}: </span>
                  {t.privacyConsentText}{" "}
                  <Link href={localizedLinkPath("/privacy", lang)} asChild>
                    <a className="text-[#f2a007] underline underline-offset-2 hover:text-[#fdfcfb] transition-colors">
                      {t.privacyLinkLabel}
                    </a>
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading || !consent}
                className="w-full min-h-12 bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 active:bg-[#5a1f2e]/80 active:scale-[0.99] text-[#fdfcfb] t-meta text-xs font-bold uppercase tracking-wider py-3 px-6 transition-[color,background-color,border-color,transform] shadow-[0_4px_12px_rgba(90,31,46,0.3)] flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-40 mt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    <span className="whitespace-nowrap">{t.verifying}</span>
                  </>
                ) : (
                  <>
                    <span className="whitespace-nowrap">{t.requestCta}</span>
                    <ArrowRight size={16} className="rtl:-scale-x-100 shrink-0" aria-hidden="true" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMode("auth")}
                className="w-full text-center t-meta text-xs text-[#f2a007] hover:text-[#f2a007]/80 transition-colors cursor-pointer py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2"
              >
                {t.backLabel}
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-white/10 space-y-3">
            <dl className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 text-center">
              <div className="bg-[#11111a] px-2 py-3">
                <dt className="t-meta text-[#fdfcfb]/40">REVIEW</dt>
                <dd className="t-data text-xs text-[#fdfcfb] mt-1">DIRECTORIAL</dd>
              </div>
              <div className="bg-[#11111a] px-2 py-3">
                <dt className="t-meta text-[#fdfcfb]/40">RESPONSE</dt>
                <dd className="t-data text-xs text-[#fdfcfb] mt-1">REF-ID</dd>
              </div>
              <div className="bg-[#11111a] px-2 py-3">
                <dt className="t-meta text-[#fdfcfb]/40">DISCLOSURE</dt>
                <dd className="t-data text-xs text-[#fdfcfb] mt-1">POST-VERIFY</dd>
              </div>
            </dl>
            <p className="text-xs text-[#fdfcfb]/55 leading-relaxed">
              {t.auditNote}
            </p>
            <p className="t-data text-[11px] text-[#f2a007]/85 leading-relaxed tabular-nums" dir="ltr">
              {t.rangeNote}
            </p>
          </div>
        </motion.div>
      </div>

      <footer className="w-full max-w-6xl mx-auto text-center t-meta text-[11px] text-[#fdfcfb]/40 z-10 py-4 tabular-nums">
        © <span className="t-data">{new Date().getFullYear()}</span> {t.footerLine}
      </footer>
    </div>
  );
}
