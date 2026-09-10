import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  Factory,
  Globe2,
  HeartPulse,
  Recycle,
  Sun,
  Tractor,
  Network,
  Bookmark,
  BookmarkCheck,
  GitCompareArrows,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { localizedLinkPath } from "@/localePath";
import { projectReadiness } from "@/readiness";
import { useWatchlist } from "@/contexts/WatchlistContext";
import {
  COUNTRIES,
  SECTORS,
  STATUSES,
  TYPES,
  PROJECTS_UI,
  type Locale3,
  type Project,
  type ProjectStatus,
  type SectorKey,
} from "@/projects";

/** Per-sector geometric anchors (no stock imagery). */
export const SECTOR_ICONS: Record<SectorKey, LucideIcon> = {
  housing: Building2,
  energy: Sun,
  infrastructure: Network,
  circular: Recycle,
  industry: Factory,
  agriculture: Tractor,
  social: HeartPulse,
  multi: Globe2,
};

/** Restrained status tones — subtle tints only, never promotional buttons. */
const STATUS_TONE_LIGHT: Record<ProjectStatus, string> = {
  "under-development": "text-[#5a1f2e] bg-[#5a1f2e]/[0.08] border-[#5a1f2e]/25",
  "cooperation-framework": "text-[#5a1f2e] bg-[#5a1f2e]/[0.08] border-[#5a1f2e]/25",
  "seeking-partners": "text-[#6b4a00] bg-[#f2a007]/[0.14] border-[#f2a007]/35",
  "investment-opportunity": "text-[#6b4a00] bg-[#f2a007]/[0.14] border-[#f2a007]/35",
  "technical-assessment": "text-[#0b0b10]/70 bg-[#0b0b10]/[0.04] border-[#0b0b10]/15",
  "seeking-financing": "text-[#0b0b10]/70 bg-[#0b0b10]/[0.04] border-[#0b0b10]/15",
  "procurement-opportunity": "text-[#0b0b10]/70 bg-[#0b0b10]/[0.04] border-[#0b0b10]/15",
  "strategic-vision": "text-[#0b0b10]/70 bg-[#0b0b10]/[0.04] border-[#0b0b10]/15",
};

const STATUS_TONE_DARK: Record<ProjectStatus, string> = {
  "under-development": "text-[#fdfcfb] bg-[#5a1f2e]/40 border-[#5a1f2e]/60",
  "cooperation-framework": "text-[#fdfcfb] bg-[#5a1f2e]/40 border-[#5a1f2e]/60",
  "seeking-partners": "text-[#f2a007] bg-[#f2a007]/15 border-[#f2a007]/40",
  "investment-opportunity": "text-[#f2a007] bg-[#f2a007]/15 border-[#f2a007]/40",
  "technical-assessment": "text-[#fdfcfb]/80 bg-white/[0.05] border-white/20",
  "seeking-financing": "text-[#fdfcfb]/80 bg-white/[0.05] border-white/20",
  "procurement-opportunity": "text-[#fdfcfb]/80 bg-white/[0.05] border-white/20",
  "strategic-vision": "text-[#fdfcfb]/80 bg-white/[0.05] border-white/20",
};

export function StatusBadge({
  status,
  locale,
  dark = false,
}: {
  status: ProjectStatus;
  locale: Locale3;
  dark?: boolean;
}) {
  const tones = dark ? STATUS_TONE_DARK : STATUS_TONE_LIGHT;
  return (
    <span
      className={`inline-flex items-center t-meta text-[10px] px-2.5 py-1 border ${tones[status]}`}
    >
      {STATUSES[status][locale]}
    </span>
  );
}

