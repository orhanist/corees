export function VideoShowcaseSection() {
  return (
    <section className="bg-[#f1f1f1] py-12">
      <div className="mx-auto grid w-full max-w-7xl gap-7 px-4 md:grid-cols-2">
        <div className="aspect-video overflow-hidden rounded-3xl border border-slate-300 bg-black">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Featured video one"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="aspect-video overflow-hidden rounded-3xl border border-slate-300 bg-black">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/3JZ_D3ELwOQ"
            title="Featured video two"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
