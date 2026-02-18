import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    title: "After School Program",
    image: "/images/programs/after-school.jpg",
    href: "/programs",
    fit: "cover",
  },
  {
    title: "Seed School of Values",
    image: "/images/programs/seed-school.jpg",
    href: "/programs",
    fit: "contain",
  },
  {
    title: "WoW Academy",
    image: "/images/programs/wow-academy.jpg",
    href: "/programs",
    fit: "contain",
  },
  {
    title: "SAT Course",
    image: "/images/programs/sat-course.jpg",
    href: "/programs",
    fit: "cover",
  },
  {
    title: "Wise Walk",
    image: "/images/programs/wise-walk-logo.jpg",
    href: "/programs",
    fit: "cover",
    bg: "dark",
  },
  {
    title: "Core Mentoring Program",
    image: "/images/programs/core-mentoring.jpg",
    href: "/programs",
    fit: "cover",
  },
  {
    title: "Core Math Academy",
    image: "/images/programs/core-math-academy.png",
    href: "/programs",
    fit: "contain",
  },
  {
    title: "Nurify",
    image: "/images/programs/nurify.png",
    href: "https://www.youtube.com/@NurifyTV",
    external: true,
    fit: "contain",
  },
  {
    title: "Yanki Tiyatro",
    image: "/images/programs/yanki-tiyatro.png",
    href: "https://www.instagram.com/yanki_tiyatro/",
    external: true,
    fit: "cover",
    bg: "dark",
  },
];

export function ProgramsGrid() {
  return (
    <section id="programs" className="bg-[#efefef] dark:bg-[var(--surface)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-16">
        <h2 className="text-center text-5xl font-semibold text-[var(--accent)]">Programs</h2>
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
          {programs.map((program) =>
            program.external ? (
              <a
                key={program.title}
                href={program.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-[#e9e9e9] bg-[#f6f6f6] p-6 text-center transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                <div
                  className={`relative mx-auto h-40 w-40 overflow-hidden rounded-full border border-slate-200 dark:border-slate-600 ${
                    program.bg === "dark" ? "bg-slate-900" : "bg-white dark:bg-slate-950"
                  }`}
                >
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className={program.fit === "contain" ? "object-contain p-3" : "object-cover"}
                  />
                </div>
                <h3 className="mt-6 min-h-14 text-xl tracking-[0.14em] text-[#1c2281] dark:text-slate-100">{program.title}</h3>
                <span className="mt-4 inline-flex rounded-full bg-[#1d1f78] px-8 py-2 text-sm font-semibold text-white group-hover:bg-[#151766]">
                  Details
                </span>
                <p className="sr-only">Open {program.title}</p>
              </a>
            ) : (
              <Link
                key={program.title}
                href={program.href}
                className="group block border border-[#e9e9e9] bg-[#f6f6f6] p-6 text-center transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                <div
                  className={`relative mx-auto h-40 w-40 overflow-hidden rounded-full border border-slate-200 dark:border-slate-600 ${
                    program.bg === "dark" ? "bg-slate-900" : "bg-white dark:bg-slate-950"
                  }`}
                >
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className={program.fit === "contain" ? "object-contain p-3" : "object-cover"}
                  />
                </div>
                <h3 className="mt-6 min-h-14 text-xl tracking-[0.14em] text-[#1c2281] dark:text-slate-100">{program.title}</h3>
                <span className="mt-4 inline-flex rounded-full bg-[#1d1f78] px-8 py-2 text-sm font-semibold text-white group-hover:bg-[#151766]">
                  Details
                </span>
                <p className="sr-only">Open {program.title}</p>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
