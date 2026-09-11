import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Landmark, ShieldCheck, Mail } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath } from "@/localePath";

export default function Governments() {
  const { lang, isRTL, content } = useLanguageContext();
  const shouldReduceMotion = useReducedMotion();
  const t = content.governments;

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO
        title={`${t.metaTitle} | AIABASD`}
        description={t.intro}
        lang={lang}
        url="/governments"
      />
      <Header nav={content.nav} />

      <div className="pt-28 pb-24">
        {/* ── Hero ── */}
        <Section className="py-16 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <span className="t-meta text-[#5a1f2e] block mb-6">{t.eyebrow}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0b0b10] leading-[1.15] text-balance">
                {t.title}
              </h1>
              <p className="mt-8 max-w-[65ch] text-base md:text-lg text-[#0b0b10]/70 leading-relaxed text-pretty">
                {t.intro}
              </p>
            </motion.div>
          </div>
        </Section>

        {/* ── Process ── */}
        <Section className="py-20 border-b border-[#0b0b10]/10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="01" title={t.processTitle} note={t.processNote} />
            <ol className="mt-12 divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
              {t.process.map((item, i) => (
                <motion.li
                  key={item.step}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : i * 0.08 }}
                  className="grid grid-cols-[4rem_1fr] md:grid-cols-[7rem_1fr] gap-6 py-8"
                >
                  <span className="t-meta text-[#5a1f2e] pt-1">{item.step}</span>
                  <div className="max-w-[75ch]">
                    <h3 className="text-lg font-semibold text-[#0b0b10]">{item.title}</h3>
                    <p className="mt-2 text-sm md:text-base text-[#0b0b10]/70 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </Section>

        {/* ── Cooperation models ── */}
        <Section className="py-20 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="02" title={t.modelsTitle} note={t.modelsNote} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0b0b10]/10 border border-[#0b0b10]/10">
              {t.models.map((model, i) => (
                <motion.div
                  key={model.name}
                  initial={false}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : i * 0.08 }}
                  className="relative group bg-white p-8 lg:p-10 transition-[background-color] hover:bg-[#5a1f2e]/[0.02]"
                >
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-[#f2a007] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between mb-6">
                    <Landmark size={20} strokeWidth={1.5} className="text-[#5a1f2e]" />
                    <span className="t-meta text-[#0b0b10]/60">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0b0b10] mb-3">{model.name}</h3>
                  <p className="text-sm text-[#0b0b10]/70 leading-relaxed">{model.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Safeguards ── */}
        <Section className="py-20 border-b border-[#0b0b10]/10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="03" title={t.safeguardsTitle} note={t.safeguardsNote} />
            <ul className="mt-12 divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
              {t.safeguards.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-start gap-5 py-6 first:pt-0 last:pb-0"
                >
                  <ShieldCheck className="w-5 h-5 text-[#5a1f2e] shrink-0 mt-1" strokeWidth={1.5} />
                  <div className="max-w-[75ch]">
                    <h3 className="t-meta text-[#5a1f2e]">{s.title}</h3>
                    <p className="mt-1.5 text-sm md:text-base text-[#0b0b10]/70 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── CTA ── */}
        <Section className="py-20">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0b0b10] text-[#fdfcfb] p-10 md:p-14"
            >
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight max-w-3xl">
                {t.ctaTitle}
              </h2>
              <p className="mt-4 max-w-[65ch] text-sm md:text-base text-[#fdfcfb]/70 leading-relaxed">
                {t.ctaText}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={localizedLinkPath("/submit-project", lang)}
                  className="inline-flex items-center gap-2 bg-[#f2a007] text-[#0b0b10] px-6 py-3 t-meta font-medium hover:bg-[#fdfcfb] transition-colors"
                >
                  <span>{t.ctaPrimary}</span>
                  <ArrowRight size={14} className="rtl:-scale-x-100" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${t.ctaSecondary}`}
                  className="inline-flex items-center gap-2 border border-[#fdfcfb]/25 text-[#fdfcfb] px-6 py-3 t-meta hover:border-[#f2a007] hover:text-[#f2a007] transition-colors"
                >
                  <Mail size={14} aria-hidden="true" />
                  <span dir="ltr">{t.ctaSecondary}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
