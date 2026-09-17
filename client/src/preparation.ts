import { PROJECTS, type Locale3, type Project } from "./projects";

export const PREPARATION_IDS = ["mandate", "demand", "land", "revenue", "environment", "delivery", "partners"] as const;
export type PreparationId = typeof PREPARATION_IDS[number];
export type PreparationStatus = "unknown" | "in-progress" | "available";
export type PreparationDraft = { checks: Partial<Record<PreparationId, PreparationStatus>>; notes: string };
export const PREPARATION_KEY = "aiabasd-preparation-v1";
const en = {
  title: "Project preparation workspace", intro: "Prepare the questions and supporting material for your first project discussion. Your checklist is a personal working note, not a verification of the project.",
  select: "Choose a published project", choose: "Select a project", save: "Save on this device", saved: "Saved on this device. This information has not been sent to AIABASD.", failed: "Device storage is unavailable. You can still download your working note.", download: "Download preparation note",   reset: "Clear this checklist",
  cancelClear: "Keep", notes: "Your preparation notes", noteHint: "Keep confidential documents and personal identifiers out of this working note.", questions: "Preparation checklist", status: "Your assessment", unknown: "Not assessed", "in-progress": "In preparation", available: "Available for discussion", completed: "items marked available", disclaimer: "User-supplied preparation notes. Not a technical assessment, financing commitment or verified readiness rating.", publicInfo: "Published project information", publishedNeeds: "Published partnership opportunities", next: "Discuss this project", guide: "Read the cooperation guide",
  items: { mandate: "Sponsor mandate and decision-making authority", demand: "Demand assessment and intended users", land: "Site, land rights and local requirements", revenue: "Revenue, affordability and operating costs", environment: "Environmental and social screening", delivery: "Delivery model, timeline and responsibilities", partners: "Partner roles and supporting capability information" },
};
export const PREPARATION_COPY: Record<Locale3, typeof en> = {
  en,
  ar: {
    title: "مساحة إعداد المشروع", intro: "جهّز الأسئلة والمعلومات الداعمة للنقاش الأول حول المشروع. قائمتك مذكرة عمل شخصية وليست تحققاً من المشروع.", select: "اختر مشروعاً منشوراً", choose: "اختر مشروعاً", save: "حفظ على هذا الجهاز", saved: "تم الحفظ على هذا الجهاز. لم تُرسل هذه المعلومات إلى التحالف.", failed: "تخزين الجهاز غير متاح. يمكنك تنزيل مذكرة العمل.", download: "تنزيل مذكرة الإعداد",   reset: "مسح هذه القائمة",
  cancelClear: "احتفظ", notes: "ملاحظات الإعداد الخاصة بك", noteHint: "لا تضع مستندات سرية أو بيانات شخصية تعريفية في هذه المذكرة.", questions: "قائمة الإعداد", status: "تقييمك", unknown: "لم يُقيّم", "in-progress": "قيد الإعداد", available: "متاح للنقاش", completed: "عناصر محددة كمتاحة", disclaimer: "ملاحظات إعداد مقدمة من المستخدم، وليست تقييماً فنياً أو التزاماً بالتمويل أو تصنيف جاهزية متحققاً منه.", publicInfo: "معلومات المشروع المنشورة", publishedNeeds: "فرص الشراكة المنشورة", next: "ناقش هذا المشروع", guide: "قراءة دليل التعاون",
    items: { mandate: "تفويض الجهة الراعية وصلاحيات اتخاذ القرار", demand: "تقييم الطلب والمستخدمون المستهدفون", land: "الموقع وحقوق الأرض والمتطلبات المحلية", revenue: "الإيرادات والقدرة على تحمل التكاليف والتشغيل", environment: "الفحص البيئي والاجتماعي", delivery: "نموذج التنفيذ والجدول والمسؤوليات", partners: "أدوار الشركاء والمعلومات الداعمة للقدرات" },
  },
  fr: {
    title: "Espace de préparation de projet", intro: "Préparez les questions et les justificatifs pour votre premier échange. Votre liste est une note de travail personnelle, pas une vérification du projet.", select: "Choisir un projet publié", choose: "Sélectionner un projet", save: "Enregistrer sur cet appareil", saved: "Enregistré sur cet appareil. Ces informations n’ont pas été envoyées à l’AIABASD.", failed: "Le stockage local est indisponible. Vous pouvez télécharger votre note.", download: "Télécharger la note de préparation",   reset: "Effacer cette liste",
  cancelClear: "Conserver", notes: "Vos notes de préparation", noteHint: "N’incluez ni documents confidentiels ni identifiants personnels dans cette note.", questions: "Liste de préparation", status: "Votre évaluation", unknown: "Non évalué", "in-progress": "En préparation", available: "Disponible pour discussion", completed: "éléments marqués disponibles", disclaimer: "Notes fournies par l’utilisateur. Ni évaluation technique, ni engagement de financement, ni notation vérifiée de préparation.", publicInfo: "Informations publiées du projet", publishedNeeds: "Opportunités de partenariat publiées", next: "Discuter de ce projet", guide: "Lire le guide de coopération",
    items: { mandate: "Mandat du porteur et pouvoir de décision", demand: "Évaluation de la demande et usagers visés", land: "Site, droits fonciers et exigences locales", revenue: "Revenus, accessibilité financière et coûts d’exploitation", environment: "Examen environnemental et social", delivery: "Modèle de réalisation, calendrier et responsabilités", partners: "Rôles partenaires et justificatifs de capacités" },
  },
};

export function parsePreparationStore(raw: unknown): Record<string, PreparationDraft> {
  const result: Record<string, PreparationDraft> = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return result;
  const root = raw as Record<string, unknown>;
  if (root.version !== 1 || !root.projects || typeof root.projects !== "object") return result;
  for (const project of PROJECTS) {
    const data = (root.projects as Record<string, unknown>)[project.slug];
    if (!data || typeof data !== "object" || Array.isArray(data)) continue;
    const value = data as Record<string, unknown>;
    const checks: PreparationDraft["checks"] = {};
    for (const key of PREPARATION_IDS) {
      const status = value.checks && typeof value.checks === "object" ? (value.checks as Record<string, unknown>)[key] : null;
      if (status === "unknown" || status === "in-progress" || status === "available") checks[key] = status;
    }
    result[project.slug] = { checks, notes: typeof value.notes === "string" ? value.notes.slice(0, 2000) : "" };
  }
  return result;
}

export function preparationNote(project: Project, draft: PreparationDraft, locale: Locale3) {
  const t = PREPARATION_COPY[locale];
  return [`# ${project.title[locale]}`, t.disclaimer, `## ${t.publicInfo}`, project.description[locale],
    `## ${t.publishedNeeds}`, ...project.partnership.map(p => `- ${p[locale]}`), `## ${t.questions}`,
    ...PREPARATION_IDS.map(key => `- ${t.items[key]}: ${t[draft.checks[key] ?? "unknown"]}`), `## ${t.notes}`, draft.notes].join("\n\n");
}
