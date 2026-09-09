import { Link } from "wouter";
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { LOCALIZED_COPY } from "@/localizedCopy";
import { localizedLinkPath, localizedPath } from "@/localePath";

export default function Privacy() {
    const { lang, content } = useLanguageContext();
    const copy = LOCALIZED_COPY[lang].privacy;
    const termsCopy = LOCALIZED_COPY[lang].terms;
    const searchCopy = LOCALIZED_COPY[lang].search;

    return (
        <div className="min-h-screen bg-[#fdfcfb] text-[#0b0b10]">
            <SEO
                title={`${copy.title} | AIABASD`}
                description={copy.description}
                lang={lang}
                url="/privacy"
            />
            <Header nav={content.nav} />

            <div className="pt-24 pb-28">
                {/* Breadcrumb back-nav matching house pattern */}
                <nav
                    aria-label="Breadcrumb"
                    className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 pt-6"
                >
                    <ol className="t-meta text-[10px] text-[#0b0b10]/45 flex items-center gap-1.5 flex-wrap">
                        <li>
                            <Link href={localizedLinkPath("/", lang)} asChild>
                                <a className="hover:text-[#5a1f2e] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e]">
                                    {searchCopy.home}
                                </a>
                            </Link>
                        </li>
                        <li aria-hidden="true">
                            <ChevronRight size={11} className="rtl:-scale-x-100" />
                        </li>
                        <li aria-current="page" className="text-[#5a1f2e]">
                            {copy.title}
                        </li>
                    </ol>
                </nav>

                {/* Hero section with optical vertical rhythm (larger bottom than top) */}
                <Section className="pt-10 pb-16 border-b border-[#0b0b10]/10 bg-[#fdfcfb]">
                    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                        <div className="max-w-[65ch] space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-0.5 w-8 bg-[#5a1f2e]" aria-hidden="true" />
                                <span className="t-meta text-xs text-[#5a1f2e]">
                                    {copy.eyebrow}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b0b10] text-balance">
                                {copy.title}
                            </h1>
                            <p className="t-data text-xs text-[#0b0b10]/55 tabular-nums">
                                {copy.lastUpdated}
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Read-mode body: ~65ch measure, text-pretty, section anchors */}
                <Section className="pt-12 pb-24">
                    <div className="mx-auto max-w-[65ch] px-6 md:px-8">
                        {/* Section quick-jump index */}
                        <nav
                            aria-label={copy.title}
                            className="mb-12 border border-[#0b0b10]/10 bg-[#f4f2ee]/40 p-4 sm:p-5"
                        >
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                {copy.sections.map((sec, idx) => (
                                    <li key={sec.title}>
                                        <a
                                            href={`#section-${idx + 1}`}
                                            className="inline-flex items-center gap-2 text-[#0b0b10]/75 hover:text-[#5a1f2e] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e]"
                                        >
                                            <span className="t-data text-[#5a1f2e] font-semibold tabular-nums text-[11px]">
                                                {idx + 1}.
                                            </span>
                                            <span className="truncate">{sec.title.replace(/^\d+\.\s*/, "")}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="space-y-12">
                            {copy.sections.map((section, idx) => (
                                <section
                                    key={section.title}
                                    id={`section-${idx + 1}`}
                                    className="space-y-4 scroll-mt-28 border-b border-[#0b0b10]/8 pb-10 last:border-b-0 last:pb-0"
                                >
                                    <h2 className="text-lg md:text-xl font-bold text-[#0b0b10] text-balance">
                                        <a
                                            href={`#section-${idx + 1}`}
                                            className="hover:text-[#5a1f2e] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e]"
                                        >
                                            {section.title}
                                        </a>
                                    </h2>
                                    {section.body.map((paragraph, i) => (
                                        <p
                                            key={i}
                                            className="text-[15px] md:text-base text-[#0b0b10]/80 leading-relaxed text-pretty"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </section>
                            ))}
                        </div>

                        {/* Reciprocal navigation — no dead ends */}
                        <div className="mt-16 pt-8 border-t border-[#0b0b10]/10 flex flex-wrap items-center justify-between gap-4">
                            <Link href={localizedLinkPath("/", lang)} asChild>
                                <a className="inline-flex items-center gap-2 t-meta text-xs text-[#0b0b10]/70 hover:text-[#5a1f2e] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e]">
                                    <ArrowLeft size={14} className="rtl:-scale-x-100" aria-hidden="true" />
                                    <span>{searchCopy.home}</span>
                                </a>
                            </Link>

                            <div className="flex items-center gap-6">
                                <a
                                    href={localizedPath("/#contact", lang)}
                                    className="inline-flex items-center gap-1.5 t-meta text-xs text-[#0b0b10]/70 hover:text-[#5a1f2e] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e]"
                                >
                                    <span>{searchCopy.contact}</span>
                                </a>

                                <Link href={localizedLinkPath("/terms", lang)} asChild>
                                    <a className="inline-flex items-center gap-2 t-meta text-xs text-[#5a1f2e] hover:text-[#5a1f2e]/80 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e]">
                                        <span>{termsCopy.title}</span>
                                        <ArrowRight size={14} className="rtl:-scale-x-100" aria-hidden="true" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>

            <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
        </div>
    );
}
