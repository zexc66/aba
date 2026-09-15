import type { Locale3 } from "./projects";

export interface TemplateDef {
  id: string;
  title: Record<Locale3, string>;
  desc: Record<Locale3, string>;
  filename: string;
  build: (locale: Locale3) => string;
}

const C = {
  en: { loi: "Letter of Intent — Project Cooperation", brief: "Project Brief", fields: "Fill in the bracketed fields", footer: "Template provided by AIABASD for institutional preparation. Not legal advice — have counsel review before signing." },
  ar: { loi: "خطاب نوايا — تعاون في مشروع", brief: "ملف المشروع", fields: "املأ الحقول بين الأقواس", footer: "نموذج مقدّم من التحالف للإعداد المؤسسي. ليس استشارة قانونية — راجع المستشار القانوني قبل التوقيع." },
  fr: { loi: "Lettre d'Intention — Coopération de Projet", brief: "Fiche de Projet", fields: "Remplissez les champs entre crochets", footer: "Modèle fourni par l'AIABASD pour la préparation institutionnelle. Sans valeur de conseil juridique — faites valider par un conseil avant signature." },
} as const;

const L = (locale: Locale3) => ({
  to: { en: "To:", ar: "إلى:", fr: "À :" }[locale],
  from: { en: "From:", ar: "من:", fr: "De :" }[locale],
  date: { en: "Date:", ar: "التاريخ:", fr: "Date :" }[locale],
  subject: { en: "Subject:", ar: "الموضوع:", fr: "Objet :" }[locale],
});

export const TEMPLATES: TemplateDef[] = [
  {
    id: "loi",
    filename: "aiabasd-loi-template",
    title: { en: C.en.loi, ar: C.ar.loi, fr: C.fr.loi },
    desc: {
      en: "A formal first letter an institution sends to open cooperation on a specific project — scope, intent, and next step, one page.",
      ar: "خطاب رسمي أول ترسله الجهة لفتح التعاون في مشروع محدد — النطاق والنوايا والخطوة التالية، في صفحة واحدة.",
      fr: "Première lettre formelle pour ouvrir une coopération sur un projet précis — périmètre, intention et prochaine étape, une page.",
    },
    build: (locale) => {
      const l = L(locale);
      const body = {
        en: ["We, [Organization], confirm our interest in cooperating with AIABASD on the development of [Project] in [Country/Region].", "Our intent is to explore a cooperation structure — such as PPP, BOT, or EPC+F — aligned with [applicable framework/policy].", "The scope we envision at this stage: [two to three sentences].", "We propose a working meeting to define feasibility steps, required documentation, and a preliminary timeline.", "This letter expresses intent only and is not a binding commitment."],
        ar: ["نحن [الجهة] نؤكد اهتمامنا بالتعاون مع التحالف في تطوير [المشروع] في [الدولة/المنطقة].", "ننوي استكشاف هيكل تعاون — مثل PPP أو BOT أو EPC+F — بما يتوافق مع [الإطار/السياسة المعمول بها].", "النطاق المتصور في هذه المرحلة: [جملتان إلى ثلاث].", "نقترح اجتماعاً عملياً لتحديد خطوات الجدوى والمستندات المطلوبة وجدول زمني مبدئي.", "هذا الخطاب إفادة نوايا فقط وليس التزاماً ملزماً."],
        fr: ["Nous, [Organisation], confirmons notre intérêt à coopérer avec l'AIABASD pour le développement de [Projet] en [Pays/Région].", "Notre intention est d'explorer une structure de coopération — PPP, BOT ou EPC+F — alignée sur [cadre/politique applicable].", "Le périmètre envisagé à ce stade : [deux à trois phrases].", "Nous proposons une réunion de travail pour définir les étapes de faisabilité, les documents requis et un calendrier préliminaire.", "La présente lettre exprime une intention et ne constitue pas un engagement contraignant."],
      }[locale];
      return [
        locale === "ar" ? C.ar.loi : locale === "fr" ? C.fr.loi : C.en.loi,
        "", l.to + " AIABASD — African International Alliance for Business & Sustainable Development",
        l.from + " [Organization / Authority]", l.date + " [YYYY-MM-DD]",
        locale === "ar" ? l.subject + " النوايا بالتعاون في [المشروع]" : locale === "fr" ? l.subject + " Intention de coopération — [Projet]" : l.subject + " Intent to cooperate on [Project]",
        "", C[locale].fields, "",
        ...body.map(p => p + "\n"),
        "[Authorized signatory]\n[Name / Title / Seal]",
        "", "---", C[locale].footer,
      ].join("\n");
    },
  },
  {
    id: "project-brief",
    filename: "aiabasd-project-brief-template",
    title: { en: C.en.brief, ar: C.ar.brief, fr: C.fr.brief },
    desc: {
      en: "The structured brief AIABASD uses to assess a proposal — one field per question, no jargon required.",
      ar: "الملف المنظم الذي يعتمده التحالف لتقييم المقترحات — حقل لكل سؤال، دون مصطلحات معقدة.",
      fr: "La fiche structurée utilisée par l'AIABASD pour évaluer une proposition — un champ par question, sans jargon.",
    },
    build: (locale) => {
      const f = {
        en: [["Project title", ""], ["Sponsoring organization & mandate", ""], ["Location (city / region)", ""], ["Sector", ""], ["Current stage", ""], ["Indicative scale", ""], ["Proposed delivery model", ""], ["Problem and demand (who needs this, and why now)", ""], ["Strategic objectives (max 4)", ""], ["Partnership needs (what you seek from partners)", ""], ["Available documentation (studies, land papers, approvals)", ""], ["Expected timeline", ""]],
        ar: [["عنوان المشروع", ""], ["الجهة الراعية والتفويض", ""], ["الموقع (مدينة / منطقة)", ""], ["القطاع", ""], ["المرحلة الحالية", ""], ["الحجم الاسترشادي", ""], ["نموذج التنفيذ المقترح", ""], ["المشكلة والطلب (من يحتاج هذا، ولماذا الآن)", ""], ["الأهداف الاستراتيجية (4 كحد أقصى)", ""], ["احتياجات الشراكة (ما تطلبه من الشركاء)", ""], ["المستندات المتاحة (دراسات، أراضي، موافقات)", ""], ["الجدول الزمني المتوقع", ""]],
        fr: [["Titre du projet", ""], ["Organisation porteuse et mandat", ""], ["Localisation (ville / région)", ""], ["Secteur", ""], ["Étape actuelle", ""], ["Échelle indicative", ""], ["Modèle de réalisation proposé", ""], ["Problème et demande (qui en a besoin, et pourquoi maintenant)", ""], ["Objectifs stratégiques (4 max)", ""], ["Besoins de partenariat (ce que vous recherchez)", ""], ["Documentation disponible (études, foncier, approbations)", ""], ["Calendrier prévu", ""]],
      }[locale];
      const title = locale === "ar" ? C.ar.brief : locale === "fr" ? C.fr.brief : C.en.brief;
      const note = {
        en: "Answer every field in plain language. Write \u201CNot yet available\u201D where a document or answer does not exist — honesty here speeds up assessment.",
        ar: "أجب عن كل حقل بلغة بسيطة. اكتب \u201Cغير متوفر بعد\u201D حيث لا توجد وثيقة أو إجابة — الصدق هنا يسرّع التقييم.",
        fr: "Répondez à chaque champ simplement. Écrivez \u201CPas encore disponible\u201D si un document manque — l'honnêteté accélère l'évaluation.",
      }[locale];
      return [
        title,
        "",
        ...f.map(([label]) => `${label}:\n[...]\n`),
        "---",
        note,
        "",
        C[locale].footer,
      ].join("\n");
    },
  },
];

