"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, LayoutDashboard, Shield, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  role: "SUPERADMIN" | "COORDINATOR";
};

const baseLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: Calendar },
];

export function AdminSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const links = role === "SUPERADMIN" ? [...baseLinks, { href: "/admin/users", label: "User Access", icon: Users }] : baseLinks;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-4 lg:block dark:border-slate-800 dark:bg-slate-950">
      <p className="px-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Admin</p>
      <nav className="mt-3 space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium transition",
                active
                  ? "bg-[#e8eeff] text-[#233f95] dark:bg-slate-800 dark:text-slate-100"
                  : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-lg border border-slate-200 p-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
        <div className="mb-1 flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-100">
          <Shield size={14} />
          Security
        </div>
        Password + passkey required.
      </div>
    </aside>
  );
}
