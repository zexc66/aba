import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import Chatbot from "./components/Chatbot";
import ConsentBanner from "./components/ConsentBanner";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider, useLanguageContext } from "./contexts/LanguageContext";
import PageLoader from "./components/PageLoader";
import GlobalLayout from "./components/layout/GlobalLayout";

const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const HamaProject = lazy(() => import("./pages/HamaProject"));
const ProgramDetail = lazy(() => import("./pages/ProgramDetail"));
const Pipeline = lazy(() => import("./pages/Pipeline"));
const Corridor = lazy(() => import("./pages/Corridor"));
const TeamMember = lazy(() => import("./pages/TeamMember"));
const GovernanceArticle = lazy(() => import("./pages/GovernanceArticle"));
const InvestorLogin = lazy(() => import("./pages/InvestorLogin"));
const Vault = lazy(() => import("./pages/Vault"));
const Admin = lazy(() => import("./pages/Admin"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Visions = lazy(() => import("./pages/Visions"));
const NotFound = lazy(() => import("./pages/NotFound"));

function SkipLink() {
  const { content } = useLanguageContext();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:bg-[#5a1f2e] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
    >
      {content.skipToContent}
    </a>
  );
}

function RouterSwitch() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/gallery"} component={Gallery} />
        <Route path={"/hama-project"} component={HamaProject} />
        <Route path={"/programs/:slug"} component={ProgramDetail} />
        <Route path={"/pipeline"} component={Pipeline} />
        <Route path={"/corridors/:iso"} component={Corridor} />
        <Route path={"/team/:slug"} component={TeamMember} />
        <Route path={"/governance/:slug"} component={GovernanceArticle} />
        <Route path={"/investor-portal"} component={InvestorLogin} />
        <Route path={"/investor-portal/vault"} component={Vault} />
        <Route path={"/admin"} component={Admin} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/terms"} component={Terms} />
        <Route path={"/visions"} component={Visions} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

/** Locale path prefix (/ar, /fr) for prerendered locale URLs — stripped from
 *  client routing so /ar/pipeline matches the /pipeline route. */
function pathPrefix(): string | undefined {
  try {
    const m = window.location.pathname.match(/^\/(ar|fr)(?=\/|$)/);
    return m ? m[1] : undefined;
  } catch {
    return undefined;
  }
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <WouterRouter base={pathPrefix()}>
        <RouterSwitch />
      </WouterRouter>
    </Suspense>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <SkipLink />
            <GlobalLayout>
              <Router />
            </GlobalLayout>
            <Chatbot />
            <ConsentBanner />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
    </MotionConfig>
  );
}

export default App;
