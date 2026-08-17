import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";

const TERMS_SECTIONS: { title: string; body: string[] }[] = [
    {
        title: "1. Purpose of this website",
        body: [
            "This website provides information about the African International Alliance for Business & Sustainable Development (AIABASD), its programs, and its governance. It is informational in nature and does not constitute an offer, solicitation, or invitation to invest in any program.",
        ],
    },
    {
        title: "2. No financial or investment advice",
        body: [
            "Nothing on this website — including program descriptions, pipeline figures, or responses from the website assistant — constitutes financial, investment, legal, or tax advice. Any figures shown are illustrative objectives, not promises or guarantees of return. Decisions to engage with AIABASD must be based on your own due diligence and formal contractual documentation.",
        ],
    },
    {
        title: "3. Accuracy of information",
        body: [
            "We take care to keep the information on this website accurate and current, but it is provided \"as is\" without warranty of completeness. AIABASD accepts no liability for actions taken in reliance on this website's content.",
        ],
    },
    {
        title: "4. Inquiries",
        body: [
            "Submitting an inquiry, newsletter subscription, or investor access request through this website expresses your interest in being contacted by AIABASD. It does not create any contractual relationship.",
        ],
    },
    {
        title: "5. Intellectual property",
        body: [
            "The name AIABASD, the alliance's logo, and the content of this website are protected. You may share links to this site; reproducing substantial parts of its content requires prior written permission.",
        ],
    },
    {
        title: "6. Governing terms",
        body: [
            "Any engagement with AIABASD is ultimately governed by separately executed written agreements, which prevail over anything stated on this website. Questions: contact@aiabasd.org.",
        ],
    },
];

export default function Terms() {
    const { lang, toggleLang, langLabel, content } = useLanguageContext();

    return (
        <div className="min-h-screen bg-[#fdfcfb] text-[#0b0b10]">
            <SEO
                title="Terms of Use | AIABASD"
                description="Terms governing the use of the AIABASD website and the information published on it."
                lang={lang}
                url="/terms"
            />
            <Header nav={content.nav} langLabel={langLabel} toggleLang={toggleLang} currentLang={lang} />

            <main className="pt-28 pb-24">
                <Section className="py-16 border-b border-black/5 bg-white">
                    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                        <div className="max-w-3xl space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#5a1f2e]">
                                    Legal
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0b0b10]">
                                Terms of Use
                            </h1>
                            <p className="text-sm text-black/50">
                                Last updated: August 2026
                            </p>
                        </div>
                    </div>
                </Section>

                <Section className="py-16">
                    <div className="mx-auto max-w-3xl px-6 md:px-12 lg:px-24">
                        <div className="space-y-10">
                            {TERMS_SECTIONS.map((section) => (
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
            </main>

            <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
        </div>
    );
}
