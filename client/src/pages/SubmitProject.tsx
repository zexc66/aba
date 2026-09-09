import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Save,
  Send,
  ShieldAlert,
} from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Section } from "@/components/ui/section";
import { useLanguageContext } from "@/contexts/LanguageContext";
import {
  COUNTRIES,
  PROJECTS_UI,
  SECTORS,
  STATUSES,
  type CountryKey,
  type Locale3,
  type ProjectStatus,
  type SectorKey,
} from "@/projects";
import { PLATFORM_COPY, PARTY_TYPE_KEYS, type PartyTypeKey } from "@/platform";
import { projectReadiness, type ReadinessFactorKey } from "@/readiness";
import { DEPLOY_BASE_PATH, localizedLinkPath } from "@/localePath";
import { SUBMISSION_COPY } from "@/submissionCopy";

const DRAFT_KEY = "aiabasd-project-submission-draft";

type Draft = {
  organization: string;
  email: string;
  partyType: PartyTypeKey | "";
  title: string;
  summary: string;
  country: CountryKey | "";
  sector: SectorKey | "";
  status: ProjectStatus | "";
  location: string;
  scale: string;
  model: string;
  objectives: string;
  partnership: string;
  consent: boolean;
};

const EMPTY_DRAFT: Draft = {
  organization: "",
  email: "",
  partyType: "",
  title: "",
  summary: "",
  country: "",
  sector: "",
  status: "",
  location: "",
  scale: "",
  model: "",
  objectives: "",
  partnership: "",
  consent: false,
};

const lines = (value: string) =>
  value
    .split("\n")
    .map(item => item.trim())
    .filter(Boolean);

const countryKeys = Object.keys(COUNTRIES) as CountryKey[];
const sectorKeys = Object.keys(SECTORS) as SectorKey[];
const statusKeys = Object.keys(STATUSES) as ProjectStatus[];

function storedString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.slice(0, maxLength) : "";
}

function storedOption<T extends string>(
  value: unknown,
  options: readonly T[]
): T | "" {
  return typeof value === "string" && options.includes(value as T)
    ? (value as T)
    : "";
}

function parseDraft(value: unknown): Draft {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return { ...EMPTY_DRAFT };
  const stored = value as Record<string, unknown>;
  return {
    organization: storedString(stored.organization, 160),
    email: storedString(stored.email, 254),
    partyType: storedOption(stored.partyType, PARTY_TYPE_KEYS),
    title: storedString(stored.title, 160),
    summary: storedString(stored.summary, 500),
    country: storedOption(stored.country, countryKeys),
    sector: storedOption(stored.sector, sectorKeys),
    status: storedOption(stored.status, statusKeys),
    location: storedString(stored.location, 300),
    scale: storedString(stored.scale, 300),
    model: storedString(stored.model, 300),
    objectives: storedString(stored.objectives, 1400),
    partnership: storedString(stored.partnership, 1400),
    consent: stored.consent === true,
  };
}

function localized(value: string): Record<Locale3, string> {
  return { en: value, ar: value, fr: value };
}

function buildPreviewProject(draft: Draft) {
  return {
    slug: "submission-preview",
    type: "project" as const,
    status: draft.status,
    sector: draft.sector || "multi",
    country: draft.country || "intl",
    title: localized(draft.title || "Untitled opportunity"),
    location: draft.location ? localized(draft.location) : undefined,
    scale: draft.scale ? localized(draft.scale) : undefined,
    model: draft.model ? localized(draft.model) : undefined,
    description: localized(draft.summary),
    objectives: lines(draft.objectives).map(localized),
    partnership: lines(draft.partnership).map(localized),
  };
}

