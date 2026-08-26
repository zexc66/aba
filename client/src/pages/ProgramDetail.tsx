import { useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { programStatusTone } from "@/lib/utils";

const TONE_CLASSES: Record<string, string> = {
  active: "text-emerald-700 bg-emerald-50 border-emerald-200",
  dev: "text-amber-700 bg-amber-50 border-amber-200",
  pipeline: "text-black/60 bg-black/5 border-black/10",
};
const TONE_DOTS: Record<string, string> = {
  active: "bg-emerald-500 animate-pulse",
  dev: "bg-amber-500",
  pipeline: "bg-black/40",
};

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const { lang, isRTL, toggleLang, langLabel, content } = useLanguageContext();
  const ui = content.programDetail;

  const program = content.programs.list.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!program) {
    setLocation("/404", { replace: true });
    return null;
  }

  const tone = programStatusTone(program.status);

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO
        title={`${program.name} | AIABASD`}
        description={program.detail.overview.slice(0, 155)}
        lang={lang}
        url={`/programs/${program.slug}`}
      />
      <Header nav={content.nav} />

      <main className="pt-28 pb-24">
        <Section className="py-16 border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl space-y-6"
            >
              <Link href="/#programs">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#5a1f2e] hover:text-[#0b0b10] transition-colors cursor-pointer">
                  <ArrowLeft size={14} className={isRTL ? "rotate-180" : ""} />
                  <span>{ui.backLabel}</span>
                </div>
              </Link>

              <div className="flex items-center gap-3">
                <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                <span className="t-meta text-[#5a1f2e]">
                  {ui.eyebrow}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0b0b10] leading-tight">
                  {program.name}
                </h1>
                {program.logo && (
                  <img
                    src={program.logo}
                    alt=""
                    className="w-16 h-16 object-cover border border-black/10"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-2 t-meta px-2.5 py-1.5 border ${TONE_CLASSES[tone]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${TONE_DOTS[tone]}`} />
                  {ui.statusLabel}: {program.status}
                </span>
                <p className="t-meta text-black/50" dir="ltr">
                  {program.tags.join(" \u00b7 ")}
                </p>
              </div>
            </motion.div>
          </div>
        </Section>

        <Section className="py-16">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div className="grid lg:grid-cols-12 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-7 space-y-6"
              >
                <h2 className="text-xl font-bold text-[#0b0b10] pb-4 border-b border-black/10">
                  {ui.overviewLabel}
                </h2>
                <p className="text-base text-black/70 leading-relaxed">
                  {program.detail.overview}
                </p>
                <p className="text-sm text-black/60 leading-relaxed border-l-2 border-[#5a1f2e] pl-4">
                  {program.desc}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="lg:col-span-5 space-y-6"
              >
                <h2 className="text-xl font-bold text-[#0b0b10] pb-4 border-b border-black/10">
                  {ui.highlightsLabel}
                </h2>
                <div className="space-y-4">
                  {program.detail.highlights.map((h, i) => (
                    <div key={i} className="bg-white rounded-sm border border-black/5 p-6 space-y-2">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={16} className="text-[#5a1f2e] shrink-0" />
                        <h3 className="text-sm font-bold text-[#0b0b10]">{h.title}</h3>
                      </div>
                      <p className="text-sm text-black/70 leading-relaxed">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        <Section className="py-16">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-[#0b0b10] rounded-sm p-8 lg:p-12 text-white relative overflow-hidden"
            >
              <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#5a1f2e]/30 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-bold">{ui.ctaTitle}</h2>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">{ui.ctaSubtitle}</p>
                </div>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0b0b10] bg-[#f2a007] hover:bg-white px-6 py-3 rounded-sm transition-[color,background-color,border-color,transform] shrink-0"
                >
                  <span>{ui.ctaButton}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </Section>
      </main>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
