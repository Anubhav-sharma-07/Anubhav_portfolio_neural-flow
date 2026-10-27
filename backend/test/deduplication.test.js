import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeBusinessName } from '../src/services/leadDiscovery.js';

test('normalizeBusinessName handles empty and null inputs safely', () => {
  assert.equal(normalizeBusinessName(''), '');
  assert.equal(normalizeBusinessName(null), '');
  assert.equal(normalizeBusinessName(undefined), '');
});

test('normalizeBusinessName strips corporate suffixes consistently', () => {
  assert.equal(normalizeBusinessName('Acme Solutions Pvt Ltd'), 'acme solutions');
  assert.equal(normalizeBusinessName('Acme Solutions Limited'), 'acme solutions');
  assert.equal(normalizeBusinessName('Acme Solutions Inc'), 'acme solutions');
  assert.equal(normalizeBusinessName('Acme Solutions LLP'), 'acme solutions');
  assert.equal(normalizeBusinessName('Acme Solutions GmbH'), 'acme solutions');
});

test('normalizeBusinessName strips special characters and collapses whitespace', () => {
  assert.equal(normalizeBusinessName('  Apex   Health & Wellness -- Clinic!  '), 'apex health wellness clinic');
  assert.equal(normalizeBusinessName('Dr. Sharma Dental Studio (HQ)'), 'dr sharma dental studio hq');
});

