import Image from "next/image";
import Link from "next/link";

const paymentOptions = [
  { label: "Donate via Zelle", href: "#" },
  { label: "Donate via PayPal", href: "#" },
  { label: "Donate via Credit Card", href: "#" },
  { label: "Donate via Debit Card", href: "#" },
  { label: "Donate via ACH / Bank Transfer", href: "#" },
  { label: "Donate via Check", href: "#" },
];

export default function DonatePage() {
  return (
    <section className="bg-[var(--surface)] py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-[var(--primary)]">Donate</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-700">
          CORE Educational Services is a nonprofit organization and recognized as tax-exempt under applicable federal
          law. Donations may be tax-deductible to the extent permitted by law. Please keep your donation receipt for
          your records.
        </p>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-700">
          Choose a payment option below. Each button will redirect to the corresponding secure donation method once
          final links are added.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {paymentOptions.map((option) => (
            <Link
              key={option.label}
              href={option.href}
              className="group inline-flex min-h-[90px] items-center gap-4 rounded-2xl bg-[#1a95a3] px-6 py-5 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#178796]"
            >
              <Image
                src="/images/core-logo-square.png"
                alt="CORE Educational Services logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-md bg-white/10 object-contain"
              />
              <span className="text-2xl font-semibold leading-tight text-white">{option.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
