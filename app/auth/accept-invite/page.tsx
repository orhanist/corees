import { AcceptInviteForm } from "@/components/auth/AcceptInviteForm";

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const resolved = await searchParams;
  const token = resolved.token ?? "";

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center px-4 py-12">
      <section className="w-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Accept admin invite</h1>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
          Create your secure password and continue to passkey setup.
        </p>
        {token ? (
          <AcceptInviteForm token={token} />
        ) : (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
            Invite token is missing or invalid.
          </p>
        )}
      </section>
    </div>
  );
}
