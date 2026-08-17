import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import { COPY } from "@/data";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const GALLERY_ARTIFACTS = [
    { src: "/gallery/events/event-group.jpg", alt: "Sovereign Community Stakeholder Summit", category: "Summit & Convening" },
    { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200", alt: "Institutional Infrastructure Expansion", category: "Infrastructure" },
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", alt: "Executive Board Governance Briefing", category: "Governance" },
    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200", alt: "Regional Partnership Protocol Activation", category: "Partnerships" },
    { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200", alt: "Cross-Border Economic Corridor Development", category: "Development" },
    { src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200", alt: "High-Craft Technological Integration Phase", category: "Innovation" },
];

export default function Gallery() {
    const { lang, toggleLang, langLabel } = useLanguageContext();
    const t = COPY[lang];

    return (
        <div className="min-h-screen bg-[#fdfcfb] text-[#0b0b10]">
            <SEO title={`${t.gallery.title} | AIABASD`} description={t.gallery.subtitle} lang={lang} />
            <Header nav={t.nav} langLabel={langLabel} toggleLang={toggleLang} currentLang={lang} />

            <main className="pt-28 pb-24">
                {/* Hero Section */}
                <Section className="py-16 border-b border-black/5 bg-white">
                    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                        <div className="max-w-3xl space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#5a1f2e]">
                                    Media & Visual Gallery
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0b0b10]">
                                {t.gallery.title}
                            </h1>
                            <p className="text-lg text-black/70 leading-relaxed pt-2">
                                {t.gallery.subtitle}
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Photo Gallery Grid */}
                <Section className="py-16">
                    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {GALLERY_ARTIFACTS.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="group bg-white rounded-xl border border-black/5 overflow-hidden shadow-sm hover:shadow-md hover:border-[#5a1f2e]/30 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div className="aspect-[4/3] overflow-hidden relative bg-black/5">
                                        <img
                                            src={item.src}
                                            alt={item.alt}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="text-[11px] font-semibold text-white bg-[#5a1f2e] px-2.5 py-1 rounded-full shadow-sm">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-base font-bold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors leading-snug">
                                            {item.alt}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Section>
            </main>

            <Footer data={t.footer} lang={lang} />
        </div>
    );
}
