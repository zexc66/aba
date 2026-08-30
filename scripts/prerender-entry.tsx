/** SSR entry for the prerenderer. Uses DIRECT page imports (no React.lazy)
 *  and wouter's static ssrPath, so the static render is deterministic and
 *  never suspends. Provider stack mirrors App.tsx. Effect-free: the
 *  prerendered HTML carries the static EN copy; AR/FR stay client-side. */

import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router, Route, Switch } from "wouter";
import { createElement } from "react";
import { MotionConfig } from "framer-motion";
import { TooltipProvider } from "../client/src/components/ui/tooltip";
import { ThemeProvider } from "../client/src/contexts/ThemeContext";
import { LanguageProvider } from "../client/src/contexts/LanguageContext";
import GlobalLayout from "../client/src/components/layout/GlobalLayout";
import Home from "../client/src/pages/Home";
import Pipeline from "../client/src/pages/Pipeline";
import Gallery from "../client/src/pages/Gallery";
import HamaProject from "../client/src/pages/HamaProject";
import Visions from "../client/src/pages/Visions";
import Privacy from "../client/src/pages/Privacy";
import Terms from "../client/src/pages/Terms";
import InvestorLogin from "../client/src/pages/InvestorLogin";
import ProgramDetail from "../client/src/pages/ProgramDetail";
import Corridor from "../client/src/pages/Corridor";
import TeamMember from "../client/src/pages/TeamMember";
import GovernanceArticle from "../client/src/pages/GovernanceArticle";
import { COPY } from "../client/src/data";

export const SITE_URL = "https://aiabasd.org";

/** Per-route title/description for deterministic head injection (EN). */
export function routeMeta(path: string): { title: string; description: string } {
  const en = COPY.en;
  const clean = path.split("?")[0];
  const seg = clean.split("/").filter(Boolean);

  if (clean === "/") {
    return { title: `${en.metaTitle}`, description: en.hero.subtitle };
  }
  if (seg[0] === "programs" && seg[1]) {
    const p = en.programs.list.find((x) => x.slug === seg[1]);
    if (p) return { title: `${p.name} | AIABASD`, description: p.desc };
  }
  if (seg[0] === "corridors" && seg[1]) {
    return { title: `${en.countries.title} | AIABASD`, description: en.countries.note };
  }
  if (seg[0] === "team" && seg[1]) {
    const m = en.team.list.find((x) => seg[1].includes(x.name.split(" ").pop()!.toLowerCase()));
    if (m) return { title: `${m.name} — ${m.title} | AIABASD`, description: m.bio };
  }
  if (seg[0] === "governance" && seg[1]) {
    const names: Record<string, string> = {
      "esia-esms": "ESIA/ESMS",
      "kyc-aml": "KYC/AML",
      "independent-oversight": "Independent Oversight",
      contracts: "Contract Architecture",
    };
    return { title: `${names[seg[1]] ?? "Governance"} | AIABASD`, description: en.governance.text };
  }
  const titles: Record<string, { title: string; description: string }> = {
    "/pipeline": { title: `${en.pipeline.title} | AIABASD`, description: en.pipeline.note },
    "/gallery": { title: `Gallery | AIABASD`, description: en.countries.note },
    "/hama-project": { title: `Hama Project | AIABASD`, description: en.hero.subtitle },
    "/visions": { title: `${en.visions.title} | AIABASD`, description: en.visions.heroNote },
    "/privacy": { title: `Privacy | AIABASD`, description: en.hero.subtitle },
    "/terms": { title: `Terms | AIABASD`, description: en.hero.subtitle },
    "/investor-portal": { title: `${en.investor.vaultTitle} | AIABASD`, description: en.investor.subtitle },
  };
  return titles[clean] ?? { title: `${en.metaTitle}`, description: en.hero.subtitle };
}

export function renderRoute(path: string): { html: string; head: string } {
  const helmetContext: Record<string, unknown> = {};

  const html = renderToString(
    createElement(
      HelmetProvider,
      {
        context: helmetContext,
        children: createElement(
          MotionConfig,
          {
            reducedMotion: "user",
            children: createElement(
              ThemeProvider,
              {
                defaultTheme: "light",
                children: createElement(
                  LanguageProvider,
                  {
                    children: createElement(
                      TooltipProvider,
                      {
                        children: createElement(
                          Router,
                          {
                            ssrPath: path,
                            children: createElement(
                              GlobalLayout,
                              null,
                              createElement(
                                Switch,
                                null,
                                createElement(Route, { path: "/", component: Home }),
                                createElement(Route, { path: "/programs/:slug", component: ProgramDetail }),
                                createElement(Route, { path: "/corridors/:iso", component: Corridor }),
                                createElement(Route, { path: "/team/:slug", component: TeamMember }),
                                createElement(Route, { path: "/governance/:slug", component: GovernanceArticle }),
                                createElement(Route, { path: "/pipeline", component: Pipeline }),
                                createElement(Route, { path: "/gallery", component: Gallery }),
                                createElement(Route, { path: "/hama-project", component: HamaProject }),
                                createElement(Route, { path: "/visions", component: Visions }),
                                createElement(Route, { path: "/privacy", component: Privacy }),
                                createElement(Route, { path: "/terms", component: Terms }),
                                createElement(Route, { path: "/investor-portal", component: InvestorLogin })
                              )
                            ),
                          }
                        ),
                      }
                    ),
                  }
                ),
              }
            ),
          }
        ),
      }
    )
  );

  return { html, head: "" };
}
