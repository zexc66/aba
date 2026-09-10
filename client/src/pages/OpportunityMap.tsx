import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, MapPinned } from "lucide-react";
import { Link } from "wouter";
import { useReducedMotion } from "framer-motion";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { COUNTRIES, PROJECTS, PROJECTS_UI, type CountryKey, type Locale3 } from "@/projects";
import { DEPLOY_BASE_PATH, localizedLinkPath } from "@/localePath";
import { MAP_COPY } from "@/mapCopy";

const MAP_POINTS: Record<CountryKey, { x: number; y: number }> = {
  sd: { x: 55.6, y: 46.4 },
  sy: { x: 59.6, y: 25 },
  ci: { x: 41.6, y: 53.4 },
  gh: { x: 42.5, y: 52.5 },
  ao: { x: 47.4, y: 61.1 },
  intl: { x: 54.6, y: 18.9 },
};

const MAP_ROUTES: { from: CountryKey; to: CountryKey; path: string }[] = [
  { from: "ci", to: "sd", path: "M41.6 53.4 C46 49 51 49 55.6 46.4" },
  { from: "sd", to: "sy", path: "M55.6 46.4 C58.5 31 59.6 25 59.6 25" },
  { from: "ci", to: "ao", path: "M41.6 53.4 C43 56 45 58 47.4 61.1" },
];

