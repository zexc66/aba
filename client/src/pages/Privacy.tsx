import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { LOCALIZED_COPY } from "@/localizedCopy";

export default function Privacy() {
    const { lang, content } = useLanguageContext();
    const copy = LOCALIZED_COPY[lang].privacy;

    return (
        <div className="min-h-screen bg-[#fdfcfb] text-[#0b0b10]">
            <SEO
                title={`${copy.title} | AIABASD`}
                description={copy.description}
                lang={lang}
                url="/privacy"
            />
            <Header nav={content.nav} />

            <div className="pt-28 pb-24">
                <Section className="py-16 border-b border-black/10 bg-white">
                    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                        <div className="max-w-3xl space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                                <span className="t-meta text-[#5a1f2e]">
                                    {copy.eyebrow}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0b0b10]">
                                {copy.title}
                            </h1>
                            <p className="text-sm text-black/50">
                                {copy.lastUpdated}
                            </p>
                        </div>
                    </div>
                </Section>

                <Section className="py-16">
                    <div className="mx-auto max-w-3xl px-6 md:px-12 lg:px-24">
                        <div className="space-y-10">
                            {copy.sections.map((section) => (
                                <section key={section.title} className="space-y-3">
                                    <h2 className="text-lg font-bold text-[#0b0b10]">
                                        {section.title}
                                    </h2>
                                    {section.body.map((paragraph, i) => (
                                        <p key={i} className="text-sm text-black/70 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                </section>
                            ))}
                        </div>
                    </div>
                </Section>
            </div>

            <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
        </div>
    );
}
