"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function VisitTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/dashboard")) return;
    if (last.current === pathname) return;
    last.current = pathname;
    fetch("/api/dashboard/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
