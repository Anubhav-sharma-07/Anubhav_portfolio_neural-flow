import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sendOutreach, isSuppressed, countSentInLast24Hours } from '../src/services/emailOutreach.js';

test('isSuppressed correctly identifies suppressed emails and domains', () => {
  assert.equal(isSuppressed('test@example.com'), true);
  assert.equal(isSuppressed('optout@example.com'), true);
  assert.equal(isSuppressed('someone@optout.org'), true);
  assert.equal(isSuppressed('legitimate-client@business.co.in'), false);
});

test('sendOutreach strictly throws error if lead is not Approved', async () => {
  const unapprovedLead = {
    lead_id: 'test-1',
    business_name: 'Unapproved Clinic',
    contact: 'doctor@clinic.com',
    status: 'Pending Approval' // Not approved yet!
  };

  await assert.rejects(
    async () => {
      await sendOutreach(unapprovedLead);
    },
    {
      message: /Safety boundary violation/
    },
    'sendOutreach MUST throw when status is not Approved'
  );
});

test('countSentInLast24Hours calculates recent sends accurately', () => {
  const now = Date.now();
  const leads = [
    { lead_id: '1', date_contacted: new Date(now - 1 * 3600 * 1000).toISOString() }, // 1h ago
    { lead_id: '2', date_contacted: new Date(now - 5 * 3600 * 1000).toISOString() }, // 5h ago
    { lead_id: '3', date_contacted: new Date(now - 48 * 3600 * 1000).toISOString() }, // 2 days ago (excluded)
    { lead_id: '4', date_contacted: null } // Not contacted
  ];

  const count = countSentInLast24Hours(leads);
  assert.equal(count, 2, 'Should count only leads contacted in the last 24 hours');
});

