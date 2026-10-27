import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyAdminToken, requireAdminAuth } from '../src/middleware/auth.js';

test('verifyAdminToken validates correct key and rejects invalid key', () => {
  // Test invalid tokens
  assert.equal(verifyAdminToken(''), false, 'Empty string should fail');
  assert.equal(verifyAdminToken(null), false, 'Null should fail');
  assert.equal(verifyAdminToken('wrong-key-12345'), false, 'Wrong key should fail');

  // Test configured key (uses process.env.ADMIN_API_KEY or default dev key)
  const key = process.env.ADMIN_API_KEY || 'neuralflow-dev-access-key-2026';
  assert.equal(verifyAdminToken(key), true, 'Valid key should succeed');
  assert.equal(verifyAdminToken(` ${key} `), true, 'Key with surrounding whitespace should be trimmed');
});

test('requireAdminAuth blocks unauthenticated requests with 401', () => {
  let status = null;
  let jsonResponse = null;
  let nextCalled = false;

  const req = { headers: {} };
  const res = {
    status(code) {
      status = code;
      return {
        json(data) {
          jsonResponse = data;
        }
      };
    }
  };
  const next = () => { nextCalled = true; };

  requireAdminAuth(req, res, next);

  assert.equal(status, 401, 'Status should be 401 Unauthorized');
  assert.equal(jsonResponse?.success, false);
  assert.equal(nextCalled, false, 'next() must NOT be called on unauthorized request');
});

test('requireAdminAuth accepts valid Bearer token in Authorization header', () => {
  let nextCalled = false;
  const key = process.env.ADMIN_API_KEY || 'neuralflow-dev-access-key-2026';

  const req = {
    headers: {
      authorization: `Bearer ${key}`
    }
  };
  const res = {};
  const next = () => { nextCalled = true; };

  requireAdminAuth(req, res, next);
  assert.equal(nextCalled, true, 'next() must be called for valid Bearer token');
});

