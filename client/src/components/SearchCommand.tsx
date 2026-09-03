import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Home, Image, Mail, Globe, FileText, Users, Building2, Briefcase, X, Eye, FolderOpen } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { PROJECTS, PROJECTS_UI, COUNTRIES, type Locale3 } from "@/projects";
import { LOCALIZED_COPY } from "@/localizedCopy";

interface SearchCommandProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    toggleLang: () => void;
    currentLang: string;
}

export default function SearchCommand({ open, onOpenChange, toggleLang, currentLang }: SearchCommandProps) {
    const [, setLocation] = useLocation();
    const [search, setSearch] = useState("");
    const { lang } = useLanguageContext();
    const locale = lang as Locale3;
    const projectUI = PROJECTS_UI[locale];
    const copy = LOCALIZED_COPY[lang].search;

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
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
            <Command className="relative w-full max-w-2xl rounded-sm border border-neutral-200 bg-white overflow-hidden">
                <div className="flex items-center border-b border-neutral-200 px-4">
                    <Search className="mr-2 h-5 w-5 shrink-0 text-neutral-400" />
                    <Command.Input
                        value={search}
                        onValueChange={setSearch}
                         placeholder={copy.placeholder}
                        className="flex h-14 w-full bg-transparent py-3 text-base outline-none placeholder:text-neutral-400"
                    />
                    <button
                        onClick={() => onOpenChange(false)}
                        className="ml-2 rounded-sm p-1.5 hover:bg-neutral-100 transition"
                         aria-label={copy.close}
                    >
                        <X className="h-4 w-4 text-neutral-500" />
                    </button>
                </div>
                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                    <Command.Empty className="py-6 text-center text-sm text-neutral-500">
                        {copy.noResults}
                    </Command.Empty>

                     <Command.Group heading={copy.navigation} className="mb-2">
                         <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500">{copy.navigation}</div>
                        <Command.Item onSelect={() => handleNavigate("/")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Home className="h-4 w-4" />
                             <span>{copy.home}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#about")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <FileText className="h-4 w-4" />
                             <span>{copy.about}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#programs")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Briefcase className="h-4 w-4" />
                             <span>{copy.programs}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#team")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Users className="h-4 w-4" />
                             <span>{copy.team}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/visions")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Eye className="h-4 w-4" />
                             <span>{copy.visions}</span>
                        </Command.Item>
                         <Command.Item onSelect={() => handleNavigate("/intelligence")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Globe className="h-4 w-4" />
                             <span>{copy.intelligence}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/projects")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <FolderOpen className="h-4 w-4" />
                             <span>{copy.projects}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/gallery")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Image className="h-4 w-4" />
                             <span>{copy.gallery}</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#contact")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Mail className="h-4 w-4" />
                             <span>{copy.contact}</span>
                        </Command.Item>
                    </Command.Group>

                    <Command.Separator className="my-2 h-px bg-neutral-200" />

                    <Command.Group heading={projectUI.headerTitle}>
                        <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500">{projectUI.headerTitle}</div>
                        {PROJECTS.map((p) => (
                            <Command.Item
                                key={p.slug}
                                value={`${p.title[locale]} ${COUNTRIES[p.country][locale]}`}
                                onSelect={() => handleNavigate(`/projects/${p.slug}`)}
                                className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100"
                            >
                                <FolderOpen className="h-4 w-4 shrink-0 text-[#5a1f2e]" />
                                <span className="truncate">{p.title[locale]}</span>
                                <span className="ml-auto t-meta text-[10px] text-neutral-400 shrink-0">
                                    {COUNTRIES[p.country][locale]}
                                </span>
                            </Command.Item>
                        ))}
                    </Command.Group>

                    <Command.Separator className="my-2 h-px bg-neutral-200" />

                     <Command.Group heading={copy.actions}>
                         <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500">{copy.actions}</div>
                        <Command.Item
                            onSelect={() => {
                                toggleLang();
                                onOpenChange(false);
                            }}
                            className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100"
                        >
                            <Globe className="h-4 w-4" />
                             <span>{copy.switchLanguage} ({currentLang.toUpperCase()})</span>
                        </Command.Item>
                    </Command.Group>
                </Command.List>
                <div className="border-t border-neutral-200 px-4 py-2 text-xs text-neutral-500">
                     {copy.toggleHint}
                </div>
            </Command>
        </div>
    );
}
