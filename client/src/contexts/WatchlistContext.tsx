import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PROJECTS } from "@/projects";

const STORAGE_KEY = "aiabasd-watchlist";
const COMPARE_STORAGE_KEY = "aiabasd-compare";
const SAVABLE_SLUGS = new Set(PROJECTS.filter((project) => project.type !== "initiative").map((project) => project.slug));

type WatchlistContextValue = {
  savedSlugs: string[];
  compareSlugs: string[];
  isSaved: (slug: string) => boolean;
  toggle: (slug: string) => void;
  isCompared: (slug: string) => boolean;
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
};

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) setSavedSlugs(stored.filter((slug): slug is string => typeof slug === "string" && SAVABLE_SLUGS.has(slug)));
      const compared = JSON.parse(window.localStorage.getItem(COMPARE_STORAGE_KEY) ?? "[]");
      if (Array.isArray(compared)) setCompareSlugs(compared.filter((slug): slug is string => typeof slug === "string" && SAVABLE_SLUGS.has(slug)).slice(0, 3));
    } catch {
      // A private browsing session or blocked storage should not break browsing.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSlugs));
    } catch {
      // Watchlist remains usable for the current session when storage is unavailable.
    }
  }, [hydrated, savedSlugs]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareSlugs));
    } catch {
      // Comparison remains usable for the current session when storage is unavailable.
    }
  }, [compareSlugs, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setCompareSlugs((current) => current.filter((slug) => savedSlugs.includes(slug)));
  }, [hydrated, savedSlugs]);

  const isSaved = (slug: string) => savedSlugs.includes(slug);
  const toggle = (slug: string) => {
    if (!SAVABLE_SLUGS.has(slug)) return;
    setSavedSlugs((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  };
  const isCompared = (slug: string) => compareSlugs.includes(slug);
  const toggleCompare = (slug: string) => {
    if (!SAVABLE_SLUGS.has(slug)) return;
    setCompareSlugs((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      return current.length < 3 ? [...current, slug] : current;
    });
  };
  const clearCompare = () => setCompareSlugs([]);

  return <WatchlistContext.Provider value={{ savedSlugs, compareSlugs, isSaved, toggle, isCompared, toggleCompare, clearCompare }}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return context;
}
