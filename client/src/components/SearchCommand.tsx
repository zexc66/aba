import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Home, Image, Mail, Globe, FileText, Users, Building2, Briefcase, X } from "lucide-react";
import { useLocation } from "wouter";

interface SearchCommandProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    toggleLang: () => void;
    currentLang: string;
}

export default function SearchCommand({ open, onOpenChange, toggleLang, currentLang }: SearchCommandProps) {
    const [, setLocation] = useLocation();
    const [search, setSearch] = useState("");

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
        if (path.startsWith("#")) {
            window.location.hash = path;
        } else {
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
                        placeholder="Type a command or search..."
                        className="flex h-14 w-full bg-transparent py-3 text-base outline-none placeholder:text-neutral-400"
                    />
                    <button
                        onClick={() => onOpenChange(false)}
                        className="ml-2 rounded-sm p-1.5 hover:bg-neutral-100 transition"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4 text-neutral-500" />
                    </button>
                </div>
                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                    <Command.Empty className="py-6 text-center text-sm text-neutral-500">
                        No results found.
                    </Command.Empty>

                    <Command.Group heading="Navigation" className="mb-2">
                        <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500">Navigation</div>
                        <Command.Item onSelect={() => handleNavigate("/")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#about")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <FileText className="h-4 w-4" />
                            <span>About</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#programs")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Briefcase className="h-4 w-4" />
                            <span>Programs</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#team")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Users className="h-4 w-4" />
                            <span>Team</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/gallery")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Image className="h-4 w-4" />
                            <span>Gallery</span>
                        </Command.Item>
                        <Command.Item onSelect={() => handleNavigate("/#contact")} className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100">
                            <Mail className="h-4 w-4" />
                            <span>Contact</span>
                        </Command.Item>
                    </Command.Group>

                    <Command.Separator className="my-2 h-px bg-neutral-200" />

                    <Command.Group heading="Actions">
                        <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500">Actions</div>
                        <Command.Item
                            onSelect={() => {
                                toggleLang();
                                onOpenChange(false);
                            }}
                            className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100 aria-selected:bg-neutral-100"
                        >
                            <Globe className="h-4 w-4" />
                            <span>Switch Language ({currentLang.toUpperCase()})</span>
                        </Command.Item>
                    </Command.Group>
                </Command.List>
                <div className="border-t border-neutral-200 px-4 py-2 text-xs text-neutral-500">
                    Press <kbd className="bg-black/5 px-1.5 py-0.5 t-data">Ctrl</kbd> + <kbd className="bg-black/5 px-1.5 py-0.5 t-data">K</kbd> to toggle
                </div>
            </Command>
        </div>
    );
}