export default function SubmitProject() {
  const { lang, content } = useLanguageContext();
  const locale = lang as Locale3;
  const t = SUBMISSION_COPY[locale];
  const projectsT = PROJECTS_UI[locale];
  const matchT = PLATFORM_COPY[locale].match;
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        window.localStorage.getItem(DRAFT_KEY) ?? "null"
      );
      setDraft(parseDraft(stored));
    } catch {}
    setHydrated(true);
  }, []);

  const previewProject = useMemo(() => buildPreviewProject(draft), [draft]);
  const readiness = projectReadiness(previewProject);
  const readinessLabels: Record<ReadinessFactorKey, string> = {
    status: projectsT.statusLabel,
    location: projectsT.locationLabel,
    scale: projectsT.scaleLabel,
    model: projectsT.modelLabel,
    objectives: projectsT.objectivesLabel,
    partnership: projectsT.partnershipLabel,
  };
  const fieldClass =
    "w-full min-h-11 border border-black/10 bg-[#fdfcfb] px-4 py-3 text-sm text-[#0b0b10] transition-colors caret-[#5a1f2e] placeholder:text-black/45 focus:border-[#5a1f2e] focus:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2";
  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft(current => ({ ...current, [key]: value }));
    setError(false);
    setSaved(false);
  };

  const stepValid = [
    Boolean(draft.organization.trim() && draft.email.trim() && draft.partyType),
    Boolean(
      draft.title.trim() &&
        draft.summary.trim() &&
        draft.country &&
        draft.sector &&
        draft.status
    ),
    Boolean(
      lines(draft.objectives).length > 0 && lines(draft.partnership).length > 0
    ),
    draft.consent,
  ][step];

  const saveDraft = () => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  };

  const clearDraft = () => {
    setDraft(EMPTY_DRAFT);
    setStep(0);
    setSaved(false);
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {}
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (step < 3) {
      if (stepValid) setStep(current => current + 1);
      return;
    }
    if (DEPLOY_BASE_PATH) return;
    if (!draft.consent) return;
    setSending(true);
    setError(false);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "PROJECT_SUBMISSION",
          email: draft.email,
          organization: draft.organization,
          partyType: draft.partyType,
          sector: draft.sector ? SECTORS[draft.sector].en : undefined,
          region: draft.country ? COUNTRIES[draft.country].en : undefined,
          targetProject: draft.title,
          targetService: "origination",
          interest: draft.summary,
          timeline: draft.status,
          message: [
            `Current stage: ${draft.status}`,
            `Location: ${draft.location || "Not specified"}`,
            `Indicative scale: ${draft.scale || "Not specified"}`,
            `Proposed model: ${draft.model || "Not specified"}`,
            "",
            "Strategic objectives:",
            draft.objectives,
            "",
            "Partnership needs:",
            draft.partnership,
          ].join("\n"),
          locale,
          consent: true,
        }),
      });
      if (!response.ok)
        throw new Error(`Submission failed: ${response.status}`);
      const body = (await response.json().catch(() => null)) as {
        reference?: string;
      } | null;
      setReference(typeof body?.reference === "string" ? body.reference : null);
      setDraft(EMPTY_DRAFT);
      setStep(0);
      setSaved(false);
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {}
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${lang === "ar" ? "font-arabic" : ""}`}
    >
      <SEO
        title={`${t.title} | AIABASD`}
        description={t.intro}
        lang={lang}
        url="/submit-project"
      />
      <Header nav={content.nav} />
      <div className="pt-24">
        <Section className="border-b border-black/10 bg-[#0b0b10] py-16 text-white md:py-24">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <Link asChild href={localizedLinkPath("/projects", lang)}>
              <a className="mb-8 inline-flex min-h-11 items-center gap-2 t-meta text-[10px] text-[#f2a007] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2">
                <ArrowLeft size={14} className="rtl:-scale-x-100" />
                {projectsT.backLabel}
              </a>
            </Link>
            <p className="t-meta mb-5 text-[#f2a007]">{t.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
              {t.intro}
            </p>
          </div>
        </Section>

        <Section className="py-12 md:py-16">
          <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-4 sm:px-6 md:px-12 lg:grid-cols-12 lg:px-24">
            <div className="lg:col-span-8">
              {reference ? (
                <div className="border border-emerald-200 bg-emerald-50 p-8 text-emerald-900" role="status" aria-live="polite">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="shrink-0 text-emerald-700" />
                    <h2 className="text-lg font-bold">{t.successTitle}</h2>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">
                    {t.successNote.replace("{ref}", reference)}
                  </p>
                  <Link asChild href={localizedLinkPath("/projects", lang)}>
                    <a className="mt-6 inline-flex min-h-11 items-center gap-2 t-meta text-[#5a1f2e] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2">
                      {projectsT.backLabel}
                      <ArrowRight size={14} className="rtl:-scale-x-100" />
                    </a>
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  className="border border-black/10 bg-white p-5 sm:p-6 md:p-10"
                >
                  {DEPLOY_BASE_PATH && (
                    <p role="note" className="mb-8 border border-[#f2a007]/40 bg-[#f2a007]/10 p-4 text-sm leading-relaxed text-[#6b4a00]">
                      {t.staticNote}
                    </p>
                  )}
                  <div className="mb-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    {t.steps.map((label, index) => (
                      <button
                        key={label}
                        type="button"
                        disabled={index > step}
                        aria-current={index === step ? "step" : undefined}
                        onClick={() => index <= step && setStep(index)}
                        className={`min-h-11 border-t-2 pt-3 text-start t-meta text-[10px] transition-colors active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 ${
                          index === step
                            ? "border-[#5a1f2e] text-[#5a1f2e] font-bold"
                            : index < step
                              ? "border-[#f2a007] text-black/70 hover:text-[#5a1f2e]"
                              : "border-black/10 text-black/40 cursor-not-allowed"
                        }`}
                      >
                        <span className="me-1.5 font-bold">0{index + 1}</span>
                        {label}
                      </button>
                    ))}
                  </div>

                  {step === 0 && (
                    <div className="space-y-7">
                      <h2 className="text-2xl font-bold">{t.ownerTitle}</h2>
                      <div className="space-y-2">
                        <label
                          htmlFor="submission-organization"
                          className="t-meta text-black/70"
                        >
                          {t.organizationLabel} *
                        </label>
                        <input
                          id="submission-organization"
                          required
                          aria-required="true"
                          maxLength={160}
                          value={draft.organization}
                          onChange={event =>
                            update("organization", event.target.value)
                          }
                          placeholder={t.organizationPlaceholder}
                          className={fieldClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="submission-email"
                          className="t-meta text-black/70"
                        >
                          {t.emailLabel} *
                        </label>
                        <input
                          id="submission-email"
                          required
                          aria-required="true"
                          maxLength={254}
                          type="email"
                          value={draft.email}
                          onChange={event =>
                            update("email", event.target.value)
                          }
                          placeholder={t.emailPlaceholder}
                          className={fieldClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="submission-party-type"
                          className="t-meta text-black/70"
                        >
                          {t.partyTypeLabel} *
                        </label>
                        <select
                          id="submission-party-type"
                          required
                          aria-required="true"
                          value={draft.partyType}
                          onChange={event =>
                            update(
                              "partyType",
                              event.target.value as Draft["partyType"]
                            )
                          }
                          className={fieldClass}
                        >
                          <option value="">{t.emptyOption}</option>
                          {PARTY_TYPE_KEYS.map(key => (
                            <option key={key} value={key}>
                              {matchT.options.partyTypes[key]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-7">
                      <h2 className="text-2xl font-bold">{t.projectTitle}</h2>
                      <div className="space-y-2">
                        <label
                          htmlFor="submission-title"
                          className="t-meta text-black/70"
                        >
                          {t.titleLabel} *
                        </label>
                        <input
                          id="submission-title"
                          required
                          aria-required="true"
                          maxLength={160}
                          value={draft.title}
                          onChange={event =>
                            update("title", event.target.value)
                          }
                          placeholder={t.titlePlaceholder}
                          className={fieldClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="submission-summary"
                          className="t-meta text-black/70"
                        >
                          {t.summaryLabel} *
                        </label>
                        <textarea
                          id="submission-summary"
                          required
                          aria-required="true"
                          maxLength={500}
                          rows={5}
                          value={draft.summary}
                          onChange={event =>
                            update("summary", event.target.value)
                          }
                          placeholder={t.summaryPlaceholder}
                          className={`${fieldClass} resize-y`}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="submission-country"
                            className="t-meta text-black/70"
                          >
                            {t.countryLabel} *
                          </label>
                          <select
                            id="submission-country"
                            required
                            aria-required="true"
                            value={draft.country}
                            onChange={event =>
                              update(
                                "country",
                                event.target.value as Draft["country"]
                              )
                            }
                            className={fieldClass}
                          >
                            <option value="">{t.emptyOption}</option>
                            {countryKeys.map(key => (
                              <option key={key} value={key}>
                                {COUNTRIES[key][locale]}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="submission-sector"
                            className="t-meta text-black/70"
                          >
                            {t.sectorLabel} *
                          </label>
                          <select
                            id="submission-sector"
                            required
                            aria-required="true"
                            value={draft.sector}
                            onChange={event =>
                              update(
                                "sector",
                                event.target.value as Draft["sector"]
                              )
                            }
                            className={fieldClass}
                          >
                            <option value="">{t.emptyOption}</option>
                            {sectorKeys.map(key => (
                              <option key={key} value={key}>
                                {SECTORS[key][locale]}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="submission-status"
                          className="t-meta text-black/70"
                        >
                          {t.statusLabel} *
                        </label>
                        <select
                          id="submission-status"
                          required
                          aria-required="true"
                          value={draft.status}
                          onChange={event =>
                            update(
                              "status",
                              event.target.value as Draft["status"]
                            )
                          }
                          className={fieldClass}
                        >
                          <option value="">{t.emptyOption}</option>
                          {statusKeys.map(key => (
                            <option key={key} value={key}>
                              {STATUSES[key][locale]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-7">
                      <h2 className="text-2xl font-bold">{t.evidenceTitle}</h2>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="submission-location"
                            className="t-meta text-black/70"
                          >
                            {t.locationLabel}
                          </label>
                          <input
                            id="submission-location"
                            maxLength={300}
                            value={draft.location}
                            onChange={event =>
                              update("location", event.target.value)
                            }
                            placeholder={t.locationPlaceholder}
                            className={fieldClass}
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="submission-scale"
                            className="t-meta text-black/70"
                          >
                            {t.scaleLabel}
                          </label>
                          <input
                            id="submission-scale"
                            maxLength={300}
                            value={draft.scale}
                            onChange={event =>
                              update("scale", event.target.value)
                            }
                            placeholder={t.scalePlaceholder}
                            className={fieldClass}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="submission-model"
                          className="t-meta text-black/70"
                        >
                          {t.modelLabel}
                        </label>
                        <input
                          id="submission-model"
                          maxLength={300}
                          value={draft.model}
                          onChange={event =>
                            update("model", event.target.value)
                          }
                          placeholder={t.modelPlaceholder}
                          className={fieldClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="submission-objectives"
                          className="t-meta text-black/70"
                        >
                          {t.objectivesLabel} *
                        </label>
                        <textarea
                          id="submission-objectives"
                          required
                          aria-required="true"
                          aria-describedby="submission-objectives-note"
                          maxLength={1400}
                          rows={5}
                          value={draft.objectives}
                          onChange={event =>
                            update("objectives", event.target.value)
                          }
                          placeholder={t.objectivesPlaceholder}
                          className={`${fieldClass} resize-y`}
                        />
                        <p id="submission-objectives-note" className="text-xs text-black/60">
                          {t.objectivesNote}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="submission-partnership"
                          className="t-meta text-black/70"
                        >
                          {t.partnershipLabel} *
                        </label>
                        <textarea
                          id="submission-partnership"
                          required
                          aria-required="true"
                          aria-describedby="submission-partnership-note"
                          maxLength={1400}
                          rows={5}
                          value={draft.partnership}
                          onChange={event =>
                            update("partnership", event.target.value)
                          }
                          placeholder={t.partnershipPlaceholder}
                          className={`${fieldClass} resize-y`}
                        />
                        <p id="submission-partnership-note" className="text-xs text-black/60">
                          {t.partnershipNote}
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-7">
                      <h2 className="text-2xl font-bold">{t.reviewTitle}</h2>
                      <div className="border border-black/10 bg-[#fdfcfb] p-6">
                        <p className="t-meta text-[#5a1f2e]">{draft.title}</p>
                        <p className="mt-3 text-sm leading-relaxed text-black/70">
                          {draft.summary}
                        </p>
                        <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-black/10 pt-5 text-sm">
                          <div>
                            <dt className="t-meta text-[10px] text-black/60">
                              {t.organizationLabel}
                            </dt>
                            <dd className="mt-1 font-semibold">
                              {draft.organization}
                            </dd>
                          </div>
                          <div>
                            <dt className="t-meta text-[10px] text-black/60">
                              {t.emailLabel}
                            </dt>
                            <dd className="mt-1 break-all font-semibold">
                              {draft.email}
                            </dd>
                          </div>
                          <div>
                            <dt className="t-meta text-[10px] text-black/60">
                              {t.countryLabel}
                            </dt>
                            <dd className="mt-1 font-semibold">
                              {draft.country
                                ? COUNTRIES[draft.country][locale]
                                : "—"}
                            </dd>
                          </div>
                          <div>
                            <dt className="t-meta text-[10px] text-black/60">
                              {t.sectorLabel}
                            </dt>
                            <dd className="mt-1 font-semibold">
                              {draft.sector
                                ? SECTORS[draft.sector][locale]
                                : "—"}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <label
                        htmlFor="submission-consent"
                        className="flex items-start gap-3 border-t border-black/10 pt-5 text-sm leading-relaxed text-black/75 cursor-pointer"
                      >
                        <input
                          id="submission-consent"
                          type="checkbox"
                          required
                          aria-required="true"
                          checked={draft.consent}
                          onChange={event =>
                            update("consent", event.target.checked)
                          }
                          className="mt-1 h-5 w-5 shrink-0 accent-[#5a1f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2"
                        />
                        <span>
                          <span className="font-semibold text-black/90">
                            {t.consentLabel}:{" "}
                          </span>
                          {t.consentText}
                        </span>
                      </label>
                      <p className="flex items-start gap-2 text-xs leading-relaxed text-black/60">
                        <ShieldAlert
                          size={15}
                          className="mt-0.5 shrink-0 text-[#5a1f2e]"
                          aria-hidden="true"
                        />
                        {t.reviewNote}
                      </p>
                    </div>
                  )}

                  {error && (
                    <p
                      role="alert"
                      aria-live="assertive"
                      className="mt-7 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                    >
                      {t.error}
                    </p>
                  )}
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">
                    <div className="flex flex-wrap items-center gap-3">
                      {step > 0 && (
                        <button
                          type="button"
                          onClick={() => setStep(current => current - 1)}
                          className="inline-flex min-h-11 items-center gap-2 border border-black/10 bg-white px-4 py-2.5 t-meta text-[10px] text-black/70 hover:border-[#5a1f2e]/40 hover:text-[#5a1f2e] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 transition-colors"
                        >
                          <ArrowLeft size={14} className="rtl:-scale-x-100" aria-hidden="true" />
                          {t.backLabel}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={saveDraft}
                        className={`inline-flex min-h-11 items-center gap-2 border px-4 py-2.5 t-meta text-[10px] transition-colors active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 ${
                          saved
                            ? "border-emerald-600/40 bg-emerald-50 text-emerald-800"
                            : "border-black/10 bg-white text-black/70 hover:border-[#5a1f2e]/40 hover:text-[#5a1f2e]"
                        }`}
                      >
                        {saved ? <CheckCircle2 size={14} aria-hidden="true" /> : <Save size={14} aria-hidden="true" />}
                        {saved ? t.savedLabel : t.saveLabel}
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={Boolean(DEPLOY_BASE_PATH) || !stepValid || sending}
                      className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#5a1f2e] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2"
                    >
                      {sending ? (
                        <>
                          <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                          <span>{t.submittingLabel}</span>
                        </>
                      ) : (
                        <>
                          <span>{step === 3 ? t.submitLabel : t.nextLabel}</span>
                          {step === 3 ? (
                            <Send size={14} className="rtl:-scale-x-100" aria-hidden="true" />
                          ) : (
                            <ArrowRight size={14} className="rtl:-scale-x-100" aria-hidden="true" />
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div
                  className="bg-[#0b0b10] p-7 text-white"
                  role="region"
                  aria-label={t.readinessTitle}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="t-meta text-[10px] text-[#f2a007]">
                        {t.readinessTitle}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#fdfcfb]/70">
                        {t.readinessNote}
                      </p>
                    </div>
                    <span className="t-data text-3xl font-semibold text-[#f2a007]" aria-hidden="true">
                      {readiness.score}%
                    </span>
                  </div>
                  <div
                    className="mt-6 h-2 bg-white/10"
                    role="progressbar"
                    aria-valuenow={readiness.score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${t.readinessTitle}: ${readiness.score}%`}
                  >
                    <div
                      className="h-full bg-[#f2a007] transition-all"
                      style={{ width: `${readiness.score}%` }}
                    />
                  </div>
                  <div className="mt-6 space-y-3">
                    {readiness.factors.map(factor => (
                      <div
                        key={factor.key}
                        className="flex items-center justify-between gap-4 text-xs text-[#fdfcfb]/75"
                      >
                        <span className="min-w-0 break-words">{readinessLabels[factor.key]}</span>
                        <span className="t-data text-white/90 shrink-0 font-medium">
                          {factor.points}/{factor.max}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-black/10 bg-white p-6">
                  <p className="t-meta text-[10px] text-[#5a1f2e]">
                    {t.steps[3]}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {t.reviewNote}
                  </p>
                  <button
                    type="button"
                    onClick={clearDraft}
                    className="mt-5 inline-flex min-h-11 items-center px-2 t-meta text-[10px] text-black/60 underline underline-offset-4 hover:text-[#5a1f2e] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2"
                  >
                    {t.clearDraftLabel}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </Section>
      </div>
      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
