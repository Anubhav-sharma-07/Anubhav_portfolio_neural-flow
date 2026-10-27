import { test } from 'node:test';
import assert from 'node:assert/strict';

// Logic under test: Estimator calculation logic
const platformOptions = [
  { id: 'business', name: 'Business Website', baseDays: 7, baseInr: 5999, baseUsd: 89 },
  { id: 'webapp', name: 'Web Application', baseDays: 14, baseInr: 18000, baseUsd: 249 },
  { id: 'ai-automation', name: 'AI & Automation', baseDays: 10, baseInr: 15000, baseUsd: 199 }
];

const featureOptions = [
  { id: 'landing', name: 'High-Converting Landing Page', days: 2, inr: 1500, usd: 25 },
  { id: 'service-pages', name: 'Multi-Page Service Directory', days: 3, inr: 2500, usd: 35 },
  { id: 'contact-form', name: 'Validated Enquiry Intake', days: 1, inr: 1000, usd: 15 },
  { id: 'whatsapp', name: '1-Click WhatsApp Quick Route', days: 1, inr: 500, usd: 10 },
  { id: 'cms', name: 'Custom Database & CMS (Supabase)', days: 4, inr: 4500, usd: 60 },
  { id: 'ai-assistant', name: 'AI Lead Qualification Pipeline', days: 4, inr: 5000, usd: 70 },
  { id: 'seo', name: 'Search Engine Optimization (SEO)', days: 2, inr: 1500, usd: 20 }
];

function calculateTurnaround(platformId, selectedFeatureIds = []) {
  const platform = platformOptions.find(p => p.id === platformId) || platformOptions[0];
  const addedDays = selectedFeatureIds.reduce((acc, fId) => {
    const f = featureOptions.find(item => item.id === fId);
    return acc + (f ? f.days : 0);
  }, 0);
  const totalInr = platform.baseInr + selectedFeatureIds.reduce((acc, fId) => {
    const f = featureOptions.find(item => item.id === fId);
    return acc + (f ? f.inr : 0);
  }, 0);
  const totalUsd = platform.baseUsd + selectedFeatureIds.reduce((acc, fId) => {
    const f = featureOptions.find(item => item.id === fId);
    return acc + (f ? f.usd : 0);
  }, 0);

  return {
    platformName: platform.name,
    totalDays: platform.baseDays + addedDays,
    totalInr,
    totalUsd
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

test('calculateTurnaround correctly computes base + feature timeline and pricing', () => {
  // Business Website (7 base, 5999 INR, 89 USD) with Landing (2d, 1500 INR, 25 USD) + Contact Form (1d, 1000 INR, 15 USD) + WhatsApp (1d, 500 INR, 10 USD) = 11 days, 8999 INR, 139 USD
  const res1 = calculateTurnaround('business', ['landing', 'contact-form', 'whatsapp']);
  assert.equal(res1.totalDays, 11);
  assert.equal(res1.platformName, 'Business Website');
  assert.equal(res1.totalInr, 8999);
  assert.equal(res1.totalUsd, 139);

  // Web App (14 base, 18000 INR, 249 USD) with Custom CMS (4d, 4500 INR, 60 USD) + Service Pages (3d, 2500 INR, 35 USD) = 21 days, 25000 INR, 344 USD
  const res2 = calculateTurnaround('webapp', ['cms', 'service-pages']);
  assert.equal(res2.totalDays, 21);
  assert.equal(res2.totalInr, 25000);
  assert.equal(res2.totalUsd, 344);

  // AI & Automation (10 base, 15000 INR, 199 USD) with zero extra features = 10 days, 15000 INR, 199 USD
  const res3 = calculateTurnaround('ai-automation', []);
  assert.equal(res3.totalDays, 10);
  assert.equal(res3.totalInr, 15000);
  assert.equal(res3.totalUsd, 199);
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

