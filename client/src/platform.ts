import {
  COUNTRIES,
  PROJECTS,
  SECTORS,
  STATUSES,
  type CountryKey,
  type Locale3,
  type SectorKey,
} from "./projects";

export type PlatformLocale = Locale3;
export type Localized = Record<PlatformLocale, string>;
export type LocalizedOption = { value: string; label: Localized };

export type ServicePackage = {
  id: string;
  name: Localized;
  scope: Localized;
  deliverable: Localized;
  bestFor: Localized;
  limitation: Localized;
  basis: Localized;
};

export type IntelligenceReviewState = "framework" | "to-be-validated" | "reviewed";

export type IntelligenceRecord = {
  id: string;
  title: Localized;
  summary: Localized;
  source: Localized;
  sourceUrl?: string;
  publicationDate: Localized;
  geography: Localized;
  sector: Localized;
  confidence: IntelligenceReviewState;
  relatedProjectSlugs: string[];
};

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "origination",
    name: {
      en: "Project origination",
      ar: "نشأة المشاريع",
      fr: "Origination de projets",
    },
    scope: {
      en: "Translate an owner-stated development priority into a scoped project brief, stakeholder map, and next-step workplan.",
      ar: "تحويل أولوية تنموية يحددها المالك إلى موجز مشروع ونطاق وأطراف معنية وخطة خطوات تالية.",
      fr: "Transformer une priorité de développement définie par le porteur en note de projet, cartographie des parties prenantes et plan de prochaines étapes.",
    },
    deliverable: {
      en: "Structured project brief and decision log",
      ar: "موجز مشروع منظم وسجل قرارات",
      fr: "Note de projet structurée et registre des décisions",
    },
    bestFor: {
      en: "Public institutions, sponsors, and local operators at the definition stage.",
      ar: "للمؤسسات العامة والجهات الراعية والمشغلين المحليين في مرحلة التعريف.",
      fr: "Pour les institutions publiques, porteurs et opérateurs locaux au stade de définition.",
    },
    limitation: {
      en: "Does not constitute a feasibility study, approval, mandate, or financing commitment.",
      ar: "لا يمثل دراسة جدوى أو موافقة أو تفويضاً أو التزاماً بالتمويل.",
      fr: "Ne constitue ni une étude de faisabilité, ni une approbation, ni un mandat ou engagement de financement.",
    },
    basis: {
      en: "Based on the owner brief and published project metadata.",
      ar: "استناداً إلى موجز المالك وبيانات المشاريع المنشورة.",
      fr: "Fondé sur la note du porteur et les métadonnées de projets publiées.",
    },
  },
  {
    id: "feasibility",
    name: {
      en: "Feasibility & investor-readiness",
      ar: "الجدوى والاستعداد للمستثمرين",
      fr: "Faisabilité et préparation investisseurs",
    },
    scope: {
      en: "Coordinate a diligence workplan covering technical, commercial, legal, safeguards, and financial questions identified by stakeholders.",
      ar: "تنسيق خطة عناية واجبة تغطي الأسئلة التقنية والتجارية والقانونية والضمانات والمالية التي يحددها أصحاب المصلحة.",
      fr: "Coordonner un plan de diligence couvrant les questions techniques, commerciales, juridiques, de sauvegardes et financières identifiées par les parties prenantes.",
    },
    deliverable: {
      en: "Readiness gap register and diligence brief",
      ar: "سجل فجوات الجاهزية وموجز العناية الواجبة",
      fr: "Registre des écarts de préparation et note de diligence",
    },
    bestFor: {
      en: "Projects with a defined concept that need the evidence gaps made visible.",
      ar: "للمشاريع ذات المفهوم المحدد التي تحتاج إلى إظهار فجوات الأدلة.",
      fr: "Pour les projets dont le concept est défini et dont les lacunes documentaires doivent être clarifiées.",
    },
    limitation: {
      en: "No investment recommendation, return forecast, certification, or lender decision is provided.",
      ar: "لا نقدم توصية استثمارية أو توقعاً للعوائد أو شهادة أو قراراً ائتمانياً.",
      fr: "Aucune recommandation d'investissement, prévision de rendement, certification ou décision de prêteur n'est fournie.",
    },
    basis: {
      en: "Uses stakeholder-supplied evidence and the published governance framework.",
      ar: "يستخدم الأدلة المقدمة من أصحاب المصلحة وإطار الحوكمة المنشور.",
      fr: "S'appuie sur les éléments fournis par les parties prenantes et le cadre de gouvernance publié.",
    },
  },
  {
    id: "mobilization",
    name: {
      en: "Partner mobilization",
      ar: "تعبئة الشركاء",
      fr: "Mobilisation de partenaires",
    },
    scope: {
      en: "Map relevant public, technical, operating, and capital-side parties to an owner-defined project need.",
      ar: "رسم خريطة للأطراف العامة والتقنية والتشغيلية والمالية ذات الصلة باحتياج يحدده مالك المشروع.",
      fr: "Mettre en relation les parties publiques, techniques, opérationnelles et financières avec un besoin défini par le porteur.",
    },
    deliverable: {
      en: "Introductions plan with fit rationale",
      ar: "خطة تعارف مع مبررات الملاءمة",
      fr: "Plan d'introductions avec justification de la pertinence",
    },
    bestFor: {
      en: "Sponsors seeking a transparent first pass across an institutional network.",
      ar: "للجهات الراعية التي تبحث عن تقييم أولي شفاف ضمن شبكة مؤسسية.",
      fr: "Pour les porteurs qui souhaitent un premier examen transparent au sein d'un réseau institutionnel.",
    },
    limitation: {
      en: "Introductions are not endorsements, procurement awards, or binding partnership offers.",
      ar: "التعارف لا يمثل تزكية أو ترسية مشتريات أو عرض شراكة ملزماً.",
      fr: "Les introductions ne sont ni des recommandations, ni des attributions, ni des offres de partenariat contraignantes.",
    },
    basis: {
      en: "Rule-based comparison with published project sectors, countries, and statuses.",
      ar: "مقارنة قائمة على قواعد مع القطاعات والدول والحالات المنشورة للمشاريع.",
      fr: "Comparaison fondée sur des règles avec les secteurs, pays et statuts publiés.",
    },
  },
  {
    id: "governance",
    name: {
      en: "Governance & ESIA readiness",
      ar: "الجاهزية للحوكمة والتقييم البيئي والاجتماعي",
      fr: "Gouvernance et préparation EIES",
    },
    scope: {
      en: "Organize a practical register for safeguards, KYC/AML, approvals, roles, and independent review questions.",
      ar: "تنظيم سجل عملي للضمانات وKYC/AML والموافقات والأدوار وأسئلة المراجعة المستقلة.",
      fr: "Organiser un registre pratique des sauvegardes, KYC/AML, approbations, rôles et questions de revue indépendante.",
    },
    deliverable: {
      en: "Governance readiness register",
      ar: "سجل جاهزية الحوكمة",
      fr: "Registre de préparation à la gouvernance",
    },
    bestFor: {
      en: "Programs moving from concept toward structured stakeholder review.",
      ar: "للبرامج التي تنتقل من المفهوم إلى مراجعة منظمة من أصحاب المصلحة.",
      fr: "Pour les programmes passant du concept à une revue structurée des parties prenantes.",
    },
    limitation: {
      en: "We do not replace licensed advisers, regulators, engineers, auditors, or counsel.",
      ar: "لا نحل محل المستشارين المرخصين أو الجهات التنظيمية أو المهندسين أو المدققين أو المستشار القانوني.",
      fr: "Nous ne remplaçons pas les conseils agréés, régulateurs, ingénieurs, auditeurs ou avocats.",
    },
    basis: {
      en: "Aligned to the public governance pages and project-specific evidence supplied for review.",
      ar: "متوافق مع صفحات الحوكمة العامة والأدلة الخاصة بالمشروع المقدمة للمراجعة.",
      fr: "Aligné sur les pages publiques de gouvernance et les éléments propres au projet fournis pour revue.",
    },
  },
  {
    id: "intelligence",
    name: {
      en: "Market intelligence",
      ar: "استخبارات السوق",
      fr: "Intelligence de marché",
    },
    scope: {
      en: "Prepare a source register and validation questions around a selected corridor, sector, or project theme.",
      ar: "إعداد سجل مصادر وأسئلة تحقق حول ممر أو قطاع أو موضوع مشروع محدد.",
      fr: "Préparer un registre de sources et des questions de validation autour d'un corridor, secteur ou thème choisi.",
    },
    deliverable: {
      en: "Traceable briefing note",
      ar: "مذكرة إحاطة قابلة للتتبع",
      fr: "Note de briefing traçable",
    },
    bestFor: {
      en: "Teams that need a disciplined starting point before commissioning deeper research.",
      ar: "للفرق التي تحتاج إلى نقطة بداية منضبطة قبل تكليف بحث أعمق.",
      fr: "Pour les équipes qui ont besoin d'un point de départ rigoureux avant une recherche approfondie.",
    },
    limitation: {
      en: "Frameworks are not market forecasts and placeholders remain open until validated.",
      ar: "الأطر ليست توقعات سوقية وتبقى العناصر النائبة مفتوحة إلى حين التحقق.",
      fr: "Les cadres ne sont pas des prévisions de marché et les éléments provisoires restent ouverts jusqu'à validation.",
    },
    basis: {
      en: "Curated from the public project and corridor catalog; source dates are shown per brief.",
      ar: "منتقاة من فهرس المشاريع والممرات العام؛ وتظهر تواريخ المصادر لكل إحاطة.",
      fr: "Sélectionnée à partir du catalogue public des projets et corridors ; les dates de source figurent par note.",
    },
  },
];

