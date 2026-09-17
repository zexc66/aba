import { ShieldCheck, Mail, Globe, AlertTriangle } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { FRAUD_COPY } from "@/fraudCopy";

export default function Verify() {
  const { lang, isRTL, content } = useLanguageContext();
  const t = FRAUD_COPY[lang];

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO
        title={`${t.title} | AIABASD`}
        description={t.intro}
        lang={lang}
        url="/verify"
      />
      <Header nav={content.nav} surface="light" />

      <div className="pt-28 pb-24">
        <Section className="py-16 border-b border-[#0b0b10]/10 bg-[#fdfcfb]">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-8 bg-[#5a1f2e]" aria-hidden="true" />
              <span className="t-meta text-[#5a1f2e]">SECURITY_NOTICE</span>
            </div>
            <h1 className="max-w-4xl text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.08]">
              {t.title}
            </h1>
            <p className="mt-6 max-w-[65ch] text-base md:text-lg leading-relaxed text-[#0b0b10]/70">{t.intro}</p>
          </div>
        </Section>

        <Section className="py-14 border-b border-[#0b0b10]/10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader index="01" title={t.rulesTitle} />
            <ol className="mt-10 divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
              {t.rules.map((rule, i) => (
                <li key={i} className="grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr] gap-5 py-7">
                  <span className="t-meta text-[#5a1f2e] pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 max-w-[75ch]">
                    <h2 className="text-lg font-semibold">{rule.title}</h2>
                    <p className="mt-2 text-sm md:text-base leading-relaxed text-[#0b0b10]/70">{rule.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section className="py-14 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader index="02" title={t.channelsTitle} />
              <ul className="mt-10 divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
                {t.channels.map((channel, i) => (
                  <li key={i} className="flex items-center gap-4 py-4">
                    {channel.label.match(/Website|الموقع|Site web/)
                      ? <Globe size={16} className="shrink-0 text-[#5a1f2e]" aria-hidden="true" />
                      : <Mail size={16} className="shrink-0 text-[#5a1f2e]" aria-hidden="true" />}
                    <span className="t-meta text-[10px] text-[#0b0b10]/60 w-32 shrink-0">{channel.label}</span>
                    <span className="t-data min-w-0 break-all text-sm font-semibold text-[#0b0b10]" dir="ltr">{channel.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-2">
              <div className="border border-[#f2a007]/40 bg-[#f2a007]/[0.06] p-7">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={20} className="text-[#6b4a00]" aria-hidden="true" />
                  <h2 className="text-lg font-bold text-[#0b0b10]">{t.reportTitle}</h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#0b0b10]/75">{t.reportBody}</p>
                <a
                  href="mailto:contact@aiabasd.org?subject=Fraud%20report"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 bg-[#5a1f2e] px-5 py-3 text-sm font-semibold text-[#fdfcfb] hover:bg-[#0b0b10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a1f2e]"
                >
                  <ShieldCheck size={15} aria-hidden="true" />
                  contact@aiabasd.org
                </a>
              </div>
            </div>
          </div>
        </Section>

        <Section className="py-10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <p className="max-w-[75ch] text-sm leading-relaxed text-[#0b0b10]/60">{t.notice}</p>
          </div>
        </Section>
      </div>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
