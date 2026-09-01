import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";

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
  const t = content.teamDetail;

  const member = content.team.list.find((m) => SLUGS[m.name] === slug);

  if (!member) {
    return (
      <div className="min-h-screen bg-[#0b0b10]">
        <Header nav={content.nav} />
        <main className="pt-40 pb-24 text-center text-white">
          <p className="t-meta text-[#f2a007] mb-4">PROFILE_NOT_FOUND</p>
          <Link href="/#team"><a className="text-sm font-semibold text-white/80 hover:text-white underline">{t.backLabel}</a></Link>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#0b0b10] text-[#fdfcfb] ${isRTL ? "font-arabic" : ""}`}>
      <SEO title={`${member.name} | AIABASD`} description={member.bio} lang={lang} url={`/team/${slug}`} />
      <Header nav={content.nav} />

      <main className="pt-28 pb-24">
        <Section className="py-16">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <Link href="/#team">
              <a className="inline-flex items-center gap-2 t-meta text-[#f2a007] hover:text-white transition-colors mb-10 py-2">
                <ArrowLeft size={14} className={isRTL ? "rotate-180" : ""} />
                <span>{t.backLabel}</span>
              </a>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="lg:col-span-4"
              >
                <div className="aspect-square bg-white/5 border border-white/10 overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="lg:col-span-8 space-y-10"
              >
                <div>
                  <span className="t-meta text-[#f2a007] block mb-3">{member.title}</span>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                    {member.name}
                  </h1>
                </div>

                <div className="border-t border-white/10 pt-8 max-w-[65ch]">
                  <h2 className="t-meta text-white/45 mb-4">{t.bioLabel}</h2>
                  <p className="text-base md:text-lg text-white/75 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4">
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-3 bg-[#f2a007] hover:bg-white text-[#0b0b10] px-7 py-3.5 font-semibold text-sm transition-colors no-press"
                  >
                    <span>{t.contactCta}</span>
                    <ArrowRight size={16} className={isRTL ? "rotate-180" : ""} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>
      </main>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
