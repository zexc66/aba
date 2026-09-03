import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Filter, Mail, RotateCcw } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
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
  organization: "", partyType: "", sectors: [], countries: [], capabilities: [], timeline: "", capitalBand: "", targetProject: "", targetService: "", email: "", consent: false,
};

export default function Match() {
  const { lang, content, isRTL } = useLanguageContext();
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
      if (service && SERVICE_PACKAGES.some((item) => item.id === service)) setForm((current) => ({ ...current, targetService: service }));
    } catch {
      // URL parameters are optional.
    }
  }, []);

  const rankedProjects = useMemo(() => {
    if (form.sectors.length === 0 && form.countries.length === 0 && !form.targetProject) return [];
    return PROJECTS
      .filter((project) => project.type !== "initiative")
      .map((project) => {
        let score = 0;
        const reasons: string[] = [];
        if (project.slug === form.targetProject) { score += 10; reasons.push(t.match.reasonTarget); }
        if (form.sectors.includes(project.sector)) { score += 4; reasons.push(t.match.reasonSector); }
        if (form.countries.includes(project.country)) { score += 3; reasons.push(t.match.reasonCountry); }
        return { project, score, reasons };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.project.slug.localeCompare(b.project.slug))
      .slice(0, 3);
  }, [form.sectors, form.countries, form.targetProject, t.match.reasonCountry, t.match.reasonSector, t.match.reasonTarget]);

  const toggle = <T extends string>(key: "sectors" | "countries" | "capabilities", value: T) => {
    setForm((current) => {
      const values = current[key] as T[];
      return { ...current, [key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value] };
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

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO title={`${t.match.title} | AIABASD`} description={t.match.intro} lang={lang} url="/match" />
      <Header nav={content.nav} />
      <div className="pt-24">
        <section className="border-b border-black/10 bg-[#0b0b10] text-white">
          <div className="mx-auto max-w-[1500px] px-6 py-16 md:px-12 lg:px-24 lg:py-24">
            <p className="t-meta mb-5 text-[#f2a007]">{t.match.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{t.match.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">{t.match.intro}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 py-16 md:px-12 lg:grid-cols-12 lg:px-24 lg:py-24">
          <div className="lg:col-span-7">
            {sent ? (
              <div className="border border-emerald-200 bg-emerald-50 p-7 text-emerald-900">
                <div className="flex items-center gap-3"><CheckCircle2 size={20} /><h2 className="text-lg font-bold">{t.match.successTitle}</h2></div>
                <p className="mt-4 text-sm leading-relaxed">{t.match.successNote.replace("{ref}", reference ?? "pending")}</p>
                <button type="button" onClick={() => { setForm(EMPTY_FORM); setSent(false); setReference(null); }} className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5a1f2e]">{t.match.anotherLabel} <RotateCcw size={14} /></button>
              </div>
            ) : (
              <form onSubmit={submit} className="border border-black/10 bg-white p-6 md:p-10">
                <div className="mb-8 flex items-center justify-between border-b-2 border-[#0b0b10] pb-4"><h2 className="t-meta text-[#5a1f2e]">{t.match.formTitle}</h2><Filter size={17} className="text-[#f2a007]" /></div>
                <div className="space-y-7">
                  <div className="space-y-2"><label htmlFor="match-organization" className="t-meta text-black/60">{t.match.organizationLabel} *</label><input id="match-organization" required value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder={t.match.organizationPlaceholder} className="w-full border border-black/10 bg-[#fdfcfb] px-4 py-3 text-sm outline-none focus:border-[#5a1f2e]" /></div>
                  <div className="space-y-2"><label htmlFor="match-party" className="t-meta text-black/60">{t.match.partyTypeLabel} *</label><select id="match-party" required value={form.partyType} onChange={(e) => setForm({ ...form, partyType: e.target.value as PartyTypeKey })} className="w-full border border-black/10 bg-[#fdfcfb] px-4 py-3 text-sm outline-none focus:border-[#5a1f2e]"><option value="">—</option>{PARTY_TYPE_KEYS.map((key) => <option key={key} value={key}>{t.match.options.partyTypes[key]}</option>)}</select></div>

                  <fieldset><legend className="t-meta mb-3 text-black/60">{t.match.sectorsLabel}</legend><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{(Object.keys(SECTORS) as SectorKey[]).map((key) => <label key={key} className="flex cursor-pointer items-center gap-3 border border-black/10 px-3 py-3 text-sm hover:border-[#5a1f2e]"><input type="checkbox" checked={form.sectors.includes(key)} onChange={() => toggle("sectors", key)} className="accent-[#5a1f2e]" />{SECTORS[key][lang]}</label>)}</div></fieldset>
                  <fieldset><legend className="t-meta mb-3 text-black/60">{t.match.countriesLabel}</legend><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{(Object.keys(COUNTRIES) as CountryKey[]).map((key) => <label key={key} className="flex cursor-pointer items-center gap-3 border border-black/10 px-3 py-3 text-sm hover:border-[#5a1f2e]"><input type="checkbox" checked={form.countries.includes(key)} onChange={() => toggle("countries", key)} className="accent-[#5a1f2e]" />{COUNTRIES[key][lang]}</label>)}</div></fieldset>
                  <fieldset><legend className="t-meta mb-3 text-black/60">{t.match.capabilitiesLabel}</legend><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{CAPABILITY_KEYS.map((key) => <label key={key} className="flex cursor-pointer items-center gap-3 border border-black/10 px-3 py-3 text-sm hover:border-[#5a1f2e]"><input type="checkbox" checked={form.capabilities.includes(key)} onChange={() => toggle("capabilities", key)} className="accent-[#5a1f2e]" />{t.match.options.capabilities[key]}</label>)}</div></fieldset>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2"><div className="space-y-2"><label htmlFor="match-timeline" className="t-meta text-black/60">{t.match.timelineLabel}</label><select id="match-timeline" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="w-full border border-black/10 bg-[#fdfcfb] px-4 py-3 text-sm outline-none focus:border-[#5a1f2e]"><option value="">{t.match.timelinePlaceholder}</option>{t.match.options.timelines.map((item) => <option key={item.value} value={item.value}>{item.label[lang]}</option>)}</select></div><div className="space-y-2"><label htmlFor="match-capital" className="t-meta text-black/60">{t.match.capitalBandLabel}</label><select id="match-capital" value={form.capitalBand} onChange={(e) => setForm({ ...form, capitalBand: e.target.value })} className="w-full border border-black/10 bg-[#fdfcfb] px-4 py-3 text-sm outline-none focus:border-[#5a1f2e]"><option value="">—</option>{t.match.options.capitalBands.map((item) => <option key={item.value} value={item.value}>{item.label[lang]}</option>)}</select></div></div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2"><div className="space-y-2"><label htmlFor="match-project" className="t-meta text-black/60">{t.match.targetProjectLabel}</label><select id="match-project" value={form.targetProject} onChange={(e) => setForm({ ...form, targetProject: e.target.value })} className="w-full border border-black/10 bg-[#fdfcfb] px-4 py-3 text-sm outline-none focus:border-[#5a1f2e]"><option value="">{t.match.noSpecificTarget}</option>{catalogProjectOptions.map((project) => <option key={project.slug} value={project.slug}>{project.title[lang]}</option>)}</select></div><div className="space-y-2"><label htmlFor="match-service" className="t-meta text-black/60">{t.match.targetServiceLabel}</label><select id="match-service" value={form.targetService} onChange={(e) => setForm({ ...form, targetService: e.target.value })} className="w-full border border-black/10 bg-[#fdfcfb] px-4 py-3 text-sm outline-none focus:border-[#5a1f2e]"><option value="">{t.match.noSpecificTarget}</option>{SERVICE_PACKAGES.map((service) => <option key={service.id} value={service.id}>{service.name[lang]}</option>)}</select></div></div>
                  <div className="space-y-2"><label htmlFor="match-email" className="t-meta text-black/60">{t.match.emailLabel} *</label><div className="relative"><Mail size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-black/35" /><input id="match-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.match.emailPlaceholder} className="w-full border border-black/10 bg-[#fdfcfb] px-4 py-3 ps-11 text-sm outline-none focus:border-[#5a1f2e]" /></div></div>
                  <label className="flex cursor-pointer items-start gap-3 border-t border-black/10 pt-5 text-sm leading-relaxed text-black/65"><input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 accent-[#5a1f2e]" /><span><span className="font-semibold text-black/80">{t.match.consentLabel}: </span>{t.match.consentText}</span></label>
                  <button type="submit" disabled={sending || !form.partyType || !form.consent} className="inline-flex items-center gap-2 bg-[#5a1f2e] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50">{sending ? t.match.submittingLabel : t.match.submitLabel} <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} /></button>
                  {error && <div role="alert" className="flex items-start gap-2 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"><AlertCircle size={16} className="mt-0.5 shrink-0" />{t.match.error}</div>}
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 border border-black/10 bg-[#0b0b10] p-6 text-white md:p-8">
              <p className="t-meta text-[#f2a007]">{t.match.previewTitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/65">{t.match.previewNote}</p>
              {rankedProjects.length === 0 ? <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/55">{form.sectors.length === 0 && form.countries.length === 0 && !form.targetProject ? t.match.previewPrompt : t.match.noMatch}</p> : <div className="mt-8 space-y-4">{rankedProjects.map(({ project, score, reasons }) => <motion.div key={project.slug} initial={false} animate={{ opacity: 1, x: 0 }} className="border-t border-white/10 pt-5"><div className="flex items-start justify-between gap-3"><div><h3 className="text-base font-semibold">{project.title[lang]}</h3><p className="mt-1 text-xs text-white/45">{COUNTRIES[project.country][lang]} · {SECTORS[project.sector][lang]}</p></div><span className="t-data shrink-0 text-xs text-[#f2a007]" dir="ltr">{t.match.scoreLabel}: {score}</span></div><ul className="mt-3 space-y-1 text-xs text-white/60">{reasons.map((reason) => <li key={reason}>+ {reason}</li>)}</ul><p className="mt-3 text-[11px] uppercase tracking-wider text-white/40">{STATUSES[project.status][lang]}</p><Link href={localizedLinkPath(`/projects/${project.slug}`, lang)} className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-[#f2a007] hover:text-white">{t.services.portfolioCta}</Link></motion.div>)}</div>}
              <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/45">{t.match.limitation}</p>
            </div>
          </aside>
        </section>
      </div>
      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
