import { motion } from "framer-motion";
import { Link } from "wouter";
import { AlertTriangle, Home, ArrowLeft, RefreshCw, Layers } from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath } from "@/localePath";
import { LOCALIZED_COPY } from "@/localizedCopy";

export default function NotFound() {
  const { lang } = useLanguageContext();
  const copy = LOCALIZED_COPY[lang].notFound;
  const currentRoute = typeof window === "undefined"
    ? "/404"
    : window.location.pathname.replace(/^\/(ar|fr)(?=\/|$)/, "") || "/";

  return (
    <div className="min-h-screen bg-[#0b0b10] text-[#fdfcfb] selection:bg-[#5a1f2e] selection:text-[#fdfcfb] overflow-hidden flex items-center justify-center p-8 relative">
        <SEO title={copy.seoTitle} description={copy.seoDescription} lang={lang} url={currentRoute} />
        
        <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none">
                <span className="text-[45vw] font-institutional italic font-black tracking-tightest leading-none">
                    VOID_404
                </span>
            </div>

            <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[1px] bg-[#5a1f2e]/10 shadow-[0_0_20px_rgba(194,94,48,0.5)] z-10"
            />
        </div>

        <div className="relative z-10 w-full max-w-[1500px] flex flex-col items-center text-center">
            <motion.div
                 initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12"
            >
                <div className="flex items-center justify-center gap-12 mb-16">
                    <span className="hud-label text-[#5a1f2e]">{copy.failureCode}</span>
                    <div className="w-24 h-[1px] bg-white/10" />
                    <span className="text-[12px] font-black tracking-[0.8em] uppercase text-white/30">{copy.syncFailure}</span>
                </div>
                
                <h1 className="text-9xl md:text-[18vw] font-institutional text-white leading-[0.7] tracking-tightest italic transform-gpu mb-8">
                    {copy.title}
                </h1>
                
                <p className="text-4xl md:text-5xl text-white/40 font-institutional italic max-w-4xl mx-auto leading-tight tracking-tight">
                    “{copy.quote}”
                </p>
            </motion.div>

            <motion.div 
                 initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="flex flex-col md:flex-row items-center gap-12 mt-16"
            >
                <Link href={localizedLinkPath("/", lang)}>
                    <button className="group relative px-16 py-8 bg-white text-black hover:bg-[#5a1f2e] hover:text-white transition-[color,background-color,border-color,transform] shadow-premium-2xl rounded-sm overflow-hidden flex items-center gap-6">
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Home size={18} className="relative z-10" />
                        <span className="text-[12px] font-black tracking-[1em] uppercase relative z-10">{copy.home}</span>
                    </button>
                </Link>
                
                <div className="flex items-center gap-12 opacity-30 hover:opacity-100 transition-[color,background-color,border-color,transform] cursor-pointer group">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:rotate-180 transition-transform duration-1000 group-hover:bg-[#5a1f2e]/20">
                         <RefreshCw size={14} className="text-white" />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase">{copy.rescan}</span>
                </div>
            </motion.div>

            <div className="mt-48 flex flex-col items-center gap-8">
                <div className="flex items-center gap-24 opacity-10">
                    <div className="h-[1px] w-32 bg-white" />
                    <Layers size={20} strokeWidth={1} />
                    <div className="h-[1px] w-32 bg-white" />
                </div>
                
                <div className="hud-label opacity-10 tracking-[1.5em] uppercase text-[10px] max-w-lg leading-relaxed">
                     {copy.audit}
                     <br/>
                     {copy.redacted}
                </div>
            </div>
        </div>

        <div className="absolute top-12 left-12 hud-label opacity-10 tracking-[2em] hidden xl:block uppercase">{copy.errorLog}</div>
        <div className="absolute bottom-12 right-12 hud-label opacity-10 tracking-[2.5em] hidden xl:block uppercase">{copy.coreProtect}</div>
    </div>
  );
}
