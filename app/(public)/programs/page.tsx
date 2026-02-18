import { ProgramsGrid } from "@/components/public/ProgramsGrid";

export default function ProgramsPage() {
  return (
    <section className="bg-[#efefef] dark:bg-[var(--surface)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-14">
        <h1 className="text-4xl font-bold text-[var(--primary)]">Our Programs</h1>
        <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-300">
          CORE Educational Services designs each program to support students academically, socially, and personally
          through high-impact community-based learning.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Academic Growth</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Structured support in STEM, language, test preparation, and mentorship to strengthen student performance.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Character & Leadership</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Programs that build confidence, ethical leadership, and service-oriented habits for lifelong impact.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Community Engagement</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Regional initiatives across Virginia, DC, and Maryland that connect families, educators, and volunteers.
            </p>
          </article>
        </div>
      </div>
      <ProgramsGrid />
    </section>
  );
}
