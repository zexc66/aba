import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import NetworkLayout, { networkButton, networkField, networkLink } from "@/components/NetworkLayout";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { PROJECTS, projectBySlug } from "@/projects";
import { introductionPath } from "@/companies";
import { localizedLinkPath } from "@/localePath";
import { PREPARATION_COPY, PREPARATION_IDS, PREPARATION_KEY, parsePreparationStore, preparationNote, type PreparationDraft, type PreparationStatus } from "@/preparation";
import { TEMPLATES_COPY } from "@/templates";

export default function Preparation() {
  const { lang } = useLanguageContext();
  const t = PREPARATION_COPY[lang];
  const search = useSearch();
  const [slug, setSlug] = useState("");
  const [drafts, setDrafts] = useState<Record<string, PreparationDraft>>({});
  const [message, setMessage] = useState<"saved" | "failed" | "">("");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setDrafts(parsePreparationStore(JSON.parse(localStorage.getItem(PREPARATION_KEY) ?? "null"))); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { const value = new URLSearchParams(search).get("project") ?? ""; setSlug(projectBySlug(value) ? value : ""); }, [search]);
  const project = projectBySlug(slug);
  const draft = drafts[slug] ?? { checks: {}, notes: "" };
  const update = (next: PreparationDraft) => { setDrafts(d => ({ ...d, [slug]: next })); setMessage(""); };
  function save(next = drafts) {
    try { localStorage.setItem(PREPARATION_KEY, JSON.stringify({ version: 1, projects: next })); setMessage("saved"); } catch { setMessage("failed"); }
  }
  function download() {
    if (!project) return;
    const url = URL.createObjectURL(new Blob([preparationNote(project, draft, lang)], { type: "text/markdown;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = `${slug}-preparation-${lang}.md`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <NetworkLayout title={t.title} description={t.intro} path="/preparation" noindex>
    <label className="block max-w-2xl space-y-2 text-sm font-medium">{t.select}<select className={networkField} value={slug} onChange={e => { setSlug(e.target.value); setMessage(""); }}><option value="">{t.choose}</option>{PROJECTS.map(p => <option key={p.slug} value={p.slug}>{p.title[lang]}</option>)}</select></label>
    {project && <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.5fr)]">
      <section>
        <h2 className="text-xl font-semibold">{t.questions}</h2>
        <p role="status" className="mt-3 text-sm text-[#0b0b10]/70">{Object.values(draft.checks).filter(v => v === "available").length}/7 {t.completed}</p>
        <fieldset disabled={!ready} className="mt-6 divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
          {PREPARATION_IDS.map(key => <label className="grid items-center gap-3 py-5 text-sm md:grid-cols-[1fr_12rem]" key={key}><span className="font-medium">{t.items[key]}</span><select aria-label={`${t.items[key]} — ${t.status}`} className={networkField} value={draft.checks[key] ?? "unknown"} onChange={e => update({ ...draft, checks: { ...draft.checks, [key]: e.target.value as PreparationStatus } })}>{(["unknown", "in-progress", "available"] as const).map(status => <option key={status} value={status}>{t[status]}</option>)}</select></label>)}
        </fieldset>
        <label className="mt-8 block space-y-3 font-medium">{t.notes}<textarea rows={5} maxLength={2000} value={draft.notes} className={networkField} onChange={e => update({ ...draft, notes: e.target.value })} /></label>
        <p className="mt-2 text-sm text-[#0b0b10]/70">{t.noteHint}</p>
        <div className="mt-6 flex flex-wrap gap-5"><button className={networkButton} disabled={!ready} onClick={() => save()}>{t.save}</button><button className={networkLink} onClick={download}>{t.download}</button><button className={networkLink} onClick={() => { const next = { ...drafts }; delete next[slug]; setDrafts(next); save(next); }}>{t.reset}</button></div>
        {message && <p role={message === "failed" ? "alert" : "status"} className="mt-4 text-sm">{t[message]}</p>}
      </section>
      <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <h2 className="text-xl font-semibold">{project.title[lang]}</h2><p className="mt-4 text-sm leading-relaxed text-[#0b0b10]/70">{project.description[lang]}</p>
        <p className="mt-5 text-sm leading-relaxed">{t.disclaimer}</p>
        <Link asChild href={localizedLinkPath(introductionPath("", slug), lang)}><a className={`${networkLink} mt-5`}>{t.next}</a></Link>
        <div><Link asChild href={localizedLinkPath("/knowledge", lang)}><a className={networkLink}>{t.guide}</a></Link></div>
        <div><Link asChild href={localizedLinkPath("/templates", lang)}><a className={networkLink}>{TEMPLATES_COPY[lang].title}</a></Link></div>
      </aside>
    </div>}
  </NetworkLayout>;
}
