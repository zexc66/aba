import { motion } from "framer-motion";
import { Link } from "wouter";
import { AlertTriangle, Home, ArrowLeft, RefreshCw, Layers } from "lucide-react";
import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b0b10] text-[#fdfcfb] selection:bg-[#5a1f2e] selection:text-[#fdfcfb] overflow-hidden flex items-center justify-center p-8 relative">
        <SEO title="Mandate Void | 404" description="Sovereign protocol error: nodal path not identified in the digital flagship." lang="en" />
        
        <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/textures/grain.png')] opacity-[0.05] mix-blend-overlay" />
            
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12"
            >
                <div className="flex items-center justify-center gap-12 mb-16">
                    <span className="hud-label text-[#5a1f2e]">FAILURE_CODE_0x404</span>
                    <div className="w-24 h-[1px] bg-white/10" />
                    <span className="text-[12px] font-black tracking-[0.8em] uppercase text-white/30">NODAL_SYNC_FAILURE</span>
                </div>
                
                <h1 className="text-9xl md:text-[18vw] font-institutional text-white leading-[0.7] tracking-tightest italic transform-gpu mb-8">
                    Mandate Voids.
                </h1>
                
                <p className="text-4xl md:text-5xl text-white/40 font-institutional italic max-w-4xl mx-auto leading-tight tracking-tight">
                    "The requested nodal path has been de-indexed or does not belong to the sovereign institutional cluster."
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="flex flex-col md:flex-row items-center gap-12 mt-16"
            >
                <Link href="/">
                    <button className="group relative px-16 py-8 bg-white text-black hover:bg-[#5a1f2e] hover:text-white transition-[color,background-color,border-color,transform] shadow-premium-2xl rounded-sm overflow-hidden flex items-center gap-6">
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Home size={18} className="relative z-10" />
                        <span className="text-[12px] font-black tracking-[1em] uppercase relative z-10">REBOOT_TO_HOME</span>
                    </button>
                </Link>
                
                <div className="flex items-center gap-12 opacity-30 hover:opacity-100 transition-[color,background-color,border-color,transform] cursor-pointer group">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:rotate-180 transition-transform duration-1000 group-hover:bg-[#5a1f2e]/20">
                         <RefreshCw size={14} className="text-white" />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.5em] uppercase">INITIATE_PATH_RESCAN</span>
                </div>
            </motion.div>

            <div className="mt-48 flex flex-col items-center gap-8">
                <div className="flex items-center gap-24 opacity-10">
                    <div className="h-[1px] w-32 bg-white" />
                    <Layers size={20} strokeWidth={1} />
                    <div className="h-[1px] w-32 bg-white" />
                </div>
                
                <div className="hud-label opacity-10 tracking-[1.5em] uppercase text-[10px] max-w-lg leading-relaxed">
                    SYSTEM_CORE_AUDIT: NO_LOG_ENTRY_FOR_CURRENT_ROUTE
                    <br/>
                    OVERSIGHT_STATUS: REDACTED_PATHWAY
                </div>
            </div>
        </div>

        <div className="absolute top-12 left-12 hud-label opacity-10 tracking-[2em] hidden xl:block uppercase">ERROR_LOG_V.01</div>
        <div className="absolute bottom-12 right-12 hud-label opacity-10 tracking-[2.5em] hidden xl:block uppercase">INSTITUTIONAL_CORE_PROTECT</div>
    </div>
  );
}
