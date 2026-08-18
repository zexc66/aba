import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";

export const PRIVACY_SECTIONS: { title: string; body: string[] }[] = [
    {
        title: "1. Who we are",
        body: [
            "This website is operated by the African International Alliance for Business & Sustainable Development (AIABASD), with headquarters in London, United Kingdom, and a regional secretariat in Dakar, Senegal. For any privacy question, contact contact@aiabasd.org.",
        ],
    },
    {
        title: "2. Information we collect",
        body: [
            "When you submit the contact form, the investor access request, or the newsletter subscription, we collect the details you provide: your name, email address, organization, and message. We do not collect any other personal information through this website.",
            "We do not currently use analytics or advertising cookies on this website.",
        ],
    },
    {
        title: "3. How we use your information",
        body: [
            "We use the information you submit solely to respond to your inquiry, to process investor access requests, or to send you the institutional updates you subscribed to. We do not sell, rent, or share your information with third parties for marketing purposes.",
        ],
    },
    {
        title: "4. Storage and retention",
        body: [
            "Inquiries are stored securely on our server and accessible only to authorized personnel. We retain inquiry records for as long as necessary to handle your request and to meet our legal and institutional obligations, after which they are deleted.",
        ],
    },
    {
        title: "5. Your rights",
        body: [
            "Depending on your jurisdiction, including under the UK GDPR and the EU GDPR, you may have the right to access, correct, or delete the personal information we hold about you, and to withdraw consent at any time. To exercise these rights, email contact@aiabasd.org.",
        ],
    },
    {
        title: "6. Changes to this policy",
        body: [
            "We may update this policy from time to time. The latest version is always published on this page.",
        ],
    },
];

export default function Privacy() {
    const { lang, toggleLang, langLabel, content } = useLanguageContext();

    return (
        <div className="min-h-screen bg-[#fdfcfb] text-[#0b0b10]">
            <SEO
                title="Privacy Policy | AIABASD"
                description="How AIABASD collects, uses, and protects the information you submit through this website."
                lang={lang}
                url="/privacy"
            />
            <Header nav={content.nav} />

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
                                Privacy Policy
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
                            {PRIVACY_SECTIONS.map((section) => (
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
