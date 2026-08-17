import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, ArrowUpRight, ArrowUp } from "lucide-react";
import { useState, memo } from "react";

interface FooterProps {
    data: {
        rights: string;
        privacy: string;
        terms: string;
    };
    lang: string;
}

const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:contact@aiabasd.org" },
];

const navigation = [
    { 
        title: "Navigation", 
        links: [
            { label: "About AIABASD", href: "#about" },
            { label: "Country Coverage", href: "#countries" },
            { label: "Governance & Ethics", href: "#governance" }
        ]
    },
    { 
        title: "Engagement", 
        links: [
            { label: "Partner Network", href: "#partners" },
            { label: "Press & Newsroom", href: "#news" },
            { label: "Executive Contact", href: "#contact" }
        ]
    }
];

function FooterComponent({ data, lang }: FooterProps) {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitting(true);
        try {
            const response = await fetch("/api/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "NEWSLETTER", email })
            });
            if (response.ok) {
                setSuccess(true);
                setEmail("");
                setTimeout(() => setSuccess(false), 4000);
            }
        } catch (error) {
            console.error("Newsletter error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <footer className="relative bg-[#0b0b10] text-[#fdfcfb] pt-20 pb-12 overflow-hidden border-t border-white/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                
                {/* Main Footer Row */}
                <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
                    
                    {/* Brand Info */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-4">
                            <img
                                src="/logo.png"
                                alt="AIABASD"
                                className="h-14 w-auto object-contain"
                            />
                            <div className="border-l border-white/15 pl-3.5 ml-0.5">
                                <span className="font-extrabold text-xl text-white block leading-none">AIABASD</span>
                                <span className="text-[11px] font-semibold text-[#f2a007] block max-w-[280px] leading-snug mt-1">
                                    {lang === "ar"
                                        ? "التحالف الدولي الأفريقي للأعمال والتنمية المستدامة"
                                        : lang === "fr"
                                        ? "Alliance Internationale Africaine pour les Affaires et le Développement Durable"
                                        : "African International Business Alliance & Sustainable Development"}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                            {lang === "en"
                                ? "Architecting Sustainable Futures Across the Global South."
                                : lang === "ar"
                                    ? "صياغة مستقبل مستدام في الجنوب العالمي."
                                    : "Bâtir un Avenir Durable à Travers le Sud Global."
                            }
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#5a1f2e] hover:text-white hover:border-[#5a1f2e] transition-colors"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8">
                        {navigation.map((group, i) => (
                            <div key={i} className="space-y-4">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f2a007]">
                                    {group.title}
                                </h4>
                                <ul className="space-y-2.5">
                                    {group.links.map((link, j) => (
                                        <li key={j}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-white/70 hover:text-white transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Newsletter Signup */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#f2a007]">
                                Updates
                            </h4>
                            <p className="text-xs text-white/60 leading-normal">
                                Subscribe to institutional announcements.
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@org.com"
                                    className="w-full bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder:text-white/40 rounded-md outline-none focus:border-[#f2a007] transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={submitting || success}
                                    className="w-full bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 text-white font-semibold text-xs py-2 rounded-md transition-colors"
                                >
                                    {submitting ? "Sending..." : success ? "Subscribed!" : "Subscribe"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Bottom Legal & Back to Top */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
                    <div>
                        © {new Date().getFullYear()} AIABASD. All Rights Reserved.
                    </div>

                    <div className="flex items-center gap-6 font-medium">
                        <a href="#" className="hover:text-white transition-colors">{data.privacy}</a>
                        <a href="#" className="hover:text-white transition-colors">{data.terms}</a>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
                        >
                            <span>Back to top</span>
                            <ArrowUp size={14} />
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
}

const Footer = memo(FooterComponent);
export default Footer;
