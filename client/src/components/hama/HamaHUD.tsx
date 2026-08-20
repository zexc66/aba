import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguageContext } from "@/contexts/LanguageContext";

interface HamaHUDProps {
    backLabel: string;
    isRTL: boolean;
}

export default function HamaHUD({ backLabel, isRTL }: HamaHUDProps) {
    const [, setLocation] = useLocation();
    const { langLabel, toggleLang } = useLanguageContext();

    return (
        <div className="fixed inset-0 pointer-events-none z-[100]">
            <div className="absolute inset-8 lg:inset-16 border border-black/[0.03] flex flex-col justify-between p-8">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <span className="text-[7px] font-black tracking-[1em] opacity-20 uppercase font-sans">PROTOCOL_ID: HMA-RESTORE-077</span>
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-[1px] bg-[#5a1f2e]" />
                            <span className="text-[8px] font-black tracking-[0.5em] text-[#5a1f2e] uppercase font-sans">AUTHORIZED_ACCESS</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-[7px] font-black tracking-[0.8em] opacity-20 font-sans">SYS_NODE: 0x82_HAMA</span>
                        <span className="text-[7px] font-black tracking-[0.8em] text-[#5a1f2e] uppercase font-sans">CRYPTO_VERIFIED</span>
                        <button
                            onClick={toggleLang}
                            aria-label="Switch language"
                            className="pointer-events-auto mt-1 flex items-center gap-1.5 text-[8px] font-black tracking-[0.4em] uppercase font-sans text-black/55 hover:text-[#5a1f2e] transition-colors"
                        >
                            <Globe size={10} />
                            <span>{langLabel}</span>
                        </button>
                    </div>
                </div>
                
                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-12 group pointer-events-auto cursor-pointer" onClick={() => setLocation('/')}>
                        <div className="w-20 h-20 rounded-full border border-black/5 flex items-center justify-center bg-white shadow-premium group-hover:bg-[#0b0b10] transition-all duration-700">
                            <ArrowRight className={`w-8 h-8 transition-transform duration-700 ${isRTL ? 'rotate-0 group-hover:-translate-x-2' : 'rotate-180 group-hover:translate-x-2'} group-hover:text-white`} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black tracking-[0.4em] text-black/55 group-hover:text-black transition-colors uppercase font-sans">{backLabel}</span>
                            <span className="text-[8px] font-black tracking-[0.8em] text-[#5a1f2e] opacity-0 group-hover:opacity-100 transition-opacity uppercase font-sans">SECURE_REENTRY</span>
                        </div>
                    </div>
                    
                    <div className="hidden lg:flex flex-col items-end opacity-20 transform-gpu">
                        <span className="text-[7px] font-black tracking-[2em] mr-[-2em] font-sans">AFRICA_INSTITUTIONAL_ASSET_BANK</span>
                        <div className="w-64 h-[1px] bg-black my-4 opacity-10" />
                        <span className="text-[6px] font-black tracking-[1em] font-sans">© 2026_AIABASD_SOVEREIGN_INFRASTRUCTURE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
