import type { Metadata } from "next";
import { verifyDashboardSession } from "@/lib/dashboard-auth";
import { readDashboardStore } from "@/lib/dashboard-store";
import { DashboardLoginForm } from "./dashboard-login-form";
import { DashboardStats } from "./dashboard-stats";

export const metadata: Metadata = {
  title: "Vezérlőpult",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const authed = await verifyDashboardSession();
  if (!authed) {
    return <DashboardLoginForm />;
  }
  const store = await readDashboardStore();
  return <DashboardStats store={store} />;
}
