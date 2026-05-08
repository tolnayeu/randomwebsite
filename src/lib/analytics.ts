/** Lightweight event hook – wire GA/Plausible via env later */
export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, params);
  }
  const w = window as Window & {
    gtag?: (...args: unknown[]) => void;
  };
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
  }
}
