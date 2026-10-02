import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { serverEnv } from "@/lib/server-env";

type Limiter = { limit: (key: string) => Promise<{ success: boolean }> };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

/**
 * In-memory sliding window, used when Upstash is not configured. On serverless hosts this
 * is per-instance only, so set the Upstash env vars in production.
 */
function memoryLimiter(): Limiter {
  const hits = new Map<string, number[]>();
  return {
    async limit(key) {
      const now = Date.now();
      const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
      if (recent.length >= MAX_REQUESTS) {
        hits.set(key, recent);
        return { success: false };
      }
      recent.push(now);
      hits.set(key, recent);
      // Keep the map from growing without bound.
      if (hits.size > 5000) hits.clear();
      return { success: true };
    },
  };
}

function createLimiter(): Limiter {
  if (serverEnv.UPSTASH_REDIS_REST_URL && serverEnv.UPSTASH_REDIS_REST_TOKEN) {
    return new Ratelimit({
      redis: new Redis({
        url: serverEnv.UPSTASH_REDIS_REST_URL,
        token: serverEnv.UPSTASH_REDIS_REST_TOKEN,
      }),
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "10 m"),
      prefix: "xbpl:forms",
    });
  }
  return memoryLimiter();
}

const limiter = createLimiter();

/** Returns true when the caller may proceed. `scope` keeps form budgets separate. */
export async function checkRateLimit(scope: string, ip: string): Promise<boolean> {
  // Automated tests submit many times from one IP.
  if (serverEnv.E2E) return true;
  const { success } = await limiter.limit(`${scope}:${ip}`);
  return success;
}
