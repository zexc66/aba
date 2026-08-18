import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { type Content } from "@/data";
import { memo } from "react";
import { Handshake } from "lucide-react";

interface PartnersProps {
    data: Content['partners'];
    hud: Content['hud'];
    lang: string;
}

const ALLIANCE_SYNDICATE = [
    { name: "Trilogy", logo: "/partners/trilogy.png" },
    { name: "Creation Design Group", logo: "/partners/cdg.png" },
    { name: "Kaolin International Company", logo: "/partners/kaolin.png" },
    { name: "Mauritanian Metallogistic Service Company", logo: "/partners/mauritanian.png" },
    { name: "Adfat Group of Companies Ltd.", logo: "/partners/adfat.jpg" },
    { name: "Saudi Mauritanian Industrial Company", logo: "/partners/saudi_industrial.jpg" },
    { name: "The Global Agriculture Company", logo: "/partners/global_agriculture.jpg" },
    { name: "Saudi Mauritanian Trading Company", logo: "/partners/saudi_trading.jpg" },
    { name: "Saudi Mauritanian Investment Company", logo: "/partners/sm_investment.jpg" },
    { name: "Adfat Gold Trading", logo: "/partners/adfat_gold.png" },
    { name: "NABT", logo: "/partners/nabt.jpg" },
    { name: "Chemexa", logo: "/partners/chemexa.jpg" },
];

function PartnersComponent({ data, hud }: PartnersProps) {
    return (
        <Section id="partners" className="relative py-24 bg-white border-b border-black/5">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-black/5">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#5a1f2e]">
                                {hud.strategicConsortium}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b0b10]">
                            {data.title}
                        </h2>
                    </div>

                    <div className="max-w-md">
                        <p className="text-base text-black/70 italic leading-relaxed">
                            "{data.note}"
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {ALLIANCE_SYNDICATE.map((partner, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                            className="bg-[#fdfcfb] rounded-xl border border-black/5 p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-[#5a1f2e]/30 hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="h-16 w-full flex items-center justify-center">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-h-14 max-w-[140px] w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                                    loading="lazy"
                                />
                            </div>
                            <span className="text-xs font-semibold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors leading-tight">
                                {partner.name}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black/60 font-medium">
                    <div className="flex items-center gap-2">
                        <Handshake className="w-4 h-4 text-[#5a1f2e]" />
                        <span>Vetted & Authorized Strategic Institutional Partners</span>
                    </div>
                    <span>AIABASD Global Consortium Network</span>
                </div>

            </div>
        </Section>
    );
}

const Partners = memo(PartnersComponent);
export default Partners;
