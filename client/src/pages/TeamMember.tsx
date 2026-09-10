import { Link, useParams } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath, localizedPath } from "@/localePath";

const SLUGS: Record<string, string> = {
  "Dr. Mohammed Abdel Moneim": "mohammed-abdel-moneim",
  "د. محمد عبد المنعم": "mohammed-abdel-moneim",
  "Faris Safi": "faris-safi",
  "فارس صافي": "faris-safi",
  "Ziad Shneikat": "ziad-shneikat",
  "زياد شنيكات": "ziad-shneikat",
};

export default function TeamMember() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, isRTL, content } = useLanguageContext();
  const shouldReduceMotion = useReducedMotion();
  const t = content.teamDetail;

  const member = content.team.list.find(m => SLUGS[m.name] === slug);

  if (!member) {
    return (
      <div className="min-h-[100dvh] bg-[#0b0b10] text-[#fdfcfb]">
        <Header nav={content.nav} />
        <div className="pt-40 pb-24 text-center">
          <p className="t-meta text-[#f2a007] mb-6" dir="ltr"><bdi>404</bdi></p>
          <Link href={localizedLinkPath("/#team", lang)} asChild>
            <a className="inline-flex items-center gap-2 t-meta text-[#f2a007] border-b border-[#f2a007]/40 hover:border-[#f2a007] pb-1 transition-[color,border-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 active:translate-y-px">
              <ArrowLeft
                size={14}
                className="rtl:-scale-x-100"
                aria-hidden="true"
              />
              <span>{t.backLabel}</span>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-[100dvh] bg-[#0b0b10] text-[#fdfcfb] ${isRTL ? "font-arabic" : ""}`}
    >
      <SEO
        title={`${member.name} | AIABASD`}
        description={member.bio}
        lang={lang}
        url={`/team/${slug}`}
      />
      <Header nav={content.nav} />

      <div className="pt-28 pb-24">
        <Section className="py-16">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <Link href={localizedLinkPath("/#team", lang)} asChild>
              <a className="inline-flex items-center gap-2 t-meta text-[#f2a007] border-b border-[#f2a007]/40 hover:border-[#f2a007] pb-1 mb-10 transition-[color,border-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 active:translate-y-px">
                <ArrowLeft
                  size={14}
                  className="rtl:-scale-x-100"
                  aria-hidden="true"
                />
                <span>{t.backLabel}</span>
              </a>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {member.image && (
                <motion.div
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
                  className="lg:col-span-4"
                >
                  <div className="relative aspect-square bg-[#11111a] border border-white/10 shadow-[0_18px_40px_rgba(90,31,46,0.30)] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : 0.15 }}
                className={`${member.image ? "lg:col-span-8" : "lg:col-span-9"} space-y-10`}
              >
                <div>
                  <span className="t-meta text-[#f2a007] block mb-3">
                    {member.title}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#fdfcfb] leading-tight">
                    {member.name}
                  </h1>
                </div>

                <div className="border-t border-white/10 pt-8 max-w-[65ch]">
                  <h2 className="t-meta text-[#fdfcfb]/60 mb-4">
                    {t.bioLabel}
                  </h2>
                  <p className="text-base md:text-lg text-[#fdfcfb]/80 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4">
                  <a
                    href={localizedPath("/#contact", lang)}
                    className="inline-flex items-center gap-3 bg-[#f2a007] hover:bg-[#fdfcfb] text-[#0b0b10] px-7 py-3.5 font-semibold text-sm transition-[color,background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 active:translate-y-px shadow-[0_4px_14px_rgba(90,31,46,0.35)]"
                  >
                    <span>{t.contactCta}</span>
                    <ArrowRight
                      size={16}
                      className="rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>
      </div>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
