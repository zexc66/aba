import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { memo } from "react";
import { type Content } from "@/data";

interface TeamProps {
    data: Content['team'];
    hud: Content['hud'];
}

function TeamComponent({ data, hud }: TeamProps) {
    return (
        <Section id="team" className="relative py-24 bg-[#0b0b10] text-[#fdfcfb]">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="05"
                    title={data.title}
                    note={data.note}
                    meta={hud.intellectualAuthority}
                    dark
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                    {data.list.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="bg-[#0b0b10] p-6 flex flex-col"
                        >
                            <div className="aspect-square bg-white/5 border border-white/10 flex items-center justify-center mb-6 overflow-hidden relative">
                                {member.image ? (
                                    <img loading="lazy" decoding="async" src={member.image} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                                ) : (
                                    <User size={64} className="text-white/20" strokeWidth={1} />
                                )}
                            </div>

                            <div className="space-y-2">
                                <span className="t-meta text-[#f2a007] block">
                                    {member.title}
                                </span>
                                <h3 className="text-xl font-bold text-white leading-snug">
                                    {member.name}
                                </h3>
                                <p className="text-xs text-white/60 leading-relaxed pt-2">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </Section>
    );
}

const Team = memo(TeamComponent);
export default Team;
