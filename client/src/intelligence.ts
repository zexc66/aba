export type Locale = "en" | "ar" | "fr";

export type SectorKey = "humanitarian" | "energy" | "digital" | "industrial" | "circularity" | "agriculture";

export const SECTORS: Record<SectorKey, Record<Locale, string>> = {
    humanitarian: { en: "Humanitarian", ar: "إنساني", fr: "Humanitaire" },
    energy: { en: "Energy", ar: "طاقة", fr: "Énergie" },
    digital: { en: "Digital", ar: "رقمي", fr: "Numérique" },
    industrial: { en: "Industrial", ar: "صناعي", fr: "Industriel" },
    circularity: { en: "Circularity", ar: "اقتصاد دائري", fr: "Circularité" },
    agriculture: { en: "Agriculture", ar: "زراعة", fr: "Agriculture" },
};

/** Corridor ISO codes a program is explicitly anchored to, per its published mandate.
 *  "regional" means the program is structured across several corridors. */
export const PROGRAM_META: Record<string, { sector: SectorKey; corridors: string[] | "regional"; sdgs: number[] }> = {
    "hama-rehabilitation": { sector: "humanitarian", corridors: ["sy"], sdgs: [3, 4] },
    "al-arish-hub": { sector: "humanitarian", corridors: ["eg"], sdgs: [9] },
    "green-energy": { sector: "energy", corridors: "regional", sdgs: [7, 13] },
    "digital-africa": { sector: "digital", corridors: "regional", sdgs: [9] },
    "integrated-cities": { sector: "industrial", corridors: "regional", sdgs: [9, 11] },
    "debris-recycling": { sector: "circularity", corridors: ["sy"], sdgs: [11, 12] },
    "food-security": { sector: "agriculture", corridors: "regional", sdgs: [2] },
};

/** Delivery stage index (0=Structuring, 1=Development, 2=Execution) derived from the
 *  owner-approved program status. Active programs execute; development programs are
 *  in phase two; pipeline programs are structuring. */
export function stageIndex(statusTone: "active" | "dev" | "pipeline"): number {
    if (statusTone === "active") return 2;
    if (statusTone === "dev") return 1;
    return 0;
}

export const SDG_NAMES: Record<number, Record<Locale, string>> = {
    1: { en: "No Poverty", ar: "لا فقر", fr: "Pas de pauvreté" },
    2: { en: "Zero Hunger", ar: "القضاء التام على الجوع", fr: "Faim zéro" },
    3: { en: "Good Health", ar: "الصحة الجيدة", fr: "Bonne santé" },
    4: { en: "Quality Education", ar: "التعليم الجيد", fr: "Éducation de qualité" },
    7: { en: "Clean Energy", ar: "طاقة نظيفة", fr: "Énergie propre" },
    8: { en: "Decent Work", ar: "العمل اللائق", fr: "Travail décent" },
    9: { en: "Industry & Infrastructure", ar: "الصناعة والبنية التحتية", fr: "Industrie & Infrastructure" },
    11: { en: "Sustainable Cities", ar: "مدن مستدامة", fr: "Villes durables" },
    12: { en: "Responsible Consumption", ar: "استهلاك مسؤول", fr: "Consommation responsable" },
    13: { en: "Climate Action", ar: "العمل المناخي", fr: "Action climatique" },
    17: { en: "Partnerships", ar: "عقد الشراكات", fr: "Partenariats" },
};

export type GovernanceSlug = "esia-esms" | "kyc-aml" | "independent-oversight" | "contracts";

/** Framework-level operating descriptions. These elaborate the Alliance's published
 *  governance pillars; full documents are shared under NDA (governanceDetail.requestNote). */
