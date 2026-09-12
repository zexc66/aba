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
import { PlatformAuthProvider } from "../client/src/contexts/PlatformAuthContext";
import { WatchlistProvider } from "../client/src/contexts/WatchlistContext";
import GlobalLayout from "../client/src/components/layout/GlobalLayout";
import Home from "../client/src/pages/Home";
import Pipeline from "../client/src/pages/Pipeline";
import Projects from "../client/src/pages/Projects";
import SubmitProject from "../client/src/pages/SubmitProject";
import OpportunityMap from "../client/src/pages/OpportunityMap";
import ProjectDetail from "../client/src/pages/ProjectDetail";
import SectorPage from "../client/src/pages/SectorPage";
import Impact from "../client/src/pages/Impact";
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
import Services from "../client/src/pages/Services";
import Governments from "../client/src/pages/Governments";
import Intelligence from "../client/src/pages/Intelligence";
import Match from "../client/src/pages/Match";
import Companies from "../client/src/pages/Companies";
import CompanyDetail from "../client/src/pages/CompanyDetail";
import Introductions from "../client/src/pages/Introductions";
import Preparation from "../client/src/pages/Preparation";
import Knowledge, { KNOWLEDGE_COPY } from "../client/src/pages/Knowledge";
import Access from "../client/src/pages/Access";
import Rooms from "../client/src/pages/Rooms";
import AcceptInvite from "../client/src/pages/AcceptInvite";
import { ROOMS_COPY } from "../client/src/roomsCopy";
import { PREPARATION_COPY } from "../client/src/preparation";
import { companyBySlug } from "../client/src/companies";
import { NETWORK_COPY } from "../client/src/networkCopy";
import NotFound from "../client/src/pages/NotFound";
import Admin from "../client/src/pages/Admin";
import Vault from "../client/src/pages/Vault";
import { COPY } from "../client/src/data";
import { PROJECTS, PROJECTS_UI, SECTORS, projectBySlug } from "../client/src/projects";
import { PLATFORM_COPY } from "../client/src/platform";
import { LOCALIZED_COPY } from "../client/src/localizedCopy";
import { SUBMISSION_COPY } from "../client/src/submissionCopy";
import { MAP_COPY } from "../client/src/mapCopy";

export const SITE_URL = "https://aiabasd.org";
export type PrerenderLocale = "en" | "ar" | "fr";

type Copy = (typeof COPY)["en"];

