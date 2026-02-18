import Link from "next/link";
import { ContentPageLayout } from "@/components/public/ContentPageLayout";

export default function SummerCampRegistrationPage() {
  return (
    <ContentPageLayout
      title="Summer Camp Registration"
      lead="This page is ready for your full camp registration form. We can add student details, parent details, emergency contact, agreements, and payment placeholder fields next."
    >
      <Link href="/registration" className="text-sm font-medium text-[var(--accent)] hover:underline">
        ← Back to Registration
      </Link>
    </ContentPageLayout>
  );
}
