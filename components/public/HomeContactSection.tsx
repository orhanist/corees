export function HomeContactSection() {
  return (
    <section className="bg-[#f2f4f8] py-14 dark:bg-[var(--surface)]">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Contact Us</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-700 dark:text-slate-300">
            Have a question about our programs, registration, or community partnerships? Send us a message and our
            team will follow up.
          </p>
          <form className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              className="h-11 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="h-11 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            />
            <input
              type="tel"
              placeholder="Phone Number (optional)"
              className="h-11 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            />
            <input
              type="text"
              placeholder="Subject"
              className="h-11 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            />
            <textarea
              placeholder="Your message"
              rows={5}
              className="md:col-span-2 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="button"
              className="md:col-span-2 inline-flex w-fit rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-light)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
