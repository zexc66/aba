/** ─────────────────────────────────────────────────────────────────────────────
 *  Projects & Opportunities — structured catalog (single source of truth).
 *
 *  Content rules (binding, mirrors PRODUCT.md honesty policy):
 *  - Statuses are restrained and factual; nothing here implies contracting,
 *    financing closure, approvals, or construction start unless stated.
 *  - Use "develops / facilitates / coordinates / supports" for AIABASD's role.
 *  - No invented values, dates, investors, approvals, or expected returns.
 *
 *  To add a project: append an entry to PROJECTS with all three locales and
 *  the correct status/type keys — pages, filters, detail template, prerender
 *  and sitemap pick it up automatically (add the slug to scripts/prerender.mjs
 *  ROUTES and scripts/generate-sitemap.mjs ROUTES for static output).
 *  ───────────────────────────────────────────────────────────────────────────── */

export type Locale3 = "en" | "ar" | "fr";
type L = Record<Locale3, string>;

export type ProjectStatus =
  | "under-development"
  | "technical-assessment"
  | "seeking-partners"
  | "seeking-financing"
  | "investment-opportunity"
  | "procurement-opportunity"
  | "cooperation-framework"
  | "strategic-vision";

export type ProjectType = "project" | "opportunity" | "partnership" | "initiative";

export type SectorKey =
  | "housing"
  | "energy"
  | "infrastructure"
  | "circular"
  | "industry"
  | "agriculture"
  | "social"
  | "multi";

export type CountryKey = "sd" | "sy" | "ci" | "gh" | "ao" | "intl";

export interface Project {
  slug: string;
  type: ProjectType;
  status: ProjectStatus;
  sector: SectorKey;
  country: CountryKey;
  featured?: boolean;
  /** Date the owner last reviewed this project's published copy (ISO). */
  lastReviewed?: string;
  title: L;
  location?: L;
  scale?: L;
  model?: L;
  description: L;
  objectives: L[];
  partnership: L[];
}

/** Fallback review date for entries without an individual one. Updated when
 *  the owner re-certifies the published content. */
export const DEFAULT_LAST_REVIEWED = "2026-08-29";

export const projectLastReviewed = (p: Project): string =>
  p.lastReviewed ?? DEFAULT_LAST_REVIEWED;

/* ── Localized vocabularies ─────────────────────────────────────────────── */

export const SECTORS: Record<SectorKey, L> = {
  housing: { en: "Housing & Urban Development", ar: "الإسكان والتنمية الحضرية", fr: "Logement & Développement urbain" },
  energy: { en: "Renewable Energy", ar: "الطاقة المتجددة", fr: "Énergies renouvelables" },
  infrastructure: { en: "Infrastructure", ar: "البنية التحتية", fr: "Infrastructure" },
  circular: { en: "Circular Economy", ar: "الاقتصاد الدائري", fr: "Économie circulaire" },
  industry: { en: "Industry & Manufacturing", ar: "الصناعة والتصنيع", fr: "Industrie & Fabrication" },
  agriculture: { en: "Agriculture & Water", ar: "الزراعة والمياه", fr: "Agriculture & Eau" },
  social: { en: "Healthcare & Education", ar: "الصحة والتعليم", fr: "Santé & Éducation" },
  multi: { en: "Multi-Sector", ar: "متعدد القطاعات", fr: "Multisectoriel" },
};

export const COUNTRIES: Record<CountryKey, L> = {
  sd: { en: "Sudan", ar: "السودان", fr: "Soudan" },
  sy: { en: "Syria", ar: "سوريا", fr: "Syrie" },
  ci: { en: "Côte d'Ivoire", ar: "كوت ديفوار", fr: "Côte d'Ivoire" },
  gh: { en: "Ghana", ar: "غانا", fr: "Ghana" },
  ao: { en: "Angola", ar: "أنغولا", fr: "Angola" },
  intl: { en: "International", ar: "دولي", fr: "International" },
};

export const STATUSES: Record<ProjectStatus, L> = {
  "under-development": { en: "Under Development", ar: "قيد التطوير", fr: "En développement" },
  "technical-assessment": { en: "Technical Assessment", ar: "تقييم تقني", fr: "Évaluation technique" },
  "seeking-partners": { en: "Seeking Strategic Partners", ar: "بحث عن شركاء استراتيجيين", fr: "Recherche de partenaires stratégiques" },
  "seeking-financing": { en: "Seeking Financing", ar: "بحث عن تمويل", fr: "Recherche de financement" },
  "investment-opportunity": { en: "Investment Opportunity", ar: "فرصة استثمارية", fr: "Opportunité d'investissement" },
  "procurement-opportunity": { en: "Procurement Opportunity", ar: "فرصة توريد", fr: "Opportunité d'approvisionnement" },
  "cooperation-framework": { en: "Cooperation Framework", ar: "إطار تعاون", fr: "Cadre de coopération" },
  "strategic-vision": { en: "Strategic Vision", ar: "رؤية استراتيجية", fr: "Vision stratégique" },
};

export const TYPES: Record<ProjectType, L> = {
  project: { en: "Project", ar: "مشروع", fr: "Projet" },
  opportunity: { en: "Opportunity", ar: "فرصة", fr: "Opportunité" },
  partnership: { en: "Partnership", ar: "شراكة", fr: "Partenariat" },
  initiative: { en: "Initiative", ar: "مبادرة", fr: "Initiative" },
};

/* ── Page chrome (projects pages, trilingual) ───────────────────────────── */

