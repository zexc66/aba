import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Chatbot from "./components/Chatbot";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import PageLoader from "./components/PageLoader";
import GlobalLayout from "./components/layout/GlobalLayout";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const HamaProject = lazy(() => import("./pages/HamaProject"));
const InvestorLogin = lazy(() => import("./pages/InvestorLogin"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/gallery"} component={Gallery} />
        <Route path={"/hama-project"} component={HamaProject} />
        <Route path={"/investor-portal"} component={InvestorLogin} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), then change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` to ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        {/* LanguageProvider gives all pages shared language state — fixes tripled local state anti-pattern */}
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <GlobalLayout>
              <Router />
            </GlobalLayout>
            <Chatbot />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
