"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startRegistration } from "@simplewebauthn/browser";

type PasskeySetupFormProps = {
  callbackUrl: string;
};

type RegistrationOptionResult = {
  options: Parameters<typeof startRegistration>[0];
};

export function PasskeySetupForm({ callbackUrl }: PasskeySetupFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegisterPasskey() {
    setError(null);
    setStatus(null);
    setLoading(true);

    try {
      const optionsRes = await fetch("/api/auth/passkey/registration-options", {
        method: "POST",
      });

      if (!optionsRes.ok) {
        setError("Could not start passkey registration.");
        return;
      }

      const { options } = (await optionsRes.json()) as RegistrationOptionResult;
      const credential = await startRegistration(options);

      const verifyRes = await fetch("/api/auth/passkey/verify-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: credential }),
      });

      if (!verifyRes.ok) {
        setError("Passkey verification failed.");
        return;
      }

      setStatus("Passkey added successfully. Redirecting...");
      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 800);
    } catch {
      setError("Passkey registration was canceled or failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleRegisterPasskey}
        disabled={loading}
        className="mt-6 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-light)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Registering..." : "Register passkey"}
      </button>

      {status ? <p className="mt-4 text-sm font-medium text-emerald-600">{status}</p> : null}
      {error ? <p className="mt-4 text-sm font-medium text-rose-600">{error}</p> : null}
    </>
  );
}
