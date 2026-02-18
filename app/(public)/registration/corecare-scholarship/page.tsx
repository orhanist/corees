import Link from "next/link";
import { ContentPageLayout } from "@/components/public/ContentPageLayout";

export default function CoreCareScholarshipPage() {
  return (
    <ContentPageLayout
      title="CoreCare Scholarship Application (2025-26)"
      lead="Thank you for your interest in the CORE EDUCATIONAL SERVICES CORE CARE STUDENT FUND SCHOLARSHIP program. Please fill out this application form completely. Falsifications, misrepresentations, or omissions may disqualify your application. Information you provide will not be given to any other person/company. Unsigned or incomplete applications may not be considered for acceptance."
    >
      <Link href="/registration" className="text-sm font-medium text-[var(--accent)] hover:underline">
        ← Back to Registration
      </Link>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Eligibility & Requirements</h2>
          <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
            <li>
              <span className="font-semibold text-slate-900 dark:text-slate-100">Academic Merit:</span> Applicants must
              fit into one of the following categories: a. A cumulative GPA of 3.00 or higher in the U.S. for current
              college students b. An entering freshman graduating from high school with a cumulative GPA of 3.00 or
              higher in the U.S. c. An international entering freshman ranking within the top 40 percentiles on a
              nationalized standardized exam given in their home country.
            </li>
            <li>
              <span className="font-semibold text-slate-900 dark:text-slate-100">Community Services:</span> Additional
              expectations include involvement in volunteer activities and programs, including mentoring for K-12
              students or higher education students, event organizations, and related activities connected to the
              Turkish American community in Northern Virginia, DC, or Maryland.
            </li>
            <li>
              The applicant must enroll as a full-time student in a school in Virginia, DC, or Maryland.
            </li>
            <li>
              You have to submit your application by September 15th at midnight.
            </li>
          </ol>
        </div>

        <form className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <fieldset className="space-y-3">
            <legend className="text-lg font-semibold text-slate-900 dark:text-slate-100">1. Who Can Apply (check all that apply)</legend>
            <label className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"><input type="checkbox" /> College-bound high school senior, ESL student, college undergrad, or grad student</label>
            <label className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"><input type="checkbox" /> Proficient in Turkish language</label>
            <label className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"><input type="checkbox" /> U.S. Citizen or Eligible Non-Citizen</label>
          </fieldset>

          <div className="grid gap-4 md:grid-cols-2">
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="2. Applicant full name *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="3. Date of birth (MM/DD/YYYY) *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="4. Gender *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="6. Phone *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" placeholder="5. Permanent address *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" placeholder="7. Email *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="8. Undergrad or grad student? *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="9. Current School *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="10. Current School email *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="12. Current School Telephone Number *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" placeholder="11. Current School Address *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="13. Current School start year *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="14. Under expulsion from school/district? *" />
            <textarea className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" rows={3} placeholder="15. If YES, please explain" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="16. Last year's GPA *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="17. Do you work? *" />
            <textarea className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" rows={3} placeholder="18. If YES, explain hours and monthly earnings" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="19. Do you get other scholarships? *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="20. Scholarship amount/institution (if any)" />
            <textarea className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" rows={3} placeholder="21. Honors, awards, achievements" />
            <textarea className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" rows={3} placeholder="22. Talents, interests, hobbies, clubs, activities *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" placeholder="23. Criminal/legal history (No/Yes) *" />
            <textarea className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" rows={3} placeholder="24. If yes, please explain" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="25. Applicant parent full name *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="26. Relationship to applicant *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" placeholder="27. Family address *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="28. Family phone number *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="29. Family email address *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="30. Family employer name" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="31. Family employer address" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="32. Family work phone" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950" placeholder="33. Annual family total income ($) *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" placeholder="34. Applicant lives with *" />
            <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-950 md:col-span-2" placeholder="35. Relationship with CORE executive/board member? *" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Required Uploads</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <label className="rounded-md border border-dashed border-slate-300 p-3 text-sm dark:border-slate-600">ID or Passport *</label>
              <label className="rounded-md border border-dashed border-slate-300 p-3 text-sm dark:border-slate-600">Current Year Student ID *</label>
              <label className="rounded-md border border-dashed border-slate-300 p-3 text-sm dark:border-slate-600">Transcript of year 2024-2025 *</label>
              <label className="rounded-md border border-dashed border-slate-300 p-3 text-sm dark:border-slate-600">Registration transcript of year 2025-2026 *</label>
              <label className="rounded-md border border-dashed border-slate-300 p-3 text-sm dark:border-slate-600 md:col-span-2">Resume *</label>
            </div>
          </div>

          <div className="space-y-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-950">
            <label className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" />
              I certify the information provided is complete and accurate. I understand false statements may result in
              rejection or future dismissal of the applicant. *
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-900" placeholder="Applicant Name *" />
              <input className="h-11 rounded-md border border-slate-300 px-3 text-sm dark:border-slate-600 dark:bg-slate-900" placeholder="Signature *" />
            </div>
          </div>

          <button
            type="button"
            className="rounded-full bg-[var(--primary)] px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-light)]"
          >
            Submit
          </button>
        </form>
    </ContentPageLayout>
  );
}
