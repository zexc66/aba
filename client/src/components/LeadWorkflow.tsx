import { useState } from "react";
import type { Locale3 } from "@/projects";

const COPY = {
  en: { title: "Inquiry workflow", stage: "Stage", assignee: "Assigned owner", nextAction: "Next action", save: "Save workflow", history: "Workflow history", failed: "Update failed. Reload to check for another operator’s changes before retrying.", new: "New", qualified: "Qualified", introduced: "Introduction arranged", assessment: "Assessment", "active-development": "Active development", paused: "Paused", closed: "Closed", saving: "Saving…", done: "Workflow saved" },
  ar: { title: "سير عمل الاستفسار", stage: "المرحلة", assignee: "المسؤول المعين", nextAction: "الإجراء التالي", save: "حفظ سير العمل", history: "سجل التحديثات", failed: "فشل التحديث. أعد التحميل للتحقق من تعديلات مسؤول آخر قبل المحاولة.", new: "جديد", qualified: "مؤهل", introduced: "تم ترتيب التعريف", assessment: "التقييم", "active-development": "تطوير نشط", paused: "متوقف مؤقتاً", closed: "مغلق", saving: "جارٍ الحفظ…", done: "تم حفظ سير العمل" },
  fr: { title: "Suivi de la demande", stage: "Étape", assignee: "Responsable assigné", nextAction: "Prochaine action", save: "Enregistrer le suivi", history: "Historique du suivi", failed: "Échec de la mise à jour. Rechargez pour vérifier les modifications d’un autre opérateur avant de réessayer.", new: "Nouvelle", qualified: "Qualifiée", introduced: "Mise en relation organisée", assessment: "Évaluation", "active-development": "Développement actif", paused: "En pause", closed: "Clôturée", saving: "Enregistrement…", done: "Suivi enregistré" },
};
const stages = ["new", "qualified", "introduced", "assessment", "active-development", "paused", "closed"] as const;
type WorkflowLead = { id: string; stage?: string; assignee?: string; nextAction?: string; revision?: number; workflowHistory?: { at: string; stage: string; assignee: string; nextAction: string; revision: number }[] };

export default function LeadWorkflow({ lead, token, locale, onUpdated }: { lead: WorkflowLead; token: string; locale: Locale3; onUpdated: () => void }) {
  const t = COPY[locale];
  const [stage, setStage] = useState(lead.stage ?? "new");
  const [assignee, setAssignee] = useState(lead.assignee ?? "");
  const [nextAction, setNextAction] = useState(lead.nextAction ?? "");
  const [state, setState] = useState<"idle" | "saving" | "failed" | "done">("idle");
  const field = "mt-2 min-h-11 w-full border border-white/20 bg-[#11111a] px-3 py-2 text-sm text-[#fdfcfb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007]";
  async function save(e: React.FormEvent) {
    e.preventDefault(); if (state === "saving") return; setState("saving");
    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`, { method: "PATCH", headers: { "Content-Type": "application/json", "x-admin-token": token }, body: JSON.stringify({ stage, assignee, nextAction, revision: lead.revision ?? 0 }) });
      if (!response.ok) throw new Error("Update rejected");
      setState("done"); onUpdated();
    } catch { setState("failed"); }
  }
  return <details className="border-t border-white/20 pt-3" dir={locale === "ar" ? "rtl" : "ltr"}>
    <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold text-[#f2a007]">{t.title}</summary>
    <form onSubmit={save} className="space-y-4 pb-5">
      <fieldset disabled={state === "saving"} className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">{t.stage}<select className={field} value={stage} onChange={e => setStage(e.target.value)}>{stages.map(s => <option key={s} value={s}>{t[s]}</option>)}</select></label>
        <label className="text-sm">{t.assignee}<input maxLength={120} className={field} value={assignee} onChange={e => setAssignee(e.target.value)} /></label>
        <label className="text-sm md:col-span-2">{t.nextAction}<textarea maxLength={1000} rows={3} className={field} value={nextAction} onChange={e => setNextAction(e.target.value)} /></label>
      </fieldset>
      <button disabled={state === "saving"} className="min-h-11 border border-[#f2a007]/60 px-4 py-2 text-sm text-[#f2a007] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007]">{state === "saving" ? t.saving : t.save}</button>
      {(state === "failed" || state === "done") && <p role={state === "failed" ? "alert" : "status"} className="text-sm">{t[state]}</p>}
    </form>
    {!!lead.workflowHistory?.length && <section><h3 className="text-sm font-semibold">{t.history}</h3><ol className="divide-y divide-white/10">{lead.workflowHistory.slice().reverse().map(event => <li key={event.revision} className="space-y-1 py-3 text-sm"><time dateTime={event.at}>{new Date(event.at).toLocaleString(locale)}</time><p>{t[event.stage as typeof stages[number]] ?? event.stage} · {event.assignee}</p><p>{event.nextAction}</p></li>)}</ol></section>}
  </details>;
}
