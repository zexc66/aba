export type AnalyticsEvent =
  | "service_view"
  | "intelligence_view"
  | "match_start"
  | "match_submit"
  | "investor_access_start"
  | "investor_access_submit";

function hasConsent(): boolean {
  try {
    return localStorage.getItem("aiabasd-consent") === "granted";
  } catch {
    return false;
  }
}

function post(payload: { path: string; event?: AnalyticsEvent }): void {
  if (!hasConsent()) return;
  try {
    // Keep analytics strictly to the route path; query strings can contain
    // user-entered or otherwise identifying values.
    const path = payload.path.split("?")[0].split("#")[0].slice(0, 200) || "/";
     const body = JSON.stringify({ ...payload, path, consent: true });
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {
    // Analytics is best-effort and never affects the user flow.
  }
}

export function trackPageview(path: string): void {
  post({ path });
}

export function trackEvent(event: AnalyticsEvent, path = window.location.pathname): void {
  post({ event, path });
}
