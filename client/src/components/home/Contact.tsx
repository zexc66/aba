import { useState, memo } from "react";
import { Mail, MapPin, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";

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
        audienceLabel: string;
        audienceOptions: string[];
        placeholders: {
            name: string;
            email: string;
            org: string;
            msg: string;
        };
        sidebar: {
            hq: string;
            channels: string;
            emailGeneralLabel: string;
            emailSecretariatLabel: string;
            emailFieldOpsLabel: string;
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
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [audience, setAudience] = useState(-1);

    const AUDIENCE_TYPE = ["GOVERNMENT", "INVESTOR", "EPC", "NGO", "PRESS"];

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        setError(false);

        try {
            const response = await fetch("/api/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: audience >= 0 ? `CONTACT_${AUDIENCE_TYPE[audience]}` : "CONTACT",
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
        <Section id="contact" className="relative py-24 bg-[#fdfcfb] border-b border-black/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="09"
                    title={data.title}
                    note={data.subtitle}
                    meta={data.eyebrow}
                />

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    <div className="lg:col-span-5 space-y-10">

                        <div className="border border-black/10 p-8 space-y-6">
                            <h3 className="t-meta text-black/55 border-b border-black/10 pb-3">
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

                                <div className="pt-2 border-t border-black/10 space-y-1">
                                    {[
                                        { label: data.sidebar.emailGeneralLabel, address: "contact@aiabasd.org" },
                                        { label: data.sidebar.emailSecretariatLabel, address: "gs@aiabasd.org" },
                                        { label: data.sidebar.emailFieldOpsLabel, address: "fo@aiabasd.org" },
                                    ].map(({ label, address }) => (
                                        <a
                                            key={address}
                                            href={`mailto:${address}`}
                                            className="flex items-center justify-between gap-4 py-2 text-sm text-[#0b0b10] hover:text-[#5a1f2e] transition-colors group"
                                        >
                                            <span className="flex items-center gap-3 min-w-0">
                                                <Mail className="w-4 h-4 text-[#5a1f2e] shrink-0" strokeWidth={1.5} />
                                                <span className="font-medium truncate">{label}</span>
                                            </span>
                                            <span className="t-data text-xs text-black/55 group-hover:text-[#5a1f2e] transition-colors shrink-0" dir="ltr">
                                                {address}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-black/10">
                        <h3 className="t-meta text-[#5a1f2e] mb-8 pb-4 border-b-2 border-[#0b0b10]">
                            {data.formTitle}
                        </h3>

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="contact-audience" className="t-meta text-black/60">
                                    {data.audienceLabel}
                                </label>
                                <select
                                    id="contact-audience"
                                    value={audience}
                                    onChange={(e) => setAudience(Number(e.target.value))}
                                    className="w-full bg-[#fdfcfb] border border-black/10 px-4 py-3 rounded-sm text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-white transition-colors cursor-pointer"
                                >
                                    <option value={-1}>—</option>
                                    {data.audienceOptions.map((option, i) => (
                                        <option key={i} value={i}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="contact-name" className="t-meta text-black/60">
                                        {data.name} *
                                    </label>
                                    <input
                                        id="contact-name"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder={data.placeholders.name}
                                        className="w-full bg-[#fdfcfb] border border-black/10 px-4 py-3 rounded-sm text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-white transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="contact-org" className="t-meta text-black/60">
                                        {data.org}
                                    </label>
                                    <input
                                        id="contact-org"
                                        value={form.org}
                                        onChange={(e) => setForm({ ...form, org: e.target.value })}
                                        placeholder={data.placeholders.org}
                                        className="w-full bg-[#fdfcfb] border border-black/10 px-4 py-3 rounded-sm text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-white transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="contact-email" className="t-meta text-black/60">
                                    {data.email} *
                                </label>
                                <p id="contact-email-note" aria-live="polite" className={emailInvalid ? "text-xs text-red-700" : "sr-only"}>
                                    {emailInvalid ? "Enter a valid email address, e.g. name@institution.org." : ""}
                                </p>
                                <input
                                    id="contact-email"
                                    type="email"
                                    required
                                    aria-invalid={emailInvalid}
                                    aria-describedby="contact-email-note"
                                    value={form.email}
                                    onChange={(e) => {
                                        setForm({ ...form, email: e.target.value });
                                        if (emailInvalid) setEmailInvalid(false);
                                    }}
                                    onBlur={() => {
                                        if (form.email.length > 0) setEmailInvalid(!EMAIL_RE.test(form.email));
                                    }}
                                    placeholder={data.placeholders.email}
                                    className="w-full bg-[#fdfcfb] border border-black/10 px-4 py-3 rounded-sm text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-white transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="contact-msg" className="t-meta text-black/60">
                                    {data.msg} *
                                </label>
                                <textarea
                                    id="contact-msg"
                                    required
                                    rows={4}
                                    value={form.msg}
                                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                                    placeholder={data.placeholders.msg}
                                    className="w-full bg-[#fdfcfb] border border-black/10 px-4 py-3 rounded-sm text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-white transition-colors resize-none"
                                />
                            </div>

                            <div className="pt-4 flex items-center justify-between gap-4">
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="px-8 py-3.5 bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 disabled:opacity-50 no-press"
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
