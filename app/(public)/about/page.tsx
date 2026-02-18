import Image from "next/image";
import { ContentPageLayout } from "@/components/public/ContentPageLayout";

export default function AboutPage() {
  return (
    <ContentPageLayout
      title="About CORE Educational Services"
      lead="CORE Educational Services is a nonprofit organization that has provided youth educational and academic support services since 2017. We serve the community through member donations and community collaboration, helping students grow socially, academically, and spiritually through programs and events year-round."
    >
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-[var(--primary)]">Our Service Area</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            Our geographic service area includes Washington, D.C.; Fairfax, Loudoun, and Prince William Counties; and
            the cities of Chantilly, Arlington, and Alexandria.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-[var(--primary)]">Main Office</h2>
          <a
            href="https://share.google/F8zgB1qb7O0szOSms"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-sm leading-7 text-slate-700 underline-offset-2 hover:underline dark:text-slate-300"
          >
            14120 Newbrook Dr Suite 200
            <br />
            Chantilly, VA 20151
          </a>
          <a href="mailto:info@core-es.org" className="mt-2 block text-sm text-slate-700 underline-offset-2 hover:underline dark:text-slate-300">
            info@core-es.org
          </a>
        </article>
      </section>

      <section className="grid gap-6 py-8 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Mission</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            To empower youth through accessible, high-quality educational support, mentorship, and character-building
            programs that strengthen academic achievement, confidence, and social responsibility.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Vision</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
            A thriving and inclusive community where every student has the guidance, opportunity, and support needed to
            succeed in school, lead with values, and contribute positively to society.
          </p>
        </article>
      </section>

      <section className="pb-4">
        <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-[var(--primary)]">What We Organize</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
              CORE Educational Services supports our community&apos;s immigrant youth socially, academically, and spiritually
              through philanthropy initiatives, clubs, retreat programs, field trips, and community service projects both
              nationally and internationally.
            </p>
          </article>
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <Image
              src="/images/main_page2.jpg"
              alt="CORE community activity"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </article>
        </div>
      </section>
    </ContentPageLayout>
  );
}
