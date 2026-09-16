import { PROJECTS, SECTORS, COUNTRIES, STATUSES, projectLastReviewed, type Locale3 } from "../client/src/projects";

export const PUBLIC_DATA_NOTE: Record<Locale3, string> = {
  en: "Published program and project data. Statuses are factual and indicative — not an offer, financing commitment, or technical certification.",
  ar: "بيانات البرامج والمشاريع المنشورة. الحالات واقعية واسترشادية — وليست عرضاً أو التزاماً بتمويل أو اعتماداً فنياً.",
  fr: "Données publiées des programmes et projets. Les statuts sont factuels et indicatifs — ni offre, ni engagement de financement, ni certification technique.",
};

/** Public, read-only projection of the published catalog (JSX-free). */
export function publicProjects(locale: Locale3) {
  return {
    source: "AIABASD published catalog — https://aiabasd.org/projects",
    note: PUBLIC_DATA_NOTE[locale],
    generatedForLocale: locale,
    programs: [],
    projects: PROJECTS.filter((p) => p.type !== "initiative").map((p) => ({
      slug: p.slug,
      type: p.type,
      status: STATUSES[p.status][locale],
      sector: SECTORS[p.sector][locale],
      country: COUNTRIES[p.country][locale],
      title: p.title[locale],
      description: p.description[locale],
      objectives: p.objectives.map((o) => o[locale]),
      partnershipNeeds: p.partnership.map((n) => n[locale]),
      lastReviewed: projectLastReviewed(p),
    })),
  };
}
