"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type AcceptInviteFormProps = {
  token: string;
};

export function AcceptInviteForm({ token }: AcceptInviteFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const response = await fetch("/api/auth/accept-invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, name, password }),
    });

    const payload = (await response.json().catch(() => ({}))) as { error?: string; email?: string };
    if (!response.ok || !payload.email) {
      setError(payload.error ?? "Could not accept invite.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: payload.email,
      password,
      redirect: false,
      callbackUrl: "/auth/setup-passkey?callbackUrl=/admin",
    });

    if (result?.error) {
      setError("Invite accepted, but automatic sign in failed. Please sign in manually.");
      setLoading(false);
      return;
    }

    router.push("/auth/setup-passkey?callbackUrl=/admin");
    router.refresh();
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Full name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-light)] disabled:opacity-70"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
