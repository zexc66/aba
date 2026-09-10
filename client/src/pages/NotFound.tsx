import { Link } from "wouter";
import { Home, RefreshCw, Layers } from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath } from "@/localePath";
import { LOCALIZED_COPY } from "@/localizedCopy";

export default function NotFound() {
  const { lang, isRTL } = useLanguageContext();
  const copy = LOCALIZED_COPY[lang].notFound;
  const currentRoute =
    typeof window === "undefined"
      ? "/404"
      : window.location.pathname.replace(/^\/(ar|fr)(?=\/|$)/, "") || "/";

  return (
    <div className={`min-h-screen bg-[#0b0b10] text-[#fdfcfb] selection:bg-[#5a1f2e] selection:text-[#fdfcfb] overflow-hidden flex items-center justify-center p-8 relative ${isRTL ? "font-arabic" : ""}`}>
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
            <span className="t-meta text-[10px] text-[#f2a007]" dir="ltr">
              <bdi>{copy.failureCode}</bdi>
            </span>
            <div className="w-24 h-[1px] bg-[#fdfcfb]/15" aria-hidden="true" />
            <span className="t-meta text-[11px] text-[#fdfcfb]/70">
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
          <Link asChild href={localizedLinkPath("/", lang)}>
            <a className="px-10 py-4 bg-[#fdfcfb] text-[#0b0b10] hover:bg-[#5a1f2e] hover:text-[#fdfcfb] transition-[color,background-color,transform] duration-300 shadow-premium-lg flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 active:translate-y-px">
              <Home size={18} strokeWidth={1.75} aria-hidden="true" />
              <span className="t-meta text-[11px] tracking-[0.25em]">
                {copy.home}
              </span>
            </a>
          </Link>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex items-center gap-4 text-[#fdfcfb]/70 hover:text-[#fdfcfb] transition-[color,transform] duration-300 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2 active:translate-y-px"
          >
            <span className="w-11 h-11 border border-[#fdfcfb]/25 flex items-center justify-center group-hover:border-[#f2a007]/60 group-hover:bg-[#5a1f2e]/25 transition-[border-color,background-color] duration-300 active:scale-95">
              <RefreshCw size={14} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="t-meta text-[10px] tracking-[0.2em]">
              {copy.rescan}
            </span>
          </button>
        </div>

        <div className="mt-24 flex flex-col items-center gap-6">
          <div
            className="flex items-center gap-16 text-[#fdfcfb]/30"
            aria-hidden="true"
          >
            <div className="h-[1px] w-32 bg-current" />
            <Layers size={20} strokeWidth={1.5} />
            <div className="h-[1px] w-32 bg-current" />
          </div>

          <div className="t-meta text-[10px] text-[#fdfcfb]/60 max-w-lg leading-relaxed">
            {copy.audit}
            <br />
            {copy.redacted}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-12 start-12 hud-label text-[#fdfcfb]/15 tracking-[2em] hidden xl:block uppercase"
      >
        {copy.errorLog}
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-12 end-12 hud-label text-[#fdfcfb]/15 tracking-[2.5em] hidden xl:block uppercase"
      >
        {copy.coreProtect}
      </div>
    </div>
  );
}