export const PROJECTS_UI: Record<Locale3, {
  pageTitle: string;
  headerTitle: string;
  headerNote: string;
  featuredTitle: string;
  featuredNote: string;
  viewAll: string;
  explore: string;
  discuss: string;
  backLabel: string;
  filterCountry: string;
  filterSector: string;
  filterType: string;
  filterStatus: string;
  filterAll: string;
  initiativesTitle: string;
  initiativesNote: string;
  techTitle: string;
  techNote: string;
  techAreas: string[];
  disclaimerLabel: string;
  disclaimer: string;
  detailTitle: string;
  detailNote: string;
  countryLabel: string;
  locationLabel: string;
  sectorLabel: string;
  statusLabel: string;
  typeLabel: string;
  scaleLabel: string;
  modelLabel: string;
  objectivesLabel: string;
  partnershipLabel: string;
  emptyLabel: string;
    relatedLabel: string;
    homeCrumb: string;
    downloadBrief: string;
    lastReviewedLabel: string;
}> = {
  en: {
    pageTitle: "Strategic Projects & Investment Opportunities | AIABASD",
    headerTitle: "Strategic Projects & Investment Opportunities",
    headerNote:
      "AIABASD develops and facilitates a diversified portfolio of strategic projects in cooperation with governments, local institutions, investors, technology providers, and international partners. Our focus is on transforming development priorities into structured, investable, and implementation-ready opportunities.",
    featuredTitle: "Featured Projects",
    featuredNote: "Flagship opportunities across the Alliance's active cooperation portfolio.",
    viewAll: "View All Projects",
    explore: "Explore Project",
    downloadBrief: "Download Brief (PDF)",
    lastReviewedLabel: "Content last reviewed",
    discuss: "Discuss This Opportunity",
    backLabel: "All Projects",
    filterCountry: "Country / Region",
    filterSector: "Sector",
    filterType: "Project Type",
    filterStatus: "Status",
    filterAll: "All",
    initiativesTitle: "International Platforms & Strategic Initiatives",
    initiativesNote: "Cooperation frameworks and platforms that connect development priorities with international capabilities.",
    techTitle: "Advanced Technology Cooperation",
    techNote: "Targeted cooperation areas — not active contracted projects:",
    techAreas: [
      "Artificial intelligence and robotics",
      "Computing infrastructure",
      "New-energy vehicles",
      "Medical and wearable technologies",
      "Renewable energy and green hydrogen",
      "Mining and mineral-processing technologies",
      "Recycling and waste-to-energy",
      "Industrial technology transfer",
    ],
    disclaimerLabel: "Important Notice",
    disclaimer:
      "The information presented on this page is provided for general introduction and partnership exploration. Project scopes, capacities, implementation models, timelines, financing arrangements, and stakeholder participation may be updated following technical studies, institutional approvals, and final agreements.",
    detailTitle: "Project Profile",
    detailNote: "Published for partnership exploration.",
    countryLabel: "Country",
    locationLabel: "Location",
    sectorLabel: "Sector",
    statusLabel: "Status",
    typeLabel: "Type",
    scaleLabel: "Indicative Scale",
    modelLabel: "Proposed Model",
    objectivesLabel: "Strategic Objectives",
    partnershipLabel: "Partnership Opportunities",
    emptyLabel: "No projects match the selected filters.",
    relatedLabel: "Related Projects",
    homeCrumb: "Home",
  },
  ar: {
    pageTitle: "المشاريع الاستراتيجية والفرص الاستثمارية | AIABASD",
    headerTitle: "المشاريع الاستراتيجية والفرص الاستثمارية",
    headerNote:
      "يطوّر التحالف الدولي الأفريقي للأعمال والتنمية المستدامة ويسهّل محفظة متنوعة من المشاريع الاستراتيجية بالتعاون مع الحكومات والمؤسسات المحلية والمستثمرين ومزوّدي التقنية والشركاء الدوليين. وتركيزنا على تحويل أولويات التنمية إلى فرص مهيكلة وقابلة للاستثمار وجاهزة للتنفيذ.",
    featuredTitle: "مشاريع مختارة",
    featuredNote: "فرص رائدة من محفظة التعاون النشطة للتحالف.",
    viewAll: "عرض جميع المشاريع",
    explore: "استكشاف المشروع",
    downloadBrief: "تحميل الملف التعريفي (PDF)",
    lastReviewedLabel: "آخر مراجعة للمحتوى",
    discuss: "ناقش هذه الفرصة",
    backLabel: "جميع المشاريع",
    filterCountry: "الدولة / الإقليم",
    filterSector: "القطاع",
    filterType: "نوع المشروع",
    filterStatus: "الحالة",
    filterAll: "الكل",
    initiativesTitle: "المنصات الدولية والمبادرات الاستراتيجية",
    initiativesNote: "أطر ومنصات تعاون تربط أولويات التنمية بالقدرات الدولية.",
    techTitle: "التعاون في التقنيات المتقدمة",
    techNote: "مجالات تعاون مستهدفة — وليست مشاريع متعاقد عليها:",
    techAreas: [
      "الذكاء الاصطناعي والروبوتات",
      "بنية الحوسبة التحتية",
      "المركبات ذات الطاقة الجديدة",
      "التقنيات الطبية والقابلة للارتداء",
      "الطاقة المتجددة والهيدروجين الأخضر",
      "تقنيات التعدين ومعالجة المعادن",
      "إعادة التدوير وتحويل النفايات إلى طاقة",
      "نقل التقنيات الصناعية",
    ],
    disclaimerLabel: "ملاحظة مهمة",
    disclaimer:
      "المعلومات المقدمة في هذه الصفحة هي لأغراض التعريف العام واستكشاف الشراكات. قد يتم تحديث نطاقات المشاريع والقدرات ونماذج التنفيذ والجداول الزمنية وترتيبات التمويل ومشاركة الأطراف بعد الدراسات التقنية والموافقات المؤسسية والاتفاقيات النهائية.",
    detailTitle: "ملف المشروع",
    detailNote: "منشور لأغراض استكشاف الشراكة.",
    countryLabel: "الدولة",
    locationLabel: "الموقع",
    sectorLabel: "القطاع",
    statusLabel: "الحالة",
    typeLabel: "النوع",
    scaleLabel: "النطاق التقديري",
    modelLabel: "النموذج المقترح",
    objectivesLabel: "الأهداف الاستراتيجية",
    partnershipLabel: "الفرص الشراكية",
    emptyLabel: "لا توجد مشاريع مطابقة للتصفية المحددة.",
    relatedLabel: "مشاريع ذات صلة",
    homeCrumb: "الرئيسية",
  },
  fr: {
    pageTitle: "Projets stratégiques & Opportunités d'investissement | AIABASD",
    headerTitle: "Projets stratégiques & Opportunités d'investissement",
    headerNote:
      "L'AIABASD développe et facilite un portefeuille diversifié de projets stratégiques en coopération avec les gouvernements, les institutions locales, les investisseurs, les fournisseurs de technologies et les partenaires internationaux. Notre objectif : transformer les priorités de développement en opportunités structurées, investissables et prêtes à la mise en œuvre.",
    featuredTitle: "Projets en vedette",
    featuredNote: "Opportunités phares du portefeuille de coopération actif de l'Alliance.",
    viewAll: "Voir tous les projets",
    explore: "Explorer le projet",
    downloadBrief: "Télécharger la fiche (PDF)",
    lastReviewedLabel: "Contenu revu le",
    discuss: "Discuter de cette opportunité",
    backLabel: "Tous les projets",
    filterCountry: "Pays / Région",
    filterSector: "Secteur",
    filterType: "Type de projet",
    filterStatus: "Statut",
    filterAll: "Tous",
    initiativesTitle: "Plateformes internationales & Initiatives stratégiques",
    initiativesNote: "Cadres et plateformes de coopération reliant les priorités de développement aux capacités internationales.",
    techTitle: "Coopération en technologies de pointe",
    techNote: "Domaines de coopération ciblés — et non des projets contractés :",
    techAreas: [
      "Intelligence artificielle et robotique",
      "Infrastructure de calcul",
      "Véhicules à énergies nouvelles",
      "Technologies médicales et portables",
      "Énergies renouvelables et hydrogène vert",
      "Technologies minières et de transformation des minéraux",
      "Recyclage et valorisation énergétique des déchets",
      "Transfert de technologies industrielles",
    ],
    disclaimerLabel: "Avis important",
    disclaimer:
      "Les informations présentées sur cette page sont fournies à titre d'introduction générale et d'exploration de partenariats. Les périmètres, capacités, modèles de mise en œuvre, calendriers, dispositifs de financement et participations des parties prenantes peuvent être actualisés à la suite d'études techniques, d'approbations institutionnelles et d'accords définitifs.",
    detailTitle: "Profil du projet",
    detailNote: "Publié pour l'exploration de partenariats.",
    countryLabel: "Pays",
    locationLabel: "Localisation",
    sectorLabel: "Secteur",
    statusLabel: "Statut",
    typeLabel: "Type",
    scaleLabel: "Échelle indicative",
    modelLabel: "Modèle proposé",
    objectivesLabel: "Objectifs stratégiques",
    partnershipLabel: "Opportunités de partenariat",
    emptyLabel: "Aucun projet ne correspond aux filtres sélectionnés.",
    relatedLabel: "Projets associés",
    homeCrumb: "Accueil",
  },
};

