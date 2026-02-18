import { prisma } from "@/lib/prisma";
import { ContentPageLayout } from "@/components/public/ContentPageLayout";
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

    serialized = events.map((event: {
      id: string;
      title: string;
      slug: string;
      date: Date;
      location: string;
      description: string;
      highlightImage: string | null;
    }) => ({
      ...event,
      date: event.date.toISOString(),
    }));
  } catch {
    serialized = [];
  }

  return (
    <ContentPageLayout
      title="Events"
      lead="Browse past and upcoming CORE events. Use the search and date filters to quickly find what you're looking for."
    >
      <EventsGrid events={serialized} showHeader={false} />
    </ContentPageLayout>
  );
}

