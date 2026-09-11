import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  Handshake,
  ChevronRight,
  Download,
  FileText,
} from "lucide-react";
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
import {
  deployAssetPath,
  localizedLinkPath,
  localizedPath,
} from "@/localePath";
import { projectReadiness } from "@/readiness";

// Fact count varies 5–7 (location/scale/model are optional), so the desktop track
// count follows the content — otherwise the last row renders orphan cells.
const FACT_COLS: Record<number, string> = {
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
};

export default function ProjectDetail({
  params,
}: {
  params?: { slug?: string };
}) {
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
  const readiness = project ? projectReadiness(project) : null;

  // Related: same sector first, then same country, excluding self — max 3
  const related = useMemo(() => {
    if (!project) return [];
    const others = PROJECTS.filter(p => p.slug !== project.slug);
    const sameSector = others.filter(p => p.sector === project.sector);
    const sameCountry = others.filter(
      p => p.country === project.country && p.sector !== project.sector
    );
    return [...sameSector, ...sameCountry].slice(0, 3);
  }, [project]);

  const contactHref = localizedPath(
    project ? `/?project=${project.slug}#contact` : "/#contact",
    lang
  );

  const teaserHref = localizedPath(
    project ? `/?project=${project.slug}&intent=teaser#contact` : "/?intent=teaser#contact",
    lang
  );

  const facts: { label: string; value: string }[] = project
    ? [
        { label: t.countryLabel, value: COUNTRIES[project.country][locale] },
        ...(project.location
          ? [{ label: t.locationLabel, value: project.location[locale] }]
          : []),
        { label: t.sectorLabel, value: SECTORS[project.sector][locale] },
        { label: t.statusLabel, value: STATUSES[project.status][locale] },
        { label: t.typeLabel, value: TYPES[project.type][locale] },
        ...(project.scale
          ? [{ label: t.scaleLabel, value: project.scale[locale] }]
          : []),
        ...(project.model
          ? [{ label: t.modelLabel, value: project.model[locale] }]
          : []),
      ]
    : [];

  const reviewedDate = project
    ? new Date(projectLastReviewed(project)).toLocaleDateString(
        locale === "ar" ? "ar" : locale === "fr" ? "fr-FR" : "en-GB",
        { day: "numeric", month: "long", year: "numeric" }
      )
    : "";

  const verificationScope: string[] = useMemo(() => {
    if (!project) return [];
    if (project.verification?.scope && project.verification.scope.length > 0) {
      return project.verification.scope.map((entry) => entry[locale]);
    }
    const derived: string[] = [
      `${t.countryLabel}: ${COUNTRIES[project.country][locale]}`,
      `${t.sectorLabel}: ${SECTORS[project.sector][locale]}`,
      t.detailTitle,
      `${t.objectivesLabel} (${project.objectives.length})`,
      `${t.partnershipLabel} (${project.partnership.length})`,
    ];
    if (project.location) derived.splice(2, 0, `${t.locationLabel}: ${project.location[locale]}`);
    if (project.scale) derived.push(`${t.scaleLabel}: ${project.scale[locale]}`);
    if (project.model) derived.push(`${t.modelLabel}: ${project.model[locale]}`);
    return derived;
  }, [project, locale, t]);

  const changeHistory = useMemo(() => {
    if (!project) return [];
    if (project.updates && project.updates.length > 0) {
      return project.updates.map((u) => ({
        date: u.date,
        formattedDate: new Date(u.date).toLocaleDateString(
          locale === "ar" ? "ar" : locale === "fr" ? "fr-FR" : "en-GB",
          { day: "numeric", month: "long", year: "numeric" }
        ),
        label: u.label[locale],
      }));
    }
    const iso = project.verification?.profileReviewed ?? projectLastReviewed(project);
    return [
      {
        date: iso,
        formattedDate: new Date(iso).toLocaleDateString(
          locale === "ar" ? "ar" : locale === "fr" ? "fr-FR" : "en-GB",
          { day: "numeric", month: "long", year: "numeric" }
        ),
        label: t.historyInitialEntry,
      },
    ];
  }, [project, locale, t]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div
      className={`min-h-[100dvh] bg-[#fdfcfb] text-[#0b0b10] ${lang === "ar" ? "font-arabic" : ""}`}
    >
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
              {
                "@type": "ListItem",
                position: 1,
                name: t.homeCrumb,
                item: `https://aiabasd.org${localizedPath("/", locale)}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: t.backLabel,
                item: `https://aiabasd.org${localizedPath("/projects", locale)}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: project.title[locale],
                item: `https://aiabasd.org${localizedPath(`/projects/${project.slug}`, locale)}`,
              },
            ],
          })}
        </script>
      )}
      <Header nav={content.nav} />

      <div className="pt-24">
        {project && (
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 pt-6"
          >
            <ol className="t-meta text-[11px] text-[#0b0b10]/60 flex items-center gap-1.5 flex-wrap">
              <li>
                <a
                  href={localizedPath("/", lang)}
                  className="hover:text-[#5a1f2e] transition-[color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px"
                >
                  {t.homeCrumb}
                </a>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={11} className="rtl:-scale-x-100 text-[#0b0b10]/40" />
              </li>
              <li>
                <Link href={localizedLinkPath("/projects", lang)} asChild>
                  <a className="hover:text-[#5a1f2e] transition-[color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px">
                    {t.backLabel}
                  </a>
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={11} className="rtl:-scale-x-100 text-[#0b0b10]/40" />
              </li>
              <li aria-current="page" className="text-[#5a1f2e] font-semibold">
                {project.title[locale]}
              </li>
            </ol>
          </nav>
        )}
        {!project ? (
          <Section className="py-24">
            <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 text-center space-y-6">
              <h1 className="text-2xl font-bold text-[#0b0b10]">{t.detailTitle}</h1>
              <p className="t-meta text-[#5a1f2e]" dir="ltr"><bdi>404</bdi></p>
              <Link href={localizedLinkPath("/projects", lang)} asChild>
                <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] pb-1 transition-[color,border-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px">
                  <ArrowLeft
                    size={14}
                    className="rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                  <span>{t.backLabel}</span>
                </a>
              </Link>
            </div>
          </Section>
        ) : (
          <>
            {/* Header */}
            <Section className="relative py-12 border-b border-[#0b0b10]/10 bg-white">
              <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="t-meta text-[#5a1f2e]">
                      {t.detailTitle}
                    </span>
                    <span className="t-meta text-[#0b0b10]/60">{t.detailNote}</span>
                  </div>
                  <StatusBadge status={project.status} locale={locale} />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-[#0b0b10] leading-tight max-w-4xl">
                  {project.title[locale]}
                </h1>
              </div>
            </Section>

            {/* Fact strip */}
            <div className="border-b border-[#0b0b10]/10 bg-[#fdfcfb]">
              <div
                className={`mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 grid grid-cols-2 md:grid-cols-3 ${FACT_COLS[facts.length] ?? "lg:grid-cols-6"}`}
              >
                {facts.map(item => (
                  <div
                    key={item.label}
                    className="border-b border-e border-[#0b0b10]/10 last:border-e-0 px-4 py-5"
                  >
                    <div className="t-meta text-[#0b0b10]/60 text-[10px] mb-1.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-[#0b0b10] leading-snug">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <Section className="py-14">
              <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 grid lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7 space-y-10">
                  <div>
                    {readiness && (
                      <div className="mb-10 border border-[#0b0b10]/10 bg-white p-6 md:p-7 shadow-[0_4px_12px_-4px_rgba(90,31,46,0.08)]">
                        <div className="flex items-start justify-between gap-5">
                          <div>
                            <h2 className="t-meta text-[#5a1f2e]">
                              {t.readinessLabel}
                            </h2>
                            <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#0b0b10]/70">
                              {t.readinessNote}
                            </p>
                          </div>
                          <span className="t-data tabular-nums text-2xl font-bold text-[#5a1f2e]" dir="ltr">
                            <bdi>{readiness.score}%</bdi>
                          </span>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-3">
                          {readiness.factors.map(factor => {
                            const labels = {
                              status: t.statusLabel,
                              location: t.locationLabel,
                              scale: t.scaleLabel,
                              model: t.modelLabel,
                              objectives: t.objectivesLabel,
                              partnership: t.partnershipLabel,
                            };
                            return (
                              <div key={factor.key}>
                                <div className="mb-1.5 flex items-center justify-between gap-2 t-meta text-[10px] text-[#0b0b10]/60">
                                  <span>{labels[factor.key]}</span>
                                  <span className="t-data tabular-nums" dir="ltr">
                                    <bdi>{factor.points}/{factor.max}</bdi>
                                  </span>
                                </div>
                                <div
                                  className="h-1.5 bg-[#0b0b10]/[0.06]"
                                  aria-hidden="true"
                                >
                                  <div
                                    className="h-full bg-[#f2a007]"
                                    style={{
                                      width: `${(factor.points / factor.max) * 100}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-5">
                      {t.detailTitle}
                    </h2>
                    <p className="text-base text-[#0b0b10]/75 leading-relaxed">
                      {project.description[locale]}
                    </p>
                    {project.model && (
                      <p className="text-sm text-[#0b0b10]/70 leading-relaxed mt-4">
                        <span className="t-meta text-[#0b0b10]/60 text-[10px] me-2">
                          {t.modelLabel}:
                        </span>
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
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-[#0b0b10]/75 leading-relaxed"
                        >
                          <CheckCircle2
                            size={16}
                            strokeWidth={1.75}
                            className="text-[#5a1f2e] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{o[locale]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-5">
                      {t.partnershipLabel}
                    </h2>
                    <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                      {project.partnership.map((o, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 border-s-2 border-[#5a1f2e]/25 ps-3.5 text-sm text-[#0b0b10]/75 leading-relaxed"
                        >
                          <Handshake
                            size={16}
                            strokeWidth={1.75}
                            className="text-[#5a1f2e] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{o[locale]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verification Record & Change History */}
                  <div className="border border-[#0b0b10]/10 bg-white p-7 shadow-premium space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#0b0b10]/10 pb-4">
                      <div>
                        <h2 className="t-meta text-[#5a1f2e]">
                          {t.verificationTitle}
                        </h2>
                        <p className="text-xs text-[#0b0b10]/60 mt-1 flex items-center gap-1.5 flex-wrap">
                          <span>{t.lastReviewedLabel}:</span>
                          <span dir="ltr"><bdi>{reviewedDate}</bdi></span>
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 t-meta text-[10px] px-2.5 py-1.5 border text-[#6b4a00] bg-[#f2a007]/[0.12] border-[#f2a007]/30 self-start sm:self-auto">
                        <span className="w-1.5 h-1.5 bg-[#f2a007]" aria-hidden="true" />
                        {t.verificationBadge}
                      </span>
                    </div>

                    <p className="text-sm text-[#0b0b10]/75 leading-relaxed">
                      {t.verificationStatus}
                    </p>

                    <div>
                      <h3 className="t-meta text-[10px] text-[#0b0b10]/60 uppercase tracking-wider mb-3">
                        {t.verificationScopeLabel}
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {verificationScope.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2.5 text-xs text-[#0b0b10]/75"
                          >
                            <span className="w-1.5 h-1.5 bg-[#5a1f2e] shrink-0" aria-hidden="true" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.verification?.notes && (
                      <div className="pt-3 border-t border-[#0b0b10]/10">
                        <h4 className="t-meta text-[10px] text-[#0b0b10]/60 uppercase tracking-wider mb-1.5">
                          {t.verificationNotesLabel}
                        </h4>
                        <p className="text-xs text-[#0b0b10]/70 leading-relaxed">
                          {project.verification.notes[locale]}
                        </p>
                      </div>
                    )}

                    {/* Change History */}
                    <div className="pt-4 border-t border-[#0b0b10]/10">
                      <h3 className="t-meta text-[10px] text-[#0b0b10]/60 uppercase tracking-wider mb-3">
                        {t.historyTitle}
                      </h3>
                      <div className="border border-[#0b0b10]/10 divide-y divide-[#0b0b10]/10 bg-[#fdfcfb]">
                        {changeHistory.map((entry, idx) => (
                          <div
                            key={idx}
                            className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] items-baseline px-4 py-3 text-xs gap-1 sm:gap-4"
                          >
                            <span className="t-data text-[#0b0b10]/60 tabular-nums" dir="ltr">
                              <bdi>{entry.formattedDate}</bdi>
                            </span>
                            <span className="text-[#0b0b10]/80 font-medium leading-relaxed">
                              {entry.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                  <div className="relative bg-[#0b0b10] text-[#fdfcfb] p-8 border border-white/10 shadow-[0_18px_40px_rgba(90,31,46,0.22)]">
                    <h2 className="t-meta text-[#f2a007] mb-4">{t.discuss}</h2>
                    <p className="text-sm text-[#fdfcfb]/75 leading-relaxed mb-6">
                      {STATUSES[project.status][locale]}
                    </p>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="w-full inline-flex items-center justify-center gap-2 border border-white/25 hover:border-[#f2a007] hover:bg-white/[0.06] text-[#fdfcfb] t-meta text-xs px-6 py-3.5 transition-[color,border-color,background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 active:translate-y-px cursor-pointer print:hidden"
                      >
                        <Download size={14} aria-hidden="true" />
                        <span>{t.downloadBrief}</span>
                      </button>
                      <a
                        href={teaserHref}
                        className="w-full inline-flex items-center justify-center gap-2 border border-[#fdfcfb]/45 bg-[#0b0b10]/35 hover:bg-[#fdfcfb]/10 hover:border-[#fdfcfb] text-[#fdfcfb] t-meta text-xs px-6 py-3.5 transition-[color,border-color,background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 active:translate-y-px"
                      >
                        <FileText size={14} aria-hidden="true" />
                        <span>{t.requestTeaser}</span>
                      </a>
                      <a
                        href={contactHref}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#f2a007] hover:bg-[#fdfcfb] text-[#0b0b10] t-meta text-xs px-6 py-3.5 transition-[color,background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 active:translate-y-px shadow-[0_4px_12px_rgba(90,31,46,0.25)]"
                      >
                        <span>{t.discuss}</span>
                      </a>
                    </div>
                    <p className="text-xs text-[#fdfcfb]/70 leading-relaxed mt-4">
                      {t.teaserNote}
                    </p>
                    <p className="text-xs text-[#fdfcfb]/60 leading-relaxed mt-5 flex items-center gap-1.5 flex-wrap">
                      <span>{t.lastReviewedLabel}:</span>
                      <span dir="ltr"><bdi>{reviewedDate}</bdi></span>
                    </p>
                    <p className="text-xs text-[#fdfcfb]/60 leading-relaxed mt-2">
                      {t.detailNote}
                    </p>
                  </div>

                  <div
                    role="note"
                    className="border border-[#0b0b10]/10 bg-white p-6 flex items-start gap-3.5 shadow-[0_4px_12px_-4px_rgba(90,31,46,0.06)]"
                  >
                    <ShieldAlert
                      size={16}
                      className="text-[#5a1f2e] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="t-meta text-[#5a1f2e] mb-2 text-[10px]">
                        {t.disclaimerLabel}
                      </p>
                      <p className="text-xs text-[#0b0b10]/70 leading-relaxed">
                        {t.disclaimer}
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </Section>
            {/* Related projects */}
            {related.length > 0 && (
              <Section className="py-14 border-t border-[#0b0b10]/10">
                <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                  <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-8">
                    {t.relatedLabel}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {related.map((p, i) => (
                      <ProjectCard
                        key={p.slug}
                        project={p}
                        locale={locale}
                        index={i}
                      />
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
            <img
              src={deployAssetPath("/logo.png")}
              alt="AIABASD"
              className="brief-logo"
            />
            <div>
              <div className="brief-org">AIABASD</div>
              <div className="brief-org-full">
                {COPY.en.metaTitle.replace("AIABASD - ", "")}
              </div>
            </div>
            <div className="brief-ref">OPPORTUNITY_BRIEF</div>
          </header>
          <h1 className="brief-title">{project.title[locale]}</h1>
          <table className="brief-facts">
            <tbody>
              {facts.map(f => (
                <tr key={f.label}>
                  <th>{f.label}</th>
                  <td>{f.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {readiness && (
            <div className="brief-readiness">
              <div className="brief-readiness-head">
                <span>{t.readinessProfileLabel}</span>
                <strong>{readiness.score}%</strong>
              </div>
              <div className="brief-readiness-track" aria-hidden="true">
                <div style={{ width: `${readiness.score}%` }} />
              </div>
              <p>{t.readinessNote}</p>
            </div>
          )}
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
