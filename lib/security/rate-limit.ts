import { env } from "@/lib/env";

type RateBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateBucket>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const windowMs = env.RATE_LIMIT_WINDOW_MS;
  const maxAttempts = env.RATE_LIMIT_MAX_ATTEMPTS;
  const current = buckets.get(key);

  if (!current || now > current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (current.count >= maxAttempts) {
    return { allowed: false, retryAfterMs: Math.max(current.resetAt - now, 0) };
  }

  current.count += 1;
  buckets.set(key, current);

  return { allowed: true, retryAfterMs: 0 };
}
