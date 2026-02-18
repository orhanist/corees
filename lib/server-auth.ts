import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { canManageInvites } from "@/lib/permissions";

export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user?.id) {
    return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session, response: null };
}

export async function requireSuperadminSession() {
  const result = await requireAdminSession();
  if (!result.session) return result;

  if (!canManageInvites(result.session.user.role)) {
    return { session: null, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { session: result.session, response: null };
}