export function ProjectCard({
  project,
  locale,
  index = 0,
}: {
  project: Project;
  locale: Locale3;
  index?: number;
}) {
  const t = PROJECTS_UI[locale];
  const readiness = projectReadiness(project);
  const { isSaved, toggle, isCompared, toggleCompare, compareSlugs } = useWatchlist();
  const saved = isSaved(project.slug);
  const compared = isCompared(project.slug);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.4, delay: Math.min((index % 3) * 0.05, 0.15) }
      }
      className="group relative bg-white border border-[#0b0b10]/10 p-7 flex flex-col hover:border-[#5a1f2e]/40 transition-[border-color,box-shadow] duration-300"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 start-0 h-[2px] w-0 bg-[#f2a007] group-hover:w-full transition-all duration-500"
      />

      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 shrink-0 bg-[#5a1f2e]/[0.06] border border-[#5a1f2e]/15 text-[#5a1f2e] flex items-center justify-center group-hover:bg-[#5a1f2e] group-hover:text-[#fdfcfb] transition-colors duration-300"
            aria-hidden="true"
          >
            {(() => {
              const Icon = SECTOR_ICONS[project.sector];
              return <Icon size={20} strokeWidth={1.5} />;
            })()}
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <span className="t-meta text-[#5a1f2e] text-[10px]">
              {COUNTRIES[project.country][locale]}
            </span>
            <Link asChild href={localizedLinkPath(`/sectors/${project.sector}`, locale)}>
              <a className="t-meta text-[#0b0b10]/65 text-[10px] hover:text-[#5a1f2e] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 transition-colors text-start">
                {SECTORS[project.sector][locale]}
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <StatusBadge status={project.status} locale={locale} />
           {project.type !== "initiative" && <>
             <button
               type="button"
               onClick={() => toggle(project.slug)}
               aria-label={saved ? t.removeSavedProjectLabel : t.saveProjectLabel}
               aria-pressed={saved}
               title={saved ? t.removeSavedProjectLabel : t.saveProjectLabel}
               className={`inline-flex h-11 w-11 items-center justify-center border transition-[color,border-color,background-color,transform] duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 ${saved ? "border-[#f2a007] bg-[#f2a007]/10 text-[#6b4a00]" : "border-[#0b0b10]/10 text-[#0b0b10]/65 hover:border-[#5a1f2e]/40 hover:text-[#5a1f2e]"}`}
             >
               {saved ? <BookmarkCheck size={15} aria-hidden="true" /> : <Bookmark size={15} aria-hidden="true" />}
             </button>
             {saved && (
               <button
                 type="button"
                 disabled={!compared && compareSlugs.length >= 3}
                 onClick={() => toggleCompare(project.slug)}
                 aria-label={compared ? t.removeComparedProjectLabel : (!compared && compareSlugs.length >= 3) ? t.compareLimitLabel : t.compareProjectLabel}
                 aria-pressed={compared}
                 title={compared ? t.removeComparedProjectLabel : (!compared && compareSlugs.length >= 3) ? t.compareLimitLabel : t.compareProjectLabel}
                 className={`inline-flex h-11 w-11 items-center justify-center border transition-[color,border-color,background-color,transform] duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 ${compared ? "border-[#5a1f2e] bg-[#5a1f2e] text-[#fdfcfb]" : (!compared && compareSlugs.length >= 3) ? "border-[#0b0b10]/10 text-[#0b0b10]/35 bg-[#0b0b10]/[0.02] cursor-not-allowed" : "border-[#0b0b10]/10 text-[#0b0b10]/65 hover:border-[#5a1f2e]/40 hover:text-[#5a1f2e]"}`}
               >
                 <GitCompareArrows size={15} aria-hidden="true" />
               </button>
             )}
           </>}
        </div>
      </div>

      <h3 className="text-lg font-bold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors leading-snug mb-3">
        {project.title[locale]}
      </h3>

      <p className="text-sm text-[#0b0b10]/70 leading-relaxed line-clamp-2 mb-6">
        {project.description[locale]}
      </p>

      <div
        className="mb-5 space-y-2"
        role="progressbar"
        aria-valuenow={readiness.score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${t.readinessProfileLabel}: ${readiness.score}%`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="t-meta text-[10px] text-[#0b0b10]/65 min-w-0 break-words">{t.readinessProfileLabel}</span>
          <span className="t-data tabular-nums text-xs font-semibold text-[#5a1f2e] shrink-0" dir="ltr">{readiness.score}%</span>
        </div>
        <div className="h-1.5 bg-[#0b0b10]/[0.06]" aria-hidden="true">
          <div className="h-full bg-[#f2a007]" style={{ width: `${readiness.score}%` }} />
        </div>
      </div>

      <div className="mt-auto pt-5 border-t border-[#0b0b10]/8 flex items-center justify-between gap-3">
        <span className="t-meta text-[10px] text-[#0b0b10]/65">
          {TYPES[project.type][locale]}
        </span>
        <Link asChild href={localizedLinkPath(`/projects/${project.slug}`, locale)}>
          <a
            className="inline-flex min-h-11 items-center gap-1.5 t-meta text-[10px] text-[#5a1f2e] border-b border-[#5a1f2e]/30 hover:border-[#5a1f2e] pb-0.5 transition-[border-color,transform] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2"
          >
            {t.explore}
            <ArrowRight size={12} className="rtl:-scale-x-100" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </Link>
      </div>
    </motion.article>
  );
}
