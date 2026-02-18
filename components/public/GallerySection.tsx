import Image from "next/image";
import { Play } from "lucide-react";

const galleryItems = [
  "/images/placeholder-1.png",
  "/images/placeholder-9.png",
  "/images/placeholder-10.png",
  "/images/placeholder-3.png",
  "/images/placeholder-5.png",
];

export function GallerySection() {
  return (
    <section className="bg-[#f1f1f1] dark:bg-[var(--surface)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-14">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Media Highlights</h2>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
          Replace these with your final photos and reels. The layout already matches the visual style you shared.
        </p>

        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {galleryItems.map((image, index) => (
            <div key={image + index} className="relative h-48 overflow-hidden border border-slate-300 dark:border-slate-700">
              <Image src={image} alt={`Gallery placeholder ${index + 1}`} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-white/90 p-3 text-[var(--primary)]">
                  <Play size={20} fill="currentColor" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