/** Per-route title/description for deterministic head injection. */
export function routeMeta(path: string, locale: PrerenderLocale): { title: string; description: string } {
  const t: Copy = COPY[locale];
  const clean = path.split("?")[0];
  const seg = clean.split("/").filter(Boolean);
  if (clean === "/preparation") return { title: `${PREPARATION_COPY[locale].title} | AIABASD`, description: PREPARATION_COPY[locale].intro };
  if (clean === "/knowledge") return { title: `${KNOWLEDGE_COPY[locale].title} | AIABASD`, description: KNOWLEDGE_COPY[locale].intro };
  if (clean === "/access") return { title: `${ROOMS_COPY[locale].accessTitle} | AIABASD`, description: ROOMS_COPY[locale].accessIntro };
  if (clean === "/rooms") return { title: `${ROOMS_COPY[locale].roomsTitle} | AIABASD`, description: ROOMS_COPY[locale].roomsIntro };
  if (clean === "/accept-invite") return { title: `${ROOMS_COPY[locale].inviteTitle} | AIABASD`, description: ROOMS_COPY[locale].inviteIntro };
  if (clean === "/companies") return { title: `${NETWORK_COPY[locale].directory} | AIABASD`, description: NETWORK_COPY[locale].intro };
  if (seg[0] === "companies" && seg[1]) {
    const company = companyBySlug(seg[1]);
    if (company) return { title: `${company.name} | AIABASD`, description: company.overview?.[locale] ?? NETWORK_COPY[locale].listingNote };
  }
  if (clean === "/introductions") return { title: `${NETWORK_COPY[locale].request} | AIABASD`, description: NETWORK_COPY[locale].requestIntro };

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
  if (clean === "/submit-project") return { title: `${SUBMISSION_COPY[locale].title} | AIABASD`, description: SUBMISSION_COPY[locale].intro };
  if (clean === "/opportunity-map") return { title: `${MAP_COPY[locale].title} | AIABASD`, description: MAP_COPY[locale].intro };
  if (seg[0] === "sectors" && seg[1]) {
    const sectorName = SECTORS[seg[1] as keyof typeof SECTORS];
    if (sectorName) return { title: `${sectorName[locale]} | AIABASD`, description: PROJECTS_UI[locale].headerNote };
  }
  if (seg[0] === "impact") {
    const ui = {
      en: { title: "Measurement Framework", desc: "Published indicators reference the indicative scope of portfolio projects. Measured output is added only after independent verification." },
      ar: { title: "إطار القياس", desc: "تشير المؤشرات المنشورة إلى النطاق الاسترشادي لمشاريع المحفظة. وتُضاف المخرجات المقاسة فقط بعد التحقق المستقل." },
      fr: { title: "Cadre de mesure", desc: "Les indicateurs publiés renvoient au périmètre indicatif des projets du portefeuille. Les résultats mesurés sont ajoutés uniquement après vérification indépendante." },
    };
    return { title: `${ui[locale].title} | AIABASD`, description: ui[locale].desc };
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
  if (clean === "/services") return { title: `${PLATFORM_COPY[locale].services.title} | AIABASD`, description: PLATFORM_COPY[locale].services.intro };
  if (clean === "/governments") return { title: `${COPY[locale].governments.metaTitle} | AIABASD`, description: COPY[locale].governments.intro };
  if (clean === "/intelligence") return { title: `${PLATFORM_COPY[locale].intelligence.title} | AIABASD`, description: PLATFORM_COPY[locale].intelligence.intro };
  if (clean === "/match") return { title: `${PLATFORM_COPY[locale].match.title} | AIABASD`, description: PLATFORM_COPY[locale].match.intro };
  if (clean === "/privacy") return { title: `${LOCALIZED_COPY[locale].privacy.title} | AIABASD`, description: LOCALIZED_COPY[locale].privacy.description };
  if (clean === "/terms") return { title: `${LOCALIZED_COPY[locale].terms.title} | AIABASD`, description: LOCALIZED_COPY[locale].terms.description };
  if (clean === "/404") return { title: LOCALIZED_COPY[locale].notFound.seoTitle, description: LOCALIZED_COPY[locale].notFound.seoDescription };
  const titles: Record<string, { title: string; description: string }> = {
    "/pipeline": { title: `${t.pipeline.title} | AIABASD`, description: t.pipeline.note },
    "/gallery": { title: `Gallery | AIABASD`, description: t.countries.note },
    "/hama-project": { title: `Hama Project | AIABASD`, description: t.hero.subtitle },
    "/visions": { title: `${t.visions.title} | AIABASD`, description: t.visions.heroNote },
    "/privacy": { title: `${LOCALIZED_COPY[locale].privacy.title} | AIABASD`, description: LOCALIZED_COPY[locale].privacy.description },
    "/terms": { title: `${LOCALIZED_COPY[locale].terms.title} | AIABASD`, description: LOCALIZED_COPY[locale].terms.description },
    "/investor-portal": { title: `${t.investor.vaultTitle} | AIABASD`, description: t.investor.subtitle },
    "/investor-portal/vault": { title: `${t.vault.title} | AIABASD`, description: t.vault.subtitle },
    "/admin": { title: "Operations Console | AIABASD", description: "Internal lead and analytics console." },
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
                  PlatformAuthProvider,
                  null,
                  createElement(
                    LanguageProvider,
                    {
                      initialLocale: locale,
                      children: createElement(
                       WatchlistProvider,
                       {
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
                                createElement(Route, { path: "/submit-project", component: SubmitProject }),
                                createElement(Route, { path: "/opportunity-map", component: OpportunityMap }),
                                createElement(Route, { path: "/projects/:slug", component: ProjectDetail }),
                                createElement(Route, { path: "/sectors/:sector", component: SectorPage }),
                                createElement(Route, { path: "/impact", component: Impact }),
                                createElement(Route, { path: "/corridors/:iso", component: Corridor }),
                                createElement(Route, { path: "/team/:slug", component: TeamMember }),
                                createElement(Route, { path: "/governance/:slug", component: GovernanceArticle }),
                                createElement(Route, { path: "/pipeline", component: Pipeline }),
                                createElement(Route, { path: "/gallery", component: Gallery }),
                                createElement(Route, { path: "/hama-project", component: HamaProject }),
                                createElement(Route, { path: "/visions", component: Visions }),
                                createElement(Route, { path: "/privacy", component: Privacy }),
                                createElement(Route, { path: "/terms", component: Terms }),
                                  createElement(Route, { path: "/investor-portal", component: InvestorLogin }),
                                  createElement(Route, { path: "/investor-portal/vault", component: Vault }),
                                  createElement(Route, { path: "/admin", component: Admin }),
                                 createElement(Route, { path: "/services", component: Services }),
                                 createElement(Route, { path: "/governments", component: Governments }),
                                 createElement(Route, { path: "/intelligence", component: Intelligence }),
                                 createElement(Route, { path: "/match", component: Match })
                                 ,createElement(Route, { path: "/companies", component: Companies })
                                 ,createElement(Route, { path: "/companies/:slug", component: CompanyDetail })
                                 ,createElement(Route, { path: "/introductions", component: Introductions })
                                 ,createElement(Route, { path: "/preparation", component: Preparation })
                                 ,createElement(Route, { path: "/knowledge", component: Knowledge })
                                 ,createElement(Route, { path: "/access", component: Access })
                                 ,createElement(Route, { path: "/rooms", component: Rooms })
                                 ,createElement(Route, { path: "/accept-invite", component: AcceptInvite })
                                 ,createElement(Route, { component: NotFound })
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
                 )
               }
             ),
           }
         ),
       }
     )
   );

  // Extract Helmet-rendered head fragments (JSON-LD schema scripts) so the
  // prerenderer can append them to its deterministic head injection.
  const helmet = (helmetContext as { helmet?: { script?: { toString(): string }; meta?: { toString(): string } } }).helmet;
  const robots = helmet?.meta?.toString().match(/<meta[^>]*name="robots"[^>]*>/g)?.join("") ?? "";
  const head = (helmet?.script?.toString() ?? "") + robots;

  return { html, head };
}
