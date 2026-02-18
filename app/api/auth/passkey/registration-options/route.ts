import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";
import { generateRegistrationOptions } from "@simplewebauthn/server";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

function base64UrlToBytes(value: string): Uint8Array {
  return new Uint8Array(Buffer.from(value, "base64url"));
}

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { passkeys: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const options = await generateRegistrationOptions({
    rpName: env.AUTH_WEBAUTHN_RP_NAME,
    rpID: env.AUTH_WEBAUTHN_RP_ID,
    userName: user.email,
    userDisplayName: user.name ?? user.email,
    userID: user.id,
    timeout: 60000,
    attestationType: "none",
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "required",
    },
    excludeCredentials: user.passkeys.map((credential) => ({
      id: base64UrlToBytes(credential.credentialId),
      type: "public-key",
      transports: credential.transports as ("ble" | "hybrid" | "internal" | "nfc" | "usb")[],
    })),
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      currentChallenge: options.challenge,
      currentChallengeExpires: new Date(Date.now() + 1000 * 60 * 5),
    },
  });

  return NextResponse.json({ options });
}
