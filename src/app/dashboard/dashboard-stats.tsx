import { dashboardLogoutAction } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type DashboardStore, summarizeVisits } from "@/lib/dashboard-store";

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

export function DashboardStats({ store }: { store: DashboardStore }) {
  const visits = summarizeVisits(store);
  const submissions = [...store.submissions].reverse();
  const events = [...store.analyticsEvents].reverse().slice(0, 50);

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6 md:p-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Vezérlőpult
          </h1>
          <p className="text-muted-foreground text-sm">
            Látogatások, események és foglalási beküldések összesítése.
          </p>
        </div>
        <form action={dashboardLogoutAction}>
          <Button type="submit" variant="outline" size="sm">
            Kilépés
          </Button>
        </form>
      </header>

      <Separator />

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Összes látogatás</CardDescription>
            <CardTitle className="flex items-baseline gap-2 text-3xl tabular-nums">
              {visits.total}
              <Badge variant="secondary" size="sm" className="font-normal">
                oldalletöltés
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardPanel className="text-muted-foreground text-sm pt-0">
            Kivéve `/dashboard` és API útvonalak.
          </CardPanel>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Ma (helyi idő)</CardDescription>
            <CardTitle className="text-3xl tabular-nums">{visits.today}</CardTitle>
          </CardHeader>
          <CardPanel className="text-muted-foreground text-sm pt-0">
            Elmúlt 7 nap összesen:{" "}
            <span className="text-foreground font-medium">{visits.last7}</span>
          </CardPanel>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Foglalások (tárolva)</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              {store.submissions.length}
            </CardTitle>
          </CardHeader>
          <CardPanel className="text-muted-foreground text-sm pt-0">
            A legutóbbi beküldések alább.
          </CardPanel>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">Top oldalak</h2>
        <Card>
          <CardPanel className="pt-6">
            {visits.topPaths.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Még nincs látogatás rögzítve. Böngéssze a nyilvános oldalt.
              </p>
            ) : (
              <ul className="flex flex-col gap-2 text-sm">
                {visits.topPaths.map(([path, count]) => (
                  <li
                    key={path}
                    className="flex items-center justify-between gap-4 border-b border-border/60 py-2 last:border-0"
                  >
                    <code className="bg-muted/50 rounded-md px-2 py-0.5 text-xs">
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

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">Események</h2>
        <Card>
          <CardPanel className="pt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Idő</TableHead>
                  <TableHead>Esemény</TableHead>
                  <TableHead>Paraméterek</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-muted-foreground text-center"
                    >
                      Még nincs rögzített esemény.
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((ev, i) => (
                    <TableRow key={`${ev.at}-${ev.name}-${i}`}>
                      <TableCell className="whitespace-nowrap text-xs">
                        {fmtShort(ev.at)}
                      </TableCell>
                      <TableCell className="font-medium">{ev.name}</TableCell>
                      <TableCell className="max-w-[240px] truncate text-muted-foreground text-xs">
                        {ev.params
                          ? JSON.stringify(ev.params)
                          : "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardPanel>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">Foglalási űrlap</h2>
        <Card>
          <CardPanel className="pt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Beérkezett</TableHead>
                  <TableHead>Név</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Dátum</TableHead>
                  <TableHead>Idő</TableHead>
                  <TableHead>Vendég</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-muted-foreground text-center"
                    >
                      Még nincs beküldés.
                    </TableCell>
                  </TableRow>
                ) : (
                  submissions.map((s, i) => (
                    <TableRow key={`${s.receivedAt}-${s.phone}-${i}`}>
                      <TableCell className="whitespace-nowrap text-xs">
                        {fmtShort(s.receivedAt)}
                      </TableCell>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.phone}</TableCell>
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
  );
}
