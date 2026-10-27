interface RateLimitRecord {
  count: number;
  resetAt: number;
}

class MemoryRateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests = 60, windowSeconds = 60) {
    this.maxRequests = maxRequests;
    this.windowMs = windowSeconds * 1000;
  }

  check(ip: string): { success: boolean; limit: number; remaining: number; reset: number } {
    const now = Date.now();
    const record = this.records.get(ip);

    // Periodic cleanup of expired records if map gets large
    if (this.records.size > 10000) {
      this.records.forEach((rec, key) => {
        if (now > rec.resetAt) {
          this.records.delete(key);
        }
      });
    }

    if (!record || now > record.resetAt) {
      this.records.set(ip, {
        count: 1,
        resetAt: now + this.windowMs,
      });
      return {
        success: true,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        reset: Math.ceil((now + this.windowMs) / 1000),
      };
    }

    if (record.count >= this.maxRequests) {
      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        reset: Math.ceil(record.resetAt / 1000),
      };
    }

    record.count += 1;
    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - record.count,
      reset: Math.ceil(record.resetAt / 1000),
    };
  }
}

declare global {
  // eslint-disable-next-line no-var
  var rateLimiterInstance: MemoryRateLimiter | undefined;
}

export const rateLimiter =
  global.rateLimiterInstance || new MemoryRateLimiter(60, 60);

if (process.env.NODE_ENV !== "production") {
  global.rateLimiterInstance = rateLimiter;
}
