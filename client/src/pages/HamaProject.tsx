import { useMemo, useRef, useEffect } from "react";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useScroll, useSpring, useTransform } from "framer-motion";
import {
    School,
    Hospital,
    Users,
    Calendar,
} from "lucide-react";
import SEO from "@/components/SEO";

// Decomposed Modular Components
import HamaHUD from "@/components/hama/HamaHUD";
import HamaHero from "@/components/hama/HamaHero";
import HamaStats from "@/components/hama/HamaStats";
import HamaAbout from "@/components/hama/HamaAbout";
import HamaPhases from "@/components/hama/HamaPhases";
import HamaCTA from "@/components/hama/HamaCTA";

const HAMA_CONTENT = {
    en: {
        nav: {
            back: "Return to Flagship",
            title: "Fida'an for Hama",
        },
        hero: {
            eyebrow: "Regional Humanitarian Command",
            title: "Fida'an for Hama Restoration",
            subtitle: "Architecting Hope Through Civic Infrastructure",
            description:
                "An elite rehabilitation mandate restoring 50 schools and 20 clinical centers in Hama, Syria — establishing sovereign-grade environments for sustainable growth.",
            ctaPrimary: "Mandate Support",
            ctaSecondary: "Inquiry Node",
        },
        stats: [
            { value: "50", number: 50, label: "Educational Assets", icon: School, id: "SCH_50" },
            { value: "20", number: 20, label: "Clinical Pockets", icon: Hospital, id: "MED_20" },
            { value: "100K+", number: 100, suffix: "K+", label: "Anchored Lives", icon: Users, id: "BNF_100" },
            { value: "2025", number: 2025, label: "Operational Year", icon: Calendar, id: "MDT_25" },
        ],
        about: {
            title: "The Mandate",
            subtitle: "Dignity via Architectural Sovereignty",
            text: "The 'Fida'an for Hama' mandate is a precision structural effort to secure the regional future. By rehabilitating the pillars of education and health, we anchor community resilience for decades.",
            highlights: [
                {
                    title: "Scholastic Precision",
                    desc: "Renovating 50 campuses with grade-A structural standards.",
                },
                {
                    title: "Clinical Integrity",
                    desc: "Restoration of 20 high-capacity healthcare nodes with life-support resilience.",
                },
                {
                    title: "Sovereign Legacy",
                    desc: "Infrastructural anchors designed to survive generational shifts.",
                },
            ],
        },
        phases: {
            title: "Evolution",
            subtitle: "Operational Recovery Roadmap",
            list: [
                {
                    phase: "01",
                    title: "Audit & Strategy",
                    desc: "Structural integrity assessment and priority node selection.",
                    status: "Archived",
                },
                {
                    phase: "02",
                    title: "Resource & Design",
                    desc: "Architectural specification and ethical material procurement.",
                    status: "Active",
                },
                {
                    phase: "03",
                    title: "Physical Execution",
                    desc: "Complex restoration mobilizing local engineering expertise.",
                    status: "Queue",
                },
            ],
        },
        cta: {
            title: "Join the Mandate",
            subtitle: "Sustain the bridge between regional crisis and community sovereignty.",
            button: "Engagement Portal",
        }
    },
    ar: {
        nav: {
            back: "العودة للمقر الرئيسي",
            title: "فداءً لحماة",
        },
        hero: {
            eyebrow: "القيادة الإنسانية الإقليمية",
            title: "مبادرة فداءً لحماة",
            subtitle: "صناعة الأمل من خلال البنية التحتية المدنية",
            description:
                "تفويض إعادة تأهيل نخبوي لترميم 50 مدرسة و20 مركزاً طبياً في حماة، سوريا — لتأسيس بيئات سيادية للنمو المستدام.",
            ctaPrimary: "دعم التفويض",
            ctaSecondary: "عقدة الاستفسار",
        },
        stats: [
            { value: "50", number: 50, label: "أصول تعليمية", icon: School, id: "SCH_50" },
            { value: "20", number: 20, label: "جيوب طبية", icon: Hospital, id: "MED_20" },
            { value: "+100 ألف", number: 100, suffix: " ألف+", label: "أرواح مستقرة", icon: Users, id: "BNF_100" },
            { value: "2025", number: 2025, label: "سنة العمليات", icon: Calendar, id: "MDT_25" },
        ],
        about: {
            title: "التفويض",
            subtitle: "الكرامة عبر السيادة المعمارية",
            text: "تفويض 'فداءً لحماة' هو جهد إنشائي دقيق لتأمين المستقبل الإقليمي. من خلال إعادة تأهيل ركائز التعليم والصحة، نرسخ صمود المجتمع لعقود.",
            highlights: [
                {
                    title: "الدقة المدرسية",
                    desc: "تجديد 50 حرماً مدرسياً بمعايير إنشائية من الفئة أ.",
                },
                {
                    title: "النزاهة الطبية",
                    desc: "ترميم 20 عقدة رعاية صحية عالية القدرة مع مرونة دعم الحياة.",
                },
                {
                    title: "إرث سيادي",
                    desc: "مرتكزات بنية تحتية مصممة للنجاة من التحولات الجيلية.",
                },
            ],
        },
        phases: {
            title: "التطور",
            subtitle: "خارطة طريق التعافي العملياتي",
            list: [
                {
                    phase: "01",
                    title: "التدقيق والاستراتيجية",
                    desc: "تقييم السلامة الإنشائية واختيار العقد ذات الأولوية.",
                    status: "مؤرشف",
                },
                {
                    phase: "02",
                    title: "الموارد والتصميم",
                    desc: "المواصفات المعمارية والمشتريات الأخلاقية للمواد.",
                    status: "نشط",
                },
                {
                    phase: "03",
                    title: "التنفيذ المادي",
                    desc: "ترميم معقد يحشد الخبرات الهندسية المحلية.",
                    status: "في قائمة الانتظار",
                },
            ],
        },
        cta: {
            title: "انضم للتفويض",
            subtitle: "حافظ على الجسر بين الأزمة الإقليمية وسيادة المجتمع.",
            button: "بوابة المشاركة",
        }
    },
    fr: {
        nav: {
            back: "Retour au Phare",
            title: "Fida'an pour Hama",
        },
        hero: {
            eyebrow: "Commandement Humanitaire Régional",
            title: "Restauration Fida'an pour Hama",
            subtitle: "Construire l'Espoir par les Infrastructures Civiques",
            description:
                "Un mandat de réhabilitation d'excellence restaurant 50 écoles et 20 centres médicaux à Hama, en Syrie — établissant des environnements de qualité souveraine pour une croissance durable.",
            ctaPrimary: "Soutenir le Mandat",
            ctaSecondary: "Contact",
        },
        stats: [
            { value: "50", number: 50, label: "Actifs Éducatifs", icon: School, id: "SCH_50" },
            { value: "20", number: 20, label: "Pôles Médicaux", icon: Hospital, id: "MED_20" },
            { value: "100K+", number: 100, suffix: "K+", label: "Vies Ancrées", icon: Users, id: "BNF_100" },
            { value: "2025", number: 2025, label: "Année Opérationnelle", icon: Calendar, id: "MDT_25" },
        ],
        about: {
            title: "Le Mandat",
            subtitle: "La Dignité par la Souveraineté Architecturale",
            text: "Le mandat « Fida'an pour Hama » est un effort structurel de précision pour sécuriser l'avenir régional. En réhabilitant les piliers de l'éducation et de la santé, nous ancrons la résilience communautaire pour des décennies.",
            highlights: [
                {
                    title: "Précision Scolaire",
                    desc: "Rénovation de 50 établissements selon des normes structurelles de classe A.",
                },
                {
                    title: "Intégrité Clinique",
                    desc: "Restauration de 20 pôles de santé à haute capacité avec résilience de maintien de vie.",
                },
                {
                    title: "Héritage Souverain",
                    desc: "Des ancres infrastructureles conçues pour traverser les mutations générationnelles.",
                },
            ],
        },
        phases: {
            title: "Évolution",
            subtitle: "Feuille de Route du Relèvement Opérationnel",
            list: [
                {
                    phase: "01",
                    title: "Audit & Stratégie",
                    desc: "Évaluation de l'intégrité structurelle et sélection des nœuds prioritaires.",
                    status: "Archivé",
                },
                {
                    phase: "02",
                    title: "Ressources & Conception",
                    desc: "Spécifications architecturales et approvisionnement éthique en matériaux.",
                    status: "Actif",
                },
                {
                    phase: "03",
                    title: "Exécution Physique",
                    desc: "Restauration complexe mobilisant l'expertise d'ingénierie locale.",
                    status: "En File",
                },
            ],
        },
        cta: {
            title: "Rejoignez le Mandat",
            subtitle: "Soutenir le pont entre la crise régionale et la souveraineté communautaire.",
            button: "Portail d'Engagement",
        }
    }
};

