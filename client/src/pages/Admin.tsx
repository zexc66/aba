import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Inbox,
  BarChart3,
  KeyRound,
  LogOut,
  RefreshCw,
  AlertCircle,
  Lock,
  Terminal,
} from "lucide-react";
import SEO from "@/components/SEO";
import LeadWorkflow from "@/components/LeadWorkflow";
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
  partyType?: string;
  sectors?: string;
  countries?: string;
  capabilities?: string;
  capitalBand?: string;
  targetProject?: string;
  targetCompany?: string;
  needId?: string;
  targetService?: string;
  consent?: boolean;
  role?: string;
  interest?: string;
  stage?: string;
  priority?: string;
  message?: string;
  timestamp: string;
  assignee?: string;
  nextAction?: string;
  revision?: number;
  workflowHistory?: { at: string; stage: string; assignee: string; nextAction: string; revision: number }[];
}

type Stats = Record<string, Record<string, number>>;

function AdminInner({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { lang, isRTL } = useLanguageContext();
  const shouldReduceMotion = useReducedMotion();

  const token = (() => {
    try {
      return sessionStorage.getItem(ADMIN_TOKEN_KEY) ?? "";
    } catch {
      return "";
    }
  })();

  const load = useCallback(async () => {
    setIsRefreshing(true);
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
      setFailed(false);
    } catch {
      setFailed(true);
    } finally {
      setIsRefreshing(false);
    }
  }, [token, onLogout]);

  useEffect(() => {
    void load();
  }, [load]);

  const totalViews = stats
    ? Object.values(stats).reduce(
        (sum, day) =>
          sum +
          Object.entries(day)
            .filter(([path]) => !path.startsWith("event:"))
            .reduce((a, [, count]) => a + count, 0),
        0
      )
    : 0;
  const activeDays = stats ? Object.keys(stats).length : 0;

  return (
    <div
      className={`min-h-screen bg-[#0b0b10] text-[#fdfcfb] p-4 sm:p-6 md:p-12 ${
        isRTL ? "font-arabic" : "font-sans"
      }`}
    >
      <SEO
        title="Operations Console | AIABASD"
        description="Internal lead and analytics console."
        lang={lang}
        url="/admin"
      />

      {/* Sovereign Terminal HUD Topbar */}
      <header className="max-w-6xl mx-auto border-b border-[rgba(253,252,251,0.12)] pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5a1f2e]/25 text-[#f2a007] border border-[#5a1f2e]/60 flex items-center justify-center shrink-0">
              <Terminal size={18} strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-[#fdfcfb] font-display">
                  Operations Console
                </h1>
                <span className="t-meta text-[9px] text-[#f2a007] border border-[#f2a007]/40 bg-[#f2a007]/10 px-1.5 py-0.5 tracking-widest hidden sm:inline-block">
                  SYS_ACTIVE
                </span>
              </div>
              <p className="t-meta text-[10px] text-[#fdfcfb]/45 tracking-wider mt-0.5">
                AIABASD · INQUIRY &amp; TELEMETRY LEDGER
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => void load()}
              disabled={isRefreshing}
              className="flex items-center gap-2 t-meta text-xs font-semibold text-[#fdfcfb]/70 hover:text-[#fdfcfb] hover:border-[#f2a007]/60 border border-[rgba(253,252,251,0.15)] bg-[#11111a] px-3.5 py-2 transition-[border-color,color,transform] cursor-pointer active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-1 disabled:opacity-50"
            >
              <RefreshCw
                size={13}
                strokeWidth={1.5}
                className={isRefreshing ? "animate-spin text-[#f2a007]" : ""}
              />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-2 t-meta text-xs font-semibold text-[#fdfcfb]/80 hover:text-[#fdfcfb] border border-[#5a1f2e]/60 hover:border-[#5a1f2e] bg-[#5a1f2e]/15 hover:bg-[#5a1f2e] px-3.5 py-2 transition-[background-color,border-color,color,transform] cursor-pointer active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-1"
            >
              <LogOut size={13} strokeWidth={1.5} className={isRTL ? "rotate-180" : ""} />
              <span>End session</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-8 py-8">
        {failed ? (
          <div
            role="alert"
            className="border border-[#5a1f2e] bg-[#11111a] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <AlertCircle size={18} strokeWidth={1.5} className="text-[#f2a007] shrink-0" />
              <span className="text-sm font-medium text-[#fdfcfb]">Could not load console data.</span>
            </div>
            <button
              type="button"
              onClick={() => void load()}
              className="px-3.5 py-1.5 border border-[#f2a007]/50 bg-[#f2a007]/10 hover:bg-[#f2a007] hover:text-[#0b0b10] text-[#f2a007] t-meta text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-1"
            >
              Refresh
            </button>
          </div>
        ) : (
          <>
            {/* Telemetry Compartments: 1px Grid Determinism */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-[1px] bg-[rgba(253,252,251,0.12)] border border-[rgba(253,252,251,0.12)]">
              <div className="bg-[#11111a] p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="t-meta text-[10px] text-[#fdfcfb]/45 tracking-[0.1em]">
                    TOTAL_LEADS
                  </span>
                  <span className="t-meta text-[9px] text-[#f2a007] font-mono">01</span>
                </div>
                <div className="mt-3">
                  <data
                    value={leads ? leads.length : 0}
                    className="t-data text-3xl sm:text-4xl font-semibold text-[#f2a007] tabular-nums block"
                    dir="ltr"
                  >
                    {leads ? leads.length : "···"}
                  </data>
                  <span className="t-meta text-[9px] text-[#fdfcfb]/30 tracking-wider block mt-1">
                    INGESTED_SUBMISSIONS
                  </span>
                </div>
              </div>

              <div className="bg-[#11111a] p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="t-meta text-[10px] text-[#fdfcfb]/45 tracking-[0.1em]">
                    PAGEVIEWS_90D
                  </span>
                  <span className="t-meta text-[9px] text-[#fdfcfb]/30 font-mono">02</span>
                </div>
                <div className="mt-3">
                  <data
                    value={totalViews}
                    className="t-data text-3xl sm:text-4xl font-semibold text-[#fdfcfb] tabular-nums block"
                    dir="ltr"
                  >
                    {stats ? totalViews : "···"}
                  </data>
                  <span className="t-meta text-[9px] text-[#fdfcfb]/30 tracking-wider block mt-1">
                    VERIFIED_TRAFFIC_LOGS
                  </span>
                </div>
              </div>

              <div className="bg-[#11111a] p-5 sm:p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="t-meta text-[10px] text-[#fdfcfb]/45 tracking-[0.1em] flex items-center gap-1.5">
                    <BarChart3 size={11} strokeWidth={1.5} className="text-[#f2a007]" /> ACTIVE_DAYS
                  </span>
                  <span className="t-meta text-[9px] text-[#fdfcfb]/30 font-mono">03</span>
                </div>
                <div className="mt-3">
                  <data
                    value={activeDays}
                    className="t-data text-3xl sm:text-4xl font-semibold text-[#fdfcfb] tabular-nums block"
                    dir="ltr"
                  >
                    {stats ? activeDays : "···"}
                  </data>
                  <span className="t-meta text-[9px] text-[#fdfcfb]/30 tracking-wider block mt-1">
                    RECORDING_SPAN
                  </span>
                </div>
              </div>
            </section>

            {/* Operational Ledger Section */}
            <section className="space-y-3">
              <div className="flex items-center justify-between border-b border-[rgba(253,252,251,0.15)] pb-3">
                <h2 className="t-meta text-xs text-[#fdfcfb]/60 tracking-[0.12em]">
                  LEADS · NEWEST_FIRST
                </h2>
                <span className="t-data text-xs text-[#f2a007] tabular-nums font-mono" dir="ltr">
                  [{leads ? String(leads.length).padStart(3, "0") : "---"} RECORDS]
                </span>
              </div>

              {leads === null ? (
                /* Composed Telemetry Scanning Skeleton */
                <div className="border border-[rgba(253,252,251,0.12)] bg-[#11111a] divide-y divide-[rgba(253,252,251,0.08)]">
                  <div className="p-8 text-center space-y-2">
                    <RefreshCw
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#f2a007] animate-spin mx-auto"
                    />
                    <div className="t-meta text-xs text-[#fdfcfb]/50 tracking-widest">
                      INITIALIZING_DATA_STREAM...
                    </div>
                  </div>
                  {[0, 1].map((n) => (
                    <div key={n} className="p-5 space-y-3 opacity-30 animate-pulse">
                      <div className="flex items-center justify-between">
                        <div className="h-4 bg-white/10 w-48"></div>
                        <div className="h-3 bg-white/10 w-24"></div>
                      </div>
                      <div className="h-3 bg-white/10 w-64"></div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                        <div className="h-6 bg-white/5"></div>
                        <div className="h-6 bg-white/5"></div>
                        <div className="h-6 bg-white/5"></div>
                        <div className="h-6 bg-white/5"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : leads.length === 0 ? (
                /* Composed Sovereign Empty Frame */
                <div className="border border-[rgba(253,252,251,0.12)] bg-[#11111a] p-12 text-center space-y-3">
                  <div className="w-10 h-10 border border-[#5a1f2e]/60 bg-[#5a1f2e]/20 text-[#f2a007] flex items-center justify-center mx-auto">
                    <Inbox size={20} strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold text-[#fdfcfb]">No leads captured yet.</p>
                  <p className="t-meta text-[10px] text-[#fdfcfb]/40 tracking-wider">
                    AWAITING_INGESTION_QUEUE
                  </p>
                </div>
              ) : (
                /* Ledger Rows */
                <ul className="divide-y divide-[rgba(253,252,251,0.08)] border border-[rgba(253,252,251,0.12)]">
                  {leads.map((lead, i) => (
                    <motion.li
                      key={lead.id}
                      initial={shouldReduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.2,
                        delay: shouldReduceMotion ? 0 : Math.min(i * 0.03, 0.3),
                      }}
                      className="bg-[#11111a] hover:bg-[#13131e] transition-colors p-5 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-[rgba(253,252,251,0.06)]">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
                          <samp
                            className="t-data text-xs text-[#f2a007] font-mono px-2 py-0.5 bg-[#0b0b10] border border-[#f2a007]/30 select-all font-semibold"
                            dir="ltr"
                          >
                            {lead.id}
                          </samp>
                          <span
                            className="t-meta text-[10px] border border-[rgba(253,252,251,0.15)] bg-[#0b0b10] px-2 py-0.5 text-[#fdfcfb]/70 tracking-wider"
                            dir="ltr"
                          >
                            {lead.type}
                          </span>
                          <span
                            className="t-meta text-[10px] border border-[rgba(253,252,251,0.12)] px-2 py-0.5 text-[#fdfcfb]/50 tracking-wider"
                            dir="ltr"
                          >
                            {lead.stage ?? "new"} · {lead.priority ?? "normal"}
                          </span>
                          {lead.organization && (
                            <span className="text-sm font-semibold text-[#fdfcfb] truncate">
                              {lead.organization}
                            </span>
                          )}
                        </div>
                        <time
                          className="t-data text-[11px] text-[#fdfcfb]/45 tabular-nums"
                          dateTime={lead.timestamp}
                          dir="ltr"
                        >
                          {lead.timestamp.slice(0, 16).replace("T", " ")}
                        </time>
                      </div>

                      <div
                        className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#fdfcfb]/70"
                        dir="ltr"
                      >
                        <span className="font-mono text-[#fdfcfb]/90 select-all">{lead.email}</span>
                        {lead.name && <span className="text-[#fdfcfb]/70">· {lead.name}</span>}
                        {lead.sector && (
                          <span className="t-meta text-[10px] text-[#fdfcfb]/50">
                            SECTOR: <span className="text-[#fdfcfb]/80">{lead.sector}</span>
                          </span>
                        )}
                        {lead.region && (
                          <span className="t-meta text-[10px] text-[#fdfcfb]/50">
                            REGION: <span className="text-[#fdfcfb]/80">{lead.region}</span>
                          </span>
                        )}
                        {lead.ticket && (
                          <span className="t-meta text-[10px] text-[#f2a007]">
                            TICKET: <span className="text-[#fdfcfb] font-mono">{lead.ticket}</span>
                          </span>
                        )}
                      </div>

                      <dl
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(253,252,251,0.08)] border border-[rgba(253,252,251,0.08)] mt-3"
                        dir="ltr"
                      >
                        {[
                          ["ROLE", lead.role],
                          ["PARTY_TYPE", lead.partyType],
                          ["INTEREST", lead.interest],
                          ["TIMELINE", lead.timeline],
                          ["SECTORS", lead.sectors],
                          ["COUNTRIES", lead.countries],
                          ["CAPABILITIES", lead.capabilities],
                          ["CAPITAL_BAND", lead.capitalBand],
                          ["TARGET_PROJECT", lead.targetProject],
                          ["TARGET_COMPANY", lead.targetCompany],
                          ["PROJECT_NEED", lead.needId],
                          ["TARGET_SERVICE", lead.targetService],
                          ["CONSENT", lead.consent === true ? "GRANTED" : "NOT_CAPTURED"],
                        ]
                          .filter((entry): entry is [string, string] => Boolean(entry[1]))
                          .map(([label, value]) => (
                            <div key={label} className="bg-[#0e0e16] p-2.5 min-w-0">
                              <dt className="t-meta text-[9px] text-[#fdfcfb]/40 tracking-[0.08em]">
                                {label}
                              </dt>
                              <dd className="t-data text-xs text-[#fdfcfb]/85 mt-0.5 break-words font-mono select-all">
                                {value}
                              </dd>
                            </div>
                          ))}
                      </dl>

                      <LeadWorkflow key={`${lead.id}-${lead.revision ?? 0}`} lead={lead} token={token} locale={lang} onUpdated={() => { void load(); }} />

                      {lead.message && (
                        <div className="pt-2">
                          <div className="t-meta text-[9px] text-[#fdfcfb]/35 tracking-widest mb-1">
                            MESSAGE_PAYLOAD
                          </div>
                          <p className="text-xs text-[#fdfcfb]/70 font-mono leading-relaxed bg-[#0b0b10] border-s-2 border-[#5a1f2e] p-3 whitespace-pre-line select-all">
                            {lead.message}
                          </p>
                        </div>
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
  const { lang, isRTL } = useLanguageContext();
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
      <div
        className={`min-h-screen bg-[#0b0b10] text-[#fdfcfb] flex flex-col items-center justify-center p-6 ${
          isRTL ? "font-arabic" : "font-sans"
        }`}
      >
        <SEO
          title="Operations Console | AIABASD"
          description="Internal console."
          lang={lang}
          url="/admin"
        />
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
          className="w-full max-w-sm bg-[#11111a] border border-[rgba(253,252,251,0.15)] p-8 space-y-6"
        >
          <div className="w-12 h-12 bg-[#5a1f2e]/20 text-[#f2a007] border border-[#5a1f2e]/50 flex items-center justify-center mx-auto">
            <Lock size={20} strokeWidth={1.5} />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-lg font-bold tracking-tight text-[#fdfcfb] font-display">
              Operations Console
            </h1>
            <p className="t-meta text-[10px] text-[#fdfcfb]/40 tracking-wider">
              AUTHENTICATION_REQUIRED
            </p>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="admin-token"
              className="t-meta text-xs text-[#fdfcfb]/60 flex items-center gap-2"
            >
              <KeyRound size={12} strokeWidth={1.5} /> ADMIN_TOKEN
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
              className="w-full bg-[#0b0b10] border border-[rgba(253,252,251,0.15)] px-4 py-3 text-sm font-mono text-[#fdfcfb] placeholder:text-[#fdfcfb]/30 outline-none focus:border-[#f2a007] focus-visible:ring-1 focus-visible:ring-[#f2a007] transition-colors"
            />
            {error && (
              <p className="t-meta text-xs text-[#f2a007] border border-[#f2a007]/30 bg-[#f2a007]/10 p-2">
                Invalid token.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 active:scale-[0.99] text-[#fdfcfb] font-bold t-meta text-xs py-3.5 uppercase tracking-widest transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2"
          >
            UNLOCK
          </button>
        </form>
      </div>
    );
  }

  return (
    <AdminInner
      onLogout={() => {
        try {
          sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        } catch {
        }
        setToken(null);
        setError(false);
      }}
    />
  );
}
