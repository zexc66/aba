import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, Compass, FileCheck2, Network, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { PLATFORM_COPY, SERVICE_PACKAGES } from "@/platform";
import { trackEvent } from "@/services/analytics";
import { localizedLinkPath } from "@/localePath";

const ICONS = [Compass, FileCheck2, Network, ShieldCheck, ClipboardList];

export default function Services() {
  const { lang, content, isRTL } = useLanguageContext();
  const t = PLATFORM_COPY[lang];

  useEffect(() => {
    trackEvent("service_view");
  }, []);

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO title={`${t.services.title} | AIABASD`} description={t.services.intro} lang={lang} url="/services" />
      <Header nav={content.nav} />
      <div className="pt-24">
        <section className="border-b border-black/10 bg-[#0b0b10] text-white">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 py-16 md:px-12 lg:grid-cols-12 lg:px-24 lg:py-24">
            <div className="lg:col-span-8">
              <p className="t-meta mb-5 text-[#f2a007]">{t.services.eyebrow}</p>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">{t.services.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">{t.services.intro}</p>
            </div>
            <div className="lg:col-span-4 lg:self-end">
              <div className="border border-white/15 bg-white/[0.04] p-6">
                <p className="t-meta text-[#f2a007]">{t.services.statusLabel}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{t.services.status}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-6 py-16 md:px-12 lg:px-24 lg:py-24">
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-black/10 pb-5">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.services.packagesLabel}</h2>
            <span className="t-data text-xs text-black/45" dir="ltr">{String(SERVICE_PACKAGES.length).padStart(2, "0")} / 05</span>
          </div>
          <div className="grid grid-cols-1 gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">
            {SERVICE_PACKAGES.map((service, index) => {
              const Icon = ICONS[index];
              return (
                <motion.article
                  key={service.id}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className={`bg-[#fdfcfb] p-6 md:p-8 ${index === 0 ? "xl:col-span-2" : ""}`}
                >
                  <div className="mb-8 flex items-start justify-between gap-5">
                    <span className="flex h-11 w-11 items-center justify-center border border-[#5a1f2e]/25 bg-[#5a1f2e]/5 text-[#5a1f2e]"><Icon size={19} strokeWidth={1.5} /></span>
                    <span className="t-data text-xs text-black/35" dir="ltr">SVC_{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="max-w-lg text-2xl font-bold tracking-tight">{service.name[lang]}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/65">{service.scope[lang]}</p>
                  <dl className="mt-8 space-y-4 border-t border-black/10 pt-5 text-sm">
                    <div><dt className="t-meta text-black/45">{t.services.deliverableLabel}</dt><dd className="mt-1 font-semibold">{service.deliverable[lang]}</dd></div>
                    <div><dt className="t-meta text-black/45">{t.services.bestForLabel}</dt><dd className="mt-1 text-black/70">{service.bestFor[lang]}</dd></div>
                    <div><dt className="t-meta text-[#5a1f2e]">{t.services.limitationLabel}</dt><dd className="mt-1 text-black/70">{service.limitation[lang]}</dd></div>
                  </dl>
                  <div className="mt-7 border-t border-dashed border-black/10 pt-4 text-xs leading-relaxed text-black/50">
                    <span className="font-semibold text-black/65">{t.services.basisLabel}: </span>{service.basis[lang]}
                  </div>
                  <Link href={localizedLinkPath(`/match?service=${service.id}`, lang)} className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#5a1f2e] transition-transform hover:translate-x-1">
                    {t.services.inquiryCta} <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="border-y border-black/10 bg-white">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12 lg:px-24">
            <p className="max-w-3xl text-sm leading-relaxed text-black/60">{t.services.footerNote}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={localizedLinkPath("/match", lang)} className="inline-flex items-center gap-2 bg-[#5a1f2e] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-black">{t.services.inquiryCta} <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} /></Link>
              <Link href={localizedLinkPath("/projects", lang)} className="inline-flex items-center border border-black/15 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#0b0b10] transition-colors hover:border-[#5a1f2e] hover:text-[#5a1f2e]">{t.services.portfolioCta}</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
