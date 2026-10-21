import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { discoverLeads } from './services/leadDiscovery.js';
import icpConfig from './config/icp.config.js';
import { initScheduler } from './jobs/scheduler.js';
import { qualifyAllNewLeads } from './services/leadQualification.js';
import { getDashboardJSON, syncDashboardMetrics } from './services/dashboardMetrics.js';
import { sendAllInitialOutreach, checkRepliesAndFollowUp } from './services/emailOutreach.js';
import { syncManualQueue } from './services/manualQueue.js';
import { readTab } from './integrations/sheetsClient.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Neural Flow Automation API is running' });
});

// Fetch all leads directly from Google Sheets
app.get('/api/leads', async (req, res) => {
  console.log('[API] Fetching all leads list.');
  try {
    const leads = await readTab('Leads');
    res.json({
      success: true,
      leads
    });
  } catch (error) {
    console.error('[API] Error fetching leads list:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Manual trigger for Lead Discovery
app.post('/api/leads/discover', async (req, res) => {
  console.log('[API] Manual lead discovery triggered.');
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

// Manual trigger for Lead Qualification
app.post('/api/leads/qualify', async (req, res) => {
  console.log('[API] Manual lead qualification triggered.');
  try {
    const summary = await qualifyAllNewLeads();
    res.json({
      success: true,
      message: 'Lead qualification process completed.',
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

// Fetch Dashboard metrics (JSON)
app.get('/api/dashboard', async (req, res) => {
  console.log('[API] Fetching dashboard metrics.');
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
app.post('/api/dashboard/sync', async (req, res) => {
  console.log('[API] Force sync dashboard metrics triggered.');
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

// Manual trigger for sending initial email outreach
app.post('/api/outreach/send-initial', async (req, res) => {
  console.log('[API] Manual initial outreach triggered.');
  try {
    await sendAllInitialOutreach();
    res.json({
      success: true,
      message: 'Initial email outreach campaign completed.'
    });
  } catch (error) {
    console.error('[API] Error sending initial outreach:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Manual trigger for checking replies and processing follow-ups
app.post('/api/outreach/check-replies', async (req, res) => {
  console.log('[API] Manual reply-check and follow-up sequence triggered.');
  try {
    await checkRepliesAndFollowUp();
    res.json({
      success: true,
      message: 'Reply check and follow-up run completed.'
    });
  } catch (error) {
    console.error('[API] Error in reply-check and follow-up sequence:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Manual trigger for syncing social manual queue
app.post('/api/queue/sync', async (req, res) => {
  console.log('[API] Manual queue sync triggered.');
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Neural Flow Automation Server running on port ${PORT}`);
  
  // Start the cron job scheduler
  initScheduler();
});
