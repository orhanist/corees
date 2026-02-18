import Image from "next/image";
import Link from "next/link";
import { ContentPageLayout } from "@/components/public/ContentPageLayout";

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
    <ContentPageLayout
      title="Donate"
      lead={
        <>
          CORE Educational Services is a nonprofit organization and recognized as tax-exempt under applicable federal
          law. Donations may be tax-deductible to the extent permitted by law. Please keep your donation receipt for
          your records.
          <br />
          Choose a payment option below. Each button will redirect to the corresponding secure donation method once
          final links are added.
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
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
    </ContentPageLayout>
  );
}
