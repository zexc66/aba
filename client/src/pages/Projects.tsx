import { useState, useMemo, useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Bookmark, GitCompareArrows, Plus, Printer, ShieldAlert, X } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { Link } from "wouter";
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
import { deployAssetPath, localizedLinkPath, localizedPath } from "@/localePath";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { projectReadiness } from "@/readiness";
import ReadinessCalculator from "@/components/projects/ReadinessCalculator";

type Filters = {
  country: CountryKey | "all";
  sector: SectorKey | "all";
  type: ProjectType | "all";
  status: ProjectStatus | "all";
};

const FILTER_KEYS: (keyof Filters)[] = ["country", "sector", "type", "status"];

function filtersFromUrl(): Filters {
  const initial: Filters = { country: "all", sector: "all", type: "all", status: "all" };
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of FILTER_KEYS) {
      const value = params.get(key);
      if (value && value !== "all") (initial[key] as string) = value;
    }
  } catch {
  }
  return initial;
}

export default function Projects() {
  const { lang, content } = useLanguageContext();
  const locale = lang as Locale3;
  const t = PROJECTS_UI[locale];
  const reduceMotion = useReducedMotion();
  const { savedSlugs, compareSlugs, toggleCompare, clearCompare } = useWatchlist();
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const [filters, setFilters] = useState<Filters>(filtersFromUrl);
  const { country, sector, type, status } = filters;
  const setFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    try {
      const next = { ...filters, [key]: value };
      const params = new URLSearchParams();
      for (const k of FILTER_KEYS) {
        const v = next[k];
        if (v !== "all") params.set(k, String(v));
      }
      const query = params.toString();
      window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
    } catch {
    }
  };

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
        .filter((p) => (status === "all" ? true : p.status === status))
        .filter((p) => (!showSavedOnly || savedSlugs.includes(p.slug))),
    [country, sector, type, status, showSavedOnly, savedSlugs]
  );
  const initiatives = useMemo(() => initiativeProjects(), []);
  const comparedProjects = useMemo(
    () => compareSlugs.map((slug) => PROJECTS.find((project) => project.slug === slug)).filter((project): project is (typeof PROJECTS)[number] => Boolean(project)),
    [compareSlugs]
  );

  const comparisonRows: { label: string; get: (project: (typeof PROJECTS)[number]) => ReactNode }[] = [
    { label: t.countryLabel, get: (project) => COUNTRIES[project.country][locale] },
    { label: t.sectorLabel, get: (project) => SECTORS[project.sector][locale] },
    { label: t.statusLabel, get: (project) => STATUSES[project.status][locale] },
    { label: t.scaleLabel, get: (project) => project.scale?.[locale] ?? "—" },
    { label: t.modelLabel, get: (project) => project.model?.[locale] ?? "—" },
    { label: t.readinessProfileLabel, get: (project) => `${projectReadiness(project).score}%` },
    {
      label: t.objectivesLabel,
      get: (project) => <ul className="space-y-1">{project.objectives.map((item, index) => <li key={index}>{item[locale]}</li>)}</ul>,
    },
    {
      label: t.partnershipLabel,
      get: (project) => <ul className="space-y-1">{project.partnership.map((item, index) => <li key={index}>{item[locale]}</li>)}</ul>,
    },
  ];

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
    "w-full min-h-11 bg-[#fdfcfb] border border-[#0b0b10]/10 px-4 py-2.5 text-sm text-[#0b0b10] transition-colors cursor-pointer hover:border-[#0b0b10]/25 focus:border-[#5a1f2e] focus:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2";

  // Subtext discipline: institutional focus statement (<= 20 words across EN, AR, FR)
  const headerSubtext = useMemo(() => {
    const parts = t.headerNote.split(/(?<=[.!?\u06D4])\s+/);
    return parts.length > 1 ? parts[1] : t.headerNote;
  }, [t.headerNote]);

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${lang === "ar" ? "font-arabic" : ""}`}>
      <SEO title={t.pageTitle} description={t.headerNote} lang={lang} url="/projects" />
      <Header nav={content.nav} />

      <div className="pt-24">
        {/* Header */}
        <Section className="relative py-12 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader
              index="P"
              title={t.headerTitle}
              note={headerSubtext}
              meta="PROJECT_PORTFOLIO"
              titleAs="h1"
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link asChild href={localizedLinkPath("/submit-project", lang)}>
                <a className="inline-flex min-h-11 items-center gap-2 bg-[#5a1f2e] px-5 py-3 t-meta text-[10px] text-[#fdfcfb] transition-[color,background-color,transform] duration-200 hover:bg-[#0b0b10] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2">
                  {t.submitOpportunityLabel}
                  <Plus size={14} strokeWidth={2} aria-hidden="true" />
                </a>
              </Link>
              <Link asChild href={localizedLinkPath("/opportunity-map", lang)}>
                <a className="inline-flex min-h-11 items-center gap-2 border border-[#0b0b10]/15 bg-white px-5 py-3 t-meta text-[10px] text-[#5a1f2e] transition-[color,border-color,background-color,transform] duration-200 hover:border-[#5a1f2e] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2">
                  {t.opportunityMapLabel}
                  <ArrowUpRight size={14} strokeWidth={2} className="rtl:-scale-x-100" aria-hidden="true" />
                </a>
              </Link>
            </div>
          </div>
        </Section>

        {/* Filters */}
        <Section className="py-8 border-b border-[#0b0b10]/10 bg-[#fdfcfb]">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0b0b10]/10 border border-[#0b0b10]/10">
              <label htmlFor="filter-country" className="bg-[#fdfcfb] p-4 flex flex-col gap-2">
                <span className="t-meta text-[#0b0b10]/70 text-[10px]">{t.filterCountry}</span>
                <select
                  id="filter-country"
                  value={country}
                  onChange={(e) => setFilter("country", e.target.value)}
                  className={selectClass}
                >
                  <option value="all">{t.filterAll}</option>
                  {countriesWithProjects.map((c) => (
                    <option key={c} value={c}>{COUNTRIES[c][locale]}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="filter-sector" className="bg-[#fdfcfb] p-4 flex flex-col gap-2">
                <span className="t-meta text-[#0b0b10]/70 text-[10px]">{t.filterSector}</span>
                <select
                  id="filter-sector"
                  value={sector}
                  onChange={(e) => setFilter("sector", e.target.value)}
                  className={selectClass}
                >
                  <option value="all">{t.filterAll}</option>
                  {sectorsWithProjects.map((s) => (
                    <option key={s} value={s}>{SECTORS[s][locale]}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="filter-type" className="bg-[#fdfcfb] p-4 flex flex-col gap-2">
                <span className="t-meta text-[#0b0b10]/70 text-[10px]">{t.filterType}</span>
                <select
                  id="filter-type"
                  value={type}
                  onChange={(e) => setFilter("type", e.target.value)}
                  className={selectClass}
                >
                  <option value="all">{t.filterAll}</option>
                  {(Object.keys(TYPES) as ProjectType[]).map((k) => (
                    <option key={k} value={k}>{TYPES[k][locale]}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="filter-status" className="bg-[#fdfcfb] p-4 flex flex-col gap-2">
                <span className="t-meta text-[#0b0b10]/70 text-[10px]">{t.filterStatus}</span>
                <select
                  id="filter-status"
                  value={status}
                  onChange={(e) => setFilter("status", e.target.value)}
                  className={selectClass}
                >
                  <option value="all">{t.filterAll}</option>
                  {statusesInUse.map((s) => (
                    <option key={s} value={s}>{STATUSES[s][locale]}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* Status legend — doubles as a one-click filter */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {statusesInUse.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={status === s}
                  onClick={() => setFilter("status", status === s ? "all" : s)}
                  className={`inline-flex min-h-11 items-center cursor-pointer transition-[opacity,transform] duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 ${status === "all" || status === s ? "" : "opacity-60 hover:opacity-100"}`}
                >
                  <StatusBadge status={s} locale={locale} />
                </button>
              ))}
              <button
                type="button"
                aria-pressed={showSavedOnly}
                onClick={() => setShowSavedOnly((current) => !current)}
                className={`inline-flex min-h-11 items-center gap-2 border px-3 py-2 t-meta text-[10px] transition-[color,border-color,background-color,transform] duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 ${showSavedOnly ? "border-[#f2a007] bg-[#f2a007]/10 text-[#6b4a00]" : "border-[#0b0b10]/10 text-[#0b0b10]/65 bg-white hover:border-[#5a1f2e]/30 hover:text-[#5a1f2e]"}`}
              >
                <Bookmark size={12} aria-hidden="true" />
                <span>{t.watchlistLabel}</span>
                <span className="t-data tabular-nums" dir="ltr">({savedSlugs.length})</span>
              </button>
            </div>
          </div>
        </Section>

        {comparedProjects.length > 0 && (
          <Section className="border-b border-[#0b0b10] bg-[#0b0b10] py-10 text-[#fdfcfb] print-compare-brief">
            <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4 print:hidden">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-[#f2a007]">
                    <GitCompareArrows size={16} aria-hidden="true" />
                    <span className="t-meta text-[10px]">{t.compareTitle}</span>
                    <span className="t-data tabular-nums text-[10px] text-[#f2a007]" dir="ltr">({comparedProjects.length}/3)</span>
                  </div>
                  <p className="max-w-2xl text-sm leading-relaxed text-[#fdfcfb]/75">{t.compareNote}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/5 hover:border-[#f2a007] hover:bg-white/10 text-[#fdfcfb] t-meta text-[10px] px-4 py-2.5 transition-[color,border-color,background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 active:translate-y-px cursor-pointer print:hidden"
                  >
                    <Printer size={13} aria-hidden="true" />
                    <span>{t.printCompareBrief}</span>
                  </button>
                  <button
                    type="button"
                    onClick={clearCompare}
                    className="inline-flex min-h-11 items-center t-meta border-b border-white/30 px-2 pb-1 text-[10px] text-[#fdfcfb]/75 transition-[color,border-color,transform] duration-200 hover:border-white hover:text-[#fdfcfb] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 print:hidden"
                  >
                    {t.compareClearLabel}
                  </button>
                </div>
              </div>

              {/* Print-only term sheet header */}
              <div className="print-compare-header hidden print:flex brief-header" aria-hidden="true">
                <img
                  src={deployAssetPath("/logo.png")}
                  alt="AIABASD"
                  className="brief-logo"
                />
                <div>
                  <div className="brief-org">AIABASD</div>
                  <div className="brief-org-full">
                    {t.compareTitle} — {t.compareNote}
                  </div>
                </div>
                <div className="brief-ref">INVESTMENT_BRIEF</div>
              </div>

              <div
                className="overflow-x-auto border border-white/10 scrollbar-sov-dark"
                tabIndex={0}
                role="region"
                aria-label={t.compareTitle}
              >
                <table className="min-w-[760px] w-full border-collapse text-start text-sm">
                  <caption className="sr-only">{t.compareNote} {t.compareLimitLabel}</caption>
                  <thead>
                    <tr className="border-b border-white/10">
                      <th
                        scope="col"
                        className="sticky start-0 z-10 w-44 min-w-44 bg-[#0b0b10] p-4 text-start align-top text-[10px] uppercase tracking-wider text-[#fdfcfb]/70 border-e border-white/10 break-words"
                      >
                        {t.compareFactLabel}
                      </th>
                      {comparedProjects.map((project) => (
                        <th key={project.slug} scope="col" className="min-w-[200px] max-w-[320px] border-s border-white/10 p-4 text-start align-top break-words">
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-semibold leading-snug text-[#fdfcfb] break-words">{project.title[locale]}</span>
                             <button
                               type="button"
                               onClick={() => toggleCompare(project.slug)}
                               aria-label={t.removeComparedProjectLabel}
                               title={t.removeComparedProjectLabel}
                               className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center text-[#fdfcfb]/60 transition-[color,transform] duration-200 hover:text-[#f2a007] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 print:hidden"
                             >
                              <X size={15} aria-hidden="true" />
                            </button>
                          </div>
                        </th>
                      ))}
                      {comparedProjects.length === 1 && (
                        <th scope="col" className="min-w-[200px] max-w-[320px] border-s border-dashed border-white/15 p-4 text-start align-top bg-white/[0.02] print:hidden">
                          <div className="flex flex-col gap-1.5">
                            <span className="t-meta text-[10px] text-[#f2a007] font-semibold">{t.compareTitle}</span>
                            <span className="text-xs text-[#fdfcfb]/70 leading-snug break-words">{t.compareNote}</span>
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.label} className="border-b border-white/10 last:border-0">
                        <th
                          scope="row"
                          className="sticky start-0 z-10 w-44 min-w-44 bg-[#0b0b10] p-4 text-start align-top text-[10px] uppercase tracking-wider text-[#fdfcfb]/70 border-e border-white/10 font-normal break-words"
                        >
                          {row.label}
                        </th>
                        {comparedProjects.map((project) => (
                          <td key={project.slug} className="border-s border-white/10 p-4 align-top leading-relaxed text-[#fdfcfb]/85 break-words">{row.get(project)}</td>
                        ))}
                        {comparedProjects.length === 1 && (
                          <td className="border-s border-dashed border-white/15 p-4 align-top text-[#fdfcfb]/45 text-xs bg-white/[0.01] print:hidden">
                            —
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Print-only footer line */}
              <div className="print-compare-footer hidden print:block" aria-hidden="true">
                <div className="brief-disclaimer">
                  {t.comparePrintFooter}
                </div>
                <footer className="brief-footer">
                  <span>aiabasd.org · contact@aiabasd.org</span>
                  <span>{t.compareTitle}</span>
                </footer>
              </div>
            </div>
          </Section>
        )}

        {/* Project grid */}
        <Section className="py-12">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            {projects.length === 0 ? (
              <div className="border border-[#0b0b10]/10 bg-white p-10 md:p-14 text-center max-w-2xl mx-auto my-4">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border border-[#0b0b10]/10 bg-[#fdfcfb] text-[#5a1f2e]">
                  {showSavedOnly ? (
                    <Bookmark size={20} className="text-[#f2a007]" aria-hidden="true" />
                  ) : (
                    <ShieldAlert size={20} className="text-[#5a1f2e]" aria-hidden="true" />
                  )}
                </div>
                <p className="t-meta text-[#0b0b10]/70 text-xs leading-relaxed max-w-md mx-auto mb-2">
                  {showSavedOnly ? t.watchlistEmpty : t.emptyLabel}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {showSavedOnly ? (
                    <button
                      type="button"
                      onClick={() => setShowSavedOnly(false)}
                      className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#5a1f2e] px-5 py-2.5 t-meta text-[10px] text-[#fdfcfb] hover:bg-[#0b0b10] transition-[color,background-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px"
                    >
                      {t.viewAll}
                      <ArrowRight size={13} className="rtl:-scale-x-100" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setFilters({ country: "all", sector: "all", type: "all", status: "all" });
                        window.history.replaceState(null, "", window.location.pathname);
                      }}
                      className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#5a1f2e] px-5 py-2.5 t-meta text-[10px] text-[#fdfcfb] hover:bg-[#0b0b10] transition-[color,background-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px"
                    >
                      {t.viewAll}
                      <ArrowRight size={13} className="rtl:-scale-x-100" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* Interactive Readiness Methodology Calculator */}
        <ReadinessCalculator locale={locale} />

        {/* Strategic initiatives */}
        <Section className="relative py-16 bg-[#0b0b10] text-[#fdfcfb] border-y border-[#0b0b10]">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div className="mb-12">
              <p className="t-meta text-[#f2a007] mb-3">STRATEGIC_INITIATIVES</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#fdfcfb] leading-tight">
                {t.initiativesTitle}
              </h2>
              <p className="text-sm text-[#fdfcfb]/75 leading-relaxed mt-3 max-w-3xl">
                {t.initiativesNote}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 mb-14">
              {initiatives.map((p, i) => (
                <motion.a
                  key={p.slug}
                  href={localizedPath(`/projects/${p.slug}`, lang)}
                  initial={false}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.35, delay: Math.min(i * 0.05, 0.2) }
                  }
                  className="bg-[#11111a] p-7 flex flex-col hover:bg-white/[0.04] active:translate-y-px transition-[color,background-color,transform] duration-200 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2"
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <StatusBadge status={p.status} locale={locale} dark={true} />
                    <span className="t-data tabular-nums text-[10px] text-[#fdfcfb]/60" dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#fdfcfb] group-hover:text-[#f2a007] transition-colors leading-snug mb-3">
                    {p.title[locale]}
                  </h3>
                  <p className="text-sm text-[#fdfcfb]/75 leading-relaxed">
                    {p.description[locale]}
                  </p>
                </motion.a>
              ))}
            </div>

            {/* Advanced technology cooperation areas */}
            <div className="border border-white/10 p-6 md:p-8">
              <h3 className="text-base font-bold text-[#fdfcfb] mb-2">{t.techTitle}</h3>
              <p className="t-meta text-[#fdfcfb]/70 text-[10px] mb-5">{t.techNote}</p>
              <ul className="flex flex-wrap gap-2" role="list">
                {t.techAreas.map((area) => (
                  <li
                    key={area}
                    className="t-meta text-[10px] text-[#fdfcfb]/85 border border-white/15 px-3 py-2 bg-white/[0.04]"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Disclaimer */}
        <Section className="py-10 bg-[#fdfcfb]">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div
              role="note"
              className="border border-[#0b0b10]/10 bg-white p-6 flex items-start gap-4"
            >
              <ShieldAlert size={18} className="text-[#5a1f2e] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="t-meta text-[#5a1f2e] mb-1.5">{t.disclaimerLabel}</p>
                <p className="text-sm text-[#0b0b10]/75 leading-relaxed">{t.disclaimer}</p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
