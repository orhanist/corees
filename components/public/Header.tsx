"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Facebook, Instagram, Linkedin, Menu, X as CloseIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Programs", href: "/programs" },
  {
    label: "Registration",
    href: "/registration",
    children: [
      { label: "Summer Camp Registration", href: "/registration/summer-camp" },
      { label: "CoreCare Scholarship Application", href: "/registration/corecare-scholarship" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#dbe5f2] bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/core-logo-square.png"
            alt="CORE icon"
            width={52}
            height={52}
            className="h-12 w-12 rounded-sm object-contain"
          />
          <div className="leading-tight">
            <p className="text-2xl font-semibold tracking-tight text-[var(--primary)]">CORE EDUCATIONAL SERVICES</p>
            <p className="text-sm font-medium text-[var(--primary)]">For Next Generation</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 text-base font-medium text-slate-700 transition-colors hover:text-[var(--primary)] dark:text-slate-200"
                >
                  {link.label}
                  <ChevronDown size={14} />
                </Link>
                <div className="invisible absolute left-0 top-full z-50 mt-2 w-72 rounded-md border border-slate-200 bg-white py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:border-slate-700 dark:bg-slate-900">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[var(--primary)] dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-slate-700 transition-colors hover:text-[var(--primary)] dark:text-slate-200"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/donate"
            className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold !text-white transition hover:bg-[var(--primary-light)] hover:!text-white"
          >
            Donation
          </Link>
          <div className="ml-1 flex items-center gap-1.5 border-l border-slate-200 pl-3 text-slate-700 dark:border-slate-700 dark:text-slate-200">
            <a
              href="https://instagram.com/corees_va"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-[var(--primary)] hover:text-[var(--primary)] dark:border-slate-600 dark:text-slate-200"
            >
              <Instagram size={13} />
            </a>
            <a
              href="https://www.facebook.com/CoreEducationVA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-[var(--primary)] hover:text-[var(--primary)] dark:border-slate-600 dark:text-slate-200"
            >
              <Facebook size={13} />
            </a>
            <a
              href="https://www.linkedin.com/company/core-educational-services-va/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:border-[var(--primary)] hover:text-[var(--primary)] dark:border-slate-600 dark:text-slate-200"
            >
              <Linkedin size={13} />
            </a>
          </div>
        </nav>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-md p-2 text-slate-700 dark:text-slate-200 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-[#dbe5f2] bg-white lg:hidden dark:border-slate-700 dark:bg-slate-900",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav className="mx-auto flex w-full max-w-7xl flex-col px-4 py-3">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="rounded-md px-2 py-2 text-sm text-slate-700">
                <Link href={link.href} onClick={() => setMobileOpen(false)} className="font-medium">
                  {link.label}
                </Link>
                <div className="mt-2 flex flex-col gap-1 border-l border-slate-200 pl-3">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md py-1 text-xs text-slate-600 hover:text-[var(--primary)]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/donate"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-md bg-[var(--primary)] px-2 py-2 text-center text-sm font-semibold !text-white"
          >
            Donation
          </Link>
          <div className="mt-3 flex items-center gap-2 px-2 text-slate-700 dark:text-slate-200">
            <a
              href="https://instagram.com/corees_va"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 transition hover:border-[var(--primary)] hover:text-[var(--primary)] dark:border-slate-600"
            >
              <Instagram size={13} />
            </a>
            <a
              href="https://www.facebook.com/CoreEducationVA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 transition hover:border-[var(--primary)] hover:text-[var(--primary)] dark:border-slate-600"
            >
              <Facebook size={13} />
            </a>
            <a
              href="https://www.linkedin.com/company/core-educational-services-va/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 transition hover:border-[var(--primary)] hover:text-[var(--primary)] dark:border-slate-600"
            >
              <Linkedin size={13} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