export const TEMPLATES_COPY: Record<Locale3, {
  title: string; intro: string; download: string; downloadHint: string;
  privacy: string; more: string; moreIntro: string; preparation: string;
}> = {
  en: {
    title: "Preparation templates", intro: "Two working documents that speed up the first conversation: a letter of intent to open cooperation, and the structured brief AIABASD assesses proposals against. Download, fill in, and send.",
    download: "Download", downloadHint: "Plain-text file — opens in any editor and prints cleanly.",
    privacy: "Templates download directly to your device; nothing is uploaded to AIABASD.",
    more: "More preparation", moreIntro: "Pair the templates with the checklist and the cooperation guide:", preparation: "Project preparation workspace",
  },
  ar: {
    title: "قوالب الإعداد", intro: "مستندان عمليان يسرعان النقاش الأول: خطاب نوايا لفتح التعاون، والملف المنظم الذي يعتمده التحالف لتقييم المقترحات. نزّل واملأ وأرسل.",
    download: "تنزيل", downloadHint: "ملف نصي — يفتح في أي محرر ويُطبع بوضوح.",
    privacy: "تُنزّل القوالب مباشرة إلى جهازك؛ لا يُرفع أي شيء إلى التحالف.",
    more: "مزيد من الإعداد", moreIntro: "اقترن القوالب بقائمة التحقق ودليل التعاون:", preparation: "مساحة إعداد المشروع",
  },
  fr: {
    title: "Modèles de préparation", intro: "Deux documents de travail qui accélèrent le premier échange : une lettre d'intention pour ouvrir la coopération, et la fiche structurée sur laquelle l'AIABASD évalue les propositions. Téléchargez, remplissez, envoyez.",
    download: "Télécharger", downloadHint: "Fichier texte brut — s'ouvre dans tout éditeur et s'imprime proprement.",
    privacy: "Les modèles se téléchargent directement sur votre appareil ; rien n'est transmis à l'AIABASD.",
    more: "Plus de préparation", moreIntro: "Associez les modèles à la liste de contrôle et au guide de coopération :", preparation: "Espace de préparation de projet",
  },
};