export const GOVERNANCE_ARTICLES: Record<GovernanceSlug, Record<Locale, { overview: string; practices: string[] }>> = {
    "esia-esms": {
        en: {
            overview: "Every program mandate passes environmental and social screening before financial structuring begins. The ESIA/ESMS framework governs how impacts are identified, mitigated, and monitored across the full program lifecycle, aligned with international development-finance safeguards.",
            practices: [
                "Screening and scoping at mandate entry, before capital commitment",
                "Environmental and social impact assessment proportional to program category",
                "Management plans with defined mitigation, residual-impact, and closure measures",
                "MRV monitoring — measurement, reporting, and verification against plan baselines",
                "Safeguard disclosure to counterparties and co-financiers",
            ],
        },
        ar: {
            overview: "يخضع كل تفويض برنامج لفحص بيئي واجتماعي قبل بدء الهيكلة المالية. يحكم إطار ESIA/ESMS كيفية تحديد الآثار والتخفيف منها ومراقبتها عبر دورة حياة البرنامج كاملة، بما يتوافق مع ضمانات تمويل التنمية الدولية.",
            practices: [
                "الفحص والتحديد عند دخول التفويض، قبل الالتزام الرأسمالي",
                "تقييم الأثر البيئي والاجتماعي بما يتناسب مع فئة البرنامج",
                "خطط إدارة بتدابير تخفيف وآثار متبقية وإغلاق محددة",
                "مراقبة وقياس وإبلاغ وتحقق (MRV) مقابل خطط الأساس",
                "الإفصاح الضماني للأطراف والممولين المشاركين",
            ],
        },
        fr: {
            overview: "Chaque mandat de programme passe un criblage environnemental et social avant le début de la structuration financière. Le cadre EISE/SGES régit l'identification, l'atténuation et le suivi des impacts sur tout le cycle de vie du programme, conformément aux garanties des institutions de financement du développement.",
            practices: [
                "Criblage et cadrage à l'entrée du mandat, avant tout engagement de capital",
                "Évaluation d'impact environnemental et social proportionnelle à la catégorie",
                "Plans de gestion avec mesures d'atténuation, d'impact résiduel et de clôture",
                "Suivi MRV — mesure, rapport et vérification par rapport aux référentiels",
                "Divulgation des garanties aux contreparties et cofinanceurs",
            ],
        },
    },
    "kyc-aml": {
        en: {
            overview: "Counterparty integrity gates every transaction. The KYC/AML framework screens governments, investors, EPCs, and operating partners before mandate entry and throughout delivery, with refusal and escalation protocols that apply uniformly regardless of counterpart seniority.",
            practices: [
                "Counterparty identification and mandate-source verification",
                "Beneficial-ownership mapping to natural persons",
                "Sanctions, watchlist, and politically-exposed-person screening",
                "Ongoing transaction monitoring across the program lifecycle",
                "Escalation and refusal protocol with documented rationale",
            ],
        },
        ar: {
            overview: "نزاهة الأطراف تحكم كل معاملة. يفحص إطار KYC/AML الحكومات والمستثمرين وشركات EPC والشركاء التشغيلين قبل دخول التفويض وطوال التنفيذ، مع بروتوكولات رفض وتصعيد تُطبق بشكل موحد بغض النظر عن مكانة الطرف المقابل.",
            practices: [
                "تحديد هوية الأطراف والتحقق من مصدر التفويض",
                "خريطة الملكية النفعية وصولاً إلى الأشخاص الطبيعيين",
                "فحص العقوبات وقوائم المراقبة والأشخاص المعرضين سياسياً",
                "مراقبة المعاملات المستمرة عبر دورة حياة البرنامج",
                "بروتوكول تصعيد ورفض بمبررات موثقة",
            ],
        },
        fr: {
            overview: "L'intégrité des contreparties conditionne chaque transaction. Le cadre KYC/AML contrôle gouvernements, investisseurs, EPC et partenaires opérationnels avant l'entrée en mandat et pendant toute la réalisation, avec des protocoles de refus et d'escalade appliqués uniformément quel que soit le rang de la contrepartie.",
            practices: [
                "Identification des contreparties et vérification de la source du mandat",
                "Cartographie de la propriété bénéficiaire jusqu'aux personnes physiques",
                "Criblage sanctions, listes de surveillance et personnes politiquement exposées",
                "Suivi transactionnel continu sur le cycle de vie du programme",
                "Protocole d'escalade et de refus avec justification documentée",
            ],
        },
    },
    "independent-oversight": {
        en: {
            overview: "Delivery claims are verified by parties with no stake in them. Independent engineers and auditors are appointed to each program, with RACI-mapped responsibilities that separate origination, execution, and verification so no single party grades its own work.",
            practices: [
                "Independent engineer appointed at mandate entry, not at dispute",
                "External auditor with defined rotation — no perpetual engagement",
                "RACI mapping separating origination, execution, and verification roles",
                "Milestone verification tied to payment and success-fee triggers",
                "Documented dispute-resolution path with technical determination",
            ],
        },
        ar: {
            overview: "يتم التحقق من ادعاءات التنفيذ من قبل أطراف لا مصلحة لها فيها. يُعيَّن مهندسون ومدققون مستقلون لكل برنامج، مع مسؤوليات موزعة وفق RACI تفصل بين النشأة والتنفيذ والتحقق بحيث لا يقيّم أي طرف عمله بنفسه.",
            practices: [
                "تعيين مهندس مستقل عند دخول التفويض لا عند النزاع",
                "مدقق خارجي بدوران محدد — دون تعاقب دائم",
                "خريطة RACI تفصل أدوار النشأة والتنفيذ والتحقق",
                "تحقق من المعالم مرتبط بالدفع ومحفزات أتعاب النجاح",
                "مسار حل نزاعات موثق بتحديد فني",
            ],
        },
        fr: {
            overview: "Les affirmations de réalisation sont vérifiées par des parties qui n'y ont aucun intérêt. Des ingénieurs et auditeurs indépendants sont nommés sur chaque programme, avec des responsabilités cartographiées RACI séparant origination, exécution et vérification — aucune partie ne note son propre travail.",
            practices: [
                "Ingénieur indépendant nommé à l'entrée du mandat, non au litige",
                "Auditeur externe avec rotation définie — pas d'engagement perpétuel",
                "Cartographie RACI séparant origination, exécution et vérification",
                "Vérification des jalons liée au déclenchement des paiements et frais de succès",
                "Chemin de résolution des litiges documenté avec détermination technique",
            ],
        },
    },
    contracts: {
        en: {
            overview: "Contract architecture allocates risk before it materializes. Standard PPP/BOT/EPC+F templates define who carries construction, offtake, currency, and political risk, with success fees released only against independently verified milestones.",
            practices: [
                "Standardized PPP/BOT/EPC+F templates per program category",
                "Risk-allocation matrix across construction, offtake, currency, and political risk",
                "Success-fee triggers tied to independently verified milestones only",
                "Local-content and capacity-transfer clauses in every delivery contract",
                "Termination and step-in rights protecting municipalities and co-financiers",
            ],
        },
        ar: {
            overview: "هندسة العقود توزع المخاطر قبل وقوعها. تحدد نماذج PPP/BOT/EPC+F القياسية من يتحمل مخاطر الإنشاء والشراء والعملة والسياسة، مع تحرير أتعاب النجاح فقط مقابل معالم موثقة بشكل مستقل.",
            practices: [
                "نماذج PPP/BOT/EPC+F قياسية حسب فئة البرنامج",
                "مصفوفة توزيع المخاطر عبر الإنشاء والشراء والعملة والمخاطر السياسية",
                "محفزات أتعاب النجاح مرتبطة حصراً بمعامل موثقة بشكل مستقل",
                "بنود المحتوى المحلي ونقل القدرات في كل عقد تنفيذ",
                "حقوق الإنهاء والتدخل لحماية البلديات والممولين المشاركين",
            ],
        },
        fr: {
            overview: "L'architecture contractuelle alloue le risque avant qu'il ne se matérialise. Les modèles standard PPP/BOT/EPC+F définissent qui porte le risque de construction, de débouché, de change et politique, les frais de succès n'étant libérés que contre des jalons vérifiés indépendamment.",
            practices: [
                "Modèles PPP/BOT/EPC+F standardisés par catégorie de programme",
                "Matrice d'allocation des risques construction, débouché, change et politique",
                "Déclencheurs de frais de succès liés uniquement à des jalons vérifiés",
                "Clauses de contenu local et de transfert de compétences dans chaque contrat",
                "Droits de résiliation et d'intervention protégeant municipalités et cofinanceurs",
            ],
        },
    },
};