export const INTELLIGENCE_RECORDS: IntelligenceRecord[] = [
  {
    id: "corridor-briefing-framework",
    title: {
      en: "Corridor partner briefing framework",
      ar: "إطار إحاطة لشركاء الممرات",
      fr: "Cadre de briefing des partenaires de corridor",
    },
    summary: {
      en: "A structured lens for comparing country, sector, delivery-stage, and partner questions across the published catalog.",
      ar: "منظور منظم لمقارنة الدولة والقطاع ومرحلة التنفيذ وأسئلة الشركاء عبر الفهرس المنشور.",
      fr: "Une grille structurée pour comparer pays, secteurs, étapes de mise en œuvre et questions partenaires dans le catalogue publié.",
    },
    source: {
      en: "AIABASD public project and corridor catalog",
      ar: "فهرس AIABASD العام للمشاريع والممرات",
      fr: "Catalogue public des projets et corridors AIABASD",
    },
    sourceUrl: "/projects",
    publicationDate: { en: "2026-09-02", ar: "2026-09-02", fr: "2026-09-02" },
    geography: { en: "Africa & Arab-region corridors", ar: "ممرات إفريقيا والمنطقة العربية", fr: "Corridors africains et arabes" },
    sector: SECTORS.multi,
    confidence: "framework",
    relatedProjectSlugs: ["cci-investment-portfolio", "china-arab-africa-platform", "cross-border-trade-platform"],
  },
  {
    id: "syria-recovery-briefing-framework",
    title: {
      en: "Syria recovery project briefing framework",
      ar: "إطار إحاطة لمشاريع التعافي في سوريا",
      fr: "Cadre de briefing des projets de relèvement en Syrie",
    },
    summary: {
      en: "Maps published Hama and Damascus project records to diligence questions; quantitative scope remains project-specific and subject to validation.",
      ar: "يربط سجلات مشاريع حماة ودمشق المنشورة بأسئلة العناية الواجبة؛ ويبقى النطاق الكمي خاصاً بالمشروع ورهناً بالتحقق.",
      fr: "Relie les fiches publiées de Hama et Damas aux questions de diligence ; le périmètre quantitatif reste propre à chaque projet et à valider.",
    },
    source: {
      en: "AIABASD published project records",
      ar: "سجلات مشاريع AIABASD المنشورة",
      fr: "Fiches de projets AIABASD publiées",
    },
    sourceUrl: "/projects",
    publicationDate: { en: "2026-09-02", ar: "2026-09-02", fr: "2026-09-02" },
    geography: COUNTRIES.sy,
    sector: SECTORS.multi,
    confidence: "to-be-validated",
    relatedProjectSlugs: ["hama-debris-recycling", "dummar-housing", "schools-health-rehabilitation", "hama-agriculture-water"],
  },
  {
    id: "energy-technology-briefing-framework",
    title: {
      en: "Energy and technology partner brief",
      ar: "موجز شركاء الطاقة والتقنية",
      fr: "Brief partenaires énergie et technologie",
    },
    summary: {
      en: "A source-linked starting point for technology, metering, renewable-energy, and industrial cooperation conversations.",
      ar: "نقطة بداية مرتبطة بالمصادر لمحادثات التقنية والقياس والطاقة المتجددة والتعاون الصناعي.",
      fr: "Un point de départ sourcé pour les échanges sur la technologie, le comptage, les énergies renouvelables et la coopération industrielle.",
    },
    source: {
      en: "AIABASD project catalog and governance pages",
      ar: "فهرس مشاريع AIABASD وصفحات الحوكمة",
      fr: "Catalogue de projets et pages de gouvernance AIABASD",
    },
    sourceUrl: "/governance/esia-esms",
    publicationDate: { en: "2026-09-02", ar: "2026-09-02", fr: "2026-09-02" },
    geography: { en: "Syria & international cooperation tracks", ar: "سوريا ومسارات التعاون الدولي", fr: "Syrie et axes de coopération internationale" },
    sector: SECTORS.energy,
    confidence: "to-be-validated",
    relatedProjectSlugs: ["hama-solar-200mw", "smart-meters-syria", "advanced-technology-cooperation"],
  },
  {
    id: "industrial-localization-framework",
    title: {
      en: "Industrial localization briefing framework",
      ar: "إطار إحاطة للتوطين الصناعي",
      fr: "Cadre de briefing pour la localisation industrielle",
    },
    summary: {
      en: "A validation checklist for manufacturing, technology transfer, supply-chain, and market-access discussions in the published portfolio.",
      ar: "قائمة تحقق للتصنيع ونقل التقنية وسلاسل التوريد والوصول إلى الأسواق في المحفظة المنشورة.",
      fr: "Une liste de validation pour la fabrication, le transfert technologique, les chaînes d'approvisionnement et l'accès aux marchés du portefeuille publié.",
    },
    source: {
      en: "AIABASD public project records",
      ar: "سجلات مشاريع AIABASD العامة",
      fr: "Fiches publiques des projets AIABASD",
    },
    sourceUrl: "/projects",
    publicationDate: { en: "2026-09-02", ar: "2026-09-02", fr: "2026-09-02" },
    geography: { en: "Côte d'Ivoire, Ghana & international tracks", ar: "كوت ديفوار وغانا والمسارات الدولية", fr: "Côte d'Ivoire, Ghana et axes internationaux" },
    sector: SECTORS.industry,
    confidence: "framework",
    relatedProjectSlugs: ["cci-investment-portfolio", "ghana-cooperation-program", "china-saudi-africa-gateway"],
  },
];