/* ── Catalog ────────────────────────────────────────────────────────────── */

export const PROJECTS: Project[] = [
  {
    slug: "sudan-productive-housing",
    type: "partnership",
    status: "seeking-partners",
    sector: "housing",
    country: "sd",
    featured: true,
    title: {
      en: "Sudan Productive Housing Program",
      ar: "برنامج الإسكان الإنتاجي في السودان",
      fr: "Programme de logements productifs au Soudan",
    },
    scale: {
      en: "Up to 1,000,000 productive housing units",
      ar: "حتى 1,000,000 وحدة إسكان إنتاجي",
      fr: "Jusqu'à 1 000 000 de logements productifs",
    },
    model: { en: "EPC+F", ar: "EPC+F (هندسة وتوريد وإنشاء وتمويل)", fr: "EPC+F" },
    description: {
      en: "A national-scale housing and urban development program designed to support reconstruction, economic activity, and the development of productive and sustainable communities in Sudan. The proposed cooperation structure combines engineering, construction, financing, and long-term development partnerships.",
      ar: "برنامج إسكان وتنمية حضرية على المستوى الوطني مصمم لدعم إعادة الإعمار والنشاط الاقتصادي وتطوير مجتمعات إنتاجية ومستدامة في السودان. يجمع هيكل التعاون المقترح بين الهندسة والإنشاء والتمويل وشراكات التنمية طويلة الأجل.",
      fr: "Un programme national de logement et de développement urbain conçu pour soutenir la reconstruction, l'activité économique et le développement de communautés productives et durables au Soudan. La structure de coopération proposée associe ingénierie, construction, financement et partenariats de développement à long terme.",
    },
    objectives: [
      { en: "Support reconstruction and economic activity", ar: "دعم إعادة الإعمار والنشاط الاقتصادي", fr: "Soutenir la reconstruction et l'activité économique" },
      { en: "Develop productive, sustainable communities", ar: "تطوير مجتمعات إنتاجية ومستدامة", fr: "Développer des communautés productives et durables" },
      { en: "Structure a long-term development partnership", ar: "هيكلة شراكة تنمية طويلة الأجل", fr: "Structurer un partenariat de développement à long terme" },
    ],
    partnership: [
      { en: "Engineering and construction partners", ar: "شركاء الهندسة والإنشاء", fr: "Partenaires d'ingénierie et de construction" },
      { en: "Financing institutions", ar: "مؤسسات التمويل", fr: "Institutions de financement" },
      { en: "Long-term development partners", ar: "شركاء تنمية طويلو الأجل", fr: "Partenaires de développement à long terme" },
    ],
  },
  {
    slug: "sudan-reconstruction-vision",
    type: "initiative",
    status: "cooperation-framework",
    sector: "infrastructure",
    country: "sd",
    title: {
      en: "Sudan Reconstruction and Sustainable Development Vision",
      ar: "رؤية إعادة إعمار السودان والتنمية المستدامة",
      fr: "Vision de reconstruction et de développement durable du Soudan",
    },
    description: {
      en: "A comprehensive framework for connecting Sudan's reconstruction priorities with international investors, contractors, financial institutions, and technology providers.",
      ar: "إطار شامل لربط أولويات إعادة إعمار السودان بالمستثمرين والمقاولين والمؤسسات المالية ومزوّدي التقنية الدوليين.",
      fr: "Un cadre complet reliant les priorités de reconstruction du Soudan aux investisseurs, entrepreneurs, institutions financières et fournisseurs de technologies internationaux.",
    },
    objectives: [
      { en: "Map reconstruction priorities to international capabilities", ar: "ربط أولويات الإعمار بالقدرات الدولية", fr: "Relier les priorités de reconstruction aux capacités internationales" },
      { en: "Coordinate multi-sector reconstruction tracks", ar: "تنسيق مسارات الإعمار متعددة القطاعات", fr: "Coordonner les volets de reconstruction multisectoriels" },
    ],
    partnership: [
      { en: "Investors and financial institutions", ar: "المستثمرون والمؤسسات المالية", fr: "Investisseurs et institutions financières" },
      { en: "Contractors and technology providers", ar: "المقاولون ومزوّدو التقنية", fr: "Entrepreneurs et fournisseurs de technologies" },
    ],
  },
  {
    slug: "hama-solar-200mw",
    type: "partnership",
    status: "seeking-partners",
    sector: "energy",
    country: "sy",
    featured: true,
    title: {
      en: "Hama 200 MW Solar Energy Project",
      ar: "مشروع الطاقة الشمسية 200 ميجاواط — حماة",
      fr: "Projet solaire de 200 MW — Hama",
    },
    location: { en: "Hama Governorate", ar: "محافظة حماة", fr: "Gouvernorat de Hama" },
    scale: { en: "Up to 200 MW", ar: "حتى 200 ميجاواط", fr: "Jusqu'à 200 MW" },
    model: { en: "BOT", ar: "BOT (بناء وتشغيل وتحويل)", fr: "BOT" },
    description: {
      en: "A proposed utility-scale solar energy project intended to expand clean electricity generation, support local economic development, and create a long-term investment opportunity through an appropriate public-private cooperation model.",
      ar: "مشروع مقترح للطاقة الشمسية على نطاق مرافق يهدف إلى توسيع توليد الكهرباء النظيفة ودعم التنمية الاقتصادية المحلية وخلق فرصة استثمارية طويلة الأجل من خلال نموذج تعاون مناسب بين القطاعين العام والخاص.",
      fr: "Un projet solaire à l'échelle des services publics destiné à accroître la production d'électricité propre, soutenir le développement économique local et créer une opportunité d'investissement à long terme dans un modèle de coopération public-privé approprié.",
    },
    objectives: [
      { en: "Expand clean electricity generation", ar: "توسيع توليد الكهرباء النظيفة", fr: "Accroître la production d'électricité propre" },
      { en: "Support local economic development", ar: "دعم التنمية الاقتصادية المحلية", fr: "Soutenir le développement économique local" },
      { en: "Create a long-term investment vehicle", ar: "خلق أداة استثمارية طويلة الأجل", fr: "Créer un véhicule d'investissement à long terme" },
    ],
    partnership: [
      { en: "Technical and engineering partners", ar: "شركاء تقنيون وهندسيون", fr: "Partenaires techniques et ingénierie" },
      { en: "Investment partners", ar: "شركاء استثمار", fr: "Partenaires investisseurs" },
    ],
  },
  {
    slug: "hama-debris-recycling",
    type: "project",
    status: "technical-assessment",
    sector: "circular",
    country: "sy",
    featured: true,
    title: {
      en: "Hama Debris Recycling and Circular Economy Program",
      ar: "برنامج إعادة تدوير الأنقاض والاقتصاد الدائري — حماة",
      fr: "Programme de recyclage des décombres et d'économie circulaire — Hama",
    },
    location: { en: "Hama Governorate", ar: "محافظة حماة", fr: "Gouvernorat de Hama" },
    scale: { en: "Indicative capacity: 200 tonnes per hour", ar: "الطاقة الاسترشادية: 200 طن في الساعة", fr: "Capacité indicative : 200 tonnes/heure" },
    description: {
      en: "A phased circular-economy program for sorting, crushing, screening, and recovering construction and demolition materials. The program aims to transform reconstruction debris into usable aggregates, road-base materials, blocks, pavers, and other construction products.",
      ar: "برنامج اقتصاد دائري مرحلي لفرز وسحق وغربلة واسترداد مواد البناء والهدم. يهدف البرنامج إلى تحويل أنقاض الإعمار إلى رُكام قابل للاستخدام ومواد أساس طرق وطوب وبلاطات وغيرها من منتجات البناء.",
      fr: "Un programme d'économie circulaire par phases pour le tri, le concassage, le criblage et la valorisation des matériaux de construction et de démolition. Le programme vise à transformer les décombres en granulats utilisables, matériaux de couche de fondation, blocs, pavés et autres produits de construction.",
    },
    objectives: [
      { en: "Recover usable materials from reconstruction debris", ar: "استرداد مواد قابلة للاستخدام من أنقاض الإعمار", fr: "Valoriser les matériaux issus des décombres" },
      { en: "Supply local construction product value chains", ar: "تغذية سلاسل منتجات البناء المحلية", fr: "Alimenter les filières locales de produits de construction" },
    ],
    partnership: [
      { en: "Processing equipment suppliers", ar: "مزوّدو معدات المعالجة", fr: "Fournisseurs d'équipements de traitement" },
      { en: "Offtake and construction partners", ar: "شركاء التوريد والإنشاء", fr: "Partenaires d'achat et de construction" },
    ],
  },
  {
    slug: "smart-meters-syria",
    type: "opportunity",
    status: "procurement-opportunity",
    sector: "energy",
    country: "sy",
    featured: true,
    title: {
      en: "Smart Electricity Meter Opportunity",
      ar: "فرصة عدادات الكهرباء الذكية",
      fr: "Opportunité de compteurs électriques intelligents",
    },
    scale: {
      en: "Indicative scope: 6,000,000 single-phase and 500,000 three-phase meters",
      ar: "النطاق الاسترشادي: 6,000,000 عداد أحادي الطور و500,000 عداد ثلاثي الطور",
      fr: "Périmètre indicatif : 6 000 000 compteurs monophasés et 500 000 triphasés",
    },
    description: {
      en: "A large-scale opportunity involving advanced metering infrastructure, prepaid and postpaid functionality, data management, technology transfer, and potential local industrial cooperation.",
      ar: "فرصة واسعة النطاق تشمل بنية القياس المتقدمة ووظائف الدفع المسبق واللاحق وإدارة البيانات ونقل التقنية وتعاونًا صناعيًا محليًا محتملًا.",
      fr: "Une opportunité à grande échelle impliquant une infrastructure de mesure avancée, des fonctions prépayées et postpayées, la gestion des données, le transfert de technologies et une coopération industrielle locale potentielle.",
    },
    objectives: [
      { en: "Deploy advanced metering infrastructure", ar: "نشر بنية القياس المتقدمة", fr: "Déployer l'infrastructure de mesure avancée" },
      { en: "Enable data-driven grid management", ar: "تمكين إدارة الشبكة المعتمدة على البيانات", fr: "Permettre une gestion du réseau fondée sur les données" },
    ],
    partnership: [
      { en: "Metering technology providers", ar: "مزوّدو تقنيات القياس", fr: "Fournisseurs de technologies de comptage" },
      { en: "Local industrial cooperation", ar: "تعاون صناعي محلي", fr: "Coopération industrielle locale" },
    ],
  },
  {
    slug: "dummar-housing",
    type: "project",
    status: "seeking-financing",
    sector: "housing",
    country: "sy",
    title: {
      en: "Dummar Al-Sham Housing Project",
      ar: "مشروع إسكان دمّر الشام",
      fr: "Projet de logement Dummar Al-Sham",
    },
    location: { en: "Damascus", ar: "دمشق", fr: "Damas" },
    scale: { en: "Initial phase: approximately 1,000 housing units", ar: "المرحلة الأولى: نحو 1,000 وحدة سكنية", fr: "Première phase : environ 1 000 logements" },
    description: {
      en: "A proposed first-phase residential development designed around a structured long-term financing and implementation model. Final scope, guarantees, financing arrangements, and delivery structure remain subject to stakeholder approval.",
      ar: "تطوير سكني مقترح للمرحلة الأولى مصمم وفق نموذج تمويل وتنفيذ طويل الأجل مهيكل. يبقى النطاق النهائي والضمانات وترتيبات التمويل وهيكل التسليم رهينة بموافقة أصحاب المصلحة.",
      fr: "Un développement résidentiel de première phase conçu autour d'un modèle structuré de financement et de mise en œuvre à long terme. Le périmètre final, les garanties, les dispositifs de financement et la structure de livraison restent soumis à l'approbation des parties prenantes.",
    },
    objectives: [
      { en: "Deliver a structured first residential phase", ar: "تنفيذ مرحلة سكنية أولى مهيكلة", fr: "Réaliser une première phase résidentielle structurée" },
      { en: "Establish a replicable financing model", ar: "إرساء نموذج تمويل قابل للتكرار", fr: "Établir un modèle de financement reproductible" },
    ],
    partnership: [
      { en: "Financing partners", ar: "شركاء تمويل", fr: "Partenaires financiers" },
      { en: "Implementation partners", ar: "شركاء تنفيذ", fr: "Partenaires de mise en œuvre" },
    ],
  },
  {
    slug: "hama-housing",
    type: "project",
    status: "under-development",
    sector: "housing",
    country: "sy",
    title: {
      en: "Hama Housing Development Opportunity",
      ar: "فرصة تطوير إسكان حماة",
      fr: "Opportunité de développement de logement à Hama",
    },
    location: { en: "Hama Governorate", ar: "محافظة حماة", fr: "Gouvernorat de Hama" },
    scale: { en: "Indicative scope: approximately 5,000 housing units", ar: "النطاق الاسترشادي: نحو 5,000 وحدة سكنية", fr: "Périmètre indicatif : environ 5 000 logements" },
    description: {
      en: "A housing development opportunity included within the wider cooperation portfolio for Hama Governorate, subject to feasibility studies, financing arrangements, and final institutional approvals.",
      ar: "فرصة تطوير إسكان مدرجة ضمن محفظة التعاون الأوسع لمحافظة حماة، رهينة بالدراسات الجدوية وترتيبات التمويل والموافقات المؤسسية النهائية.",
      fr: "Une opportunité de développement de logement incluse dans le portefeuille de coopération élargi du gouvernorat de Hama, sous réserve d'études de faisabilité, de dispositifs de financement et d'approbations institutionnelles finales.",
    },
    objectives: [
      { en: "Expand housing supply within the Hama portfolio", ar: "توسيع المعروض السكني ضمن محفظة حماة", fr: "Étendre l'offre de logement dans le portefeuille de Hama" },
      { en: "Complete feasibility and structuring", ar: "استكمال الجدوية والهيكلة", fr: "Finaliser la faisabilité et la structuration" },
    ],
    partnership: [
      { en: "Feasibility and structuring partners", ar: "شركاء الجدوية والهيكلة", fr: "Partenaires d'études et de structuration" },
    ],
  },
  {
    slug: "schools-health-rehabilitation",
    type: "partnership",
    status: "seeking-partners",
    sector: "social",
    country: "sy",
    title: {
      en: "Schools and Healthcare Facilities Rehabilitation",
      ar: "إعادة تأهيل المدارس والمراكز الصحية",
      fr: "Réhabilitation d'écoles et de centres de santé",
    },
    location: { en: "Hama Governorate", ar: "محافظة حماة", fr: "Gouvernorat de Hama" },
    scale: { en: "Indicative scope: 50 schools and 20 healthcare centers", ar: "النطاق الاسترشادي: 50 مدرسة و20 مركزًا صحيًا", fr: "Périmètre indicatif : 50 écoles et 20 centres de santé" },
    description: {
      en: "A social-infrastructure opportunity focused on rehabilitating educational and healthcare facilities through construction services, materials supply, equipment, and technology partnerships.",
      ar: "فرصة بنية تحتية اجتماعية تركز على إعادة تأهيل المرافق التعليمية والصحية عبر خدمات الإنشاء وتوريد المواد والمعدات وشراكات التقنية.",
      fr: "Une opportunité d'infrastructure sociale axée sur la réhabilitation d'établissements éducatifs et de santé via des services de construction, la fourniture de matériaux, d'équipements et des partenariats technologiques.",
    },
    objectives: [
      { en: "Rehabilitation of educational and healthcare facilities", ar: "إعادة تأهيل المرافق التعليمية والصحية", fr: "Réhabiliter les établissements éducatifs et de santé" },
      { en: "Local materials and equipment supply", ar: "توريد المواد والمعدات المحلية", fr: "Approvisionnement local en matériaux et équipements" },
    ],
    partnership: [
      { en: "Construction services partners", ar: "شركاء خدمات الإنشاء", fr: "Partenaires de services de construction" },
      { en: "Equipment and technology partners", ar: "شركاء المعدات والتقنية", fr: "Partenaires équipements et technologies" },
    ],
  },
  {
    slug: "hasiya-industrial-zone",
    type: "opportunity",
    status: "investment-opportunity",
    sector: "industry",
    country: "sy",
    title: {
      en: "Hasiya Industrial Zone Development",
      ar: "تطوير المنطقة الصناعية في حسياء",
      fr: "Développement de la zone industrielle de Hasiya",
    },
    location: { en: "Hasiya, Homs", ar: "حسياء، حمص", fr: "Hasiya, Homs" },
    description: {
      en: "An industrial-development opportunity focused on infrastructure, manufacturing capacity, technology localization, and attracting international industrial partners.",
      ar: "فرصة تطوير صناعي تركز على البنية التحتية والقدرة التصنيعية وتوطين التقنية واستقطاب شركاء صناعيين دوليين.",
      fr: "Une opportunité de développement industriel axée sur l'infrastructure, la capacité de fabrication, la localisation technologique et l'attraction de partenaires industriels internationaux.",
    },
    objectives: [
      { en: "Develop industrial-zone infrastructure", ar: "تطوير بنية المنطقة الصناعية", fr: "Développer l'infrastructure de la zone" },
      { en: "Localize manufacturing and technology", ar: "توطين الصناعة والتقنية", fr: "Localiser la fabrication et la technologie" },
    ],
    partnership: [
      { en: "International industrial partners", ar: "شركاء صناعيون دوليون", fr: "Partenaires industriels internationaux" },
    ],
  },
  {
    slug: "hama-agriculture-water",
    type: "project",
    status: "technical-assessment",
    sector: "agriculture",
    country: "sy",
    title: {
      en: "Hama Agriculture and Water Program",
      ar: "برنامج الزراعة والمياه — حماة",
      fr: "Programme agriculture et eau — Hama",
    },
    location: { en: "Hama Governorate", ar: "محافظة حماة", fr: "Gouvernorat de Hama" },
    description: {
      en: "A cooperation track covering modern agriculture, water solutions, productive infrastructure, and sustainable resource management. Individual projects will be published after completing technical prioritization.",
      ar: "مسار تعاون يغطي الزراعة الحديثة وحلول المياه والبنية الإنتاجية والإدارة المستدامة للموارد. سيتم نشر المشاريع الفردية بعد استكمال التصنيف التقني للأولويات.",
      fr: "Un axe de coopération couvrant l'agriculture moderne, les solutions en eau, les infrastructures productives et la gestion durable des ressources. Les projets individuels seront publiés après la priorisation technique.",
    },
    objectives: [
      { en: "Prioritize agriculture and water projects technically", ar: "التصنيف التقني لمشاريع الزراعة والمياه", fr: "Prioriser techniquement les projets agriculture-eau" },
      { en: "Publish projects as studies complete", ar: "نشر المشاريع عند اكتمال الدراسات", fr: "Publier les projets au fil des études" },
    ],
    partnership: [
      { en: "Agritech and water-solutions partners", ar: "شركاء التقنية الزراعية وحلول المياه", fr: "Partenaires agritech et solutions en eau" },
    ],
  },
  {
    slug: "cci-investment-portfolio",
    type: "opportunity",
    status: "seeking-partners",
    sector: "multi",
    country: "ci",
    featured: true,
    title: {
      en: "Côte d'Ivoire Multi-Sector Investment Portfolio",
      ar: "محفظة استثمارية متعددة القطاعات — كوت ديفوار",
      fr: "Portefeuille d'investissement multisectoriel — Côte d'Ivoire",
    },
    model: { en: "BOT, PPP, or project-specific structures", ar: "BOT أو PPP أو هياكل خاصة بالمشروع", fr: "BOT, PPP ou structures dédiées" },
    description: {
      en: "A diversified portfolio of development and investment opportunities across agro-industry, renewable energy, logistics, maritime facilities, tourism, healthcare, aquaculture, fisheries processing, cocoa processing, and supporting infrastructure.",
      ar: "محفظة متنوعة من فرص التنمية والاستثمار تغطي الصناعات الزراعية والطاقة المتجددة واللوجستيات والمرافق البحرية والسياحة والرعاية الصحية وتربية الأحياء المائية ومعالجة الأسماك ومعالجة الكاكاو والبنية التحتية الداعمة.",
      fr: "Un portefeuille diversifié d'opportunités de développement et d'investissement couvrant l'agro-industrie, les énergies renouvelables, la logistique, les installations maritimes, le tourisme, la santé, l'aquaculture, la transformation des pêches, la transformation du cacao et les infrastructures associées.",
    },
    objectives: [
      { en: "Structure investable opportunities per sector", ar: "هيكلة فرص قابلة للاستثمار لكل قطاع", fr: "Structurer des opportunités investissables par secteur" },
      { en: "Match international partners to sector tracks", ar: "مطابقة الشركاء الدوليين بمسارات القطاعات", fr: "Associer les partenaires internationaux aux filières" },
    ],
    partnership: [
      { en: "Sector investors and operators", ar: "مستثمرو ومشغلو القطاعات", fr: "Investisseurs et opérateurs sectoriels" },
      { en: "Public-private cooperation partners", ar: "شركاء التعاون بين القطاعين", fr: "Partenaires de coopération public-privé" },
    ],
  },
  {
    slug: "ghana-cooperation-program",
    type: "initiative",
    status: "cooperation-framework",
    sector: "industry",
    country: "gh",
    title: {
      en: "Ghana Institutional Cooperation Program",
      ar: "برنامج التعاون المؤسسي — غانا",
      fr: "Programme de coopération institutionnelle — Ghana",
    },
    description: {
      en: "An institutional cooperation framework intended to develop industrial and investment opportunities, connect international partners, and facilitate technology and financing cooperation.",
      ar: "إطار تعاون مؤسسي يهدف إلى تطوير الفرص الصناعية والاستثمارية وربط الشركاء الدوليين وتسهيل تعاون التقنية والتمويل.",
      fr: "Un cadre de coopération institutionnelle destiné à développer les opportunités industrielles et d'investissement, connecter les partenaires internationaux et faciliter la coopération technologique et financière.",
    },
    objectives: [
      { en: "Develop industrial and investment opportunities", ar: "تطوير الفرص الصناعية والاستثمارية", fr: "Développer les opportunités industrielles et d'investissement" },
      { en: "Facilitate technology and financing cooperation", ar: "تسهيل تعاون التقنية والتمويل", fr: "Faciliter la coopération technologique et financière" },
    ],
    partnership: [
      { en: "Institutional and industry partners", ar: "شركاء مؤسسيون وصناعيون", fr: "Partenaires institutionnels et industriels" },
    ],
  },
  {
    slug: "angola-vision",
    type: "initiative",
    status: "strategic-vision",
    sector: "multi",
    country: "ao",
    title: {
      en: "Angola Sustainable Development Vision",
      ar: "رؤية التنمية المستدامة — أنغولا",
      fr: "Vision de développement durable — Angola",
    },
    description: {
      en: "A proposed cooperation vision supporting energy transition, industrial development, logistics, green growth, infrastructure, and digital transformation.",
      ar: "رؤية تعاون مقترحة تدعم تحول الطاقة والتنمية الصناعية واللوجستيات والنمو الأخضر والبنية التحتية والتحول الرقمي.",
      fr: "Une vision de coopération proposée soutenant la transition énergétique, le développement industriel, la logistique, la croissance verte, l'infrastructure et la transformation numérique.",
    },
    objectives: [
      { en: "Frame cooperation across energy and industry", ar: " تأطير التعاون في الطاقة والصناعة", fr: "Cadrer la coopération énergie-industrie" },
      { en: "Open tracks for green growth and digital", ar: "فتح مسارات النمو الأخضر والرقمي", fr: "Ouvrir des axes croissance verte et numérique" },
    ],
    partnership: [
      { en: "Energy-transition and infrastructure partners", ar: "شركاء تحول الطاقة والبنية التحتية", fr: "Partenaires transition énergétique et infrastructures" },
    ],
  },
  {
    slug: "china-arab-africa-platform",
    type: "initiative",
    status: "cooperation-framework",
    sector: "multi",
    country: "intl",
    featured: true,
    title: {
      en: "China–Arab–Africa Strategic Partnership Platform",
      ar: "منصة الشراكة الاستراتيجية بين الصين والعالم العربي وإفريقيا",
      fr: "Plateforme de partenariat stratégique Chine–Monde arabe–Afrique",
    },
    description: {
      en: "A platform for connecting development priorities in Africa and the Arab region with Chinese technology, engineering, manufacturing, investment, and financing capabilities.",
      ar: "منصة لربط أولويات التنمية في إفريقيا والمنطقة العربية بالقدرات الصينية في التقنية والهندسة والتصنيع والاستثمار والتمويل.",
      fr: "Une plateforme reliant les priorités de développement en Afrique et dans le Monde arabe aux capacités chinoises en technologie, ingénierie, fabrication, investissement et financement.",
    },
    objectives: [
      { en: "Connect development priorities to Chinese capabilities", ar: "ربط أولويات التنمية بالقدرات الصينية", fr: "Relier les priorités de développement aux capacités chinoises" },
      { en: "Structure public-private cooperation tracks", ar: "هيكلة مسارات التعاون بين القطاعين", fr: "Structurer des axes de coopération public-privé" },
    ],
    partnership: [
      { en: "Chinese technology and engineering groups", ar: "المجموعات الصينية للتقنية والهندسة", fr: "Groupes chinois de technologie et d'ingénierie" },
      { en: "Arab and African institutions", ar: "المؤسسات العربية والإفريقية", fr: "Institutions arabes et africaines" },
    ],
  },
  {
    slug: "china-saudi-africa-gateway",
    type: "initiative",
    status: "cooperation-framework",
    sector: "industry",
    country: "intl",
    title: {
      en: "China–Saudi–Africa Industrial Gateway",
      ar: "البوابة الصناعية بين الصين والسعودية وإفريقيا",
      fr: "Passerelle industrielle Chine–Arabie saoudite–Afrique",
    },
    description: {
      en: "A proposed industrial and commercial gateway designed to support technology transfer, localized manufacturing, supply-chain development, and access to Arab and African markets.",
      ar: "بوابة صناعية وتجارية مقترحة لدعم نقل التقنية والتصنيع المحلي وتطوير سلاسل التوريد والوصول إلى أسواق العالم العربي وإفريقيا.",
      fr: "Une passerelle industrielle et commerciale proposée pour soutenir le transfert de technologies, la fabrication localisée, le développement des chaînes d'approvisionnement et l'accès aux marchés arabes et africains.",
    },
    objectives: [
      { en: "Support technology transfer and localization", ar: "دعم نقل التقنية والتوطين", fr: "Soutenir le transfert et la localisation technologique" },
      { en: "Develop Arab–African market access", ar: "تطوير الوصول لأسواق العرب وإفريقيا", fr: "Développer l'accès aux marchés arabes et africains" },
    ],
    partnership: [
      { en: "Manufacturing and supply-chain partners", ar: "شركاء التصنيع وسلاسل التوريد", fr: "Partenaires fabrication et supply-chain" },
    ],
  },
  {
    slug: "cross-border-trade-platform",
    type: "initiative",
    status: "strategic-vision",
    sector: "multi",
    country: "intl",
    title: {
      en: "Cross-Border Trade and Digital Commerce Platform",
      ar: "منصة التجارة العابرة للحدود والتجارة الرقمية",
      fr: "Plateforme de commerce transfrontalier et numérique",
    },
    description: {
      en: "A proposed online and offline platform for connecting companies, products, procurement requirements, investment opportunities, and international partners.",
      ar: "منصة إلكترونية وميدانية مقترحة لربط الشركات والمنتجات ومتطلبات الشراء والفرص الاستثمارية والشركاء الدوليين.",
      fr: "Une plateforme en ligne et hors ligne proposée pour connecter entreprises, produits, besoins d'approvisionnement, opportunités d'investissement et partenaires internationaux.",
    },
    objectives: [
      { en: "Connect companies, products, and procurement", ar: "ربط الشركات والمنتجات والشراء", fr: "Connecter entreprises, produits et achats" },
      { en: "Digitize opportunity discovery", ar: "رقمنة اكتشاف الفرص", fr: "Numériser la découverte d'opportunités" },
    ],
    partnership: [
      { en: "Digital-platform and trade partners", ar: "شركاء المنصات الرقمية والتجارة", fr: "Partenaires plateformes numériques et commerce" },
    ],
  },
  {
    slug: "advanced-technology-cooperation",
    type: "initiative",
    status: "strategic-vision",
    sector: "multi",
    country: "intl",
    title: {
      en: "Advanced Technology Cooperation",
      ar: "التعاون في التقنيات المتقدمة",
      fr: "Coopération en technologies de pointe",
    },
    description: {
      en: "Targeted cooperation areas spanning advanced technologies — pursued as cooperation tracks, not active contracted projects.",
      ar: "مجالات تعاون مستهدفة في التقنيات المتقدمة — تُتابع كمسارات تعاون وليست مشاريع متعاقد عليها.",
      fr: "Domaines de coopération ciblés dans les technologies avancées — suivis comme axes de coopération, et non comme projets contractés.",
    },
    objectives: [
      { en: "Frame cooperation tracks per technology area", ar: "تأطير مسارات التعاون لكل مجال تقني", fr: "Cadrer les axes de coopération par technologie" },
    ],
    partnership: [
      { en: "Technology providers and research partners", ar: "مزوّدو التقنية والشركاء البحثيون", fr: "Fournisseurs de technologies et partenaires de recherche" },
    ],
  },
];

/* ── Helpers ────────────────────────────────────────────────────────────── */

export const featuredProjects = (n?: number): Project[] => {
  const list = PROJECTS.filter((p) => p.featured);
  return n ? list.slice(0, n) : list;
};

export const initiativeProjects = (): Project[] =>
  PROJECTS.filter((p) => p.type === "initiative");

export const projectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);

export const TECH_AREAS_PROJECT_SLUG = "advanced-technology-cooperation";
