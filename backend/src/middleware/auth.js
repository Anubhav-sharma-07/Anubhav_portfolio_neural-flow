import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Configurable Admin API Key
const DEFAULT_DEV_KEY = 'neuralflow-dev-access-key-2026';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || DEFAULT_DEV_KEY;

if (!process.env.ADMIN_API_KEY) {
  console.warn(
    '[SECURITY WARNING] ADMIN_API_KEY is not defined in environment variables. Using default development access key. Set ADMIN_API_KEY in your .env for production.'
  );
}

/**
 * Timing-safe string comparison to protect against timing attacks.
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
function safeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Validates a provided token against the configured admin key.
 * @param {string} token
 * @returns {boolean}
 */
export function verifyAdminToken(token) {
  if (!token) return false;
  return safeCompare(token.trim(), ADMIN_API_KEY.trim());
}

/**
 * Express middleware to enforce admin authentication on protected endpoints.
 * Accepts:
 * - Header: Authorization: Bearer <token>
 * - Header: x-admin-key: <token>
 */
export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const customHeader = req.headers['x-admin-key'];

  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (customHeader) {
    token = customHeader;
  }

  if (!token || !verifyAdminToken(token)) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Valid Admin authentication token required to access this resource.'
    });
  }

  // Token is valid; proceed
  next();
}

