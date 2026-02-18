import { ContentPageLayout } from "@/components/public/ContentPageLayout";

export default function ContactPage() {
  return (
    <ContentPageLayout
      title="Contact Us"
      lead="CORE Educational Services is a Virginia-based nonprofit supporting students and families through educational programming, mentorship, and community collaboration. Reach out for program questions, volunteer opportunities, or partnerships."
    >
      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        {/* Left column: Send a Message form */}
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Send a Message</h2>
          <form className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              className="h-11 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="h-11 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <input
              type="text"
              placeholder="Subject"
              className="md:col-span-2 h-11 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <textarea
              placeholder="Your message"
              rows={6}
              className="md:col-span-2 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <button
              type="button"
              className="md:col-span-2 inline-flex w-fit rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-light)]"
            >
              Send Message
            </button>
          </form>
        </article>

        {/* Right column: Get in Touch + map */}
        <div className="flex flex-col gap-6">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Get in Touch</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              We usually respond within 1-2 business days.
            </p>
            <div className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Address:</span>{" "}
                <a
                  href="https://share.google/F8zgB1qb7O0szOSms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 transition hover:text-[var(--primary)] hover:underline"
                >
                  14120 Newbrook Dr Suite 200, Chantilly, VA 20151
                </a>
              </p>
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Email:</span>{" "}
                <a
                  href="mailto:info@core-es.org"
                  className="underline-offset-2 transition hover:text-[var(--primary)] hover:underline"
                >
                  info@core-es.org
                </a>
              </p>
            </div>
          </article>
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <iframe
              title="CORE Educational Services Office Location"
              src="https://maps.google.com/maps?q=14120%20Newbrook%20Dr%20Suite%20200%2C%20Chantilly%2C%20VA%2020151&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-[360px] w-full rounded-xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </article>
        </div>
      </div>
    </ContentPageLayout>
  );
}
