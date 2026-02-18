import { redirect } from "next/navigation";
import { UserManager } from "@/components/admin/UserManager";
import { auth } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/admin/users");
  }
  if (!canManageUsers(session.user.role)) {
    redirect("/admin/forbidden");
  }

  let users = [] as Array<{ id: string; email: string; name: string | null; role: "SUPERADMIN" | "COORDINATOR" }>;
  let invites = [] as Array<{
    id: string;
    email: string;
    role: "SUPERADMIN" | "COORDINATOR";
    expiresAt: Date;
    revokedAt: Date | null;
    acceptedAt: Date | null;
  }>;

  try {
    [users, invites] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      }),
      prisma.adminInvite.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          email: true,
          role: true,
          expiresAt: true,
          revokedAt: true,
          acceptedAt: true,
        },
      }),
    ]);
  } catch {
    // Keep page accessible even if DB is down.
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">User Access</h1>
      <UserManager users={users} invites={invites} />
    </section>
  );
}
