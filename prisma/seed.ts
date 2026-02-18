import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const superadminEmail = process.env.SUPERADMIN_EMAIL ?? "seed@corees.org";

  await prisma.allowedEmail.upsert({
    where: { email: superadminEmail },
    update: {},
    create: { email: superadminEmail, role: Role.SUPERADMIN },
  });

  const user = await prisma.user.upsert({
    where: { email: superadminEmail },
    update: {},
    create: { email: superadminEmail, name: "Seed", role: Role.SUPERADMIN },
  });
  const authorId = user.id;

  await prisma.event.upsert({
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
      authorId,
    },
  });

  await prisma.event.upsert({
    where: { slug: "ramadan-parent-info-meeting-boys-2026" },
    update: {},
    create: {
      title: "Ramazan Ayı Veli Bilgilendirme Toplantısı (Boys)",
      slug: "ramadan-parent-info-meeting-boys-2026",
      date: new Date("2026-02-15T19:00:00"),
      location: "Zoom",
      description:
        "<p>Ramazan ayına özel bilgilendirme ve planlama toplantımıza tüm velilerimizi bekliyoruz.</p>" +
        "<p><strong>Ortaokul (Boys)</strong> Saat: 19:00</p>" +
        "<p><strong>Ev Okulu (Boys)</strong> Saat: 19:30</p>" +
        "<p><strong>Lise (Boys)</strong> Saat: 20:00</p>" +
        "<p>15 Şubat — Zoom üzerinden düzenlenecektir.</p>",
      highlightImage: "/images/events/ramadan-parent-meeting-2026.png",
      published: true,
      showOnCalendar: true,
      authorId,
    },
  });

  console.log("Database seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
