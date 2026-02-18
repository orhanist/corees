import { prisma } from "@/lib/prisma";
import { startOfDay } from "date-fns";

export type HomeCalendarEvent = {
  id: string;
  title: string;
  slug: string;
  date: Date;
  location: string;
  description: string;
};

export type HomeCalendarData = {
  anchorDate: Date;
  events: HomeCalendarEvent[];
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
    const now = startOfDay(new Date());
    const featuredEvents = await prisma.event.findMany({
      where: {
        published: true,
        showOnCalendar: true,
        date: {
          gte: now,
        },
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

    const historicalFeaturedEvents = await prisma.event.findMany({
      where: {
        published: true,
        showOnCalendar: true,
      },
      orderBy: {
        date: "desc",
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
    if (historicalFeaturedEvents.length > 0) {
      return historicalFeaturedEvents.reverse().map(toCalendarEvent);
    }

    const fallbackEvents = await prisma.event.findMany({
      where: {
        published: true,
        date: {
          gte: now,
        },
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
    if (fallbackEvents.length > 0) {
      return fallbackEvents.map(toCalendarEvent);
    }

    const historicalFallbackEvents = await prisma.event.findMany({
      where: {
        published: true,
      },
      orderBy: {
        date: "desc",
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

    return historicalFallbackEvents.reverse().map(toCalendarEvent);
  } catch {
    // Homepage still renders if DB is unavailable.
    return [];
  }
}

export async function getHomeCalendarData(limit = 24): Promise<HomeCalendarData> {
  const events = await getHomeCalendarEvents(limit);
  const now = startOfDay(new Date());
  const upcoming = events.find((event) => startOfDay(new Date(event.date)) >= now);
  const anchorDate = upcoming ? new Date(upcoming.date) : now;

  return {
    anchorDate,
    events,
  };
}
