/** SSR entry for the prerenderer. Uses DIRECT page imports (no React.lazy)
 *  and wouter's static ssrPath, so the static render is deterministic and
 *  never suspends. Provider stack mirrors App.tsx. Effect-free: the
 *  prerendered HTML carries the static COPY of the requested locale. */

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
import Projects from "../client/src/pages/Projects";
import ProjectDetail from "../client/src/pages/ProjectDetail";
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
import { PROJECTS, PROJECTS_UI, projectBySlug } from "../client/src/projects";

export const SITE_URL = "https://aiabasd.org";
export type PrerenderLocale = "en" | "ar" | "fr";

type Copy = (typeof COPY)["en"];

/** Per-route title/description for deterministic head injection. */
export function routeMeta(path: string, locale: PrerenderLocale): { title: string; description: string } {
  const t: Copy = COPY[locale];
  const clean = path.split("?")[0];
  const seg = clean.split("/").filter(Boolean);

  if (clean === "/") {
    return { title: `${t.metaTitle}`, description: t.hero.subtitle };
  }
  if (seg[0] === "programs" && seg[1]) {
    const p = t.programs.list.find((x) => x.slug === seg[1]);
    if (p) return { title: `${p.name} | AIABASD`, description: p.desc };
  }
  if (seg[0] === "projects") {
    const ui = PROJECTS_UI[locale];
    if (!seg[1]) return { title: ui.pageTitle, description: ui.headerNote };
    const p = projectBySlug(seg[1]);
    if (p) return { title: `${p.title[locale]} | AIABASD`, description: p.description[locale] };
  }
  if (seg[0] === "corridors" && seg[1]) {
    return { title: `${t.countries.title} | AIABASD`, description: t.countries.note };
  }
  if (seg[0] === "team" && seg[1]) {
    const m = t.team.list.find((x) => seg[1].includes(x.name.split(" ").pop()!.toLowerCase()));
    if (m) return { title: `${m.name} — ${m.title} | AIABASD`, description: m.bio };
  }
  if (seg[0] === "governance" && seg[1]) {
    const names: Record<string, string> = {
      "esia-esms": locale === "ar" ? "البيئية والاجتماعية" : locale === "fr" ? "EISE/SGES" : "ESIA/ESMS",
      "kyc-aml": "KYC/AML",
      "independent-oversight": locale === "ar" ? "الرقابة المستقلة" : locale === "fr" ? "Supervision indépendante" : "Independent Oversight",
      contracts: locale === "ar" ? "هندسة العقود" : locale === "fr" ? "Architecture contractuelle" : "Contract Architecture",
    };
    return { title: `${names[seg[1]] ?? "Governance"} | AIABASD`, description: t.governance.text };
  }
  const titles: Record<string, { title: string; description: string }> = {
    "/pipeline": { title: `${t.pipeline.title} | AIABASD`, description: t.pipeline.note },
    "/gallery": { title: `Gallery | AIABASD`, description: t.countries.note },
    "/hama-project": { title: `Hama Project | AIABASD`, description: t.hero.subtitle },
    "/visions": { title: `${t.visions.title} | AIABASD`, description: t.visions.heroNote },
    "/privacy": { title: `Privacy | AIABASD`, description: t.hero.subtitle },
    "/terms": { title: `Terms | AIABASD`, description: t.hero.subtitle },
    "/investor-portal": { title: `${t.investor.vaultTitle} | AIABASD`, description: t.investor.subtitle },
  };
  return titles[clean] ?? { title: `${t.metaTitle}`, description: t.hero.subtitle };
}

export function renderRoute(
  path: string,
  locale: PrerenderLocale = "en",
  basePath = ""
): { html: string; head: string } {
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
                    initialLocale: locale,
                    children: createElement(
                      TooltipProvider,
                      {
                        children: createElement(
                          Router,
                          {
                            base: basePath || undefined,
                            ssrPath: path,
                            children: createElement(
                              GlobalLayout,
                              null,
                              createElement(
                                Switch,
                                null,
                                createElement(Route, { path: "/", component: Home }),
                                createElement(Route, { path: "/programs/:slug", component: ProgramDetail }),
                                createElement(Route, { path: "/projects", component: Projects }),
                                createElement(Route, { path: "/projects/:slug", component: ProjectDetail }),
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
