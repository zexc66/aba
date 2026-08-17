import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function InvestorLogin() {
  const [, setLocation] = useLocation();
  const { lang, content, isRTL } = useLanguageContext();
  const t = content.investor;

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Access-request flow: registers the email as an institutional
      // inquiry. There is no client-side "login" — directorial review
      // grants real access later.
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "INVESTOR_ACCESS",
          email,
        }),
      });

      if (response.ok) {
        toast.success("Access request submitted.");
        toast.info("Institutional verification queued for directorial review.");
        setLocation("/");
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch {
      toast.error("Network error during verification.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#0b0b10] text-[#fdfcfb] flex flex-col justify-between p-6 md:p-12 relative select-none ${isRTL ? "font-arabic" : "font-sans"}`}
    >
      <SEO
        title={`${t.vaultTitle} | AIABASD`}
        description={t.subtitle}
        lang={lang}
      />

      {/* Top Bar */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 py-4">
        <Link href="/">
          <div className="flex items-center gap-3 text-sm font-semibold text-white/70 hover:text-white transition-colors cursor-pointer">
            <ArrowLeft size={18} className={isRTL ? "rotate-180" : ""} />
            <span>Return to Main Site</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#f2a007]">
          <ShieldCheck size={16} />
          <span>Secure Investor Access</span>
        </div>
      </header>

      {/* Main Portal Content */}
      <main className="w-full max-w-md mx-auto my-auto z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#11111a] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#5a1f2e]/20 text-[#f2a007] border border-[#5a1f2e]/40 flex items-center justify-center mx-auto">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {t.vaultTitle}
            </h1>
            <p className="text-sm text-white/60">{t.vaultSubtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70">
                {t.emailLabel}
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full bg-white/5 border border-white/10 pl-11 pr-4 py-3 rounded-lg text-sm text-white placeholder:text-white/30 outline-none focus:border-[#f2a007] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 text-white font-semibold text-sm py-3.5 rounded-lg uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? "Verifying..." : t.cta}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="text-center pt-4 border-t border-white/10">
            <p className="text-xs text-white/50 leading-relaxed">
              {t.auditNote}
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer Bar */}
      <footer className="w-full max-w-6xl mx-auto text-center text-xs text-white/40 z-10 py-4">
        © {new Date().getFullYear()} AIABASD Executive Investor Network.
      </footer>
    </div>
  );
}
