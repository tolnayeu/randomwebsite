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
  if (!window.location.pathname.startsWith("/dashboard")) {
    fetch("/api/dashboard/track-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, params }),
      keepalive: true,
    }).catch(() => {});
  }
}
