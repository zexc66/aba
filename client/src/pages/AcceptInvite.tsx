import { useEffect, useRef, useState } from "react";
import { Link, useSearch } from "wouter";
import NetworkLayout, { networkButton, networkField, networkLink } from "@/components/NetworkLayout";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { usePlatformAuth } from "@/contexts/PlatformAuthContext";
import { ROOMS_COPY } from "@/roomsCopy";
import { deployAssetPath, localizedLinkPath, localizedPath } from "@/localePath";

type Outcome =
  | { kind: "idle" }
  | { kind: "accepted" }
  | { kind: "already" }
  | { kind: "invalid" }
  | { kind: "mismatch"; email: string }
  | { kind: "failed" };

export default function AcceptInvite() {
  const { lang } = useLanguageContext();
  const t = ROOMS_COPY[lang];
  const search = useSearch();
  const token = new URLSearchParams(search).get("token") ?? "";
  const { session, ready, signIn } = usePlatformAuth();
  const [outcome, setOutcome] = useState<Outcome>({ kind: "idle" });
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const attempted = useRef(false);

  useEffect(() => {
    if (!session || !token || attempted.current) return;
    attempted.current = true;
    setBusy(true);
    fetch(deployAssetPath("/api/org/accept"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify({ token }),
    })
      .then(async (response) => {
        const body = (await response.json().catch(() => ({}))) as { error?: string; email?: string };
        if (response.ok) setOutcome({ kind: "accepted" });
        else if (response.status === 409) setOutcome({ kind: "already" });
        else if (response.status === 404 || response.status === 400) setOutcome({ kind: "invalid" });
        else if (response.status === 412) setOutcome({ kind: "mismatch", email: body.email ?? "" });
        else setOutcome({ kind: "failed" });
      })
      .catch(() => setOutcome({ kind: "failed" }))
      .finally(() => setBusy(false));
  }, [session, token]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await signIn(email.trim(), `${window.location.origin}${localizedPath("/accept-invite", lang)}?token=${encodeURIComponent(token)}`);
      attempted.current = false;
    } catch {
      setOutcome({ kind: "failed" });
    } finally {
      setBusy(false);
    }
  }

  const message =
    outcome.kind === "accepted" ? t.accepted
    : outcome.kind === "already" ? t.already
    : outcome.kind === "invalid" ? t.invalidInvite
    : outcome.kind === "mismatch" ? t.mismatch.replace("{email}", outcome.email)
    : outcome.kind === "failed" ? t.inviteFailed
    : "";

  return (
    <NetworkLayout title={t.inviteTitle} description={t.inviteIntro} path="/accept-invite" noindex>
      {message && (
        <div role={outcome.kind === "accepted" ? "status" : "alert"} className={`max-w-xl border p-6 text-sm ${outcome.kind === "accepted" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-red-200 bg-red-50 text-red-800"}`}>
          {message}
        </div>
      )}

      {outcome.kind === "accepted" && (
        <Link asChild href={localizedLinkPath("/rooms", lang)}><a className={`${networkButton} mt-8`}>{t.continueRooms}</a></Link>
      )}

      {!session && outcome.kind !== "accepted" && ready && (
        <form onSubmit={submit} className="max-w-xl space-y-6">
          <p className="text-base">{t.signInFirst}</p>
          <label className="block space-y-2 text-sm font-medium">
            {t.emailLabel} *
            <input required type="email" autoComplete="email" maxLength={254} className={networkField} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button type="submit" className={networkButton} disabled={busy}>{busy ? t.sending : t.sendLink}</button>
        </form>
      )}

      {session && (outcome.kind === "idle" || busy) && !message && (
        <p className="text-sm text-[#0b0b10]/70">{t.accepting}</p>
      )}
    </NetworkLayout>
  );
}
