import { useState, useEffect, useRef, memo } from "react";
import { Search, Menu, X, Lock, ArrowUpRight, Globe, Check } from "lucide-react";
import SearchCommand from "@/components/SearchCommand";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLocation } from "wouter";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedPath } from "@/localePath";

interface HeaderProps {
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
    const [location] = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("#hero");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const langButtonRef = useRef<HTMLButtonElement>(null);
    const langMenuRef = useRef<HTMLDivElement>(null);
    const mobileButtonRef = useRef<HTMLButtonElement>(null);
    const mobileSheetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    const isHomeRoute = location.split(/[?#]/, 1)[0] === "/";
    const sectionPath = (hash: string) => isHomeRoute ? hash : `${localizedPath("/", lang)}${hash}`;
    const navLinks = [
        { href: sectionPath("#about"), label: nav.about },
        { href: "/projects", label: nav.projects },
        { href: "/services", label: nav.services },
        { href: "/intelligence", label: nav.intelligence },
        { href: "/match", label: nav.match },
        { href: sectionPath("#contact"), label: nav.contact },
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
    }, []);

    useEffect(() => {
        if (!mobileMenuOpen && !langMenuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                const wasLang = langMenuOpen;
                setMobileMenuOpen(false);
                setLangMenuOpen(false);
                requestAnimationFrame(() => {
                    (wasLang ? langButtonRef.current : mobileButtonRef.current)?.focus();
                });
            }
            if (langMenuOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
                e.preventDefault();
                const items = Array.from(langMenuRef.current?.querySelectorAll<HTMLButtonElement>("button[role^=menuitem") ?? []);
                if (items.length === 0) return;
                const current = items.findIndex((b) => b === document.activeElement);
                const nextIndex = e.key === "ArrowDown"
                    ? (current + 1 + items.length) % items.length
                    : (current - 1 + items.length) % items.length;
                items[nextIndex].focus();
            }
            if (mobileMenuOpen && e.key === "Tab") {
                const sheet = mobileSheetRef.current;
                if (!sheet) return;
                const focusables = Array.from(sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
                if (focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                } else if (!sheet.contains(document.activeElement)) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [mobileMenuOpen, langMenuOpen]);

    useEffect(() => {
        if (!langMenuOpen) return;
        const onPointer = (e: PointerEvent) => {
            if (
                langMenuRef.current && !langMenuRef.current.contains(e.target as Node) &&
                langButtonRef.current && !langButtonRef.current.contains(e.target as Node)
            ) {
                setLangMenuOpen(false);
            }
        };
        document.addEventListener("pointerdown", onPointer);
        return () => document.removeEventListener("pointerdown", onPointer);
    }, [langMenuOpen]);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    useEffect(() => {
        if (mobileMenuOpen) {
            requestAnimationFrame(() => {
                mobileSheetRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
            });
        }
    }, [mobileMenuOpen]);

    const cycleLang = () => {
        setLang(lang === "en" ? "ar" : lang === "ar" ? "fr" : "en");
    };

    const textColor = scrolled ? "text-[#0b0b10]" : "text-white";
    const subColor = scrolled ? "text-[#5a1f2e]" : "text-[#f2a007]";
    const navColor = scrolled ? "text-[#0b0b10]/70 hover:text-[#5a1f2e]" : "text-white/70 hover:text-white";
    const navActive = scrolled ? "text-[#5a1f2e]" : "text-[#f2a007]";
    const underlineColor = scrolled ? "bg-[#5a1f2e]" : "bg-[#f2a007]";
    const btnBg = scrolled ? "bg-black/[0.03] hover:bg-black hover:text-white" : "bg-white/10 hover:bg-white hover:text-[#0b0b10] text-white";

    return (
        <>
            <motion.header
                className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled
                    ? "bg-[#F9F8F6]/90 backdrop-blur-2xl border-b border-black/5"
                    : "bg-transparent border-b border-white/10"
                    }`}
                initial={false}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                            <motion.div
                    className={`absolute bottom-[-1px] left-0 h-[2px] origin-left ${underlineColor}`}
                    style={{ scaleX: scrollYProgress }}
                />

                <div className="mx-auto flex max-w-[1700px] items-center justify-between px-8 lg:px-12 py-5 lg:py-6">
                        <a href={localizedPath("/", lang)} className="flex items-center gap-3.5 group">
                        <img
                            src="/logo.png"
                            alt="AIABASD"
                            className="h-12 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className={`leading-tight hidden sm:block border-s ps-3.5 ms-0.5 ${scrolled ? "border-black/10" : "border-white/15"}`}>
                            <span className={`font-extrabold text-xl tracking-tight block ${textColor}`}>
                                AIABASD
                            </span>
                            <span className={`text-[11px] font-semibold block max-w-[280px] leading-snug mt-0.5 ${subColor}`}>
                                {ORG_NAME[lang]}
                            </span>
                        </div>
                    </a>

                    <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href.startsWith("#") ? link.href : localizedPath(link.href, lang)}
                                    className={`group relative px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${isActive ? navActive : navColor}`}
                                >
                                    <span>{link.label}</span>
                                    <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${underlineColor} ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                                </a>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-4 lg:gap-6">
                        <button
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search"
                            className={`hidden sm:flex items-center gap-2 px-3 py-2.5 transition-colors duration-300 no-press t-meta ${btnBg}`}
                        >
                            <Search className="h-3.5 w-3.5" strokeWidth={1.5} />
                            <span className={`t-data text-[10px] border px-1.5 py-0.5 ${scrolled ? "border-black/15" : "border-white/20"}`}>Ctrl K</span>
                        </button>
                        <button
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search"
                            className={`sm:hidden p-3 transition-colors duration-300 no-press ${btnBg}`}
                        >
                            <Search className="h-4 w-4" strokeWidth={1.5} />
                        </button>

                        <div className="relative">
                            <button
                                ref={langButtonRef}
                                onClick={() => setLangMenuOpen((v) => !v)}
                                aria-haspopup="menu"
                                aria-expanded={langMenuOpen}
                                aria-label="Change language"
                                className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-black tracking-widest uppercase transition-colors no-press ${scrolled ? "bg-black/[0.03] hover:bg-black/[0.08]" : "bg-white/10 hover:bg-white/20 text-white"}`}
                            >
                                <span className={scrolled ? "text-[#0b0b10]" : "text-white"}>
                                    {LANG_OPTIONS.find((l) => l.code === lang)?.short ?? "EN"}
                                </span>
                                <Globe className={`h-3 w-3 ${scrolled ? "text-[#5a1f2e]" : "text-[#f2a007]"}`} />
                            </button>

                            <AnimatePresence>
                                {langMenuOpen && (
                                    <motion.div
                                        ref={langMenuRef}
                                        role="menu"
                                        aria-label="Language"
                                        initial={{ opacity: 0, y: -4, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ transformOrigin: isRTL ? "top left" : "top right" }}
                                        className={`absolute top-[calc(100%+10px)] ${isRTL ? "left-0" : "right-0"} bg-white border border-black/15 shadow-xl p-1.5 min-w-[150px] z-50`}
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
                                                className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-semibold text-[#0b0b10] hover:bg-black/5 transition-colors"
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
                             href={localizedPath("/investor-portal", lang)}
                            className={`hidden xl:flex items-center gap-3 px-6 py-3 text-[10px] font-black tracking-[0.25em] uppercase transition-colors duration-300 group no-press ${scrolled ? "bg-[#5a1f2e] hover:bg-black" : "bg-[#f2a007] hover:bg-white text-[#0b0b10]"}`}
                        >
                            <Lock className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                            <span>{nav.investorAccess}</span>
                            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
                        </a>

                        <button
                            ref={mobileButtonRef}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-nav"
                            className="lg:hidden p-3 bg-black text-white hover:bg-[#5a1f2e] transition-colors no-press"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            ref={mobileSheetRef}
                            id="mobile-nav"
                            className="fixed inset-0 top-[84px] bg-[#F9F8F6] z-40 lg:hidden px-8 py-8 overflow-y-auto"
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                        >
                            <nav className="flex flex-col gap-5 relative z-10 pb-12" aria-label="Mobile">
                                <motion.a
                                    href={sectionPath("#contact")}
                                    className="flex items-center justify-between py-4 px-5 bg-[#5a1f2e] text-white t-meta"
                                    onClick={() => setMobileMenuOpen(false)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <span>{nav.contact}</span>
                                    <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" strokeWidth={1.5} />
                                </motion.a>
                                <motion.a
                                     href={localizedPath("/investor-portal", lang)}
                                    className="flex items-center justify-between group py-5 border-b border-black/10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <span className="text-[12px] font-black tracking-[0.4em] uppercase text-[#5a1f2e]">{nav.investorAccess}</span>
                                    <Lock className="h-5 w-5 text-black" strokeWidth={1.5} />
                                </motion.a>
                                {navLinks.filter((l) => l.href !== sectionPath("#contact")).map((link, i) => (
                                    <motion.a
                                        key={link.href}
                                        href={localizedPath(link.href, lang)}
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
