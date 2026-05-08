"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

export function DashboardLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Belépés sikertelen.");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-6">
          <span
            className={cn(
              "bg-muted text-muted-foreground ring-border flex size-12 items-center justify-center self-start rounded-xl ring-1",
            )}
          >
            <Shield aria-hidden className="size-6" />
          </span>
          <div className="flex flex-col gap-2">
            <CardTitle>Vezérlőpult</CardTitle>
            <CardDescription>
              Jelentkezzen be az analitikai összesítőhöz és a foglalásokhoz.
            </CardDescription>
          </div>
        </CardHeader>
        <CardPanel>
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <Field name="username">
              <FieldLabel htmlFor="dash-user">Felhasználónév</FieldLabel>
              <Input
                id="dash-user"
                name="username"
                autoComplete="username"
                nativeInput
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Field>
            <Field name="password">
              <FieldLabel htmlFor="dash-pass">Jelszó</FieldLabel>
              <Input
                id="dash-pass"
                name="password"
                type="password"
                autoComplete="current-password"
                nativeInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>
            {error ? (
              <p className="text-destructive-foreground text-sm" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Belépés
            </Button>
          </form>
        </CardPanel>
      </Card>
    </div>
  );
}
