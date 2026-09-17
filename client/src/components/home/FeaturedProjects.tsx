import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { PROJECTS_UI, COUNTRIES, SECTORS, STATUSES, featuredProjects, type Locale3, type Project, type ProjectStatus } from "@/projects";
import { localizedLinkPath } from "@/localePath";

const STATUS_TONE: Record<ProjectStatus, string> = {
  "under-development": "text-[#5a1f2e] bg-[#5a1f2e]/[0.06] border-[#5a1f2e]/20",
  "technical-assessment": "text-[#5a1f2e] bg-[#5a1f2e]/[0.06] border-[#5a1f2e]/20",
  "seeking-partners": "text-[#6b4a00] bg-[#f2a007]/[0.12] border-[#f2a007]/30",
  "seeking-financing": "text-[#6b4a00] bg-[#f2a007]/[0.12] border-[#f2a007]/30",
  "investment-opportunity": "text-[#6b4a00] bg-[#f2a007]/[0.12] border-[#f2a007]/30",
  "procurement-opportunity": "text-[#0b0b10]/70 bg-[#0b0b10]/[0.04] border-[#0b0b10]/15",
  "cooperation-framework": "text-[#0b0b10]/70 bg-[#0b0b10]/[0.04] border-[#0b0b10]/15",
  "strategic-vision": "text-[#0b0b10]/70 bg-[#0b0b10]/[0.04] border-[#0b0b10]/15",
};

function FlagshipCard({ project, locale, t }: { project: Project; locale: Locale3; t: typeof PROJECTS_UI["en"] }) {
  return (
    <Link asChild href={localizedLinkPath(`/projects/${project.slug}`, locale)}>
      <a className="group relative block border border-[#0b0b10]/10 bg-white transition-colors hover:border-[#5a1f2e]/40">
        <span aria-hidden="true" className="absolute top-0 start-0 h-[2px] w-0 bg-[#f2a007] transition-all duration-500 group-hover:w-full" />

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-e border-[#0b0b10]/10 p-7 md:p-9 min-w-0">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 t-meta text-[10px] text-[#0b0b10]/60" dir="ltr">
                <span>{COUNTRIES[project.country][locale]}</span>
                <span aria-hidden="true">/</span>
                <span>{SECTORS[project.sector][locale]}</span>
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold leading-tight text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors break-words">
                {project.title[locale]}
              </h3>
              <span className={`mt-4 inline-flex items-center gap-1.5 t-meta px-2.5 py-1.5 border text-[10px] ${STATUS_TONE[project.status]}`}>
                <span className="w-1.5 h-1.5 bg-current" aria-hidden="true" />
                {STATUSES[project.status][locale]}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="t-meta text-[10px] text-[#0b0b10]/50">{t.detailTitle}</span>
              <span className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#5a1f2e]">
                {t.explore}
                <ArrowRight size={15} className="rtl:-scale-x-100 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5 bg-[#fdfcfb] p-7 md:p-9 min-w-0">
            <p className="text-sm md:text-base leading-relaxed text-[#0b0b10]/75">
              {project.description[locale]}
            </p>
            <ul className="space-y-2.5">
              {project.objectives.slice(0, 3).map((o, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#0b0b10]/70">
                  <CheckCircle2 size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[#5a1f2e]" aria-hidden="true" />
                  <span className="min-w-0">{o[locale]}</span>
                </li>
              ))}
            </ul>
            {project.scale && (
              <p className="t-meta text-[10px] text-[#0b0b10]/55" dir="ltr">
                <span className="text-[#0b0b10]/40">{t.scaleLabel}: </span>
                {project.scale[locale]}
              </p>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
}

function FeaturedRow({ project, index, locale, t }: { project: Project; index: number; locale: Locale3; t: typeof PROJECTS_UI["en"] }) {
  return (
    <Link asChild href={localizedLinkPath(`/projects/${project.slug}`, locale)}>
      <a className="group relative grid grid-cols-1 lg:grid-cols-[4.5rem_minmax(0,1.15fr)_minmax(14rem,0.75fr)_auto] gap-4 lg:gap-8 items-start lg:items-center py-6 transition-colors hover:bg-[#5a1f2e]/[0.035] active:translate-y-px">
        <span aria-hidden="true" className="absolute top-0 start-0 h-px w-0 bg-[#f2a007] transition-all duration-500 group-hover:w-full" />
        <span className="t-data text-xs text-[#0b0b10]/40 ps-1" aria-hidden="true" dir="ltr">
          {String(index).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-snug text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors break-words">
            {project.title[locale]}
          </h3>
          <p className="t-meta mt-2 text-[10px] text-[#0b0b10]/55" dir="ltr">
            {COUNTRIES[project.country][locale]} <span aria-hidden="true">·</span> {SECTORS[project.sector][locale]}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-[#0b0b10]/70 min-w-0">
          {project.description[locale].split(/[.。]/)[0]}.
        </p>
        <div className="flex items-center gap-4 justify-between lg:justify-end">
          <span className={`inline-flex items-center gap-1.5 t-meta px-2.5 py-1.5 border text-[10px] ${STATUS_TONE[project.status]}`}>
            <span className="w-1.5 h-1.5 bg-current" aria-hidden="true" />
            {STATUSES[project.status][locale]}
          </span>
          <span className="w-9 h-9 bg-[#0b0b10]/5 group-hover:bg-[#5a1f2e] group-hover:text-[#fdfcfb] flex items-center justify-center transition-colors shrink-0">
            <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>
      </a>
    </Link>
  );
}

export default function FeaturedProjects() {
  const { lang } = useLanguageContext();
  const locale = lang as Locale3;
  const t = PROJECTS_UI[locale];
  const shouldReduceMotion = useReducedMotion();
  const featured = featuredProjects(6);
  const [flagship, ...rest] = featured;

  return (
    <Section id="featured-projects" className="relative py-20 bg-[#fdfcfb] border-b border-[#0b0b10]/10">
      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
        <SectionHeader
          index="02.1"
          title={t.featuredTitle}
          note={t.featuredNote}
        />

        {flagship && (
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-0"
          >
            <FlagshipCard project={flagship} locale={locale} t={t} />
          </motion.div>
        )}

        <div className="divide-y divide-[#0b0b10]/10 border-b border-[#0b0b10]/10">
          {rest.map((p, i) => (
            <FeaturedRow key={p.slug} project={p} index={i + 2} locale={locale} t={t} />
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link asChild href={localizedLinkPath("/projects", lang)}>
            <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] py-2 transition-[color,border-color,transform] active:translate-y-px">
              {t.viewAll}
              <ArrowRight size={14} className="rtl:-scale-x-100" aria-hidden="true" />
            </a>
          </Link>
        </div>
      </div>
    </Section>
  );
}
