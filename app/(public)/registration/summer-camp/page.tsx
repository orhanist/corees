import Link from "next/link";

export default function SummerCampRegistrationPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <Link href="/registration" className="text-sm font-medium text-[var(--accent)] hover:underline">
        Back to Registration
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Summer Camp Registration</h1>
      <p className="mt-4 max-w-3xl text-slate-700">
        This page is ready for your full camp registration form. We can add student details, parent details, emergency
        contact, agreements, and payment placeholder fields next.
      </p>
    </section>
  );
}
