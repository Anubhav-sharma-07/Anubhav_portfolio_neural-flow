import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { discoverLeads } from './services/leadDiscovery.js';
import icpConfig from './config/icp.config.js';
import { initScheduler } from './jobs/scheduler.js';
import { qualifyAllNewLeads } from './services/leadQualification.js';
import { getDashboardJSON, syncDashboardMetrics } from './services/dashboardMetrics.js';
import { 
  sendAllApprovedOutreach, 
  checkRepliesAndFollowUp, 
  approveLead, 
  rejectLead, 
  getApprovalQueue 
} from './services/emailOutreach.js';
import { syncManualQueue } from './services/manualQueue.js';
import { readTab, appendRows } from './integrations/sheetsClient.js';
import { requireAdminAuth, verifyAdminToken } from './middleware/auth.js';
import { generalLimiter, sensitiveActionLimiter, contactFormLimiter } from './middleware/rateLimiter.js';
import { applySecurityHeaders } from './middleware/securityHeaders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility middlewares
app.use(applySecurityHeaders);
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));
app.use(express.json({ limit: '100kb' })); // Guard against oversized payload attacks
app.use(generalLimiter);

// -----------------------------------------------------------------------------
// PUBLIC ENDPOINTS
// -----------------------------------------------------------------------------

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    name: 'Neural Flow Engine',
    timestamp: new Date().toISOString(),
    dryRunMode: process.env.DRY_RUN === 'true'
  });
});

// Admin authentication verification endpoint
app.post('/api/auth/login', (req, res) => {
  const { key } = req.body || {};
  if (!key) {
    return res.status(400).json({ success: false, error: 'Access key is required.' });
  }

  const isValid = verifyAdminToken(key);
  if (!isValid) {
    return res.status(401).json({ success: false, error: 'Invalid admin access key.' });
  }

  res.json({
    success: true,
    message: 'Authentication successful',
    token: key.trim()
  });
});

// Public Website Contact Form Endpoint
app.post('/api/contact', contactFormLimiter, async (req, res) => {
  try {
    const { name, email, projectType, budget, goal, timeline, message, botcheck, scopeData } = req.body || {};

    // 1. Anti-spam honeypot check
    if (botcheck) {
      console.warn('[Contact API] Bot honeypot triggered. Silently rejecting.');
      return res.status(400).json({ success: false, error: 'Submission rejected by spam detection.' });
    }

    // 2. Strict input validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Name is required.' });
    }

    if (!email || typeof email !== 'string' || email.trim().length < 5) {
      return res.status(400).json({ success: false, error: 'A valid email or phone number is required.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 6) {
      return res.status(400).json({ success: false, error: 'Please include a brief message or project description.' });
    }

    const inquiryRecord = {
      lead_id: `INQ-${Date.now()}`,
      business_name: name.trim(),
      platform: 'website-inquiry',
      contact: email.trim(),
      website: '',
      source_url: 'neuralflow-portfolio-form',
      pain_signal: `Inquiry: ${projectType || 'General'} | Budget: ${budget || 'Unspecified'} | Goal: ${goal || 'New Build'}`,
      status: 'New',
      date_added: new Date().toISOString(),
      score: '',
      message: `${message.trim()}\n\n[Details: Timeline=${timeline || 'Flexible'}, Scope=${scopeData || 'Direct'}]`,
      subject: `New Project Enquiry: ${projectType || 'Website'} — ${name.trim()}`,
      reasoning: 'Direct website lead submitted through contact conversion form',
      date_contacted: '',
      gmail_thread_id: '',
      followup_count: 0,
      date_last_followup: '',
      replied: 'FALSE'
    };

    // Attempt append to Google Sheets if configured
    try {
      await appendRows('Leads', [inquiryRecord]);
      console.log(`[Contact API] Direct inquiry recorded in Leads tab for: ${name.trim()}`);
    } catch (sheetErr) {
      console.warn('[Contact API] Could not write inquiry to Google Sheets (skipping sheet storage):', sheetErr.message);
    }

    // Optional Telegram notification
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChat = process.env.TELEGRAM_CHAT_ID;
    if (telegramToken && telegramChat) {
      const alertMsg = `🚀 *New Neural Flow Project Enquiry*\n\n*Name:* ${name.trim()}\n*Contact:* ${email.trim()}\n*Project:* ${projectType || 'General'}\n*Budget:* ${budget || 'Not specified'}\n*Message:*\n${message.trim()}`;
      axios.post(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        chat_id: telegramChat,
        text: alertMsg,
        parse_mode: 'Markdown'
      }).catch(err => console.warn('[Contact API] Telegram notification failed:', err.message));
    }

    return res.json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Anubhav will reply within 24 hours.'
    });
  } catch (err) {
    console.error('[Contact API] Internal error processing inquiry:', err);
    res.status(500).json({
      success: false,
      error: 'Unable to process enquiry at this moment. Please email or message directly via WhatsApp.'
    });
  }
});

// -----------------------------------------------------------------------------
// PROTECTED COCKPIT & ADMINISTRATIVE ENDPOINTS (REQUIRE ADMIN AUTH)
// -----------------------------------------------------------------------------

