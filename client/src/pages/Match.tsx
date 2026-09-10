import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Filter, Mail, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Section } from "@/components/ui/section";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { COUNTRIES, PROJECTS, SECTORS, STATUSES, type CountryKey, type SectorKey } from "@/projects";
import { CAPABILITY_KEYS, catalogProjectOptions, PARTY_TYPE_KEYS, PLATFORM_COPY, SERVICE_PACKAGES, type CapabilityKey, type PartyTypeKey } from "@/platform";
import { trackEvent } from "@/services/analytics";
import { localizedLinkPath } from "@/localePath";

type MatchForm = {
  organization: string;
  partyType: PartyTypeKey | "";
  sectors: SectorKey[];
  countries: CountryKey[];
  capabilities: CapabilityKey[];
  timeline: string;
  capitalBand: string;
  targetProject: string;
  targetService: string;
  email: string;
  consent: boolean;
};

const EMPTY_FORM: MatchForm = {
  organization: "",
  partyType: "",
  sectors: [],
  countries: [],
  capabilities: [],
  timeline: "",
  capitalBand: "",
  targetProject: "",
  targetService: "",
  email: "",
  consent: false,
};

export default function Match() {
  const { lang, content, isRTL } = useLanguageContext();
  const shouldReduceMotion = useReducedMotion();
  const t = PLATFORM_COPY[lang];
  const [form, setForm] = useState<MatchForm>(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    trackEvent("match_start");
    try {
      const service = new URLSearchParams(window.location.search).get("service");
      if (service && SERVICE_PACKAGES.some((item) => item.id === service)) {
        setForm((current) => ({ ...current, targetService: service }));
      }
    } catch {
      // URL parameters are optional.
    }
  }, []);

  const rankedProjects = useMemo(() => {
    if (form.sectors.length === 0 && form.countries.length === 0 && !form.targetProject) {
      return [];
    }
    return PROJECTS
      .filter((project) => project.type !== "initiative")
      .map((project) => {
        let score = 0;
        const reasons: string[] = [];
        if (project.slug === form.targetProject) {
          score += 10;
          reasons.push(t.match.reasonTarget);
        }
        if (form.sectors.includes(project.sector)) {
          score += 4;
          reasons.push(t.match.reasonSector);
        }
        if (form.countries.includes(project.country)) {
          score += 3;
          reasons.push(t.match.reasonCountry);
        }
        return { project, score, reasons };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.project.slug.localeCompare(b.project.slug))
      .slice(0, 3);
  }, [form.sectors, form.countries, form.targetProject, t.match.reasonCountry, t.match.reasonSector, t.match.reasonTarget]);

  const toggle = <T extends string>(key: "sectors" | "countries" | "capabilities", value: T) => {
    setForm((current) => {
      const values = current[key] as T[];
      return {
        ...current,
        [key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value],
      };
    });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending || !form.consent || !form.partyType) return;
    setSending(true);
    setError(false);
    trackEvent("match_submit");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "PARTNER_MATCH",
          email: form.email,
          organization: form.organization,
          partyType: form.partyType,
          sectors: form.sectors.join(" | "),
          countries: form.countries.join(" | "),
          capabilities: form.capabilities.join(" | "),
          timeline: form.timeline,
          capitalBand: form.capitalBand,
          targetProject: form.targetProject,
          targetService: form.targetService,
          locale: lang,
          consent: form.consent,
          message: "Structured partner intake submitted from the explainable catalog comparison.",
        }),
      });
      if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
      const body = (await response.json().catch(() => null)) as { reference?: string } | null;
      setReference(typeof body?.reference === "string" ? body.reference : null);
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const fieldClass =
    "w-full min-h-11 border border-[#0b0b10]/10 bg-[#fdfcfb] px-4 py-3 text-sm text-[#0b0b10] transition-[color,background-color,border-color] duration-150 caret-[#5a1f2e] placeholder:text-[#0b0b10]/45 focus:border-[#5a1f2e] focus:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2";

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO title={`${t.match.title} | AIABASD`} description={t.match.intro} lang={lang} url="/match" />
      <Header nav={content.nav} />
      <div className="pt-24">
        <Section className="border-b border-[#0b0b10]/20 bg-[#0b0b10] py-16 text-[#fdfcfb] md:py-24">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <p className="t-meta mb-4 text-[#f2a007]">{t.match.eyebrow}</p>
            <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-[#fdfcfb] leading-[1.08] md:text-4xl xl:text-5xl">
              {t.match.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#fdfcfb]/75 md:text-lg">
              {t.match.intro}
            </p>
          </div>
        </Section>

        <Section className="bg-[#fdfcfb] py-12 md:py-16">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 md:px-12 lg:grid-cols-12 lg:px-24">
            <div className="lg:col-span-7">
              {sent ? (
                <div className="border border-[#0b0b10]/15 bg-white p-7 text-[#0b0b10] shadow-[0_24px_48px_-12px_rgba(90,31,46,0.18)]">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-[#f2a007]" aria-hidden="true" />
                    <h2 className="text-lg font-bold text-[#0b0b10]">{t.match.successTitle}</h2>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#0b0b10]/80">
                    {t.match.successNote.replace("{ref}", reference ?? "pending")}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(EMPTY_FORM);
                      setSent(false);
                      setReference(null);
                    }}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 t-meta text-[10px] text-[#5a1f2e] transition-colors duration-150 hover:text-[#0b0b10] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2"
                  >
                    {t.match.anotherLabel}
                    <RotateCcw size={14} aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  className="border border-[#0b0b10]/15 bg-white p-6 shadow-[0_24px_48px_-12px_rgba(90,31,46,0.06)] md:p-10"
                >
                  <div className="mb-8 flex items-center justify-between border-b border-[#0b0b10]/10 pb-4">
                    <h2 className="t-meta text-[#5a1f2e]">{t.match.formTitle}</h2>
                    <Filter size={17} className="text-[#f2a007]" aria-hidden="true" />
                  </div>
                  <div className="space-y-7">
                    <div className="space-y-1.5">
                      <label htmlFor="match-organization" className="block t-meta text-[10px] text-[#0b0b10]/70">
                        {t.match.organizationLabel} <span className="text-[#5a1f2e] ms-0.5" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="match-organization"
                        required
                        value={form.organization}
                        onChange={(e) => setForm({ ...form, organization: e.target.value })}
                        placeholder={t.match.organizationPlaceholder}
                        className={fieldClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="match-party" className="block t-meta text-[10px] text-[#0b0b10]/70">
                        {t.match.partyTypeLabel} <span className="text-[#5a1f2e] ms-0.5" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="match-party"
                        required
                        value={form.partyType}
                        onChange={(e) => setForm({ ...form, partyType: e.target.value as PartyTypeKey })}
                        className={fieldClass}
                      >
                        <option value="">—</option>
                        {PARTY_TYPE_KEYS.map((key) => (
                          <option key={key} value={key}>
                            {t.match.options.partyTypes[key]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <fieldset className="space-y-2">
                      <legend className="block t-meta text-[10px] text-[#0b0b10]/70 mb-2">
                        {t.match.sectorsLabel}
                      </legend>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {(Object.keys(SECTORS) as SectorKey[]).map((key) => {
                          const active = form.sectors.includes(key);
                          return (
                            <label
                              key={key}
                              className={`flex min-h-11 cursor-pointer items-center gap-3 border px-3.5 py-2.5 text-sm transition-[background-color,border-color,transform] duration-150 active:translate-y-px ${
                                active
                                  ? "border-[#5a1f2e] bg-[#5a1f2e]/[0.05] font-medium text-[#5a1f2e]"
                                  : "border-[#0b0b10]/10 bg-[#fdfcfb] text-[#0b0b10]/80 hover:border-[#0b0b10]/25 hover:bg-white"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={active}
                                onChange={() => toggle("sectors", key)}
                                className="h-4 w-4 shrink-0 accent-[#5a1f2e]"
                              />
                              <span>{SECTORS[key][lang]}</span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <fieldset className="space-y-2">
                      <legend className="block t-meta text-[10px] text-[#0b0b10]/70 mb-2">
                        {t.match.countriesLabel}
                      </legend>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {(Object.keys(COUNTRIES) as CountryKey[]).map((key) => {
                          const active = form.countries.includes(key);
                          return (
                            <label
                              key={key}
                              className={`flex min-h-11 cursor-pointer items-center gap-3 border px-3.5 py-2.5 text-sm transition-[background-color,border-color,transform] duration-150 active:translate-y-px ${
                                active
                                  ? "border-[#5a1f2e] bg-[#5a1f2e]/[0.05] font-medium text-[#5a1f2e]"
                                  : "border-[#0b0b10]/10 bg-[#fdfcfb] text-[#0b0b10]/80 hover:border-[#0b0b10]/25 hover:bg-white"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={active}
                                onChange={() => toggle("countries", key)}
                                className="h-4 w-4 shrink-0 accent-[#5a1f2e]"
                              />
                              <span>{COUNTRIES[key][lang]}</span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <fieldset className="space-y-2">
                      <legend className="block t-meta text-[10px] text-[#0b0b10]/70 mb-2">
                        {t.match.capabilitiesLabel}
                      </legend>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {CAPABILITY_KEYS.map((key) => {
                          const active = form.capabilities.includes(key);
                          return (
                            <label
                              key={key}
                              className={`flex min-h-11 cursor-pointer items-center gap-3 border px-3.5 py-2.5 text-sm transition-[background-color,border-color,transform] duration-150 active:translate-y-px ${
                                active
                                  ? "border-[#5a1f2e] bg-[#5a1f2e]/[0.05] font-medium text-[#5a1f2e]"
                                  : "border-[#0b0b10]/10 bg-[#fdfcfb] text-[#0b0b10]/80 hover:border-[#0b0b10]/25 hover:bg-white"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={active}
                                onChange={() => toggle("capabilities", key)}
                                className="h-4 w-4 shrink-0 accent-[#5a1f2e]"
                              />
                              <span>{t.match.options.capabilities[key]}</span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label htmlFor="match-timeline" className="block t-meta text-[10px] text-[#0b0b10]/70">
                          {t.match.timelineLabel}
                        </label>
                        <select
                          id="match-timeline"
                          value={form.timeline}
                          onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                          className={fieldClass}
                        >
                          <option value="">{t.match.timelinePlaceholder}</option>
                          {t.match.options.timelines.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label[lang]}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="match-capital" className="block t-meta text-[10px] text-[#0b0b10]/70">
                          {t.match.capitalBandLabel}
                        </label>
                        <select
                          id="match-capital"
                          value={form.capitalBand}
                          onChange={(e) => setForm({ ...form, capitalBand: e.target.value })}
                          className={fieldClass}
                        >
                          <option value="">—</option>
                          {t.match.options.capitalBands.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.label[lang]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label htmlFor="match-project" className="block t-meta text-[10px] text-[#0b0b10]/70">
                          {t.match.targetProjectLabel}
                        </label>
                        <select
                          id="match-project"
                          value={form.targetProject}
                          onChange={(e) => setForm({ ...form, targetProject: e.target.value })}
                          className={fieldClass}
                        >
                          <option value="">{t.match.noSpecificTarget}</option>
                          {catalogProjectOptions.map((project) => (
                            <option key={project.slug} value={project.slug}>
                              {project.title[lang]}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="match-service" className="block t-meta text-[10px] text-[#0b0b10]/70">
                          {t.match.targetServiceLabel}
                        </label>
                        <select
                          id="match-service"
                          value={form.targetService}
                          onChange={(e) => setForm({ ...form, targetService: e.target.value })}
                          className={fieldClass}
                        >
                          <option value="">{t.match.noSpecificTarget}</option>
                          {SERVICE_PACKAGES.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name[lang]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="match-email" className="block t-meta text-[10px] text-[#0b0b10]/70">
                        {t.match.emailLabel} <span className="text-[#5a1f2e] ms-0.5" aria-hidden="true">*</span>
                      </label>
                      <div className="relative">
                        <Mail
                          size={16}
                          className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[#0b0b10]/40"
                          aria-hidden="true"
                        />
                        <input
                          id="match-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder={t.match.emailPlaceholder}
                          className={`${fieldClass} ps-11`}
                        />
                      </div>
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 border-t border-[#0b0b10]/10 pt-5 text-sm leading-relaxed text-[#0b0b10]/70">
                      <input
                        type="checkbox"
                        required
                        checked={form.consent}
                        onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                        className="mt-1 h-4 w-4 shrink-0 accent-[#5a1f2e]"
                      />
                      <span>
                        <span className="font-semibold text-[#0b0b10]">{t.match.consentLabel}: </span>
                        {t.match.consentText}
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={sending || !form.partyType || !form.consent}
                      className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#5a1f2e] px-6 py-3.5 t-meta text-[10px] text-[#fdfcfb] transition-[background-color,transform] duration-150 hover:bg-[#0b0b10] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2"
                    >
                      {sending ? t.match.submittingLabel : t.match.submitLabel}
                      <ArrowRight size={14} strokeWidth={1.5} className="rtl:-scale-x-100" aria-hidden="true" />
                    </button>

                    {error && (
                      <div
                        role="alert"
                        className="flex items-start gap-2.5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                      >
                        <AlertCircle size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{t.match.error}</span>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 border border-[#0b0b10]/15 bg-[#11111a] p-6 text-[#fdfcfb] shadow-[0_24px_48px_-12px_rgba(90,31,46,0.18)] md:p-8">
                <p className="t-meta text-[#f2a007]">{t.match.previewTitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#fdfcfb]/80">{t.match.previewNote}</p>
                {rankedProjects.length === 0 ? (
                  <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-[#fdfcfb]/70">
                    {form.sectors.length === 0 && form.countries.length === 0 && !form.targetProject
                      ? t.match.previewPrompt
                      : t.match.noMatch}
                  </p>
                ) : (
                  <div className="mt-8 space-y-4">
                    {rankedProjects.map(({ project, score, reasons }) => (
                      <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="border-t border-white/10 pt-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-base font-semibold text-[#fdfcfb]">{project.title[lang]}</h3>
                            <p className="mt-1 text-xs text-[#fdfcfb]/60">
                              {COUNTRIES[project.country][lang]} · {SECTORS[project.sector][lang]}
                            </p>
                          </div>
                          <span className="t-data shrink-0 text-xs text-[#f2a007] tabular-nums" dir="ltr">
                            <bdi>
                              {t.match.scoreLabel}: {score}
                            </bdi>
                          </span>
                        </div>
                        <ul className="mt-3 space-y-1 text-xs text-[#fdfcfb]/75">
                          {reasons.map((reason) => (
                            <li key={reason}>+ {reason}</li>
                          ))}
                        </ul>
                        <p className="mt-3 t-meta text-[10px] text-[#fdfcfb]/60">
                          {STATUSES[project.status][lang]}
                        </p>
                        <Link asChild href={localizedLinkPath(`/projects/${project.slug}`, lang)}>
                          <a className="mt-4 inline-flex min-h-11 items-center gap-2 t-meta text-[10px] text-[#f2a007] transition-colors duration-150 hover:text-[#fdfcfb] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2">
                            {t.services.portfolioCta}
                            <ArrowRight size={12} strokeWidth={1.5} className="rtl:-scale-x-100" aria-hidden="true" />
                          </a>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
                <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-relaxed text-[#fdfcfb]/60">
                  {t.match.limitation}
                </p>
              </div>
            </aside>
          </div>
        </Section>
      </div>
      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
