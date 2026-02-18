import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/main_background.jpg" alt="Students in classroom" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[var(--primary)]/68 dark:bg-black/62" />
      </div>

      <div className="relative mx-auto grid min-h-[560px] w-full max-w-7xl items-center gap-8 px-4 py-14 lg:grid-cols-[1.15fr_1fr]">
        <div className="text-white">
          <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
            Empowering Bright <span className="text-[var(--accent)]">Futures</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/95 md:text-xl">
            CORE Educational Services is a nonprofit organization supporting youth academically, socially, and
            spiritually through year-round educational programs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/events"
              className="rounded-full bg-[#2f45a8] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#23398f]"
            >
              Explore Events
            </Link>
            <Link
              href="/programs"
              className="rounded-full border border-white bg-black/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#223e92]"
            >
              View Programs
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl shadow-2xl">
            <article className="bg-[#c2d8e8] p-5">
              <h3 className="text-base font-semibold text-slate-900">Community Service</h3>
              <p className="mt-2 text-sm text-slate-700">Helping youth practice service, empathy, and civic responsibility.</p>
            </article>
            <article className="bg-[var(--accent-warm)] p-5">
              <h3 className="text-base font-semibold text-slate-900">Educational Programs</h3>
              <p className="mt-2 text-sm text-slate-800">Year-round mentoring and learning activities for student success.</p>
            </article>
          </div>
          <article className="rounded-2xl bg-white/95 p-6 shadow-2xl">
            <h2 className="text-4xl font-semibold leading-tight text-slate-900">Building Strong Foundations for Lifelong Learning</h2>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              CORE Educational Services develops confident learners through academic guidance, character formation, and
              leadership-centered programming designed for real community impact.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
