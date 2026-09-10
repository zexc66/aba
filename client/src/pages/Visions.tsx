import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Globe2, Target, Compass } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { COUNTRIES } from "@/countries";
import { localizedLinkPath, localizedPath } from "@/localePath";

export default function Visions() {
  const { lang, isRTL, content } = useLanguageContext();
  const shouldReduceMotion = useReducedMotion();
  const t = content.visions;

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO
        title={`${t.title} | AIABASD`}
        description={t.heroStatement}
        lang={lang}
        url="/visions"
      />
      <Header nav={content.nav} />

      <div className="pt-28 pb-24">
        {/* ── Hero: Vision Statement ── */}
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
                {t.heroStatement}
              </h1>
              <p className="mt-8 max-w-[65ch] text-base md:text-lg text-[#0b0b10]/70 leading-relaxed text-pretty">
                {t.heroNote}
              </p>
            </motion.div>
          </div>
        </Section>

        {/* ── Mission ── */}
        <Section className="py-20 border-b border-[#0b0b10]/10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="01" title={t.missionTitle} />
            <motion.div
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
              className="max-w-[65ch]"
            >
              <p className="text-lg md:text-xl text-[#0b0b10]/70 leading-relaxed border-s-2 border-[#5a1f2e] ps-6 md:ps-8">
                {t.missionStatement}
              </p>
            </motion.div>
          </div>
        </Section>

        {/* ── Strategic Pillars ── */}
        <Section className="py-20 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="02" title={t.pillarsTitle} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0b0b10]/10 border border-[#0b0b10]/10">
              {t.pillars.map((pillar: { title: string; desc: string; code: string }, i: number) => (
                <motion.div
                  key={pillar.code}
                  initial={false}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : i * 0.08 }}
                  className="relative group bg-white p-8 lg:p-10 transition-[background-color] hover:bg-[#5a1f2e]/[0.02]"
                >
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-[#f2a007] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between mb-6">
                    <Target size={20} strokeWidth={1.5} className="text-[#5a1f2e]" />
                    <span className="t-meta text-[#0b0b10]/60">{pillar.code}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0b0b10] mb-3">{pillar.title}</h3>
                  <p className="text-sm text-[#0b0b10]/70 leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Global Framework Alignment ── */}
        <Section className="py-20 border-b border-[#0b0b10]/10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="03" title={t.alignmentTitle} note={t.alignmentNote} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                className="relative group border border-[#0b0b10]/10 bg-white p-8 lg:p-10 shadow-[0_4px_16px_-4px_rgba(90,31,46,0.06)]"
              >
                <div className="absolute top-0 inset-x-0 h-0.5 bg-[#5a1f2e] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#0b0b10]/10">
                  <Globe2 size={20} strokeWidth={1.5} className="text-[#5a1f2e]" />
                  <span className="t-meta text-[#5a1f2e]">SDG 2030</span>
                </div>
                <p className="text-sm md:text-base text-[#0b0b10]/70 leading-relaxed">{t.sdgFrame}</p>
                <Link asChild href={localizedLinkPath("/pipeline", lang)}>
                  <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] mt-6 border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] pb-1 pt-2 transition-[color,border-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px">
                    <span>{content.pipeline.sdgTitle}</span>
                    <ArrowRight size={12} strokeWidth={1.5} className="rtl:-scale-x-100" />
                  </a>
                </Link>
              </motion.div>

              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
                className="relative bg-[#0b0b10] text-[#fdfcfb] p-8 lg:p-10 border border-white/10 shadow-[0_12px_24px_-8px_rgba(90,31,46,0.35)]"
              >
                <div className="absolute top-0 inset-x-0 h-0.5 bg-[#f2a007]" />
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <Compass size={20} strokeWidth={1.5} className="text-[#f2a007]" />
                  <span className="t-meta text-[#f2a007]">AGENDA 2063</span>
                </div>
                <p className="text-sm md:text-base text-[#fdfcfb]/80 leading-relaxed">{t.agendaFrame}</p>
                <p className="t-data text-xs text-[#f2a007] mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5" dir="ltr">
                  <span dir="ltr"><bdi>{COUNTRIES.length}</bdi></span>
                  <span className="t-meta">{content.pipeline.corridorsLabel}</span>
                </p>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ── Future Horizons ── */}
        <Section className="py-20 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="04" title={t.horizonsTitle} note={t.horizonsNote} />
            <ol className="divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
              {t.horizons.map((h: { sector: string; vision: string }, i: number) => (
                <motion.li
                  key={h.sector}
                  initial={false}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : (i % 3) * 0.05 }}
                  className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-x-8 py-8"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="t-data text-xs text-[#0b0b10]/60 tabular-nums" dir="ltr">
                      <bdi>{String(i + 1).padStart(2, "0")}</bdi>
                    </span>
                    <h3 className="text-base font-bold text-[#5a1f2e]">{h.sector}</h3>
                  </div>
                  <p className="text-sm md:text-base text-[#0b0b10]/70 leading-relaxed max-w-[65ch]">
                    {h.vision}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </Section>

        {/* ── Leadership Perspectives ── */}
        <Section className="py-20">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="05" title={t.leadershipTitle} note={t.leadershipNote} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-[#0b0b10]/10 bg-[#0b0b10]/10">
              {content.team.list.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={false}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : i * 0.08 }}
                  className="relative group bg-[#fdfcfb] p-8 transition-[background-color] hover:bg-white"
                >
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-[#5a1f2e] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="aspect-square max-w-[140px] bg-white/5 border border-[#0b0b10]/10 overflow-hidden mb-6">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </div>
                  <span className="t-meta text-[#5a1f2e] block mb-2">{member.title}</span>
                  <h3 className="text-lg font-bold text-[#0b0b10]">{member.name}</h3>
                  <Link asChild href={localizedLinkPath(`/team/${["mohammed-abdel-moneim", "faris-safi", "ziad-shneikat"][i] ?? ""}`, lang)}>
                    <a className="inline-flex items-center gap-2 t-meta text-[#0b0b10]/70 hover:text-[#5a1f2e] mt-4 transition-[color,transform] py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px">
                      <span>{content.team.profileLabel}</span>
                      <ArrowRight size={12} strokeWidth={1.5} className="rtl:-scale-x-100" />
                    </a>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <a
                href={localizedPath("/#contact", lang)}
                className="inline-flex items-center gap-3 bg-[#5a1f2e] hover:bg-[#0b0b10] text-[#fdfcfb] px-8 py-4 font-semibold text-sm shadow-[0_4px_14px_-2px_rgba(90,31,46,0.25)] transition-[background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b0b10] focus-visible:outline-offset-2 active:translate-y-px"
              >
                <span>{t.leadershipCta}</span>
                <ArrowRight size={16} strokeWidth={1.5} className="rtl:-scale-x-100" />
              </a>
            </div>
          </div>
        </Section>
      </div>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
