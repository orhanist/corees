import Image from "next/image";

export function YoutubeCtaSection() {
  return (
    <section className="bg-[var(--accent-warm)]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-[0.7fr_1.3fr]">
        <div className="relative h-44 overflow-hidden rounded-2xl bg-white p-3">
          <Image src="/images/programs/nurify.png" alt="Nurify logo" fill className="object-contain p-4" />
        </div>
        <div>
          <h2 className="text-5xl font-bold text-white">Check out our YouTube Channel</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/90">
            Watch Nurify content and support the community by subscribing to the official channel.
          </p>
          <a
            href="https://www.youtube.com/@NurifyTV"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-white px-7 py-3 text-xs font-semibold uppercase tracking-wide text-slate-800"
          >
            Subscribe Now
          </a>
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl px-4 pb-12">
        <div className="aspect-video overflow-hidden rounded-2xl border border-white/40 bg-black/20 shadow-lg">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/xzB-JJr57UU"
            title="Nurify featured video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
