import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { writeAuditLog } from "@/lib/security/audit";

const bodySchema = z.object({
  response: z.any(),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      currentChallenge: true,
      currentChallengeExpires: true,
    },
  });

  if (!user?.currentChallenge || !user.currentChallengeExpires || user.currentChallengeExpires < new Date()) {
    return NextResponse.json({ error: "Challenge expired" }, { status: 400 });
  }

  const verification = await verifyRegistrationResponse({
    response: parsed.data.response,
    expectedChallenge: user.currentChallenge,
    expectedOrigin: env.AUTH_WEBAUTHN_ORIGIN,
    expectedRPID: env.AUTH_WEBAUTHN_RP_ID,
  });

  if (!verification.verified || !verification.registrationInfo) {
    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  }

  const credentialId = Buffer.from(verification.registrationInfo.credentialID).toString("base64url");
  const credentialPublicKey = verification.registrationInfo.credentialPublicKey;

  await prisma.passkeyCredential.upsert({
    where: { credentialId },
    update: {
      credentialPublicKey: Buffer.from(credentialPublicKey).toString("base64"),
      counter: verification.registrationInfo.counter,
      deviceType: verification.registrationInfo.credentialDeviceType,
      backedUp: verification.registrationInfo.credentialBackedUp,
      transports: parsed.data.response.response.transports ?? [],
    },
    create: {
      userId: session.user.id,
      credentialId,
      credentialPublicKey: Buffer.from(credentialPublicKey).toString("base64"),
      counter: verification.registrationInfo.counter,
      deviceType: verification.registrationInfo.credentialDeviceType,
      backedUp: verification.registrationInfo.credentialBackedUp,
      transports: parsed.data.response.response.transports ?? [],
    },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      currentChallenge: null,
      currentChallengeExpires: null,
    },
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "auth.passkey_registered",
  });

  return NextResponse.json({ ok: true });
}
