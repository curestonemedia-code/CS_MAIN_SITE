import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let cachedRatelimit: Ratelimit | null | undefined;

export function getRatelimit() {
  if (cachedRatelimit !== undefined) return cachedRatelimit;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    cachedRatelimit = null;
    return cachedRatelimit;
  }

  cachedRatelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "1m"),
    analytics: true,
  });

  return cachedRatelimit;
}
