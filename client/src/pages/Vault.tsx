import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  Download,
  LogOut,
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
  FolderLock,
  RefreshCw,
} from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath } from "@/localePath";

const VAULT_TOKEN_KEY = "aiabasd-vault-token";

interface VaultDocument {
  name: string;
  size: number;
  modified: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function downloadDocument(name: string, token: string): Promise<void> {
  const response = await fetch(`/api/vault/documents/${encodeURIComponent(name)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("download failed");
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Vault() {
  const [, setLocation] = useLocation();
  const { lang, content, isRTL } = useLanguageContext();
  const t = content.vault;
  const shouldReduceMotion = useReducedMotion();

  const [token, setToken] = useState<string | null>(null);
  const [documents, setDocuments] = useState<VaultDocument[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = sessionStorage.getItem(VAULT_TOKEN_KEY);
    } catch {
      stored = null;
    }
    if (!stored) {
      setLocation("/investor-portal", { replace: true });
      return;
    }
    setToken(stored);
  }, [setLocation]);

  const loadDocuments = useCallback(
    async (authToken: string) => {
      try {
        const response = await fetch("/api/vault/documents", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (response.status === 401) {
          try {
            sessionStorage.removeItem(VAULT_TOKEN_KEY);
          } catch {
          }
          setLocation("/investor-portal", { replace: true });
          return;
        }
        if (!response.ok) {
          setFailed(true);
          return;
        }
        const body = (await response.json()) as { documents?: VaultDocument[] };
        setDocuments(Array.isArray(body.documents) ? body.documents : []);
        setFailed(false);
      } catch {
        setFailed(true);
      }
    },
    [setLocation]
  );

  useEffect(() => {
    if (token) void loadDocuments(token);
  }, [token, loadDocuments]);

  const logout = () => {
    try {
      sessionStorage.removeItem(VAULT_TOKEN_KEY);
    } catch {
    }
    setLocation("/investor-portal", { replace: true });
  };

  const handleDownload = async (docName: string) => {
    if (!token || downloading) return;
    setDownloading(docName);
    try {
      await downloadDocument(docName, token);
    } catch {
      setFailed(true);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#0b0b10] text-[#fdfcfb] flex flex-col justify-between p-4 sm:p-6 md:p-12 relative ${
        isRTL ? "font-arabic" : "font-sans"
      }`}
    >
      <SEO
        title={`${t.title} | AIABASD`}
        description={t.subtitle}
        lang={lang}
        url="/investor-portal/vault"
      />

      {/* Sovereign Terminal Header */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between z-10 py-4 border-b border-[rgba(253,252,251,0.12)]">
        <Link href={localizedLinkPath("/investor-portal", lang)} asChild>
          <a className="inline-flex items-center gap-2.5 t-meta text-xs font-semibold text-[#fdfcfb]/70 hover:text-[#f2a007] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2">
            <ArrowLeft
              size={15}
              strokeWidth={1.5}
              className="rtl:-scale-x-100 shrink-0"
              aria-hidden="true"
            />
            <span>{t.backLabel}</span>
          </a>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 t-meta text-xs font-semibold text-[#f2a007] border border-[#f2a007]/30 bg-[#f2a007]/10 px-3 py-1.5">
            <ShieldCheck size={15} strokeWidth={1.5} aria-hidden="true" />
            <span>{content.investor.secureLabel}</span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 t-meta text-xs font-semibold text-[#fdfcfb]/70 hover:text-[#fdfcfb] border border-[#5a1f2e]/60 hover:border-[#5a1f2e] bg-[#5a1f2e]/15 hover:bg-[#5a1f2e] px-3.5 py-1.5 transition-[background-color,border-color,color,transform] cursor-pointer active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-1"
          >
            <LogOut
              size={13}
              strokeWidth={1.5}
              className={isRTL ? "rotate-180" : ""}
              aria-hidden="true"
            />
            <span>{t.logout}</span>
          </button>
        </div>
      </header>

      {/* Main Terminal Vault Work Area */}
      <main className="w-full max-w-5xl mx-auto my-auto z-10 py-8 md:py-12 space-y-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
          className="space-y-8"
        >
          {/* Institutional Eyebrow & Macro-Type */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-[#5a1f2e]/25 text-[#f2a007] border border-[#5a1f2e]/60 flex items-center justify-center shrink-0">
                <FolderLock size={22} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div>
                <div className="t-meta text-[10px] tracking-[0.15em] text-[#f2a007] font-mono">
                  {t.eyebrow}
                </div>
                <div className="t-meta text-[9px] text-[#fdfcfb]/40 tracking-wider">
                  SEC_LEVEL: CLASS_A · DIRECTORIAL_ACCESS
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#fdfcfb] tracking-tight font-display">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-[#fdfcfb]/65 leading-relaxed max-w-2xl">
              {t.subtitle}
            </p>
          </div>

          {/* Alert State */}
          {failed ? (
            <div
              role="alert"
              className="border border-[#5a1f2e] bg-[#11111a] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <AlertCircle size={18} strokeWidth={1.5} className="text-[#f2a007] shrink-0" />
                <span className="text-sm font-medium text-[#fdfcfb]">{t.fetchFailed}</span>
              </div>
              <button
                type="button"
                onClick={() => token && void loadDocuments(token)}
                aria-label={t.fetchFailed}
                className="p-2 border border-[#f2a007]/50 bg-[#f2a007]/10 hover:bg-[#f2a007] hover:text-[#0b0b10] text-[#f2a007] transition-colors cursor-pointer active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-1"
              >
                <RefreshCw size={14} strokeWidth={1.5} />
              </button>
            </div>
          ) : documents === null ? (
            /* Composed Telemetry Loading Ledger Skeleton */
            <div className="space-y-3">
              <div className="t-meta text-xs text-[#fdfcfb]/40 border-b border-[rgba(253,252,251,0.15)] pb-3 flex items-center justify-between">
                <span>{t.docLabel}</span>
                <span className="text-[#f2a007] animate-pulse">INDEXING_VAULT_STREAM...</span>
              </div>
              <div className="border border-[rgba(253,252,251,0.12)] bg-[#11111a] divide-y divide-[rgba(253,252,251,0.08)]">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="p-4 flex items-center justify-between gap-4 animate-pulse opacity-35"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-white/10 shrink-0"></div>
                      <div className="space-y-1.5">
                        <div className="h-4 bg-white/10 w-48 sm:w-72"></div>
                        <div className="h-3 bg-white/10 w-28"></div>
                      </div>
                    </div>
                    <div className="w-10 h-8 bg-white/10 shrink-0"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : documents.length === 0 ? (
            /* Composed Sovereign Empty State */
            <div className="border border-[rgba(253,252,251,0.12)] bg-[#11111a] p-10 sm:p-14 text-center space-y-3">
              <div className="w-10 h-10 border border-[#5a1f2e]/60 bg-[#5a1f2e]/20 text-[#f2a007] flex items-center justify-center mx-auto">
                <FolderLock size={20} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-[#fdfcfb]">{t.empty}</p>
              <p className="text-xs text-[#fdfcfb]/50 leading-relaxed max-w-md mx-auto">
                {t.emptyNote}
              </p>
              <div className="pt-2">
                <span className="t-meta text-[9px] text-[#f2a007] border border-[#f2a007]/30 bg-[#f2a007]/10 px-2.5 py-1 tracking-widest">
                  [ STATUS: ZERO_ARTIFACTS_RELEASED ]
                </span>
              </div>
            </div>
          ) : (
            /* Telemetry Document Ledger */
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[rgba(253,252,251,0.15)] pb-3">
                <span className="t-meta text-xs text-[#fdfcfb]/50 tracking-[0.1em]">
                  {t.docLabel}
                </span>
                <span className="t-data text-xs text-[#f2a007] tabular-nums font-mono" dir="ltr">
                  [{String(documents.length).padStart(2, "0")}]
                </span>
              </div>

              {/* Desktop Ledger Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-2.5 bg-[#0e0e16] border border-[rgba(253,252,251,0.12)] t-meta text-[10px] text-[#fdfcfb]/45 tracking-wider">
                <div className="col-span-6">DOCUMENT_IDENTIFIER</div>
                <div className="col-span-2 text-start">SIZE</div>
                <div className="col-span-2 text-start">RELEASED</div>
                <div className="col-span-2 text-end">ACTION</div>
              </div>

              {/* 1px Hairline Ledger Body */}
              <ul className="divide-y divide-[rgba(253,252,251,0.08)] border border-[rgba(253,252,251,0.12)]">
                {documents.map((doc, i) => (
                  <motion.li
                    key={doc.name}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.2,
                      delay: shouldReduceMotion ? 0 : Math.min(i * 0.04, 0.25),
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center bg-[#11111a] hover:bg-[#13131e] px-5 py-4 transition-colors">
                      <div className="md:col-span-6 flex items-center gap-3.5 min-w-0">
                        <div className="w-8 h-8 bg-[#5a1f2e]/20 border border-[#5a1f2e]/50 flex items-center justify-center shrink-0">
                          <FileText size={16} strokeWidth={1.5} className="text-[#f2a007]" />
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-sm font-semibold text-[#fdfcfb] truncate select-all font-mono"
                            dir="ltr"
                          >
                            {doc.name}
                          </p>
                          <p className="md:hidden t-data text-[11px] text-[#fdfcfb]/45 mt-0.5" dir="ltr">
                            {formatSize(doc.size)} · {doc.modified.slice(0, 10)}
                          </p>
                        </div>
                      </div>

                      <div className="hidden md:block md:col-span-2">
                        <data
                          value={doc.size}
                          className="t-data text-xs text-[#fdfcfb]/70 tabular-nums font-mono"
                          dir="ltr"
                        >
                          {formatSize(doc.size)}
                        </data>
                      </div>

                      <div className="hidden md:block md:col-span-2">
                        <time
                          dateTime={doc.modified}
                          className="t-data text-xs text-[#fdfcfb]/50 tabular-nums font-mono"
                          dir="ltr"
                        >
                          {doc.modified.slice(0, 10)}
                        </time>
                      </div>

                      <div className="md:col-span-2 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => void handleDownload(doc.name)}
                          disabled={downloading === doc.name}
                          aria-label={`Download ${doc.name}`}
                          className="flex items-center justify-center text-xs font-semibold text-[#f2a007] hover:text-[#0b0b10] bg-[#5a1f2e]/25 hover:bg-[#f2a007] border border-[#5a1f2e]/60 hover:border-[#f2a007] p-2.5 transition-[background-color,border-color,color,transform] cursor-pointer active:scale-[0.95] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-1 shrink-0 disabled:opacity-50"
                        >
                          {downloading === doc.name ? (
                            <RefreshCw size={14} strokeWidth={1.5} className="animate-spin" />
                          ) : (
                            <Download size={14} strokeWidth={1.5} />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Institutional Compliance Notice */}
          <div className="pt-6 border-t border-[rgba(253,252,251,0.12)] space-y-2">
            <div className="t-meta text-[9px] text-[#fdfcfb]/40 tracking-[0.1em]">
              SOVEREIGN CONFIDENTIALITY PROTOCOL
            </div>
            <p className="text-xs text-[#fdfcfb]/50 leading-relaxed max-w-3xl">
              {t.sessionNote}
            </p>
            <p className="text-xs text-[#fdfcfb]/50 leading-relaxed max-w-3xl">
              {t.restrictedNote}
            </p>
          </div>
        </motion.div>
      </main>

      {/* Sovereign Bottom Status Rule */}
      <footer className="w-full max-w-5xl mx-auto z-10 pt-4 pb-2 border-t border-[rgba(253,252,251,0.08)] flex items-center justify-between text-[#fdfcfb]/35 t-meta text-[9px]">
        <span>AIABASD · SECURE VAULT</span>
        <span dir="ltr">TLS_v1.3 · DIRECTORIAL HUD</span>
      </footer>
    </div>
  );
}
