import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  COUNTRIES,
  SECTORS,
  STATUSES,
  TYPES,
  PROJECTS_UI,
  type Locale3,
  type Project,
  type ProjectStatus,
} from "@/projects";

/** Restrained status tones — subtle tints only, never promotional buttons. */
const STATUS_TONE: Record<ProjectStatus, string> = {
  "under-development": "text-[#5a1f2e] bg-[#5a1f2e]/[0.06] border-[#5a1f2e]/20",
  "cooperation-framework": "text-[#5a1f2e] bg-[#5a1f2e]/[0.06] border-[#5a1f2e]/20",
  "seeking-partners": "text-[#6b4a00] bg-[#f2a007]/[0.12] border-[#f2a007]/30",
  "investment-opportunity": "text-[#6b4a00] bg-[#f2a007]/[0.12] border-[#f2a007]/30",
  "technical-assessment": "text-black/60 bg-black/[0.03] border-black/15",
  "seeking-financing": "text-black/60 bg-black/[0.03] border-black/15",
  "procurement-opportunity": "text-black/60 bg-black/[0.03] border-black/15",
  "strategic-vision": "text-black/60 bg-black/[0.03] border-black/15",
};

export function StatusBadge({ status, locale }: { status: ProjectStatus; locale: Locale3 }) {
  return (
    <span
      className={`inline-flex items-center t-meta text-[10px] px-2.5 py-1 border ${STATUS_TONE[status]}`}
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
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min((index % 3) * 0.05, 0.15) }}
      className="group relative bg-white border border-black/10 p-7 flex flex-col hover:border-[#5a1f2e]/40 transition-colors duration-300"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] w-0 bg-[#f2a007] group-hover:w-full transition-all duration-500"
      />

      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 min-w-0">
          <span className="t-meta text-[#5a1f2e] text-[10px]">
            {COUNTRIES[project.country][locale]}
          </span>
          <span className="t-meta text-black/40 text-[10px]">
            {SECTORS[project.sector][locale]}
          </span>
        </div>
        <StatusBadge status={project.status} locale={locale} />
      </div>

      <h3 className="text-lg font-bold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors leading-snug mb-3">
        {project.title[locale]}
      </h3>

      <p className="text-sm text-black/65 leading-relaxed line-clamp-2 mb-6">
        {project.description[locale]}
      </p>

      <div className="mt-auto pt-5 border-t border-black/5 flex items-center justify-between gap-3">
        <span className="t-meta text-[10px] text-black/45">
          {TYPES[project.type][locale]}
        </span>
        <Link href={`/projects/${project.slug}`}>
          <a
            className="inline-flex items-center gap-1.5 t-meta text-[10px] text-[#5a1f2e] border-b border-[#5a1f2e]/30 hover:border-[#5a1f2e] pb-0.5 transition-colors"
          >
            {t.explore}
            <ArrowRight size={12} className="rtl:-scale-x-100" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </Link>
      </div>
    </motion.article>
  );
}
