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
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "en" || stored === "ar" || stored === "fr") return stored;
  } catch {
  }
  return pathLocale() ?? "en";
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [lang, setLangState] = useState<Locale>(initialLocale ?? initialLang);
  const [content, setContent] = useState<(typeof COPY)["en"]>(COPY["en"]);
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
    setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState(prev => (prev === "en" ? "ar" : prev === "ar" ? "fr" : "en"));
  }, []);

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
