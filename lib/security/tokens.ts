import crypto from "node:crypto";
import { env } from "@/lib/env";

export function createInviteToken(): { plainToken: string; tokenHash: string } {
  const random = crypto.randomBytes(32).toString("base64url");
  const signature = crypto.createHmac("sha256", env.INVITE_TOKEN_SIGNING_KEY_V1).update(random).digest("base64url");
  const plainToken = `${random}.${signature}`;
  return { plainToken, tokenHash: hashInviteToken(plainToken) };
}

export function hashInviteToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function timingSafeTokenMatch(rawToken: string, hashedToken: string): boolean {
  const computed = hashInviteToken(rawToken);
  const a = Buffer.from(computed);
  const b = Buffer.from(hashedToken);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
