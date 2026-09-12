import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useReducedMotion } from "framer-motion";
import { Search, Home, Image, Mail, Globe, FileText, Users, Briefcase, X, Eye, FolderOpen } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { PROJECTS, PROJECTS_UI, COUNTRIES, type Locale3 } from "@/projects";
import { LOCALIZED_COPY } from "@/localizedCopy";
import { COMPANIES } from "@/companies";
import { NETWORK_COPY } from "@/networkCopy";

interface SearchCommandProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    toggleLang: () => void;
    currentLang: string;
}

export default function SearchCommand({ open, onOpenChange, toggleLang, currentLang }: SearchCommandProps) {
    const [, setLocation] = useLocation();
    const [search, setSearch] = useState("");
    const shouldReduceMotion = useReducedMotion();
    const { lang, isRTL } = useLanguageContext();
    const locale = lang as Locale3;
    const projectUI = PROJECTS_UI[locale];
    const copy = LOCALIZED_COPY[lang].search;
    const itemClassName = "flex min-w-0 cursor-pointer items-center gap-3 px-3 py-2.5 text-sm text-[#0b0b10] transition-[background-color,color,transform] duration-200 hover:bg-[#5a1f2e]/10 active:translate-y-px aria-selected:bg-[#5a1f2e] aria-selected:text-[#fdfcfb] data-[selected=true]:bg-[#5a1f2e] data-[selected=true]:text-[#fdfcfb] motion-reduce:transition-none";
    const groupLabelClassName = "px-2 py-1.5 t-meta text-[10px] font-semibold text-[#5a1f2e]";

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
            if (e.key === "Escape") {
                onOpenChange(false);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, onOpenChange]);

    const handleNavigate = (path: string) => {
        const hashIndex = path.indexOf("#");
        if (hashIndex >= 0) {
            // Keep the path unprefixed for Wouter; its reactive base adds the
            // current locale. Setting the hash after navigation gives the
            // browser the authoritative /ar/#about or /fr/#contact URL.
            const hash = path.slice(hashIndex);
            setLocation("/");

            let attempts = 0;
            const scrollToTarget = () => {
                let id = hash.slice(1);
                try {
                    id = decodeURIComponent(id);
                } catch {
                }
                const target = document.getElementById(id);
                if (target) {
                    target.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
                    return;
                }
                if (attempts++ < 60) window.setTimeout(scrollToTarget, 50);
            };
            window.setTimeout(() => {
                window.location.hash = hash;
                scrollToTarget();
            }, 0);
        } else {
            // Wouter applies the router base to this unprefixed internal path.
            setLocation(path);
        }
        onOpenChange(false);
        setSearch("");
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[15vh]" role="dialog" aria-modal="false" aria-label={copy.placeholder}>
            <div className="fixed inset-0 bg-[#0b0b10]/55 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
            <Command className="relative w-full max-w-2xl overflow-hidden border border-[#0b0b10]/15 bg-[#fdfcfb] text-[#0b0b10] shadow-[0_26px_80px_rgba(90,31,46,0.22)]" dir={isRTL ? "rtl" : "ltr"}>
                <div className="flex items-center border-b border-[#0b0b10]/15 px-4">
                    <Search className="me-2 h-5 w-5 shrink-0 text-[#5a1f2e]" strokeWidth={1.75} />
                    <Command.Input
                        value={search}
                        onValueChange={setSearch}
                         placeholder={copy.placeholder}
                        className="flex h-14 min-w-0 w-full bg-transparent py-3 text-base outline-none placeholder:text-[#0b0b10]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a1f2e]"
                    />
                    <button
                        onClick={() => onOpenChange(false)}
                        className="ms-2 p-1.5 text-[#0b0b10]/60 transition-[background-color,color,transform] duration-200 hover:bg-[#5a1f2e]/10 hover:text-[#5a1f2e] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a1f2e] motion-reduce:transition-none"
                         aria-label={copy.close}
                    >
                        <X className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                </div>
                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                    <Command.Empty className="py-6 text-center text-sm text-[#0b0b10]/55 text-pretty">
                        {copy.noResults}
                    </Command.Empty>

                     <Command.Group heading={copy.navigation} className="mb-2">
                         <div className={groupLabelClassName}>{copy.navigation}</div>
                        <Command.Item onSelect={() => handleNavigate("/")} className={itemClassName}>
                            <Home className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                             <span className="min-w-0 break-words">{copy.home}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#about")} className={itemClassName}>
                            <FileText className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                             <span className="min-w-0 break-words">{copy.about}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#programs")} className={itemClassName}>
                            <Briefcase className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                             <span className="min-w-0 break-words">{copy.programs}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#team")} className={itemClassName}>
                            <Users className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                             <span className="min-w-0 break-words">{copy.team}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/visions")} className={itemClassName}>
                            <Eye className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                             <span className="min-w-0 break-words">{copy.visions}</span>
                        </Command.Item>
                         <Command.Item onSelect={() => handleNavigate("/intelligence")} className={itemClassName}>
                            <Globe className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                             <span className="min-w-0 break-words">{copy.intelligence}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/projects")} className={itemClassName}>
                            <FolderOpen className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                             <span className="min-w-0 break-words">{copy.projects}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/gallery")} className={itemClassName}>
                            <Image className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                             <span className="min-w-0 break-words">{copy.gallery}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#contact")} className={itemClassName}>
                            <Mail className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                             <span className="min-w-0 break-words">{copy.contact}</span>
                        </Command.Item>
                    </Command.Group>

                    <Command.Separator className="my-2 h-px bg-[#0b0b10]/15" />

                    <Command.Group heading={NETWORK_COPY[lang].directory}>
                        <Command.Item value={NETWORK_COPY[lang].directory} onSelect={() => handleNavigate("/companies")} className={itemClassName}>{NETWORK_COPY[lang].directory}</Command.Item>
                        {COMPANIES.map(company => <Command.Item key={company.slug} value={company.name} onSelect={() => handleNavigate(`/companies/${company.slug}`)} className={itemClassName}>{company.name}</Command.Item>)}
                    </Command.Group>

                    <Command.Group heading={projectUI.headerTitle}>
                        <div className={groupLabelClassName}>{projectUI.headerTitle}</div>
                        {PROJECTS.map((p) => (
                            <Command.Item
                                key={p.slug}
                                value={`${p.title[locale]} ${COUNTRIES[p.country][locale]}`}
                                onSelect={() => handleNavigate(`/projects/${p.slug}`)}
                                className={itemClassName}
                            >
                                <FolderOpen className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                                <span className="min-w-0 truncate">{p.title[locale]}</span>
                                <span className="ms-auto shrink-0 t-meta text-[10px] opacity-65">
                                    {COUNTRIES[p.country][locale]}
                                </span>
                            </Command.Item>
                        ))}
                    </Command.Group>

                    <Command.Separator className="my-2 h-px bg-[#0b0b10]/15" />

                     <Command.Group heading={copy.actions}>
                         <div className={groupLabelClassName}>{copy.actions}</div>
                        <Command.Item
                            onSelect={() => {
                                toggleLang();
                                onOpenChange(false);
                            }}
                            className={itemClassName}
                        >
                            <Globe className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                             <span className="min-w-0 break-words">{copy.switchLanguage} ({currentLang.toUpperCase()})</span>
                        </Command.Item>
                    </Command.Group>
                </Command.List>
                <div className="border-t border-[#0b0b10]/15 px-4 py-2 text-xs text-[#0b0b10]/55">
                     {copy.toggleHint}
                </div>
            </Command>
        </div>
    );
}
