import React, { useMemo, useState, useEffect } from "react";
import { ArrowRight, Globe2, ShieldCheck, Handshake, Leaf, Building2, Phone, Mail, MapPin, Linkedin, Twitter, Send, Loader2, CheckCircle2 } from "lucide-react";

/**
 * African International Alliance for Business & Sustainable Development (AIABASD)
 * Single-page React site (landing + sections) using TailwindCSS.
 *
 * Features:
 * - Trilingual support (English/Arabic/French) with RTL layout for Arabic
 * - Responsive design for all screen sizes
 * - Hero section with statistics
 * - Flagship programs showcase
 * - Governance & compliance framework
 * - Contact form with validation
 */

// ---- Brand Tokens ----
const BRAND = {
  primaryFrom: "#5a1f2e", // burgundy from logo
  primaryTo: "#f2a007", // gold from logo
  accent: "#f59e0b", // amber accent
  dark: "#0f1225",
  light: "#f8f7fc",
};

// Gradient helper
const gradient = `bg-[linear-gradient(135deg,${BRAND.primaryFrom},${BRAND.primaryTo})]`;

// ---- Copy (EN/AR) ----
const COPY = {
  en: {
    metaTitle: "AIABASD — African International Alliance for Business & Sustainable Development",
    nav: {
      about: "About",
      programs: "Programs",
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
    },
    programs: {
      title: "Flagship programs",
      list: [
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
      list: ["Ghana", "The Gambia", "Sierra Leone", "Burkina Faso", "Côte d'Ivoire", "Angola", "Jordan", "Egypt", "Syria"],
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
        {
          name: "Ahmad Jayousi",
          title: "Co-Founder & Partner",
          bio: "Accomplished leader with deep expertise in governance, compliance, and sustainable development frameworks for large-scale programs.",
          image: "/team/ahmad.jpg",
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
    langLabel: "العربية",
  },
  ar: {
    metaTitle: "التحالف الدولي الإفريقي للأعمال والتنمية المستدامة",
    nav: {
      about: "من نحن",
      programs: "البرامج",
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
    },
    programs: {
      title: "البرامج الرئيسية",
      list: [
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
      list: ["غانا", "غامبيا", "سيراليون", "بوركينا فاسو", "ساحل العاج", "أنغولا", "الأردن", "مصر", "سوريا"],
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
        {
          name: "أحمد الجيوسي",
          title: "المؤسس المشارك والشريك",
          bio: "قائد متمكن بخبرة عميقة في الحوكمة والامتثال وأطر التنمية المستدامة للبرامج واسعة النطاق.",
          image: "/team/ahmad.jpg",
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
    langLabel: "EN",
  },
  fr: {
    metaTitle: "AIABASD — Alliance Africaine Internationale pour les Affaires et le Développement Durable",
    nav: {
      about: "À propos",
      programs: "Programmes",
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
    },
    programs: {
      title: "Programmes phares",
      list: [
        {
          icon: <Building2 className="w-6 h-6" />,
          name: "Hub logistique et de reconstruction — Al-Arich",
          desc:
            "Hub logistique humanitaire régional servant la reconstruction de Gaza : entreposage (ambiant/froid), assemblage, opérations de flotte, facilitation douanière et contrats ONG.",
          tags: ["Humanitaire", "Entreposage", "Flotte"],
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
      list: ["Ghana", "Gambie", "Sierra Leone", "Burkina Faso", "Côte d'Ivoire", "Angola", "Jordanie", "Égypte", "Syrie"],
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
        {
          name: "Ahmad Jayousi",
          title: "Co-fondateur et associé",
          bio: "Leader accompli avec une expertise approfondie en gouvernance, conformité et cadres de développement durable pour les programmes à grande échelle.",
          image: "/team/ahmad.jpg",
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
    langLabel: "FR",
  },
};

// ---- Helpers ----
const Section = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>{children}</section>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/90 backdrop-blur">
    {children}
  </span>
);

// ---- Main App ----
export default function Home() {
  const [lang, setLang] = useState<"en" | "ar" | "fr">("en");
  const t = useMemo(() => COPY[lang as keyof typeof COPY], [lang]);
  const isRTL = lang === "ar";
  
  const toggleLang = () => {
    if (lang === "en") setLang("ar");
    else if (lang === "ar") setLang("fr");
    else setLang("en");
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.title = t.metaTitle;
  }, [isRTL, t]);

  // Simple contact form (static demo)
  const [form, setForm] = useState({ name: "", email: "", org: "", msg: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", org: "", msg: "" });
      setTimeout(() => setSent(false), 3000);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--fg)]" style={{
      ["--bg" as any]: BRAND.light,
      ["--fg" as any]: "#0b0b10",
    }}>
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="AIABASD" className="h-9 w-auto rounded-none" />
            <div className="leading-tight hidden md:block">
              <div className="font-semibold tracking-tight">AIABASD</div>
              <div className="text-xs opacity-60">African International Alliance</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {[
              { href: "#about", label: t.nav.about },
              { href: "#programs", label: t.nav.programs },
              { href: "#countries", label: t.nav.countries },
              { href: "#governance", label: t.nav.governance },
              { href: "#team", label: t.nav.team },
              { href: "#partners", label: t.nav.partners },
              { href: "#news", label: t.nav.newsroom },
              { href: "#contact", label: t.nav.contact },
            ].map((link: any) => (
              <a key={link.href} href={link.href} className="text-sm text-black/70 hover:text-black transition">
                {link.label}
              </a>
            ))}
          </nav>
          <button
            onClick={toggleLang}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${gradient} text-white hover:opacity-90`}
          >
            <Globe2 className="h-4 w-4" /> {t.langLabel}
          </button>
        </div>
      </header>

      {/* HERO */}
      <div className={`relative overflow-hidden ${gradient} text-white`}>
        <div className="absolute inset-0 opacity-10 [background:radial-gradient(600px_200px_at_10%_10%,white,transparent),radial-gradient(400px_200px_at_90%_30%,white,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 text-sm uppercase tracking-wider text-white/80">{t.hero.eyebrow}</div>
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{t.hero.title}</h1>
              <p className="mt-4 text-white/90 md:text-lg">{t.hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#programs" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black shadow hover:shadow-lg transition">
                  {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition">
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </div>
            <div className="grid w-full max-w-md grid-cols-2 gap-4 md:max-w-lg">
              {t.stats.map((s: any, i: number) => (
                <div key={i} className="rounded-2xl border border-white/30 bg-white/5 p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/90">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <div className="mb-2 text-sm font-semibold text-black/60">AIABASD</div>
            <h2 className="text-2xl font-bold md:text-3xl">{t.about.title}</h2>
            <p className="mt-4 text-black/70">{t.about.text}</p>
            <div className="mt-6 flex flex-col gap-3">
              {t.about.bullets.map((b: any, i: number) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${gradient} text-white flex-shrink-0`}>{b.icon}</div>
                  <p className="text-sm text-black/80">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-black/70">Delivery Framework</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/70">
              <li>Program origination & feasibility</li>
              <li>PPP/BOT structuring, risk allocation & bankability</li>
              <li>ESIA/ESMS, MRV, Independent Engineer & Auditor</li>
              <li>Procurement & EPC+F mobilization</li>
              <li>Operations, local-content, and skills/TVET enablement</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* PROGRAMS */}
      <Section id="programs" className="bg-white/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold md:text-3xl">{t.programs.title}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.programs.list.map((p: any, i: number) => (
              <div key={i} className="group rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className={`mb-4 inline-flex items-center justify-center rounded-2xl p-3 ${gradient} text-white`}>{p.icon}</div>
                <div className="text-lg font-semibold">{p.name}</div>
                <p className="mt-2 text-sm text-black/70">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag: string, j: number) => (
                    <span key={j} className="rounded-full bg-black/5 px-2 py-1 text-xs text-black/70">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* COUNTRIES */}
      <Section id="countries" className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{t.countries.title}</h2>
            <p className="mt-2 text-black/60">{t.countries.note}</p>
          </div>
          <Pill>
            <Globe2 className="h-4 w-4" /> {t.countries.list.length} regions
          </Pill>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {t.countries.list.map((c: string, i: number) => (
            <div key={i} className="rounded-2xl border border-black/10 bg-white p-4 text-sm font-medium shadow-sm">
              {c}
            </div>
          ))}
        </div>
      </Section>

      {/* GOVERNANCE */}
      <Section id="governance" className="bg-white/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold md:text-3xl">{t.governance.title}</h2>
          <p className="mt-3 max-w-3xl text-black/70">{t.governance.text}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.governance.pillars.map((g: any, i: number) => (
              <div key={i} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="text-base font-semibold">{g.title}</div>
                <p className="mt-2 text-sm text-black/70">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TEAM */}
      <Section id="team" className="bg-white/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold md:text-3xl">{t.team.title}</h2>
          <p className="mt-2 text-black/60">{t.team.note}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.team.list.map((member: any, i: number) => (
              <div key={i} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-4 flex items-center justify-center text-gray-500 text-sm">
                  {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> : "Photo"}
                </div>
                <div className="text-lg font-semibold">{member.name}</div>
                <div className={`text-sm font-medium mt-1 ${gradient} bg-clip-text text-transparent`}>{member.title}</div>
                <p className="mt-3 text-sm text-black/70">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PARTNERS */}
      <Section id="partners" className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{t.partners.title}</h2>
            <p className="mt-2 text-black/60">{t.partners.note}</p>
          </div>
          <a href="#contact" className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white ${gradient} transition hover:opacity-90`}>
            {lang === "en" ? "Become a partner" : "انضم كشريك"} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex h-24 items-center justify-center rounded-2xl border border-black/10 bg-white text-black/40 text-sm font-medium">
              LOGO {i + 1}
            </div>
          ))}
        </div>
      </Section>

      {/* NEWSROOM */}
      <Section id="news" className="bg-white/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold md:text-3xl">{t.newsroom.title}</h2>
          <p className="mt-2 text-black/60">{t.newsroom.note}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <article key={i} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="text-xs text-black/50">YYYY‑MM‑DD</div>
                <h3 className="mt-2 text-lg font-semibold">Headline placeholder</h3>
                <p className="mt-2 text-sm text-black/70">{t.newsroom.empty}</p>
                <a href="#" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-black/80 hover:underline">
                  Read more <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold md:text-3xl">{t.contact.title}</h2>
            <p className="mt-2 text-black/60">{t.contact.subtitle}</p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm text-black/70">{t.contact.name}</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t.contact.placeholders.name}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-black/30 transition"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-black/70">{t.contact.email}</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t.contact.placeholders.email}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/30 transition"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-black/70">{t.contact.org}</label>
                  <input
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    placeholder={t.contact.placeholders.org}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/30 transition"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-black/70">{t.contact.msg}</label>
                <textarea
                  required
                  rows={5}
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  placeholder={t.contact.placeholders.msg}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/30 transition resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending || sent}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white ${gradient} disabled:opacity-60 transition`}
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {lang === "en" ? "Sending…" : "جارٍ الإرسال…"}
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> {t.contact.sent}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> {t.contact.send}
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-4">
            <div className={`rounded-3xl p-6 text-white ${gradient}`}>
              <div className="text-lg font-semibold">{t.contact.sidebar.hq}</div>
              <div className="mt-3 flex items-start gap-3 text-sm text-white/90">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <div>City • Country (update with HQ address)</div>
              </div>
              <div className="mt-2 flex items-start gap-3 text-sm text-white/90">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <div>+XXX XXX XXX XXX</div>
              </div>
              <div className="mt-2 flex items-start gap-3 text-sm text-white/90">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <div>contact@aiabasd.org</div>
              </div>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-black/70">{t.contact.sidebar.channels}</div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a href="#" className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white ${gradient} transition hover:opacity-90`}>
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm transition hover:bg-black/5">
                  <Twitter className="h-4 w-4" /> X (Twitter)
                </a>
                <a href="mailto:contact@aiabasd.org" className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm transition hover:bg-black/5">
                  <Mail className="h-4 w-4" /> Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-black/60 md:flex-row">
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 rounded-lg ${gradient}`} />
            <span>© {new Date().getFullYear()} AIABASD. {t.footer.rights}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-black transition">{t.footer.privacy}</a>
            <a href="#" className="hover:text-black transition">{t.footer.terms}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
