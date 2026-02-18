import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { AdminTopBar } from "@/components/admin/TopBar";
import { auth } from "@/lib/auth";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar role={session.user.role} />
      <div className="flex min-h-screen flex-1 flex-col">
        <AdminTopBar name={session.user.name} role={session.user.role} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
