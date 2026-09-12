import { useEffect, useRef, useState } from "react";
import { Link, useSearch } from "wouter";
import { COMPANIES, companyBySlug } from "@/companies";
import { PROJECTS, projectBySlug, type Locale3 } from "@/projects";
import { NETWORK_COPY } from "@/networkCopy";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { deployAssetPath, localizedLinkPath } from "@/localePath";
import NetworkLayout, { networkButton, networkField, networkLink } from "@/components/NetworkLayout";
import { useIntroductionDraft, emptyIntroductionForm } from "@/contexts/IntroductionDraftContext";

export default function Introductions() {
  const { lang } = useLanguageContext();
  const t = NETWORK_COPY[lang];
  const search = useSearch();
  const { draft, setDraft } = useIntroductionDraft();
  const { company, project, need, invalid, reference, form } = draft;
  const setCompany = (company: string) => setDraft(d => ({ ...d, company }));
  const setProject = (project: string) => setDraft(d => ({ ...d, project }));
  const setNeed = (need: string) => setDraft(d => ({ ...d, need }));
  const setInvalid = (invalid: boolean) => setDraft(d => ({ ...d, invalid }));
  const setReference = (reference: string) => setDraft(d => ({ ...d, reference }));
  const setForm = (value: React.SetStateAction<typeof form>) => setDraft(d => ({ ...d, form: typeof value === "function" ? value(d.form) : value }));
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const locked = useRef(false);
  const requestVersion = useRef(0);
  const activeRequest = useRef<AbortController | null>(null);
  const selectedProject = projectBySlug(project);
  const selectedCompany = companyBySlug(company);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const c = params.get("company") ?? "";
    const p = params.get("project") ?? "";
    const n = params.get("need") ?? "";
    const target = projectBySlug(p);
    const validNeed = !n || (/^(0|[1-9]\d*)$/.test(n) && Boolean(target?.partnership[Number(n)]));
    setDraft(d => d.search === search ? d : ({ ...d, search, reference: "", invalid: Boolean((c && !companyBySlug(c)) || (p && !target) || !validNeed), company: companyBySlug(c) ? c : "", project: target ? p : "", need: validNeed ? n : "" }));
    setError(false);
    return () => { requestVersion.current++; activeRequest.current?.abort(); };
  }, [search, setDraft]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (locked.current || !form.consent || invalid) return;
    locked.current = true;
    setSending(true); setError(false);
    const controller = new AbortController();
    activeRequest.current = controller;
    const version = requestVersion.current;
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(deployAssetPath("/api/inquiry"), {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ ...form, type: "INTRODUCTION", targetCompany: company, targetProject: project, needId: need }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true || typeof result.reference !== "string" || !result.reference) throw new Error("Unconfirmed delivery");
      if (version === requestVersion.current) setReference(result.reference);
    } catch { if (version === requestVersion.current) setError(true); }
    finally { clearTimeout(timeout); locked.current = false; setSending(false); }
  }

  return <NetworkLayout title={t.request} description={t.requestIntro} path="/introductions" noindex>
    {reference ? <section role="status" className="max-w-3xl border border-[#5a1f2e]/20 p-6 md:p-10">
      <h2 className="text-2xl font-semibold">{t.success}</h2>
      <p className="mt-4">{t.reference}: <strong dir="ltr">{reference}</strong></p>
      <h3 className="mt-8 text-lg font-semibold">{t.nextTitle}</h3><p className="mt-3 leading-relaxed">{t.next}</p>
      <a href={`mailto:contact@aiabasd.org?subject=${encodeURIComponent(`AIABASD ${reference}`)}`} className={`${networkLink} mt-4`}>{t.followup}</a>
      <div><button className={networkLink} onClick={() => { setReference(""); setForm(emptyIntroductionForm(lang)); }}>{t.another}</button></div>
    </section> : <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.55fr)]">
      <form onSubmit={submit} className="min-w-0">
        <p className="mb-6 text-sm text-[#0b0b10]/70">{t.required}</p>
        {invalid && <div role="alert" className="mb-6 border border-red-200 bg-red-50 p-4 text-red-800">{t.invalid}<button type="button" className={`${networkLink} block`} onClick={() => { setInvalid(false); setCompany(""); setProject(""); setNeed(""); }}>{t.reset}</button></div>}
        <fieldset disabled={sending} className="space-y-6">
          <label className="block space-y-2 text-sm font-medium">{t.targetCompany}<select className={networkField} value={company} onChange={e => setCompany(e.target.value)}><option value="">{t.noCompany}</option>{COMPANIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
          <label className="block space-y-2 text-sm font-medium">{t.targetProject}<select className={networkField} value={project} onChange={e => { setProject(e.target.value); setNeed(""); }}><option value="">{t.noProject}</option>{PROJECTS.map(p => <option key={p.slug} value={p.slug}>{p.title[lang]}</option>)}</select></label>
          {selectedProject && <label className="block space-y-2 text-sm font-medium">{t.need}<select className={networkField} value={need} onChange={e => setNeed(e.target.value)}><option value="">{t.noNeed}</option>{selectedProject.partnership.map((n, index) => <option value={index} key={index}>{n[lang]}</option>)}</select></label>}
          <div className="grid gap-6 sm:grid-cols-2">
            {(["organization", "name", "email", "role"] as const).map(key => <label key={key} className="block min-w-0 space-y-2 text-sm font-medium">{t[key]} *<input required className={networkField} type={key === "email" ? "email" : "text"} autoComplete={key === "role" ? "organization-title" : key} maxLength={{ organization: 160, name: 120, email: 254, role: 60 }[key]} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} /></label>)}
          </div>
          <label className="block space-y-2 text-sm font-medium">{t.contribution} *<textarea required minLength={10} maxLength={500} rows={5} className={networkField} value={form.interest} onChange={e => setForm(f => ({ ...f, interest: e.target.value }))} /></label>
          <label className="block space-y-2 text-sm font-medium">{t.timeline} *<input required maxLength={60} className={networkField} value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))} /></label>
          <label className="block space-y-2 text-sm font-medium">{t.language}<select className={networkField} value={form.locale} onChange={e => setForm(f => ({ ...f, locale: e.target.value as Locale3 }))}><option value="en">English</option><option value="ar">العربية</option><option value="fr">Français</option></select></label>
          <label className="flex min-h-11 items-start gap-3 text-sm leading-relaxed"><input type="checkbox" required checked={form.consent} className="mt-1 h-5 w-5 shrink-0 accent-[#5a1f2e]" onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))} />{t.consent}</label>
          <Link asChild href={localizedLinkPath("/privacy", lang)}><a className={networkLink}>{t.privacy}</a></Link>
          {error && <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{t.error}</p>}
          <div><button type="submit" className={networkButton} disabled={sending || invalid}>{sending ? t.sending : t.submit}</button></div>
        </fieldset>
      </form>
      <aside className="min-w-0 border-t border-[#0b0b10]/20 pt-6 lg:sticky lg:top-28">
        <h2 className="text-xl font-semibold">{t.context}</h2>
        <dl className="mt-6 space-y-6 text-sm">
          <div><dt className="font-semibold">{t.targetCompany}</dt><dd className="mt-2 break-words">{selectedCompany?.name ?? t.noCompany}</dd></div>
          <div><dt className="font-semibold">{t.targetProject}</dt><dd className="mt-2 break-words">{selectedProject?.title[lang] ?? t.noProject}</dd></div>
          {need && selectedProject?.partnership[Number(need)] && <div><dt className="font-semibold">{t.need}</dt><dd className="mt-2">{selectedProject.partnership[Number(need)][lang]}</dd></div>}
        </dl>
        <p className="mt-8 text-sm leading-relaxed text-[#0b0b10]/70">{t.next}</p>
      </aside>
    </div>}
  </NetworkLayout>;
}
