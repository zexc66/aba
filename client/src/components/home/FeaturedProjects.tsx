import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { PROJECTS_UI, featuredProjects, type Locale3 } from "@/projects";
import { localizedLinkPath } from "@/localePath";

export default function FeaturedProjects() {
  const { lang } = useLanguageContext();
  const locale = lang as Locale3;
  const t = PROJECTS_UI[locale];
  const featured = featuredProjects(6);

  return (
    <Section id="featured-projects" className="relative py-20 bg-[#fdfcfb] border-b border-[#0b0b10]/10">
      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
        <SectionHeader
          index="02.1"
          title={t.featuredTitle}
          note={t.featuredNote}
        />

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-6 items-start">
          {featured[0] && (
            <div className="xl:sticky xl:top-28">
              <ProjectCard project={featured[0]} locale={locale} index={0} />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.slice(1).map((p, i) => (
              <ProjectCard key={p.slug} project={p} locale={locale} index={i + 1} />
            ))}
          </div>
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
