import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";

function XBrandIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.53 3H21l-7.58 8.67L22.3 21h-6.96l-5.45-6.25L4.42 21H1l8.1-9.26L1.7 3h7.06l4.92 5.65L17.53 3Zm-1.22 15.91h1.92L7.72 5H5.67l10.64 13.91Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0c1830] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1.25fr_0.9fr_0.85fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/core-logo-square.png" alt="CORE icon" width={40} height={40} className="h-10 w-10" />
            <h3 className="text-lg font-semibold">CORE Educational Services</h3>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/80">
            We are a Virginia-based nonprofit committed to helping youth build strong academic foundations, confidence,
            and leadership through inclusive programs, mentorship, and community partnership.
          </p>
        </div>
        <div className="md:justify-self-center">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/90">Quick Links</h4>
          <div className="mt-2 flex flex-col gap-1.5 text-sm text-white/80">
            <Link href="/about">About Us</Link>
            <Link href="/events">Events</Link>
            <Link href="/registration">Registration</Link>
            <Link href="/registration/summer-camp">Summer Camp</Link>
            <Link href="/registration/corecare-scholarship">CoreCare Scholarship</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="md:justify-self-end">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/90">Contact</h4>
          <a
            href="https://share.google/F8zgB1qb7O0szOSms"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-sm text-white/80 underline-offset-2 transition hover:text-white hover:underline"
          >
            14120 Newbrook Dr Suite 200, Chantilly, VA 20151
          </a>
          <a href="mailto:info@core-es.org" className="text-sm text-white/80 underline-offset-2 transition hover:text-white hover:underline">
            info@core-es.org
          </a>
          <div className="mt-3 flex items-center gap-2">
            <a
              href="https://instagram.com/corees_va"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-white/85 transition hover:border-white hover:text-white"
            >
              <Instagram size={13} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-white/85 transition hover:border-white hover:text-white"
            >
              <Facebook size={13} />
            </a>
            <a
              href="https://www.linkedin.com/company/core-educational-services-va/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-white/85 transition hover:border-white hover:text-white"
            >
              <Linkedin size={13} />
            </a>
            <a
              href="https://x.com/corees_va"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-white/85 transition hover:border-white hover:text-white"
            >
              <XBrandIcon size={13} />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-3 px-4 pb-2">
        <Link
          href="/terms"
          className="inline-flex rounded-md border border-[var(--accent)] px-2.5 py-1 text-xs font-medium text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[#0c1830]"
        >
          Terms & Conditions
        </Link>
        <Link
          href="/privacy"
          className="inline-flex rounded-md border border-[var(--accent)] px-2.5 py-1 text-xs font-medium text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[#0c1830]"
        >
          Privacy Policy
        </Link>
        <Link
          href="/refund"
          className="inline-flex rounded-md border border-[var(--accent)] px-2.5 py-1 text-xs font-medium text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[#0c1830]"
        >
          Refund Policy
        </Link>
      </div>
      <div className="border-t border-white/15 py-2 text-center text-[11px] text-white/70">
        Copyright © {new Date().getFullYear()} CORE Educational Services. All Rights Reserved.
      </div>
    </footer>
  );
}
