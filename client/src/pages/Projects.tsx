import { useState, useMemo, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { ProjectCard, StatusBadge } from "@/components/projects/ProjectCard";
import { useLanguageContext } from "@/contexts/LanguageContext";
import {
  PROJECTS,
  PROJECTS_UI,
  COUNTRIES,
  SECTORS,
  STATUSES,
  TYPES,
  initiativeProjects,
  type CountryKey,
  type Locale3,
  type ProjectType,
  type ProjectStatus,
  type SectorKey,
} from "@/projects";

export default function Projects() {
  const { lang, content } = useLanguageContext();
  const locale = lang as Locale3;
  const t = PROJECTS_UI[locale];
  const reduceMotion = useReducedMotion();

  const [country, setCountry] = useState<CountryKey | "all">("all");
  const [sector, setSector] = useState<SectorKey | "all">("all");
  const [type, setType] = useState<ProjectType | "all">("all");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");

  // Scroll to top on mount (SPA entry via direct link)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = useMemo(
    () =>
      PROJECTS.filter((p) => p.type !== "initiative")
        .filter((p) => (country === "all" ? true : p.country === country))
        .filter((p) => (sector === "all" ? true : p.sector === sector))
        .filter((p) => (type === "all" ? true : p.type === type))
        .filter((p) => (status === "all" ? true : p.status === status)),
    [country, sector, type, status]
  );

  const initiatives = useMemo(() => initiativeProjects(), []);

  const countriesWithProjects = useMemo(
    () => Array.from(new Set(PROJECTS.filter((p) => p.type !== "initiative").map((p) => p.country))),
    []
  );
  const sectorsWithProjects = useMemo(
    () => Array.from(new Set(PROJECTS.filter((p) => p.type !== "initiative").map((p) => p.sector))),
    []
  );
  const statusesInUse = useMemo(
    () => Array.from(new Set(PROJECTS.filter((p) => p.type !== "initiative").map((p) => p.status))),
    []
  );

  const selectClass =
    "w-full bg-[#fdfcfb] border border-black/10 px-4 py-3 rounded-sm text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-white transition-colors cursor-pointer";

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${lang === "ar" ? "font-arabic" : ""}`}>
      <SEO title={t.pageTitle} description={t.headerNote} lang={lang} url="/projects" />
      <Header nav={content.nav} />

      <main id="main-content" className="pt-24">
        {/* Header */}
        <Section className="relative py-12 border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader
              index="P"
              title={t.headerTitle}
              note={t.headerNote}
              meta="PROJECT_PORTFOLIO"
              titleAs="h1"
            />
          </div>
        </Section>

        {/* Filters */}
        <Section className="py-8 border-b border-black/10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10">
              <label className="bg-[#fdfcfb] p-4 flex flex-col gap-2">
                <span className="t-meta text-black/55 text-[10px]">{t.filterCountry}</span>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as CountryKey | "all")}
                  className={selectClass}
                >
                  <option value="all">{t.filterAll}</option>
                  {countriesWithProjects.map((c) => (
                    <option key={c} value={c}>{COUNTRIES[c][locale]}</option>
                  ))}
                </select>
              </label>
              <label className="bg-[#fdfcfb] p-4 flex flex-col gap-2">
                <span className="t-meta text-black/55 text-[10px]">{t.filterSector}</span>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value as SectorKey | "all")}
                  className={selectClass}
                >
                  <option value="all">{t.filterAll}</option>
                  {sectorsWithProjects.map((s) => (
                    <option key={s} value={s}>{SECTORS[s][locale]}</option>
                  ))}
                </select>
              </label>
              <label className="bg-[#fdfcfb] p-4 flex flex-col gap-2">
                <span className="t-meta text-black/55 text-[10px]">{t.filterType}</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ProjectType | "all")}
                  className={selectClass}
                >
                  <option value="all">{t.filterAll}</option>
                  {(Object.keys(TYPES) as ProjectType[]).map((k) => (
                    <option key={k} value={k}>{TYPES[k][locale]}</option>
                  ))}
                </select>
              </label>
              <label className="bg-[#fdfcfb] p-4 flex flex-col gap-2">
                <span className="t-meta text-black/55 text-[10px]">{t.filterStatus}</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProjectStatus | "all")}
                  className={selectClass}
                >
                  <option value="all">{t.filterAll}</option>
                  {statusesInUse.map((s) => (
                    <option key={s} value={s}>{STATUSES[s][locale]}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </Section>

        {/* Project grid */}
        <Section className="py-12">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            {projects.length === 0 ? (
              <p className="py-16 text-center t-meta text-black/50">{t.emptyLabel}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* Strategic initiatives */}
        <Section className="relative py-16 bg-[#0b0b10] text-[#fdfcfb] border-y border-black">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div className="mb-12">
              <p className="t-meta text-[#f2a007] mb-3">STRATEGIC_INITIATIVES</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {t.initiativesTitle}
              </h2>
              <p className="text-sm text-white/60 leading-relaxed mt-3 max-w-3xl">
                {t.initiativesNote}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 mb-14">
              {initiatives.map((p, i) => (
                <motion.a
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.2) }}
                  className="bg-[#11111a] p-7 flex flex-col hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <StatusBadge status={p.status} locale={locale} />
                    <span className="t-data text-[10px] text-white/35" dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#f2a007] transition-colors leading-snug mb-3">
                    {p.title[locale]}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {p.description[locale]}
                  </p>
                </motion.a>
              ))}
            </div>

            {/* Advanced technology cooperation areas */}
            <div className="border border-white/10 p-6 md:p-8">
              <h3 className="text-base font-bold text-white mb-2">{t.techTitle}</h3>
              <p className="t-meta text-white/45 text-[10px] mb-5">{t.techNote}</p>
              <ul className="flex flex-wrap gap-2" role="list">
                {t.techAreas.map((area) => (
                  <li
                    key={area}
                    className="t-meta text-[10px] text-white/70 border border-white/15 px-3 py-2 bg-white/[0.03]"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Disclaimer */}
        <Section className="py-10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div
              role="note"
              className="border border-black/10 bg-white p-6 flex items-start gap-4"
            >
              <ShieldAlert size={18} className="text-[#5a1f2e] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="t-meta text-[#5a1f2e] mb-2">{t.disclaimerLabel}</p>
                <p className="text-sm text-black/65 leading-relaxed">{t.disclaimer}</p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
