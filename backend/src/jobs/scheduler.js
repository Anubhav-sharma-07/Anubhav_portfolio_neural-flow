import cron from 'node-cron';
import { discoverLeads } from '../services/leadDiscovery.js';
import { qualifyAllNewLeads } from '../services/leadQualification.js';
import { syncDashboardMetrics } from '../services/dashboardMetrics.js';
import { getApprovalQueue, checkRepliesAndFollowUp } from '../services/emailOutreach.js';
import { syncManualQueue } from '../services/manualQueue.js';
import icpConfig from '../config/icp.config.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Sends error message to configured Telegram chat.
 * @param {string} message
 */
async function sendTelegramAlert(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log('Telegram bot alerts are not configured. Skipping notification.');
    return;
  }

  try {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: `⚠️ *NeuralFlow Automation Alert*\n\nError: ${message}`,
      parse_mode: 'Markdown'
    });
    console.log('Telegram alert sent successfully.');
  } catch (error) {
    console.error('Failed to send Telegram alert:', error.message);
  }
}

/**
 * Initializes all cron jobs.
 */
export function initScheduler() {
  console.log('Initializing cron scheduler...');

  // Lead Discovery job: Daily at 9:00 AM in Asia/Kolkata
  cron.schedule('0 9 * * *', async () => {
    console.log('[Scheduler] Running scheduled lead discovery...');
    try {
      const result = await discoverLeads(icpConfig);
      console.log('[Scheduler] Lead discovery finished successfully:', result);
    } catch (error) {
      console.error('[Scheduler] Lead discovery failed:', error);
      await sendTelegramAlert(`Scheduled Lead Discovery job failed: ${error.message}`);
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
  });

  // Lead Qualification job: Every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    console.log('[Scheduler] Running scheduled lead qualification...');
    try {
      const result = await qualifyAllNewLeads();
      console.log('[Scheduler] Lead qualification finished successfully:', result);
    } catch (error) {
      console.error('[Scheduler] Lead qualification failed:', error);
      await sendTelegramAlert(`Scheduled Lead Qualification job failed: ${error.message}`);
    }
  });

  // Dashboard Metrics Sync job: Every 1 hour
  cron.schedule('0 * * * *', async () => {
    console.log('[Scheduler] Running scheduled dashboard metrics sync...');
    try {
      const result = await syncDashboardMetrics();
      console.log('[Scheduler] Dashboard metrics sync finished successfully:', result);
    } catch (error) {
      console.error('[Scheduler] Dashboard metrics sync failed:', error);
      await sendTelegramAlert(`Scheduled Dashboard Metrics sync failed: ${error.message}`);
    }
  });

  // Human Review & Approval Alert: Hourly check for drafts awaiting approval
  // CRITICAL SAFETY BOUNDARY: No automated cold outreach is sent without explicit human review!
  cron.schedule('0 * * * *', async () => {
    console.log('[Scheduler] Checking for drafts awaiting human review and approval...');
    try {
      const pending = await getApprovalQueue();
      if (pending && pending.length > 0) {
        console.log(`[Scheduler] ${pending.length} lead draft(s) awaiting human approval in Cockpit.`);
        await sendTelegramAlert(`📋 NeuralFlow Review Alert: ${pending.length} lead draft(s) awaiting your manual review and approval in Cockpit.`);
      }
    } catch (error) {
      console.error('[Scheduler] Draft approval check error:', error.message);
    }
  });

  // Daily Reply Check & Follow-Up job: 10:00 AM (Asia/Kolkata)
  cron.schedule('0 10 * * *', async () => {
    console.log('[Scheduler] Running scheduled reply-check and follow-up sequence...');
    try {
      await checkRepliesAndFollowUp();
      console.log('[Scheduler] Reply check and follow-up run finished successfully.');
    } catch (error) {
      console.error('[Scheduler] Reply check and follow-up failed:', error);
      await sendTelegramAlert(`Scheduled Reply Check & Follow-Up job failed: ${error.message}`);
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
  });

  // Manual Queue Sync job: Every 15 minutes (offset by 8 mins to run after qualification)
  cron.schedule('8,23,38,53 * * * *', async () => {
    console.log('[Scheduler] Running scheduled manual queue sync...');
    try {
      await syncManualQueue();
      console.log('[Scheduler] Manual queue sync finished successfully.');
    } catch (error) {
      console.error('[Scheduler] Manual queue sync failed:', error);
      await sendTelegramAlert(`Scheduled Manual Queue Sync job failed: ${error.message}`);
    }
  });

  console.log('✅ Scheduler running. Scheduled: Lead Discovery (daily 9am), Lead Qualification (every 15m), Approval Queue Monitor (hourly), Reply Check & Follow-Up (daily 10am), Manual Queue Sync (every 15m), Dashboard Sync (hourly). (Auto-send disabled for safety).');
}
