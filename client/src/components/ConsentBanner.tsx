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
  const { lang, content, isRTL } = useLanguageContext();
  const t = content.consent;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent() === null) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const decide = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // Storage unavailable — treat as declined; analytics stays off.
    }
    if (value === "granted") {
      trackPageview(`${window.location.pathname}${window.location.search}${window.location.hash}`);
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label={t.label}
      className={`fixed bottom-0 inset-x-0 z-[90] bg-[#0b0b10] text-white border-t border-white/15 ${isRTL ? "font-arabic" : "font-sans"}`}
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Cookie size={18} className="text-[#f2a007] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-white/75 leading-relaxed">{t.message}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => decide("granted")}
            className="min-h-[44px] px-5 bg-[#5a1f2e] hover:bg-[#5a1f2e]/85 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {t.accept}
          </button>
          <button
            type="button"
            onClick={() => decide("denied")}
            className="min-h-[44px] px-5 bg-transparent hover:bg-white/10 border border-white/25 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {t.decline}
          </button>
        </div>
      </div>
    </div>
  );
}
