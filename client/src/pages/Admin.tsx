import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Inbox, BarChart3, KeyRound, LogOut, RefreshCw, AlertCircle, Lock } from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";

const ADMIN_TOKEN_KEY = "aiabasd-admin-token";

interface Lead {
  id: string;
  type: string;
  email: string;
  name?: string;
  organization?: string;
  sector?: string;
  region?: string;
  ticket?: string;
  timeline?: string;
  message?: string;
  timestamp: string;
}

type Stats = Record<string, Record<string, number>>;

function AdminInner({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);
  const { lang } = useLanguageContext();

  const token = (() => {
    try {
      return sessionStorage.getItem(ADMIN_TOKEN_KEY) ?? "";
    } catch {
      return "";
    }
  })();

  const load = useCallback(async () => {
    try {
      const headers = { "x-admin-token": token };
      const [leadsRes, statsRes] = await Promise.all([
        fetch("/api/admin/leads", { headers }),
        fetch("/api/admin/stats", { headers }),
      ]);
      if (leadsRes.status === 401 || statsRes.status === 401) {
        onLogout();
        return;
      }
      if (!leadsRes.ok || !statsRes.ok) {
        setFailed(true);
        return;
      }
      const leadsBody = (await leadsRes.json()) as { leads?: Lead[] };
      setLeads(Array.isArray(leadsBody.leads) ? leadsBody.leads : []);
      setStats((await statsRes.json()) as Stats);
    } catch {
      setFailed(true);
    }
  }, [token, onLogout]);

  useEffect(() => {
    void load();
  }, [load]);

  const totalViews = stats
    ? Object.values(stats).reduce((sum, day) => sum + Object.values(day).reduce((a, b) => a + b, 0), 0)
    : 0;
  const activeDays = stats ? Object.keys(stats).length : 0;

  return (
    <div className="min-h-screen bg-[#0b0b10] text-[#fdfcfb] p-6 md:p-12 font-sans">
      <SEO title="Operations Console | AIABASD" description="Internal lead and analytics console." lang={lang} url="/admin" />

      <header className="max-w-6xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Inbox size={20} className="text-[#f2a007]" />
          <h1 className="text-lg font-bold">Operations Console</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void load()}
            className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white border border-white/15 hover:border-white/40 rounded-lg px-3 py-2 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} /> Refresh
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white border border-white/15 hover:border-white/40 rounded-lg px-3 py-2 transition-colors cursor-pointer"
          >
            <LogOut size={13} /> End session
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-10 py-8">
        {failed ? (
          <div role="alert" className="flex items-center gap-2.5 text-sm text-red-300 border border-red-900/50 bg-red-950/30 rounded-lg px-4 py-3">
            <AlertCircle size={16} /> Could not load console data.
          </div>
        ) : (
          <>
            <section className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
              <div className="bg-[#11111a] p-6">
                <div className="t-meta text-white/40">TOTAL_LEADS</div>
                <div className="t-data text-3xl font-semibold text-[#f2a007] mt-2" dir="ltr">
                  {leads ? leads.length : "···"}
                </div>
              </div>
              <div className="bg-[#11111a] p-6">
                <div className="t-meta text-white/40">PAGEVIEWS_90D</div>
                <div className="t-data text-3xl font-semibold text-white mt-2" dir="ltr">
                  {stats ? totalViews : "···"}
                </div>
              </div>
              <div className="bg-[#11111a] p-6 col-span-2 md:col-span-1">
                <div className="t-meta text-white/40 flex items-center gap-2">
                  <BarChart3 size={12} /> ACTIVE_DAYS
                </div>
                <div className="t-data text-3xl font-semibold text-white mt-2" dir="ltr">
                  {stats ? activeDays : "···"}
                </div>
              </div>
            </section>

            <section>
              <h2 className="t-meta text-white/40 border-b-2 border-white/20 pb-3 mb-0">LEADS · NEWEST_FIRST</h2>
              {leads === null ? (
                <div className="border border-white/10 rounded-lg p-10 text-center t-meta text-white/40">···</div>
              ) : leads.length === 0 ? (
                <div className="border border-white/10 bg-[#11111a] rounded-lg p-10 text-center text-sm text-white/50">
                  No leads captured yet.
                </div>
              ) : (
                <ul className="divide-y divide-white/10 border-x border-b border-white/10">
                  {leads.map((lead, i) => (
                    <motion.li
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
                      className="bg-[#11111a] px-5 py-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="t-data text-xs text-[#f2a007]" dir="ltr">{lead.id}</span>
                          <span className="t-meta text-white/45 text-[10px] border border-white/15 px-2 py-1" dir="ltr">{lead.type}</span>
                          {lead.organization && (
                            <span className="text-sm font-semibold text-white truncate">{lead.organization}</span>
                          )}
                        </div>
                        <span className="t-data text-[11px] text-white/40" dir="ltr">{lead.timestamp.slice(0, 16).replace("T", " ")}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-xs text-white/60" dir="ltr">
                        <span>{lead.email}</span>
                        {lead.name && <span>{lead.name}</span>}
                        {lead.sector && <span>SECTOR: {lead.sector}</span>}
                        {lead.region && <span>REGION: {lead.region}</span>}
                        {lead.ticket && <span>TICKET: {lead.ticket}</span>}
                      </div>
                      {lead.message && (
                        <p className="text-xs text-white/50 leading-relaxed mt-2 pt-2 border-t border-white/5 whitespace-pre-line">
                          {lead.message}
                        </p>
                      )}
                    </motion.li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default function Admin() {
  const { lang } = useLanguageContext();
  const [token, setToken] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(ADMIN_TOKEN_KEY);
      if (stored) setToken(stored);
    } catch {
    }
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0b0b10] text-[#fdfcfb] flex flex-col items-center justify-center p-6 font-sans">
        <SEO title="Operations Console | AIABASD" description="Internal console." lang={lang} url="/admin" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            try {
              sessionStorage.setItem(ADMIN_TOKEN_KEY, input.trim());
            } catch {
            }
            setToken(input.trim());
          }}
          className="w-full max-w-sm bg-[#11111a] border border-white/15 p-8 space-y-5"
        >
          <div className="w-12 h-12 rounded-full bg-[#5a1f2e]/20 text-[#f2a007] border border-[#5a1f2e]/40 flex items-center justify-center mx-auto">
            <Lock size={20} />
          </div>
          <h1 className="text-center text-lg font-bold">Operations Console</h1>
          <div className="space-y-2">
            <label htmlFor="admin-token" className="t-meta text-white/50 flex items-center gap-2">
              <KeyRound size={12} /> ADMIN_TOKEN
            </label>
            <input
              id="admin-token"
              type="password"
              required
              autoComplete="off"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#f2a007] transition-colors"
            />
            {error && <p className="text-xs text-red-400">Invalid token.</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 text-white font-semibold text-sm py-3 uppercase tracking-wider transition-colors"
          >
            UNLOCK
          </button>
        </form>
      </div>
    );
  }

  return <AdminInner onLogout={() => {
    try {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    } catch {
    }
    setToken(null);
    setError(false);
  }} />;
}
