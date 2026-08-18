import { useState, useEffect, memo } from "react";
import { Search, Menu, X, Lock, ArrowUpRight, Globe, Check } from "lucide-react";
import SearchCommand from "@/components/SearchCommand";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLanguageContext } from "@/contexts/LanguageContext";

interface HeaderProps {
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
}

const ORG_NAME = {
    en: "African International Alliance for Business & Sustainable Development",
    ar: "التحالف الدولي الأفريقي للأعمال والتنمية المستدامة",
    fr: "Alliance Internationale Africaine pour les Affaires et le Développement Durable",
} as const;

const LANG_OPTIONS = [
    { code: "en", label: "English", short: "EN" },
    { code: "ar", label: "العربية", short: "ع" },
    { code: "fr", label: "Français", short: "FR" },
] as const;

function HeaderComponent({ nav }: HeaderProps) {
    const { lang, setLang, isRTL } = useLanguageContext();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("#hero");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    const navLinks = [
        { href: "#about", label: nav.about },
        { href: "#programs", label: nav.programs },
        { href: "/gallery", label: nav.gallery },
        { href: "#countries", label: nav.countries },
        { href: "#governance", label: nav.governance },
        { href: "#team", label: nav.team },
        { href: "#partners", label: nav.partners },
        { href: "#news", label: nav.newsroom },
        { href: "#contact", label: nav.contact },
    ];

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);

            let current = "#hero";
            for (const link of navLinks) {
                if (!link.href.startsWith("#")) continue;
                const el = document.querySelector(link.href);
                if (el && (el as HTMLElement).getBoundingClientRect().top <= window.innerHeight * 0.4) {
                    current = link.href;
                }
            }
            setActiveSection(current);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!mobileMenuOpen && !langMenuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMobileMenuOpen(false);
                setLangMenuOpen(false);
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [mobileMenuOpen, langMenuOpen]);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const cycleLang = () => {
        setLang(lang === "en" ? "ar" : lang === "ar" ? "fr" : "en");
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${scrolled
                    ? "bg-[#F9F8F6]/90 backdrop-blur-2xl border-b border-black/5"
                    : "bg-transparent border-b border-white/5"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >

                <motion.div
                    className="absolute bottom-[-1px] left-0 h-[2px] bg-[#5a1f2e] origin-left"
                    style={{ scaleX: scrollYProgress }}
                />

                <div className="mx-auto flex max-w-[1700px] items-center justify-between px-8 lg:px-12 py-5 lg:py-6">
                    <a
                        href="/"
                        className="flex items-center gap-3.5 group"
                    >
                        <img
                            src="/logo.png"
                            alt="AIABASD"
                            className="h-12 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="leading-tight hidden sm:block border-s border-black/10 ps-3.5 ms-0.5">
                            <span className="font-extrabold text-xl tracking-tight text-[#0b0b10] block">
                                AIABASD
                            </span>
                            <span className="text-[11px] font-semibold text-[#5a1f2e] block max-w-[280px] leading-snug mt-0.5">
                                {ORG_NAME[lang]}
                            </span>
                        </div>
                    </a>

                    <nav className="hidden items-center gap-8 xl:flex" aria-label="Primary">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`group relative px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                                        isActive ? "text-[#5a1f2e]" : "text-[#0b0b10]/70 hover:text-[#5a1f2e]"
                                    }`}
                                >
                                    <span>{link.label}</span>
                                    <div className={`absolute bottom-0 left-0 h-0.5 bg-[#5a1f2e] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                                </a>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-4 lg:gap-6">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-3 bg-black/5 hover:bg-black text-black hover:text-white rounded-full transition-all duration-500 group"
                            aria-label="Search"
                        >
                            <Search className="h-4 w-4 group-hover:scale-125 transition-transform" />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setLangMenuOpen((v) => !v)}
                                aria-haspopup="menu"
                                aria-expanded={langMenuOpen}
                                aria-label="Change language"
                                className="flex items-center gap-2 px-4 py-2.5 bg-black/[0.03] hover:bg-black/[0.08] rounded-full text-[10px] font-black tracking-widest uppercase transition-all"
                            >
                                <span className="text-[#0b0b10]">{LANG_OPTIONS.find((l) => l.code === lang)?.short ?? "EN"}</span>
                                <Globe className="h-3 w-3 text-[#5a1f2e]" />
                            </button>

                            <AnimatePresence>
                                {langMenuOpen && (
                                    <motion.div
                                        role="menu"
                                        aria-label="Language"
                                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                        transition={{ duration: 0.18 }}
                                        className={`absolute top-[calc(100%+10px)] ${isRTL ? "left-0" : "right-0"} bg-white rounded-xl border border-black/10 shadow-xl p-1.5 min-w-[150px] z-50`}
                                    >
                                        {LANG_OPTIONS.map((option) => (
                                            <button
                                                key={option.code}
                                                role="menuitemradio"
                                                aria-checked={lang === option.code}
                                                onClick={() => {
                                                    setLang(option.code);
                                                    setLangMenuOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#0b0b10] hover:bg-black/5 transition-colors"
                                            >
                                                <span>{option.label}</span>
                                                {lang === option.code && <Check size={14} className="text-[#5a1f2e]" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <a
                            href="/investor-portal"
                            className="hidden lg:flex items-center gap-3 px-7 py-3 bg-[#5a1f2e] text-white text-[10px] font-black tracking-[0.3em] uppercase hover:bg-black transition-all duration-700 shadow-premium group"
                        >
                            <Lock className="h-3 w-3 shrink-0" />
                            <span>Investor Access</span>
                            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-nav"
                            className="xl:hidden p-3 bg-black text-white hover:bg-[#5a1f2e] transition-colors rounded-full"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            id="mobile-nav"
                            className="fixed inset-0 top-[84px] bg-[#F9F8F6] z-40 xl:hidden px-8 py-8 overflow-y-auto"
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        >
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                                 style={{ backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                            
                            <nav className="flex flex-col gap-5 relative z-10 pb-12" aria-label="Mobile">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        className="text-3xl font-institutional text-black italic hover:not-italic transition-all border-b border-black/5 pb-4 flex items-center justify-between group overflow-hidden"
                                        onClick={() => setMobileMenuOpen(false)}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.04 + 0.15 }}
                                    >
                                        <span className="transform transition-transform duration-700 group-hover:translate-x-4 italic">{link.label}</span>
                                        <ArrowUpRight className="w-8 h-8 text-[#5a1f2e] opacity-0 group-hover:opacity-100 transition-all -translate-x-6 group-hover:translate-x-0" />
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="/investor-portal"
                                    className="flex items-center justify-between group py-6 border-b border-black/5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.55 }}
                                >
                                    <span className="text-[12px] font-black tracking-[0.4em] uppercase text-[#5a1f2e]">Investor Access</span>
                                    <Lock className="h-5 w-5 text-black" />
                                </motion.a>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            <SearchCommand
                open={searchOpen}
                onOpenChange={setSearchOpen}
                toggleLang={cycleLang}
                currentLang={lang}
            />
        </>
    );
}

export default memo(HeaderComponent);
