import { useEffect } from "react";
import { Link } from "wouter";
import {
  ShieldCheck,
  Mail,
  MapPin,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath } from "@/localePath";

export default function TrustCenter() {
  const { lang, isRTL, content } = useLanguageContext();
  const copy = content.trust;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`min-h-[100dvh] bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}
    >
      <SEO
        title={`${copy.metaTitle} | AIABASD`}
        description={copy.metaDescription}
        lang={lang}
        url="/trust"
      />
      <Header nav={content.nav} />

      <main id="main-content" className="pt-24 pb-28">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 pt-6"
        >
          <ol className="t-meta text-[10px] text-[#0b0b10]/45 flex items-center gap-1.5 flex-wrap">
            <li>
              <Link href={localizedLinkPath("/", lang)} asChild>
                <a className="hover:text-[#5a1f2e] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e]">
                  {copy.breadcrumbHome}
                </a>
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={11} className="rtl:-scale-x-100" />
            </li>
            <li aria-current="page" className="text-[#5a1f2e]">
              {copy.breadcrumbTrust}
            </li>
          </ol>
        </nav>

        {/* Page Hero */}
        <Section className="pt-10 pb-16 border-b border-[#0b0b10]/10 bg-[#fdfcfb]">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-0.5 w-8 bg-[#5a1f2e]" aria-hidden="true" />
                <span className="t-meta text-xs text-[#5a1f2e]">
                  {copy.eyebrow}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b0b10] text-balance">
                {copy.title}
              </h1>
              <p className="text-base md:text-lg text-[#0b0b10]/75 leading-relaxed text-pretty">
                {copy.subtitle}
              </p>
              <p className="t-meta text-xs text-[#0b0b10]/55 flex items-center gap-1.5 pt-1">
                <span>{copy.lastUpdatedLabel}:</span>
                <span className="t-data tabular-nums font-mono" dir="ltr">
                  <bdi>{copy.lastUpdatedDate}</bdi>
                </span>
              </p>
            </div>
          </div>
        </Section>

        {/* 1. Verification Philosophy */}
        <Section className="py-16 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 space-y-3">
                <span className="t-meta text-[#5a1f2e] text-xs">
                  01 / PHILOSOPHY
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0b0b10]">
                  {copy.philosophyTitle}
                </h2>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 t-meta text-[10px] px-2.5 py-1.5 border text-[#6b4a00] bg-[#f2a007]/[0.12] border-[#f2a007]/30">
                    <span className="w-1.5 h-1.5 bg-[#f2a007]" aria-hidden="true" />
                    {copy.philosophyStatusBadge}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <p className="text-base text-[#0b0b10]/80 leading-relaxed">
                  {copy.philosophyText}
                </p>
                <div className="border-s-2 border-[#5a1f2e] ps-4 py-1">
                  <p className="text-sm font-medium text-[#0b0b10]/70 italic leading-relaxed">
                    {copy.philosophyNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Data & Privacy Posture */}
        <Section className="py-16 border-b border-[#0b0b10]/10 bg-[#fdfcfb]">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 space-y-10">
            <div>
              <span className="t-meta text-[#5a1f2e] text-xs block mb-2">
                02 / PRIVACY POSTURE
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0b0b10]">
                {copy.privacyTitle}
              </h2>
              <p className="text-sm text-[#0b0b10]/70 mt-1 max-w-2xl">
                {copy.privacySubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copy.privacyPoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="relative group border border-[#0b0b10]/10 bg-white p-7 flex flex-col justify-between shadow-premium transition-colors hover:border-[#5a1f2e]/40"
                >
                  <div
                    className="absolute top-0 start-0 h-[2px] w-0 bg-[#f2a007] group-hover:w-full transition-[width] duration-500"
                    aria-hidden="true"
                  />
                  <div className="space-y-3">
                    <span className="t-meta text-[10px] text-[#5a1f2e]">
                      P-{String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-bold text-[#0b0b10] leading-snug">
                      {pt.title}
                    </h3>
                    <p className="text-xs text-[#0b0b10]/70 leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link href={localizedLinkPath("/privacy", lang)} asChild>
                <a className="inline-flex items-center gap-2 t-meta text-xs text-[#5a1f2e] border-b border-[#5a1f2e]/30 hover:border-[#5a1f2e] pb-0.5 transition-[color,border-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px">
                  <span>{copy.privacyPolicyLink}</span>
                  <ArrowRight size={13} className="rtl:-scale-x-100" aria-hidden="true" />
                </a>
              </Link>
              <Link href={localizedLinkPath("/terms", lang)} asChild>
                <a className="inline-flex items-center gap-2 t-meta text-xs text-[#5a1f2e] border-b border-[#5a1f2e]/30 hover:border-[#5a1f2e] pb-0.5 transition-[color,border-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px">
                  <span>{copy.termsLink}</span>
                  <ArrowRight size={13} className="rtl:-scale-x-100" aria-hidden="true" />
                </a>
              </Link>
            </div>
          </div>
        </Section>

        {/* 3. Technical & Security Posture */}
        <Section className="py-16 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 space-y-10">
            <div>
              <span className="t-meta text-[#5a1f2e] text-xs block mb-2">
                03 / SECURITY POSTURE
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0b0b10]">
                {copy.securityTitle}
              </h2>
              <p className="text-sm text-[#0b0b10]/70 mt-1 max-w-2xl">
                {copy.securitySubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {copy.securityPoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="relative group border border-[#0b0b10]/10 bg-[#fdfcfb] p-7 space-y-3 shadow-premium transition-colors hover:border-[#5a1f2e]/40"
                >
                  <div
                    className="absolute top-0 start-0 h-[2px] w-0 bg-[#f2a007] group-hover:w-full transition-[width] duration-500"
                    aria-hidden="true"
                  />
                  <span className="t-meta text-[10px] text-[#0b0b10]/50" dir="ltr">
                    <bdi>SEC-0{idx + 1}</bdi>
                  </span>
                  <h3 className="text-base font-bold text-[#0b0b10] leading-snug">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-[#0b0b10]/70 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 4. Governance Frameworks */}
        <Section className="py-16 border-b border-[#0b0b10]/10 bg-[#fdfcfb]">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 space-y-10">
            <div>
              <span className="t-meta text-[#5a1f2e] text-xs block mb-2">
                04 / GOVERNANCE FRAMEWORKS
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0b0b10]">
                {copy.governanceTitle}
              </h2>
              <p className="text-sm text-[#0b0b10]/70 mt-1 max-w-2xl">
                {copy.governanceSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {copy.governancePillars.map((pillar) => (
                <div
                  key={pillar.slug}
                  className="relative group border border-[#0b0b10]/10 bg-white p-7 flex flex-col justify-between space-y-5 shadow-premium transition-colors hover:border-[#5a1f2e]/40"
                >
                  <div
                    className="absolute top-0 start-0 h-[2px] w-0 bg-[#f2a007] group-hover:w-full transition-[width] duration-500"
                    aria-hidden="true"
                  />
                  <div className="space-y-3">
                    <span className="t-meta text-[10px] text-[#5a1f2e]" dir="ltr">
                      <bdi>{`GOV/${pillar.slug.toUpperCase()}`}</bdi>
                    </span>
                    <h3 className="text-lg font-bold text-[#0b0b10] leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#0b0b10]/70 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href={localizedLinkPath(`/governance/${pillar.slug}`, lang)}
                      asChild
                    >
                      <a className="inline-flex items-center gap-2 t-meta text-xs text-[#5a1f2e] border-b border-[#5a1f2e]/30 hover:border-[#5a1f2e] pb-0.5 transition-[color,border-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px">
                        <span>{pillar.linkText}</span>
                        <ArrowRight
                          size={13}
                          className="rtl:-scale-x-100"
                          aria-hidden="true"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 5. Institutional Contacts & Physical Presence */}
        <Section className="py-16 border-b border-[#0b0b10]/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 space-y-10">
            <div>
              <span className="t-meta text-[#5a1f2e] text-xs block mb-2">
                05 / CHANNELS
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0b0b10]">
                {copy.contactsTitle}
              </h2>
              <p className="text-sm text-[#0b0b10]/70 mt-1 max-w-2xl">
                {copy.contactsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Presences */}
              <div className="lg:col-span-5 space-y-4">
                <div className="border border-[#0b0b10]/10 bg-[#fdfcfb] p-6 space-y-4 shadow-premium">
                  <div className="flex items-start gap-3.5 text-sm text-[#0b0b10]">
                    <MapPin className="w-5 h-5 text-[#5a1f2e] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-sm">{copy.londonTitle}</div>
                      <div className="text-[#0b0b10]/60 text-xs mt-0.5">{copy.londonCountry}</div>
                    </div>
                  </div>

                  <div className="border-t border-[#0b0b10]/10 pt-4 flex items-start gap-3.5 text-sm text-[#0b0b10]">
                    <MapPin className="w-5 h-5 text-[#5a1f2e] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <div className="font-bold text-sm">{copy.dakarTitle}</div>
                      <div className="text-[#0b0b10]/60 text-xs mt-0.5">{copy.dakarCountry}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Mail Routes */}
              <div className="lg:col-span-7">
                <div className="border border-[#0b0b10]/10 bg-[#fdfcfb] divide-y divide-[#0b0b10]/10 shadow-premium">
                  {[
                    { label: copy.emailGeneralLabel, email: "gs@aibasd.org" },
                    { label: copy.emailSecretariatLabel, email: "gs@aiabasd.org" },
                    { label: copy.emailFieldOpsLabel, email: "fo@aiabasd.org" },
                  ].map((route) => (
                    <a
                      key={route.email}
                      href={`mailto:${route.email}`}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 gap-2 hover:bg-[#5a1f2e]/[0.035] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 active:translate-y-px"
                    >
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#5a1f2e] shrink-0" aria-hidden="true" />
                        <span className="text-sm font-semibold text-[#0b0b10]">
                          {route.label}
                        </span>
                      </div>
                      <span className="t-meta text-xs text-[#5a1f2e] font-mono" dir="ltr">
                        {route.email}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 6. Intentional Disclosure Boundaries */}
        <Section className="py-16 bg-[#fdfcfb]">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div
              role="note"
              className="border border-[#0b0b10]/10 bg-white p-7 md:p-8 flex items-start gap-4 shadow-premium"
            >
              <ShieldCheck
                size={20}
                className="text-[#5a1f2e] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div className="space-y-2">
                <h2 className="t-meta text-[#5a1f2e] text-xs">
                  {copy.exclusionsTitle}
                </h2>
                <p className="text-xs md:text-sm text-[#0b0b10]/75 leading-relaxed max-w-4xl">
                  {copy.exclusionsText}
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
    </div>
  );
}
