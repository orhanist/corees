import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl items-center justify-center px-4">
      <section className="w-full rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Access denied</h1>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
          Your account does not have permission to view this page.
        </p>
        <Link
          href="/admin"
          className="mt-5 inline-block rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          Go to dashboard
        </Link>
      </section>
    </div>
  );
}