export const PARTY_TYPE_KEYS = ["government", "investor", "operator", "epc", "ngo", "technology"] as const;
export type PartyTypeKey = (typeof PARTY_TYPE_KEYS)[number];

export const CAPABILITY_KEYS = ["capital", "engineering", "operations", "technology", "safeguards", "trade"] as const;
export type CapabilityKey = (typeof CAPABILITY_KEYS)[number];

export const PLATFORM_OPTION_KEYS = {
  sectors: Object.keys(SECTORS) as SectorKey[],
  countries: Object.keys(COUNTRIES) as CountryKey[],
} as const;

export const catalogProjectOptions = PROJECTS.filter((project) => project.type !== "initiative");

export const localizedCatalogProject = (slug: string, locale: PlatformLocale): string => {
  const project = PROJECTS.find((item) => item.slug === slug);
  return project ? project.title[locale] : slug;
};

export const localizedCatalogStatus = (status: keyof typeof STATUSES, locale: PlatformLocale): string => STATUSES[status][locale];

export type PlatformCopy = {
  services: {
    title: string;
    intro: string;
    eyebrow: string;
    statusLabel: string;
    status: string;
    packagesLabel: string;
    scopeLabel: string;
    deliverableLabel: string;
    bestForLabel: string;
    limitationLabel: string;
    basisLabel: string;
    inquiryCta: string;
    portfolioCta: string;
    footerNote: string;
  };
  intelligence: {
    title: string;
    intro: string;
    eyebrow: string;
    catalogNote: string;
    recordsLabel: string;
    sourceLabel: string;
    dateLabel: string;
    geographyLabel: string;
    sectorLabel: string;
    confidenceLabel: string;
    relatedLabel: string;
    openSourceLabel: string;
    frameworkLabel: string;
    validationLabel: string;
    reviewedLabel: string;
    validationNote: string;
  };
  match: {
    title: string;
    intro: string;
    eyebrow: string;
    formTitle: string;
    organizationLabel: string;
    organizationPlaceholder: string;
    partyTypeLabel: string;
    sectorsLabel: string;
    countriesLabel: string;
    capabilitiesLabel: string;
    timelineLabel: string;
    timelinePlaceholder: string;
    capitalBandLabel: string;
    targetProjectLabel: string;
    targetServiceLabel: string;
    noSpecificTarget: string;
    emailLabel: string;
    emailPlaceholder: string;
    consentLabel: string;
    consentText: string;
    submitLabel: string;
    submittingLabel: string;
    previewTitle: string;
    previewNote: string;
    previewPrompt: string;
    scoreLabel: string;
    reasonTarget: string;
    reasonSector: string;
    reasonCountry: string;
    noMatch: string;
    successTitle: string;
    successNote: string;
    anotherLabel: string;
    error: string;
    limitation: string;
    options: {
      partyTypes: Record<PartyTypeKey, string>;
      capabilities: Record<CapabilityKey, string>;
      timelines: LocalizedOption[];
      capitalBands: LocalizedOption[];
    };
  };
};

