const isProd = process.env.NODE_ENV === "production";
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
const enforceRequiredEnv = isProd && !isBuildPhase;

function getRequiredEnv(name: string, fallbackForNonProd: string): string {
  const value = process.env[name];
  if (value && value.trim().length > 0) {
    return value.trim();
  }
  if (!enforceRequiredEnv) {
    return fallbackForNonProd;
  }
  throw new Error(`Missing required environment variable: ${name}`);
}

function getNumberEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  DATABASE_URL: getRequiredEnv("DATABASE_URL", "postgres://local/dev"),
  AUTH_SECRET: getRequiredEnv("AUTH_SECRET", "dev-only-auth-secret-not-for-production"),
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST ?? "false",
  AUTH_WEBAUTHN_RP_ID: getRequiredEnv("AUTH_WEBAUTHN_RP_ID", "localhost"),
  AUTH_WEBAUTHN_RP_NAME: getRequiredEnv("AUTH_WEBAUTHN_RP_NAME", "CORE Educational Services"),
  AUTH_WEBAUTHN_ORIGIN: getRequiredEnv("AUTH_WEBAUTHN_ORIGIN", "http://localhost:3000"),
  INVITE_TOKEN_SIGNING_KEY_V1: getRequiredEnv("INVITE_TOKEN_SIGNING_KEY_V1", "dev-invite-signing-key-not-for-production"),
  FIELD_ENCRYPTION_KEY_V1: getRequiredEnv("FIELD_ENCRYPTION_KEY_V1", "dev-field-encryption-key-not-for-production"),
  RATE_LIMIT_WINDOW_MS: getNumberEnv("RATE_LIMIT_WINDOW_MS", 60_000),
  RATE_LIMIT_MAX_ATTEMPTS: getNumberEnv("RATE_LIMIT_MAX_ATTEMPTS", 10),
};
