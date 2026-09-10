import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, CircleCheck, CircleDashed, Clock3 } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { INTELLIGENCE_RECORDS, PLATFORM_COPY, localizedCatalogProject } from "@/platform";
import { trackEvent } from "@/services/analytics";
import { localizedLinkPath } from "@/localePath";

export default function Intelligence() {
  const { lang, content, isRTL } = useLanguageContext();
  const shouldReduceMotion = useReducedMotion();
  const t = PLATFORM_COPY[lang];

  useEffect(() => {
    trackEvent("intelligence_view");
  }, []);

  const stateLabel = (state: (typeof INTELLIGENCE_RECORDS)[number]["confidence"]) =>
    state === "framework" ? t.intelligence.frameworkLabel : state === "reviewed" ? t.intelligence.reviewedLabel : t.intelligence.validationLabel;
  const StateIcon = (state: (typeof INTELLIGENCE_RECORDS)[number]["confidence"]) =>
    state === "reviewed" ? CircleCheck : state === "framework" ? BookOpen : CircleDashed;

  const stateTone = (state: (typeof INTELLIGENCE_RECORDS)[number]["confidence"]) => {
    switch (state) {
      case "reviewed":
        return "text-[#5a1f2e] bg-[#5a1f2e]/[0.06] border-[#5a1f2e]/20";
      case "to-be-validated":
        return "text-[#6b4a00] bg-[#f2a007]/[0.12] border-[#f2a007]/30";
      case "framework":
      default:
        return "text-[#0b0b10]/70 bg-[#0b0b10]/[0.04] border-[#0b0b10]/15";
    }
  };

  return (
    <div className={`min-h-[100dvh] bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO title={`${t.intelligence.title} | AIABASD`} description={t.intelligence.intro} lang={lang} url="/intelligence" />
      <Header nav={content.nav} />
      <div className="pt-24">
        <section className="border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 py-16 md:px-12 lg:px-24 lg:py-24">
            <p className="t-meta mb-5 text-[#5a1f2e]">{t.intelligence.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#0b0b10] md:text-6xl">{t.intelligence.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#0b0b10]/70 md:text-lg">{t.intelligence.intro}</p>
            <div className="mt-10 max-w-4xl border-s-2 border-[#f2a007] bg-[#f2a007]/10 p-5 text-sm leading-relaxed text-[#0b0b10]/75">
              {t.intelligence.catalogNote}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-6 py-16 md:px-12 lg:px-24 lg:py-24">
          <div className="mb-10 flex items-end justify-between border-b border-[#0b0b10]/10 pb-5">
            <h2 className="text-3xl font-bold tracking-tight text-[#0b0b10] md:text-4xl">{t.intelligence.recordsLabel}</h2>
            <span className="t-data tabular-nums text-xs text-[#0b0b10]/60" dir="ltr">
              <bdi>{String(INTELLIGENCE_RECORDS.length).padStart(2, "0")} / REGISTER</bdi>
            </span>
          </div>
          <div className="space-y-5">
            {INTELLIGENCE_RECORDS.map((record, index) => {
              const Icon = StateIcon(record.confidence);
              return (
                <motion.article
                  key={record.id}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.16) }}
                  className="relative group grid grid-cols-1 gap-8 border border-[#0b0b10]/10 bg-white p-6 hover:border-[#5a1f2e]/40 transition-[border-color] duration-300 md:grid-cols-12 md:p-8"
                >
                  <span
                    className="absolute top-0 start-0 h-[2px] w-0 bg-[#f2a007] transition-[width] duration-500 group-hover:w-full"
                    aria-hidden="true"
                  />
                  <div className="md:col-span-7">
                    <div className="flex items-start justify-between gap-5">
                      <span className={`inline-flex items-center gap-1.5 t-meta text-[10px] px-2.5 py-1 border ${stateTone(record.confidence)}`}>
                        <Icon size={13} strokeWidth={1.5} aria-hidden="true" />
                        <span>{stateLabel(record.confidence)}</span>
                      </span>
                      <span className="t-data tabular-nums text-xs text-[#0b0b10]/60" dir="ltr">
                        <bdi>BRF_{String(index + 1).padStart(2, "0")}</bdi>
                      </span>
                    </div>
                    <h3 className="mt-7 max-w-2xl text-2xl font-bold tracking-tight text-[#0b0b10] md:text-3xl">{record.title[lang]}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#0b0b10]/70">{record.summary[lang]}</p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {record.relatedProjectSlugs.map((slug) => (
                        <Link key={slug} asChild href={localizedLinkPath(`/projects/${slug}`, lang)}>
                          <a className="inline-flex items-center border border-[#0b0b10]/10 bg-white px-3 py-1.5 t-meta text-[10px] text-[#0b0b10]/70 transition-[color,border-color,transform] duration-150 hover:border-[#5a1f2e]/40 hover:text-[#5a1f2e] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2">
                            {localizedCatalogProject(slug, lang)}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-[#0b0b10]/10 pt-6 md:col-span-5 md:border-s md:border-t-0 md:ps-8 md:pt-0">
                    <dl className="grid grid-cols-1 gap-5 text-sm sm:grid-cols-2 md:grid-cols-1">
                      <div>
                        <dt className="t-meta text-[10px] text-[#0b0b10]/60">{t.intelligence.sourceLabel}</dt>
                        <dd className="mt-1 font-semibold text-[#0b0b10]">{record.source[lang]}</dd>
                      </div>
                      <div>
                        <dt className="t-meta text-[10px] text-[#0b0b10]/60">{t.intelligence.dateLabel}</dt>
                        <dd className="mt-1 flex items-center gap-2 text-[#0b0b10]/75">
                          <Clock3 size={14} strokeWidth={1.5} aria-hidden="true" />
                          <span dir="ltr" className="t-data tabular-nums">
                            <bdi>{record.publicationDate[lang]}</bdi>
                          </span>
                        </dd>
                      </div>
                      <div>
                        <dt className="t-meta text-[10px] text-[#0b0b10]/60">{t.intelligence.geographyLabel}</dt>
                        <dd className="mt-1 text-[#0b0b10]/75">{record.geography[lang]}</dd>
                      </div>
                      <div>
                        <dt className="t-meta text-[10px] text-[#0b0b10]/60">{t.intelligence.sectorLabel}</dt>
                        <dd className="mt-1 text-[#0b0b10]/75">{record.sector[lang]}</dd>
                      </div>
                    </dl>
                    {record.sourceUrl && (
                      <Link asChild href={localizedLinkPath(record.sourceUrl, lang)}>
                        <a className="mt-7 inline-flex min-h-11 items-center gap-2 t-meta text-[11px] text-[#5a1f2e] border-b border-[#5a1f2e]/30 pb-0.5 hover:border-[#5a1f2e] hover:text-[#0b0b10] active:translate-y-px transition-[color,border-color,transform] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2">
                          {t.intelligence.openSourceLabel}
                          <ArrowUpRight size={14} strokeWidth={1.5} className="rtl:-scale-x-100" aria-hidden="true" />
                        </a>
                      </Link>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
        <div className="border-y border-[#0b0b10]/10 bg-[#0b0b10] text-[#fdfcfb]">
          <div className="mx-auto max-w-[1500px] px-6 py-8 text-sm leading-relaxed text-[#fdfcfb]/80 md:px-12 lg:px-24">
            {t.intelligence.validationNote}
          </div>
        </div>
      </div>
      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
