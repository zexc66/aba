import type { PlatformLocale } from "@/platform";

type SubmissionCopy = {
  title: string;
  intro: string;
  eyebrow: string;
  steps: string[];
  ownerTitle: string;
  projectTitle: string;
  evidenceTitle: string;
  reviewTitle: string;
  organizationLabel: string;
  organizationPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  partyTypeLabel: string;
  titleLabel: string;
  titlePlaceholder: string;
  summaryLabel: string;
  summaryPlaceholder: string;
  countryLabel: string;
  sectorLabel: string;
  statusLabel: string;
  locationLabel: string;
  locationPlaceholder: string;
  scaleLabel: string;
  scalePlaceholder: string;
  modelLabel: string;
  modelPlaceholder: string;
  objectivesLabel: string;
  objectivesPlaceholder: string;
  objectivesNote: string;
  partnershipLabel: string;
  partnershipPlaceholder: string;
  partnershipNote: string;
  consentLabel: string;
  consentText: string;
  backLabel: string;
  nextLabel: string;
  saveLabel: string;
  savedLabel: string;
  submitLabel: string;
  submittingLabel: string;
  readinessTitle: string;
  readinessNote: string;
  reviewNote: string;
  successTitle: string;
  successNote: string;
  error: string;
  staticNote: string;
  emptyOption: string;
  clearDraftLabel: string;
};