// Fetch all leads list
app.get('/api/leads', requireAdminAuth, async (req, res) => {
  console.log('[API] Fetching all leads list (Authorized).');
  try {
    const leads = await readTab('Leads');
    res.json({
      success: true,
      leads: leads || []
    });
  } catch (error) {
    console.error('[API] Error fetching leads list:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Fetch Dashboard metrics (JSON)
app.get('/api/dashboard', requireAdminAuth, async (req, res) => {
  console.log('[API] Fetching dashboard metrics (Authorized).');
  try {
    const metrics = await getDashboardJSON();
    res.json({
      success: true,
      metrics
    });
  } catch (error) {
    console.error('[API] Error fetching dashboard metrics:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Force sync dashboard metrics
app.post('/api/dashboard/sync', requireAdminAuth, sensitiveActionLimiter, async (req, res) => {
  console.log('[API] Force sync dashboard metrics triggered (Authorized).');
  try {
    const metrics = await syncDashboardMetrics();
    res.json({
      success: true,
      message: 'Dashboard metrics synchronized successfully.',
      metrics
    });
  } catch (error) {
    console.error('[API] Error syncing dashboard metrics:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Fetch Human Review & Approval Queue
app.get('/api/outreach/approval-queue', requireAdminAuth, async (req, res) => {
  try {
    const pendingDrafts = await getApprovalQueue();
    res.json({
      success: true,
      count: pendingDrafts.length,
      queue: pendingDrafts
    });
  } catch (error) {
    console.error('[API] Error reading approval queue:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Explicit Human Approval of a Lead Draft
app.post('/api/outreach/approve', requireAdminAuth, async (req, res) => {
  const { leadId, editedDraft } = req.body || {};
  if (!leadId) {
    return res.status(400).json({ success: false, error: 'leadId is required.' });
  }

  try {
    const result = await approveLead(leadId, editedDraft);
    res.json(result);
  } catch (error) {
    console.error('[API] Error approving lead:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Explicit Rejection of a Lead Draft
app.post('/api/outreach/reject', requireAdminAuth, async (req, res) => {
  const { leadId, reason } = req.body || {};
  if (!leadId) {
    return res.status(400).json({ success: false, error: 'leadId is required.' });
  }

  try {
    const result = await rejectLead(leadId, reason);
    res.json(result);
  } catch (error) {
    console.error('[API] Error rejecting lead:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Manual trigger for sending ONLY approved email outreach (with optional dryRun toggle)
app.post('/api/outreach/send-initial', requireAdminAuth, sensitiveActionLimiter, async (req, res) => {
  console.log('[API] Manual approved outreach dispatch triggered (Authorized).');
  const dryRun = req.query.dry_run === 'true' || req.body?.dryRun === true;

  try {
    const result = await sendAllApprovedOutreach({ dryRun });
    res.json({
      success: true,
      message: dryRun ? 'Simulated dry-run outreach finished.' : 'Approved email outreach campaign finished.',
      result
    });
  } catch (error) {
    console.error('[API] Error sending approved outreach:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Manual trigger for checking replies and processing follow-ups
app.post('/api/outreach/check-replies', requireAdminAuth, sensitiveActionLimiter, async (req, res) => {
  console.log('[API] Manual reply-check sequence triggered (Authorized).');
  try {
    await checkRepliesAndFollowUp();
    res.json({
      success: true,
      message: 'Reply check and follow-up run completed.'
    });
  } catch (error) {
    console.error('[API] Error in reply-check sequence:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Manual trigger for Lead Discovery
app.post('/api/leads/discover', requireAdminAuth, sensitiveActionLimiter, async (req, res) => {
  console.log('[API] Manual lead discovery triggered (Authorized).');
  try {
    const summary = await discoverLeads(icpConfig);
    res.json({
      success: true,
      message: 'Lead discovery process completed.',
      summary
    });
  } catch (error) {
    console.error('[API] Error during manual lead discovery:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Manual trigger for Lead Qualification & Draft Generation
app.post('/api/leads/qualify', requireAdminAuth, sensitiveActionLimiter, async (req, res) => {
  console.log('[API] Manual lead qualification triggered (Authorized).');
  try {
    const summary = await qualifyAllNewLeads();
    res.json({
      success: true,
      message: 'Lead qualification process completed. Qualified leads moved to Approval Queue.',
      summary
    });
  } catch (error) {
    console.error('[API] Error during manual lead qualification:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Manual trigger for syncing social manual queue
app.post('/api/queue/sync', requireAdminAuth, sensitiveActionLimiter, async (req, res) => {
  console.log('[API] Manual queue sync triggered (Authorized).');
  try {
    const summary = await syncManualQueue();
    res.json({
      success: true,
      message: 'Social manual queue synchronized.',
      summary
    });
  } catch (error) {
    console.error('[API] Error syncing manual queue:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Safe global error handler (never leaks stack traces in production)
app.use((err, req, res, _next) => {
  console.error('[Server Error]', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Neural Flow Automation Server running on port ${PORT}`);
  console.log(`🔒 Security enabled: Rate limiting, Security Headers, and Admin Key Authorization`);
  
  // Start the background cron scheduler (auto-send disabled, alerts enabled)
  initScheduler();
});

export default app;
