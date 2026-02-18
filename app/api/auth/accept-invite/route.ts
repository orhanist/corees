import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword, validatePasswordStrength } from "@/lib/security/password";
import { hashInviteToken } from "@/lib/security/tokens";

const bodySchema = z.object({
  token: z.string().min(1),
  name: z.string().min(1).max(120),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const passwordErrors = validatePasswordStrength(parsed.data.password);
  if (passwordErrors.length > 0) {
    return NextResponse.json({ error: passwordErrors.join(" ") }, { status: 400 });
  }

  const tokenHash = hashInviteToken(parsed.data.token);
  const invite = await prisma.adminInvite.findUnique({
    where: { tokenHash },
  });

  if (!invite || invite.revokedAt || invite.acceptedAt || invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invite link is invalid or expired" }, { status: 400 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await prisma.user.upsert({
    where: { email: invite.email.toLowerCase() },
    update: {
      name: parsed.data.name,
      role: invite.role,
      passwordHash,
      passwordSetupAt: new Date(),
      mfaRequired: true,
    },
    create: {
      email: invite.email.toLowerCase(),
      name: parsed.data.name,
      role: invite.role,
      passwordHash,
      passwordSetupAt: new Date(),
      mfaRequired: true,
    },
    select: {
      id: true,
    },
  });

  await prisma.adminInvite.update({
    where: { id: invite.id },
    data: {
      acceptedAt: new Date(),
      acceptedById: user.id,
    },
  });

  return NextResponse.json({ ok: true, email: invite.email.toLowerCase() });
}
