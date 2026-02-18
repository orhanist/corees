import Link from "next/link";

export default function RegistrationPage() {
  return (
    <section className="bg-[var(--surface)] py-16">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h1 className="text-4xl font-bold text-[var(--primary)]">Registration</h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="flex min-h-[220px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Summer Camp Registration</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Student and parent registration flow for summer camp sessions.
            </p>
            <Link
              href="/registration/summer-camp"
              className="mt-auto inline-flex w-fit rounded-full bg-[var(--primary)] px-7 py-3 text-base font-semibold text-white transition hover:bg-[var(--primary-light)] hover:text-white"
            >
              Open Page
            </Link>
          </article>

          <article className="flex min-h-[220px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">CoreCare Scholarship Application</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Scholarship application page for student details, essay, and required files.
            </p>
            <Link
              href="/registration/corecare-scholarship"
              className="mt-auto inline-flex w-fit rounded-full bg-[var(--primary)] px-7 py-3 text-base font-semibold text-white transition hover:bg-[var(--primary-light)] hover:text-white"
            >
              Open Page
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
