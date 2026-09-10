import type { Locale3 } from "@/projects";

export const MAP_COPY: Record<Locale3, {
  title: string;
  intro: string;
  eyebrow: string;
  allLabel: string;
  selectedLabel: string;
  activeLabel: string;
  opportunityLabel: string;
  mapNote: string;
  sourceLabel: string;
  corridorLabel: string;
  openLabel: string;
  noProjects: string;
}> = {
  en: {
    title: "Opportunity portfolio map",
    intro: "Review AIABASD's published project portfolio across markets and regional corridors to inspect active catalogue opportunities.",
    eyebrow: "PORTFOLIO_GEOGRAPHY",
    allLabel: "All locations",
    selectedLabel: "Selected location",
    activeLabel: "Published portfolio",
    opportunityLabel: "opportunities",
    mapNote: "Portfolio geography · select a marker to view location opportunities",
    sourceLabel: "Base map: Wikimedia Commons · public domain",
    corridorLabel: "Africa / connected corridors",
    openLabel: "View project",
    noProjects: "No published opportunities are currently listed for this location.",
  },
  ar: {
    title: "خريطة محفظة الفرص",
    intro: "استعرض محفظة مشاريع AIABASD عبر الممرات والأسواق الإقليمية للاطلاع على الفرص النشطة في الكتالوج.",
    eyebrow: "جغرافية_المحفظة",
    allLabel: "جميع المواقع",
    selectedLabel: "الموقع المحدد",
    activeLabel: "المحفظة المنشورة",
    opportunityLabel: "فرص",
    mapNote: "جغرافية المحفظة · اختر علامة لعرض فرص الموقع",
    sourceLabel: "الخريطة الأساسية: ويكيميديا كومنز · ملكية عامة",
    corridorLabel: "أفريقيا / الممرات المرتبطة",
    openLabel: "عرض المشروع",
    noProjects: "لا توجد فرص منشورة مدرجة لهذا الموقع حاليًا.",
  },
  fr: {
    title: "Carte du portefeuille d'opportunités",
    intro: "Consultez le portefeuille de projets d'AIABASD par corridors régionaux pour examiner les opportunités actives du catalogue.",
    eyebrow: "GÉOGRAPHIE_DU_PORTEFEUILLE",
    allLabel: "Tous les sites",
    selectedLabel: "Site sélectionné",
    activeLabel: "Portefeuille publié",
    opportunityLabel: "opportunités",
    mapNote: "Géographie du portefeuille · sélectionnez un marqueur pour voir les opportunités du site",
    sourceLabel: "Carte de fond : Wikimedia Commons · domaine public",
    corridorLabel: "Afrique / corridors connectés",
    openLabel: "Voir le projet",
    noProjects: "Aucune opportunité publiée n'est actuellement répertoriée pour ce site.",
  },
};