export const PLATFORM_COPY: Record<PlatformLocale, PlatformCopy> = {
  en: {
    services: {
      title: "Commercial services with a defined scope",
      intro: "Practical support for structuring opportunities, testing readiness, and convening the right institutions without overstating what is known.",
      eyebrow: "COMMERCIAL_SERVICES",
      statusLabel: "Operating status",
      status: "Available for scoped institutional inquiries; delivery depends on mandate, evidence, and counterpart availability.",
      packagesLabel: "Service packages",
      scopeLabel: "Scope",
      deliverableLabel: "Typical output",
      bestForLabel: "Designed for",
      limitationLabel: "Boundary",
      basisLabel: "Basis",
      inquiryCta: "Start a structured inquiry",
      portfolioCta: "Review project catalog",
      footerNote: "Commercial terms, timelines, and any appointment are agreed case by case after an initial review. A page view is not a mandate.",
    },
    intelligence: {
      title: "Market intelligence, with the source trail visible",
      intro: "Curated briefs organize what is published, what is not yet known, and what must be validated before a decision is made.",
      eyebrow: "INTELLIGENCE_REGISTER",
      catalogNote: "This is a briefing catalog, not a market-data terminal. No statistics, forecasts, or investment conclusions are added without a cited source and review state.",
      recordsLabel: "Published briefs",
      sourceLabel: "Source",
      dateLabel: "Publication date",
      geographyLabel: "Geography",
      sectorLabel: "Sector",
      confidenceLabel: "Review state",
      relatedLabel: "Related catalog records",
      openSourceLabel: "Open source record",
      frameworkLabel: "Briefing framework",
      validationLabel: "To be validated",
      reviewedLabel: "Reviewed",
      validationNote: "Framework content is directional only. Validate commercial, legal, technical, safeguards, and financial assumptions with qualified advisers and counterparties.",
    },
    match: {
      title: "Find a transparent starting point",
      intro: "Share your institutional profile and we will compare it with published project metadata. The preview explains its rules and is not an investment or suitability decision.",
      eyebrow: "PARTNER_INTAKE",
      formTitle: "Structured partner intake",
      organizationLabel: "Organization",
      organizationPlaceholder: "Institution, company, or public body",
      partyTypeLabel: "Party type",
      sectorsLabel: "Relevant sectors",
      countriesLabel: "Countries or corridors",
      capabilitiesLabel: "Capabilities",
      timelineLabel: "Engagement timeline",
      timelinePlaceholder: "For example: initial conversation this quarter",
      capitalBandLabel: "Capital band (self-described)",
      targetProjectLabel: "Target project",
      targetServiceLabel: "Target service",
      noSpecificTarget: "No specific target / open to a review",
      emailLabel: "Institutional email",
      emailPlaceholder: "name@institution.org",
      consentLabel: "Inquiry consent",
      consentText: "I consent to AIABASD using these details to review and respond to this inquiry. They will not be used as an analytics identifier.",
      submitLabel: "Submit partner inquiry",
      submittingLabel: "Submitting…",
      previewTitle: "Explainable match preview",
      previewNote: "Only country, sector, status, type, and selected target metadata from the published catalog are used.",
      previewPrompt: "Choose at least one sector or country to see a catalog comparison.",
      scoreLabel: "Rule score",
      reasonTarget: "Selected target project",
      reasonSector: "Sector metadata overlaps",
      reasonCountry: "Country metadata overlaps",
      noMatch: "No direct overlap was found in the published catalog. You may still submit an open inquiry.",
      successTitle: "Partner inquiry received",
      successNote: "Reference {ref}. The preview was informational only; a team member will review the structured intake and respond if a conversation is appropriate.",
      anotherLabel: "Submit another inquiry",
      error: "The inquiry could not be submitted. Please check the fields and try again.",
      limitation: "This tool does not rank investments, assess suitability, promise access, or replace diligence. A match is a conversation starting point only.",
      options: {
        partyTypes: {
          government: "Government / public institution",
          investor: "Investor / capital provider",
          operator: "Operator / service provider",
          epc: "EPC / engineering group",
          ngo: "NGO / civil-society organization",
          technology: "Technology provider",
        },
        capabilities: {
          capital: "Capital or financing conversations",
          engineering: "Engineering or construction",
          operations: "Operations or asset management",
          technology: "Technology transfer or systems",
          safeguards: "Safeguards, governance, or compliance",
          trade: "Trade, procurement, or market access",
        },
        timelines: [
          { value: "exploratory", label: { en: "Exploratory", ar: "استكشافي", fr: "Exploratoire" } },
          { value: "within-3-months", label: { en: "Within 3 months", ar: "خلال 3 أشهر", fr: "Sous 3 mois" } },
          { value: "3-to-12-months", label: { en: "3–12 months", ar: "3–12 شهراً", fr: "3–12 mois" } },
          { value: "over-12-months", label: { en: "More than 12 months", ar: "أكثر من 12 شهراً", fr: "Plus de 12 mois" } },
        ],
        capitalBands: [
          { value: "undisclosed", label: { en: "Not disclosed", ar: "غير مفصح عنه", fr: "Non communiqué" } },
          { value: "under-5m-usd", label: { en: "Below USD 5m", ar: "أقل من 5 ملايين دولار", fr: "Moins de 5 M USD" } },
          { value: "5m-to-25m-usd", label: { en: "USD 5m–25m", ar: "5–25 مليون دولار", fr: "5–25 M USD" } },
          { value: "over-25m-usd", label: { en: "Above USD 25m", ar: "أكثر من 25 مليون دولار", fr: "Plus de 25 M USD" } },
          { value: "not-applicable", label: { en: "Not applicable", ar: "لا ينطبق", fr: "Sans objet" } },
        ],
      },
    },
  },
  ar: {
    services: {
      title: "خدمات تجارية محددة النطاق",
      intro: "دعم عملي لهيكلة الفرص واختبار الجاهزية وجمع المؤسسات المناسبة دون المبالغة فيما هو معلوم.",
      eyebrow: "الخدمات_التجارية",
      statusLabel: "الحالة التشغيلية",
      status: "متاحة للاستفسارات المؤسسية المحددة؛ ويتوقف التنفيذ على التفويض والأدلة وتوفر الأطراف المقابلة.",
      packagesLabel: "حزم الخدمات",
      scopeLabel: "النطاق",
      deliverableLabel: "المخرج المعتاد",
      bestForLabel: "مخصصة لـ",
      limitationLabel: "الحدود",
      basisLabel: "الأساس",
      inquiryCta: "بدء استفسار منظم",
      portfolioCta: "مراجعة فهرس المشاريع",
      footerNote: "يتم الاتفاق على الشروط التجارية والجداول الزمنية وأي تعيين كل حالة على حدة بعد المراجعة الأولية. عرض الصفحة لا يمثل تفويضاً.",
    },
    intelligence: {
      title: "استخبارات سوقية مع إظهار مسار المصدر",
      intro: "تنظم الإحاطات المنتقاة ما هو منشور وما لم يُعرف بعد وما يجب التحقق منه قبل اتخاذ القرار.",
      eyebrow: "سجل_الاستخبارات",
      catalogNote: "هذا فهرس إحاطات وليس محطة بيانات سوقية. لا تضاف إحصاءات أو توقعات أو استنتاجات استثمارية دون مصدر موثق وحالة مراجعة.",
      recordsLabel: "الإحاطات المنشورة",
      sourceLabel: "المصدر",
      dateLabel: "تاريخ النشر",
      geographyLabel: "الجغرافيا",
      sectorLabel: "القطاع",
      confidenceLabel: "حالة المراجعة",
      relatedLabel: "سجلات الفهرس المرتبطة",
      openSourceLabel: "فتح سجل المصدر",
      frameworkLabel: "إطار إحاطة",
      validationLabel: "بحاجة إلى التحقق",
      reviewedLabel: "تمت المراجعة",
      validationNote: "محتوى الإطار استرشادي فقط. يجب التحقق من الافتراضات التجارية والقانونية والتقنية والضمانات والمالية مع مستشارين مؤهلين وأطراف مقابلة.",
    },
    match: {
      title: "اعثر على نقطة بداية شفافة",
      intro: "شارك ملف مؤسستك وسنقارنه ببيانات المشاريع المنشورة. يشرح العرض قواعده ولا يمثل قراراً استثمارياً أو قرار ملاءمة.",
      eyebrow: "استقبال_الشركاء",
      formTitle: "استقبال منظم للشركاء",
      organizationLabel: "المؤسسة",
      organizationPlaceholder: "مؤسسة أو شركة أو جهة عامة",
      partyTypeLabel: "نوع الطرف",
      sectorsLabel: "القطاعات ذات الصلة",
      countriesLabel: "الدول أو الممرات",
      capabilitiesLabel: "القدرات",
      timelineLabel: "الجدول الزمني للمشاركة",
      timelinePlaceholder: "مثال: محادثة أولية هذا الربع",
      capitalBandLabel: "شريحة رأس المال (حسب وصفكم)",
      targetProjectLabel: "المشروع المستهدف",
      targetServiceLabel: "الخدمة المستهدفة",
      noSpecificTarget: "لا يوجد هدف محدد / منفتحون للمراجعة",
      emailLabel: "البريد المؤسسي",
      emailPlaceholder: "name@institution.org",
      consentLabel: "الموافقة على الاستفسار",
      consentText: "أوافق على استخدام AIABASD لهذه البيانات لمراجعة الاستفسار والرد عليه. ولن تستخدم كمعرّف تحليلي.",
      submitLabel: "إرسال استفسار الشراكة",
      submittingLabel: "جارٍ الإرسال…",
      previewTitle: "عرض مطابقة قابل للتفسير",
      previewNote: "تُستخدم فقط بيانات الدولة والقطاع والحالة والنوع والهدف المحدد من الفهرس المنشور.",
      previewPrompt: "اختر قطاعاً أو دولة واحدة على الأقل لرؤية مقارنة الفهرس.",
      scoreLabel: "نقاط القاعدة",
      reasonTarget: "المشروع المستهدف المحدد",
      reasonSector: "تداخل في بيانات القطاع",
      reasonCountry: "تداخل في بيانات الدولة",
      noMatch: "لم يظهر تداخل مباشر في الفهرس المنشور. يمكنكم رغم ذلك إرسال استفسار مفتوح.",
      successTitle: "تم استلام استفسار الشراكة",
      successNote: "المرجع {ref}. كان العرض إرشادياً فقط؛ سيراجع الفريق البيانات المنظمة ويرد إذا كانت المحادثة مناسبة.",
      anotherLabel: "إرسال استفسار آخر",
      error: "تعذر إرسال الاستفسار. يرجى مراجعة الحقول والمحاولة مجدداً.",
      limitation: "لا تقوم هذه الأداة بترتيب الاستثمارات أو تقييم الملاءمة أو الوعد بالوصول، ولا تحل محل العناية الواجبة. المطابقة نقطة بداية للمحادثة فقط.",
      options: {
        partyTypes: { government: "حكومة / مؤسسة عامة", investor: "مستثمر / موفر رأس مال", operator: "مشغل / مقدم خدمة", epc: "مجموعة EPC / هندسية", ngo: "منظمة غير حكومية / مجتمع مدني", technology: "مزود تقنية" },
        capabilities: { capital: "رأس المال أو محادثات التمويل", engineering: "الهندسة أو الإنشاء", operations: "التشغيل أو إدارة الأصول", technology: "نقل التقنية أو الأنظمة", safeguards: "الضمانات أو الحوكمة أو الامتثال", trade: "التجارة أو المشتريات أو الوصول إلى الأسواق" },
        timelines: [
          { value: "exploratory", label: { en: "Exploratory", ar: "استكشافي", fr: "Exploratoire" } },
          { value: "within-3-months", label: { en: "Within 3 months", ar: "خلال 3 أشهر", fr: "Sous 3 mois" } },
          { value: "3-to-12-months", label: { en: "3–12 months", ar: "3–12 شهراً", fr: "3–12 mois" } },
          { value: "over-12-months", label: { en: "More than 12 months", ar: "أكثر من 12 شهراً", fr: "Plus de 12 mois" } },
        ],
        capitalBands: [
          { value: "undisclosed", label: { en: "Not disclosed", ar: "غير مفصح عنه", fr: "Non communiqué" } },
          { value: "under-5m-usd", label: { en: "Below USD 5m", ar: "أقل من 5 ملايين دولار", fr: "Moins de 5 M USD" } },
          { value: "5m-to-25m-usd", label: { en: "USD 5m–25m", ar: "5–25 مليون دولار", fr: "5–25 M USD" } },
          { value: "over-25m-usd", label: { en: "Above USD 25m", ar: "أكثر من 25 مليون دولار", fr: "Plus de 25 M USD" } },
          { value: "not-applicable", label: { en: "Not applicable", ar: "لا ينطبق", fr: "Sans objet" } },
        ],
      },
    },
  },
  fr: {
    services: {
      title: "Services commerciaux au périmètre défini",
      intro: "Un appui pratique pour structurer les opportunités, tester la préparation et réunir les bonnes institutions sans surévaluer les faits.",
      eyebrow: "SERVICES_COMMERCIAUX",
      statusLabel: "Statut opérationnel",
      status: "Disponible pour des demandes institutionnelles cadrées ; l'exécution dépend du mandat, des éléments disponibles et des contreparties.",
      packagesLabel: "Packs de services",
      scopeLabel: "Périmètre",
      deliverableLabel: "Livrable type",
      bestForLabel: "Pour",
      limitationLabel: "Limite",
      basisLabel: "Fondement",
      inquiryCta: "Démarrer une demande structurée",
      portfolioCta: "Consulter le catalogue de projets",
      footerNote: "Les conditions commerciales, délais et éventuel mandat sont convenus au cas par cas après une première revue. Une page ne constitue pas un mandat.",
    },
    intelligence: {
      title: "Intelligence de marché, sources visibles",
      intro: "Des briefs organisent ce qui est publié, ce qui reste inconnu et ce qui doit être validé avant toute décision.",
      eyebrow: "REGISTRE_INTELLIGENCE",
      catalogNote: "Il s'agit d'un catalogue de briefing, pas d'un terminal de données de marché. Aucun chiffre, prévision ou avis d'investissement n'est ajouté sans source citée et état de revue.",
      recordsLabel: "Briefs publiés",
      sourceLabel: "Source",
      dateLabel: "Date de publication",
      geographyLabel: "Géographie",
      sectorLabel: "Secteur",
      confidenceLabel: "État de revue",
      relatedLabel: "Fiches liées du catalogue",
      openSourceLabel: "Ouvrir la source",
      frameworkLabel: "Cadre de briefing",
      validationLabel: "À valider",
      reviewedLabel: "Revu",
      validationNote: "Le contenu du cadre est indicatif. Validez les hypothèses commerciales, juridiques, techniques, de sauvegardes et financières avec des conseillers qualifiés et les contreparties.",
    },
    match: {
      title: "Trouver un premier point de contact transparent",
      intro: "Partagez votre profil institutionnel et nous le comparerons aux métadonnées publiées des projets. L'aperçu explique ses règles et ne constitue ni une décision d'investissement ni d'adéquation.",
      eyebrow: "INTAKE_PARTENAIRES",
      formTitle: "Intake partenaire structuré",
      organizationLabel: "Organisation",
      organizationPlaceholder: "Institution, entreprise ou organisme public",
      partyTypeLabel: "Type de partie",
      sectorsLabel: "Secteurs pertinents",
      countriesLabel: "Pays ou corridors",
      capabilitiesLabel: "Capacités",
      timelineLabel: "Calendrier d'engagement",
      timelinePlaceholder: "Exemple : première conversation ce trimestre",
      capitalBandLabel: "Fourchette de capital (déclarée)",
      targetProjectLabel: "Projet cible",
      targetServiceLabel: "Service cible",
      noSpecificTarget: "Pas de cible précise / ouvert à une revue",
      emailLabel: "Email institutionnel",
      emailPlaceholder: "nom@institution.org",
      consentLabel: "Consentement à la demande",
      consentText: "J'autorise AIABASD à utiliser ces informations pour examiner et traiter cette demande. Elles ne serviront pas d'identifiant analytique.",
      submitLabel: "Envoyer la demande partenaire",
      submittingLabel: "Envoi…",
      previewTitle: "Aperçu de correspondance explicable",
      previewNote: "Seules les métadonnées publiées de pays, secteur, statut, type et cible sont utilisées.",
      previewPrompt: "Choisissez au moins un secteur ou un pays pour voir une comparaison du catalogue.",
      scoreLabel: "Score de règle",
      reasonTarget: "Projet cible sélectionné",
      reasonSector: "Chevauchement de secteur",
      reasonCountry: "Chevauchement de pays",
      noMatch: "Aucun chevauchement direct dans le catalogue publié. Vous pouvez néanmoins envoyer une demande ouverte.",
      successTitle: "Demande partenaire reçue",
      successNote: "Référence {ref}. L'aperçu était indicatif ; l'équipe examinera l'intake structuré et répondra si une conversation est pertinente.",
      anotherLabel: "Envoyer une autre demande",
      error: "La demande n'a pas pu être envoyée. Vérifiez les champs et réessayez.",
      limitation: "Cet outil ne classe pas les investissements, n'évalue pas l'adéquation, ne promet pas d'accès et ne remplace pas la diligence. Une correspondance est seulement un point de départ.",
      options: {
        partyTypes: { government: "Gouvernement / institution publique", investor: "Investisseur / apporteur de capital", operator: "Opérateur / prestataire", epc: "Groupe EPC / ingénierie", ngo: "ONG / société civile", technology: "Fournisseur de technologie" },
        capabilities: { capital: "Capital ou discussions de financement", engineering: "Ingénierie ou construction", operations: "Opérations ou gestion d'actifs", technology: "Transfert de technologie ou systèmes", safeguards: "Sauvegardes, gouvernance ou conformité", trade: "Commerce, achats ou accès au marché" },
        timelines: [
          { value: "exploratory", label: { en: "Exploratory", ar: "استكشافي", fr: "Exploratoire" } },
          { value: "within-3-months", label: { en: "Within 3 months", ar: "خلال 3 أشهر", fr: "Sous 3 mois" } },
          { value: "3-to-12-months", label: { en: "3–12 months", ar: "3–12 شهراً", fr: "3–12 mois" } },
          { value: "over-12-months", label: { en: "More than 12 months", ar: "أكثر من 12 شهراً", fr: "Plus de 12 mois" } },
        ],
        capitalBands: [
          { value: "undisclosed", label: { en: "Not disclosed", ar: "غير مفصح عنه", fr: "Non communiqué" } },
          { value: "under-5m-usd", label: { en: "Below USD 5m", ar: "أقل من 5 ملايين دولار", fr: "Moins de 5 M USD" } },
          { value: "5m-to-25m-usd", label: { en: "USD 5m–25m", ar: "5–25 مليون دولار", fr: "5–25 M USD" } },
          { value: "over-25m-usd", label: { en: "Above USD 25m", ar: "أكثر من 25 مليون دولار", fr: "Plus de 25 M USD" } },
          { value: "not-applicable", label: { en: "Not applicable", ar: "لا ينطبق", fr: "Sans objet" } },
        ],
      },
    },
  },
};
