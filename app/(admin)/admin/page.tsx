import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  let eventsCount = 0;
  let usersCount = 0;
  let pendingInvites = 0;

  try {
    [eventsCount, usersCount, pendingInvites] = await Promise.all([
      prisma.event.count(),
      prisma.user.count(),
      prisma.adminInvite.count({
        where: {
          acceptedAt: null,
          revokedAt: null,
        },
      }),
    ]);
  } catch {
    // Dashboard still loads if DB is temporarily unavailable.
  }

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-wide text-slate-500">Events</p>
          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100">{eventsCount}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-wide text-slate-500">Admin Users</p>
          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100">{usersCount}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-wide text-slate-500">Pending Invites</p>
          <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-slate-100">{pendingInvites}</p>
        </article>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/users" className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">
          Manage user access
        </Link>
        <Link
          href="/admin/events"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
        >
          Manage events
        </Link>
      </div>
    </section>
  );
}
