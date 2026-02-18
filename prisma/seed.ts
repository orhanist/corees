import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const superadminEmail = process.env.SUPERADMIN_EMAIL;
  if (!superadminEmail) {
    console.log("No SUPERADMIN_EMAIL set, skipping seed");
    return;
  }

  await prisma.allowedEmail.upsert({
    where: { email: superadminEmail },
    update: {},
    create: { email: superadminEmail, role: Role.SUPERADMIN },
  });

  await prisma.event
    .upsert({
      where: { slug: "summer-camp-2025-kickoff" },
      update: {},
      create: {
        title: "Summer Camp 2025 Kickoff",
        slug: "summer-camp-2025-kickoff",
        date: new Date("2025-06-15T09:00:00"),
        location: "14120 Newbrook Dr Suite 200, Chantilly, VA 20151",
        description:
          "<p>Join us for the launch of our Summer Camp 2025! Fun activities, mentorship, and community building.</p>",
        highlightImage: "https://placehold.co/800x450/1B3F6E/white?text=Summer+Camp+2025",
        published: true,
        showOnCalendar: true,
        authorId: "seed",
      },
    })
    .catch(() => {
      // Expected until real users exist.
    });

  console.log("Database seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
