import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

// Strip the GitHub Pages base path so SPA routing works at /aba/
if (window.location.pathname.startsWith("/aba")) {
  const stripped = window.location.pathname.slice(4) || "/";
  window.history.replaceState(null, "", stripped + window.location.search + window.location.hash);
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
