import { useEffect, useState } from "react";
import { Link } from "wouter";
import NetworkLayout, { networkButton, networkField, networkLink } from "@/components/NetworkLayout";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { usePlatformAuth } from "@/contexts/PlatformAuthContext";
import { supabase } from "@/lib/supabase";
import { ROOMS_COPY } from "@/roomsCopy";
import { PROJECTS } from "@/projects";
import { localizedLinkPath } from "@/localePath";

type Room = { id: string; project_slug: string; title: string; created_at: string };
type OrgGroup = { role: string; organizations: { id: string; name: string; slug: string; rooms: Room[] | null } | null };

export default function Rooms() {
  const { lang } = useLanguageContext();
  const t = ROOMS_COPY[lang];
  const { session, ready } = usePlatformAuth();
  const [groups, setGroups] = useState<OrgGroup[] | null>(null);
  const [error, setError] = useState(false);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({ project_slug: PROJECTS[0]?.slug ?? "", title: "" });

  async function load() {
    if (!supabase) return;
    const { data, error: e } = await supabase
      .from("memberships")
      .select("role, organizations(id,name,slug,rooms(id,project_slug,title,created_at))")
      .eq("status", "active");
    if (e) setError(true);
    else setGroups((data ?? []) as unknown as OrgGroup[]);
  }

  useEffect(() => {
    if (session && supabase) void load();
  }, [session]);

  async function createRoom(event: React.FormEvent) {
    event.preventDefault();
    if (creating || !groups) return;
    const coordinatorGroup = groups.find((g) => g.role === "owner" || g.role === "coordinator");
    if (!coordinatorGroup?.organizations) return;
    setCreating(true);
    setError(false);
    const { error: e } = await supabase!.from("rooms").insert({
      org_id: coordinatorGroup.organizations.id,
      project_slug: draft.project_slug,
      title: draft.title.trim(),
    });
    setCreating(false);
    if (e) setError(true);
    else {
      setDraft((d) => ({ ...d, title: "" }));
      await load();
    }
  }

  if (!supabase) {
    return (
      <NetworkLayout title={t.roomsTitle} description={t.roomsIntro} path="/rooms" noindex>
        <p role="alert" className="max-w-xl border border-[#0b0b10]/15 bg-white p-6 text-sm">{t.unavailable}</p>
      </NetworkLayout>
    );
  }

  if (!ready) {
    return (
      <NetworkLayout title={t.roomsTitle} description={t.roomsIntro} path="/rooms" noindex>
        <p className="text-sm text-[#0b0b10]/70">{t.loading}</p>
      </NetworkLayout>
    );
  }

  if (!session) {
    return (
      <NetworkLayout title={t.roomsTitle} description={t.roomsIntro} path="/rooms" noindex>
        <p className="max-w-xl text-base">{t.gate}</p>
        <Link asChild href={localizedLinkPath("/access", lang)}>
          <a className={`${networkButton} mt-6`}>{t.platform}</a>
        </Link>
      </NetworkLayout>
    );
  }

  const coordinator = groups?.some((g) => g.role === "owner" || g.role === "coordinator");
  const roleLabel = (role: string) => (role === "owner" ? t.roleOwner : role === "coordinator" ? t.roleCoordinator : t.roleMember);

  return (
    <NetworkLayout title={t.roomsTitle} description={t.roomsIntro} path="/rooms" noindex>
      <p className="mb-8 text-sm text-[#0b0b10]/70">
        {t.signedInAs} <span dir="ltr" className="font-semibold">{session.user.email}</span>
        {" · "}
        <Link asChild href={localizedLinkPath("/access", lang)}><a className={networkLink}>{t.signOut}</a></Link>
      </p>

      {error && <p role="alert" className="mb-6 max-w-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{t.loadFailed}</p>}

      {groups === null ? (
        <p className="text-sm text-[#0b0b10]/70">{t.loading}</p>
      ) : groups.length === 0 ? (
        <p className="max-w-xl border border-[#0b0b10]/15 bg-white p-6 text-sm">{t.empty}</p>
      ) : (
        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.organizations?.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#0b0b10]/10 pb-3">
                <h2 className="text-xl font-semibold">{group.organizations?.name}</h2>
                <span className="text-sm text-[#0b0b10]/70">{t.yourRole}: {roleLabel(group.role)}</span>
              </div>
              <ul className="divide-y divide-[#0b0b10]/10 border-b border-[#0b0b10]/10">
                {(group.organizations?.rooms ?? []).map((room) => (
                  <li key={room.id} className="flex min-w-0 flex-wrap items-center justify-between gap-3 py-5">
                    <div className="min-w-0">
                      <Link asChild href={localizedLinkPath(`/rooms/${room.id}`, lang)}>
                        <a className="text-lg font-semibold underline-offset-4 hover:underline">{room.title}</a>
                      </Link>
                      <p className="t-data mt-1 text-xs text-[#0b0b10]/60" dir="ltr">{room.project_slug}</p>
                    </div>
                    <Link asChild href={localizedLinkPath(`/rooms/${room.id}`, lang)}>
                      <a className={networkLink}>{t.continueRooms.split(" ").slice(-1)[0]}</a>
                    </Link>
                  </li>
                ))}
                {(group.organizations?.rooms ?? []).length === 0 && <li className="py-5 text-sm text-[#0b0b10]/70">{t.empty}</li>}
              </ul>
            </section>
          ))}
        </div>
      )}

      {coordinator && groups && groups.length > 0 && (
        <form onSubmit={createRoom} className="mt-12 max-w-xl space-y-5 border-t border-[#0b0b10]/10 pt-8">
          <h2 className="text-lg font-semibold">{t.createRoom}</h2>
          <label className="block space-y-2 text-sm font-medium">
            {t.projectLabel}
            <select className={networkField} value={draft.project_slug} onChange={(e) => setDraft((d) => ({ ...d, project_slug: e.target.value }))}>
              {PROJECTS.map((p) => (
                <option key={p.slug} value={p.slug}>{p.title[lang]}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-2 text-sm font-medium">
            {t.titleLabel} *
            <input required minLength={2} maxLength={160} className={networkField} value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} />
          </label>
          <button type="submit" className={networkButton} disabled={creating || !draft.title.trim()}>
            {creating ? t.creating : t.create}
          </button>
        </form>
      )}
    </NetworkLayout>
  );
}
