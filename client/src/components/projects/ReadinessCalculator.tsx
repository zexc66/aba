import { useState, useMemo } from "react";
import { Check, RotateCcw, ShieldAlert, SlidersHorizontal } from "lucide-react";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS_UI, type Locale3 } from "@/projects";
import { projectReadiness, type ReadinessFactorKey } from "@/readiness";

interface ReadinessCalculatorProps {
  locale: Locale3;
}

const FACTOR_ORDER: ReadinessFactorKey[] = [
  "status",
  "location",
  "scale",
  "model",
  "objectives",
  "partnership",
];

export default function ReadinessCalculator({ locale }: ReadinessCalculatorProps) {
  const t = PROJECTS_UI[locale];

  const [factors, setFactors] = useState<Record<ReadinessFactorKey, boolean>>({
    status: true,
    location: true,
    scale: true,
    model: true,
    objectives: true,
    partnership: true,
  });

  const dummyL = { en: "sample", ar: "sample", fr: "sample" };

  const simulatedProject = useMemo(
    () => ({
      slug: "calculator-simulation",
      type: "project" as const,
      country: "sd" as const,
      sector: "infrastructure" as const,
      title: dummyL,
      description: dummyL,
      status: (factors.status ? "under-development" : "") as "under-development" | "",
      location: factors.location ? dummyL : undefined,
      scale: factors.scale ? dummyL : undefined,
      model: factors.model ? dummyL : undefined,
      objectives: factors.objectives ? [dummyL, dummyL, dummyL, dummyL] : [],
      partnership: factors.partnership ? [dummyL, dummyL, dummyL, dummyL] : [],
    }),
    [factors]
  );

  const readiness = useMemo(() => projectReadiness(simulatedProject), [simulatedProject]);

  const toggleFactor = (key: ReadinessFactorKey) => {
    setFactors((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => {
    setFactors({
      status: true,
      location: true,
      scale: true,
      model: true,
      objectives: true,
      partnership: true,
    });
  };

  const factorLabels: Record<ReadinessFactorKey, string> = {
    status: t.statusLabel,
    location: t.locationLabel,
    scale: t.scaleLabel,
    model: t.modelLabel,
    objectives: t.objectivesLabel,
    partnership: t.partnershipLabel,
  };

  const factorDescriptions: Record<ReadinessFactorKey, string> = {
    status: t.readinessFactorStatusDesc,
    location: t.readinessFactorLocationDesc,
    scale: t.readinessFactorScaleDesc,
    model: t.readinessFactorModelDesc,
    objectives: t.readinessFactorObjectivesDesc,
    partnership: t.readinessFactorPartnershipDesc,
  };

  return (
    <Section className="py-16 border-b border-[#0b0b10]/10 bg-white">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
        <SectionHeader
          index="R"
          title={t.readinessCalculatorTitle}
          note={t.readinessCalculatorNote}
          meta="READINESS_METHODOLOGY"
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left / Primary: Factor toggles */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#0b0b10]/10">
              <div className="flex items-center gap-2 text-[#5a1f2e]">
                <SlidersHorizontal size={14} aria-hidden="true" />
                <span className="t-meta text-[10px]">{t.readinessLabel}</span>
              </div>
              <span className="t-meta text-[10px] text-[#0b0b10]/60">
                <bdi dir="ltr">{FACTOR_ORDER.filter((k) => factors[k]).length}/{FACTOR_ORDER.length}</bdi>{" "}
                {t.readinessActiveLabel}
              </span>
            </div>

            <div className="space-y-2.5">
              {readiness.factors.map((factor) => {
                const key = factor.key;
                const isEnabled = factors[key];
                return (
                  <button
                    key={key}
                    type="button"
                    role="checkbox"
                    aria-checked={isEnabled}
                    onClick={() => toggleFactor(key)}
                    className={`w-full text-start p-4 border transition-[border-color,background-color] duration-200 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 min-h-11 flex items-start gap-3.5 group cursor-pointer ${
                      isEnabled
                        ? "border-[#0b0b10]/15 bg-[#fdfcfb] hover:border-[#5a1f2e]/40"
                        : "border-black/5 bg-black/[0.02] hover:border-black/15 opacity-70"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 shrink-0 border mt-0.5 flex items-center justify-center transition-colors duration-200 ${
                        isEnabled
                          ? "bg-[#5a1f2e] border-[#5a1f2e] text-[#fdfcfb]"
                          : "border-[#0b0b10]/20 bg-white"
                      }`}
                      aria-hidden="true"
                    >
                      {isEnabled && <Check size={13} strokeWidth={2.5} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="t-meta text-xs text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors font-medium">
                          {factorLabels[key]}
                        </span>
                        <span
                          className={`t-data tabular-nums text-xs ${
                            isEnabled ? "text-[#5a1f2e] font-semibold" : "text-[#0b0b10]/40 line-through"
                          }`}
                          dir="ltr"
                        >
                          <bdi>{factor.points}/{factor.max} pts</bdi>
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#0b0b10]/70 leading-relaxed break-words">
                        {factorDescriptions[key]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right / Secondary: Live score readout & honest expectation */}
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="border border-[#0b0b10]/10 bg-white p-6 md:p-7 shadow-premium space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="t-meta text-[10px] text-[#0b0b10]/60">
                    {t.readinessProfileLabel}
                  </span>
                  <div
                    className="text-4xl md:text-5xl font-bold text-[#5a1f2e] t-data tabular-nums mt-1.5"
                    dir="ltr"
                  >
                    <bdi>{readiness.score}%</bdi>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetAll}
                  disabled={readiness.score === 100}
                  className="inline-flex min-h-11 items-center gap-1.5 t-meta text-[10px] text-[#5a1f2e] border-b border-[#5a1f2e]/30 hover:border-[#5a1f2e] disabled:opacity-35 disabled:cursor-not-allowed pb-0.5 transition-[color,border-color,opacity] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2"
                >
                  <RotateCcw size={12} aria-hidden="true" />
                  <span>{t.readinessResetLabel}</span>
                </button>
              </div>

              {/* Determinate progress meter */}
              <div
                className="h-2 bg-[#0b0b10]/[0.06] w-full"
                role="progressbar"
                aria-valuenow={readiness.score}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t.readinessProfileLabel}
              >
                <div
                  className="h-full bg-[#f2a007] transition-[width] duration-300 motion-reduce:transition-none"
                  style={{ width: `${readiness.score}%` }}
                />
              </div>

              {/* Per-factor points breakdown */}
              <div className="pt-4 border-t border-[#0b0b10]/10">
                <div className="t-meta text-[10px] text-[#0b0b10]/60 uppercase tracking-wider mb-3">
                  {t.readinessLabel}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {readiness.factors.map((f) => (
                    <div
                      key={f.key}
                      className="flex items-center justify-between text-xs py-1 border-b border-[#0b0b10]/5"
                    >
                      <span className="t-meta text-[10px] text-[#0b0b10]/70 truncate pe-2">
                        {factorLabels[f.key]}
                      </span>
                      <span
                        className={`t-data tabular-nums text-xs ${
                          f.points > 0 ? "text-[#0b0b10] font-semibold" : "text-[#0b0b10]/35"
                        }`}
                        dir="ltr"
                      >
                        <bdi>{f.points}/{f.max}</bdi>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honest caption (Anti-fabrication Prime Directive) */}
              <div
                role="note"
                className="border border-[#0b0b10]/10 bg-[#fdfcfb] p-4 flex items-start gap-3"
              >
                <ShieldAlert
                  size={16}
                  className="text-[#5a1f2e] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-xs text-[#0b0b10]/75 leading-relaxed">
                  {t.readinessCalculatorCaption}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
