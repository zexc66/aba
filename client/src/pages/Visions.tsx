import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Globe2, Target, Eye, Compass } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { COUNTRIES } from "@/components/home/NodalMap";
import { COPY } from "@/data";

const EN_LIST = COPY.en.countries.list;

export default function Visions() {
  const { lang, isRTL, content } = useLanguageContext();
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

      <main className="pt-28 pb-24">
        {/* ── Hero: Vision Statement ── */}
        <Section className="py-16 border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <span className="t-meta text-[#5a1f2e] block mb-6">{t.eyebrow}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0b0b10] leading-[1.15] text-wrap-balance">
                {t.heroStatement}
              </h1>
              <p className="mt-8 max-w-[65ch] text-base md:text-lg text-black/60 leading-relaxed">
                {t.heroNote}
              </p>
            </motion.div>
          </div>
        </Section>

        {/* ── Mission ── */}
        <Section className="py-20 border-b border-black/10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="01" title={t.missionTitle} meta="MANDATE_CORE" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[65ch]"
            >
              <p className="text-lg md:text-xl text-black/70 leading-relaxed border-s-2 border-[#5a1f2e] ps-6 md:ps-8">
                {t.missionStatement}
              </p>
            </motion.div>
          </div>
        </Section>

        {/* ── Strategic Pillars ── */}
        <Section className="py-20 border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="02" title={t.pillarsTitle} meta="4_FRAMEWORKS" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
              {t.pillars.map((pillar: { title: string; desc: string; code: string }, i: number) => (
                <motion.div
                  key={pillar.code}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white p-8 lg:p-10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Target size={20} strokeWidth={1.5} className="text-[#5a1f2e]" />
                    <span className="t-meta text-black/40">{pillar.code}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0b0b10] mb-3">{pillar.title}</h3>
                  <p className="text-sm text-black/65 leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Global Framework Alignment ── */}
        <Section className="py-20 border-b border-black/10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="03" title={t.alignmentTitle} note={t.alignmentNote} meta="SDG_2030 // AU_2063" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border border-black/10 p-8 lg:p-10"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/10">
                  <Globe2 size={20} strokeWidth={1.5} className="text-[#5a1f2e]" />
                  <span className="t-meta text-[#5a1f2e]">SDG 2030</span>
                </div>
                <p className="text-sm md:text-base text-black/70 leading-relaxed">{t.sdgFrame}</p>
                <Link href="/pipeline">
                  <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] mt-6 border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] pb-1 pt-2 transition-colors no-press">
                    SDG_ALIGNMENT_MATRIX <ArrowRight size={12} className="rtl:rotate-180" />
                  </a>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#0b0b10] text-white p-8 lg:p-10 border border-black"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <Compass size={20} strokeWidth={1.5} className="text-[#f2a007]" />
                  <span className="t-meta text-[#f2a007]">AGENDA 2063</span>
                </div>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">{t.agendaFrame}</p>
                <p className="t-data text-xs text-[#f2a007] mt-6 pt-4 border-t border-white/10" dir="ltr">
                  {COUNTRIES.length} SOVEREIGN CORRIDORS
                </p>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ── Future Horizons ── */}
        <Section className="py-20 border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="04" title={t.horizonsTitle} note={t.horizonsNote} meta="5_SECTORS" />
            <ol className="divide-y divide-black/10 border-y border-black/10">
              {t.horizons.map((h: { sector: string; vision: string }, i: number) => (
                <motion.li
                  key={h.sector}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                  className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-x-8 py-8"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="t-data text-xs text-black/40" dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-bold text-[#5a1f2e]">{h.sector}</h3>
                  </div>
                  <p className="text-sm md:text-base text-black/65 leading-relaxed max-w-[65ch]">
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
            <SectionHeader index="05" title={t.leadershipTitle} note={t.leadershipNote} meta={String(content.team.list.length) + "_PERSPECTIVES"} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 bg-black/10">
              {content.team.list.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-[#fdfcfb] p-8"
                >
                  <div className="aspect-square max-w-[140px] bg-white/5 border border-black/10 overflow-hidden mb-6">
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
                  <Link href={`/team/${["mohammed-abdel-moneim", "faris-safi", "ziad-shneikat"][i] ?? ""}`}>
                    <a className="inline-flex items-center gap-2 t-meta text-black/50 hover:text-[#5a1f2e] mt-4 transition-colors py-2">
                      PROFILE <ArrowRight size={12} className="rtl:rotate-180" strokeWidth={1.5} />
                    </a>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <a
                href="/#contact"
                className="inline-flex items-center gap-3 bg-[#5a1f2e] hover:bg-[#0b0b10] text-white px-8 py-4 font-semibold text-sm transition-colors no-press"
              >
                <span>{t.leadershipCta}</span>
                <ArrowRight size={16} className={isRTL ? "rotate-180" : ""} />
              </a>
            </div>
          </div>
        </Section>
      </main>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
