import { ShieldCheck, Handshake, Leaf, Building2, Globe2, Heart, Recycle } from "lucide-react";
import { ReactNode } from "react";

export interface Content {
  metaTitle: string;
  nav: {
    about: string;
    programs: string;
    gallery: string;
    visions: string;
    countries: string;
    governance: string;
    team: string;
    partners: string;
    newsroom: string;
    contact: string;
    projects: string;
    investorAccess: string;
    services: string;
    intelligence: string;
    match: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    eyebrow: string;
    emptyTitle: string;
    emptyText: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
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
    sectionEyebrow: string;
    sectionNote: string;
    flagshipLabel: string;
    exploreLabel: string;
    countLabel: string;
    pipelineCta: string;
    list: {
      icon: ReactNode;
      name: string;
      desc: string;
      tags: string[];
      logo?: string;
      link?: string;
      slug: string;
      status: string;
      detail: {
        overview: string;
        highlights: { title: string; desc: string }[];
      };
    }[];
  };
  programDetail: {
    backLabel: string;
    eyebrow: string;
    overviewLabel: string;
    highlightsLabel: string;
    statusLabel: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  countries: {
    title: string;
    note: string;
    list: string[];
    eyebrow: string;
    indexTitle: string;
    corridorsLabel: string;
    activeLabel: string;
    pipelineLabel: string;
    projectsLabel: string;
    mapTitle: string;
    mapCorridors: string;
    territoryLabel: string;
    globalViewLabel: string;
    regionalViewLabel: string;
    activeRegionLabel: string;
    capitalLabel: string;
    presenceLabel: string;
    mapHint: string;
    regions: {
      westAfrica: string;
      centralAfrica: string;
      northEastAfrica: string;
      northAfrica: string;
      middleEast: string;
    };
  };
  governance: {
    title: string;
    pillarLabel: string;
    frameworkLabel: string;
    text: string;
    pillars: { title: string; desc: string }[];
  };
  partners: {
    title: string;
    note: string;
    vettedLabel: string;
    networkLabel: string;
  };
  team: {
    title: string;
    note: string;
    profileLabel: string;
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
    eyebrow: string;
    newsletterTitle: string;
    newsletterText: string;
    newsletterPlaceholder: string;
    newsletterCta: string;
    newsletterSuccess: string;
    newsletterError: string;
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
    eyebrow: string;
    formTitle: string;
    hqTitle: string;
    london: string;
    uk: string;
    dakar: string;
    senegal: string;
    submitting: string;
    successNote: string;
    error: string;
    reassure: string;
    anotherLabel: string;
    bookingTitle: string;
    bookingNote: string;
    bookingCta: string;
    audienceLabel: string;
    audienceOptions: string[];
    sectorLabel: string;
    regionLabel: string;
    ticketLabel: string;
    sectorOptions: string[];
    regionOptions: string[];
    ticketOptions: string[];
    placeholders: {
      name: string;
      email: string;
      org: string;
      msg: string;
    };
    sidebar: {
      hq: string;
      channels: string;
      emailGeneralLabel: string;
      emailSecretariatLabel: string;
      emailFieldOpsLabel: string;
    };
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
    navTitle: string;
    engagementTitle: string;
    updatesTitle: string;
    backToTopLabel: string;
    links: {
      about: string;
      countries: string;
      governance: string;
      partners: string;
      newsroom: string;
      contact: string;
      services: string;
      intelligence: string;
      match: string;
    };
  };
  testimonials: {
    title: { main: string; highlighted: string; partner: string };
    controls: { prev: string; next: string; pause: string; resume: string; pagination: string };
    sectionRef: string;
    communique: string;
    eyebrow: string;
    subtitle: string;
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
    rangeNote: string;
    backLabel: string;
    secureLabel: string;
    verifying: string;
    footerLine: string;
    toastSuccess: string;
    toastQueued: string;
    toastFailed: string;
    toastNetwork: string;
    authFailed: string;
    authNetwork: string;
    requestAccessTitle: string;
    requestAccessNote: string;
    requestCta: string;
    organizationLabel: string;
    roleLabel: string;
    partyTypeLabel: string;
    interestLabel: string;
    targetProjectLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    organizationPlaceholder: string;
    rolePlaceholder: string;
    partyTypePlaceholder: string;
    interestPlaceholder: string;
    targetProjectPlaceholder: string;
    privacyConsentLabel: string;
    privacyConsentText: string;
    privacyLinkLabel: string;
    accessStartEventLabel: string;
  };

  vault: {
    title: string;
    subtitle: string;
    eyebrow: string;
    docLabel: string;
    empty: string;
    emptyNote: string;
    logout: string;
    backLabel: string;
    sessionNote: string;
    restrictedNote: string;
    fetchFailed: string;
  };

  consent: {
    label: string;
    message: string;
    accept: string;
    decline: string;
  };

  pipeline: {
    title: string;
    eyebrow: string;
    note: string;
    filterAll: string;
    filterCountry: string;
    filterSector: string;
    filterStatus: string;
    multiRegion: string;
    stageTitle: string;
    stages: [string, string, string];
    sdgTitle: string;
    sdgNote: string;
    programsLabel: string;
    corridorsLabel: string;
  };
  corridor: {
    backLabel: string;
    regionLabel: string;
    statusLabel: string;
    programsTitle: string;
    regionalNote: string;
    capitalLabel: string;
    verifiedLabel: string;
  };
  teamDetail: {
    backLabel: string;
    roleLabel: string;
    bioLabel: string;
    contactCta: string;
  };
  governanceDetail: {
    backLabel: string;
    overviewLabel: string;
    practicesLabel: string;
    requestLabel: string;
    requestNote: string;
  };
  engagements: {
    title: string;
    empty: string;
    dateLabel: string;
    typeLabel: string;
    locationLabel: string;
  };
  visions: {
    title: string;
    eyebrow: string;
    heroStatement: string;
    heroNote: string;
    missionTitle: string;
    missionStatement: string;
    pillarsTitle: string;
    pillars: { title: string; desc: string; code: string }[];
    alignmentTitle: string;
    alignmentNote: string;
    sdgFrame: string;
    agendaFrame: string;
    horizonsTitle: string;
    horizonsNote: string;
    horizons: { sector: string; vision: string }[];
    leadershipTitle: string;
    leadershipNote: string;
    leadershipCta: string;
  };
  skipToContent: string;
  langLabel: string;
}

export const BRAND = {
  primaryFrom: "#5a1f2e", // burgundy from logo
  primaryTo: "#f2a007", // gold from logo
  accent: "#f59e0b", // amber accent
  dark: "#0f1225",
  light: "#f8f7fc",
};

export const gradient = `bg-[linear-gradient(135deg,${BRAND.primaryFrom},${BRAND.primaryTo})]`;

export const COPY: Record<"en" | "ar" | "fr", Content> = {
  en: {
    metaTitle: "AIABASD — African International Alliance for Business & Sustainable Development",
    gallery: {
      title: "Gallery",
      subtitle: "A glimpse into our impact, events, and partnerships across Africa.",
      eyebrow: "Media & Visual Gallery",
      emptyTitle: "Our gallery is being curated",
      emptyText: "Authentic photography from our programs, events, and field missions will be published here as it becomes available.",
    },
    nav: {
      about: "About",
      programs: "Programs",
      gallery: "Gallery",
      visions: "Visions",
      countries: "Countries",
      governance: "Governance",
      team: "Team",
      partners: "Partners",
      newsroom: "Newsroom",
      contact: "Contact",
       projects: "Projects & Opportunities",
       investorAccess: "Investor Access",
       services: "Services",
       intelligence: "Intelligence",
       match: "Partner Matching",
    },
    hero: {
      eyebrow: "Alliance • PPP • Impact",
      title: "Accelerating sustainable growth across Africa",
      subtitle:
        "We convene governments, private capital, and impact operators to deliver bankable PPP/BOT programs across energy, logistics, agriculture, digital infrastructure, and resilient cities — aligned with SDG 2030 and AU Agenda 2063.",
      ctaPrimary: "Explore Programs",
      ctaSecondary: "Partner with us",
    },
    about: {
      title: "Who we are",
      text:
        "The UN estimates a $4 trillion annual financing gap between developing countries and the Sustainable Development Goals — and traditional aid alone cannot close it. AIABASD exists for exactly this gap: a multi-country alliance that connects governments, private capital, and operating partners into bankable PPP/BOT programs — energy, logistics, agriculture, digital infrastructure, and resilient cities — governed by ESIA/ESMS safeguards, KYC/AML screening, independent engineers and auditors, and success fees tied to verified milestones.",
      bullets: [
        { icon: <ShieldCheck className="w-5 h-5" />, text: "Strong governance & compliance (ESIA/ESMS, KYC/AML)." },
        { icon: <Handshake className="w-5 h-5" />, text: "Government partnerships & PPP/BOT delivery capacity." },
        { icon: <Leaf className="w-5 h-5" />, text: "Climate-positive, SDG-aligned development approach." },
      ],
      metricsTitle: "Institutional_Legacy",
      metrics: [
        { label: "Operational Hubs", value: "09", desc: "Strategic centers across major economic zones", id: "HUB_SEC" },
        { label: "Directed Pipeline", value: "550", desc: "USD Millions in directed financing", id: "VAL_FIN", suffix: "M" },
        { label: "Civic Programs", value: "07", desc: "Flagship programs under institutional mandate", id: "PRG_CIV" },
        { label: "Jobs Enabled", value: "10,000+", desc: "Employment across active delivery corridors", id: "EMP_ENG" },
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
        "Africa invests roughly 4% of its GDP in infrastructure against 14% in China, and the African Development Bank estimates the continent\u2019s annual infrastructure financing gap at up to $170 billion — a shortfall the Bank calculates is costing an estimated 2 percentage points of GDP growth every year. Founded at the convergence of the UN SDG 2030 Agenda and African Union Agenda 2063, AIABASD was established to convert that deficit into mandate: uniting sovereign governments, institutional investors, and operating partners to turn high-need regional corridors — from West Africa to the Middle East — into bankable, climate-resilient growth zones.",
      ourStoryMilestones: [
        { year: "Origin", title: "Institutional Alliance Formation", desc: "Established multi-sovereign coalition bridging Arab capital with African growth markets under strict ESIA/ESMS governance." },
        { year: "Expansion", title: "11 Sovereign Corridors", desc: "Expanded operational presence across Ghana, Sierra Leone, Gambia, Ivory Coast, Burkina Faso, Angola, Sudan, Egypt, Jordan, Syria, and Saudi Arabia." },
        { year: "Impact", title: "+$550M Pipeline & Civic Recovery", desc: "Mobilized green energy, digital infrastructure, circular debris recycling, and flagship humanitarian recovery initiatives like Hama." }
      ],
    },
    programs: {
      title: "Flagship programs",
      sectionEyebrow: "Sovereign & Institutional Initiatives",
      sectionNote: "Bankable public-private partnership models (PPP/BOT/EPC+F) designed for long-term regional resilience and economic development.",
      flagshipLabel: "Flagship Initiative",
      exploreLabel: "Explore Project Blueprint",
      countLabel: "PROGRAMS",
      pipelineCta: "PIPELINE // EXPLORER",

      list: [
        {
          icon: <Heart className="w-6 h-6" />,
          name: "Rehabilitation of 50 Schools and 20 Health Centers — Hama, Syria",
          desc:
            "Under the 'Fida'an for Hama' initiative, comprehensive rehabilitation of educational and healthcare facilities to provide safe, dignified environments and support early recovery and sustainable development in coordination with local and international partners.",
          tags: ["Humanitarian", "Education", "Healthcare"],
          logo: "/projects/hama-logo.jpg",
          link: "/hama-project",
          slug: "hama-rehabilitation",
          status: "Active",
          detail: {
            overview: "The Fida'an for Hama initiative is AIABASD's flagship humanitarian mandate: the full structural rehabilitation of 50 schools and 20 health centers across Hama Governorate, Syria. The program anchors early recovery by restoring the civic infrastructure communities depend on, executed with independent engineering oversight and coordination with local and international partners.",
            highlights: [
              { title: "Educational assets", desc: "50 school campuses rebuilt to grade-A structural standards." },
              { title: "Clinical network", desc: "20 health centers restored with resilient life-support systems." },
              { title: "Community reach", desc: "An estimated 100,000+ lives anchored by restored services." },
            ],
          },
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "Logistics & Reconstruction Hub — Al‑Arish",
          desc:
            "Regional humanitarian logistics hub serving Gaza reconstruction: warehousing (ambient/cold), kitting, fleet ops, customs facilitation, and NGO contracting.",
          tags: ["Humanitarian", "Warehousing", "Fleet"],
          slug: "al-arish-hub",
          status: "In development",
          detail: {
            overview: "A regional logistics and reconstruction hub in Al-Arish positioned to serve Gaza rebuilding efforts: ambient and cold-chain warehousing, kitting and fleet operations, customs facilitation, and contracting channels for NGOs and donors requiring dependable corridor capacity.",
            highlights: [
              { title: "Warehousing", desc: "Ambient and cold-storage capacity for humanitarian and reconstruction cargo." },
              { title: "Corridor services", desc: "Customs facilitation, kitting, and fleet operations." },
              { title: "NGO-ready", desc: "Contracting and servicing designed around humanitarian operators." },
            ],
          },
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "Green Energy — Utility‑Scale Solar (150MW+)",
          desc:
            "Bankable solar PV programs with grid integration, storage pilots, and local content enablement; EPC+F structures with independent monitoring.",
          tags: ["Energy", "Solar", "EPC+F"],
          slug: "green-energy",
          status: "Pipeline",
          detail: {
            overview: "A pipeline of utility-scale solar PV programs exceeding 150MW across target markets, structured as bankable EPC+F transactions with grid integration studies, storage pilots, and local-content participation. Independent engineers monitor delivery against contract milestones.",
            highlights: [
              { title: "Scale", desc: "150MW+ of planned utility-scale solar capacity." },
              { title: "Bankable structure", desc: "EPC+F contracting with independent monitoring." },
              { title: "Local content", desc: "Local manufacturing and workforce participation." },
            ],
          },
        },
        {
          icon: <Globe2 className="w-6 h-6" />,
          name: "Digital Africa — Telecom & Cyber Infrastructure",
          desc:
            "Backbone fiber, data centers, and secure e‑gov platforms to unlock digital inclusion across education, health, and commerce.",
          tags: ["Digital", "Cyber", "Backbone"],
          slug: "digital-africa",
          status: "Pipeline",
          detail: {
            overview: "National and cross-border digital infrastructure: backbone fiber, data centers, and secure e-government platforms. The program targets digital inclusion in education, health, and commerce, with cybersecurity designed in from the start rather than added later.",
            highlights: [
              { title: "Connectivity", desc: "Backbone fiber linking underserved regions." },
              { title: "Data infrastructure", desc: "Data centers with sovereign hosting options." },
              { title: "Secure platforms", desc: "E-government services with embedded cyber standards." },
            ],
          },
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "Integrated Cities — Industrial & Logistics Zones",
          desc:
            "PPP/BOT industrial ecosystems with anchor tenants, skills/TVET hubs, and climate‑resilient utilities for export‑led growth.",
          tags: ["PPP", "Industrial", "Logistics"],
          slug: "integrated-cities",
          status: "Pipeline",
          detail: {
            overview: "Integrated industrial and logistics zones developed under PPP/BOT structures: anchor tenants, skills and TVET hubs, and climate-resilient utilities, designed to convert regional demand into export-led growth and durable employment.",
            highlights: [
              { title: "Anchor ecosystem", desc: "Anchor tenants secured before construction mobilizes." },
              { title: "Skills pipeline", desc: "TVET hubs aligned to zone industries." },
              { title: "Resilient utilities", desc: "Power, water, and waste built for climate stress." },
            ],
          },
        },
        {
          icon: <Recycle className="w-6 h-6" />,
          name: "Debris Recycling & Circular Material Recovery — Syria",
          desc:
            "Industrial rubble processing, concrete crushing, and eco-brick manufacturing plants across affected Syrian governorates to transform conflict rubble into certified sustainable building materials for urban recovery.",
          tags: ["Recycling", "Syria", "Circular Economy", "Environment"],
          slug: "debris-recycling",
          status: "In development",
          detail: {
            overview: "Industrial-scale circular recovery for Syria's reconstruction: rubble processing and concrete crushing plants that convert conflict debris into certified, sustainable building materials — reducing reconstruction input costs while creating local manufacturing jobs.",
            highlights: [
              { title: "Material recovery", desc: "Rubble processed into certified eco-bricks and aggregates." },
              { title: "Local jobs", desc: "Processing plants staffed and managed locally." },
              { title: "Circular supply", desc: "Reconstruction fed by sustainable domestic inputs." },
            ],
          },
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "Food Security — Agro Processing & Cold Chain",
          desc:
            "End‑to‑end value chains (feed, processing, cold chain, distribution) with traceability and HACCP/ISO compliance.",
          tags: ["Agro", "Cold Chain", "HACCP"],
          slug: "food-security",
          status: "Pipeline",
          detail: {
            overview: "End-to-end agro value chains — feed production, processing, cold-chain logistics, and distribution — with full traceability and HACCP/ISO compliance. The program reduces post-harvest loss and stabilizes regional food supply.",
            highlights: [
              { title: "Value chain", desc: "Feed, processing, cold chain, and distribution integrated." },
              { title: "Compliance", desc: "HACCP/ISO-certified operations with traceability." },
              { title: "Food resilience", desc: "Reduced post-harvest loss and stabilized supply." },
            ],
          },
        },
      ],
    },
    programDetail: {
      backLabel: "All Programs",
      eyebrow: "Flagship Program",
      overviewLabel: "Program Overview",
      highlightsLabel: "Key Elements",
      statusLabel: "Status",
      ctaTitle: "Partner on this program",
      ctaSubtitle: "Discuss mandates, co-financing, or operating roles with our team.",
      ctaButton: "Send an inquiry",
    },
    countries: {
      title: "Where we operate",
      note: "Active & pipeline geographies",
      list: ["Ghana", "The Gambia", "Sierra Leone", "Burkina Faso", "Côte d'Ivoire", "Angola", "Jordan", "Egypt", "Syria", "Sudan", "Saudi Arabia"],
      eyebrow: "Geographic Coverage",
      mapTitle: "Sovereign Infrastructure Map",
      mapCorridors: "{n} Sovereign Member Corridors",
      territoryLabel: "Territory:",
      globalViewLabel: "Global Map",
      regionalViewLabel: "Regional Focus",
      activeRegionLabel: "Active Region",
      capitalLabel: "Capital City",
      presenceLabel: "Institutional Presence",
      mapHint: "Hover or select a sovereign territory to inspect regional corridor operations.",
      regions: {
        westAfrica: "West Africa",
        centralAfrica: "Central Africa",
        northEastAfrica: "North/East Africa",
        northAfrica: "North Africa",
        middleEast: "Middle East",
      },

      indexTitle: "Member Countries & Corridors",
      corridorsLabel: "Active Regional Corridors",
      activeLabel: "Active",
      pipelineLabel: "Pipeline",
      projectsLabel: "Programs",

    },
    governance: {
      title: "Governance & compliance",
      pillarLabel: "Pillar",
      frameworkLabel: "FRAMEWORK //",
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
      vettedLabel: "Vetted & Authorized Strategic Institutional Partners",
      networkLabel: "AIABASD Global Consortium Network",

    },
    team: {
      title: "Our team",
      note: "Leadership driving impact across Africa.",
      profileLabel: "PROFILE //",
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
      empty: "Announcements, partnership protocols, and field updates will be published here.",
      eyebrow: "Press & Insights",
      newsletterTitle: "Subscribe to Institutional Disclosures",
      newsletterText: "Receive executive updates, development reports, and partnership announcements directly.",
      newsletterPlaceholder: "your.email@institution.org",
      newsletterCta: "Subscribe",
      newsletterSuccess: "Subscribed — thank you.",
      newsletterError: "Subscription failed. Please try again.",
    },
    contact: {
      title: "Get in touch",
      subtitle: "Open to government requests, investor mandates, and operating partnerships.",
      name: "Full name",
      email: "Work email",
      org: "Organization",
      msg: "How can we collaborate?",
      send: "Send inquiry",
      sent: "Inquiry Submitted",
      eyebrow: "Executive Liaison",
      formTitle: "Send Executive Inquiry",
      hqTitle: "Global Headquarters & Contacts",
      london: "London Headquarters",
      uk: "United Kingdom",
      dakar: "Dakar Regional Secretariat",
      senegal: "Senegal",
      submitting: "Submitting Inquiry…",
      successNote: "Your message has been received securely. Reference: {ref}",
      reassure: "Submissions reach our partnerships team directly; a partner typically responds within two business days.",
      anotherLabel: "SEND ANOTHER INQUIRY",
      bookingTitle: "Book a direct meeting",
      bookingNote: "Skip the queue — pick a slot with the partnerships team.",
      bookingCta: "OPEN CALENDAR",

      error: "Submission failed. Please try again or email contact@aiabasd.org",
      audienceLabel: "I am enquiring as",
      audienceOptions: ["Government / Municipal", "Investor / DFI", "EPC / Operating partner", "NGO / Development agency", "Press / Research"],
      sectorLabel: "Sector of interest",
      regionLabel: "Region of interest",
      ticketLabel: "Indicative engagement scale",
      sectorOptions: ["Energy", "Logistics & corridors", "Agriculture & food security", "Digital infrastructure", "Urban development", "Circular economy", "Humanitarian facilities"],
      regionOptions: ["West Africa", "East Africa", "North Africa", "Levant", "Gulf", "Multi-region"],
      ticketOptions: ["Under USD 10M", "USD 10M–50M", "USD 50M–250M", "Above USD 250M", "To be defined"],
      placeholders: {
        name: "e.g., Ziad Shneikat",
        email: "name@company.com",
        org: "Company / Ministry / NGO",
        msg: "Briefly describe the opportunity, timeline, and stakeholders…",
      },
      sidebar: {
        hq: "Alliance Headquarters",
        channels: "Channels",
        emailGeneralLabel: "General inquiries",
        emailSecretariatLabel: "General Secretariat",
        emailFieldOpsLabel: "Field Operations",
      },
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      navTitle: "Navigation",
      engagementTitle: "Engagement",
      updatesTitle: "Updates",
      backToTopLabel: "Back to top",
       links: {
        about: "About AIABASD",
        countries: "Country Coverage",
        governance: "Governance & Ethics",
        partners: "Partner Network",
        newsroom: "Press & Newsroom",
         contact: "Executive Contact",
         services: "Commercial Services",
         intelligence: "Market Intelligence",
         match: "Partner Matching",
      },
    },
    testimonials: {
      title: { main: "Voice of our", highlighted: "Institutional", partner: "Partners" },
      controls: { prev: "Previous testimonial", next: "Next testimonial", pause: "Pause testimonial rotation", resume: "Resume testimonial rotation", pagination: "Testimonial pagination" },
      eyebrow: "Endorsements & Leadership",
      subtitle: "Direct perspectives from sovereign partners, institutional investors, and regional development directors.",

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
      auditNote: "Access is monitored and audited in accordance with the sovereign institutional privacy mandate.",
       rangeNote: "Project and program economics are not published here. Any commercial information is shared only when verified, approved, and appropriate for the institution.",
      backLabel: "Return to Main Site",
      secureLabel: "Secure Investor Access",
      verifying: "Verifying…",
      footerLine: "AIABASD Executive Investor Network.",
      toastSuccess: "Access request submitted.",
      toastQueued: "Institutional verification queued for directorial review.",
      toastFailed: "Submission failed. Please try again.",
      toastNetwork: "Network error during verification.",
      authFailed: "Invalid email or access key.",
      authNetwork: "Network error during authentication.",
      requestAccessTitle: "No access key?",
       requestAccessNote: "Verified institutions may request vault credentials. Access is issued after directorial review — never self-serve.",
       requestCta: "REQUEST ACCESS",
       organizationLabel: "ORGANIZATION",
       roleLabel: "ROLE",
       partyTypeLabel: "PARTY TYPE",
       interestLabel: "AREA OF INTEREST",
       targetProjectLabel: "TARGET PROJECT",
       messageLabel: "MESSAGE",
       messagePlaceholder: "Tell us what access or project context you are seeking.",
       organizationPlaceholder: "Institution or company",
       rolePlaceholder: "Role or mandate",
       partyTypePlaceholder: "Investor, public institution, operator, or other",
       interestPlaceholder: "Project review, data room, partnership, or other",
       targetProjectPlaceholder: "Project or portfolio reference (optional)",
       privacyConsentLabel: "PRIVACY / PROCESSING CONSENT",
       privacyConsentText: "I consent to AIABASD processing these details to review and respond to this access request.",
       privacyLinkLabel: "Read the privacy notice",
       accessStartEventLabel: "ACCESS_REQUEST_START"
    },
    vault: {
      title: "Investor Data Room",
      subtitle: "Documents released to verified institutions under confidentiality.",
      eyebrow: "RESTRICTED_ARCHIVE",
      docLabel: "DOCUMENTS_ON_FILE",
      empty: "No documents published yet.",
      emptyNote: "The vault is provisioned. Documents appear here as they are released by the General Secretariat.",
      logout: "END SESSION",
      backLabel: "Return to authentication",
      sessionNote: "Session valid for 8 hours. Access is monitored and audited.",
      restrictedNote: "Materials are confidential. Redistribution without written authorization is prohibited.",
      fetchFailed: "Could not load the document index. Please try again."
    },
    consent: {
      label: "Analytics consent",
      message: "This site measures anonymous, aggregate pageviews — no cookies, no identifiers, no personal data. May we count your visit?",
      accept: "ACCEPT",
      decline: "DECLINE"
    },
    pipeline: {
      title: "Program Intelligence",
      eyebrow: "PIPELINE_EXPLORER",
      note: "The Alliance's live program portfolio — filter by corridor, sector, and delivery stage. All figures are owner-verified.",
      filterAll: "All",
      filterCountry: "Corridor",
      filterSector: "Sector",
      filterStatus: "Stage",
      multiRegion: "Multi-region",
      stageTitle: "Delivery stage",
      stages: ["Structuring", "Development", "Execution"],
      sdgTitle: "SDG Alignment Matrix",
      sdgNote: "Goals aligned per program mandate.",
      programsLabel: "Programs",
      corridorsLabel: "Corridors",
    },
    corridor: {
      backLabel: "All Corridors",
      regionLabel: "Region",
      statusLabel: "Status",
      programsTitle: "Programs in this corridor",
      regionalNote: "Multi-regional programs are structured across several corridors; contact the Alliance for the country allocation of each mandate.",
      capitalLabel: "Capital",
      verifiedLabel: "VERIFIED 2026-08",
    },
    teamDetail: {
      backLabel: "Leadership",
      roleLabel: "Role",
      bioLabel: "Profile",
      contactCta: "Request a briefing",
    },
    governanceDetail: {
      backLabel: "Governance Framework",
      overviewLabel: "Framework Overview",
      practicesLabel: "Operating Practices",
      requestLabel: "Request documentation",
      requestNote: "Full frameworks, templates, and audit trails are shared with verified counterparties under NDA.",
    },
    engagements: {
      title: "Engagement Calendar",
      empty: "Confirmed engagements, missions, and convenings are published here once scheduled.",
      dateLabel: "Date",
      typeLabel: "Type",
      locationLabel: "Location",
    },
    visions: {
      title: "Visions",
      eyebrow: "STRATEGIC_HORIZON",
      heroStatement: "A continent where infrastructure serves dignity, capital serves development, and governance serves people.",
      heroNote: "The Alliance's strategic horizon through 2030 and beyond — aligned with UN SDG 2030 and African Union Agenda 2063.",
      missionTitle: "Mission",
      missionStatement: "To orchestrate bankable public-private partnerships that close Africa's infrastructure financing gap — currently estimated at up to $170 billion annually by the African Development Bank — through rigorous governance, verified delivery, and transparent success-fee structures that protect both investors and communities.",
      pillarsTitle: "Strategic Pillars",
      pillars:       [
            {
                  "title": "Bankable Origination",
                  "desc": "Every program is structured for financial close before mobilization — risk allocated to the party best able to carry it.",
                  "code": "PILLAR_01"
            },
            {
                  "title": "Governance as Infrastructure",
                  "desc": "ESIA/ESMS, KYC/AML, independent engineers and auditors are not overhead; they are the delivery mechanism.",
                  "code": "PILLAR_02"
            },
            {
                  "title": "Sovereign Partnership",
                  "desc": "Governments are counterparties, not beneficiaries. Municipalities co-own delivery from mandate to maintenance.",
                  "code": "PILLAR_03"
            },
            {
                  "title": "Verified Impact",
                  "desc": "Success fees release only against independently verified milestones — never against projections.",
                  "code": "PILLAR_04"
            }
      ],
      alignmentTitle: "Global Framework Alignment",
      alignmentNote: "Every program mandate maps to the international development frameworks the Alliance operates within.",
      sdgFrame: "The 17 UN Sustainable Development Goals define the impact taxonomy for the Alliance's pipeline. Each program declares its aligned goals at mandate entry and reports against them through MRV monitoring.",
      agendaFrame: "African Union Agenda 2063 — The Africa We Want — frames the Alliance's continental integration mandate: connecting corridors, enabling intra-African trade infrastructure, and building the industrial base for the continent's demographic century.",
      horizonsTitle: "Future Horizons",
      horizonsNote: "Sector-level aspirations the Alliance is structuring toward.",
      horizons:       [
            {
                  "sector": "Energy",
                  "vision": "Utility-scale renewable capacity exceeding 150MW across target corridors, with storage integration and grid modernization enabling industrial growth without carbon lock-in."
            },
            {
                  "sector": "Digital",
                  "vision": "Backbone fiber and data-center infrastructure that brings African content to African servers, reducing latency and dependency on offshore hosting."
            },
            {
                  "sector": "Circular Economy",
                  "vision": "Industrial-scale debris and material recovery facilities that transform conflict rubble into certified building inputs — reconstruction fed by its own waste stream."
            },
            {
                  "sector": "Agriculture",
                  "vision": "End-to-end cold-chain and agro-processing corridors that cut post-harvest loss from 40% to under 15%, stabilizing regional food supply."
            },
            {
                  "sector": "Cities",
                  "vision": "PPP/BOT industrial zones with anchor tenants secured before ground-break, TVET hubs producing the workforce the zones will hire, and climate-resilient utilities."
            }
      ],
      leadershipTitle: "Leadership Perspectives",
      leadershipNote: "The Alliance's direction as articulated by its leadership.",
      leadershipCta: "Request a leadership briefing",
    },
    skipToContent: "Skip to content",
    langLabel: "العربية",
  },
  ar: {
    metaTitle: "التحالف الدولي الإفريقي للأعمال والتنمية المستدامة",
    gallery: {
      title: "المعرض",
      subtitle: "لمحة عن تأثيرنا وفعالياتنا وشراكاتنا في جميع أنحاء إفريقيا.",
      eyebrow: "معرض الوسائط",
      emptyTitle: "المعرض قيد التجهيز",
      emptyText: "سيتم نشر الصور الحقيقية من برامجنا وفعالياتنا ومهامنا الميدانية هنا فور توفرها.",
    },
    nav: {
      about: "من نحن",
      programs: "البرامج",
      gallery: "المعرض",
      visions: "الرؤى",
      countries: "الدول",
      governance: "الحوكمة",
      team: "الفريق",
      partners: "الشركاء",
      newsroom: "الأخبار",
      contact: "تواصل معنا",
       projects: "المشاريع والفرص",
       investorAccess: "دخول المستثمرين",
       services: "الخدمات",
       intelligence: "استخبارات السوق",
       match: "مطابقة الشركاء",
    },
    hero: {
      eyebrow: "تحالف • شراكات • أثر",
      title: "تسريع النمو المستدام عبر إفريقيا",
      subtitle:
        "نُوَحِّد الحكومات ورؤوس الأموال والجهات التشغيلية لتنفيذ برامج قابلة للتمويل في الطاقة واللوجستيات والزراعة والبنية الرقمية والمدن المرنة — بما يتوافق مع أهداف التنمية المستدامة 2030 وأجندة إفريقيا 2063.",
      ctaPrimary: "استكشاف البرامج",
      ctaSecondary: "انضم كشريك",
    },
    about: {
      title: "من نحن",
      text:
        "تقدّر الأمم المتحدة فجوة تمويل قدرها 4 تريليونات دولار سنوياً بين الدول النامية وأهداف التنمية المستدامة — وهي فجوة لا يمكن للمساعدات التقليدية وحدها سدّها. وُجد التحالف تحديداً لهذه الفجوة: تحالف متعدد الدول يربط الحكومات ورؤوس الأموال والشركاء التشغيلين في برامج PPP/BOT قابلة للتمويل — طاقة ولوجستيات وزراعة وبنية رقمية ومدن مرنة — تحت حوكمة صارمة (ESIA/ESMS، KYC/AML، مهندس ومدقق مستقل) وأتعاب نجاح مرتبطة بمعامل موثقة.",
      bullets: [
        { icon: <ShieldCheck className="w-5 h-5" />, text: "حوكمة وامتثال قويان (ESIA/ESMS، KYC/AML)." },
        { icon: <Handshake className="w-5 h-5" />, text: "شراكات حكومية وقدرة تنفيذ ضمن صيغ PPP/BOT." },
        { icon: <Leaf className="w-5 h-5" />, text: "نهج إيجابي للمناخ ومتوافق مع أهداف التنمية المستدامة." },
      ],
      metricsTitle: "الإرث_المؤوسسي",
      metrics: [
        { label: "مراكز العمليات", value: "09", desc: "مراكز استراتيجية عبر المناطق الاقتصادية الرئيسية", id: "HUB_SEC" },
        { label: "خط المشاريع الموجه", value: "550", desc: "مليون دولار أمريكي في التمويل الموجه", id: "VAL_FIN", suffix: "M" },
        { label: "البرامج المدنية", value: "07", desc: "برامج رائدة تحت التفويض المؤسسي", id: "PRG_CIV" },
        { label: "الوظائف الممكنة", value: "10,000+", desc: "فرص عمل عبر ممرات التنفيذ النشطة", id: "EMP_ENG" },
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
        "تستثمر إفريقيا نحو 4% من ناتجها المحلي في البنية التحتية مقابل 14% في الصين، ويقدّر بنك التنمية الأفريقي فجوة التمويل السنوية للبنية التحتية في القارة بما يصل إلى 170 مليار دولار — عجزٌ يحرم الاقتصادات من نحو نقطتين مئويتين من النمو سنوياً بتقدير البنك نفسه. تأسس التحالف عند تقاطع أهداف التنمية المستدامة 2030 وأجندة الاتحاد الأفريقي 2063 ليحوّل هذا العجز إلى تفويض: بتوحيد الحكومات السيادية والمستثمرين المؤسسيين والشركاء التشغيليين لتحويل الممرات الإقليمية عالية الاحتياج — من غرب إفريقيا إلى الشرق الأوسط — إلى مناطق نمو قابلة للتمويل ومرنة مناخياً.",
      ourStoryMilestones: [
        { year: "النشأة", title: "تأسيس التحالف المؤسسي", desc: "إنشاء تحالف متعدد السيادات يربط رأس المال العربي بأسواق النمو الإفريقية تحت حوكمة صارمة ESIA/ESMS." },
        { year: "التوسع", title: "11 ممر سيادي", desc: "توسيع التواجد التشغيلي عبر غانا، سيراليون، غامبيا، ساحل العاج، بوركينا فاسو، أنغولا، السودان، مصر، الأردن، سوريا، والسعودية." },
        { year: "التأثير", title: "مشاريع +550M$ والتعافي المدني", desc: "تعبئة الطاقة الخضراء، البنية التحتية الرقمية، إعادة تدوير الأنقاض الدائرية، ومبادرات التعافي الإنساني مثل حماة." }
      ],
    },
    programs: {
      title: "البرامج الرئيسية",
      sectionEyebrow: "مبادرات سيادية ومؤسسية",
      sectionNote: "نماذج شراكة عامة-خاصة قابلة للتمويل (PPP/BOT/EPC+F) مصممة للصمود الإقليمي طويل المدى والتنمية الاقتصادية.",
      flagshipLabel: "مبادرة رائدة",
      exploreLabel: "استكشف مخطط المشروع",
      countLabel: "برامج",
      pipelineCta: "محفظة // المستكشف",

      list: [
        {
          icon: <Heart className="w-6 h-6" />,
          name: "إعادة تأهيل 50 مدرسة و 20 مركزاً صحياً — حماة، سوريا",
          desc:
            "ضمن مبادرة 'فداءً لحماة'، إعادة تأهيل شاملة للمرافق التعليمية والصحية لتوفير بيئات آمنة وكريمة ودعم التعافي المبكر والتنمية المستدامة بالتنسيق مع الشركاء المحليين والدوليين.",
          tags: ["إنساني", "تعليم", "صحة"],
          logo: "/projects/hama-logo.jpg",
          link: "/hama-project",
          slug: "hama-rehabilitation",
          status: "نشط",
          detail: {
            overview: "مبادرة 'فداءً لحماة' هي التفويض الإنساني الرئيسي للتحالف: إعادة تأهيل إنشائي كاملة لـ 50 مدرسة و20 مركزاً صحياً في محافظة حماة، سوريا. يرسّخ البرنامج التعافي المبكر عبر استعادة البنية المدنية التي تعتمد عليها المجتمعات، بإشراف هندسي مستقل وتنسيق مع الشركاء المحليين والدوليين.",
            highlights: [
              { title: "أصول تعليمية", desc: "إعادة بناء 50 حرماً مدرسياً وفق معايير إنشائية من الفئة أ." },
              { title: "شبكة صحية", desc: "ترميم 20 مركزاً صحياً مع أنظمة دعم حياة مرنة." },
              { title: "الأثر المجتمعي", desc: "أكثر من 100 ألف حياة تستفيد من الخدمات المستعادة." },
            ],
          },
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "مركز لوجستي وإعماري — العريش",
          desc:
            "مركز إقليمي للإغاثة وإعادة الإعمار: مستودعات (عادي/مبرد)، التجهيز والتعبئة، أسطول النقل، وتيسير الجمارك والتعاقد مع المنظمات.",
          tags: ["إغاثة", "مستودعات", "نقل"],
          slug: "al-arish-hub",
          status: "قيد التطوير",
          detail: {
            overview: "مركز لوجستي وإعماري إقليمي في العريش لخدمة جهود إعادة إعمار غزة: مستودعات عادية ومبردة، وخدمات تجهيز وأسطول نقل، وتيسير جمركي، وقنوات تعاقد للمنظمات الإنسانية والجهات المانحة التي تحتاج قدرة ممر موثوقة.",
            highlights: [
              { title: "التخزين", desc: "طاقة تخزين عادية ومبردة للشحنات الإنسانية والإعمارية." },
              { title: "خدمات الممر", desc: "تيسير جمركي وتجهيز وعمليات أسطول." },
              { title: "جاهز للمنظمات", desc: "تعاقد وخدمات مصممة حول المشغلين الإنسانيين." },
            ],
          },
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "الطاقة الخضراء — محطات شمسية بقدرة 150 ميجاوات+",
          desc:
            "مشاريع طاقة شمسية قابلة للتمويل مع تكامل الشبكة وتجارب التخزين وتمكين المحتوى المحلي؛ هياكل EPC+F مع رقابة مستقلة.",
          tags: ["طاقة", "شمسية", "EPC+F"],
          slug: "green-energy",
          status: "قيد الإعداد",
          detail: {
            overview: "محفظة مشاريع طاقة شمسية بقدرة منافعة تتجاوز 150 ميجاوات في الأسواق المستهدفة، مهيكلة كمعاملات EPC+F قابلة للتمويل مع دراسات تكامل الشبكة وتجارب التخزين ومشاركة المحتوى المحلي، ويراقب مهندسون مستقلون التنفيذ مقابل معالم العقد.",
            highlights: [
              { title: "الحجم", desc: "أكثر من 150 ميجاوات من القدرة الشمسية المخططة." },
              { title: "هيكل قابل للتمويل", desc: "تعاقد EPC+F مع رقابة مستقلة." },
              { title: "المحتوى المحلي", desc: "مشاركة التصنيع وقوى العمل المحلية." },
            ],
          },
        },
        {
          icon: <Globe2 className="w-6 h-6" />,
          name: "أفريقيا الرقمية — الاتصالات والأمن السيبراني",
          desc:
            "ألياف ضوئية ومحاور بيانات ومنصات حكومية رقمية آمنة لتعزيز الشمول الرقمي في التعليم والصحة والتجارة.",
          tags: ["رقمي", "سيبراني", "بنية"],
          slug: "digital-africa",
          status: "قيد الإعداد",
          detail: {
            overview: "بنية تحتية رقمية وطنية وعابرة للحدود: ألياف رئيسية، ومحاور بيانات، ومنصات حكومية رقمية آمنة. يستهدف البرنامج الشمول الرقمي في التعليم والصحة والتجارة، مع تصميم الأمن السيبراني منذ البداية لا كإضافة لاحقة.",
            highlights: [
              { title: "الاتصال", desc: "ألياف رئيسية تربط المناطق الأقل حظاً." },
              { title: "بنية البيانات", desc: "محاور بيانات بخيارات استضافة سيادية." },
              { title: "منصات آمنة", desc: "خدمات حكومية رقمية بمعايير سيبرانية مدمجة." },
            ],
          },
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "مدن متكاملة — مناطق صناعية ولوجستية",
          desc:
            "منظومات صناعية ضمن شراكات PPP/BOT مع مستأجرين رئيسيين ومراكز تدريب مهني وبنية مراعية للمناخ.",
          tags: ["PPP", "صناعي", "لوجستي"],
          slug: "integrated-cities",
          status: "قيد الإعداد",
          detail: {
            overview: "مناطق صناعية ولوجستية متكاملة تُطوَّر ضمن هياكل PPP/BOT: مستأجرون رئيسيون، ومراكز مهارات وتدريب مهني، ومرافق مراعية للمناخ، مصممة لتحويل الطلب الإقليمي إلى نمو قائم على التصدير وتشغيل دائم.",
            highlights: [
              { title: "منظومة مرتكزة", desc: "تأمين المستأجرين الرئيسيين قبل بدء الإنشاء." },
              { title: "خط المهارات", desc: "مراكز تدريب مهني متوائمة مع صناعات المنطقة." },
              { title: "مرافق مرنة", desc: "كهرباء ومياه ونفايات مصممة لتحمل الإجهاد المناخي." },
            ],
          },
        },
        {
          icon: <Recycle className="w-6 h-6" />,
          name: "إعادة تدوير الأنقاض واستعادة المواد — سوريا",
          desc:
            "معامل صناعية لمعالجة الأنقاض وسحق الخرسانة وتصنيع الطوب البيئي عبر المحافظات السورية المتأثرة لتحويل الردم إلى مواد بناء مستدامة ومؤهلة لإعادة الإعمار الحضري.",
          tags: ["إعادة تدوير", "سوريا", "اقتصاد دائر", "بيئة"],
          slug: "debris-recycling",
          status: "قيد التطوير",
          detail: {
            overview: "استعادة دائرية صناعية النطاق لإعادة إعمار سوريا: معامل معالجة أنقاض وسحق خرسانة تحوّل ردم النزاع إلى مواد بناء مستدامة ومؤهلة — مما يخفض تكاليف مدخلات الإعمار ويخلق فرص تصنيع محلية.",
            highlights: [
              { title: "استعادة المواد", desc: "تحويل الأنقاض إلى طوب بيئي وركام مؤهل." },
              { title: "وظائف محلية", desc: "معامل يشغلها ويُدار بها كوادر محلية." },
              { title: "توريد دائري", desc: "إعمار يتغذى بمدخلات محلية مستدامة." },
            ],
          },
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "الأمن الغذائي — تصنيع زراعي وسلاسل تبريد",
          desc:
            "سلاسل قيمة متكاملة (الأعلاف، التصنيع، التبريد، التوزيع) مع التتبع والامتثال HACCP/ISO.",
          tags: ["زراعي", "تبريد", "HACCP"],
          slug: "food-security",
          status: "قيد الإعداد",
          detail: {
            overview: "سلاسل قيمة زراعية متكاملة — إنتاج الأعلاف والتصنيع ولوجستيات سلسلة التبريد والتوزيع — مع تتبع كامل وامتثال HACCP/ISO. يقلص البرنامج الفاقد بعد الحصاد ويعزز استقرار الإمداد الغذائي الإقليمي.",
            highlights: [
              { title: "سلسلة القيمة", desc: "أعلاف وتصنيع وتبريد وتوزيع متكاملة." },
              { title: "الامتثال", desc: "عمليات معتمدة HACCP/ISO مع التتبع." },
              { title: "صمود غذائي", desc: "تقليل الفاقد بعد الحصاد واستقرار الإمداد." },
            ],
          },
        },
      ],
    },
    programDetail: {
      backLabel: "جميع البرامج",
      eyebrow: "برنامج رئيسي",
      overviewLabel: "نظرة عامة على البرنامج",
      highlightsLabel: "العناصر الرئيسية",
      statusLabel: "الحالة",
      ctaTitle: "شارك في هذا البرنامج",
      ctaSubtitle: "ناقش التفويضات أو التمويل المشترك أو أدوار التشغيل مع فريقنا.",
      ctaButton: "إرسال استفسار",
    },
    countries: {
      title: "نطاق العمل",
      note: "دول نشطة ودول قيد الإعداد",
      list: ["غانا", "غامبيا", "سيراليون", "بوركينا فاسو", "ساحل العاج", "أنغولا", "الأردن", "مصر", "سوريا", "السودان", "السعودية"],
      eyebrow: "التغطية الجغرافية",
      mapTitle: "خريطة البنية السيادية",
      mapCorridors: "{n} ممرات أعضاء سيادية",
      territoryLabel: "الإقليم:",
      globalViewLabel: "الخريطة العالمية",
      regionalViewLabel: "تركيز إقليمي",
      activeRegionLabel: "إقليم نشط",
      capitalLabel: "العاصمة",
      presenceLabel: "حضور مؤسسي",
      mapHint: "مرّر أو اختر إقليماً سيادياً لفحص عمليات الممرات الإقليمية.",
      regions: {
        westAfrica: "غرب إفريقيا",
        centralAfrica: "وسط إفريقيا",
        northEastAfrica: "شمال/شرق إفريقيا",
        northAfrica: "شمال إفريقيا",
        middleEast: "الشرق الأوسط",
      },

      indexTitle: "الدول الأعضاء والممرات",
      corridorsLabel: "ممرات إقليمية نشطة",
      activeLabel: "نشط",
      pipelineLabel: "قيد الإعداد",
      projectsLabel: "برامج",

    },
    governance: {
      title: "الحوكمة والامتثال",
      pillarLabel: "الركن",
      frameworkLabel: "إطار //",
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
      vettedLabel: "شركاء مؤسسيون استراتيجيون موثقون ومعتمدون",
      networkLabel: "شبكة التحالف العالمية AIABASD",

    },
    team: {
      title: "فريقنا",
      note: "القيادة التي تقود التأثير عبر إفريقيا.",
      profileLabel: "ملف //",
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
      empty: "سيتم نشر الإعلانات وبروتوكولات الشراكة والمستجدات الميدانية هنا.",
      eyebrow: "الصحافة والرؤى",
      newsletterTitle: "الاشتراك في الإفصاحات المؤسسية",
      newsletterText: "تلقّ التحديثات التنفيذية وتقارير التطوير وإعلانات الشراكات مباشرة.",
      newsletterPlaceholder: "your.email@institution.org",
      newsletterCta: "اشترك",
      newsletterSuccess: "تم الاشتراك — شكرًا لك.",
      newsletterError: "تعذّر الاشتراك. حاول مرة أخرى.",
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "منفتحون على طلبات الحكومات وتفويضات المستثمرين والشراكات التشغيلية.",
      name: "الاسم الكامل",
      email: "البريد الوظيفي",
      org: "الجهة/المؤسسة",
      msg: "كيف يمكن التعاون؟",
      send: "إرسال الاستفسار",
      sent: "تم إرسال الاستفسار",
      eyebrow: "الترابط التنفيذي",
      formTitle: "إرسال استفسار تنفيذي",
      hqTitle: "المقرات العالمية ووسائل التواصل",
      london: "المقر الرئيسي — لندن",
      uk: "المملكة المتحدة",
      dakar: "الأمانة الإقليمية — داكار",
      senegal: "السنغال",
      submitting: "جارٍ إرسال الاستفسار…",
      successNote: "تم استلام رسالتك بأمان. الرقم المرجعي: {ref}",
      reassure: "تصل الإرسالات فريق الشراكات مباشرة؛ وعادةً يرد أحد الشركاء خلال يومي عمل.",
      anotherLabel: "إرسال استفسار آخر",
      bookingTitle: "احجز اجتماعاً مباشراً",
      bookingNote: "تجاوز الانتظار — اختر موعداً مع فريق الشراكات.",
      bookingCta: "فتح التقويم",

      error: "تعذّر الإرسال. حاول مرة أخرى أو راسلنا على contact@aiabasd.org",
      audienceLabel: "أستفسر بصفتي",
      audienceOptions: ["حكومة / بلدية", "مستثمر / مؤسسة تمويل", "شركة EPC / شريك تشغيلي", "منظمة / وكالة تنموية", "صحافة / بحث"],
      sectorLabel: "قطاع الاهتمام",
      regionLabel: "الإقليم محل الاهتمام",
      ticketLabel: "حجم التعاون التقديري",
      sectorOptions: ["الطاقة", "اللوجستيات والممرات", "الزراعة والأمن الغذائي", "البنية التحتية الرقمية", "التطوير الحضري", "الاقتصاد الدائري", "المرافق الإنسانية"],
      regionOptions: ["غرب أفريقيا", "شرق أفريقيا", "شمال أفريقيا", "المشرق", "الخليج", "متعدد الأقاليم"],
      ticketOptions: ["أقل من 10 مليون دولار", "10–50 مليون دولار", "50–250 مليون دولار", "أكثر من 250 مليون دولار", "يُحدد لاحقاً"],
      placeholders: {
        name: "مثال: زياد شنيكات",
        email: "name@company.com",
        org: "شركة / وزارة / منظمة",
        msg: "صف بإيجاز الفرصة والجدول الزمني وأصحاب المصلحة…",
      },
      sidebar: {
        hq: "المقر",
        channels: "القنوات",
        emailGeneralLabel: "الاستفسارات العامة",
        emailSecretariatLabel: "الأمانة العامة",
        emailFieldOpsLabel: "العمليات الميدانية",
      },
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      privacy: "الخصوصية",
      terms: "الشروط",
      navTitle: "التنقل",
      engagementTitle: "المشاركة",
      updatesTitle: "التحديثات",
      backToTopLabel: "العودة إلى الأعلى",
       links: {
        about: "عن AIABASD",
        countries: "التغطية الجغرافية",
        governance: "الحوكمة والأخلاقيات",
        partners: "شبكة الشركاء",
        newsroom: "الصحافة والأخبار",
         contact: "التواصل التنفيذي",
         services: "الخدمات التجارية",
         intelligence: "استخبارات السوق",
         match: "مطابقة الشركاء",
      },
    },
    testimonials: {
      title: { main: "صوت شركاءنا", highlighted: "المؤسسيين", partner: "الاستراتيجيين" },
      controls: { prev: "الشهادة السابقة", next: "الشهادة التالية", pause: "إيقاف تدوير الشهادات", resume: "استئناف تدوير الشهادات", pagination: "التنقل بين الشهادات" },
      eyebrow: "تأييدات وقيادة",
      subtitle: "وجهات نظر مباشرة من شركاء سياديين ومستثمرين مؤسسيين ومديري تنمية إقليميين.",

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
      auditNote: "يتم مراقبة وتدقيق الوصول وفقاً لتفويض الخصوصية المؤسسي السيادي.",
       rangeNote: "لا تُنشر هنا التفاصيل الاقتصادية للمشاريع والبرامج. ولا تُشارك المعلومات التجارية إلا عندما تكون موثقة ومعتمدة ومناسبة للمؤسسة.",
      backLabel: "العودة إلى الموقع الرئيسي",
      secureLabel: "وصول آمن للمستثمرين",
      verifying: "جارٍ التحقق…",
      footerLine: "شبكة المستثمرين التنفيذيين — AIABASD.",
      toastSuccess: "تم إرسال طلب الوصول.",
      toastQueued: "تم إدراج التحقق المؤسسي للمراجعة الإدارية.",
      toastFailed: "تعذّر الإرسال. حاول مرة أخرى.",
      toastNetwork: "خطأ في الشبكة أثناء التحقق.",
      authFailed: "البريد الإلكتروني أو مفتاح الدخول غير صحيح.",
      authNetwork: "خطأ في الشبكة أثناء المصادقة.",
      requestAccessTitle: "لا تملك مفتاح دخول؟",
       requestAccessNote: "يمكن للمؤسسات الموثقة طلب بيانات اعتماد المخزن. يُمنح الدخول بعد المراجعة الإدارية — وليس بالتسجيل الذاتي.",
       requestCta: "طلب الدخول",
       organizationLabel: "المؤسسة",
       roleLabel: "الدور",
       partyTypeLabel: "نوع الطرف",
       interestLabel: "مجال الاهتمام",
       targetProjectLabel: "المشروع المستهدف",
       messageLabel: "الرسالة",
       messagePlaceholder: "أخبرنا بالسياق أو الوصول أو المشروع الذي تبحث عنه.",
       organizationPlaceholder: "المؤسسة أو الشركة",
       rolePlaceholder: "الدور أو التفويض",
       partyTypePlaceholder: "مستثمر أو مؤسسة عامة أو مشغل أو غير ذلك",
       interestPlaceholder: "مراجعة مشروع أو غرفة بيانات أو شراكة أو غير ذلك",
       targetProjectPlaceholder: "مرجع المشروع أو المحفظة (اختياري)",
       privacyConsentLabel: "الموافقة على الخصوصية والمعالجة",
       privacyConsentText: "أوافق على معالجة AIABASD لهذه البيانات لمراجعة طلب الوصول والرد عليه.",
       privacyLinkLabel: "قراءة إشعار الخصوصية",
       accessStartEventLabel: "بدء_طلب_الوصول"
    },
    vault: {
      title: "غرفة بيانات المستثمرين",
      subtitle: "وثائق تُتاح للمؤسسات الموثقة في إطار السرية.",
      eyebrow: "الأرشيف_المقيد",
      docLabel: "الوثائق_المتوفرة",
      empty: "لا توجد وثائق منشورة بعد.",
      emptyNote: "المخزن جاهز. ستظهر الوثائق هنا فور إصدارها من الأمانة العامة.",
      logout: "إنهاء الجلسة",
      backLabel: "العودة إلى المصادقة",
      sessionNote: "الجلسة صالحة لمدة 8 ساعات. يتم رصد الدخول وتدقيقه.",
      restrictedNote: "المواد سرية. يُحظر إعادة توزيعها دون إذن كتابي.",
      fetchFailed: "تعذّر تحميل فهرس الوثائق. حاول مرة أخرى."
    },
    consent: {
      message: "يقيس هذا الموقع مشاهدات الصفحات مجهولة ومجمعة — بدون ملفات تعريف ارتباط أو معرّفات أو بيانات شخصية. هل تسمح لنا بإحصاء زيارتك؟",
      accept: "موافق",
      decline: "أرفض",
      label: "الموافقة على التحليلات"
    },
    pipeline: {
      title: "استخبارات البرامج",
      eyebrow: "مستكشف_المحفظة",
      note: "محفظة برامج التحالف الحية — رشّح حسب الممر والقطاع ومرحلة التنفيذ. جميع الأرقام موثقة من المالك.",
      filterAll: "الكل",
      filterCountry: "الممر",
      filterSector: "القطاع",
      filterStatus: "المرحلة",
      multiRegion: "متعدد المناطق",
      stageTitle: "مرحلة التنفيذ",
      stages: ["التهيئة", "التطوير", "التنفيذ"],
      sdgTitle: "مصفوفة التوافق مع أهداف التنمية المستدامة",
      sdgNote: "الأهداف المتوافقة مع تفويض كل برنامج.",
      programsLabel: "برامج",
      corridorsLabel: "ممرات",
    },
    corridor: {
      backLabel: "جميع الممرات",
      regionLabel: "المنطقة",
      statusLabel: "الحالة",
      programsTitle: "البرامج في هذا الممر",
      regionalNote: "البرامج متعددة المناطق مهيكلة عبر عدة ممرات؛ تواصل مع التحالف لمعرفة توزيع كل تفويض على الدول.",
      capitalLabel: "العاصمة",
      verifiedLabel: "موثق 2026-08",
    },
    teamDetail: {
      backLabel: "القيادة",
      roleLabel: "الدور",
      bioLabel: "الملف",
      contactCta: "اطلب اجتماعاً تعريفياً",
    },
    governanceDetail: {
      backLabel: "إطار الحوكمة",
      overviewLabel: "نظرة عامة على الإطار",
      practicesLabel: "الممارسات التشغيلية",
      requestLabel: "اطلب الوثائق",
      requestNote: "تُشارك الأطر والنماذج الكاملة ومسارات التدقيق مع الأطراف الموثقة بموجب اتفاقية سرية.",
    },
    engagements: {
      title: "تقويم المشاركات",
      empty: "تُنشر المشاركات والبعثات واللقاءات المؤكدة هنا فور جدولتها.",
      dateLabel: "التاريخ",
      typeLabel: "النوع",
      locationLabel: "الموقع",
    },
    visions: {
      title: "الرؤى",
      eyebrow: "الأفق_الاستراتيجي",
      heroStatement: "قارةٌ تخدم فيها البنية التحتية الكرامة، ويخدم فيها رأس المال التنمية، وتخدم فيها الحوكمة الإنسان.",
      heroNote: "الأفق الاستراتيجي للتحالف حتى 2030 وما بعده — بما يتوافق مع أهداف التنمية المستدامة 2030 وأجندة الاتحاد الأفريقي 2063.",
      missionTitle: "المهمة",
      missionStatement: "تهيئة شراكات عامة-خاصة قابلة للتمويل تسد فجوة تمويل البنية التحتية في إفريقيا — التي يقدّرها بنك التنمية الأفريقي بما يصل إلى 170 مليار دولار سنوياً — عبر حوكمة صارمة، وتنفيذ موثق، وهياكل أتعاب نجاح شفافة تحمي المستثمرين والمجتمعات معاً.",
      pillarsTitle: "الركائز الاستراتيجية",
      pillars:       [
            {
                  "title": "تهيئة قابلة للتمويل",
                  "desc": "كل برنامج مهيكل للإغلاق المالي قبل التعبئة — المخاطر موزعة على الطرف الأقدر على تحملها.",
                  "code": "PILLAR_01"
            },
            {
                  "title": "الحوكمة كبنية تحتية",
                  "desc": "دراسات الأثر، ومكافحة غسل الأموال، والمهندس والمدقق المستقل ليست تكاليف عامة — بل هي آلية التنفيذ ذاتها.",
                  "code": "PILLAR_02"
            },
            {
                  "title": "الشراكة السيادية",
                  "desc": "الحكومات شركاء لا متلقون. البلديات تشارك في الملكية من التفويض إلى الصيانة.",
                  "code": "PILLAR_03"
            },
            {
                  "title": "أثر موثق",
                  "desc": "تتحرر أتعاب النجاح فقط مقابل معامل موثقة بشكل مستقل — أبداً مقابل توقعات.",
                  "code": "PILLAR_04"
            }
      ],
      alignmentTitle: "التوافق مع الأطر العالمية",
      alignmentNote: "كل تفويض برنامج يرتبط بالأطر التنموية الدولية التي يعمل التحالف ضمنها.",
      sdgFrame: "أهداف التنمية المستدامة السبعة عشر تحدد تصنيف الأثر لمحفظة التحالف. كل برنامج يعلن أهدافه المتوافقة عند دخول التفويض ويقدم تقارير ضدها عبر مراقبة وقياس وإبلاغ وتحقق.",
      agendaFrame: "أجندة 2063 للاتحاد الأفريقي — إفريقيا التي نريدها — تؤطر تفويض التكامل القاري للتحالف: ربط الممرات، وتمكين بنية التجارة البينية الإفريقية، وبناء القاعدة الصناعية لقرن القارة الديموغرافي.",
      horizonsTitle: "آفاق المستقبل",
      horizonsNote: "تطلعات قطاعية يعمل التحالف على تهيئتها.",
      horizons:       [
            {
                  "sector": "الطاقة",
                  "vision": "قدرة متجددة على نطاق المرافق تتجاوز 150 ميجاوات عبر الممرات المستهدفة، مع تكامل التخزين وتحديث الشبكة."
            },
            {
                  "sector": "الرقمية",
                  "vision": "بنية ألياف ضوئية ومراكز بيانات تنقل المحتوى الإفريقي إلى خوادم إفريقية."
            },
            {
                  "sector": "الاقتصاد الدائري",
                  "vision": "مرافق صناعية لاستعادة الأنقاض والمواد تحوّل ردم النزاع إلى مدخلات بناء مؤهلة."
            },
            {
                  "sector": "الزراعة",
                  "vision": "ممرات سلاسل تبريد وتصنيع زراعي متكاملة تخفض الفاقد بعد الحصاد من 40% إلى أقل من 15%."
            },
            {
                  "sector": "المدن",
                  "vision": "مناطق صناعية ضمن شراكات مع مستأجرين رئيسيين مؤمَّنين، ومراكز تدريب مهني، ومرافق مراعية للمناخ."
            }
      ],
      leadershipTitle: "رؤى القيادة",
      leadershipNote: "توجه التحالف كما تصوغه قيادته.",
      leadershipCta: "اطلب اجتماعاً مع القيادة",
    },
    skipToContent: "تخطَّ إلى المحتوى",
    langLabel: "EN",
  },
  fr: {
    metaTitle: "AIABASD — Alliance Africaine Internationale pour les Affaires et le Développement Durable",
    gallery: {
      title: "Galerie",
      subtitle: "Un aperçu de notre impact, nos événements et nos partenariats en Afrique.",
      eyebrow: "Galerie Médias",
      emptyTitle: "Notre galerie est en cours de préparation",
      emptyText: "Les photographies authentiques de nos programmes, événements et missions de terrain seront publiées ici dès leur disponibilité.",
    },
    nav: {
      about: "À propos",
      programs: "Programmes",
      gallery: "Galerie",
      visions: "Visions",
      countries: "Pays",
      governance: "Gouvernance",
      team: "Équipe",
      partners: "Partenaires",
    newsroom: "Actualités",
    contact: "Contact",
     projects: "Projets & Opportunités",
     investorAccess: "Accès investisseurs",
     services: "Services",
     intelligence: "Intelligence",
     match: "Mise en relation",
    },
    hero: {
      eyebrow: "Alliance • PPP • Impact",
      title: "Accélérer la croissance durable en Afrique",
      subtitle:
        "Nous réunissons les gouvernements, les capitaux privés et les opérateurs d'impact pour mettre en œuvre des programmes PPP/BOT finançables dans les domaines de l'énergie, de la logistique, de l'agriculture, des infrastructures numériques et des villes résilientes — conformément aux ODD 2030 et à l'Agenda 2063 de l'UA.",
      ctaPrimary: "Explorer les programmes",
      ctaSecondary: "Devenez partenaire",
    },
    about: {
      title: "Qui sommes-nous",
      text:
        "L'ONU estime à 4 000 milliards de dollars par an l'écart de financement entre les pays en développement et les Objectifs de développement durable — un écart que l'aide traditionnelle seule ne peut combler. L'AIABASD existe précisément pour cet écart : une alliance multi-pays qui relie gouvernements, capitaux privés et partenaires opérationnels au sein de programmes PPP/BOT finançables — énergie, logistique, agriculture, infrastructures numériques et villes résilientes — sous gouvernance stricte (EISE/SGES, KYC/AML, ingénieur et auditeur indépendants) et frais de succès liés à des jalons vérifiés.",
      bullets: [
        { icon: <ShieldCheck className="w-5 h-5" />, text: "Gouvernance et conformité solides (EISE/SGES, KYC/AML)." },
        { icon: <Handshake className="w-5 h-5" />, text: "Partenariats gouvernementaux et capacité de mise en œuvre PPP/BOT." },
        { icon: <Leaf className="w-5 h-5" />, text: "Approche positive pour le climat et alignée sur les ODD." },
      ],
      metricsTitle: "Héritage_Institutionnel",
      metrics: [
        { label: "Hubs Opérationnels", value: "09", desc: "Centres stratégiques dans les zones économiques majeures", id: "HUB_SEC" },
        { label: "Pipeline dirigé", value: "550", desc: "Millions USD en financement dirigé", id: "VAL_FIN", suffix: "M" },
        { label: "Programmes Civiques", value: "07", desc: "Programmes phares sous mandat institutionnel", id: "PRG_CIV" },
        { label: "Emplois Activés", value: "10 000+", desc: "Emplois le long des corridors de réalisation actifs", id: "EMP_ENG" },
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
        "L'Afrique n'investit qu'environ 4% de son PIB dans les infrastructures contre 14% pour la Chine, et la Banque Africaine de Développement estime le déficit annuel de financement des infrastructures du continent jusqu'à 170 milliards de dollars — un manque à gagner évalué par la Banque à 2 points de croissance du PIB par an. Fondée à la convergence des ODD 2030 des Nations Unies et de l'Agenda 2063 de l'Union Africaine, l'AIABASD a été créée pour transformer ce déficit en mandat : unir gouvernements souverains, investisseurs institutionnels et partenaires opérationnels pour convertir les corridors régionaux à fort besoin — de l'Afrique de l'Ouest au Moyen-Orient — en zones de croissance finançables et résilientes au climat.",
      ourStoryMilestones: [
        { year: "Origine", title: "Formation de l'Alliance Institutionnelle", desc: "Création d'une coalition multi-souveraine reliant le capital arabe aux marchés de croissance africains sous une gouvernance rigoureuse EISE/SGES." },
        { year: "Expansion", title: "11 Corridors Souverains", desc: "Expansion de la présence opérationnelle au Ghana, en Sierra Leone, en Gambie, en Côte d'Ivoire, au Burkina Faso, en Angola, au Soudan, en Égypte, en Jordanie, en Syrie et en Arabie Saoudite." },
        { year: "Impact", title: "Pipeline de +550M $ & Relèvement Civique", desc: "Mobilisation de l'énergie verte, des infrastructures numériques, du recyclage circulaire des décombres et des initiatives humanitaires phares comme Hama." }
      ],
    },
    programs: {
      title: "Programmes phares",
      sectionEyebrow: "Initiatives Souveraines & Institutionnelles",
      sectionNote: "Modèles de partenariat public-privé finançables (PPP/BOT/EPC+F) conçus pour la résilience régionale et le développement économique.",
      flagshipLabel: "Initiative Phare",
      exploreLabel: "Explorer le Plan du Projet",
      countLabel: "PROGRAMMES",
      pipelineCta: "PIPELINE // EXPLORATEUR",

      list: [
        {
          icon: <Heart className="w-6 h-6" />,
          name: "Réhabilitation de 50 écoles et 20 centres de santé — Hama, Syrie",
          desc:
            "Dans le cadre de l'initiative 'Fida'an pour Hama', réhabilitation complète des établissements d'enseignement et de santé pour fournir des environnements sûrs et dignes et soutenir le relèvement précoce et le développement durable en coordination avec les partenaires locaux et internationaux.",
          tags: ["Humanitaire", "Éducation", "Santé"],
          logo: "/projects/hama-logo.jpg",
          link: "/hama-project",
          slug: "hama-rehabilitation",
          status: "Actif",
          detail: {
            overview: "L'initiative Fida'an pour Hama est le mandat humanitaire phare de l'AIABASD : la réhabilitation structurelle complète de 50 écoles et 20 centres de santé dans le gouvernorat de Hama, en Syrie. Le programme ancre le relèvement précoce en restaurant les infrastructures civiques dont dépendent les communautés, sous supervision d'ingénierie indépendante et en coordination avec les partenaires locaux et internationaux.",
            highlights: [
              { title: "Actifs éducatifs", desc: "50 établissements reconstruits selon des normes structurelles de classe A." },
              { title: "Réseau clinique", desc: "20 centres de santé restaurés avec des systèmes de maintien de vie résilients." },
              { title: "Portée communautaire", desc: "Plus de 100 000 vies ancrées par les services restaurés." },
            ],
          },
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "Hub logistique et de reconstruction — Al-Arich",
          desc:
            "Hub logistique humanitaire régional servant la reconstruction de Gaza : entreposage (ambiant/froid), assemblage, opérations de flotte, facilitation douanière et contrats ONG.",
          tags: ["Humanitaire", "Entreposage", "Flotte"],
          slug: "al-arish-hub",
          status: "En développement",
          detail: {
            overview: "Un hub logistique et de reconstruction régional à Al-Arich, positionné pour servir la reconstruction de Gaza : entreposage ambiant et froid, services d'assemblage et de flotte, facilitation douanière et canaux de contractualisation pour les ONG et bailleurs nécessitant une capacité de corridor fiable.",
            highlights: [
              { title: "Entreposage", desc: "Capacité ambiant et froid pour les cargaisons humanitaires." },
              { title: "Services de corridor", desc: "Facilitation douanière, assemblage et opérations de flotte." },
              { title: "Prêt pour les ONG", desc: "Contractualisation conçue pour les opérateurs humanitaires." },
            ],
          },
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "Énergie verte — Solaire à grande échelle (150 MW+)",
          desc:
            "Programmes solaires PV finançables avec intégration réseau, projets pilotes de stockage et activation du contenu local ; structures EPC+F avec suivi indépendant.",
          tags: ["Énergie", "Solaire", "EPC+F"],
          slug: "green-energy",
          status: "En préparation",
          detail: {
            overview: "Un portefeuille de programmes solaires PV de plus de 150 MW sur les marchés cibles, structurés en transactions EPC+F finançables avec études d'intégration réseau, projets pilotes de stockage et participation du contenu local. Des ingénieurs indépendants surveillent la réalisation par rapport aux jalons contractuels.",
            highlights: [
              { title: "Échelle", desc: "Plus de 150 MW de capacité solaire planifiée." },
              { title: "Structure finançable", desc: "Contractualisation EPC+F avec suivi indépendant." },
              { title: "Contenu local", desc: "Participation de la fabrication et de la main-d'œuvre locales." },
            ],
          },
        },
        {
          icon: <Globe2 className="w-6 h-6" />,
          name: "Afrique numérique — Télécommunications et cybersécurité",
          desc:
            "Fibre dorsale, centres de données et plateformes e-gouvernement sécurisées pour débloquer l'inclusion numérique dans l'éducation, la santé et le commerce.",
          tags: ["Numérique", "Cyber", "Dorsale"],
          slug: "digital-africa",
          status: "En préparation",
          detail: {
            overview: "Infrastructures numériques nationales et transfrontalières : fibre dorsale, centres de données et plateformes e-gouvernement sécurisées. Le programme vise l'inclusion numérique dans l'éducation, la santé et le commerce, avec la cybersécurité conçue dès le départ plutôt qu'ajoutée a posteriori.",
            highlights: [
              { title: "Connectivité", desc: "Fibre dorsale reliant les régions mal desservies." },
              { title: "Infrastructure de données", desc: "Centres de données avec options d'hébergement souverain." },
              { title: "Plateformes sécurisées", desc: "Services e-gouvernementaux aux normes cyber intégrées." },
            ],
          },
        },
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "Villes intégrées — Zones industrielles et logistiques",
          desc:
            "Écosystèmes industriels PPP/BOT avec locataires principaux, centres de compétences/EFTP et services publics résilients au climat pour la croissance axée sur l'exportation.",
          tags: ["PPP", "Industriel", "Logistique"],
          slug: "integrated-cities",
          status: "En préparation",
          detail: {
            overview: "Zones industrielles et logistiques intégrées développées en PPP/BOT : locataires principaux, centres de compétences et d'EFTP, et services publics résilients au climat, conçus pour convertir la demande régionale en croissance exportatrice et en emploi durable.",
            highlights: [
              { title: "Écosystème ancré", desc: "Locataires principaux sécurisés avant la mobilisation." },
              { title: "Pipeline de compétences", desc: "Centres d'EFTP alignés sur les industries de la zone." },
              { title: "Services résilients", desc: "Énergie, eau et déchets conçus pour le stress climatique." },
            ],
          },
        },
        {
          icon: <Recycle className="w-6 h-6" />,
          name: "Recyclage des Décombres & Économie Circulaire — Syrie",
          desc:
            "Usines industrielles de traitement des gravats, broyage de béton et fabrication d'éco-briques dans les gouvernorats syriens touchés pour transformer les débris en matériaux de construction durables et certifiés.",
          tags: ["Recyclage", "Syrie", "Économie Circulaire", "Environnement"],
          slug: "debris-recycling",
          status: "En développement",
          detail: {
            overview: "Récupération circulaire à l'échelle industrielle pour la reconstruction syrienne : usines de traitement de gravats et de broyage de béton qui transforment les décombres du conflit en matériaux de construction durables et certifiés — réduisant les coûts des intrants de reconstruction tout en créant des emplois manufacturiers locaux.",
            highlights: [
              { title: "Récupération de matériaux", desc: "Gravats transformés en éco-briques et agrégats certifiés." },
              { title: "Emplois locaux", desc: "Usines staffées et gérées localement." },
              { title: "Offre circulaire", desc: "Reconstruction alimentée par des intrants nationaux durables." },
            ],
          },
        },
        {
          icon: <Leaf className="w-6 h-6" />,
          name: "Sécurité alimentaire — Transformation agroalimentaire et chaîne frigorifique",
          desc:
            "Chaînes de valeur intégrées (aliments, transformation, chaîne frigorifique, distribution) avec traçabilité et conformité HACCP/ISO.",
          tags: ["Agro", "Chaîne frigorifique", "HACCP"],
          slug: "food-security",
          status: "En préparation",
          detail: {
            overview: "Chaînes de valeur agroalimentaires intégrées — production d'aliments, transformation, logistique frigorifique et distribution — avec traçabilité complète et conformité HACCP/ISO. Le programme réduit les pertes post-récolte et stabilise l'offre alimentaire régionale.",
            highlights: [
              { title: "Chaîne de valeur", desc: "Aliments, transformation, froid et distribution intégrés." },
              { title: "Conformité", desc: "Opérations certifiées HACCP/ISO avec traçabilité." },
              { title: "Résilience alimentaire", desc: "Pertes post-récolte réduites et offre stabilisée." },
            ],
          },
        },
      ],
    },
    programDetail: {
      backLabel: "Tous les Programmes",
      eyebrow: "Programme Phare",
      overviewLabel: "Aperçu du Programme",
      highlightsLabel: "Éléments Clés",
      statusLabel: "Statut",
      ctaTitle: "Partenariats pour ce Programme",
      ctaSubtitle: "Discutez des mandats, du co-financement ou des rôles opérationnels avec notre équipe.",
      ctaButton: "Envoyer une Demande",
    },
    countries: {
      title: "Où nous opérons",
      note: "Géographies actives et en pipeline",
      list: ["Ghana", "Gambie", "Sierra Leone", "Burkina Faso", "Côte d'Ivoire", "Angola", "Jordanie", "Égypte", "Syrie", "Soudan", "Arabie saoudite"],
      eyebrow: "Couverture Géographique",
      mapTitle: "Carte des Infrastructures Souveraines",
      mapCorridors: "{n} Corridors Membres Souverains",
      territoryLabel: "Territoire :",
      globalViewLabel: "Carte Globale",
      regionalViewLabel: "Focus Régional",
      activeRegionLabel: "Région Active",
      capitalLabel: "Capitale",
      presenceLabel: "Présence Institutionnelle",
      mapHint: "Survolez ou sélectionnez un territoire souverain pour inspecter les opérations des corridors régionaux.",
      regions: {
        westAfrica: "Afrique de l'Ouest",
        centralAfrica: "Afrique Centrale",
        northEastAfrica: "Afrique du Nord/Est",
        northAfrica: "Afrique du Nord",
        middleEast: "Moyen-Orient",
      },

      indexTitle: "Pays Membres & Corridors",
      corridorsLabel: "Corridors Régionaux Actifs",
      activeLabel: "Actif",
      pipelineLabel: "En préparation",
      projectsLabel: "Programmes",

    },
    governance: {
      title: "Gouvernance et conformité",
      pillarLabel: "Pilier",
      frameworkLabel: "CADRE //",
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
      profileLabel: "PROFIL //",
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
      vettedLabel: "Partenaires Institutionnels Stratégiques Agréés et Autorisés",
      networkLabel: "Réseau Mondial du Consortium AIABASD",

    },
    newsroom: {
      title: "Actualités et mises à jour",
      note: "Derniers faits saillants et annonces.",
      empty: "Les annonces, protocoles de partenariat et mises à jour terrain seront publiées ici.",
      eyebrow: "Presse & Analyses",
      newsletterTitle: "S'abonner aux Publications Institutionnelles",
      newsletterText: "Recevez directement les mises à jour exécutives, rapports de développement et annonces de partenariat.",
      newsletterPlaceholder: "votre.email@institution.org",
      newsletterCta: "S'abonner",
      newsletterSuccess: "Abonné — merci.",
      newsletterError: "Échec de l'abonnement. Veuillez réessayer.",
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Ouvert aux demandes gouvernementales, mandats d'investisseurs et partenariats opérationnels.",
      name: "Nom complet",
      email: "Email professionnel",
      org: "Organisation",
      msg: "Comment pouvons-nous collaborer ?",
      send: "Envoyer la demande",
      sent: "Demande Envoyée",
      eyebrow: "Liaison Exécutive",
      formTitle: "Envoyer une Demande Exécutive",
      hqTitle: "Sièges Mondiaux & Contacts",
      london: "Siège de Londres",
      uk: "Royaume-Uni",
      dakar: "Secrétariat Régional de Dakar",
      senegal: "Sénégal",
      submitting: "Envoi de la demande…",
      successNote: "Votre message a été reçu en toute sécurité. Référence : {ref}",
      reassure: "Les envois parviennent directement à notre équipe partenariats ; un associé répond généralement sous deux jours ouvrés.",
      anotherLabel: "ENVOYER UNE AUTRE DEMANDE",
      bookingTitle: "Réserver une réunion directe",
      bookingNote: "Passez devant la file — choisissez un créneau avec l'équipe partenariats.",
      bookingCta: "OUVRIR LE CALENDRIER",

      error: "Échec de l'envoi. Réessayez ou écrivez à contact@aiabasd.org",
      audienceLabel: "Je me renseigne en tant que",
      audienceOptions: ["Gouvernement / Municipalité", "Investisseur / IFD", "EPC / Partenaire opérationnel", "ONG / Agence de développement", "Presse / Recherche"],
      sectorLabel: "Secteur d'intérêt",
      regionLabel: "Région d'intérêt",
      ticketLabel: "Échelle d'engagement indicative",
      sectorOptions: ["Énergie", "Logistique & corridors", "Agriculture & sécurité alimentaire", "Infrastructure numérique", "Développement urbain", "Économie circulaire", "Installations humanitaires"],
      regionOptions: ["Afrique de l'Ouest", "Afrique de l'Est", "Afrique du Nord", "Levant", "Golfe", "Multi-régions"],
      ticketOptions: ["Moins de 10 M USD", "10–50 M USD", "50–250 M USD", "Plus de 250 M USD", "À définir"],
      placeholders: {
        name: "ex., Ziad Shneikat",
        email: "nom@entreprise.com",
        org: "Entreprise / Ministère / ONG",
        msg: "Décrivez brièvement l'opportunité, le calendrier et les parties prenantes…",
      },
      sidebar: {
        hq: "Siège de l'Alliance",
        channels: "Canaux",
        emailGeneralLabel: "Demandes générales",
        emailSecretariatLabel: "Secrétariat Général",
        emailFieldOpsLabel: "Opérations de terrain",
      },
    },
    footer: {
      rights: "Tous droits réservés.",
      privacy: "Confidentialité",
      terms: "Conditions",
      navTitle: "Navigation",
      engagementTitle: "Engagement",
      updatesTitle: "Mises à jour",
      backToTopLabel: "Retour en haut",
      links: {
        about: "À propos d'AIABASD",
        countries: "Couverture par Pays",
        governance: "Gouvernance & Éthique",
        partners: "Réseau de Partenaires",
        newsroom: "Presse & Actualités",
         contact: "Contact Exécutif",
         services: "Services Commerciaux",
         intelligence: "Intelligence de Marché",
         match: "Mise en relation",
      },
    },
    testimonials: {
      title: { main: "La voix de nos", highlighted: "partenaires", partner: "institutionnels" },
      controls: { prev: "Témoignage précédent", next: "Témoignage suivant", pause: "Mettre en pause la rotation", resume: "Reprendre la rotation", pagination: "Pagination des témoignages" },
      eyebrow: "Appuis & Leadership",
      subtitle: "Perspectives directes de partenaires souverains, d'investisseurs institutionnels et de directeurs du développement régional.",

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
      auditNote: "L'accès est surveillé et audité conformément au mandat de confidentialité institutionnelle souveraine.",
       rangeNote: "Les données économiques des projets et programmes ne sont pas publiées ici. Toute information commerciale est partagée uniquement lorsqu'elle est vérifiée, approuvée et pertinente pour l'institution.",
      backLabel: "Retour au Site Principal",
      secureLabel: "Accès Investisseur Sécurisé",
      verifying: "Vérification…",
      footerLine: "Réseau d'Investisseurs Exécutifs AIABASD.",
      toastSuccess: "Demande d'accès envoyée.",
      toastQueued: "Vérification institutionnelle en attente de la direction.",
      toastFailed: "Échec de l'envoi. Veuillez réessayer.",
      toastNetwork: "Erreur réseau lors de la vérification.",
      authFailed: "Email ou clé d'accès invalide.",
      authNetwork: "Erreur réseau lors de l'authentification.",
      requestAccessTitle: "Pas de clé d'accès ?",
      requestAccessNote: "Les institutions vérifiées peuvent demander des identifiants. L'accès est délivré après revue de la direction — jamais en libre-service.",
       requestCta: "DEMANDER L'ACCÈS",
       organizationLabel: "ORGANISATION",
       roleLabel: "RÔLE",
       partyTypeLabel: "TYPE DE PARTIE",
       interestLabel: "DOMAINE D'INTÉRÊT",
       targetProjectLabel: "PROJET CIBLE",
       messageLabel: "MESSAGE",
       messagePlaceholder: "Indiquez le contexte d'accès ou de projet recherché.",
       organizationPlaceholder: "Institution ou entreprise",
       rolePlaceholder: "Rôle ou mandat",
       partyTypePlaceholder: "Investisseur, institution publique, opérateur ou autre",
       interestPlaceholder: "Revue de projet, data room, partenariat ou autre",
       targetProjectPlaceholder: "Référence du projet ou portefeuille (facultatif)",
       privacyConsentLabel: "CONSENTEMENT CONFIDENTIALITÉ / TRAITEMENT",
       privacyConsentText: "J'autorise AIABASD à traiter ces informations pour examiner et traiter cette demande d'accès.",
       privacyLinkLabel: "Lire l'avis de confidentialité",
       accessStartEventLabel: "DEBUT_DEMANDE_ACCES"
    },
    vault: {
      title: "Salle des Données Investisseurs",
      subtitle: "Documents mis à disposition des institutions vérifiées sous confidentialité.",
      eyebrow: "ARCHIVE_RESTREINTE",
      docLabel: "DOCUMENTS_DISPONIBLES",
      empty: "Aucun document publié pour l'instant.",
      emptyNote: "La salle est opérationnelle. Les documents apparaîtront ici dès leur publication par le Secrétariat Général.",
      logout: "TERMINER LA SESSION",
      backLabel: "Retour à l'authentification",
      sessionNote: "Session valable 8 heures. L'accès est surveillé et audité.",
      restrictedNote: "Les documents sont confidentiels. Toute redistribution sans autorisation écrite est interdite.",
      fetchFailed: "Impossible de charger l'index des documents. Veuillez réessayer."
    },
    consent: {
      message: "Ce site mesure des consultations de pages anonymes et agrégées — aucun cookie, aucun identifiant, aucune donnée personnelle. Pouvons-nous compter votre visite ?",
      accept: "ACCEPTER",
      decline: "REFUSER",
      label: "Consentement analytique"
    },
    pipeline: {
      title: "Intelligence des Programmes",
      eyebrow: "EXPLORATEUR_PIPELINE",
      note: "Le portefeuille de programmes de l'Alliance — filtrez par corridor, secteur et étape de réalisation. Toutes les données sont vérifiées par le propriétaire.",
      filterAll: "Tous",
      filterCountry: "Corridor",
      filterSector: "Secteur",
      filterStatus: "Étape",
      multiRegion: "Multirégional",
      stageTitle: "Étape de réalisation",
      stages: ["Structuration", "Développement", "Exécution"],
      sdgTitle: "Matrice d'Alignement ODD",
      sdgNote: "Objectifs alignés par mandat de programme.",
      programsLabel: "Programmes",
      corridorsLabel: "Corridors",
    },
    corridor: {
      backLabel: "Tous les Corridors",
      regionLabel: "Région",
      statusLabel: "Statut",
      programsTitle: "Programmes dans ce corridor",
      regionalNote: "Les programmes multirégionaux sont structurés sur plusieurs corridors ; contactez l'Alliance pour l'allocation pays de chaque mandat.",
      capitalLabel: "Capitale",
      verifiedLabel: "VÉRIFIÉ 08/2026",
    },
    teamDetail: {
      backLabel: "Leadership",
      roleLabel: "Rôle",
      bioLabel: "Profil",
      contactCta: "Demander un entretien",
    },
    governanceDetail: {
      backLabel: "Cadre de Gouvernance",
      overviewLabel: "Aperçu du Cadre",
      practicesLabel: "Pratiques Opérationnelles",
      requestLabel: "Demander la documentation",
      requestNote: "Les cadres complets, modèles et pistes d'audit sont partagés avec les contreparties vérifiées sous NDA.",
    },
    engagements: {
      title: "Calendrier des Engagements",
      empty: "Les engagements, missions et réunions confirmés sont publiés ici dès leur programmation.",
      dateLabel: "Date",
      typeLabel: "Type",
      locationLabel: "Lieu",
    },
    visions: {
      title: "Visions",
      eyebrow: "HORIZON_STRATÉGIQUE",
      heroStatement: "Un continent où les infrastructures servent la dignité, le capital sert le développement, et la gouvernance sert les populations.",
      heroNote: "L'horizon stratégique de l'Alliance jusqu'en 2030 et au-delà — aligné sur les ODD 2030 et l'Agenda 2063 de l'Union Africaine.",
      missionTitle: "Mission",
      missionStatement: "Orchestrer des partenariats public-privé finançables qui comblent le déficit de financement des infrastructures africaines — estimé jusqu'à 170 milliards de dollars par an par la BAD — grâce à une gouvernance rigoureuse, une réalisation vérifiée, et des structures de frais de succès transparentes.",
      pillarsTitle: "Piliers Stratégiques",
      pillars:       [
            {
                  "title": "Origination Finançable",
                  "desc": "Chaque programme est structuré pour la clôture financière avant mobilisation.",
                  "code": "PILLAR_01"
            },
            {
                  "title": "Gouvernance comme Infrastructure",
                  "desc": "EISE/SGES, KYC/AML, ingénieurs et auditeurs indépendants ne sont pas des frais généraux — ils sont le mécanisme de réalisation.",
                  "code": "PILLAR_02"
            },
            {
                  "title": "Partenariat Souverain",
                  "desc": "Les gouvernements sont des contreparties. Les municipalités co-détiennent la réalisation.",
                  "code": "PILLAR_03"
            },
            {
                  "title": "Impact Vérifié",
                  "desc": "Les frais de succès ne se libèrent que contre des jalons vérifiés indépendamment.",
                  "code": "PILLAR_04"
            }
      ],
      alignmentTitle: "Alignement sur les Cadres Mondiaux",
      alignmentNote: "Chaque mandat s'aligne sur les cadres de développement internationaux.",
      sdgFrame: "Les 17 ODD définissent la taxonomie d'impact du portefeuille de l'Alliance. Chaque programme déclare ses objectifs alignés à l'entrée du mandat.",
      agendaFrame: "L'Agenda 2063 de l'Union Africaine encadre le mandat d'intégration continentale : connecter les corridors, bâtir la base industrielle.",
      horizonsTitle: "Horizons Futurs",
      horizonsNote: "Aspirations sectorielles vers lesquelles l'Alliance structure.",
      horizons:       [
            {
                  "sector": "Énergie",
                  "vision": "Capacité renouvelable dépassant 150 MW, avec stockage et modernisation du réseau."
            },
            {
                  "sector": "Numérique",
                  "vision": "Fibre dorsale et centres de données ramenant le contenu africain sur des serveurs africains."
            },
            {
                  "sector": "Économie Circulaire",
                  "vision": "Récupération industrielle des gravats transformant les décombres en intrants certifiés."
            },
            {
                  "sector": "Agriculture",
                  "vision": "Corridors de chaîne du froid réduisant les pertes post-récolte à moins de 15%."
            },
            {
                  "sector": "Villes",
                  "vision": "Zones industrielles PPP avec locataires sécurisés, centres EFTP, et services résilients."
            }
      ],
      leadershipTitle: "Perspectives de la Direction",
      leadershipNote: "La direction de l'Alliance telle qu'articulée par son leadership.",
      leadershipCta: "Demander un entretien de direction",
    },
    skipToContent: "Aller au contenu",
    langLabel: "FR",
  },
};
