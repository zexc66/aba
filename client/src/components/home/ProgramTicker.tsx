import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import { localizedLinkPath } from "@/localePath";
import type { Content } from "@/data";
import { COPY } from "@/data";
import { programStatusTone } from "@/lib/utils";

const STATUS_DOT: Record<string, string> = {
  active: "bg-[#5a1f2e] motion-reduce:animate-none motion-safe:animate-pulse",
  dev: "bg-[#f2a007]",
  pipeline: "bg-[#0b0b10]/40",
};

function ProgramTickerComponent({ programs, lang }: { programs: Content["programs"]["list"]; lang: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="region"
      aria-label={COPY[lang as "en" | "ar" | "fr"].programs.sectionEyebrow}
      className="border-b border-[#0b0b10]/10 bg-[#0b0b10] text-[#fdfcfb]"
    >
      <div className="mx-auto flex max-w-[1500px] items-center gap-4 overflow-x-auto px-6 md:px-12 lg:px-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="t-meta shrink-0 py-3.5 text-[10px] text-[#f2a007]" aria-hidden="true">
          LIVE_STATUS
        </span>
        <ul className="flex items-center gap-1.5 py-2.5">
          {programs.map((program, i) => {
            const tone = programStatusTone(program.status);
            return (
              <li key={program.slug}>
                <motion.div
                  initial={false}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : i * 0.05 }}
                >
                  <Link asChild href={localizedLinkPath(`/programs/${program.slug}`, lang)}>
                    <a
                      className="inline-flex min-h-[44px] items-center gap-2 border border-white/15 px-3 py-2 text-xs font-semibold transition-colors hover:border-[#f2a007]/60 hover:text-[#f2a007] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2a007]"
                      title={program.status}
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 ${STATUS_DOT[tone]}`} aria-hidden="true" />
                      <span className="whitespace-nowrap">{program.name.split("—")[0].trim()}</span>
                    </a>
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const ProgramTicker = memo(ProgramTickerComponent);
export default ProgramTicker;
