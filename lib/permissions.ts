import type { Role } from "@prisma/client";

export function isSuperadmin(role?: Role | null): boolean {
  return role === "SUPERADMIN";
}

export function canManageUsers(role?: Role | null): boolean {
  return role === "SUPERADMIN";
}

export function canManageInvites(role?: Role | null): boolean {
  return role === "SUPERADMIN";
}

export function canPostEvents(role?: Role | null): boolean {
  return role === "SUPERADMIN" || role === "COORDINATOR";
}

export function canViewSubmissions(role?: Role | null): boolean {
  return role === "SUPERADMIN" || role === "COORDINATOR";
}
