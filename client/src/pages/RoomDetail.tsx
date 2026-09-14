import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { Download, Trash2, Upload } from "lucide-react";
import NetworkLayout, { networkButton, networkField, networkLink } from "@/components/NetworkLayout";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { usePlatformAuth } from "@/contexts/PlatformAuthContext";
import { supabase } from "@/lib/supabase";
import { ROOMS_COPY } from "@/roomsCopy";
import { localizedLinkPath } from "@/localePath";

type Room = { id: string; project_slug: string; title: string };
type Task = { id: string; title: string; status: "open" | "in-progress" | "done"; due_date: string | null };
type Doc = { id: string; storage_path: string; title: string; created_at: string };
type Activity = { id: number; action: string; detail: string; at: string };

const NEXT_STATUS = { open: "in-progress", "in-progress": "done", done: "open" } as const;

export default function RoomDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const { lang } = useLanguageContext();
  const t = ROOMS_COPY[lang];
  const { session, ready } = usePlatformAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "invalid">("loading");
  const [busy, setBusy] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    if (!session || !supabase || !id) return;
    setState("loading");
    (async () => {
      const roomResult = await supabase!.from("rooms").select("id,project_slug,title").eq("id", id).maybeSingle();
      if (!roomResult.data) {
        setState("invalid");
        return;
      }
      setRoom(roomResult.data as Room);
      const [tasksResult, docsResult, activityResult] = await Promise.all([
        supabase!.from("tasks").select("id,title,status,due_date").eq("room_id", id).order("created_at"),
        supabase!.from("documents").select("id,storage_path,title,created_at").eq("room_id", id).order("created_at"),
        supabase!.from("activity_log").select("id,action,detail,at").eq("room_id", id).order("at", { ascending: false }).limit(50),
      ]);
      setTasks((tasksResult.data ?? []) as Task[]);
      setDocs((docsResult.data ?? []) as Doc[]);
      setActivity((activityResult.data ?? []) as Activity[]);
      setState("ready");
    })();
  }, [id, session]);

  if (!supabase || (!ready && !session)) {
    return (
      <NetworkLayout title={t.roomsTitle} description={t.roomsIntro} path="/rooms" noindex>
        {!supabase ? <p role="alert" className="max-w-xl border border-[#0b0b10]/15 bg-white p-6 text-sm">{t.unavailable}</p> : (
          <p className="max-w-xl text-base">{t.gate}</p>
        )}
        {supabase && <Link asChild href={localizedLinkPath("/access", lang)}><a className={`${networkButton} mt-6`}>{t.platform}</a></Link>}
      </NetworkLayout>
    );
  }

  if (state === "loading") {
    return (
      <NetworkLayout title={t.roomsTitle} description={t.roomsIntro} path="/rooms" noindex>
        <p className="text-sm text-[#0b0b10]/70">{t.loading}</p>
      </NetworkLayout>
    );
  }

  if (state === "invalid" || !room) {
    return (
      <NetworkLayout title={t.roomsTitle} description={t.roomsIntro} path="/rooms" noindex>
        <p role="alert" className="max-w-xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">{t.invalidRoom}</p>
        <Link asChild href={localizedLinkPath("/rooms", lang)}><a className={`${networkLink} mt-6`}>{t.backRooms}</a></Link>
      </NetworkLayout>
    );
  }

  async function log(action: string, detail: string) {
    const { data } = await supabase!
      .from("activity_log")
      .insert({ room_id: id, action, detail, actor: session!.user.id })
      .select("id,action,detail,at")
      .single();
    if (data) setActivity((current) => [data as Activity, ...current]);
  }

  async function addTask(event: React.FormEvent) {
    event.preventDefault();
    if (busy || !taskTitle.trim()) return;
    setBusy(true);
    const { data } = await supabase!.from("tasks").insert({ room_id: id, title: taskTitle.trim(), created_by: session!.user.id }).select("id,title,status,due_date").single();
    if (data) {
      setTasks((current) => [...current, data as Task]);
      await log("task-added", taskTitle.trim().slice(0, 200));
    }
    setTaskTitle("");
    setBusy(false);
  }

  async function cycleStatus(task: Task) {
    const next = NEXT_STATUS[task.status];
    setTasks((current) => current.map((item) => (item.id === task.id ? { ...item, status: next } : item)));
    const { error } = await supabase!.from("tasks").update({ status: next }).eq("id", task.id);
    if (!error) await log("task-updated", `${task.title.slice(0, 150)} → ${next}`);
  }

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || busy) return;
    setBusy(true);
    const path = `${id}/${Date.now()}-${file.name}`.slice(0, 400);
    const uploaded = await supabase!.storage.from("room-documents").upload(path, file, { upsert: false });
    if (!uploaded.error) {
      const inserted = await supabase!.from("documents").insert({ room_id: id, storage_path: path, title: file.name, uploaded_by: session!.user.id }).select("id,storage_path,title,created_at").single();
      if (inserted.data) {
        setDocs((current) => [inserted.data as Doc, ...current]);
        await log("document-added", file.name.slice(0, 200));
      }
    }
    setBusy(false);
  }

  async function removeDoc(doc: Doc) {
    if (busy) return;
    setBusy(true);
    await supabase!.storage.from("room-documents").remove([doc.storage_path]);
    const { error } = await supabase!.from("documents").delete().eq("id", doc.id);
    if (!error) {
      setDocs((current) => current.filter((item) => item.id !== doc.id));
      await log("document-removed", doc.title.slice(0, 200));
    }
    setBusy(false);
  }

  async function download(doc: Doc) {
    const { data } = await supabase!.storage.from("room-documents").createSignedUrl(doc.storage_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
  }

  const actionLabel = (action: string) =>
    action === "task-added" ? t.activityTaskAdded
    : action === "task-updated" ? t.activityTaskUpdated
    : action === "document-added" ? t.activityDocumentAdded
    : action === "document-removed" ? t.activityDocumentRemoved
    : action;

  return (
    <NetworkLayout title={room.title} description={`${t.roomsTitle} — ${room.project_slug}`} path="/rooms" noindex>
      <Link asChild href={localizedLinkPath("/rooms", lang)}><a className={`${networkLink} mb-8`}>{t.backRooms}</a></Link>
      <p className="t-data mb-10 text-xs text-[#0b0b10]/60" dir="ltr">{room.project_slug}</p>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="min-w-0 space-y-12">
          <section aria-label={t.tasksTitle}>
            <h2 className="text-xl font-semibold">{t.tasksTitle}</h2>
            <ul className="mt-4 divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
              {tasks.map((task) => (
                <li key={task.id} className="flex min-w-0 flex-wrap items-center justify-between gap-3 py-4">
                  <span className="min-w-0 break-words text-sm">{task.title}</span>
                  <button type="button" onClick={() => void cycleStatus(task)} className="t-meta border border-[#0b0b10]/15 px-2.5 py-1.5 text-[10px] hover:border-[#5a1f2e]/40 hover:text-[#5a1f2e]">
                    {task.status === "open" ? t.statusOpen : task.status === "in-progress" ? t.statusInProgress : t.statusDone}
                  </button>
                </li>
              ))}
              {tasks.length === 0 && <li className="py-4 text-sm text-[#0b0b10]/70">{t.noTasks}</li>}
            </ul>
            <form onSubmit={addTask} className="mt-5 flex flex-wrap gap-3">
              <label className="min-w-0 flex-1 space-y-2 text-sm font-medium">
                <span className="sr-only">{t.taskTitle}</span>
                <input required maxLength={300} className={networkField} placeholder={t.taskTitle} value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
              </label>
              <button type="submit" className={networkButton} disabled={busy || !taskTitle.trim()}>{busy ? t.adding : t.add}</button>
            </form>
          </section>

          <section aria-label={t.documentsTitle}>
            <h2 className="text-xl font-semibold">{t.documentsTitle}</h2>
            <p className="mt-2 text-sm text-[#0b0b10]/70">{t.uploadHint}</p>
            <ul className="mt-4 divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
              {docs.map((doc) => (
                <li key={doc.id} className="flex min-w-0 flex-wrap items-center justify-between gap-3 py-4">
                  <span className="min-w-0 break-words text-sm" dir="auto">{doc.title}</span>
                  <span className="flex shrink-0 gap-4">
                    <button type="button" className={networkLink} onClick={() => void download(doc)}><Download size={14} aria-hidden="true" /> {t.download}</button>
                    <button type="button" className={networkLink} onClick={() => void removeDoc(doc)}><Trash2 size={14} aria-hidden="true" /> {t.remove}</button>
                  </span>
                </li>
              ))}
              {docs.length === 0 && <li className="py-4 text-sm text-[#0b0b10]/70">{t.noDocuments}</li>}
            </ul>
            <label className={`${networkButton} mt-5 cursor-pointer`}>
              <Upload size={14} aria-hidden="true" />
              {busy ? t.uploading : t.upload}
              <input type="file" className="sr-only" disabled={busy} onChange={(e) => void upload(e)} />
            </label>
          </section>
        </div>

        <aside aria-label={t.activityTitle} className="min-w-0 border-t border-[#0b0b10]/10 pt-8 lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-xl font-semibold">{t.activityTitle}</h2>
          <ol className="mt-5 space-y-4">
            {activity.map((entry) => (
              <li key={entry.id} className="border-s-2 border-[#5a1f2e]/25 ps-4">
                <p className="text-sm font-medium">{actionLabel(entry.action)}{entry.detail ? `: ${entry.detail}` : ""}</p>
                <time className="t-data text-xs text-[#0b0b10]/60" dateTime={entry.at}>{new Date(entry.at).toLocaleString(lang)}</time>
              </li>
            ))}
            {activity.length === 0 && <li className="text-sm text-[#0b0b10]/70">{t.noActivity}</li>}
          </ol>
        </aside>
      </div>
    </NetworkLayout>
  );
}
