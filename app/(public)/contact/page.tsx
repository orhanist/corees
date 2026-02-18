export default function ContactPage() {
  return (
    <section className="bg-[#f2f4f8] py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-[var(--primary)]">Contact Us</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-700">
          CORE Educational Services is a Virginia-based nonprofit supporting students and families through educational
          programming, mentorship, and community collaboration. Reach out for program questions, volunteer opportunities,
          or partnerships.
        </p>

        <div className="mt-8 grid gap-6 md:items-start md:grid-cols-[0.95fr_1.05fr]">
          <article className="h-fit rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Get in Touch</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              We usually respond within 1-2 business days.
            </p>

            <div className="mt-5 space-y-3 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">Address:</span>{" "}
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
                <span className="font-semibold text-slate-900">Email:</span>{" "}
                <a
                  href="mailto:info@core-es.org"
                  className="underline-offset-2 transition hover:text-[var(--primary)] hover:underline"
                >
                  info@core-es.org
                </a>
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Send a Message</h2>
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
        </div>

        <article className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <iframe
            title="CORE Educational Services Office Location"
            src="https://maps.google.com/maps?q=14120%20Newbrook%20Dr%20Suite%20200%2C%20Chantilly%2C%20VA%2020151&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="h-[360px] w-full rounded-xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </article>
      </div>
    </section>
  );
}
