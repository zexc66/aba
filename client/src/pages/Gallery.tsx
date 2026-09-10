import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { deployAssetPath } from "@/localePath";
import { motion, useReducedMotion } from "framer-motion";
import { Camera } from "lucide-react";

export default function Gallery() {
    const { lang, content, isRTL } = useLanguageContext();
    const shouldReduceMotion = useReducedMotion();
    const t = content.gallery;
    const artifacts = t.artifacts ?? [];

    return (
        <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
            <SEO title={`${t.title} | AIABASD`} description={t.subtitle} lang={lang} url="/gallery" />
            <Header nav={content.nav} />

            <div className="pt-28 pb-24">
                <Section className="py-12 border-b border-[#0b0b10]/10 bg-white">
                    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                        <SectionHeader
                            index="01"
                            title={t.title}
                            note={t.subtitle}
                            meta={t.eyebrow}
                            titleAs="h1"
                        />
                    </div>
                </Section>

                <Section className="py-16">
                    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                            {artifacts.map((item, i) => (
                                <motion.figure
                                    key={item.src}
                                    initial={false}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: shouldReduceMotion ? 0 : 0.4,
                                        delay: shouldReduceMotion ? 0 : Math.min((i % 3) * 0.05, 0.15),
                                    }}
                                    className="relative group bg-white border border-[#0b0b10]/10 overflow-hidden hover:border-[#5a1f2e]/40 shadow-premium transition-[border-color,box-shadow] duration-300 flex flex-col justify-between"
                                >
                                    <span
                                        className="absolute top-0 start-0 h-[2px] w-0 bg-[#f2a007] transition-[width] duration-500 group-hover:w-full z-10"
                                        aria-hidden="true"
                                    />
                                    <div className="aspect-[4/3] overflow-hidden relative bg-[#0b0b10]/5">
                                        <img
                                            src={deployAssetPath(item.src)}
                                            alt={item.alt}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 start-4">
                                            <span className="t-meta text-[10px] text-[#fdfcfb] bg-[#5a1f2e] px-2.5 py-1">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    <figcaption className="p-6">
                                        <h2 className="text-base font-bold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-[color] duration-300 leading-snug">
                                            {item.alt}
                                        </h2>
                                    </figcaption>
                                </motion.figure>
                            ))}

                            <motion.div
                                initial={false}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.1 }}
                                className="border border-dashed border-[#0b0b10]/15 px-8 py-12 flex flex-col items-center text-center bg-[#0b0b10]/[0.02]"
                            >
                                <div className="w-12 h-12 bg-[#5a1f2e]/5 text-[#5a1f2e] border border-[#5a1f2e]/20 flex items-center justify-center mb-5">
                                    <Camera size={20} strokeWidth={1.5} aria-hidden="true" />
                                </div>
                                <h2 className="text-base font-bold text-[#0b0b10] mb-2">
                                    {t.emptyTitle}
                                </h2>
                                <p className="text-xs text-[#0b0b10]/70 leading-relaxed max-w-xs">
                                    {t.emptyText}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </Section>
            </div>

            <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
            <ScrollToTop />
        </div>
    );
}
