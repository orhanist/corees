import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/security/rate-limit";

function base64UrlToBytes(value: string): Uint8Array {
  return new Uint8Array(Buffer.from(value, "base64url"));
}

const requestSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limiter = checkRateLimit(`passkey-auth-options:${ip}`);
  if (!limiter.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ available: false }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
    include: { passkeys: true },
  });

  if (!user || user.passkeys.length === 0) {
    return NextResponse.json({ available: false });
  }

  const options = await generateAuthenticationOptions({
    rpID: env.AUTH_WEBAUTHN_RP_ID,
    userVerification: "required",
    allowCredentials: user.passkeys.map((credential: { credentialId: string; transports: string | null }) => {
      let transports: ("ble" | "hybrid" | "internal" | "nfc" | "usb")[] = [];
      try {
        transports = credential.transports ? JSON.parse(credential.transports) : [];
      } catch {
        transports = [];
      }
      return {
        id: base64UrlToBytes(credential.credentialId),
        type: "public-key",
        transports,
      };
    }),
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      currentChallenge: options.challenge,
      currentChallengeExpires: new Date(Date.now() + 1000 * 60 * 5),
    },
  });

  return NextResponse.json({ available: true, options });
}
