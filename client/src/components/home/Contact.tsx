import { useState, memo, useEffect } from "react";
import { Mail, MapPin, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS_UI, STATUSES, projectBySlug } from "@/projects";
import { localizedPath } from "@/localePath";
import { LOCALIZED_COPY } from "@/localizedCopy";

// Booking link renders only when configured — honest absence otherwise.
const BOOKING_URL = (import.meta.env.VITE_BOOKING_URL as string | undefined)?.trim() || "";

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
        emailInvalid: string;
        reassure: string;
        anotherLabel: string;
        bookingTitle: string;
        bookingNote: string;
        bookingCta: string;
        audienceLabel: string;
        audienceOptions: string[];
        sectorLabel: string;
        regionLabel: string;
        ticketLabel: string;
        sectorOptions: string[];
        regionOptions: string[];
        ticketOptions: string[];
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

function ContactComponent({ data, lang }: ContactProps) {
    const consentCopy = LOCALIZED_COPY[lang as "en" | "ar" | "fr"].consent;
    const [form, setForm] = useState({ name: "", email: "", org: "", msg: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [reference, setReference] = useState<string | null>(null);
    const [error, setError] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [audience, setAudience] = useState(-1);
    const [sector, setSector] = useState("");
    const [region, setRegion] = useState("");
    const [ticket, setTicket] = useState("");
    const [consent, setConsent] = useState(false);

    const AUDIENCE_TYPE = ["GOVERNMENT", "INVESTOR", "EPC", "NGO", "PRESS"];

    // Structured intake: which detail fields each audience is offered
    const FIELDS_BY_AUDIENCE: Record<number, { key: "sector" | "region" | "ticket"; label: string; options: string[]; value: string; set: (v: string) => void }[]> = {
        0: [
            { key: "sector", label: data.sectorLabel, options: data.sectorOptions, value: sector, set: setSector },
            { key: "region", label: data.regionLabel, options: data.regionOptions, value: region, set: setRegion },
        ],
        1: [
            { key: "ticket", label: data.ticketLabel, options: data.ticketOptions, value: ticket, set: setTicket },
            { key: "region", label: data.regionLabel, options: data.regionOptions, value: region, set: setRegion },
        ],
        2: [
            { key: "sector", label: data.sectorLabel, options: data.sectorOptions, value: sector, set: setSector },
            { key: "region", label: data.regionLabel, options: data.regionOptions, value: region, set: setRegion },
        ],
        3: [
            { key: "sector", label: data.sectorLabel, options: data.sectorOptions, value: sector, set: setSector },
        ],
        4: [],
    };

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Deep-link from a project detail page: ?project=slug preselects the
    // audience, prefills the message with the project reference, and brings
    // the form into view.
    useEffect(() => {
      try {
        const slug = new URLSearchParams(window.location.search).get("project");
        if (!slug) return;
        const project = projectBySlug(slug);
        if (!project) return;
        const locale3 = (lang === "ar" || lang === "fr" ? lang : "en") as "en" | "ar" | "fr";
        setAudience(project.type === "opportunity" ? 1 : 2);
        setForm((prev) => ({
          ...prev,
          msg: `Regarding: ${project.title[locale3]} (${STATUSES[project.status][locale3]}).\n\n`,
        }));
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        setError(false);

        const detailFields = audience >= 0 ? FIELDS_BY_AUDIENCE[audience] ?? [] : [];
        const details: Record<string, string> = {};
        for (const field of detailFields) {
            if (field.value) details[field.key] = field.value;
        }

        try {
            const response = await fetch("/api/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: audience >= 0 ? `CONTACT_${AUDIENCE_TYPE[audience]}` : "CONTACT",
                    name: form.name,
                    email: form.email,
                    organization: form.org,
                    ...details,
                    message: form.msg,
                    locale: lang,
                    consent: true,
                })
            });

            if (!response.ok) {
                throw new Error(`Submission failed: ${response.status}`);
            }

            const body = (await response.json().catch(() => null)) as { reference?: string } | null;
            setReference(typeof body?.reference === "string" ? body.reference : null);
            setSent(true);
            setForm({ name: "", email: "", org: "", msg: "" });
            setSector("");
            setRegion("");
            setTicket("");
            setConsent(false);
        } catch (err) {
            console.error("Submission error:", err);
            // Error persists until the visitor edits the form or retries —
            // no timed self-destruct while they are mid-copy-paste.
            setError(true);
        } finally {
            setSending(false);
        }
    };

    return (
        <Section id="contact" className="relative py-20 bg-[#fdfcfb]">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="09"
                    title={data.title}
                    note={data.subtitle}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    <div className="lg:col-span-5 space-y-10">

                        <div className="border border-[#0b0b10]/10 p-8 space-y-6">
                            <h3 className="t-meta text-[#0b0b10]/65 border-b border-[#0b0b10]/10 pb-3">
                                {data.hqTitle}
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 text-sm text-[#0b0b10]">
                                    <MapPin className="w-5 h-5 text-[#5a1f2e] shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold">{data.london}</div>
                                        <div className="text-[#0b0b10]/60 text-xs mt-0.5">{data.uk}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 text-sm text-[#0b0b10]">
                                    <MapPin className="w-5 h-5 text-[#5a1f2e] shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold">{data.dakar}</div>
                                        <div className="text-[#0b0b10]/60 text-xs mt-0.5">{data.senegal}</div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-[#0b0b10]/10 space-y-1">
                                    {[
                                        { label: data.sidebar.emailGeneralLabel, address: "contact@aiabasd.org" },
                                        { label: data.sidebar.emailSecretariatLabel, address: "gs@aiabasd.org" },
                                        { label: data.sidebar.emailFieldOpsLabel, address: "fo@aiabasd.org" },
                                    ].map(({ label, address }) => (
                                        <a
                                            key={address}
                                            href={`mailto:${address}`}
                                            className="flex items-center justify-between gap-4 py-2 text-sm text-[#0b0b10] hover:text-[#5a1f2e] transition-[color,transform] active:translate-y-px group"
                                        >
                                            <span className="flex items-center gap-3 min-w-0">
                                                <Mail className="w-4 h-4 text-[#5a1f2e] shrink-0" strokeWidth={1.5} />
                                                <span className="font-medium min-w-0 leading-snug">{label}</span>
                                            </span>
                                            <span className="t-data text-xs text-[#0b0b10]/65 group-hover:text-[#5a1f2e] transition-colors shrink-0" dir="ltr">
                                                {address}
                                            </span>
                                        </a>
                                    ))}
                                </div>

                                {BOOKING_URL && (
                                    <a
                                        href={BOOKING_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block bg-[#0b0b10] text-[#fdfcfb] p-5 hover:bg-[#5a1f2e] transition-[color,background-color,transform] active:translate-y-px group"
                                    >
                                        <div className="t-meta text-[#f2a007] group-hover:text-[#fdfcfb]">
                                            {data.bookingTitle}
                                        </div>
                                        <p className="text-xs text-[#fdfcfb]/70 group-hover:text-[#fdfcfb]/85 leading-relaxed mt-1.5">
                                            {data.bookingNote}
                                        </p>
                                        <span className="t-meta text-[#f2a007] text-[10px] inline-block mt-3 border-b border-[#f2a007]/40 group-hover:border-white pb-0.5">
                                            {data.bookingCta} →
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-[#fdfcfb] p-6 md:p-10 border border-[#0b0b10]/10">
                        <h3 className="t-meta text-[#5a1f2e] mb-8 pb-4 border-b border-[#0b0b10]">
                            {data.formTitle}
                        </h3>

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="contact-audience" className="t-meta text-[#0b0b10]/60">
                                    {data.audienceLabel}
                                </label>
                                <select
                                    id="contact-audience"
                                    value={audience}
                                    onChange={(e) => {
                                        const next = Number(e.target.value);
                                        setAudience(next);
                                        setSector("");
                                        setRegion("");
                                        setTicket("");
                                    }}
                                    className="w-full bg-[#fdfcfb] border border-[#0b0b10]/10 px-4 py-3 text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-[#fdfcfb] transition-colors cursor-pointer"
                                >
                                    <option value={-1}>—</option>
                                    {data.audienceOptions.map((option, i) => (
                                        <option key={i} value={i}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            {audience >= 0 && (FIELDS_BY_AUDIENCE[audience] ?? []).length > 0 && (
                                <div className="grid sm:grid-cols-2 gap-6" data-testid="contact-details">
                                    {(FIELDS_BY_AUDIENCE[audience] ?? []).map((field) => (
                                        <div key={field.key} className="space-y-2">
                                            <label htmlFor={`contact-${field.key}`} className="t-meta text-[#0b0b10]/60">
                                                {field.label}
                                            </label>
                                            <select
                                                id={`contact-${field.key}`}
                                                value={field.value}
                                                onChange={(e) => field.set(e.target.value)}
                                                className="w-full bg-[#fdfcfb] border border-[#0b0b10]/10 px-4 py-3 text-sm text-[#0b0b10] outline-none focus:border-[#5a1f2e] focus:bg-[#fdfcfb] transition-colors cursor-pointer"
                                            >
                                                <option value="">—</option>
                                                {field.options.map((option, i) => (
                                                    <option key={i} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="contact-name" className="t-meta text-[#0b0b10]/60">
                                        {data.name} *
                                    </label>
                                    <input
                                        id="contact-name"
                                        required
                                        value={form.name}
                                        onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(false); }}
                                        placeholder={data.placeholders.name}
                                        className="w-full bg-[#fdfcfb] border border-[#0b0b10]/10 px-4 py-3 text-sm text-[#0b0b10] placeholder:text-[#0b0b10]/60 outline-none focus:border-[#5a1f2e] focus:bg-[#fdfcfb] transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="contact-org" className="t-meta text-[#0b0b10]/60">
                                        {data.org}
                                    </label>
                                    <input
                                        id="contact-org"
                                        value={form.org}
                                        onChange={(e) => { setForm({ ...form, org: e.target.value }); setError(false); }}
                                        placeholder={data.placeholders.org}
                                        className="w-full bg-[#fdfcfb] border border-[#0b0b10]/10 px-4 py-3 text-sm text-[#0b0b10] placeholder:text-[#0b0b10]/60 outline-none focus:border-[#5a1f2e] focus:bg-[#fdfcfb] transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="contact-email" className="t-meta text-[#0b0b10]/60">
                                    {data.email} *
                                </label>
                                <p id="contact-email-note" aria-live="polite" className={emailInvalid ? "text-xs text-[#5a1f2e]" : "sr-only"}>
                                    {emailInvalid ? data.emailInvalid : ""}
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
                                        setError(false);
                                    }}
                                    onBlur={() => {
                                        if (form.email.length > 0) setEmailInvalid(!EMAIL_RE.test(form.email));
                                    }}
                                    placeholder={data.placeholders.email}
                                    className="w-full bg-[#fdfcfb] border border-[#0b0b10]/10 px-4 py-3 text-sm text-[#0b0b10] placeholder:text-[#0b0b10]/60 outline-none focus:border-[#5a1f2e] focus:bg-[#fdfcfb] transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="contact-msg" className="t-meta text-[#0b0b10]/60">
                                    {data.msg} *
                                </label>
                                <textarea
                                    id="contact-msg"
                                    required
                                    rows={4}
                                    value={form.msg}
                                    onChange={(e) => { setForm({ ...form, msg: e.target.value }); setError(false); }}
                                    placeholder={data.placeholders.msg}
                                    className="w-full bg-[#fdfcfb] border border-[#0b0b10]/10 px-4 py-3 text-sm text-[#0b0b10] placeholder:text-[#0b0b10]/60 outline-none focus:border-[#5a1f2e] focus:bg-[#fdfcfb] transition-colors resize-none"
                                />
                            </div>

                            <label htmlFor="contact-consent" className="flex items-start gap-3 text-xs text-[#0b0b10]/65 leading-relaxed">
                                <input
                                    id="contact-consent"
                                    type="checkbox"
                                    required
                                    checked={consent}
                                    onChange={(e) => { setConsent(e.target.checked); setError(false); }}
                                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#5a1f2e]"
                                />
                                <span>
                                    <span className="font-semibold text-[#0b0b10]/80">{consentCopy.contactLabel}: </span>
                                    {consentCopy.contactText} {" "}
                                    <a href={localizedPath("/privacy", lang)} className="text-[#5a1f2e] underline underline-offset-2 hover:text-[#0b0b10] active:translate-y-px inline-block transition-[color,transform]">
                                        {consentCopy.privacyLinkLabel}
                                    </a>
                                </span>
                            </label>

                            {sent ? (
                                <div
                                    role="status"
                                    data-testid="contact-success-panel"
                                    className="border border-[#5a1f2e]/25 border-s-4 border-s-[#5a1f2e] bg-[#5a1f2e]/[0.06] p-6 space-y-4"
                                >
                                    <div className="flex items-center gap-2.5 text-[#5a1f2e]">
                                        <CheckCircle2 size={18} className="shrink-0" strokeWidth={1.5} />
                                        <p className="text-sm font-semibold">
                                            {data.sent}
                                        </p>
                                    </div>
                                    {reference && (
                                        <p className="text-xs text-[#0b0b10]/70" data-testid="contact-reference">
                                            {data.successNote.replace("{ref}", reference)}
                                        </p>
                                    )}
                                    <p className="text-xs text-[#0b0b10]/65 leading-relaxed">
                                        {data.reassure}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSent(false);
                                            setReference(null);
                                        }}
                                        className="t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] pb-0.5 transition-[color,border-color,transform] active:translate-y-px cursor-pointer"
                                    >
                                        {data.anotherLabel}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="pt-4 flex items-center justify-between gap-4">
                                        <button
                                            type="submit"
                                            disabled={sending}
                                            className="px-8 py-3.5 bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 text-[#fdfcfb] font-semibold text-xs uppercase tracking-wider transition-[color,background-color,transform] flex items-center gap-2 disabled:opacity-50 active:translate-y-px"
                                        >
                                            {sending ? (
                                                <span>{data.submitting}</span>
                                            ) : (
                                                <>
                                                    <span>{data.send}</span>
                                                    <ArrowRight size={14} />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-xs text-[#0b0b10]/65 leading-relaxed pt-1">
                                        {data.reassure}
                                    </p>

                                    {error && (
                                        <div
                                            role="alert"
                                            data-testid="contact-error"
                                            className="flex items-start gap-2.5 text-sm text-[#5a1f2e] bg-[#5a1f2e]/10 border border-[#5a1f2e]/25 px-4 py-3"
                                        >
                                            <AlertCircle size={16} className="shrink-0 mt-0.5" strokeWidth={1.5} />
                                            <span>{data.error}</span>
                                        </div>
                                    )}
                                </>
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
