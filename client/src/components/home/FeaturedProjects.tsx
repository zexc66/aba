import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { PROJECTS_UI, featuredProjects, type Locale3 } from "@/projects";

export default function FeaturedProjects() {
  const { lang } = useLanguageContext();
  const locale = lang as Locale3;
  const t = PROJECTS_UI[locale];
  const featured = featuredProjects(6);

  return (
    <Section id="featured-projects" className="relative py-20 bg-[#fdfcfb] border-b border-black/10">
      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
        <SectionHeader
          index="02.1"
          title={t.featuredTitle}
          note={t.featuredNote}
          meta="OPPORTUNITY_PORTFOLIO"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link href="/projects">
            <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] py-2 transition-colors no-press">
              {t.viewAll}
              <ArrowRight size={14} className="rtl:-scale-x-100" aria-hidden="true" />
            </a>
          </Link>
        </div>
      </div>
    </Section>
  );
}
