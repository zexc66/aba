import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { COPY } from "@/data";
import { cms } from "@/services/cms";

export type Locale = "en" | "ar" | "fr";

interface LanguageContextValue {
  lang: Locale;
  isRTL: boolean;
  toggleLang: () => void;
  setLang: (lang: Locale) => void;
  content: (typeof COPY)["en"];
  langLabel: string;
  isFetchingCMS: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANG_STORAGE_KEY = "aiabasd-lang";

/** Locale implied by a /ar or /fr path prefix (prerendered locale URLs). */
function pathLocale(): Locale | null {
  try {
    const m = window.location.pathname.match(/^\/(ar|fr)(?=\/|$)/);
    return m ? (m[1] as Locale) : null;
  } catch {
    return null;
  }
}

function initialLang(): Locale {
  // The URL namespace is authoritative. An unprefixed URL is always English;
  // stored preferences must never make / render Arabic or French SSR copy.
  const prefixed = pathLocale();
  if (prefixed) return prefixed;
  return "en";
}

function localizedBrowserPath(next: Locale): string {
  const pathname = window.location.pathname;
  const unprefixed = pathname.replace(/^\/(?:ar|fr)(?=\/|$)/, "") || "/";
  const route = next === "en"
    ? unprefixed
    : unprefixed === "/" ? `/${next}/` : `/${next}${unprefixed}`;
  return `${route}${window.location.search}${window.location.hash}`;
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  // Derive the effective locale once — SSR (prerender) passes it explicitly,
  // the client honors a URL prefix before stored preference, then EN.
  const initial = initialLocale ?? initialLang();
  const [lang, setLangState] = useState<Locale>(initial);
  const [content, setContent] = useState<(typeof COPY)["en"]>(COPY[initial]);
  const [isFetchingCMS, setIsFetchingCMS] = useState(cms.configured);

  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
    }
  }, [isRTL, lang]);

  useEffect(() => {
    const syncFromUrl = () => {
      const next = pathLocale() ?? "en";
      setLangState((current) => current === next ? current : next);
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  useEffect(() => {
    if (!cms.configured) {
      setContent(COPY[lang]);
      setIsFetchingCMS(false);
      return;
    }
    let mounted = true;
    const fetchContent = async () => {
      setIsFetchingCMS(true);
      const data = await cms.getWebsiteContent(lang);
      if (mounted) {
        setContent(data);
        setIsFetchingCMS(false);
      }
    };
    fetchContent();
    return () => {
      mounted = false;
    };
  }, [lang]);

  const setLang = useCallback((next: Locale) => {
    if (next === lang) return;
    setLangState(next);
    if (typeof window === "undefined") return;

    // Wouter listens for popstate. Updating history then dispatching the event
    // keeps the SPA route and the locale content synchronized without a reload.
    const target = localizedBrowserPath(next);
    if (target !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.pushState({}, "", target);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(lang === "en" ? "ar" : lang === "ar" ? "fr" : "en");
  }, [lang, setLang]);

  const langLabel = useMemo(() => content.langLabel, [content.langLabel]);

  const value: LanguageContextValue = useMemo(
    () => ({
      lang,
      isRTL,
      toggleLang,
      setLang,
      content,
      langLabel,
      isFetchingCMS,
    }),
    [lang, isRTL, toggleLang, setLang, content, langLabel, isFetchingCMS]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error(
      "useLanguageContext must be used inside <LanguageProvider>"
    );
  }
  return ctx;
}
