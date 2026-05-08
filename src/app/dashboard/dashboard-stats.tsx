import { dashboardLogoutAction } from "@/app/dashboard/actions";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type DashboardStore, summarizeVisits } from "@/lib/dashboard-store";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";

function fmtShort(iso: string) {
  try {
    return new Date(iso).toLocaleString("hu-HU", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className={cn(
        "text-muted-foreground font-medium text-xs uppercase tracking-wider",
      )}
    >
      {children}
    </p>
  );
}

export function DashboardStats({ store }: { store: DashboardStore }) {
  const visits = summarizeVisits(store);
  const submissions = [...store.submissions].reverse();
  const events = [...store.analyticsEvents].reverse().slice(0, 50);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-border bg-background/80 supports-backdrop-filter:bg-background/70 sticky top-0 z-30 border-b backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <div className="flex items-start gap-3">
            <span className="bg-primary/8 text-primary ring-ring/16 mt-0.5 flex size-10 items-center justify-center rounded-xl ring-1">
              <LayoutDashboard aria-hidden className="size-5" />
            </span>
            <div className="flex flex-col gap-1">
              <h1 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
                Vezérlőpult
              </h1>
              <p className="text-muted-foreground text-sm leading-snug">
                COSS alapú admin felület – látogatások, front-end események,
                foglalások.
              </p>
            </div>
          </div>
          <form action={dashboardLogoutAction} className="shrink-0">
            <Button type="submit" variant="outline" size="sm">
              <LogOut aria-hidden className="size-4 opacity-80" />
              Kilépés
            </Button>
          </form>
        </div>
      </header>

      <main className="flex flex-col gap-8 px-4 py-8 md:gap-10 md:px-8 md:py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:gap-10">
          <section className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-start gap-3 pb-2">
                <span className="bg-muted flex size-9 items-center justify-center rounded-lg">
                  <MousePointerClick
                    aria-hidden
                    className="text-muted-foreground size-4.5"
                  />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <CardDescription>Látogatások</CardDescription>
                  <CardTitle className="flex flex-wrap items-baseline gap-2 text-3xl tabular-nums">
                    {visits.total}
                    <Badge variant="secondary" size="sm" className="font-normal">
                      összes
                    </Badge>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardPanel className="text-muted-foreground flex flex-col gap-1 pt-0 text-sm">
                <span>Kivéve `/dashboard`, `/api` és `/_next`.</span>
              </CardPanel>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-start gap-3 pb-2">
                <span className="bg-muted flex size-9 items-center justify-center rounded-lg">
                  <TrendingUp
                    aria-hidden
                    className="text-muted-foreground size-4.5"
                  />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <CardDescription>Ma · helyi nap</CardDescription>
                  <CardTitle className="text-3xl tabular-nums">
                    {visits.today}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardPanel className="text-muted-foreground flex flex-col gap-1 pt-0 text-sm">
                <span>
                  Elmúlt 7 nap:{" "}
                  <span className="text-foreground font-medium tabular-nums">
                    {visits.last7}
                  </span>
                </span>
              </CardPanel>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-start gap-3 pb-2">
                <span className="bg-muted flex size-9 items-center justify-center rounded-lg">
                  <BarChart3
                    aria-hidden
                    className="text-muted-foreground size-4.5"
                  />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <CardDescription>Foglalások</CardDescription>
                  <CardTitle className="text-3xl tabular-nums">
                    {store.submissions.length}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardPanel className="text-muted-foreground pt-0 text-sm">
                Lokálisan tárolva (legfeljebb 500 beküldés).
              </CardPanel>
            </Card>
          </section>

          <section className="flex flex-col gap-3">
            <SectionLabel>Útvonalak</SectionLabel>
            <Card>
              <CardPanel className="pt-6">
                {visits.topPaths.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    Még nincs rögzített látogatás – nyissa meg a nyilvános oldalt.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-1 text-sm">
                    {visits.topPaths.map(([path, count]) => (
                      <li
                        key={path}
                        className="border-border flex items-center justify-between gap-4 border-b py-3 last:border-0"
                      >
                        <code className="bg-muted rounded-md px-2 py-1 text-xs">
                          {path || "/"}
                        </code>
                        <Badge variant="outline" className="tabular-nums">
                          {count}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </CardPanel>
            </Card>
          </section>

          <section className="flex flex-col gap-3">
            <SectionLabel>Front-end események</SectionLabel>
            <Card className="overflow-hidden">
              <CardPanel className="p-0">
                <Table variant="card">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[140px]">Idő</TableHead>
                      <TableHead>Esemény</TableHead>
                      <TableHead>Részletek</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-muted-foreground text-center py-10"
                        >
                          Még nincs esemény a naplóban.
                        </TableCell>
                      </TableRow>
                    ) : (
                      events.map((ev, i) => (
                        <TableRow key={`${ev.at}-${ev.name}-${i}`}>
                          <TableCell className="whitespace-nowrap text-muted-foreground text-xs tabular-nums">
                            {fmtShort(ev.at)}
                          </TableCell>
                          <TableCell className="font-medium">{ev.name}</TableCell>
                          <TableCell className="text-muted-foreground max-w-[min(280px,40vw)] truncate text-xs">
                            {ev.params ? JSON.stringify(ev.params) : "—"}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardPanel>
            </Card>
          </section>

          <section className="flex flex-col gap-3 pb-8">
            <SectionLabel>Foglalási űrlap</SectionLabel>
            <Card className="overflow-hidden">
              <CardPanel className="p-0">
                <Table variant="card">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[136px]">Beérkezett</TableHead>
                      <TableHead>Név</TableHead>
                      <TableHead>Telefon</TableHead>
                      <TableHead>Dátum</TableHead>
                      <TableHead>Idő</TableHead>
                      <TableHead className="w-[72px]">Vendég</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-muted-foreground text-center py-10"
                        >
                          Még nincs beküldés az űrlapról.
                        </TableCell>
                      </TableRow>
                    ) : (
                      submissions.map((s, i) => (
                        <TableRow key={`${s.receivedAt}-${s.phone}-${i}`}>
                          <TableCell className="whitespace-nowrap text-muted-foreground text-xs tabular-nums">
                            {fmtShort(s.receivedAt)}
                          </TableCell>
                          <TableCell className="font-medium">{s.name}</TableCell>
                          <TableCell className="tabular-nums">{s.phone}</TableCell>
                          <TableCell>{s.date}</TableCell>
                          <TableCell>{s.time || "—"}</TableCell>
                          <TableCell>{s.guests || "—"}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardPanel>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
