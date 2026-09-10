import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();
  const t = PLATFORM_COPY[lang];

  useEffect(() => {
    trackEvent("service_view");
  }, []);

  return (
    <div className={`min-h-[100dvh] bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO title={`${t.services.title} | AIABASD`} description={t.services.intro} lang={lang} url="/services" />
      <Header nav={content.nav} />
      <div className="pt-24">
        <section className="border-b border-[#0b0b10]/10 bg-[#0b0b10] text-[#fdfcfb]">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 py-16 md:px-12 lg:grid-cols-12 lg:px-24 lg:py-24">
            <div className="lg:col-span-8">
              <p className="t-meta mb-5 text-[#f2a007]">{t.services.eyebrow}</p>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[#fdfcfb] md:text-6xl">{t.services.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#fdfcfb]/75 md:text-lg">{t.services.intro}</p>
            </div>
            <div className="lg:col-span-4 lg:self-end">
              <div className="border border-white/15 bg-[#11111a] p-6 shadow-[0_18px_45px_rgba(90,31,46,0.12)]">
                <p className="t-meta text-[10px] text-[#f2a007]">{t.services.statusLabel}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#fdfcfb]/75">{t.services.status}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1500px] px-6 py-16 md:px-12 lg:px-24 lg:py-24">
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-[#0b0b10]/10 pb-5">
            <h2 className="text-3xl font-bold tracking-tight text-[#0b0b10] md:text-4xl">{t.services.packagesLabel}</h2>
            <span className="t-data tabular-nums text-xs text-[#0b0b10]/60" dir="ltr">
              <bdi>{String(SERVICE_PACKAGES.length).padStart(2, "0")} / 05</bdi>
            </span>
          </div>
          <div className="grid grid-cols-1 gap-px border border-[#0b0b10]/10 bg-[#0b0b10]/10 md:grid-cols-2 xl:grid-cols-3">
            {SERVICE_PACKAGES.map((service, index) => {
              const Icon = ICONS[index];
              return (
                <motion.article
                  key={service.id}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.16) }}
                  className={`relative group flex flex-col justify-between bg-[#fdfcfb] p-6 hover:bg-white transition-[background-color] duration-300 md:p-8 ${
                    index === 0 ? "md:col-span-2 xl:col-span-2" : ""
                  }`}
                >
                  <span
                    className="absolute top-0 start-0 h-[2px] w-0 bg-[#f2a007] transition-[width] duration-500 group-hover:w-full"
                    aria-hidden="true"
                  />
                  <div>
                    <div className="mb-8 flex items-start justify-between gap-5">
                      <span className="flex h-11 w-11 items-center justify-center border border-[#5a1f2e]/25 bg-[#5a1f2e]/5 text-[#5a1f2e]">
                        <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="t-data tabular-nums text-xs text-[#0b0b10]/60" dir="ltr">
                        <bdi>SVC_{String(index + 1).padStart(2, "0")}</bdi>
                      </span>
                    </div>
                    <h3 className="max-w-lg text-2xl font-bold tracking-tight text-[#0b0b10]">{service.name[lang]}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#0b0b10]/70">{service.scope[lang]}</p>
                    <dl className="mt-8 space-y-4 border-t border-[#0b0b10]/10 pt-5 text-sm">
                      <div>
                        <dt className="t-meta text-[10px] text-[#0b0b10]/60">{t.services.deliverableLabel}</dt>
                        <dd className="mt-1 font-semibold text-[#0b0b10]">{service.deliverable[lang]}</dd>
                      </div>
                      <div>
                        <dt className="t-meta text-[10px] text-[#0b0b10]/60">{t.services.bestForLabel}</dt>
                        <dd className="mt-1 text-[#0b0b10]/75">{service.bestFor[lang]}</dd>
                      </div>
                      <div>
                        <dt className="t-meta text-[10px] text-[#5a1f2e]">{t.services.limitationLabel}</dt>
                        <dd className="mt-1 text-[#0b0b10]/75">{service.limitation[lang]}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <div className="mt-7 border-t border-dashed border-[#0b0b10]/10 pt-4 text-xs leading-relaxed text-[#0b0b10]/60">
                      <span className="font-semibold text-[#0b0b10]/75">{t.services.basisLabel}: </span>
                      {service.basis[lang]}
                    </div>
                    <div className="mt-7">
                      <Link asChild href={localizedLinkPath(`/match?service=${service.id}`, lang)}>
                        <a className="inline-flex min-h-11 items-center gap-2 t-meta text-[11px] text-[#5a1f2e] border-b border-[#5a1f2e]/30 pb-0.5 hover:border-[#5a1f2e] hover:text-[#0b0b10] active:translate-y-px transition-[color,border-color,transform] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2">
                          {t.services.inquiryCta}
                          <ArrowRight size={14} strokeWidth={1.5} className="rtl:-scale-x-100" aria-hidden="true" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="border-y border-[#0b0b10]/10 bg-white">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12 lg:px-24">
            <p className="max-w-3xl text-sm leading-relaxed text-[#0b0b10]/70">{t.services.footerNote}</p>
            <div className="flex flex-wrap gap-3">
              <Link asChild href={localizedLinkPath("/match", lang)}>
                <a className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#5a1f2e] px-6 py-3 t-meta text-[11px] text-[#fdfcfb] transition-[color,background-color,transform] duration-150 hover:bg-[#0b0b10] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2">
                  {t.services.inquiryCta}
                  <ArrowRight size={14} strokeWidth={1.5} className="rtl:-scale-x-100" aria-hidden="true" />
                </a>
              </Link>
              <Link asChild href={localizedLinkPath("/projects", lang)}>
                <a className="inline-flex min-h-11 items-center justify-center border border-[#0b0b10]/15 bg-white px-6 py-3 t-meta text-[11px] text-[#0b0b10] transition-[color,border-color,transform] duration-150 hover:border-[#5a1f2e] hover:text-[#5a1f2e] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2">
                  {t.services.portfolioCta}
                </a>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
