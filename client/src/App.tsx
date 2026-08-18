import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import Chatbot from "./components/Chatbot";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import PageLoader from "./components/PageLoader";
import GlobalLayout from "./components/layout/GlobalLayout";

const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const HamaProject = lazy(() => import("./pages/HamaProject"));
const ProgramDetail = lazy(() => import("./pages/ProgramDetail"));
const InvestorLogin = lazy(() => import("./pages/InvestorLogin"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/gallery"} component={Gallery} />
        <Route path={"/hama-project"} component={HamaProject} />
        <Route path={"/programs/:slug"} component={ProgramDetail} />
        <Route path={"/investor-portal"} component={InvestorLogin} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/terms"} component={Terms} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
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
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:bg-[#5a1f2e] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
            >
              Skip to content
            </a>
            <GlobalLayout>
              <Router />
            </GlobalLayout>
            <Chatbot />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
    </MotionConfig>
  );
}

export default App;
