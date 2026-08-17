import { ShieldCheck, Handshake, Leaf, Building2, Globe2, Heart, Recycle } from "lucide-react";
import { ReactNode } from "react";

// ---- Types ----
export interface Content {
  metaTitle: string;
  nav: {
    about: string;
    programs: string;
    gallery: string;
    countries: string;
    governance: string;
    team: string;
    partners: string;
    newsroom: string;
    contact: string;
  };
  gallery: {
    title: string;
    subtitle: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: { label: string; value: string }[];
  about: {
    title: string;
    text: string;
    bullets: { icon: ReactNode; text: string }[];
    metricsTitle: string;
    metrics: { label: string; value: string; desc: string; id: string; suffix?: string }[];
    blueprintTitle: string;
    blueprint: { t: string; id: string }[];
    ourStoryTitle?: string;
    ourStorySubtitle?: string;
    ourStoryText?: string;
    ourStoryMilestones?: { year: string; title: string; desc: string }[];
  };
  programs: {
    title: string;
    list: {
      icon: ReactNode;
      name: string;
      desc: string;
      tags: string[];
      logo?: string;
      link?: string;
    }[];
  };
  countries: {
    title: string;
    note: string;
    list: string[];
  };
  governance: {
    title: string;
    text: string;
    pillars: { title: string; desc: string }[];
  };
  partners: {
    title: string;
    note: string;
  };
  team: {
    title: string;
    note: string;
    list: {
      name: string;
      title: string;
      bio: string;
      image: string;
    }[];
  };
  newsroom: {
    title: string;
    note: string;
    empty: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    org: string;
    msg: string;
    send: string;
    sent: string;
    placeholders: {
      name: string;
      email: string;
      org: string;
      msg: string;
    };
    sidebar: {
      hq: string;
      channels: string;
    };
  };
    footer: {
    rights: string;
    privacy: string;
    terms: string;
  };
  testimonials: {
    title: { main: string; highlighted: string; partner: string };
    sectionRef: string;
    communique: string;
    list: {
      quote: string;
      author: string;
      position: string;
      id: string;
    }[];
  };
  hud: {
    executiveCaucus: string;
    directorate: string;
    leadershipArchitecture: string;
    operationalStatus: string;
    memberClearance: string;
    verifiedRoles: string;
    establishComm: string;
    voice: string;
    recognition: string;
    governanceStanchion: string;
    institutionalIntegrity: string;
    exploreProtocol: string;
    accessCharter: string;
    activeStatus: string;
    transparencyMandate: string;
    syndicateGrid: string;
    strategicConsortium: string;
    initiateSyndicate: string;
    vettedInstitutional: string;
    consortiumNote: string;
    intellectualAuthority: string;
    executive_protocol: string;
    view_full_governance: string;
  };
  investor: {
    title: string;
    subtitle: string;
    eyebrow: string;
    note: string;
    vaultTitle: string;
    vaultSubtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    keyLabel: string;
    keyPlaceholder: string;
    cta: string;
    requestKey: string;
    auditNote: string;
  };
  langLabel: string;
}

// ---- Brand Tokens ----
export const BRAND = {
  primaryFrom: "#5a1f2e", // burgundy from logo
  primaryTo: "#f2a007", // gold from logo
  accent: "#f59e0b", // amber accent
  dark: "#0f1225",
  light: "#f8f7fc",
};

// Gradient helper
export const gradient = `bg-[linear-gradient(135deg,${BRAND.primaryFrom},${BRAND.primaryTo})]`;

// ---- Copy (EN/AR) ----
export const COPY: Record<"en" | "ar" | "fr", Content> = {
  en: {
    metaTitle: "AIABASD — African International Alliance for Business & Sustainable Development",
    gallery: {
      title: "Gallery",
      subtitle: "A glimpse into our impact, events, and partnerships across Africa.",
    },
    nav: {
      about: "About",
      programs: "Programs",
      gallery: "Gallery",
      countries: "Countries",
      governance: "Governance",
      team: "Team",
      partners: "Partners",
      newsroom: "Newsroom",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Alliance • PPP • Impact",
      title: "Accelerating sustainable growth across Africa",
      subtitle:
        "We convene governments, private capital, and impact operators to deliver bankable PPP/BOT programs across energy, logistics, agriculture, digital infrastructure, and resilient cities — aligned with SDG 2030 and AU Agenda 2063.",
      ctaPrimary: "Explore Programs",
      ctaSecondary: "Partner with us",
    },
    stats: [
      { label: "Projects in pipeline", value: "+$550M" },
      { label: "Jobs enabled", value: "10,000+" },
      { label: "Countries engaged", value: "9+" },
      { label: "Target IRR", value: "22–30%" },
    ],
    about: {
      title: "Who we are",
      text:
        "AIABASD is a multi-country alliance orchestrating high-impact programs with robust governance (ESIA/ESMS, KYC/AML, Independent Engineer/Auditor) and transparent success-fee structures. We mobilize capital for scalable infrastructure and inclusive growth.",
      bullets: [
        { icon: <ShieldCheck className="w-5 h-5" />, text: "Strong governance & compliance (ESIA/ESMS, KYC/AML)." },
        { icon: <Handshake className="w-5 h-5" />, text: "Government partnerships & PPP/BOT delivery capacity." },
        { icon: <Leaf className="w-5 h-5" />, text: "Climate-positive, SDG-aligned development approach." },
      ],
      metricsTitle: "Institutional_Legacy",
      metrics: [
        { label: "Operational Hubs", value: "09", desc: "Strategic centers across major economic zones", id: "HUB_SEC" },
        { label: "Deployment Valve", value: "550", desc: "USD Millions in directed financing", id: "VAL_FIN", suffix: "M" },
        { label: "Civic Programs", value: "14", desc: "Flagship programs under institutional mandate", id: "PRG_CIV" },
        { label: "Target Alpha", value: "28", desc: "Regional hurdle rate for resilience", id: "ALF_TRG", suffix: "%" },
      ],
      blueprintTitle: "Execution_Framework",
      blueprint: [
        { t: "Program origination & deep strategy", id: "A01" },
        { t: "PPP/BOT institutional risk allocation", id: "A02" },
        { t: "ESMS & MRV auditing compliance", id: "A03" },
        { t: "EPC+F rapid deployment mobilization", id: "A04" },
        { t: "Local-content & capacity enablement", id: "A05" },
      ],
      ourStoryTitle: "Our Story",
      ourStorySubtitle: "Bridging Continents through Bankable Alliances & Sustainable Development",
      ourStoryText:
        "Founded on the strategic convergence of the United Nations SDG 2030 Agenda and African Union Agenda 2063, AIABASD was established to bridge the critical $100B+ annual infrastructure deficit across Africa and the Arab region. By uniting sovereign governments, institutional investors, and operating partners, we transform high-need regional corridors—from West Africa to the Middle East—into bankable, climate-resilient economic growth zones.",
      ourStoryMilestones: [
        { year: "Origin", title: "Institutional Alliance Formation", desc: "Established multi-sovereign coalition bridging Arab capital with African growth markets under strict ESIA/ESMS governance." },
        { year: "Expansion", title: "11 Sovereign Corridors", desc: "Expanded operational presence across Ghana, Sierra Leone, Gambia, Ivory Coast, Burkina Faso, Angola, Sudan, Egypt, Jordan, Syria, and Saudi Arabia." },
        { year: "Impact", title: "+$550M Pipeline & Civic Recovery", desc: "Mobilized green energy, digital infrastructure, circular debris recycling, and flagship humanitarian recovery initiatives like Hama." }
      ],
    },
    programs: {
      title: "Flagship programs",
      list: [
        {
          icon: <Heart className="w-6 h-6" />,
          name: "Rehabilitation of 50 Schools and 20 Health Centers — Hama, Syria",
          desc:
            "Under the 'Fida'an for Hama' initiative, comprehensive rehabilitation of educational and healthcare facilities to provide safe, dignified environments and support early recovery and sustainable development in coordination with local and international partners.",
          tags: ["Humanitarian", "Education", "Healthcare"],
          logo: "/projects/hama-logo.jpg",
          link: "/hama-project",
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "Logistics & Reconstruction Hub — Al‑Arish",
          desc:
            "Regional humanitarian logistics hub serving Gaza reconstruction: warehousing (ambient/cold), kitting, fleet ops, customs facilitation, and NGO contracting.",
          tags: ["Humanitarian", "Warehousing", "Fleet"],
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "Green Energy — Utility‑Scale Solar (150MW+)",
          desc:
            "Bankable solar PV programs with grid integration, storage pilots, and local content enablement; EPC+F structures with independent monitoring.",
          tags: ["Energy", "Solar", "EPC+F"],
        },
        {
          icon: <Globe2 className="w-6 h-6" />,
          name: "Digital Africa — Telecom & Cyber Infrastructure",
          desc:
            "Backbone fiber, data centers, and secure e‑gov platforms to unlock digital inclusion across education, health, and commerce.",
          tags: ["Digital", "Cyber", "Backbone"],
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "Integrated Cities — Industrial & Logistics Zones",
          desc:
            "PPP/BOT industrial ecosystems with anchor tenants, skills/TVET hubs, and climate‑resilient utilities for export‑led growth.",
          tags: ["PPP", "Industrial", "Logistics"],
        },
        {
          icon: <Recycle className="w-6 h-6" />,
          name: "Debris Recycling & Circular Material Recovery — Syria",
          desc:
            "Industrial rubble processing, concrete crushing, and eco-brick manufacturing plants across affected Syrian governorates to transform conflict rubble into certified sustainable building materials for urban recovery.",
          tags: ["Recycling", "Syria", "Circular Economy", "Environment"],
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "Food Security — Agro Processing & Cold Chain",
          desc:
            "End‑to‑end value chains (feed, processing, cold chain, distribution) with traceability and HACCP/ISO compliance.",
          tags: ["Agro", "Cold Chain", "HACCP"],
        },
      ],
    },
    countries: {
      title: "Where we operate",
      note: "Active & pipeline geographies",
      list: ["Ghana", "The Gambia", "Sierra Leone", "Burkina Faso", "Côte d'Ivoire", "Angola", "Jordan", "Egypt", "Syria", "Sudan", "Saudi Arabia"],
    },
    governance: {
      title: "Governance & compliance",
      text:
        "Our delivery model embeds independent oversight and rigorous safeguards across the project lifecycle.",
      pillars: [
        { title: "ESIA & ESMS", desc: "Environmental & Social impact management and monitoring." },
        { title: "KYC/AML", desc: "Stringent counterparty screening and anti‑corruption controls." },
        { title: "Independent Oversight", desc: "Independent Engineer & Auditor; MRV & RACI mapping." },
        { title: "Contracts", desc: "PPP/BOT/EPC+F templates with clear success‑fee triggers." },
      ],
    },
    partners: {
      title: "Strategic partners",
      note: "Public sector, DFIs, EPCs, investors, and operating partners.",
    },
    team: {
      title: "Our team",
      note: "Leadership driving impact across Africa.",
      list: [
        {
          name: "Dr. Mohammed Abdel Moneim",
          title: "Vice President",
          bio: "Distinguished executive leading regional strategic development, sovereign partnerships, and institutional governance across Africa and the Middle East.",
          image: "/team/mohammed-abdelmoneim.jpg",
        },
        {
          name: "Faris Safi",
          title: "Co-Founder & Partner",
          bio: "Strategic visionary with extensive experience in infrastructure development and international partnerships across emerging markets.",
          image: "/team/faris.jpg",
        },
        {
          name: "Ziad Shneikat",
          title: "Co-Founder & Partner",
          bio: "Expert in PPP structuring and project finance with proven track record in bankable infrastructure programs across Africa and the Middle East.",
          image: "/team/ziad.jpg",
        },
      ],
    },
    newsroom: {
      title: "News & updates",
      note: "Recent highlights and announcements.",
      empty: "Add your latest MoUs, site visits, and awards here.",
    },
    contact: {
      title: "Get in touch",
      subtitle: "Open to government requests, investor mandates, and operating partnerships.",
      name: "Full name",
      email: "Work email",
      org: "Organization",
      msg: "How can we collaborate?",
      send: "Send inquiry",
      sent: "Sent! We'll reach out shortly.",
      placeholders: {
        name: "e.g., Ziad Shneikat",
        email: "name@company.com",
        org: "Company / Ministry / NGO",
        msg: "Briefly describe the opportunity, timeline, and stakeholders…",
      },
      sidebar: {
        hq: "Alliance Headquarters",
        channels: "Channels",
      },
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
    },
    testimonials: {
      title: { main: "Voice of our", highlighted: "Institutional", partner: "Partners" },
      sectionRef: "SECTION_07",
      communique: "COMMUNIQUE_V.01",
      list: [
        {
          quote: "AIABASD has been instrumental in connecting us with strategic partners across Africa. Their expertise in sustainable infrastructure development is unmatched.",
          author: "Ahmed Al-Rashid",
          position: "CEO, Global Trading Corp",
          id: "TR-8821"
        },
        {
          quote: "The team's dedication to sustainable development and their deep understanding of African markets made our partnership incredibly successful.",
          author: "Sarah Mensah",
          position: "Director, West Africa Investments",
          id: "TR-8822"
        },
        {
          quote: "Working with AIABASD opened doors we didn't know existed. Their network and expertise are truly remarkable.",
          author: "Jean-Pierre Dubois",
          position: "Founder, Green Energy Initiative",
          id: "TR-8823"
        }
      ]
    },
    hud: {
      executiveCaucus: "EXECUTIVE_CAUCUS",
      directorate: "DIRECTORATE_04",
      leadershipArchitecture: "LEADERSHIP_ARCHITECTURE",
      operationalStatus: "OPERATIONAL",
      memberClearance: "LVL_CLEARANCE: ALPHA",
      verifiedRoles: "VERIFIED_ROLES: TRUE",
      establishComm: "ESTABLISH_COMMUNICATION",
      voice: "VOICE",
      recognition: "VERIFIED_RECOGNITION",
      governanceStanchion: "GOVERNANCE_STANCHION_03",
      institutionalIntegrity: "Institutional Integrity",
      exploreProtocol: "EXPLORE_PROTOCOL_DETAIL",
      accessCharter: "Access Institutional Charter",
      activeStatus: "ACTIVE_STATUS",
      transparencyMandate: "TRANSPARENCY_MANDATE_V.03",
      syndicateGrid: "SYNDICATE_06",
      strategicConsortium: "Strategic Consortium",
      initiateSyndicate: "INITIATE_SYNDICATE_PROTOCOL",
      vettedInstitutional: "VETTED_INSTITUTIONAL",
      consortiumNote: "AIABASD Maintains a global network of vetted institutional collaborators and strategic alliances.",
      intellectualAuthority: "Intellectual Authority",
      executive_protocol: "Executive Protocol",
      view_full_governance: "View Full Governance"
    },
    investor: {
      title: "Access the Institutional Cluster.",
      subtitle: "Secure access to regional performance data, strategic mandates, and executive audit trails.",
      eyebrow: "INVESTOR_RELATIONS_VAULT",
      note: "ENCRYPTED_SIGNAL_TRX_99",
      vaultTitle: "Vault Authentication",
      vaultSubtitle: "Identity verification required for board-level access.",
      emailLabel: "INSTITUTIONAL_EMAIL",
      emailPlaceholder: "executive@institution.org",
      keyLabel: "ACCESS_PROTOCOL_KEY",
      keyPlaceholder: "••••••••••••",
      cta: "INITIATE_AUTH_SESSION",
      requestKey: "REQUEST_KEY",
      auditNote: "Access is monitored and audited in accordance with the sovereign institutional privacy mandate."
    },
    langLabel: "العربية",
  },
  ar: {
    metaTitle: "التحالف الدولي الإفريقي للأعمال والتنمية المستدامة",
    gallery: {
      title: "المعرض",
      subtitle: "لمحة عن تأثيرنا وفعالياتنا وشراكاتنا في جميع أنحاء إفريقيا.",
    },
    nav: {
      about: "من نحن",
      programs: "البرامج",
      gallery: "المعرض",
      countries: "الدول",
      governance: "الحوكمة",
      team: "الفريق",
      partners: "الشركاء",
      newsroom: "الأخبار",
      contact: "تواصل معنا",
    },
    hero: {
      eyebrow: "تحالف • شراكات • أثر",
      title: "تسريع النمو المستدام عبر إفريقيا",
      subtitle:
        "نُوَحِّد الحكومات ورؤوس الأموال والجهات التشغيلية لتنفيذ برامج قابلة للتمويل في الطاقة واللوجستيات والزراعة والبنية الرقمية والمدن المرنة — بما يتوافق مع أهداف التنمية المستدامة 2030 وأجندة إفريقيا 2063.",
      ctaPrimary: "استكشاف البرامج",
      ctaSecondary: "انضم كشريك",
    },
    stats: [
      { label: "مشاريع قيد الإعداد", value: "+$550M" },
      { label: "وظائف مباشرة وغير مباشرة", value: "10,000+" },
      { label: "الدول المستهدفة", value: "9+" },
      { label: "العائد المستهدف", value: "22–30%" },
    ],
    about: {
      title: "من نحن",
      text:
        "التحالف منصة متعددة الدول لتنسيق برامج عالية الأثر بحوكمة صارمة (دراسات الأثر البيئي والاجتماعي، مكافحة غسل الأموال، مهندس ومدقق مستقل) وهياكل أتعاب شفافة. نُعبّئ التمويل للبنية التحتية والنمو الشامل.",
      bullets: [
        { icon: <ShieldCheck className="w-5 h-5" />, text: "حوكمة وامتثال قويان (ESIA/ESMS، KYC/AML)." },
        { icon: <Handshake className="w-5 h-5" />, text: "شراكات حكومية وقدرة تنفيذ ضمن صيغ PPP/BOT." },
        { icon: <Leaf className="w-5 h-5" />, text: "نهج إيجابي للمناخ ومتوافق مع أهداف التنمية المستدامة." },
      ],
      metricsTitle: "الإرث_المؤوسسي",
      metrics: [
        { label: "مراكز العمليات", value: "09", desc: "مراكز استراتيجية عبر المناطق الاقتصادية الرئيسية", id: "HUB_SEC" },
        { label: "حجم النشر", value: "550", desc: "مليون دولار أمريكي في التمويل الموجه", id: "VAL_FIN", suffix: "M" },
        { label: "البرامج المدنية", value: "14", desc: "برامج رائدة تحت التفويض المؤسسي", id: "PRG_CIV" },
        { label: "الهدف ألفا", value: "28", desc: "معدل العائد الإقليمي للصمود", id: "ALF_TRG", suffix: "%" },
      ],
      blueprintTitle: "إطار_التنفيذ",
      blueprint: [
        { t: "نشأة البرامج والاستراتيجية العميقة", id: "A01" },
        { t: "تخصيص المخاطر المؤسسية PPP/BOT", id: "A02" },
        { t: "امتثال تدقيق ESMS & MRV", id: "A03" },
        { t: "تعبئة النشر السريع EPC+F", id: "A04" },
        { t: "تمكين المحتوى المحلي والقدرات", id: "A05" },
      ],
      ourStoryTitle: "قصتنا",
      ourStorySubtitle: "الربط بين القارات من خلال التحالفات القابلة للتمويل والتنمية المستدامة",
      ourStoryText:
        "تأسست منظمة AIABASD بناءً على التوافق الاستراتيجي بين أهداف التنمية المستدامة للأمم المتحدة 2030 وأجندة الاتحاد الأفريقي 2063، لسد العجز السنوي الحرج في البنية التحتية البالغ +100 مليار دولار عبر المنطقة الأفريقية والعربية. من خلال توحيد الحكومات السيادية، والمستثمرين المؤسسيين، والشركاء التشغيليين، نحول الممرات الإقليمية ذات الاحتياجات العالية — من غرب إفريقيا إلى الشرق الأوسط — إلى مناطق نمو اقتصادي قابلة للتمويل ومقاومة للتغير المناخي.",
      ourStoryMilestones: [
        { year: "النشأة", title: "تأسيس التحالف المؤسسي", desc: "إنشاء تحالف متعدد السيادات يربط رأس المال العربي بأسواق النمو الإفريقية تحت حوكمة صارمة ESIA/ESMS." },
        { year: "التوسع", title: "11 ممر سيادي", desc: "توسيع التواجد التشغيلي عبر غانا، سيراليون، غامبيا، ساحل العاج، بوركينا فاسو، أنغولا، السودان، مصر، الأردن، سوريا، والسعودية." },
        { year: "التأثير", title: "مشاريع +550M$ والتعافي المدني", desc: "تعبئة الطاقة الخضراء، البنية التحتية الرقمية، إعادة تدوير الأنقاض الدائرية، ومبادرات التعافي الإنساني مثل حماة." }
      ],
    },
    programs: {
      title: "البرامج الرئيسية",
      list: [
        {
          icon: <Heart className="w-6 h-6" />,
          name: "إعادة تأهيل 50 مدرسة و 20 مركزاً صحياً — حماة، سوريا",
          desc:
            "ضمن مبادرة 'فداءً لحماة'، إعادة تأهيل شاملة للمرافق التعليمية والصحية لتوفير بيئات آمنة وكريمة ودعم التعافي المبكر والتنمية المستدامة بالتنسيق مع الشركاء المحليين والدوليين.",
          tags: ["إنساني", "تعليم", "صحة"],
          logo: "/projects/hama-logo.jpg",
          link: "/hama-project",
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "مركز لوجستي وإعماري — العريش",
          desc:
            "مركز إقليمي للإغاثة وإعادة الإعمار: مستودعات (عادي/مبرد)، التجهيز والتعبئة، أسطول النقل، وتيسير الجمارك والتعاقد مع المنظمات.",
          tags: ["إغاثة", "مستودعات", "نقل"],
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "الطاقة الخضراء — محطات شمسية بقدرة 150 ميجاوات+",
          desc:
            "مشاريع طاقة شمسية قابلة للتمويل مع تكامل الشبكة وتجارب التخزين وتمكين المحتوى المحلي؛ هياكل EPC+F مع رقابة مستقلة.",
          tags: ["طاقة", "شمسية", "EPC+F"],
        },
        {
          icon: <Globe2 className="w-6 h-6" />,
          name: "أفريقيا الرقمية — الاتصالات والأمن السيبراني",
          desc:
            "ألياف ضوئية ومحاور بيانات ومنصات حكومية رقمية آمنة لتعزيز الشمول الرقمي في التعليم والصحة والتجارة.",
          tags: ["رقمي", "سيبراني", "بنية"],
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "مدن متكاملة — مناطق صناعية ولوجستية",
          desc:
            "منظومات صناعية ضمن شراكات PPP/BOT مع مستأجرين رئيسيين ومراكز تدريب مهني وبنية مراعية للمناخ.",
          tags: ["PPP", "صناعي", "لوجستي"],
        },
        {
          icon: <Recycle className="w-6 h-6" />,
          name: "إعادة تدوير الأنقاض واستعادة المواد — سوريا",
          desc:
            "معامل صناعية لمعالجة الأنقاض وسحق الخرسانة وتصنيع الطوب البيئي عبر المحافظات السورية المتأثرة لتحويل الردم إلى مواد بناء مستدامة ومؤهلة لإعادة الإعمار الحضري.",
          tags: ["إعادة تدوير", "سوريا", "اقتصاد دائر", "بيئة"],
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "الأمن الغذائي — تصنيع زراعي وسلاسل تبريد",
          desc:
            "سلاسل قيمة متكاملة (الأعلاف، التصنيع، التبريد، التوزيع) مع التتبع والامتثال HACCP/ISO.",
          tags: ["زراعي", "تبريد", "HACCP"],
        },
      ],
    },
    countries: {
      title: "نطاق العمل",
      note: "دول نشطة ودول قيد الإعداد",
      list: ["غانا", "غامبيا", "سيراليون", "بوركينا فاسو", "ساحل العاج", "أنغولا", "الأردن", "مصر", "سوريا", "السودان", "السعودية"],
    },
    governance: {
      title: "الحوكمة والامتثال",
      text:
        "نموذج التنفيذ يتضمن رقابة مستقلة وضمانات صارمة عبر دورة حياة المشروع.",
      pillars: [
        { title: "دراسات الأثر ESIA/ESMS", desc: "إدارة ورصد الأثر البيئي والاجتماعي." },
        { title: "KYC/AML", desc: "تحقق صارم من الأطراف وضوابط مكافحة الفساد." },
        { title: "رقابة مستقلة", desc: "مهندس ومدقق مستقل + قياس وإبلاغ والتحقق (MRV)." },
        { title: "العقود", desc: "نماذج PPP/BOT/EPC+F مع مؤشرات واضحة لأتعاب النجاح." },
      ],
    },
    partners: {
      title: "الشركاء الاستراتيجيون",
      note: "القطاع العام، مؤسسات التمويل، شركات EPC، المستثمرون، وشركاء التشغيل.",
    },
    team: {
      title: "فريقنا",
      note: "القيادة التي تقود التأثير عبر إفريقيا.",
      list: [
        {
          name: "د. محمد عبد المنعم",
          title: "نائب الرئيس",
          bio: "قيادي متميز يتولى التطوير الاستراتيجي الإقليمي، والشراكات السيادية، والحوكمة المؤسسية عبر إفريقيا والشرق الأوسط.",
          image: "/team/mohammed-abdelmoneim.jpg",
        },
        {
          name: "فارس صافي",
          title: "المؤسس المشارك والشريك",
          bio: "رؤية استراتيجية بخبرة واسعة في تطوير البنية التحتية والشراكات الدولية عبر الأسواق الناشئة.",
          image: "/team/faris.jpg",
        },
        {
          name: "زياد شنيكات",
          title: "المؤسس المشارك والشريك",
          bio: "خبير في هيكلة الشراكات وتمويل المشاريع بسجل حافل في برامج البنية التحتية القابلة للتمويل عبر إفريقيا والشرق الأوسط.",
          image: "/team/ziad.jpg",
        },
      ],
    },
    newsroom: {
      title: "الأخبار والتحديثات",
      note: "آخر المستجدات والإعلانات.",
      empty: "أضِف مذكرات التفاهم والزيارات الميدانية والجوائز هنا.",
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "منفتحون على طلبات الحكومات وتفويضات المستثمرين والشراكات التشغيلية.",
      name: "الاسم الكامل",
      email: "البريد الوظيفي",
      org: "الجهة/المؤسسة",
      msg: "كيف يمكن التعاون؟",
      send: "إرسال الاستفسار",
      sent: "تم الإرسال! سنعاود التواصل قريبًا.",
      placeholders: {
        name: "مثال: زياد شنيكات",
        email: "name@company.com",
        org: "شركة / وزارة / منظمة",
        msg: "صف بإيجاز الفرصة والجدول الزمني وأصحاب المصلحة…",
      },
      sidebar: {
        hq: "المقر",
        channels: "القنوات",
      },
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      privacy: "الخصوصية",
      terms: "الشروط",
    },
    testimonials: {
      title: { main: "صوت شركاءنا", highlighted: "المؤسسيين", partner: "الاستراتيجيين" },
      sectionRef: "القسم_07",
      communique: "بلاغ_V.01",
      list: [
        {
          quote: "لقد كان لـ AIABASD دور محوري في ربطنا بشركاء استراتيجيين في جميع أنحاء إفريقيا. خبرتهم في تطوير البنية التحتية المستدامة لا مثيل لها.",
          author: "أحمد الرشيد",
          position: "الرئيس التنفيذي، شركة التجارة العالمية",
          id: "TR-8821"
        },
        {
          quote: "إن تفاني الفريق في التنمية المستدامة وفهمهم العميق للأسواق الإفريقية جعل شراكتنا ناجحة للغاية.",
          author: "سارة منساه",
          position: "مديرة استثمارات غرب إفريقيا",
          id: "TR-8822"
        },
        {
          quote: "فتح العمل مع AIABASD أبواباً لم نكن نعلم بوجودها. شبكتهم وخبرتهم رائعة حقاً.",
          author: "جان بيير دوبوا",
          position: "مؤسس مبادرة الطاقة الخضراء",
          id: "TR-8823"
        }
      ]
    },
    hud: {
      executiveCaucus: "اللجنة_التنفيذية",
      directorate: "المديرية_04",
      leadershipArchitecture: "هندسة_القيادة",
      operationalStatus: "قيد_التشغيل",
      memberClearance: "مستوى_التصريح: ألفا",
      verifiedRoles: "أدوار_موثقة: صحيح",
      establishComm: "بدء_الاتصال",
      voice: "صوت",
      recognition: "اعتراف_موثق",
      governanceStanchion: "هيكل_الحوكمة_03",
      institutionalIntegrity: "النزاهة المؤسسية",
      exploreProtocol: "استكشاف_تفاصيل_البروتوكول",
      accessCharter: "الوصول إلى الميثاق المؤسسي",
      activeStatus: "حالة_نشطة",
      transparencyMandate: "Mandat de Transparence V.03",
      syndicateGrid: "نقابة_06",
      strategicConsortium: "التحالف الاستراتيجي",
      initiateSyndicate: "بروتوكول_بدء_الاشتراك",
      vettedInstitutional: "مؤسسة_موثقة",
      consortiumNote: "تحافظ AIABASD على شبكة عالمية من المتعاونين المؤسسيين المعتمدين والتحالفات الاستراتيجية.",
      intellectualAuthority: "الهيئة الفكرية",
      executive_protocol: "البروتوكول التنفيذي",
      view_full_governance: "عرض الحوكمة الكاملة"
    },
    investor: {
      title: "الوصول إلى المجموعة المؤسسية",
      subtitle: "وصول آمن إلى بيانات الأداء الإقليمي، والولايات الاستراتيجية، ومسارات التدقيق التنفيذي.",
      eyebrow: "مخزن_علاقات_المستثمرين",
      note: "إشارة_مشفرة_TRX_99",
      vaultTitle: "توثيق المخزن",
      vaultSubtitle: "التحقق من الهوية مطلوب للوصول إلى مستوى مجلس الإدارة.",
      emailLabel: "البريد_المؤسسي",
      emailPlaceholder: "executive@institution.org",
      keyLabel: "مفتاح_بروتوكول_الوصول",
      keyPlaceholder: "••••••••••••",
      cta: "بدء_جلسة_التوثيق",
      requestKey: "طلب_مفتاح",
      auditNote: "يتم مراقبة وتدقيق الوصول وفقاً لتفويض الخصوصية المؤسسي السيادي."
    },
    langLabel: "EN",
  },
  fr: {
    metaTitle: "AIABASD — Alliance Africaine Internationale pour les Affaires et le Développement Durable",
    gallery: {
      title: "Galerie",
      subtitle: "Un aperçu de notre impact, nos événements et nos partenariats en Afrique.",
    },
    nav: {
      about: "À propos",
      programs: "Programmes",
      gallery: "Galerie",
      countries: "Pays",
      governance: "Gouvernance",
      team: "Équipe",
      partners: "Partenaires",
      newsroom: "Actualités",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Alliance • PPP • Impact",
      title: "Accélérer la croissance durable en Afrique",
      subtitle:
        "Nous réunissons les gouvernements, les capitaux privés et les opérateurs d'impact pour mettre en œuvre des programmes PPP/BOT finançables dans les domaines de l'énergie, de la logistique, de l'agriculture, des infrastructures numériques et des villes résilientes — conformément aux ODD 2030 et à l'Agenda 2063 de l'UA.",
      ctaPrimary: "Explorer les programmes",
      ctaSecondary: "Devenez partenaire",
    },
    stats: [
      { label: "Projets en pipeline", value: "+550M $" },
      { label: "Emplois créés", value: "10 000+" },
      { label: "Pays engagés", value: "9+" },
      { label: "TRI cible", value: "22–30%" },
    ],
    about: {
      title: "Qui sommes-nous",
      text:
        "L'AIABASD est une alliance multi-pays orchestrant des programmes à fort impact avec une gouvernance robuste (EISE/SGES, KYC/AML, Ingénieur/Auditeur indépendant) et des structures de frais de succès transparentes. Nous mobilisons le capital pour les infrastructures évolutives et la croissance inclusive.",
      bullets: [
        { icon: <ShieldCheck className="w-5 h-5" />, text: "Gouvernance et conformité solides (EISE/SGES, KYC/AML)." },
        { icon: <Handshake className="w-5 h-5" />, text: "Partenariats gouvernementaux et capacité de mise en œuvre PPP/BOT." },
        { icon: <Leaf className="w-5 h-5" />, text: "Approche positive pour le climat et alignée sur les ODD." },
      ],
      metricsTitle: "Héritage_Institutionnel",
      metrics: [
        { label: "Hubs Opérationnels", value: "09", desc: "Centres stratégiques dans les zones économiques majeures", id: "HUB_SEC" },
        { label: "Flux de Déploiement", value: "550", desc: "Millions USD en financement dirigé", id: "VAL_FIN", suffix: "M" },
        { label: "Programmes Civiques", value: "14", desc: "Programmes phares sous mandat institutionnel", id: "PRG_CIV" },
        { label: "Cible Alpha", value: "28", desc: "Taux critique régional pour la résilience", id: "ALF_TRG", suffix: "%" },
      ],
      blueprintTitle: "Cadre_d_Exécution",
      blueprint: [
        { t: "Origination de programme et stratégie approfondie", id: "A01" },
        { t: "Allocation des risques institutionnels PPP/BOT", id: "A02" },
        { t: "Conformité d'audit ESMS & MRV", id: "A03" },
        { t: "Mobilisation et déploiement rapide EPC+F", id: "A04" },
        { t: "Contenu local et renforcement des capacités", id: "A05" },
      ],
      ourStoryTitle: "Notre Histoire",
      ourStorySubtitle: "Rapprocher les Continents grâce à des Alliances Financables & le Développement Durable",
      ourStoryText:
        "Fondée sur la convergence stratégique des ODD 2030 des Nations Unies et de l'Agenda 2063 de l'Union Africaine, l'AIABASD a été créée pour combler le déficit annuel d'infrastructures de plus de 100 milliards de dollars en Afrique et dans la région arabe. En unissant gouvernements souverains, investisseurs institutionnels et partenaires opérationnels, nous transformons les corridors régionaux stratégiques en zones de croissance banquables et résilientes au climat.",
      ourStoryMilestones: [
        { year: "Origine", title: "Formation de l'Alliance Institutionnelle", desc: "Création d'une coalition multi-souveraine reliant le capital arabe aux marchés de croissance africains sous une gouvernance rigoureuse EISE/SGES." },
        { year: "Expansion", title: "11 Corridors Souverains", desc: "Expansion de la présence opérationnelle au Ghana, en Sierra Leone, en Gambie, en Côte d'Ivoire, au Burkina Faso, en Angola, au Soudan, en Égypte, en Jordanie, en Syrie et en Arabie Saoudite." },
        { year: "Impact", title: "Pipeline de +550M $ & Relèvement Civique", desc: "Mobilisation de l'énergie verte, des infrastructures numériques, du recyclage circulaire des décombres et des initiatives humanitaires phares comme Hama." }
      ],
    },
    programs: {
      title: "Programmes phares",
      list: [
        {
          icon: <Heart className="w-6 h-6" />,
          name: "Réhabilitation de 50 écoles et 20 centres de santé — Hama, Syrie",
          desc:
            "Dans le cadre de l'initiative 'Fida'an pour Hama', réhabilitation complète des établissements d'enseignement et de santé pour fournir des environnements sûrs et dignes et soutenir le relèvement précoce et le développement durable en coordination avec les partenaires locaux et internationaux.",
          tags: ["Humanitaire", "Éducation", "Santé"],
          logo: "/projects/hama-logo.jpg",
          link: "/hama-project",
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "Hub logistique et de reconstruction — Al-Arich",
          desc:
            "Hub logistique humanitaire régional servant la reconstruction de Gaza : entreposage (ambiant/froid), assemblage, opérations de flotte, facilitation douanière et contrats ONG.",
          tags: ["Humanitarian", "Entreposage", "Flotte"],
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "Énergie verte — Solaire à grande échelle (150 MW+)",
          desc:
            "Programmes solaires PV finançables avec intégration réseau, projets pilotes de stockage et activation du contenu local ; structures EPC+F avec suivi indépendant.",
          tags: ["Énergie", "Solaire", "EPC+F"],
        },
        {
          icon: <Globe2 className="w-6 h-6" />,
          name: "Afrique numérique — Télécommunications et cybersécurité",
          desc:
            "Fibre dorsale, centres de données et plateformes e-gouvernement sécurisées pour débloquer l'inclusion numérique dans l'éducation, la santé et le commerce.",
          tags: ["Numérique", "Cyber", "Dorsale"],
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "Villes intégrées — Zones industrielles et logistiques",
          desc:
            "Écosystèmes industriels PPP/BOT avec locataires principaux, centres de compétences/EFTP et services publics résilients au climat pour la croissance axée sur l'exportation.",
          tags: ["PPP", "Industriel", "Logistique"],
        },
        {
          icon: <Recycle className="w-6 h-6" />,
          name: "Recyclage des Décombres & Économie Circulaire — Syrie",
          desc:
            "Usines industrielles de traitement des gravats, broyage de béton et fabrication d'éco-briques dans les gouvernorats syriens touchés pour transformer les débris en matériaux de construction durables et certifiés.",
          tags: ["Recyclage", "Syrie", "Économie Circulaire", "Environnement"],
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "Sécurité alimentaire — Transformation agroalimentaire et chaîne frigorifique",
          desc:
            "Chaînes de valeur intégrées (aliments, transformation, chaîne frigorifique, distribution) avec traçabilité et conformité HACCP/ISO.",
          tags: ["Agro", "Chaîne frigorifique", "HACCP"],
        },
      ],
    },
    countries: {
      title: "Où nous opérons",
      note: "Géographies actives et en pipeline",
      list: ["Ghana", "Gambie", "Sierra Leone", "Burkina Faso", "Côte d'Ivoire", "Angola", "Jordanie", "Égypte", "Syrie", "Soudan", "Arabie saoudite"],
    },
    governance: {
      title: "Gouvernance et conformité",
      text:
        "Notre modèle de mise en œuvre intègre une surveillance indépendante et des garanties rigoureuses tout au long du cycle de vie du projet.",
      pillars: [
        { title: "EISE et SGES", desc: "Gestion et suivi de l'impact environnemental et social." },
        { title: "KYC/AML", desc: "Vérification rigoureuse des contreparties et contrôles anti-corruption." },
        { title: "Surveillance indépendante", desc: "Ingénieur indépendant et auditeur ; MRV et cartographie RACI." },
        { title: "Contrats", desc: "Modèles PPP/BOT/EPC+F avec indicateurs clairs de frais de succès." },
      ],
    },
    team: {
      title: "Notre équipe",
      note: "Leadership et experts créant un impact en Afrique.",
      list: [
        {
          name: "Dr. Mohammed Abdel Moneim",
          title: "Vice-Président",
          bio: "Dirigeant éminent responsable du développement stratégique régional, des partenariats souverains et de la gouvernance institutionnelle en Afrique et au Moyen-Orient.",
          image: "/team/mohammed-abdelmoneim.jpg",
        },
        {
          name: "Faris Safi",
          title: "Co-fondateur et associé",
          bio: "Visionnaire stratégique avec une vaste expérience en développement d'infrastructures et partenariats internationaux sur les marchés émergents.",
          image: "/team/faris.jpg",
        },
        {
          name: "Ziad Shneikat",
          title: "Co-fondateur et associé",
          bio: "Expert en structuration PPP et financement de projets avec un bilan éprouvé dans les programmes d'infrastructures finançables en Afrique et au Moyen-Orient.",
          image: "/team/ziad.jpg",
        },
      ],
    },
    partners: {
      title: "Partenaires stratégiques",
      note: "Secteur public, IFD, EPC, investisseurs et partenaires opérationnels.",
    },
    newsroom: {
      title: "Actualités et mises à jour",
      note: "Derniers faits saillants et annonces.",
      empty: "Ajoutez vos derniers protocoles d'accord, visites sur le terrain et prix ici.",
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Ouvert aux demandes gouvernementales, mandats d'investisseurs et partenariats opérationnels.",
      name: "Nom complet",
      email: "Email professionnel",
      org: "Organisation",
      msg: "Comment pouvons-nous collaborer ?",
      send: "Envoyer la demande",
      sent: "Envoyé ! Nous vous recontacterons bientôt.",
      placeholders: {
        name: "ex., Ziad Shneikat",
        email: "nom@entreprise.com",
        org: "Entreprise / Ministère / ONG",
        msg: "Décrivez brièvement l'opportunité, le calendrier et les parties prenantes…",
      },
      sidebar: {
        hq: "Siège de l'Alliance",
        channels: "Canaux",
      },
    },
    footer: {
      rights: "Tous droits réservés.",
      privacy: "Confidentialité",
      terms: "Conditions",
    },
    testimonials: {
      title: { main: "La voix de nos", highlighted: "Institutionnel", partner: "Partenaires" },
      sectionRef: "SECTION_07",
      communique: "COMMUNIQUE_V.01",
      list: [
        {
          quote: "AIABASD a joué un rôle clé en nous connectant avec des partenaires stratégiques à travers l'Afrique. Leur expertise en développement d'infrastructures durables est inégalée.",
          author: "Ahmed Al-Rashid",
          position: "PDG, Global Trading Corp",
          id: "TR-8821"
        },
        {
          quote: "Le dévouement de l'équipe au développement durable et sa profonde compréhension des marchés africains ont fait de notre partenariat un succès.",
          author: "Sarah Mensah",
          position: "Directrice, Investissements Afrique de l'Ouest",
          id: "TR-8822"
        },
        {
          quote: "Travailler avec AIABASD a ouvert des portes que nous ignorions. Leur réseau et leur expertise sont remarquables.",
          author: "Jean-Pierre Dubois",
          position: "Fondateur, Green Energy Initiative",
          id: "TR-8823"
        }
      ]
    },
    hud: {
      executiveCaucus: "CAUCUS_EXECUTIF",
      directorate: "DIRECTORAT_04",
      leadershipArchitecture: "ARCHITECTURE_LEADERSHIP",
      operationalStatus: "OPÉRATIONNEL",
      memberClearance: "ACCÈS: ALPHA",
      verifiedRoles: "RÔLES_VÉRIFIÉS: VRAI",
      establishComm: "ÉTABLIR_COMMUNICATION",
      voice: "VOIX",
      recognition: "RECONNAISSANCE_VÉRIFIÉE",
      governanceStanchion: "PILLIER_GOUVERNANCE_03",
      institutionalIntegrity: "Intégrité Institutionnelle",
      exploreProtocol: "DÉTAIL_PROTOCOLE",
      accessCharter: "Accéder à la Charte Institutionnelle",
      activeStatus: "STATUT_ACTIF",
      transparencyMandate: "MANDAT_TRANSPARENCE_V.03",
      syndicateGrid: "SYNDICAT_06",
      strategicConsortium: "Consortium Stratégique",
      initiateSyndicate: "PROTOCOLE_SYNDICAT_INITIÉ",
      vettedInstitutional: "INSTITUTION_AGRÉÉE",
      consortiumNote: "AIABASD maintient un réseau mondial de collaborateurs institutionnels agréés et d'alliances stratégiques.",
      intellectualAuthority: "Autorité Intellectuelle",
      executive_protocol: "Protocole Exécutif",
      view_full_governance: "Voir la Gouvernance Complète"
    },
    investor: {
      title: "Accéder au Cluster Institutionnel",
      subtitle: "Accès sécurisé aux données de performance régionale, aux mandats stratégiques et aux pistes d'audit exécutif.",
      eyebrow: "COFFRE_RELATIONS_INVESTISSEURS",
      note: "SIGNAL_CHIFFRÉ_TRX_99",
      vaultTitle: "Authentification du Coffre",
      vaultSubtitle: "Vérification d'identité requise pour l'accès au niveau du conseil d'administration.",
      emailLabel: "EMAIL_INSTITUTIONNEL",
      emailPlaceholder: "executive@institution.org",
      keyLabel: "CLÉ_PROTOCOLE_ACCÈS",
      keyPlaceholder: "••••••••••••",
      cta: "INITIER_SESSION_AUTH",
      requestKey: "DEMANDER_CLÉ",
      auditNote: "L'accès est surveillé et audité conformément au mandat de confidentialité institutionnelle souveraine."
    },
    langLabel: "FR",
  },
};
