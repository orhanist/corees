"use client";

import { signOut } from "next-auth/react";

type TopBarProps = {
  name?: string | null;
  role: "SUPERADMIN" | "COORDINATOR";
};

export function AdminTopBar({ name, role }: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
      <div>
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Admin Dashboard</p>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {name ?? "Admin"} · {role}
        </p>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900"
      >
        Sign out
      </button>
    </header>
  );
}
