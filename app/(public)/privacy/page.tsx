export default function PrivacyPage() {
  return (
    <section className="bg-[var(--surface)] py-16">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Last updated: February 18, 2026</p>

        <div className="mt-8 space-y-7 rounded-2xl bg-white p-8 text-sm leading-7 text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300">
          <p>
            CORE Educational Services respects your privacy. This policy describes how we collect, use, disclose, and
            protect personal information through our website and related program forms.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">1. Information We Collect</h2>
            <p className="mt-2">Depending on the form you submit, we may collect:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Contact details (name, email, phone, address)</li>
              <li>Student/parent information for registrations</li>
              <li>Application data (essays, educational details, uploads)</li>
              <li>Newsletter sign-up and communication preferences</li>
              <li>Basic technical data (IP address, browser/device, page usage)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">2. How We Use Information</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Operate and improve educational programs and services</li>
              <li>Process registrations, applications, and inquiries</li>
              <li>Communicate with families, participants, and volunteers</li>
              <li>Maintain program safety, integrity, and fraud prevention</li>
              <li>Comply with legal, tax, and nonprofit reporting obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">3. Legal and Compliance Context</h2>
            <p className="mt-2">
              CORE operates in Virginia and the U.S. We aim to comply with applicable law, including state consumer
              protection requirements and applicable data-security obligations.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Children: COPPA-related expectations for online collection from children under 13</li>
              <li>Education context: FERPA considerations when working with school partners</li>
              <li>Virginia residents: Virginia Consumer Data Protection Act (VCDPA), where applicable</li>
              <li>Data incident response consistent with Virginia breach-notification requirements</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">4. Sharing Information</h2>
            <p className="mt-2">We do not sell personal information. We may share data with:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Service providers (hosting, forms, email, cloud storage, analytics)</li>
              <li>Payment processors for donation/program payments</li>
              <li>Regulators, auditors, or law enforcement when legally required</li>
              <li>Authorized school or partner contacts when necessary for program operation</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">5. Cookies and Tracking</h2>
            <p className="mt-2">
              We may use cookies and similar tools to improve website performance, analytics, and user experience. You
              can control cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">6. Data Retention and Security</h2>
            <p className="mt-2">
              We retain information only as long as needed for program delivery, legal compliance, and nonprofit
              record-keeping. We use administrative, technical, and organizational safeguards to protect information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">7. Your Rights</h2>
            <p className="mt-2">
              You may request access, correction, deletion, or limited processing of your personal information, subject
              to legal exceptions. Virginia residents may also have additional rights under the VCDPA, when applicable.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">8. Third-Party Links</h2>
            <p className="mt-2">
              Our website may link to platforms like YouTube, Instagram, and payment services. Their privacy practices
              are governed by their own policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">9. Policy Updates</h2>
            <p className="mt-2">
              We may revise this policy periodically. Updated versions will be posted on this page with a revised date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">10. Contact</h2>
            <p className="mt-2">Email privacy requests to info@core-es.org.</p>
          </div>

          <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            Compliance note: privacy requirements vary by operations and scale. Have this policy reviewed by qualified
            legal counsel for final production use.
          </p>
        </div>
      </div>
    </section>
  );
}
