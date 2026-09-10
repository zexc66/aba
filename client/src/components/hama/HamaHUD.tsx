import { motion, useReducedMotion } from "framer-motion";
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
    const reduceMotion = useReducedMotion();

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            <motion.div
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-5 sm:inset-8 lg:inset-16 border border-[#0b0b10]/[0.04] flex flex-col justify-between p-4 sm:p-6 lg:p-8"
            >
                <div className="flex justify-between items-start gap-5">
                    <div className="flex flex-col gap-2 min-w-0">
                        <span className="t-data text-[7px] font-black tracking-[0.65em] opacity-60 text-[#0b0b10] font-sans tabular-nums" dir="ltr">
                            PROTOCOL_ID: HMA-RESTORE-077
                        </span>
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="w-8 h-px bg-[#5a1f2e] shrink-0" />
                            <span className="t-meta text-[8px] font-black tracking-[0.42em] text-[#5a1f2e] font-sans truncate">
                                AUTHORIZED_ACCESS
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 min-w-0">
                        <span className="t-data text-[7px] font-black tracking-[0.55em] opacity-60 text-[#0b0b10] font-sans tabular-nums text-end" dir="ltr">
                            SYS_NODE: 0x82_HAMA
                        </span>
                        <span className="t-meta text-[7px] font-black tracking-[0.45em] text-[#5a1f2e] font-sans text-end">
                            CRYPTO_VERIFIED
                        </span>
                        <button
                            type="button"
                            onClick={toggleLang}
                            aria-label="Switch language"
                            className="pointer-events-auto mt-1 flex items-center gap-2 border border-[#0b0b10]/10 bg-[#fdfcfb]/95 px-2.5 py-2 text-[8px] font-black tracking-[0.28em] uppercase font-sans text-[#0b0b10]/70 hover:text-[#5a1f2e] hover:border-[#5a1f2e]/35 active:translate-y-px transition-[color,border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 shadow-[0_12px_24px_-18px_rgba(90,31,46,0.45)]"
                        >
                            <Globe size={11} strokeWidth={1.75} />
                            <span className="t-data tabular-nums">{langLabel}</span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-end gap-6">
                    <button
                        type="button"
                        className="flex items-center gap-5 sm:gap-8 group pointer-events-auto text-start active:translate-y-px transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2"
                        onClick={() => setLocation("/")}
                    >
                        <span className="w-16 h-16 sm:w-20 sm:h-20 border border-[#0b0b10]/10 flex items-center justify-center bg-[#fdfcfb] shadow-premium-2xl group-hover:bg-[#0b0b10] group-hover:border-[#5a1f2e]/60 transition-[color,background-color,border-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                            <ArrowRight
                                className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isRTL ? "rotate-0 group-hover:-translate-x-1.5" : "rotate-180 group-hover:translate-x-1.5"} group-hover:text-[#fdfcfb]`}
                                strokeWidth={1.75}
                            />
                        </span>
                        <span className="flex flex-col min-w-0">
                            <span className="t-meta text-[10px] font-black tracking-[0.32em] text-[#0b0b10]/70 group-hover:text-[#0b0b10] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] font-sans break-words">
                                {backLabel}
                            </span>
                            <span className="t-meta text-[8px] font-black tracking-[0.55em] text-[#5a1f2e] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] font-sans">
                                SECURE_REENTRY
                            </span>
                        </span>
                    </button>

                    <div className="hidden lg:flex flex-col items-end opacity-40 transform-gpu">
                        <span className="t-meta text-[7px] font-black tracking-[1.1em] me-[-1.1em] font-sans">
                            AFRICA_INSTITUTIONAL_ASSET_BANK
                        </span>
                        <div className="w-64 h-px bg-[#0b0b10]/15 my-4" />
                        <span className="t-data text-[6px] font-black tracking-[0.7em] font-sans tabular-nums" dir="ltr">
                            © 2026_AIABASD_SOVEREIGN_INFRASTRUCTURE
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
