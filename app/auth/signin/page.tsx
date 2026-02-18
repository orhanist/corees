import { AdminSignInForm } from "@/components/auth/AdminSignInForm";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const resolved = await searchParams;
  const callbackUrl = resolved.callbackUrl ?? "/admin";

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Admin Sign In</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Secure sign-in for CORE admin staff.
        </p>
        <AdminSignInForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
