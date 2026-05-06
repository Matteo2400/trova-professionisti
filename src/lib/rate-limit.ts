import type { NextRequest } from 'next/server';

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 10_000;

interface Options {
  /** Max requests per window */
  limit: number;
  /** Window in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Sliding-window in-memory rate limiter (single-process).
 * For multi-instance deployments swap with Upstash Redis (drop-in interface).
 */
export function rateLimit(key: string, opts: Options): RateLimitResult {
  const now = Date.now();

  if (buckets.size > MAX_KEYS) {
    // Naive eviction: clear all expired entries.
    for (const [k, v] of buckets.entries()) {
      if (v.resetAt < now) buckets.delete(k);
    }
  }

  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    bucket = { count: 0, resetAt: now + opts.windowMs };
    buckets.set(key, bucket);
  }

  bucket.count += 1;
  const remaining = Math.max(0, opts.limit - bucket.count);
  return {
    ok: bucket.count <= opts.limit,
    remaining,
    resetAt: bucket.resetAt,
  };
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}

/** Quick helper to apply a rate limit and respond with 429 if exceeded. */
export function rateLimitResponse(result: RateLimitResult, retryAfterSeconds = 60) {
  return new Response(
    JSON.stringify({ error: 'Troppe richieste. Riprova più tardi.' }),
    {
      status: 429,
      headers: {
        'content-type': 'application/json',
        'retry-after': String(retryAfterSeconds),
        'x-ratelimit-remaining': String(result.remaining),
        'x-ratelimit-reset': String(Math.ceil(result.resetAt / 1000)),
      },
    },
  );
}
