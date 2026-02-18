import Link from "next/link";

export function EventsCarousel() {
  return (
    <section className="bg-white dark:bg-slate-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Upcoming Events</h2>
          </div>
          <Link href="/events" className="text-sm font-semibold text-[var(--primary)] hover:underline">
            View all events
          </Link>
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            No published events yet. Once admins publish events, they will appear here automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
