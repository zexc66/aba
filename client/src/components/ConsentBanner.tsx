import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { trackPageview } from "@/services/analytics";

export const CONSENT_STORAGE_KEY = "aiabasd-consent";

export function readConsent(): "granted" | "denied" | null {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export default function ConsentBanner() {
  const { content, isRTL } = useLanguageContext();
  const t = content.consent;
  const [visible, setVisible] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    if (readConsent() === null) {
      setVisible(true);
    }
  }, []);

  const decide = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // Storage unavailable — treat as declined; analytics stays off.
    }
    if (value === "granted") {
      trackPageview(`${window.location.pathname}${window.location.search}${window.location.hash}`);
    }
    setLiveMessage(value === "granted" ? t.accept : t.decline);
    setVisible(false);
  };

  return (
    <>
      <div className="sr-only" aria-live="polite">
        {liveMessage}
      </div>
      {visible && (
        <div
          role="region"
          aria-label={t.label}
          aria-live="polite"
          className={`fixed inset-x-0 bottom-0 z-[70] border-t border-[#fdfcfb]/15 bg-[#0b0b10] text-[#fdfcfb] shadow-[0_-18px_50px_rgba(11,11,16,0.30)] ${isRTL ? "font-arabic" : "font-sans"}`}
        >
          <div className="mx-auto flex max-w-[1500px] flex-col items-start gap-4 px-6 py-4 sm:flex-row sm:items-center md:px-12 lg:px-24">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <Cookie size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[#f2a007]" aria-hidden="true" />
              <p className="min-w-0 break-words text-xs leading-relaxed text-[#fdfcfb]/75 text-pretty">{t.message}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => decide("granted")}
                className="min-h-[44px] bg-[#5a1f2e] px-5 text-xs font-semibold uppercase tracking-wider text-[#fdfcfb] transition-[background-color,transform] duration-200 hover:bg-[#5a1f2e]/85 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2a007] motion-reduce:transition-none cursor-pointer"
              >
                {t.accept}
              </button>
              <button
                type="button"
                onClick={() => decide("denied")}
                className="min-h-[44px] border border-[#fdfcfb]/25 bg-transparent px-5 text-xs font-semibold uppercase tracking-wider text-[#fdfcfb]/80 transition-[background-color,color,transform] duration-200 hover:bg-[#fdfcfb]/10 hover:text-[#fdfcfb] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2a007] motion-reduce:transition-none cursor-pointer"
              >
                {t.decline}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
