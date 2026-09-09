import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { memo } from "react";
import { Link } from "wouter";

const SLUGS: Record<string, string> = {
    "Dr. Mohammed Abdel Moneim": "mohammed-abdel-moneim",
    "د. محمد عبد المنعم": "mohammed-abdel-moneim",
    "Faris Safi": "faris-safi",
    "فارس صافي": "faris-safi",
    "Ziad Shneikat": "ziad-shneikat",
    "زياد شنيكات": "ziad-shneikat",
};
import { type Content } from "@/data";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath } from "@/localePath";

interface TeamProps {
    data: Content['team'];
}

function TeamComponent({ data }: TeamProps) {
    const { lang } = useLanguageContext();
    return (
        <Section id="team" className="relative py-20 bg-[#0b0b10] text-[#fdfcfb] border-y border-[#f2a007]/25">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="05"
                    title={data.title}
                    note={data.note}
                    dark
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#fdfcfb]/10 border border-[#fdfcfb]/10">
                    {data.list.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={false}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className={i === 0 ? "lg:col-span-6" : "lg:col-span-3"}
                        >
                        <Link href={localizedLinkPath(`/team/${SLUGS[member.name] ?? ""}`, lang)} className="block bg-[#0b0b10] p-6 h-full flex flex-col group transition-transform active:translate-y-px">
                            <div className={`${i === 0 ? "lg:aspect-[4/3]" : "aspect-square"} bg-[#fdfcfb]/5 border border-[#fdfcfb]/10 flex items-center justify-center mb-6 overflow-hidden relative`}>
                                {member.image ? (
                                    <img loading="lazy" decoding="async" src={member.image} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[color,background-color,border-color,transform] duration-700" />
                                ) : (
                                    <User size={64} className="text-[#fdfcfb]/20" strokeWidth={1.5} />
                                )}
                            </div>

                            <div className="space-y-2">
                                <span className="t-meta text-[#f2a007] block">
                                    {member.title}
                                </span>
                                <h3 className={`${i === 0 ? "text-2xl" : "text-xl"} font-bold text-[#fdfcfb] leading-snug`}>
                                    {member.name}
                                </h3>
                                <p className="text-xs text-[#fdfcfb]/60 leading-relaxed pt-2">
                                    {member.bio}
                                </p>
                                <span className="t-meta text-[#f2a007] mt-4 pt-3 border-t border-[#fdfcfb]/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {data.profileLabel}
                                </span>
                            </div>
                        </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </Section>
    );
}

const Team = memo(TeamComponent);
export default Team;
