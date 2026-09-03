import { useEffect } from "react";
import { motion } from "framer-motion";
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
  const t = PLATFORM_COPY[lang];

  useEffect(() => {
    trackEvent("intelligence_view");
  }, []);

  const stateLabel = (state: (typeof INTELLIGENCE_RECORDS)[number]["confidence"]) => state === "framework" ? t.intelligence.frameworkLabel : state === "reviewed" ? t.intelligence.reviewedLabel : t.intelligence.validationLabel;
  const StateIcon = (state: (typeof INTELLIGENCE_RECORDS)[number]["confidence"]) => state === "reviewed" ? CircleCheck : state === "framework" ? BookOpen : CircleDashed;

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO title={`${t.intelligence.title} | AIABASD`} description={t.intelligence.intro} lang={lang} url="/intelligence" />
      <Header nav={content.nav} />
      <div className="pt-24">
        <section className="border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 py-16 md:px-12 lg:px-24 lg:py-24">
            <p className="t-meta mb-5 text-[#5a1f2e]">{t.intelligence.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{t.intelligence.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">{t.intelligence.intro}</p>
            <div className="mt-10 max-w-4xl border-s-2 border-[#f2a007] bg-[#f2a007]/10 p-5 text-sm leading-relaxed text-black/70">
              {t.intelligence.catalogNote}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-6 py-16 md:px-12 lg:px-24 lg:py-24">
          <div className="mb-10 flex items-end justify-between border-b border-black/10 pb-5">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.intelligence.recordsLabel}</h2>
            <span className="t-data text-xs text-black/45" dir="ltr">{String(INTELLIGENCE_RECORDS.length).padStart(2, "0")} / REGISTER</span>
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
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="grid grid-cols-1 gap-8 border border-black/10 bg-white p-6 md:grid-cols-12 md:p-8"
                >
                  <div className="md:col-span-7">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-center gap-3 text-[#5a1f2e]"><Icon size={18} strokeWidth={1.5} /><span className="t-meta">{stateLabel(record.confidence)}</span></div>
                      <span className="t-data text-xs text-black/35" dir="ltr">BRF_{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-7 max-w-2xl text-2xl font-bold tracking-tight md:text-3xl">{record.title[lang]}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/65">{record.summary[lang]}</p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {record.relatedProjectSlugs.map((slug) => <Link key={slug} href={localizedLinkPath(`/projects/${slug}`, lang)} className="border border-black/10 px-3 py-2 text-xs text-black/65 transition-colors hover:border-[#5a1f2e] hover:text-[#5a1f2e]">{localizedCatalogProject(slug, lang)}</Link>)}
                    </div>
                  </div>
                  <div className="border-t border-black/10 pt-6 md:col-span-5 md:border-s md:border-t-0 md:ps-8 md:pt-0">
                    <dl className="grid grid-cols-1 gap-5 text-sm sm:grid-cols-2 md:grid-cols-1">
                      <div><dt className="t-meta text-black/45">{t.intelligence.sourceLabel}</dt><dd className="mt-1 font-semibold">{record.source[lang]}</dd></div>
                      <div><dt className="t-meta text-black/45">{t.intelligence.dateLabel}</dt><dd className="mt-1 flex items-center gap-2 text-black/70"><Clock3 size={14} /> <span dir="ltr">{record.publicationDate[lang]}</span></dd></div>
                      <div><dt className="t-meta text-black/45">{t.intelligence.geographyLabel}</dt><dd className="mt-1 text-black/70">{record.geography[lang]}</dd></div>
                      <div><dt className="t-meta text-black/45">{t.intelligence.sectorLabel}</dt><dd className="mt-1 text-black/70">{record.sector[lang]}</dd></div>
                    </dl>
                     {record.sourceUrl && <Link href={localizedLinkPath(record.sourceUrl, lang)} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5a1f2e] hover:text-black">{t.intelligence.openSourceLabel} <ArrowUpRight size={14} /></Link>}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
        <div className="border-y border-black/10 bg-[#0b0b10] text-white">
          <div className="mx-auto max-w-[1500px] px-6 py-8 text-sm leading-relaxed text-white/70 md:px-12 lg:px-24">{t.intelligence.validationNote}</div>
        </div>
      </div>
      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
