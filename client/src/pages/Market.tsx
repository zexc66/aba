import { Link, useParams } from "wouter";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { COUNTRIES } from "@/countries";
import { SECTORS, type Locale3, type SectorKey } from "@/projects";
import {
  MARKET_SECTOR_BLURBS,
  MARKET_SECTORS,
  localizedCountryName,
  marketPath,
  projectsForMarket,
} from "@/markets";
import { MARKET_COPY } from "@/marketCopy";
import { localizedLinkPath } from "@/localePath";
import NotFound from "./NotFound";

export default function Market() {
  const { iso = "", sector = "" } = useParams<{ iso: string; sector: string }>();
  const { lang, isRTL, content } = useLanguageContext();
  const locale = lang as Locale3;
  const t = MARKET_COPY[locale];
  const node = COUNTRIES.find((c) => c.iso === iso);
  const sectorKey = MARKET_SECTORS.includes(sector as SectorKey) ? (sector as SectorKey) : null;

  if (!node || !sectorKey) return <NotFound />;

  const country = localizedCountryName(content.countries.list, iso);
  const sectorLabel = SECTORS[sectorKey][locale];
  const title = t.titleTemplate.replace("{sector}", sectorLabel).replace("{country}", country);
  const intro = t.introTemplate.replace("{sector}", sectorLabel).replace("{country}", country);
  const projects = projectsForMarket(iso, sectorKey);
  const blurb = MARKET_SECTOR_BLURBS[sectorKey][locale];
  const statusText = node.status === "active" ? t.statusActive : t.statusPipeline;

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO
        title={`${title} | AIABASD`}
        description={intro}
        lang={lang}
        url={`/opportunities/${iso}/${sectorKey}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: `https://aiabasd.org${content.nav && "/"}` },
            { "@type": "ListItem", position: 2, name: t.breadcrumbCountry, item: `https://aiabasd.org/opportunity-map` },
            { "@type": "ListItem", position: 3, name: title, item: `https://aiabasd.org/opportunities/${iso}/${sectorKey}` },
          ],
        }}
      />
      <Header nav={content.nav} />

      <div className="pt-28 pb-24">
        <Section className="py-16 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <p className="t-meta mb-4 text-[#5a1f2e]">{t.eyebrow}</p>
            <h1 className="max-w-4xl text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.08] text-balance">
              {title}
            </h1>
            <p className="mt-6 max-w-[65ch] text-base md:text-lg leading-relaxed text-[#0b0b10]/70 text-pretty">
              {intro}
            </p>
          </div>
        </Section>

        <div className="border-b border-[#0b0b10]/10 bg-[#fdfcfb]">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 grid grid-cols-2 md:grid-cols-4">
            {[
              { label: t.sectorTitle, value: sectorLabel },
              { label: t.regionLabel, value: node.region },
              { label: t.capitalLabel, value: lang === "ar" ? node.capitalAr : node.capital },
              { label: t.statusLabel, value: statusText },
            ].map((fact) => (
              <div key={fact.label} className="border-b border-e border-[#0b0b10]/10 last:border-e-0 px-4 py-5">
                <div className="t-meta text-[10px] text-[#0b0b10]/60 mb-1.5">{fact.label}</div>
                <div className="text-sm font-semibold leading-snug">{fact.value}</div>
              </div>
            ))}
          </div>
        </div>

        <Section className="py-14 border-b border-[#0b0b10]/10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 space-y-10">
            <SectionHeader index="01" title={t.projectsTitle} note={`${projects.length} ${t.projectsCount}`} />
            {projects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} locale={locale} />
                ))}
              </div>
            ) : (
              <p className="max-w-[75ch] border border-[#0b0b10]/15 bg-white p-6 text-sm leading-relaxed text-[#0b0b10]/70">
                {t.noProjects.replace("{country}", country)}
              </p>
            )}
            <div className="flex flex-wrap gap-5">
              <Link asChild href={localizedLinkPath("/submit-project", locale)}>
                <a className="inline-flex min-h-11 items-center gap-2 bg-[#5a1f2e] px-5 py-3 text-sm font-semibold text-[#fdfcfb] hover:bg-[#0b0b10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a1f2e]">
                  {t.ctaSubmit}
                  <ArrowRight size={15} className="rtl:-scale-x-100" aria-hidden="true" />
                </a>
              </Link>
              <Link asChild href={localizedLinkPath("/introductions", locale)}>
                <a className="inline-flex min-h-11 items-center text-sm font-semibold text-[#5a1f2e] underline underline-offset-4">{t.ctaIntro}</a>
              </Link>
            </div>
          </div>
        </Section>

        <Section className="py-14 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeader index="02" title={t.sectorTitle} />
              <p className="mt-8 max-w-[65ch] border-s-2 border-[#5a1f2e] ps-6 text-base leading-relaxed text-[#0b0b10]/75">
                {blurb}
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Link asChild href={localizedLinkPath(`/sectors/${sectorKey}`, locale)}>
                  <a className="t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 pb-1 w-fit hover:border-[#5a1f2e] transition-colors">
                    {t.browseSector.replace("{sector}", sectorLabel)}
                  </a>
                </Link>
                <Link asChild href={localizedLinkPath(`/corridors/${iso}`, locale)}>
                  <a className="t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 pb-1 w-fit hover:border-[#5a1f2e] transition-colors">
                    {t.browseCorridor.replace("{country}", country)}
                  </a>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <SectionHeader index="03" title={t.relatedTitle.replace("{country}", country)} />
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#0b0b10]/10 border border-[#0b0b10]/10">
                {MARKET_SECTORS.filter((s) => s !== sectorKey).map((s) => (
                  <li key={s} className="bg-white">
                    <Link asChild href={localizedLinkPath(`/opportunities/${iso}/${s}`, locale)}>
                      <a className="flex min-h-16 items-center justify-between gap-3 p-4 text-sm font-medium transition-colors hover:bg-[#5a1f2e]/[0.04]">
                        <span>{SECTORS[s][locale]}</span>
                        <ArrowRight size={14} className="shrink-0 text-[#5a1f2e] rtl:-scale-x-100" aria-hidden="true" />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
