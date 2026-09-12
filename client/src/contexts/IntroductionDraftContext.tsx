import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import type { Locale3 } from "@/projects";

export const emptyIntroductionForm = (locale: Locale3) => ({ organization: "", name: "", email: "", role: "", interest: "", timeline: "", locale, consent: false });
type Draft = {
  search: string | null; company: string; project: string; need: string;
  invalid: boolean; reference: string; form: ReturnType<typeof emptyIntroductionForm>;
};
const Context = createContext<{ draft: Draft; setDraft: Dispatch<SetStateAction<Draft>> } | null>(null);

/** Scoped to one application/request, in memory only; survives locale-router remounts. */
export function IntroductionDraftProvider({ children, initialLocale }: { children: ReactNode; initialLocale: Locale3 }) {
  const [draft, setDraft] = useState<Draft>(() => ({ search: null, company: "", project: "", need: "", invalid: false, reference: "", form: emptyIntroductionForm(initialLocale) }));
  return <Context.Provider value={{ draft, setDraft }}>{children}</Context.Provider>;
}

export function useIntroductionDraft() {
  const value = useContext(Context);
  if (!value) throw new Error("IntroductionDraftProvider is required");
  return value;
}