export default function OpportunityMap() {
  const { lang, content } = useLanguageContext();
  const locale = lang as Locale3;
  const copy = MAP_COPY[locale];
  const projectsT = PROJECTS_UI[locale];
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<CountryKey | "all">("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = useMemo(() => PROJECTS.filter((project) => project.type !== "initiative"), []);
  const countryCounts = useMemo(() => {
    const counts = new Map<CountryKey, number>();
    projects.forEach((project) => counts.set(project.country, (counts.get(project.country) ?? 0) + 1));
    return counts;
  }, [projects]);
  const visibleProjects = selected === "all" ? projects : projects.filter((project) => project.country === selected);
  const countriesWithProjects = (Object.keys(COUNTRIES) as CountryKey[]).filter((country) => countryCounts.has(country));
  const activeRoutes = useMemo(
    () => MAP_ROUTES.filter((route) => countriesWithProjects.includes(route.from) && countriesWithProjects.includes(route.to)),
    [countriesWithProjects]
  );

  return (
    <div className={`min-h-screen overflow-x-hidden bg-[#0b0b10] text-[#fdfcfb] ${lang === "ar" ? "font-arabic" : ""}`}>
      <SEO title={`${copy.title} | AIABASD`} description={copy.intro} lang={lang} url="/opportunity-map" />
      <Header nav={content.nav} />
      <div className="pt-24">
        {/* Hero Section */}
        <Section className="border-b border-[#0b0b10]/20 bg-[#0b0b10] py-16 text-[#fdfcfb] md:py-24">
          <div className="mx-auto w-full max-w-[1500px] px-6 md:px-12 lg:px-24">
            <Link asChild href={localizedLinkPath("/projects", lang)}>
              <a className="mb-8 inline-flex min-h-11 items-center gap-2 t-meta text-[10px] text-[#f2a007] hover:text-[#fdfcfb] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 transition-[color,transform] duration-200">
                <ArrowLeft size={14} className="rtl:-scale-x-100" aria-hidden="true" />
                {projectsT.backLabel}
              </a>
            </Link>
            <p className="t-meta mb-4 text-[#f2a007]">{copy.eyebrow}</p>
            <h1 className="max-w-4xl text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight text-[#fdfcfb] leading-[1.08]">{copy.title}</h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-[#fdfcfb]/75">{copy.intro}</p>
          </div>
        </Section>

        {/* Interactive Map and Location Selector */}
        <Section className="bg-[#fdfcfb] py-12 md:py-16 border-b border-[#0b0b10]/10">
          <div className="mx-auto w-full max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-8">
                <div className="relative overflow-hidden border border-[#0b0b10]/15 bg-[#11111a] p-4 text-[#fdfcfb] md:p-7 shadow-[0_24px_48px_-12px_rgba(90,31,46,0.18)]">
                  <div className="mb-4 flex flex-col items-start gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="flex items-center gap-2 text-[#f2a007]">
                      <MapPinned size={16} aria-hidden="true" />
                      <span className="t-meta text-[10px]">{copy.activeLabel}</span>
                    </div>
                    <span className="t-data tabular-nums text-xs text-[#fdfcfb]/75" dir="ltr">
                      <bdi>{projects.length}</bdi> {copy.opportunityLabel}
                    </span>
                  </div>
                  <div className="overflow-x-auto pb-1 scrollbar-sov-dark">
                    <div
                      className="relative aspect-[2.386/1] min-w-[560px] md:min-w-0 overflow-hidden border border-white/10 bg-[#0b0b10]"
                      style={{
                        backgroundImage: "linear-gradient(rgba(242,160,7,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(242,160,7,.09) 1px, transparent 1px)",
                        backgroundSize: "10% 20%",
                      }}
                    >
                      <img
                        src={`${DEPLOY_BASE_PATH || ""}/world-boundaries.svg`}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-90"
                      />
                      <div className="absolute inset-0" role="group" aria-label={copy.title}>
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-75">
                          {activeRoutes.map((route, index) => (
                            <g key={`${route.from}-${route.to}`}>
                              <path
                                d={route.path}
                                fill="none"
                                stroke="#f2a007"
                                strokeDasharray={index === 0 ? "1.5 1.5" : "1 2"}
                                strokeLinecap="round"
                                strokeOpacity={index === 0 ? 1 : 0.55}
                                strokeWidth={index === 0 ? "0.45" : "0.35"}
                              />
                              {index === 0 && !reduceMotion && (
                                <circle r="0.8" fill="#f2a007" aria-hidden="true">
                                  <animateMotion path={route.path} dur="4.5s" repeatCount="indefinite" />
                                </circle>
                              )}
                            </g>
                          ))}
                        </svg>
                        <div className="absolute bottom-[9%] start-[4%] border-s border-dashed border-[#f2a007]/50 ps-3 text-[9px] uppercase tracking-[.18em] text-[#f2a007]">
                          {copy.corridorLabel}
                        </div>
                        {countriesWithProjects.map((country) => {
                          const point = MAP_POINTS[country];
                          const active = selected === country;
                          const count = countryCounts.get(country) ?? 0;
                          return (
                            <button
                              key={country}
                              type="button"
                              onClick={() => setSelected(active ? "all" : country)}
                              aria-pressed={active}
                              aria-label={`${COUNTRIES[country][locale]} · ${count} ${copy.opportunityLabel}`}
                              title={`${COUNTRIES[country][locale]} · ${count} ${copy.opportunityLabel}`}
                              className="group absolute z-[1] flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none cursor-pointer active:scale-95 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f2a007]"
                              style={{ left: `${point.x}%`, top: `${point.y}%` }}
                            >
                              {active && !reduceMotion && (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute h-6 w-6 rounded-full bg-[#f2a007]/30 animate-ping motion-reduce:animate-none"
                                />
                              )}
                              <span
                                className={`block rounded-full border-2 border-[#fdfcfb] transition-transform duration-200 ${
                                  active
                                    ? "h-4 w-4 bg-[#f2a007] shadow-[0_0_0_3px_rgba(242,160,7,0.35)]"
                                    : "h-3.5 w-3.5 bg-[#f2a007] shadow-[0_0_0_2px_rgba(242,160,7,0.2)] group-hover:scale-125 group-focus-visible:scale-125"
                                }`}
                              />
                              <span
                                className={`absolute start-1/2 top-1/2 ms-3 min-w-max -translate-y-1/2 border-s border-[#f2a007]/60 bg-[#0b0b10]/90 ps-2 pe-1.5 py-1 text-start text-[10px] leading-tight text-[#fdfcfb] transition-colors ${
                                  active ? "font-bold text-[#f2a007] border-[#f2a007]" : "text-[#fdfcfb]/85 group-hover:text-[#fdfcfb]"
                                }`}
                              >
                                <span>{COUNTRIES[country][locale]}</span>
                                <span className="opacity-70"> · </span>
                                <span className="t-data tabular-nums" dir="ltr"><bdi>{count}</bdi></span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-[9px] uppercase tracking-[.14em] text-[#fdfcfb]/65">
                        <span>{copy.mapNote}</span>
                        <span className="t-data" dir="ltr">AIABASD / 2026</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-5 text-[10px] text-[#fdfcfb]/75">
                    <div className="flex flex-wrap items-center gap-5">
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#f2a007]" aria-hidden="true" />
                        {copy.selectedLabel}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full border-2 border-[#fdfcfb] bg-transparent" aria-hidden="true" />
                        {copy.activeLabel}
                      </span>
                    </div>
                    <span className="text-[#fdfcfb]/65">{copy.sourceLabel}</span>
                  </div>
                </div>
              </div>

              <aside className="space-y-4 lg:col-span-4" role="region" aria-label={copy.title}>
                <button
                  type="button"
                  onClick={() => setSelected("all")}
                  aria-pressed={selected === "all"}
                  className={`w-full min-h-11 border p-5 text-start transition-[color,background-color,border-color,transform] duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 ${
                    selected === "all"
                      ? "border-[#5a1f2e] bg-[#5a1f2e] text-[#fdfcfb]"
                      : "border-[#0b0b10]/10 bg-white hover:border-[#5a1f2e]/40"
                  }`}
                >
                  <div className={`t-meta text-[10px] ${selected === "all" ? "text-[#fdfcfb]/75" : "text-[#0b0b10]/65"}`}>
                    {copy.selectedLabel}
                  </div>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <span className="text-lg font-bold">{copy.allLabel}</span>
                    <span className="t-data tabular-nums text-2xl" dir="ltr"><bdi>{projects.length}</bdi></span>
                  </div>
                </button>
                {countriesWithProjects.map((country) => {
                  const count = countryCounts.get(country) ?? 0;
                  const active = selected === country;
                  return (
                    <button
                      key={country}
                      type="button"
                      onClick={() => setSelected(country)}
                      aria-pressed={active}
                      className={`w-full min-h-11 border p-5 text-start transition-[color,background-color,border-color,transform] duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 ${
                        active
                          ? "border-[#5a1f2e] bg-[#5a1f2e]/[0.07]"
                          : "border-[#0b0b10]/10 bg-white hover:border-[#5a1f2e]/40"
                      }`}
                    >
                      <div className="flex items-end justify-between gap-3">
                        <span className={`font-semibold text-sm ${active ? "text-[#5a1f2e]" : "text-[#0b0b10]"}`}>
                          {COUNTRIES[country][locale]}
                        </span>
                        <span className="t-data tabular-nums text-xl text-[#5a1f2e]" dir="ltr">
                          <bdi>{count}</bdi>
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-[#0b0b10]/65">{copy.opportunityLabel}</div>
                    </button>
                  );
                })}
              </aside>
            </div>
          </div>
        </Section>

        {/* Project List */}
        <Section className="border-t border-[#0b0b10]/10 bg-[#fdfcfb] py-12 md:py-16">
          <div className="mx-auto w-full max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="t-meta text-[#5a1f2e] mb-1.5">
                  {selected === "all" ? copy.allLabel : COUNTRIES[selected][locale]}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0b0b10] leading-tight">
                  {projectsT.headerTitle}
                </h2>
              </div>
              <span className="t-data tabular-nums text-sm text-[#0b0b10]/65" dir="ltr">
                <bdi>{visibleProjects.length}</bdi> / <bdi>{projects.length}</bdi>
              </span>
            </div>
            {visibleProjects.length === 0 ? (
              <div className="border border-[#0b0b10]/10 bg-white p-10 md:p-14 text-center max-w-xl mx-auto my-4">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border border-[#0b0b10]/10 bg-[#fdfcfb] text-[#5a1f2e]">
                  <MapPinned size={20} className="text-[#5a1f2e]" aria-hidden="true" />
                </div>
                <p className="text-sm text-[#0b0b10]/70 mb-5 leading-relaxed max-w-md mx-auto">{copy.noProjects}</p>
                <button
                  type="button"
                  onClick={() => setSelected("all")}
                  className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#5a1f2e] px-5 py-2.5 t-meta text-[10px] text-[#fdfcfb] hover:bg-[#0b0b10] transition-[color,background-color,transform] duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2"
                >
                  {copy.allLabel}
                  <ArrowRight size={13} className="rtl:-scale-x-100" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleProjects.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} locale={locale} index={index} />
                ))}
              </div>
            )}
          </div>
        </Section>
      </div>
      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
