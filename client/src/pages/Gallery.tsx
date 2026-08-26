import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const GALLERY_ARTIFACTS = [
    { src: "/gallery/events/event-group.jpg", alt: "Sovereign Community Stakeholder Summit", category: "Summit & Convening" },
];

export default function Gallery() {
    const { lang, toggleLang, langLabel, content } = useLanguageContext();
    const t = content.gallery;

    return (
        <div className="min-h-screen bg-[#fdfcfb] text-[#0b0b10]">
            <SEO title={`${t.title} | AIABASD`} description={t.subtitle} lang={lang} url="/gallery" />
            <Header nav={content.nav} />

            <main className="pt-28 pb-24">
                <Section className="py-16 border-b border-black/10 bg-white">
                    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                        <div className="max-w-3xl space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                                <span className="t-meta text-[#5a1f2e]">
                                    {t.eyebrow}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0b0b10]">
                                {t.title}
                            </h1>
                            <p className="text-lg text-black/70 leading-relaxed pt-2">
                                {t.subtitle}
                            </p>
                        </div>
                    </div>
                </Section>

                <Section className="py-16">
                    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {GALLERY_ARTIFACTS.map((item, i) => (
                                <motion.figure
                                    key={item.src}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="group bg-white rounded-sm border border-black/5 overflow-hidden hover:shadow-md hover:border-[#5a1f2e]/30 transition-[color,background-color,border-color,transform] duration-300 flex flex-col justify-between"
                                >
                                    <div className="aspect-[4/3] overflow-hidden relative bg-black/5">
                                        <img
                                            src={item.src}
                                            alt={item.alt}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="text-[11px] font-semibold text-white bg-[#5a1f2e] px-2.5 py-1 rounded-full">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    <figcaption className="p-6">
                                        <h3 className="text-base font-bold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors leading-snug">
                                            {item.alt}
                                        </h3>
                                    </figcaption>
                                </motion.figure>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="border border-dashed border-black/15 rounded-sm px-8 py-12 flex flex-col items-center text-center bg-black/[0.015]"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#5a1f2e]/5 text-[#5a1f2e] border border-[#5a1f2e]/20 flex items-center justify-center mb-5">
                                    <Camera size={20} />
                                </div>
                                <h3 className="text-base font-bold text-[#0b0b10] mb-2">
                                    {t.emptyTitle}
                                </h3>
                                <p className="text-xs text-black/60 leading-relaxed max-w-xs">
                                    {t.emptyText}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </Section>
            </main>

            <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
        </div>
    );
}
