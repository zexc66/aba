import { useState, memo } from "react";
import { Mail, MapPin, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/section";

interface ContactProps {
    data: {
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
        placeholders: {
            name: string;
            email: string;
            org: string;
            msg: string;
        };
        sidebar: {
            hq: string;
            channels: string;
        };
    };
    lang: string;
}

function ContactComponent({ data }: ContactProps) {
    const [form, setForm] = useState({ name: "", email: "", org: "", msg: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [reference, setReference] = useState<string | null>(null);
    const [error, setError] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        setError(false);

        try {
            const response = await fetch("/api/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "CONTACT",
                    name: form.name,
                    email: form.email,
                    organization: form.org,
                    message: form.msg
                })
            });

            if (!response.ok) {
                throw new Error(`Submission failed: ${response.status}`);
            }

            const body = (await response.json().catch(() => null)) as { reference?: string } | null;
            setReference(typeof body?.reference === "string" ? body.reference : null);
            setSent(true);
            setForm({ name: "", email: "", org: "", msg: "" });
        } catch (err) {
            console.error("Submission error:", err);
            setError(true);
            setTimeout(() => setError(false), 8000);
        } finally {
            setSending(false);
        }
    };

    return (
        <Section id="contact" className="relative py-24 bg-[#fdfcfb] border-b border-black/5">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    <div className="lg:col-span-5 space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#5a1f2e]">
                                    {data.eyebrow}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b0b10] mb-4">
                                {data.title}
                            </h2>
                            <p className="text-base text-black/70 leading-relaxed border-l-2 border-[#5a1f2e] pl-4 py-1">
                                {data.subtitle}
                            </p>
                        </div>

                        <div className="space-y-6 bg-white p-8 rounded-xl border border-black/5 shadow-sm">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-black/40">
                                {data.hqTitle}
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 text-sm text-[#0b0b10]">
                                    <MapPin className="w-5 h-5 text-[#5a1f2e] shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold">{data.london}</div>
                                        <div className="text-black/60 text-xs mt-0.5">{data.uk}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 text-sm text-[#0b0b10]">
                                    <MapPin className="w-5 h-5 text-[#5a1f2e] shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold">{data.dakar}</div>
                                        <div className="text-black/60 text-xs mt-0.5">{data.senegal}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-[#0b0b10] pt-2 border-t border-black/5">
                                    <Mail className="w-5 h-5 text-[#5a1f2e] shrink-0" />
                                    <a href="mailto:contact@aiabasd.org" className="font-semibold hover:text-[#5a1f2e] transition-colors">
                                        contact@aiabasd.org
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-xl border border-black/5 shadow-sm">
                        <h3 className="text-xl font-bold text-[#0b0b10] mb-6 pb-4 border-b border-black/5">
                            {data.formTitle}
                        </h3>

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="contact-name" className="text-xs font-semibold text-black/70">
                                        {data.name} *
                                    </label>
                                    <input
                                        id="contact-name"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder={data.placeholders.name}
                                        className="w-full bg-[#fdfcfb] border border-black/10 px-4 py-3 rounded-lg text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-white transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="contact-org" className="text-xs font-semibold text-black/70">
                                        {data.org}
                                    </label>
                                    <input
                                        id="contact-org"
                                        value={form.org}
                                        onChange={(e) => setForm({ ...form, org: e.target.value })}
                                        placeholder={data.placeholders.org}
                                        className="w-full bg-[#fdfcfb] border border-black/10 px-4 py-3 rounded-lg text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="contact-email" className="text-xs font-semibold text-black/70">
                                    {data.email} *
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder={data.placeholders.email}
                                    className="w-full bg-[#fdfcfb] border border-black/10 px-4 py-3 rounded-lg text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-white transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="contact-msg" className="text-xs font-semibold text-black/70">
                                    {data.msg} *
                                </label>
                                <textarea
                                    id="contact-msg"
                                    required
                                    rows={4}
                                    value={form.msg}
                                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                                    placeholder={data.placeholders.msg}
                                    className="w-full bg-[#fdfcfb] border border-black/10 px-4 py-3 rounded-lg text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-white transition-all resize-none"
                                />
                            </div>

                            <div className="pt-4 flex items-center justify-between gap-4">
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="px-8 py-3.5 bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {sending ? (
                                        <span>{data.submitting}</span>
                                    ) : sent ? (
                                        <>
                                            <CheckCircle2 size={16} className="text-green-400" />
                                            <span>{data.sent}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{data.send}</span>
                                            <ArrowRight size={14} />
                                        </>
                                    )}
                                </button>

                                {sent && (
                                    <span className="text-xs font-semibold text-emerald-600" data-testid="contact-reference">
                                        {reference
                                            ? data.successNote.replace("{ref}", reference)
                                            : data.successNote.replace(/\s*(Reference|الرقم المرجعي|Référence)\s*[:：]\s*\{ref\}/, "")}
                                    </span>
                                )}
                            </div>

                            <p className="text-xs text-black/55 leading-relaxed pt-1">
                                {data.reassure}
                            </p>

                            {error && (
                                <div
                                    role="alert"
                                    data-testid="contact-error"
                                    className="flex items-start gap-2.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
                                >
                                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                    <span>{data.error}</span>
                                </div>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </Section>
    );
}

const Contact = memo(ContactComponent);
export default Contact;