export default function HamaProject() {
    const { lang, isRTL } = useLanguageContext();
    const t = useMemo(() => HAMA_CONTENT[lang as keyof typeof HAMA_CONTENT] || HAMA_CONTENT.en, [lang]);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const heroLetterY = useTransform(smoothProgress, [0, 0.2], [0, -400]);
    const opacityTransform = useTransform(smoothProgress, [0, 0.1], [1, 0]);
    const scaleTransform = useTransform(smoothProgress, [0, 0.1], [1, 1.05]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div ref={containerRef} className={`bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? 'font-arabic' : 'font-institutional'} overflow-hidden`}>
            <SEO
                title={`${t.nav.title} | AIABASD Flagship`}
                description={t.hero.description}
                lang={lang}
                url="/hama-project"
            />

            <HamaHUD backLabel={t.nav.back} isRTL={isRTL} />

            <HamaHero 
                t={t.hero} 
                isRTL={isRTL} 
                opacityTransform={opacityTransform} 
                scaleTransform={scaleTransform} 
                heroLetterY={heroLetterY} 
            />

            <HamaStats stats={t.stats} />

            <HamaAbout t={t.about} isRTL={isRTL} />

            <HamaPhases t={t.phases} />

            <HamaCTA t={t.cta} />

            {/* Custom Architectural Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                .text-8xl { font-size: clamp(4rem, 8vw, 15vw); }
                .tracking-tightest { letter-spacing: -0.08em; }
                .hud-label {
                    font-size: 8px;
                    font-weight: 900;
                    letter-spacing: 1.2em;
                    text-transform: uppercase;
                }
            `}} />
        </div>
    );
}
