import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { requireSuperadminSession } from "@/lib/server-auth";
import { writeAuditLog } from "@/lib/security/audit";
import { createInviteToken } from "@/lib/security/tokens";

const createInviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["SUPERADMIN", "COORDINATOR"]),
});

export async function GET() {
  const { session, response } = await requireSuperadminSession();
  if (!session) return response!;

  const [users, invites] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, name: true, role: true },
    }),
    prisma.adminInvite.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        email: true,
        role: true,
        expiresAt: true,
        acceptedAt: true,
        revokedAt: true,
      },
    }),
  ]);

  return NextResponse.json({ users, invites });
}

export async function POST(request: Request) {
  const { session, response } = await requireSuperadminSession();
  if (!session) return response!;

  const body = await request.json().catch(() => null);
  const parsed = createInviteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { plainToken, tokenHash } = createInviteToken();
  const invite = await prisma.adminInvite.create({
    data: {
      email: parsed.data.email.toLowerCase(),
      role: parsed.data.role,
      tokenHash,
      createdById: session.user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
    select: { id: true },
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "admin.invite_created",
    targetId: invite.id,
    metadata: { email: parsed.data.email, role: parsed.data.role },
  });

  const inviteLink = `${env.AUTH_WEBAUTHN_ORIGIN}/auth/accept-invite?token=${encodeURIComponent(plainToken)}`;
  return NextResponse.json({ inviteLink });
}
