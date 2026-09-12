import { useState } from "react";
import { Link } from "wouter";
import { MailCheck } from "lucide-react";
import NetworkLayout, { networkButton, networkField, networkLink } from "@/components/NetworkLayout";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { usePlatformAuth } from "@/contexts/PlatformAuthContext";
import { ROOMS_COPY } from "@/roomsCopy";
import { localizedLinkPath, localizedPath } from "@/localePath";

export default function Access() {
  const { lang } = useLanguageContext();
  const t = ROOMS_COPY[lang];
  const { session, user, signIn, signOut } = usePlatformAuth();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setFailed(false);
    try {
      await signIn(email.trim(), `${window.location.origin}${localizedPath("/rooms", lang)}`);
      setSent(true);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <NetworkLayout title={t.accessTitle} description={t.accessIntro} path="/access" noindex>
      {!session ? (
        sent ? (
          <div className="max-w-xl border border-[#0b0b10]/15 bg-white p-8" role="status">
            <MailCheck size={22} className="text-[#5a1f2e]" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">{t.checkEmail.replace("{email}", email)}</h2>
            <button type="button" className={`${networkLink} mt-6`} onClick={() => { setSent(false); setEmail(""); }}>
              {t.useAnother}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="max-w-xl space-y-6">
            <label className="block space-y-2 text-sm font-medium">
              {t.emailLabel} *
              <input
                required
                type="email"
                autoComplete="email"
                maxLength={254}
                className={networkField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {failed && <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{t.failed}</p>}
            <button type="submit" className={networkButton} disabled={sending}>
              {sending ? t.sending : t.sendLink}
            </button>
          </form>
        )
      ) : (
        <div className="max-w-xl space-y-6">
          <p className="text-base">
            <span className="font-semibold">{t.signedInAs}:</span>{" "}
            <span dir="ltr">{user?.email}</span>
          </p>
          <div className="flex flex-wrap gap-5">
            <Link asChild href={localizedLinkPath("/rooms", lang)}>
              <a className={networkButton}>{t.continueRooms}</a>
            </Link>
            <button type="button" className={networkLink} onClick={() => void signOut()}>
              {t.signOut}
            </button>
          </div>
        </div>
      )}
    </NetworkLayout>
  );
}
