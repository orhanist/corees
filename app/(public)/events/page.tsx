import { prisma } from "@/lib/prisma";
import { EventsGrid } from "@/components/public/EventsGrid";

export default async function EventsPage() {
  let serialized:
    | {
        id: string;
        title: string;
        slug: string;
        date: string;
        location: string;
        description: string;
        highlightImage?: string | null;
      }[]
    | [] = [];

  try {
    const events = await prisma.event.findMany({
      where: {
        published: true,
      },
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        date: true,
        location: true,
        description: true,
        highlightImage: true,
      },
    });

    serialized = events.map((event) => ({
      ...event,
      date: event.date.toISOString(),
    }));
  } catch {
    serialized = [];
  }

  return <EventsGrid events={serialized} />;
}

