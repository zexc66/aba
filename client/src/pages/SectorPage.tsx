import { useMemo } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useLanguageContext } from "@/contexts/LanguageContext";
import {
  PROJECTS,
  PROJECTS_UI,
  SECTORS,
  type Locale3,
  type SectorKey,
} from "@/projects";
import { PROGRAM_META } from "@/intelligence";
import { localizedLinkPath } from "@/localePath";

const UI: Record<
  Locale3,
  {
    backLabel: string;
    projectsLabel: string;
    initiativesLabel: string;
    programsLabel: string;
    programsNote: string;
    emptyLabel: string;
    allProjects: string;
  }
> = {
  en: {
    backLabel: "All Projects",
    projectsLabel: "Projects & Opportunities",
    initiativesLabel: "Related Initiatives",
    programsLabel: "Flagship Programs",
    programsNote: "Alliance flagship programs in this sector:",
    emptyLabel: "No projects in this sector yet.",
    allProjects: "All Projects",
  },
  ar: {
    backLabel: "جميع المشاريع",
    projectsLabel: "المشاريع والفرص",
    initiativesLabel: "مبادرات ذات صلة",
    programsLabel: "البرامج الرائدة",
    programsNote: "برامج التحالف الرائدة في هذا القطاع:",
    emptyLabel: "لا توجد مشاريع في هذا القطاع بعد.",
    allProjects: "جميع المشاريع",
  },
  fr: {
    backLabel: "Tous les projets",
    projectsLabel: "Projets & Opportunités",
    initiativesLabel: "Initiatives associées",
    programsLabel: "Programmes phares",
    programsNote: "Programmes phares de l'Alliance dans ce secteur :",
    emptyLabel: "Aucun projet dans ce secteur pour l'instant.",
    allProjects: "Tous les projets",
  },
};

/** projects.ts sector key → intelligence.ts program sector (where they align). */
const PROGRAM_SECTOR_MAP: Partial<Record<SectorKey, string>> = {
  energy: "energy",
  circular: "circularity",
  agriculture: "agriculture",
  industry: "industrial",
};

export default function SectorPage({
  params,
}: {
  params?: { sector?: string };
}) {
  const { lang, content } = useLanguageContext();
  const locale = lang as Locale3;
  const t = PROJECTS_UI[locale];
  const u = UI[locale];

  const sector =
    (params?.sector as SectorKey) ??
    (typeof window !== "undefined"
      ? (window.location.pathname
          .replace(/^\/(ar|fr)/, "")
          .split("/")[2] as SectorKey)
      : undefined);

  const known = sector && SECTORS[sector] ? (sector as SectorKey) : undefined;
  const sectorName = known ? SECTORS[known][locale] : "";
  const inSector = known ? PROJECTS.filter(p => p.sector === known) : [];
  const initiatives = inSector.filter(p => p.type === "initiative");
  const projects = inSector.filter(p => p.type !== "initiative");
  const programSector = known ? PROGRAM_SECTOR_MAP[known] : undefined;
  const programs = programSector
    ? content.programs.list.filter(
        p => PROGRAM_META[p.slug]?.sector === programSector
      )
    : [];

  // Subtext discipline: institutional focus statement (<= 20 words across EN, AR, FR)
  const headerSubtext = useMemo(() => {
    const parts = t.headerNote.split(/(?<=[.!?\u06D4])\s+/);
    return parts.length > 1 ? parts[1] : t.headerNote;
  }, [t.headerNote]);

  return (
    <div
      className={`min-h-[100dvh] bg-[#fdfcfb] text-[#0b0b10] ${lang === "ar" ? "font-arabic" : ""}`}
    >
      <SEO
        title={sectorName ? `${sectorName} | AIABASD` : t.pageTitle}
        description={
          sectorName
            ? `${sectorName} — ${t.headerNote}`.slice(0, 155)
            : t.headerNote
        }
        lang={lang}
        url={known ? `/sectors/${known}` : "/projects"}
      />
      <Header nav={content.nav} />

      <div className="pt-24 pb-24">
        {!known ? (
          <Section className="py-24">
            <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 text-center">
              <p className="t-meta text-[#5a1f2e] mb-6" dir="ltr"><bdi>404</bdi></p>
              <Link href={localizedLinkPath("/projects", lang)} asChild>
                <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] pb-1 transition-[color,border-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px">
                  <ArrowLeft
                    size={14}
                    className="rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                  <span>{u.allProjects}</span>
                </a>
              </Link>
            </div>
          </Section>
        ) : (
          <>
            <Section className="relative py-12 border-b border-[#0b0b10]/10 bg-white">
              <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                <Link href={localizedLinkPath("/projects", lang)} asChild>
                  <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] pb-1 mb-6 transition-[color,border-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px">
                    <ArrowLeft
                      size={14}
                      className="rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                    <span>{u.backLabel}</span>
                  </a>
                </Link>
                <SectionHeader
                  index="S"
                  title={sectorName}
                  note={headerSubtext}
                  meta="SECTOR_PORTFOLIO"
                  titleAs="h1"
                />
              </div>
            </Section>

            <Section className="py-14">
              <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 space-y-16">
                <div>
                  <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-8">
                    {u.projectsLabel}
                  </h2>
                  {projects.length === 0 ? (
                    <p className="t-meta text-[#0b0b10]/60 py-8">{u.emptyLabel}</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {projects.map((p, i) => (
                        <ProjectCard
                          key={p.slug}
                          project={p}
                          locale={locale}
                          index={i}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {programs.length > 0 && (
                  <div>
                    <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-4">
                      {u.programsLabel}
                    </h2>
                    <p className="text-sm text-[#0b0b10]/70 mb-4">
                      {u.programsNote}
                    </p>
                    <ul className="divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
                      {programs.map(p => (
                        <li key={p.slug}>
                          <Link
                            asChild
                            href={localizedLinkPath(
                              p.link ?? `/programs/${p.slug}`,
                              lang
                            )}
                          >
                            <a className="relative flex items-center justify-between gap-4 py-4 px-3 -mx-3 group hover:bg-[#5a1f2e]/[0.035] active:translate-y-px transition-[color,background-color,transform] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2">
                              <span
                                className="absolute bottom-0 start-0 h-px w-0 bg-[#f2a007] transition-[width] duration-500 group-hover:w-full pointer-events-none"
                                aria-hidden="true"
                              />
                              <span className="text-sm font-semibold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors leading-snug">
                                {p.name}
                              </span>
                              <span className="t-meta text-[#0b0b10]/60">
                                {p.status}
                              </span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {initiatives.length > 0 && (
                  <div>
                    <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-6">
                      {u.initiativesLabel}
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                      {initiatives.map(p => (
                        <li key={p.slug}>
                          <Link
                            asChild
                            href={localizedLinkPath(
                              `/projects/${p.slug}`,
                              lang
                            )}
                          >
                            <a className="t-meta text-[11px] inline-block border border-[#0b0b10]/15 bg-white px-3 py-2 text-[#0b0b10]/75 hover:border-[#5a1f2e]/50 hover:text-[#5a1f2e] active:translate-y-px transition-[color,border-color,transform] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2">
                              {p.title[locale]}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Section>
          </>
        )}
      </div>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
