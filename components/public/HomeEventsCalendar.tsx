import Link from "next/link";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { getHomeCalendarEvents } from "@/lib/events";

type CalendarCellEvent = {
  id: string;
  title: string;
  location: string;
};

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function HomeEventsCalendar() {
  const events = await getHomeCalendarEvents();
  const baseDate = events.length > 0 ? new Date(events[0].date) : new Date();
  const monthStart = startOfMonth(baseDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const monthEnd = endOfMonth(baseDate);
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days: Date[] = [];
  for (let day = gridStart; day <= gridEnd; day = addDays(day, 1)) {
    days.push(day);
  }

  const eventsByDay = new Map<string, CalendarCellEvent[]>();
  for (const event of events) {
    const key = format(new Date(event.date), "yyyy-MM-dd");
    const existing = eventsByDay.get(key) ?? [];
    existing.push({
      id: event.id,
      title: event.title,
      location: event.location,
    });
    eventsByDay.set(key, existing);
  }

  return (
    <section className="bg-[#f7f9fc] dark:bg-slate-950">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[1.4fr_0.9fr]">
        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Events Calendar</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{format(monthStart, "MMMM yyyy")}</h2>
            </div>
            <Link href="/events" className="text-sm font-semibold text-[var(--primary)] hover:underline">
              View all events
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800">
              {dayHeaders.map((day) => (
                <div
                  key={day}
                  className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {days.map((day) => {
                const dayKey = format(day, "yyyy-MM-dd");
                const dayEvents = eventsByDay.get(dayKey) ?? [];

                return (
                  <div
                    key={dayKey}
                    className="min-h-28 border-b border-r border-slate-200 p-2 last:border-r-0 dark:border-slate-800"
                  >
                    <p
                      className={`text-xs font-semibold ${
                        isSameMonth(day, monthStart)
                          ? "text-slate-900 dark:text-slate-100"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {format(day, "d")}
                    </p>
                    <div className="mt-2 space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <Link
                          key={event.id}
                          href="/events"
                          className="block rounded bg-[#e7ecfb] px-1.5 py-1 text-[11px] font-medium text-[#243f95] transition hover:bg-[#d8e2ff] dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                          {event.title}
                        </Link>
                      ))}
                      {dayEvents.length > 2 ? (
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          +{dayEvents.length - 2} more
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Upcoming Highlights</h3>
          {events.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              No calendar events published yet. Set an event as published and enable calendar display to show it here.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {events.slice(0, 5).map((event) => (
                <article key={event.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                    {format(new Date(event.date), "EEE, MMM d")}
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{event.location}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-700 dark:text-slate-300">
                    {stripHtml(event.description)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
