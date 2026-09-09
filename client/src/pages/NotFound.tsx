import { Link } from "wouter";
import { Home, RefreshCw, Layers } from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath } from "@/localePath";
import { LOCALIZED_COPY } from "@/localizedCopy";

export default function NotFound() {
  const { lang } = useLanguageContext();
  const copy = LOCALIZED_COPY[lang].notFound;
  const currentRoute =
    typeof window === "undefined"
      ? "/404"
      : window.location.pathname.replace(/^\/(ar|fr)(?=\/|$)/, "") || "/";

  return (
    <div className="min-h-screen bg-[#0b0b10] text-[#fdfcfb] selection:bg-[#5a1f2e] selection:text-[#fdfcfb] overflow-hidden flex items-center justify-center p-8 relative">
      <SEO
        title={copy.seoTitle}
        description={copy.seoDescription}
        lang={lang}
        url={currentRoute}
      />

      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none">
          <span className="text-[45vw] font-institutional italic font-black tracking-tightest leading-none">
            VOID_404
          </span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1500px] flex flex-col items-center text-center">
        <div className="mb-10">
          <div className="flex items-center justify-center gap-8 mb-10">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#f2a007]">
              {copy.failureCode}
            </span>
            <div className="w-24 h-[1px] bg-[#fdfcfb]/15" aria-hidden="true" />
            <span className="text-[12px] font-black tracking-[0.8em] uppercase text-[#fdfcfb]/70">
              {copy.syncFailure}
            </span>
          </div>

          <h1 className="text-9xl md:text-[18vw] font-institutional text-[#fdfcfb] leading-[0.7] tracking-tightest italic transform-gpu mb-8">
            {copy.title}
          </h1>

          <p className="text-4xl md:text-5xl text-[#fdfcfb]/65 font-institutional italic max-w-4xl mx-auto leading-tight tracking-tight">
            “{copy.quote}”
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 mt-12">
          <Link href={localizedLinkPath("/", lang)}>
            <button className="px-12 py-6 bg-[#fdfcfb] text-[#0b0b10] hover:bg-[#5a1f2e] hover:text-[#fdfcfb] transition-[color,background-color,border-color,transform] shadow-premium-lg rounded-sm flex items-center gap-5">
              <Home size={18} strokeWidth={1.75} aria-hidden="true" />
              <span className="text-[12px] font-black tracking-[0.8em] uppercase">
                {copy.home}
              </span>
            </button>
          </Link>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex items-center gap-5 text-[#fdfcfb]/70 hover:text-[#fdfcfb] transition-colors group"
          >
            <span className="w-12 h-12 border border-[#fdfcfb]/25 flex items-center justify-center group-hover:border-[#f2a007]/60 group-hover:bg-[#5a1f2e]/25 transition-colors">
              <RefreshCw size={14} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="text-[10px] font-black tracking-[0.5em] uppercase">
              {copy.rescan}
            </span>
          </button>
        </div>

        <div className="mt-24 flex flex-col items-center gap-6">
          <div
            className="flex items-center gap-16 text-[#fdfcfb]/20"
            aria-hidden="true"
          >
            <div className="h-[1px] w-32 bg-current" />
            <Layers size={20} strokeWidth={1.5} />
            <div className="h-[1px] w-32 bg-current" />
          </div>

          <div className="text-[10px] font-semibold uppercase text-[#fdfcfb]/60 tracking-[0.9em] max-w-lg leading-relaxed">
            {copy.audit}
            <br />
            {copy.redacted}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-12 left-12 hud-label text-[#fdfcfb]/15 tracking-[2em] hidden xl:block uppercase"
      >
        {copy.errorLog}
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-12 right-12 hud-label text-[#fdfcfb]/15 tracking-[2.5em] hidden xl:block uppercase"
      >
        {copy.coreProtect}
      </div>
    </div>
  );
}
