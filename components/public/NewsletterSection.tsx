export function NewsletterSection() {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-gray-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Stay Connected</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-slate-300">
            Newsletter form wiring comes in a later step. This section is ready for API integration.
          </p>
          <form className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-11 flex-1 rounded-md border border-gray-300 bg-white px-3 text-sm text-slate-900 outline-none ring-[var(--primary)] focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
            />
            <button
              type="button"
              className="h-11 rounded-md bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
