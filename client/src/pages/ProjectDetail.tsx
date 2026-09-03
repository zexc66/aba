import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import { ArrowLeft, ShieldAlert, CheckCircle2, Handshake, ChevronRight, Download } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Section } from "@/components/ui/section";
import { ProjectCard, StatusBadge } from "@/components/projects/ProjectCard";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { COPY } from "@/data";
import {
  COUNTRIES,
  SECTORS,
  STATUSES,
  TYPES,
  PROJECTS_UI,
  PROJECTS,
  projectBySlug,
  projectLastReviewed,
  type Locale3,
} from "@/projects";
import { localizedLinkPath, localizedPath } from "@/localePath";

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

  // Related: same sector first, then same country, excluding self — max 3
  const related = useMemo(() => {
    if (!project) return [];
    const others = PROJECTS.filter((p) => p.slug !== project.slug);
    const sameSector = others.filter((p) => p.sector === project.sector);
    const sameCountry = others.filter(
      (p) => p.country === project.country && p.sector !== project.sector
    );
    return [...sameSector, ...sameCountry].slice(0, 3);
  }, [project]);

  const contactHref = localizedPath(project ? `/?project=${project.slug}#contact` : "/#contact", lang);

  const facts: { label: string; value: string }[] = project
    ? [
        { label: t.countryLabel, value: COUNTRIES[project.country][locale] },
        ...(project.location ? [{ label: t.locationLabel, value: project.location[locale] }] : []),
        { label: t.sectorLabel, value: SECTORS[project.sector][locale] },
        { label: t.statusLabel, value: STATUSES[project.status][locale] },
        { label: t.typeLabel, value: TYPES[project.type][locale] },
        ...(project.scale ? [{ label: t.scaleLabel, value: project.scale[locale] }] : []),
        ...(project.model ? [{ label: t.modelLabel, value: project.model[locale] }] : []),
      ]
    : [];

  const reviewedDate = project
    ? new Date(projectLastReviewed(project)).toLocaleDateString(
        locale === "ar" ? "ar" : locale === "fr" ? "fr-FR" : "en-GB",
        { day: "numeric", month: "long", year: "numeric" }
      )
    : "";

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
      {project && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: t.homeCrumb, item: "https://aiabasd.org/" },
              { "@type": "ListItem", position: 2, name: t.backLabel, item: "https://aiabasd.org/projects" },
              { "@type": "ListItem", position: 3, name: project.title.en, item: `https://aiabasd.org/projects/${project.slug}` },
            ],
          })}
        </script>
      )}
      <Header nav={content.nav} />

      <div className="pt-24">
        {project && (
          <nav aria-label="Breadcrumb" className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 pt-6">
            <ol className="t-meta text-[10px] text-black/45 flex items-center gap-1.5 flex-wrap">
              <li>
                <a href={localizedPath("/", lang)} className="hover:text-[#5a1f2e] transition-colors">{t.homeCrumb}</a>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={11} className="rtl:-scale-x-100" />
              </li>
              <li>
                <Link href={localizedLinkPath("/projects", lang)}>
                  <a className="hover:text-[#5a1f2e] transition-colors">{t.backLabel}</a>
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={11} className="rtl:-scale-x-100" />
              </li>
              <li aria-current="page" className="text-[#5a1f2e]">
                {project.title[locale]}
              </li>
            </ol>
          </nav>
        )}
        {!project ? (
          <Section className="py-24">
            <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 text-center space-y-6">
              <h1 className="text-2xl font-bold">{t.detailTitle}</h1>
              <p className="t-meta text-black/50">404</p>
              <Link href={localizedLinkPath("/projects", lang)}>
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
                <Link href={localizedLinkPath("/projects", lang)}>
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
                {facts.map((item) => (
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
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="w-full inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-semibold text-xs uppercase tracking-wider px-6 py-3.5 transition-colors cursor-pointer print:hidden"
                      >
                        <Download size={14} aria-hidden="true" />
                        {t.downloadBrief}
                      </button>
                      <a
                        href={contactHref}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#f2a007] hover:bg-white text-[#0b0b10] font-semibold text-xs uppercase tracking-wider px-6 py-3.5 transition-colors"
                      >
                        {t.discuss}
                      </a>
                    </div>
                    <p className="text-xs text-white/45 leading-relaxed mt-5">
                      {t.lastReviewedLabel}: {reviewedDate}
                    </p>
                    <p className="text-xs text-white/45 leading-relaxed mt-2">
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
            {/* Related projects */}
            {related.length > 0 && (
              <Section className="py-14 border-t border-black/10">
                <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                  <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-8">
                    {t.relatedLabel}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {related.map((p, i) => (
                      <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
                    ))}
                  </div>
                </div>
              </Section>
            )}
          </>
        )}
      </div>

      {/* Print one-pager: visible only in print/PDF output */}
      {project && (
        <div className="print-brief hidden" aria-hidden="true">
          <header className="brief-header">
            <img src="/logo.png" alt="AIABASD" className="brief-logo" />
            <div>
              <div className="brief-org">AIABASD</div>
              <div className="brief-org-full">{COPY.en.metaTitle.replace("AIABASD - ", "")}</div>
            </div>
            <div className="brief-ref">OPPORTUNITY_BRIEF</div>
          </header>
          <h1 className="brief-title">{project.title[locale]}</h1>
          <table className="brief-facts">
            <tbody>
              {facts.map((f) => (
                <tr key={f.label}>
                  <th>{f.label}</th>
                  <td>{f.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="brief-desc">{project.description[locale]}</p>
          <h2 className="brief-h2">{t.objectivesLabel}</h2>
          <ul className="brief-list">
            {project.objectives.map((o, i) => (
              <li key={i}>{o[locale]}</li>
            ))}
          </ul>
          <h2 className="brief-h2">{t.partnershipLabel}</h2>
          <ul className="brief-list">
            {project.partnership.map((o, i) => (
              <li key={i}>{o[locale]}</li>
            ))}
          </ul>
          <div className="brief-disclaimer">{t.disclaimer}</div>
          <footer className="brief-footer">
            <span>aiabasd.org · contact@aiabasd.org</span>
            <span>
              {t.lastReviewedLabel}: {reviewedDate}
            </span>
          </footer>
        </div>
      )}

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
