"use server";

import { clearDashboardSessionCookie } from "@/lib/dashboard-auth";
import { redirect } from "next/navigation";

export async function dashboardLogoutAction() {
  await clearDashboardSessionCookie();
  redirect("/dashboard");
}
