export default function AdminEventsPage() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Events Manager</h1>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
        Event create/edit workflow will be connected here. Calendar publishing is already supported with the
        <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">showOnCalendar</code>
        event field.
      </p>
    </section>
  );
}
