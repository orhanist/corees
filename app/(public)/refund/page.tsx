export default function RefundPolicyPage() {
  return (
    <section className="bg-[var(--surface)] py-16">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Refund Policy</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Last updated: February 18, 2026</p>

        <div className="mt-8 space-y-7 rounded-2xl bg-white p-8 text-sm leading-7 text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300">
          <p>
            CORE Educational Services is a nonprofit organization. This policy explains how donations and program fee
            refunds are handled to ensure fairness, compliance, and financial stewardship.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">1. Charitable Donations</h2>
            <p className="mt-2">
              Donations are generally non-refundable because they are treated as charitable contributions supporting our
              mission. If a donation was made in error (duplicate/incorrect amount), contact us promptly for review.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">2. Program Registration Fees</h2>
            <p className="mt-2">If your program includes a fee, the following baseline applies unless a program page states otherwise:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Full refund when cancellation request is made at least 14 days before start date</li>
              <li>50% refund when cancellation request is made 7-13 days before start date</li>
              <li>No refund for cancellations made within 7 days of start date</li>
            </ul>
            <p className="mt-2">
              Approved emergency exceptions may be considered case-by-case at CORE&apos;s discretion.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">3. Program Cancellation by CORE</h2>
            <p className="mt-2">
              If CORE cancels a paid program session, participants are eligible for either a full refund or transfer
              of credit to another program cycle.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">4. Scholarship Applications</h2>
            <p className="mt-2">
              Scholarship application submissions are generally non-refundable unless an explicit application fee policy
              is published for that program.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">5. Payment Disputes and Chargebacks</h2>
            <p className="mt-2">
              If you believe a charge is unauthorized, contact us first so we can investigate and resolve quickly.
              Initiating a chargeback may delay your registration review until the case is resolved.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">6. Processing Time</h2>
            <p className="mt-2">
              Approved refunds are typically processed within 7-14 business days, depending on payment processor and
              financial institution timelines.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">7. How to Request a Refund</h2>
            <p className="mt-2">
              Email info@core-es.org with the payer name, email, transaction date, amount, and reason for request.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">8. Policy Updates</h2>
            <p className="mt-2">
              CORE may update this refund policy periodically for legal and operational compliance. Updated terms will
              be published on this page.
            </p>
          </div>

          <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            Compliance note: refund obligations can vary by payment method, grant terms, and state/federal law. Obtain
            legal/accounting review for final production policy.
          </p>
        </div>
      </div>
    </section>
  );
}
