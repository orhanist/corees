"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { startAuthentication } from "@simplewebauthn/browser";

type AdminSignInFormProps = {
  callbackUrl: string;
};

type PasskeyAuthOptionsResponse = {
  available: boolean;
  options?: Parameters<typeof startAuthentication>[0];
};

export function AdminSignInForm({ callbackUrl }: AdminSignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let passkeyAssertion: string | undefined;

      const authOptionReq = await fetch("/api/auth/passkey/authentication-options", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (authOptionReq.ok) {
        const authOptionData = (await authOptionReq.json()) as PasskeyAuthOptionsResponse;
        if (authOptionData.available && authOptionData.options) {
          const assertion = await startAuthentication(authOptionData.options);
          passkeyAssertion = JSON.stringify(assertion);
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        passkeyAssertion,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setError("Invalid login credentials or missing passkey verification.");
        return;
      }

      router.push(result.url ?? callbackUrl);
      router.refresh();
    } catch {
      setError("Sign-in failed. Please confirm your credentials and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-light)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
