"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { loginWithCredentials } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginWithCredentials, undefined);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-base font-extrabold tracking-tight text-brand-orange">
          ScaleYukti
        </Link>
        <h1 className="mt-8 text-2xl font-bold">Team sign in</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Internal access only. Ask an admin if you need an account.
        </p>

        <form action={action} className="mt-8 space-y-4">
          <Field label="Email" name="email" type="email" autoComplete="email" required />
          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          {state?.error && (
            <p className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
              {state.error}
            </p>
          )}
          <Button type="submit" pending={pending} className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
