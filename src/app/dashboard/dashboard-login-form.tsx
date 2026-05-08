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
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Vezérlőpult</CardTitle>
          <CardDescription>Jelentkezzen be az oldal statisztikáihoz.</CardDescription>
        </CardHeader>
        <CardPanel>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
            <Button type="submit" className="w-full" loading={loading}>
              Belépés
            </Button>
          </form>
        </CardPanel>
      </Card>
    </div>
  );
}
