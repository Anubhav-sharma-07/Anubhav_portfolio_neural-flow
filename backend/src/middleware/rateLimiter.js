/**
 * Lightweight in-memory sliding-window rate limiter middleware.
 * Avoids extra third-party dependencies while providing robust brute-force protection.
 */

class MemoryRateLimiter {
  constructor(windowMs = 60 * 1000, maxRequests = 60, message = 'Too many requests, please try again later.') {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.message = message;
    this.hits = new Map();

    // Clean up expired entries every 5 minutes to prevent memory leak
    setInterval(() => this.cleanup(), 5 * 60 * 1000).unref();
  }

  cleanup() {
    const now = Date.now();
    for (const [ip, timestamps] of this.hits.entries()) {
      const validTimestamps = timestamps.filter((t) => now - t < this.windowMs);
      if (validTimestamps.length === 0) {
        this.hits.delete(ip);
      } else {
        this.hits.set(ip, validTimestamps);
      }
    }
  }

  middleware() {
    return (req, res, next) => {
      const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
      const now = Date.now();

      const timestamps = this.hits.get(ip) || [];
      const windowStart = now - this.windowMs;
      const validTimestamps = timestamps.filter((t) => t > windowStart);

      if (validTimestamps.length >= this.maxRequests) {
        res.setHeader('Retry-After', Math.ceil(this.windowMs / 1000));
        return res.status(429).json({
          success: false,
          error: this.message,
          retryAfterSeconds: Math.ceil(this.windowMs / 1000)
        });
      }

      validTimestamps.push(now);
      this.hits.set(ip, validTimestamps);

      res.setHeader('X-RateLimit-Limit', this.maxRequests);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, this.maxRequests - validTimestamps.length));

      next();
    };
  }
}

// 1. General API rate limiter (120 req / minute)
export const generalLimiter = new MemoryRateLimiter(
  60 * 1000,
  120,
  'General rate limit exceeded. Please slow down.'
).middleware();

// 2. Sensitive Action rate limiter (15 req / 5 minutes)
export const sensitiveActionLimiter = new MemoryRateLimiter(
  5 * 60 * 1000,
  15,
  'Rate limit for administrative actions exceeded. Please wait a few minutes.'
).middleware();

// 3. Contact Form Submission rate limiter (5 submissions / 15 minutes)
export const contactFormLimiter = new MemoryRateLimiter(
  15 * 60 * 1000,
  5,
  'Too many contact inquiries from this IP. Please wait before submitting again, or email directly.'
).middleware();

