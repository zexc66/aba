import { Section } from "@/components/ui/section";
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
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-0.5 w-8 bg-[#f2a007]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#f2a007]">
                                {hud.intellectualAuthority}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                            {data.title}
                        </h2>
                    </div>

                    <div className="max-w-md">
                        <p className="text-base text-white/70 italic leading-relaxed">
                            "{data.note}"
                        </p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.list.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group bg-white/5 rounded-xl border border-white/10 p-6 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            <div>
                                <div className="aspect-square rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 overflow-hidden relative">
                                    {member.image ? (
                                        <img loading="lazy" decoding="async" src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={64} className="text-white/20" strokeWidth={1} />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#f2a007] block">
                                        {member.title}
                                    </span>
                                    <h3 className="text-xl font-bold text-white leading-snug">
                                        {member.name}
                                    </h3>
                                    <p className="text-xs text-white/70 leading-relaxed pt-2">
                                        {member.bio}
                                    </p>
                                </div>
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
