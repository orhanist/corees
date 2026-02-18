"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";

type EventCard = {
  id: string;
  title: string;
  slug: string;
  date: string;
  location: string;
  description: string;
  highlightImage?: string | null;
};

type EventsGridProps = {
  events: EventCard[];
};

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function buildExcerpt(html: string, maxLength = 200) {
  const clean = stripHtml(html);
  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength).trimEnd() + "…";
}

export function EventsGrid({ events }: EventsGridProps) {
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const date = new Date(event.date);
      if (fromDate && date < new Date(fromDate)) return false;
      if (toDate && date > new Date(toDate)) return false;

      if (!query) return true;
      const haystack = (
        event.title +
        " " +
        event.location +
        " " +
        stripHtml(event.description)
      ).toLowerCase();
      const needle = query.toLowerCase();
      return haystack.includes(needle);
    });
  }, [events, query, fromDate, toDate]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Events</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Browse past and upcoming CORE events. Use the search and date filters to quickly find what you&apos;re
            looking for.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:gap-3">
          <input
            type="search"
            placeholder="Search by title, location, or description"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm outline-none ring-0 focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 md:w-64"
          />
          <div className="flex gap-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1">
              <span className="hidden md:inline">From</span>
              <input
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs outline-none ring-0 focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="hidden md:inline">To</span>
              <input
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs outline-none ring-0 focus:border-[var(--primary)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          No events match your filters yet. Try clearing the search or date range.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <article
              key={event.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-40 w-full bg-gradient-to-br from-[#e9f0ff] to-[#c9d8ff] dark:from-slate-800 dark:to-slate-900">
                {/* Optional place for event image if you add it later */}
              </div>
              <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                  {format(new Date(event.date), "MMM d, yyyy")}
                </p>
                <h2 className="mt-1 line-clamp-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                  {event.title}
                </h2>
                <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300">{event.location}</p>
                <p className="mt-3 line-clamp-4 text-sm text-slate-700 dark:text-slate-300">
                  {buildExcerpt(event.description)}
                </p>

                <div className="mt-4 flex justify-between text-xs font-semibold text-[var(--primary)]">
                  <Link href={`/events/${event.slug}`} className="hover:underline">
                    READ MORE
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

