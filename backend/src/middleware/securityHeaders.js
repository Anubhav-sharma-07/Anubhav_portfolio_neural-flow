/**
 * Security headers middleware to harden HTTP responses.
 */
export function applySecurityHeaders(req, res, next) {
  // Prevent MIME-sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Legacy browser XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Strict Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Restrict unused browser features
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Hide Express server footprint
  res.removeHeader('X-Powered-By');

  next();
}

