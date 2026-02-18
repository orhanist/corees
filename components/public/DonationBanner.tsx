import Link from "next/link";
import Image from "next/image";

export function DonationBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/main_background.jpg" alt="Students learning" fill className="object-cover" />
        <div className="absolute inset-0 bg-[var(--primary)]/88" />
      </div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 md:flex-row md:items-center">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-white">Support education, mentorship, and youth opportunity.</h2>
          <p className="mt-2 text-sm text-white/90">
            Your contribution helps CORE expand after-school learning, scholarship support, and community programs for
            students and families across Virginia.
          </p>
        </div>
        <Link
          href="/donate"
          className="rounded-full bg-[var(--accent-warm)] px-8 py-4 text-base font-extrabold !text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#f3ab3c] hover:!text-white"
        >
          Donate Now
        </Link>
      </div>
    </section>
  );
}
