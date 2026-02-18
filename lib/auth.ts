import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Role } from "@prisma/client";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import type { AuthenticatorDevice } from "@simplewebauthn/types";
import { z } from "zod";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { verifyPassword } from "@/lib/security/password";
import { writeAuditLog } from "@/lib/security/audit";

function base64ToUint8Array(value: string): Uint8Array {
  try {
    return new Uint8Array(Buffer.from(value, "base64url"));
  } catch {
    return new Uint8Array(Buffer.from(value, "base64"));
  }
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  passkeyAssertion: z.string().optional(),
});

async function handleFailedLogin(userId?: string) {
  if (!userId) return;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { failedLoginCount: true },
  });
  const nextFailedCount = (user?.failedLoginCount ?? 0) + 1;
  const lockMinutes = nextFailedCount >= 5 ? Math.min(30, nextFailedCount) : 0;

  await prisma.user.update({
    where: { id: userId },
    data: {
      failedLoginCount: nextFailedCount,
      lockedUntil: lockMinutes ? new Date(Date.now() + lockMinutes * 60_000) : null,
    },
  });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        passkeyAssertion: { label: "Passkey assertion", type: "text" },
      },
      async authorize(rawCredentials, request) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const email = parsed.data.email.toLowerCase();
        const password = parsed.data.password;
        const passkeyAssertion = parsed.data.passkeyAssertion;
        const ip = request?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

        const limit = checkRateLimit(`signin:${email}:${ip}`);
        if (!limit.allowed) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
          include: { passkeys: true },
        });
        if (!user || !user.passwordHash) return null;

        if (user.lockedUntil && user.lockedUntil > new Date()) {
          return null;
        }

        const validPassword = await verifyPassword(user.passwordHash, password);
        if (!validPassword) {
          await handleFailedLogin(user.id);
          await writeAuditLog({
            actorId: user.id,
            action: "auth.failed_password",
            ipAddress: ip,
          });
          return null;
        }

        const hasPasskey = user.passkeys.length > 0;
        if (user.mfaRequired && hasPasskey) {
          if (!passkeyAssertion || !user.currentChallenge || !user.currentChallengeExpires) {
            return null;
          }
          if (user.currentChallengeExpires < new Date()) {
            return null;
          }

          const assertion = JSON.parse(passkeyAssertion) as Parameters<typeof verifyAuthenticationResponse>[0]["response"];
          const authenticators: AuthenticatorDevice[] = user.passkeys.map((credential) => ({
            credentialID: base64ToUint8Array(credential.credentialId),
            credentialPublicKey: base64ToUint8Array(credential.credentialPublicKey),
            counter: credential.counter,
            transports: credential.transports as ("ble" | "hybrid" | "internal" | "nfc" | "usb")[],
          }));
          const matchingAuthenticator = authenticators.find(
            (credential) => Buffer.from(credential.credentialID).toString("base64url") === assertion.id
          );
          if (!matchingAuthenticator) {
            await handleFailedLogin(user.id);
            return null;
          }

          const verification = await verifyAuthenticationResponse({
            response: assertion,
            expectedChallenge: user.currentChallenge,
            expectedOrigin: env.AUTH_WEBAUTHN_ORIGIN,
            expectedRPID: env.AUTH_WEBAUTHN_RP_ID,
            authenticator: matchingAuthenticator,
          });

          if (!verification.verified || !verification.authenticationInfo) {
            await handleFailedLogin(user.id);
            await writeAuditLog({
              actorId: user.id,
              action: "auth.failed_passkey",
              ipAddress: ip,
            });
            return null;
          }

          const usedCredentialId = assertion.id;
          await prisma.passkeyCredential.update({
            where: { credentialId: usedCredentialId },
            data: {
              counter: verification.authenticationInfo.newCounter,
              lastUsedAt: new Date(),
            },
          });
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginCount: 0,
            lockedUntil: null,
            currentChallenge: null,
            currentChallengeExpires: null,
            lastLoginAt: new Date(),
          },
        });
        await writeAuditLog({
          actorId: user.id,
          action: "auth.login_success",
          ipAddress: ip,
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          passkeyEnrolled: hasPasskey,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
    updateAge: 60 * 30,
  },
  pages: {
    signIn: "/auth/signin",
  },
  trustHost: env.AUTH_TRUST_HOST === "true",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = (user as { role?: Role }).role;
        token.passkeyEnrolled = Boolean((user as { passkeyEnrolled?: boolean }).passkeyEnrolled);
      } else if (token.userId) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.userId as string },
          select: { role: true, passkeys: { select: { id: true }, take: 1 } },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.passkeyEnrolled = dbUser.passkeys.length > 0;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as Role;
        session.user.passkeyEnrolled = Boolean(token.passkeyEnrolled);
      }
      return session;
    },
  },
});
