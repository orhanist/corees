"use client";

import { FormEvent, useState } from "react";

type Role = "SUPERADMIN" | "COORDINATOR";

type UserRecord = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
};

type InviteRecord = {
  id: string;
  email: string;
  role: Role;
  expiresAt: string | Date;
  revokedAt: string | Date | null;
  acceptedAt: string | Date | null;
};

type UserManagerProps = {
  users: UserRecord[];
  invites: InviteRecord[];
};

export function UserManager({ users: initialUsers, invites: initialInvites }: UserManagerProps) {
  const [users, setUsers] = useState(initialUsers);
  const [invites, setInvites] = useState(initialInvites);
  const [newInviteEmail, setNewInviteEmail] = useState("");
  const [newInviteRole, setNewInviteRole] = useState<Role>("COORDINATOR");
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function refreshData() {
    const response = await fetch("/api/admin/invites");
    if (!response.ok) return;
    const payload = (await response.json()) as { users: UserRecord[]; invites: InviteRecord[] };
    setUsers(payload.users);
    setInvites(payload.invites);
  }

  async function handleInviteSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setInviteLink(null);

    const response = await fetch("/api/admin/invites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newInviteEmail, role: newInviteRole }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({ error: "Request failed" }))) as { error?: string };
      setError(payload.error ?? "Unable to create invite.");
      return;
    }

    const payload = (await response.json()) as { inviteLink: string };
    setInviteLink(payload.inviteLink);
    setNewInviteEmail("");
    setNewInviteRole("COORDINATOR");
    await refreshData();
  }

  async function handleRoleChange(userId: string, role: Role) {
    setError(null);
    const response = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      setError("Could not update role.");
      return;
    }
    await refreshData();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Create admin invite</h2>
        <form className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]" onSubmit={handleInviteSubmit}>
          <input
            type="email"
            required
            value={newInviteEmail}
            onChange={(event) => setNewInviteEmail(event.target.value)}
            placeholder="admin@yourorg.org"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
          <select
            value={newInviteRole}
            onChange={(event) => setNewInviteRole(event.target.value as Role)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            <option value="COORDINATOR">Coordinator</option>
            <option value="SUPERADMIN">Superadmin</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-light)]"
          >
            Generate invite
          </button>
        </form>
        {inviteLink ? (
          <p className="mt-3 break-all text-sm text-emerald-700 dark:text-emerald-400">
            One-time invite link: {inviteLink}
          </p>
        ) : null}
        {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Current admins</h2>
        <div className="mt-3 space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user.name ?? user.email}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">{user.email}</p>
              </div>
              <select
                value={user.role}
                onChange={(event) => handleRoleChange(user.id, event.target.value as Role)}
                className="rounded-md border border-slate-300 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="COORDINATOR">Coordinator</option>
                <option value="SUPERADMIN">Superadmin</option>
              </select>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent invites</h2>
        <div className="mt-3 space-y-2">
          {invites.map((invite) => (
            <div key={invite.id} className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
              <p className="font-medium text-slate-900 dark:text-slate-100">
                {invite.email} · {invite.role}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                expires {new Date(invite.expiresAt).toLocaleString()} ·{" "}
                {invite.revokedAt ? "revoked" : invite.acceptedAt ? "accepted" : "pending"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
