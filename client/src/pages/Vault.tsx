import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { FileText, Download, LogOut, ShieldCheck, ArrowLeft, AlertCircle, FolderLock } from "lucide-react";
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

  const [token, setToken] = useState<string | null>(null);
  const [documents, setDocuments] = useState<VaultDocument[] | null>(null);
  const [failed, setFailed] = useState(false);

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

  const loadDocuments = useCallback(async (authToken: string) => {
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
    } catch {
      setFailed(true);
    }
  }, [setLocation]);

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

  return (
    <div
      className={`min-h-screen bg-[#0b0b10] text-[#fdfcfb] flex flex-col p-6 md:p-12 relative ${isRTL ? "font-arabic" : "font-sans"}`}
    >
      <SEO
        title={`${t.title} | AIABASD`}
        description={t.subtitle}
        lang={lang}
        url="/investor-portal/vault"
      />

      <header className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 py-4">
         <Link href={localizedLinkPath("/investor-portal", lang)}>
          <div className="flex items-center gap-3 text-sm font-semibold text-white/70 hover:text-white transition-colors cursor-pointer">
            <ArrowLeft size={18} className={`${isRTL ? "rotate-180" : ""} rtl:-scale-x-100`} />
            <span>{t.backLabel}</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f2a007]">
            <ShieldCheck size={16} />
            <span>{content.investor.secureLabel}</span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white border border-white/15 hover:border-white/40 rounded-lg px-3 py-2 transition-colors cursor-pointer"
          >
            <LogOut size={14} className={isRTL ? "rotate-180" : ""} />
            <span>{t.logout}</span>
          </button>
        </div>
      </header>

      <div className="w-full max-w-4xl mx-auto my-auto z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#5a1f2e]/20 text-[#f2a007] border border-[#5a1f2e]/40 flex items-center justify-center">
              <FolderLock size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-sm text-white/60">{t.subtitle}</p>
          </div>

          {failed ? (
            <div
              role="alert"
              className="flex items-start gap-2.5 text-sm text-red-300 bg-red-950/40 border border-red-900/50 rounded-lg px-4 py-3"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{t.fetchFailed}</span>
            </div>
          ) : documents === null ? (
            <div className="border border-white/10 rounded-lg p-10 text-center t-meta text-white/40">
              ···
            </div>
          ) : documents.length === 0 ? (
            <div className="border border-white/10 bg-[#11111a] rounded-lg p-10 text-center space-y-3">
              <p className="text-sm font-semibold text-white/80">{t.empty}</p>
              <p className="text-xs text-white/50 leading-relaxed max-w-md mx-auto">
                {t.emptyNote}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="t-meta text-white/40 border-b-2 border-white/20 pb-3">
                {t.docLabel} · {String(documents.length).padStart(2, "0")}
              </div>
              <ul className="divide-y divide-white/10 border border-white/10 rounded-lg overflow-hidden">
                {documents.map((doc, i) => (
                  <motion.li
                    key={doc.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                  >
                    <div className="flex items-center justify-between gap-4 bg-[#11111a] px-5 py-4 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4 min-w-0">
                        <FileText size={18} className="text-[#f2a007] shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate" dir="ltr">
                            {doc.name}
                          </p>
                          <p className="t-data text-[11px] text-white/40 mt-0.5" dir="ltr">
                            {formatSize(doc.size)} · {doc.modified.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => token && void downloadDocument(doc.name, token).catch(() => setFailed(true))}
                        aria-label={`Download ${doc.name}`}
                        className="flex items-center gap-2 text-xs font-semibold text-[#f2a007] hover:text-white bg-[#5a1f2e]/30 hover:bg-[#5a1f2e] border border-[#5a1f2e]/50 rounded-lg px-3 py-2 transition-colors cursor-pointer shrink-0"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 border-t border-white/10 space-y-2">
            <p className="text-xs text-white/50 leading-relaxed">{t.sessionNote}</p>
            <p className="text-xs text-white/50 leading-relaxed">{t.restrictedNote}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
