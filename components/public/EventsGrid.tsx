"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { format, subDays } from "date-fns";
import { DatePicker } from "./DatePicker";

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
  /** When false, title and description are omitted (e.g. when using ContentPageLayout). */
  showHeader?: boolean;
};

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function buildExcerpt(html: string, maxLength = 200) {
  const clean = stripHtml(html);
  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength).trimEnd() + "…";
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export function EventsGrid({ events, showHeader = true }: EventsGridProps) {
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

  const hasActiveFilters = Boolean(query || fromDate || toDate);
  const clearFilters = () => {
    setQuery("");
    setFromDate("");
    setToDate("");
  };

  const setLast7Days = () => {
    const today = new Date();
    setFromDate(format(subDays(today, 7), "yyyy-MM-dd"));
    setToDate(format(today, "yyyy-MM-dd"));
  };
  const setLast30Days = () => {
    const today = new Date();
    setFromDate(format(subDays(today, 30), "yyyy-MM-dd"));
    setToDate(format(today, "yyyy-MM-dd"));
  };

  return (
    <section className="w-full">
      {showHeader && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Events</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Browse past and upcoming CORE events. Use the search and date filters to quickly find what you&apos;re
            looking for.
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="relative flex-1 min-w-0">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                <SearchIcon className="h-5 w-5" />
              </span>
              <input
                type="search"
                placeholder="Search by title, location, or description"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-500 focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-900 dark:focus:ring-[var(--primary)]/20"
                aria-label="Search events"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <DatePicker
                id="events-from"
                label="From"
                value={fromDate}
                onChange={setFromDate}
                placeholder="Select date"
              />
              <DatePicker
                id="events-to"
                label="To"
                value={toDate}
                onChange={setToDate}
                placeholder="Select date"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3 dark:border-slate-700">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={setLast7Days}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Last 7 days
              </button>
              <button
                type="button"
                onClick={setLast30Days}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Last 30 days
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-[var(--primary)] transition hover:bg-[var(--primary)]/10"
                >
                  Clear filters
                </button>
              )}
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {filtered.length} {filtered.length === 1 ? "event" : "events"}
            </p>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          No events match your filters yet. Try clearing the search or date range.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

