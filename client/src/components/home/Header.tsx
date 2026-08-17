import { useState, useEffect, memo } from "react";
import { Globe2, Search, Menu, X, Lock, ArrowUpRight } from "lucide-react";
import SearchCommand from "@/components/SearchCommand";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

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
    langLabel: string;
    toggleLang: () => void;
    currentLang: string;
}



export default function Header({ nav, langLabel, toggleLang, currentLang }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("#hero");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ["about", "programs", "countries", "governance", "team", "partners", "news", "contact"];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 120 && rect.bottom >= 120) {
                        setActiveSection(`#${section}`);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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


                {/* Progress Narrative */}
                <motion.div
                    className="absolute bottom-[-1px] left-0 h-[2px] bg-[#5a1f2e] origin-left"
                    style={{ scaleX: scrollYProgress }}
                />

                <div className="mx-auto flex max-w-[1700px] items-center justify-between px-8 lg:px-12 py-6">
                    {/* Brand Signature */}
                    <a
                        href="/"
                        className="flex items-center gap-3.5 group"
                    >
                        <img
                            src="/logo.png"
                            alt="AIABASD"
                            className="h-12 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="leading-tight hidden sm:block border-l border-black/10 pl-3.5 ml-0.5">
                            <span className="font-extrabold text-xl tracking-tight text-[#0b0b10] block">
                                AIABASD
                            </span>
                            <span className="text-[11px] font-semibold text-[#5a1f2e] block max-w-[280px] leading-snug mt-0.5">
                                {currentLang === "ar"
                                    ? "التحالف الدولي الأفريقي للأعمال والتنمية المستدامة"
                                    : currentLang === "fr"
                                    ? "Alliance Internationale Africaine pour les Affaires et le Développement Durable"
                                    : "African International Business Alliance & Sustainable Development"}
                            </span>
                        </div>
                    </a>

                    {/* Architectural Navigation */}
                    <nav className="hidden items-center gap-8 xl:flex">
                        {navLinks.map((link, i) => {
                            const isActive = activeSection === link.href;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                                        isActive ? "text-[#5a1f2e]" : "text-[#0b0b10]/70 hover:text-[#5a1f2e]"
                                    }`}
                                >
                                    <span>{link.label}</span>
                                    <div className={`absolute bottom-0 left-0 h-0.5 bg-[#5a1f2e] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                                </a>
                            );
                        })}
                    </nav>

                    {/* Operational Actions */}
                    <div className="flex items-center gap-6 lg:gap-10">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-3 bg-black/5 hover:bg-black text-black hover:text-white rounded-full transition-all duration-500 group"
                            aria-label="Search"
                        >
                            <Search className="h-4 w-4 group-hover:scale-125 transition-transform" />
                        </button>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleLang}
                                className="flex items-center gap-2 px-4 py-2 bg-black/[0.03] hover:bg-black/[0.08] rounded-full text-[10px] font-black tracking-widest uppercase transition-all overflow-hidden relative group"
                            >
                                <span className="relative z-10 transition-colors group-hover:text-[#5a1f2e]">{langLabel}</span>
                                <Globe2 className="h-3 w-3 relative z-10 group-hover:rotate-180 transition-transform duration-1000" />
                            </button>

                            <a
                                href="/investor-portal"
                                className="hidden lg:flex items-center gap-4 px-8 py-3 bg-[#5a1f2e] text-white text-[10px] font-black tracking-[0.4em] uppercase hover:bg-black transition-all hover:px-10 duration-700 shadow-premium group"
                            >
                                <Lock className="h-3 w-3 group-hover:animate-pulse" />
                                <span>Portal</span>
                                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>

                        {/* Mobile Menu Trigger */}
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

                {/* Mobile Navigation Reveal */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="fixed inset-0 top-[88px] lg:top-[124px] bg-[#F9F8F6] z-40 xl:hidden px-8 py-12"
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        >
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                                 style={{ backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                            
                            <nav className="flex flex-col gap-10 relative z-10">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        className="text-6xl font-institutional text-black italic hover:not-italic transition-all border-b border-black/5 pb-6 flex items-center justify-between group overflow-hidden"
                                        onClick={() => setMobileMenuOpen(false)}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 + 0.3 }}
                                    >
                                        <span className="transform transition-transform duration-700 group-hover:translate-x-4 italic">{link.label}</span>
                                        <ArrowUpRight className="w-12 h-12 text-[#5a1f2e] opacity-0 group-hover:opacity-100 transition-all -translate-x-10 group-hover:translate-x-0" />
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="/investor-portal"
                                    className="flex items-center justify-between group py-10 border-b border-black/5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <span className="text-[12px] font-black tracking-[0.5em] uppercase text-[#5a1f2e]">MANDATE ACCESS: PORTAL</span>
                                    <Lock className="h-6 w-6 text-black" />
                                </motion.a>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            <SearchCommand
                open={searchOpen}
                onOpenChange={setSearchOpen}
                toggleLang={toggleLang}
                currentLang={currentLang}
            />
        </>
    );
}
