import { PasskeySetupForm } from "@/components/auth/PasskeySetupForm";

export default async function SetupPasskeyPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const resolved = await searchParams;
  const callbackUrl = resolved.callbackUrl ?? "/admin";

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center px-4 py-12">
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Set up your passkey</h1>
        <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
          Passkey is required for admin access. Use your device security (fingerprint, face unlock, or PIN) to finish
          setup.
        </p>
        <PasskeySetupForm callbackUrl={callbackUrl} />
      </section>
    </div>
  );
}
