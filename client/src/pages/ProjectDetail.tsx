import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ShieldAlert, CheckCircle2, Handshake } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/projects/ProjectCard";
import { useLanguageContext } from "@/contexts/LanguageContext";
import {
  COUNTRIES,
  SECTORS,
  STATUSES,
  TYPES,
  PROJECTS_UI,
  projectBySlug,
  type Locale3,
} from "@/projects";

export default function ProjectDetail({ params }: { params?: { slug?: string } }) {
  const { lang, content } = useLanguageContext();
  const locale = lang as Locale3;
  const t = PROJECTS_UI[locale];

  // wouter Route passes params via props; fall back to path parsing
  const slug =
    params?.slug ??
    (typeof window !== "undefined"
      ? window.location.pathname.replace(/^\/(ar|fr)/, "").split("/")[2]
      : "");

  const project = projectBySlug(slug ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${lang === "ar" ? "font-arabic" : ""}`}>
      <SEO
        title={project ? `${project.title[locale]} | AIABASD` : t.pageTitle}
        description={project ? project.description[locale] : t.headerNote}
        lang={lang}
        url={`/projects/${slug}`}
      />
      <Header nav={content.nav} />

      <main id="main-content" className="pt-24">
        {!project ? (
          <Section className="py-24">
            <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 text-center space-y-6">
              <h1 className="text-2xl font-bold">{t.detailTitle}</h1>
              <p className="t-meta text-black/50">404</p>
              <Link href="/projects">
                <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] pb-0.5 transition-colors">
                  {t.backLabel}
                </a>
              </Link>
            </div>
          </Section>
        ) : (
          <>
            {/* Header */}
            <Section className="relative py-12 border-b border-black/10 bg-white">
              <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                <Link href="/projects">
                  <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] pb-1 mb-8 transition-colors">
                    <ArrowLeft size={14} className="rtl:-scale-x-100" aria-hidden="true" />
                    {t.backLabel}
                  </a>
                </Link>

                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="t-meta text-[#5a1f2e]">{t.detailTitle}</span>
                    <span className="t-meta text-black/40">{t.detailNote}</span>
                  </div>
                  <StatusBadge status={project.status} locale={locale} />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-[#0b0b10] leading-tight max-w-4xl">
                  {project.title[locale]}
                </h1>
              </div>
            </Section>

            {/* Fact strip */}
            <div className="border-b border-black/10 bg-[#fdfcfb]">
              <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-black/10 border-x border-black/10">
                {[
                  { label: t.countryLabel, value: COUNTRIES[project.country][locale] },
                  ...(project.location ? [{ label: t.locationLabel, value: project.location[locale] }] : []),
                  { label: t.sectorLabel, value: SECTORS[project.sector][locale] },
                  { label: t.statusLabel, value: STATUSES[project.status][locale] },
                  { label: t.typeLabel, value: TYPES[project.type][locale] },
                  ...(project.scale ? [{ label: t.scaleLabel, value: project.scale[locale] }] : []),
                ].map((item) => (
                  <div key={item.label} className="bg-[#fdfcfb] px-4 py-5">
                    <div className="t-meta text-black/50 text-[10px] mb-1.5">{item.label}</div>
                    <div className="text-sm font-semibold text-[#0b0b10] leading-snug">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <Section className="py-14">
              <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 grid lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7 space-y-10">
                  <div>
                    <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-5">
                      {t.detailTitle}
                    </h2>
                    <p className="text-base text-black/75 leading-relaxed">
                      {project.description[locale]}
                    </p>
                    {project.model && (
                      <p className="text-sm text-black/60 leading-relaxed mt-4">
                        <span className="t-meta text-black/50 text-[10px] me-2">{t.modelLabel}:</span>
                        {project.model[locale]}
                      </p>
                    )}
                  </div>

                  <div>
                    <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-5">
                      {t.objectivesLabel}
                    </h2>
                    <ul className="space-y-3">
                      {project.objectives.map((o, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-black/70 leading-relaxed">
                          <CheckCircle2 size={16} className="text-[#5a1f2e] shrink-0 mt-0.5" aria-hidden="true" />
                          {o[locale]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-5">
                      {t.partnershipLabel}
                    </h2>
                    <ul className="space-y-3">
                      {project.partnership.map((o, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-black/70 leading-relaxed">
                          <Handshake size={16} className="text-[#5a1f2e] shrink-0 mt-0.5" aria-hidden="true" />
                          {o[locale]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                  <div className="bg-[#0b0b10] text-[#fdfcfb] p-8">
                    <h2 className="t-meta text-[#f2a007] mb-4">{t.discuss}</h2>
                    <p className="text-sm text-white/65 leading-relaxed mb-6">
                      {STATUSES[project.status][locale]}
                    </p>
                    <a
                      href="/#contact"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#f2a007] hover:bg-white text-[#0b0b10] font-semibold text-xs uppercase tracking-wider px-6 py-3.5 transition-colors"
                    >
                      {t.discuss}
                    </a>
                    <p className="text-xs text-white/45 leading-relaxed mt-5">
                      {t.detailNote}
                    </p>
                  </div>

                  <div role="note" className="border border-black/10 bg-white p-6 flex items-start gap-3.5">
                    <ShieldAlert size={16} className="text-[#5a1f2e] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="t-meta text-[#5a1f2e] mb-2 text-[10px]">{t.disclaimerLabel}</p>
                      <p className="text-xs text-black/60 leading-relaxed">{t.disclaimer}</p>
                    </div>
                  </div>
                </aside>
              </div>
            </Section>
          </>
        )}
      </main>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
