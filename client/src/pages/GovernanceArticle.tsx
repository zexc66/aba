import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { GOVERNANCE_ARTICLES, type GovernanceSlug } from "@/intelligence";
import { localizedLinkPath, localizedPath } from "@/localePath";

const PILLAR_SLUGS: GovernanceSlug[] = ["esia-esms", "kyc-aml", "independent-oversight", "contracts"];

export default function GovernanceArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, isRTL, content } = useLanguageContext();
  const t = content.governanceDetail;

  const idx = PILLAR_SLUGS.indexOf(slug as GovernanceSlug);
  const pillar = idx >= 0 ? content.governance.pillars[idx] : null;
  const article = idx >= 0 ? GOVERNANCE_ARTICLES[PILLAR_SLUGS[idx]] : null;

  if (!pillar || !article) {
    return (
      <div className="min-h-screen bg-[#fdfcfb]">
        <Header nav={content.nav} />
        <div className="pt-40 pb-24 text-center">
          <p className="t-meta text-[#5a1f2e] mb-4">FRAMEWORK_NOT_FOUND</p>
          <Link href={localizedLinkPath("/#governance", lang)}><a className="text-sm font-semibold text-[#0b0b10] hover:text-[#5a1f2e] underline">{t.backLabel}</a></Link>
        </div>
      </div>
    );
  }

  const a = article[lang];

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO
        title={`${pillar.title} | AIABASD Governance`}
        description={a.overview.slice(0, 155)}
        lang={lang}
        url={`/governance/${slug}`}
      />
      <Header nav={content.nav} />

      <div className="pt-28 pb-24">
        <Section className="py-12 border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <Link href={localizedLinkPath("/#governance", lang)}>
              <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] hover:text-[#0b0b10] transition-colors mb-6 py-2">
                <ArrowLeft size={14} className={isRTL ? "rotate-180" : ""} />
                <span>{t.backLabel}</span>
              </a>
            </Link>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-3xl">
              <span className="t-data text-[#5a1f2e] block mb-4" aria-hidden="true">
                {`GOV/${String(idx + 1).padStart(2, "0")}`}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0b0b10] leading-tight">
                {pillar.title}
              </h1>
            </motion.div>
          </div>
        </Section>

        <Section className="py-16">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="lg:col-span-7 space-y-12"
            >
              <div>
                <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-6">{t.overviewLabel}</h2>
                <p className="text-base md:text-lg text-black/70 leading-relaxed">
                  {a.overview}
                </p>
              </div>

              <div>
                <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-0">{t.practicesLabel}</h2>
                <ul className="divide-y divide-black/10 border-b border-black/10">
                  {a.practices.map((practice, i) => (
                    <li key={i} className="flex items-start gap-4 py-5">
                      <span className="t-data text-xs text-[#5a1f2e] pt-1 shrink-0" dir="ltr" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm md:text-base text-[#0b0b10] leading-relaxed">{practice}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="lg:col-span-5"
            >
              <div className="bg-[#0b0b10] text-white p-8 border border-black sticky top-28">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                  <CheckCircle2 size={16} strokeWidth={1.5} className="text-[#f2a007]" />
                  <span className="t-meta text-[#f2a007]">{content.hud.transparencyMandate}</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{t.requestNote}</p>
                <a
                  href={localizedPath("/#contact", lang)}
                  className="mt-8 inline-flex items-center gap-2 bg-[#5a1f2e] hover:bg-[#f2a007] hover:text-[#0b0b10] text-white px-6 py-3 text-sm font-semibold transition-colors no-press"
                >
                  {t.requestLabel}
                </a>
              </div>
            </motion.aside>
          </div>
        </Section>
      </div>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
