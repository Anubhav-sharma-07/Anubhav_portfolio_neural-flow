import { test } from 'node:test';
import assert from 'node:assert/strict';

// Logic under test: Estimator calculation logic
const platformOptions = [
  { id: 'business', name: 'Business Website', baseDays: 10 },
  { id: 'webapp', name: 'Web Application', baseDays: 16 },
  { id: 'ai-automation', name: 'AI & Automation', baseDays: 12 }
];

const featureOptions = [
  { id: 'landing', name: 'Landing Page', days: 2 },
  { id: 'service-pages', name: 'Service Pages', days: 3 },
  { id: 'contact-form', name: 'Contact Form', days: 1 },
  { id: 'whatsapp', name: 'WhatsApp Integration', days: 1 },
  { id: 'cms', name: 'Custom CMS / API', days: 4 },
  { id: 'seo', name: 'SEO Optimization', days: 2 }
];

function calculateTurnaround(platformId, selectedFeatureIds = []) {
  const platform = platformOptions.find(p => p.id === platformId) || platformOptions[0];
  const addedDays = selectedFeatureIds.reduce((acc, fId) => {
    const f = featureOptions.find(item => item.id === fId);
    return acc + (f ? f.days : 0);
  }, 0);
  return {
    platformName: platform.name,
    totalDays: platform.baseDays + addedDays
  };
}

function validateContactInput(formData) {
  const errors = {};
  if (!formData.name?.trim()) errors.name = 'Please provide your name.';
  if (!formData.email?.trim() || formData.email.trim().length < 5) {
    errors.email = 'Please provide a valid email or WhatsApp number.';
  }
  if (!formData.message?.trim() || formData.message.trim().length < 6) {
    errors.message = 'Please provide a short description of what you need.';
  }
  if (formData.botcheck) {
    errors.botcheck = 'Spam detected';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

test('calculateTurnaround correctly computes base + feature timeline', () => {
  // Business Website (10 base) with Landing (2) + Contact Form (1) + WhatsApp (1) = 14 days
  const res1 = calculateTurnaround('business', ['landing', 'contact-form', 'whatsapp']);
  assert.equal(res1.totalDays, 14);
  assert.equal(res1.platformName, 'Business Website');

  // Web App (16 base) with Custom CMS (4) + Service Pages (3) = 23 days
  const res2 = calculateTurnaround('webapp', ['cms', 'service-pages']);
  assert.equal(res2.totalDays, 23);

  // AI & Automation (12 base) with zero extra features = 12 days
  const res3 = calculateTurnaround('ai-automation', []);
  assert.equal(res3.totalDays, 12);
});

test('validateContactInput validates name, email, message and detects honeypot', () => {
  // Empty inputs
  const emptyRes = validateContactInput({ name: '', email: '', message: '' });
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.name);
  assert.ok(emptyRes.errors.email);
  assert.ok(emptyRes.errors.message);

  // Honeypot spam input
  const botRes = validateContactInput({
    name: 'Spam Bot',
    email: 'bot@spam.com',
    message: 'Buy crypto now at fast-url.com',
    botcheck: 'I am a hidden input'
  });
  assert.equal(botRes.isValid, false);
  assert.equal(botRes.errors.botcheck, 'Spam detected');

  // Valid legitimate submission
  const validRes = validateContactInput({
    name: 'Dr. Sameer Verma',
    email: 'clinic@vermadental.in',
    message: 'Need a multi-page website with appointment scheduling.',
    botcheck: ''
  });
  assert.equal(validRes.isValid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);
});