export const SUBMISSION_COPY: Record<PlatformLocale, SubmissionCopy> = {
  en: {
    title: "Submit an opportunity",
    intro: "Share a structured project brief for initial review. AIABASD will assess the published information and contact the submitting organization about possible next steps.",
    eyebrow: "PROJECT_SUBMISSION",
    steps: ["Owner", "Project", "Evidence", "Review"],
    ownerTitle: "Who is submitting this opportunity?",
    projectTitle: "What is the opportunity?",
    evidenceTitle: "What is currently known?",
    reviewTitle: "Review before submission",
    organizationLabel: "Organization",
    organizationPlaceholder: "Institution, sponsor, or project owner",
    emailLabel: "Contact email",
    emailPlaceholder: "name@institution.org",
    partyTypeLabel: "Organization type",
    titleLabel: "Project title",
    titlePlaceholder: "A clear working title",
    summaryLabel: "Short project summary",
    summaryPlaceholder: "What problem does this project address, and what outcome is being pursued?",
    countryLabel: "Country / region",
    sectorLabel: "Sector",
    statusLabel: "Current stage",
    locationLabel: "Location",
    locationPlaceholder: "City, region, or corridor",
    scaleLabel: "Indicative scale",
    scalePlaceholder: "Known capacity, area, units, or investment range",
    modelLabel: "Proposed delivery model",
    modelPlaceholder: "Public, private, PPP, concession, cooperative, or to be defined",
    objectivesLabel: "Strategic objectives",
    objectivesPlaceholder: "One objective per line",
    objectivesNote: "Add the outcomes the project is intended to support.",
    partnershipLabel: "Partnership needs",
    partnershipPlaceholder: "One need per line",
    partnershipNote: "Describe the partners, capabilities, or decisions still needed.",
    consentLabel: "Permission to review",
    consentText: "I confirm that I am authorized to share this project information and agree that AIABASD may contact my organization about this submission.",
    backLabel: "Back",
    nextLabel: "Continue",
    saveLabel: "Save draft",
    savedLabel: "Draft saved locally",
    submitLabel: "Submit for review",
    submittingLabel: "Submitting",
    readinessTitle: "Profile completeness",
    readinessNote: "This signal reflects only the fields supplied here. It is not an investment, legal, or technical due-diligence rating.",
    reviewNote: "Submitting creates an inquiry for initial human review. It does not publish the project or create a mandate, approval, or financing commitment.",
    successTitle: "Submission received",
    successNote: "Your project brief was sent for initial review under reference {ref}.",
    error: "The submission could not be sent. Please save the draft and try again later.",
    staticNote: "This static preview does not have submission delivery enabled. Use the live AIABASD deployment to submit an opportunity.",
    emptyOption: "Select an option",
    clearDraftLabel: "Clear saved draft",
  },
  ar: {
    title: "تقديم فرصة",
    intro: "شارك موجزاً منظماً لمشروع للمراجعة الأولية. سيقيّم التحالف المعلومات المقدمة ويتواصل مع الجهة المرسلة بشأن الخطوات المحتملة.",
    eyebrow: "تقديم_مشروع",
    steps: ["الجهة", "المشروع", "الأدلة", "المراجعة"],
    ownerTitle: "من يقدم هذه الفرصة؟",
    projectTitle: "ما هي الفرصة؟",
    evidenceTitle: "ما المعروف حالياً؟",
    reviewTitle: "مراجعة قبل الإرسال",
    organizationLabel: "الجهة",
    organizationPlaceholder: "المؤسسة أو الراعي أو مالك المشروع",
    emailLabel: "البريد الإلكتروني للتواصل",
    emailPlaceholder: "name@institution.org",
    partyTypeLabel: "نوع الجهة",
    titleLabel: "عنوان المشروع",
    titlePlaceholder: "عنوان عملي واضح",
    summaryLabel: "ملخص قصير للمشروع",
    summaryPlaceholder: "ما المشكلة التي يعالجها المشروع وما النتيجة المستهدفة؟",
    countryLabel: "الدولة / الإقليم",
    sectorLabel: "القطاع",
    statusLabel: "المرحلة الحالية",
    locationLabel: "الموقع",
    locationPlaceholder: "المدينة أو الإقليم أو الممر",
    scaleLabel: "النطاق التقديري",
    scalePlaceholder: "القدرة أو المساحة أو الوحدات أو نطاق الاستثمار المعروف",
    modelLabel: "نموذج التنفيذ المقترح",
    modelPlaceholder: "عام أو خاص أو شراكة أو امتياز أو تعاوني أو يحدد لاحقاً",
    objectivesLabel: "الأهداف الاستراتيجية",
    objectivesPlaceholder: "هدف واحد في كل سطر",
    objectivesNote: "أضف النتائج التي يهدف المشروع إلى دعمها.",
    partnershipLabel: "احتياجات الشراكة",
    partnershipPlaceholder: "احتياج واحد في كل سطر",
    partnershipNote: "صف الشركاء أو القدرات أو القرارات المطلوبة.",
    consentLabel: "الإذن بالمراجعة",
    consentText: "أؤكد أن لدي صلاحية مشاركة معلومات المشروع وأوافق على تواصل التحالف مع جهتي بشأن هذا التقديم.",
    backLabel: "رجوع",
    nextLabel: "متابعة",
    saveLabel: "حفظ المسودة",
    savedLabel: "تم حفظ المسودة محلياً",
    submitLabel: "إرسال للمراجعة",
    submittingLabel: "جارٍ الإرسال",
    readinessTitle: "اكتمال الملف",
    readinessNote: "يعكس هذا المؤشر الحقول المقدمة فقط، وليس تقييماً استثمارياً أو قانونياً أو تقنياً للعناية الواجبة.",
    reviewNote: "ينشئ الإرسال طلباً للمراجعة البشرية الأولية. لا ينشر المشروع ولا ينشئ تفويضاً أو موافقة أو التزاماً بالتمويل.",
    successTitle: "تم استلام التقديم",
    successNote: "تم إرسال موجز مشروعك للمراجعة الأولية تحت الرقم {ref}.",
    error: "تعذر إرسال التقديم. احفظ المسودة وحاول مرة أخرى لاحقاً.",
    staticNote: "هذه المعاينة الثابتة لا تدعم إرسال التقديمات. استخدم نسخة AIABASD المباشرة لتقديم فرصة.",
    emptyOption: "اختر خياراً",
    clearDraftLabel: "مسح المسودة المحفوظة",
  },
  fr: {
    title: "Soumettre une opportunité",
    intro: "Partagez une note de projet structurée pour une première revue. L'AIABASD évaluera les informations fournies et contactera l'organisation soumettrice au sujet des prochaines étapes possibles.",
    eyebrow: "SOUMISSION_PROJET",
    steps: ["Porteur", "Projet", "Éléments", "Revue"],
    ownerTitle: "Qui soumet cette opportunité ?",
    projectTitle: "Quelle est l'opportunité ?",
    evidenceTitle: "Que sait-on actuellement ?",
    reviewTitle: "Vérifier avant l'envoi",
    organizationLabel: "Organisation",
    organizationPlaceholder: "Institution, sponsor ou porteur du projet",
    emailLabel: "E-mail de contact",
    emailPlaceholder: "name@institution.org",
    partyTypeLabel: "Type d'organisation",
    titleLabel: "Titre du projet",
    titlePlaceholder: "Titre de travail clair",
    summaryLabel: "Résumé court du projet",
    summaryPlaceholder: "Quel problème le projet traite-t-il et quel résultat est recherché ?",
    countryLabel: "Pays / région",
    sectorLabel: "Secteur",
    statusLabel: "Étape actuelle",
    locationLabel: "Localisation",
    locationPlaceholder: "Ville, région ou corridor",
    scaleLabel: "Échelle indicative",
    scalePlaceholder: "Capacité, superficie, unités ou fourchette d'investissement connue",
    modelLabel: "Modèle de mise en œuvre proposé",
    modelPlaceholder: "Public, privé, PPP, concession, coopératif ou à définir",
    objectivesLabel: "Objectifs stratégiques",
    objectivesPlaceholder: "Un objectif par ligne",
    objectivesNote: "Ajoutez les résultats que le projet doit soutenir.",
    partnershipLabel: "Besoins de partenariat",
    partnershipPlaceholder: "Un besoin par ligne",
    partnershipNote: "Décrivez les partenaires, capacités ou décisions encore nécessaires.",
    consentLabel: "Autorisation de revue",
    consentText: "Je confirme être autorisé à partager ces informations et j'accepte que l'AIABASD contacte mon organisation au sujet de cette soumission.",
    backLabel: "Retour",
    nextLabel: "Continuer",
    saveLabel: "Enregistrer le brouillon",
    savedLabel: "Brouillon enregistré localement",
    submitLabel: "Soumettre pour revue",
    submittingLabel: "Envoi en cours",
    readinessTitle: "Exhaustivité du profil",
    readinessNote: "Cet indicateur reflète uniquement les champs fournis. Ce n'est pas une notation d'investissement, juridique ou technique.",
    reviewNote: "La soumission crée une demande de première revue humaine. Elle ne publie pas le projet et ne crée ni mandat, ni approbation, ni engagement de financement.",
    successTitle: "Soumission reçue",
    successNote: "Votre note de projet a été envoyée pour revue sous la référence {ref}.",
    error: "La soumission n'a pas pu être envoyée. Enregistrez le brouillon et réessayez plus tard.",
    staticNote: "Cette prévisualisation statique ne prend pas en charge l'envoi des soumissions. Utilisez le déploiement AIABASD en ligne pour soumettre une opportunité.",
    emptyOption: "Sélectionner une option",
    clearDraftLabel: "Effacer le brouillon enregistré",
  },
};
