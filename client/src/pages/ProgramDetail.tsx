import { useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { programStatusTone } from "@/lib/utils";
import { stageIndex } from "@/intelligence";
import { localizedLinkPath, localizedPath } from "@/localePath";

const TONE_CLASSES: Record<string, string> = {
  active: "text-[#5a1f2e] bg-[#5a1f2e]/10 border-[#5a1f2e]/25",
  dev: "text-[#0b0b10] bg-[#f2a007]/25 border-[#f2a007]/55",
  pipeline: "text-[#0b0b10]/60 bg-[#0b0b10]/5 border-[#0b0b10]/10",
};
const TONE_DOTS: Record<string, string> = {
  active: "bg-[#5a1f2e] animate-pulse motion-reduce:animate-none",
  dev: "bg-[#f2a007]",
  pipeline: "bg-[#0b0b10]/40",
};

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const { lang, isRTL, content } = useLanguageContext();
  const shouldReduceMotion = useReducedMotion();
  const ui = content.programDetail;

  const program = content.programs.list.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!program) {
      setLocation("/404", { replace: true });
    }
  }, [program, setLocation]);

  if (!program) return null;

  const tone = programStatusTone(program.status);
  const uiStages = content.pipeline.stages;
  const stageIdx = stageIndex(tone);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AIABASD",
        item: `https://aiabasd.org${localizedPath("/", lang)}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: program.name,
        item: `https://aiabasd.org${localizedPath(`/programs/${program.slug}`, lang)}`,
      },
    ],
  };

  return (
    <div
      className={`min-h-[100dvh] bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}
    >
      <SEO
        title={`${program.name} | AIABASD`}
        description={program.detail.overview.slice(0, 155)}
        lang={lang}
        url={`/programs/${program.slug}`}
        schema={breadcrumbSchema}
      />
      <Header nav={content.nav} />

      <div className="pt-28 pb-24">
        {/* Section 1: Header */}
        <Section className="py-16 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
              className="max-w-4xl space-y-6"
            >
              <Link href={localizedLinkPath("/#programs", lang)} asChild>
                <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] pb-1 transition-[color,border-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px">
                  <ArrowLeft
                    size={14}
                    className="rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                  <span>{ui.backLabel}</span>
                </a>
              </Link>

              <div className="flex items-center gap-3">
                <div className="h-0.5 w-8 bg-[#5a1f2e]" aria-hidden="true" />
                <span className="t-meta text-[#5a1f2e]">{ui.eyebrow}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0b0b10] leading-tight">
                  {program.name}
                </h1>
                {program.logo && (
                  <img
                    src={program.logo}
                    alt=""
                    aria-hidden="true"
                    className="w-16 h-16 object-cover border border-[#0b0b10]/10 shadow-[0_4px_12px_-4px_rgba(90,31,46,0.15)]"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 t-meta px-2.5 py-1.5 border ${TONE_CLASSES[tone]}`}
                >
                  <span
                    className={`w-1.5 h-1.5 ${TONE_DOTS[tone]}`}
                    aria-hidden="true"
                  />
                  <span>{ui.statusLabel}: {program.status}</span>
                </span>
                <p className="t-meta text-[#0b0b10]/60" dir="ltr">
                  <bdi>{program.tags.join(" \u00b7 ")}</bdi>
                </p>

                <span
                  className="inline-flex items-center gap-3 basis-full sm:basis-auto"
                  aria-label={`${content.pipeline.stageTitle}: ${uiStages[stageIdx]}`}
                >
                  <span className="t-meta text-[#0b0b10]/60">
                    {content.pipeline.stageTitle}
                  </span>
                  <span className="flex items-center gap-1" aria-hidden="true">
                    {uiStages.map((label, s) => (
                      <span
                        key={s}
                        title={label}
                        className={`w-4 h-4 border ${
                          s <= stageIdx
                            ? "bg-[#5a1f2e] border-[#5a1f2e]"
                            : "bg-transparent border-[#0b0b10]/20"
                        }`}
                      />
                    ))}
                  </span>
                  <span className="t-meta text-[#5a1f2e]">
                    {uiStages[stageIdx]}
                  </span>
                </span>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Section 2: Details */}
        <Section className="py-16">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
                className="lg:col-span-7 space-y-6"
              >
                <h2 className="text-xl font-bold text-[#0b0b10] pb-4 border-b border-[#0b0b10]/10">
                  {ui.overviewLabel}
                </h2>
                <p className="text-base text-[#0b0b10]/75 leading-relaxed">
                  {program.detail.overview}
                </p>
                <p className="text-sm text-[#0b0b10]/70 leading-relaxed border-s-2 border-[#5a1f2e] ps-4">
                  {program.desc}
                </p>
              </motion.div>

              <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.1 }}
                className="lg:col-span-5 space-y-6"
              >
                <h2 className="text-xl font-bold text-[#0b0b10] pb-4 border-b border-[#0b0b10]/10">
                  {ui.highlightsLabel}
                </h2>
                <div className="space-y-4">
                  {program.detail.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="relative group bg-white border border-[#0b0b10]/10 p-6 space-y-2 hover:border-[#5a1f2e]/40 transition-[border-color] duration-300"
                    >
                      <span
                        className="absolute top-0 start-0 h-[2px] w-0 bg-[#f2a007] transition-[width] duration-500 group-hover:w-full"
                        aria-hidden="true"
                      />
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2
                          size={16}
                          className="text-[#5a1f2e] shrink-0"
                          aria-hidden="true"
                        />
                        <h3 className="text-sm font-bold text-[#0b0b10]">
                          {h.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#0b0b10]/70 leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Section 3: Call to Action */}
        <Section className="py-16">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
              className="relative bg-[#0b0b10] p-8 lg:p-12 text-[#fdfcfb] border border-white/10 shadow-[0_18px_40px_rgba(90,31,46,0.22)] overflow-hidden"
            >
              <div
                className="absolute inset-y-0 end-0 w-1.5 bg-[#5a1f2e] pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {ui.ctaTitle}
                  </h2>
                  <p className="text-sm md:text-base text-[#fdfcfb]/75 leading-relaxed">
                    {ui.ctaSubtitle}
                  </p>
                </div>
                <a
                  href={localizedPath("/#contact", lang)}
                  className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold text-[#0b0b10] bg-[#f2a007] hover:bg-[#fdfcfb] px-6 py-3 transition-[color,background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 active:translate-y-px shrink-0 shadow-[0_4px_12px_rgba(90,31,46,0.25)]"
                >
                  <span>{ui.ctaButton}</span>
                  <ArrowRight
                    size={16}
                    className="rtl:-scale-x-100"
                    aria-hidden="true"
                  />
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
