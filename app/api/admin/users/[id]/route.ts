import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSuperadminSession } from "@/lib/server-auth";
import { writeAuditLog } from "@/lib/security/audit";

const bodySchema = z.object({
  role: z.enum(["SUPERADMIN", "COORDINATOR"]),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, response } = await requireSuperadminSession();
  if (!session) return response!;

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { id } = await params;
  if (id === session.user.id && parsed.data.role !== "SUPERADMIN") {
    return NextResponse.json({ error: "You cannot downgrade your own role." }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role: parsed.data.role },
    select: { id: true, email: true, role: true },
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "admin.user_role_updated",
    targetId: user.id,
    metadata: { role: user.role, email: user.email },
  });

  return NextResponse.json({ ok: true, user });
}
