import { prisma } from "@/lib/prisma";

export type HomeCalendarEvent = {
  id: string;
  title: string;
  slug: string;
  date: Date;
  location: string;
  description: string;
};

function toCalendarEvent(event: {
  id: string;
  title: string;
  slug: string;
  date: Date;
  location: string;
  description: string;
}): HomeCalendarEvent {
  return {
    id: event.id,
    title: event.title,
    slug: event.slug,
    date: event.date,
    location: event.location,
    description: event.description,
  };
}

export async function getHomeCalendarEvents(limit = 24): Promise<HomeCalendarEvent[]> {
  try {
    const featuredEvents = await prisma.event.findMany({
      where: {
        published: true,
        showOnCalendar: true,
      },
      orderBy: {
        date: "asc",
      },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        date: true,
        location: true,
        description: true,
      },
    });

    if (featuredEvents.length > 0) {
      return featuredEvents.map(toCalendarEvent);
    }

    const fallbackEvents = await prisma.event.findMany({
      where: {
        published: true,
      },
      orderBy: {
        date: "asc",
      },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        date: true,
        location: true,
        description: true,
      },
    });

    return fallbackEvents.map(toCalendarEvent);
  } catch {
    // Homepage still renders if DB is unavailable.
    return [];
  }
}
