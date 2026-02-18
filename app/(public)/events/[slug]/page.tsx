import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;

  const event = await prisma.event.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      date: true,
      location: true,
      description: true,
      highlightImage: true,
    },
  });

  if (!event) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16">
      <div className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
        <Link href="/events" className="hover:underline">
          Events
        </Link>{" "}
        / Detail
      </div>

      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
        {format(new Date(event.date), "EEE, MMM d, yyyy")}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{event.title}</h1>
      <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">{event.location}</p>

      {event.highlightImage ? (
        <div className="mt-6 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
          {/* You can swap this to a Next/Image when storing real images */}
          <img src={event.highlightImage} alt={event.title} className="h-64 w-full object-cover" />
        </div>
      ) : null}

      <article className="prose prose-slate mt-8 max-w-none text-slate-800 prose-a:text-[var(--primary)] dark:prose-invert dark:text-slate-100">
        <div dangerouslySetInnerHTML={{ __html: event.description }} />
      </article>

      <div className="mt-10">
        <Link
          href="/events"
          className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          ← Back to all events
        </Link>
      </div>
    </section>
  );
}

