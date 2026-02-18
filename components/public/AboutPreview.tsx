import Link from "next/link";
import Image from "next/image";

export function AboutPreview() {
  return (
    <section className="bg-[#f1f1f1] dark:bg-[var(--surface)]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-[1.3fr_0.9fr]">
        <div>
          <h2 className="max-w-2xl text-6xl font-bold leading-tight text-slate-800 dark:text-slate-100">Shaping Confident Learners and Responsible Leaders</h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-300">
            Our mission is to provide high-quality educational support, mentorship, and development opportunities that
            help youth thrive academically and socially. Our vision is a stronger community where every student has the
            guidance, skills, and confidence to build a meaningful future.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block rounded-full bg-[#1f3f96] px-6 py-3 text-xs font-semibold uppercase tracking-wide !text-white shadow transition hover:bg-[#182f72] hover:!text-white"
          >
            Learn More
          </Link>
        </div>
        <div className="relative h-[420px] overflow-hidden rounded-3xl">
          <Image src="/images/main_page2.jpg" alt="Community mentorship and learning" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
