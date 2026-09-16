import type { Locale3 } from "./projects";

/** Indicative SDG alignment per published program. Displayed as an indicative
 *  framing ("aligned SDGs"), never as a certification. */
export const PROGRAM_SDGS: Record<string, number[]> = {
  "hama-rehabilitation": [3, 4, 11],
  "al-arish-hub": [9, 17],
  "green-energy": [7, 13],
  "digital-africa": [9, 17],
  "integrated-cities": [9, 11],
  "debris-recycling": [11, 12, 13],
  "food-security": [2, 6],
};

const SDG_TITLES: Record<number, Record<Locale3, string>> = {
  2: { en: "Zero Hunger", ar: "القضاء على الجوع", fr: "Faim Zéro" },
  3: { en: "Good Health", ar: "الصحة الجيدة", fr: "Bonne Santé" },
  4: { en: "Quality Education", ar: "التعليم الجيد", fr: "Éducation de Qualité" },
  6: { en: "Clean Water", ar: "المياه النظيفة", fr: "Eau Propre" },
  7: { en: "Clean Energy", ar: "طاقة نظيفة", fr: "Énergie Propre" },
  9: { en: "Industry & Infrastructure", ar: "الصناعة والبنية التحتية", fr: "Industrie et Infrastructure" },
  11: { en: "Sustainable Cities", ar: "مدن مستدامة", fr: "Villes Durables" },
  12: { en: "Responsible Consumption", ar: "استهلاك مسؤول", fr: "Consommation Responsable" },
  13: { en: "Climate Action", ar: "العمل المناخي", fr: "Action Climatique" },
  17: { en: "Partnerships", ar: "عقد الشراكات", fr: "Partenariats" },
};

export function sdgTitle(sdg: number, locale: Locale3): string {
  return SDG_TITLES[sdg]?.[locale] ?? `SDG ${sdg}`;
}

export const SDG_NOTE: Record<Locale3, string> = {
  en: "Indicative SDG alignment of the program's published scope. Not a certification.",
  ar: "توافق استرشادي مع أهداف التنمية المستدامة وفق نطاق البرنامج المنشور. ليس اعتماداً رسمياً.",
  fr: "Alignement indicatif avec les ODD selon le périmètre publié du programme. Ne constitue pas une certification.",
};
