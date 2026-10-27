import { readTab, updateRow } from '../integrations/sheetsClient.js';
import { sendEmail, getThread } from '../integrations/gmailClient.js';
import { generatePersonalization } from '../integrations/claudeClient.js';
import dotenv from 'dotenv';

dotenv.config();

// Daily outreach limit to protect domain reputation and comply with anti-spam standards
const DAILY_EMAIL_LIMIT = parseInt(process.env.DAILY_EMAIL_LIMIT || '25', 10);

// In-memory suppression list (can be extended via env SUPPRESSION_LIST="optout.org,domain.com,test@optout.org")
const SUPPRESSION_LIST = new Set(
  (process.env.SUPPRESSION_LIST || 'test@example.com,optout@example.com,unsubscribe@example.com,optout.org,unsubscribe.org')
    .toLowerCase()
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
);

/**
 * Checks whether an email address is on the suppression list.
 * @param {string} email
 * @returns {boolean}
 */
export function isSuppressed(email) {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();
  if (SUPPRESSION_LIST.has(cleanEmail)) return true;

  // Domain level check
  const domain = cleanEmail.split('@')[1];
  if (domain && SUPPRESSION_LIST.has(domain)) return true;

  return false;
}

/**
 * Calculates how many emails were sent in the last 24 hours.
 * @param {Array<Object>} leads
 * @returns {number}
 */
export function countSentInLast24Hours(leads = []) {
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  return leads.filter(lead => {
    if (!lead.date_contacted) return false;
    const sentTime = new Date(lead.date_contacted).getTime();
    return sentTime > oneDayAgo;
  }).length;
}

/**
 * Approves a qualified lead draft for sending.
 * Human review is mandatory.
 * @param {string} leadId
 * @param {Object} [editedDraft]
 * @returns {Promise<Object>}
 */
export async function approveLead(leadId, editedDraft = null) {
  console.log(`[Email Outreach] Explicit human approval granted for lead ID: ${leadId}`);

  const updateData = {
    status: 'Approved',
    human_approved: 'TRUE',
    approved_at: new Date().toISOString()
  };

  if (editedDraft?.subject) {
    updateData.subject = editedDraft.subject.trim();
  }
  if (editedDraft?.message) {
    updateData.message = editedDraft.message.trim();
  }

  await updateRow('Leads', 'lead_id', leadId, updateData);
  return { success: true, leadId, status: 'Approved' };
}

/**
 * Rejects a lead draft during human review.
 * @param {string} leadId
 * @param {string} [reason]
 * @returns {Promise<Object>}
 */
export async function rejectLead(leadId, reason = 'Rejected during human review') {
  console.log(`[Email Outreach] Lead rejected during human review: ${leadId} (${reason})`);

  const updateData = {
    status: 'Rejected',
    rejection_reason: reason,
    human_approved: 'FALSE',
    rejected_at: new Date().toISOString()
  };

  await updateRow('Leads', 'lead_id', leadId, updateData);
  return { success: true, leadId, status: 'Rejected' };
}

/**
 * Retrieves all drafts awaiting human review and approval.
 * @returns {Promise<Array<Object>>}
 */
export async function getApprovalQueue() {
  const leads = await readTab('Leads');
  return leads.filter(lead => lead.status === 'Pending Approval');
}

/**
 * Sends initial email outreach to a qualified lead.
 * MANDATORY SAFETY BOUNDARY:
 * Requires lead to be explicitly 'Approved' by a human operator, unless explicit force parameter is passed.
 * Supports DRY_RUN mode.
 * @param {Object} lead
 * @param {Object} [options]
 * @returns {Promise<Object>}
 */
export async function sendOutreach(lead, options = {}) {
  const isDryRun = options.dryRun ?? (process.env.DRY_RUN === 'true');

  console.log(`[Email Outreach] Preparing outreach for: ${lead.business_name} (${lead.contact}) [DryRun: ${isDryRun}]`);

  if (!lead.contact) {
    console.warn(`[Email Outreach] Missing contact email for lead: ${lead.business_name}. Skipping.`);
    throw new Error(`Lead "${lead.business_name}" is missing a contact email address.`);
  }

  // 1. Mandatory Human Approval Safety Check
  if (lead.status !== 'Approved' && !options.skipApprovalCheck) {
    const errorMsg = `Safety boundary violation: Lead "${lead.business_name}" status is "${lead.status}". Explicit human approval ('Approved') is required before sending.`;
    console.error(`[Email Outreach] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  // 2. Suppression List Check
  if (isSuppressed(lead.contact)) {
    console.warn(`[Email Outreach] Contact ${lead.contact} is on the suppression list. Marking as Suppressed.`);
    await updateRow('Leads', 'lead_id', lead.lead_id, {
      status: 'Suppressed',
      suppressed_at: new Date().toISOString()
    });
    return { success: false, suppressed: true, reason: 'Suppression list matched' };
  }

  // 3. Duplicate Send Prevention (Idempotency)
  if (lead.status === 'Contacted' && lead.gmail_thread_id) {
    console.warn(`[Email Outreach] Lead "${lead.business_name}" already contacted (Thread: ${lead.gmail_thread_id}). Skipping.`);
    return { success: true, alreadyContacted: true, threadId: lead.gmail_thread_id };
  }

  const subject = lead.subject || 'Improving Neural Flow systems';
  const message = lead.message || 'We noticed opportunities to automate your website and client intake workflows.';

  // 4. Dry Run Execution
  if (isDryRun) {
    console.log(`[Email Outreach DRY-RUN] Would send to: ${lead.contact}`);
    console.log(`[Email Outreach DRY-RUN] Subject: "${subject}"`);
    console.log(`[Email Outreach DRY-RUN] Message Preview: "${message.substring(0, 100)}..."`);

    const updateData = {
      status: 'Contacted (Dry Run)',
      date_contacted: new Date().toISOString(),
      gmail_thread_id: 'dry-run-simulated-thread'
    };

    await updateRow('Leads', 'lead_id', lead.lead_id, updateData);
    return {
      success: true,
      dryRun: true,
      recipient: lead.contact,
      subject
    };
  }

  // 5. Live Outreach via Gmail API
  try {
    const result = await sendEmail(lead.contact, subject, message);

    const updateData = {
      status: 'Contacted',
      date_contacted: new Date().toISOString(),
      gmail_thread_id: result.threadId
    };

    await updateRow('Leads', 'lead_id', lead.lead_id, updateData);
    console.log(`[Email Outreach] Sent successfully to "${lead.business_name}". Lead updated to "Contacted". Thread ID: ${result.threadId}`);
    return {
      success: true,
      dryRun: false,
      threadId: result.threadId,
      recipient: lead.contact
    };
  } catch (error) {
    console.error(`[Email Outreach] Failed to send outreach to ${lead.business_name}:`, error.message);
    throw error;
  }
}

/**
 * Processes all Approved leads designated for Email outreach.
 * Enforces daily sending cap and human approval requirement.
 * @param {Object} [options]
 * @returns {Promise<{ sent: number, skipped: number, errors: number }>}
 */
export async function sendAllApprovedOutreach(options = {}) {
  console.log('[Email Outreach] Checking for Approved email leads awaiting dispatch...');
  let leads = [];
  try {
    leads = await readTab('Leads');
  } catch (error) {
    console.error('[Email Outreach] Failed to read Leads tab:', error.message);
    return { sent: 0, skipped: 0, errors: 1 };
  }

  // Check 24-hour send count vs daily limit
  const sentLast24Hours = countSentInLast24Hours(leads);
  const remainingDailyCapacity = Math.max(0, DAILY_EMAIL_LIMIT - sentLast24Hours);

  if (remainingDailyCapacity <= 0) {
    console.warn(`[Email Outreach] Daily sending limit reached (${sentLast24Hours}/${DAILY_EMAIL_LIMIT} sent in last 24h). Dispatch paused.`);
    return { sent: 0, skipped: 0, limitReached: true };
  }

  // Filter only Approved leads
  const approvedLeads = leads.filter(
    lead => lead.status === 'Approved' && lead.platform === 'email'
  );

  console.log(`[Email Outreach] Found ${approvedLeads.length} approved leads. Remaining daily capacity: ${remainingDailyCapacity}`);

  let sentCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const lead of approvedLeads) {
    if (sentCount >= remainingDailyCapacity) {
      console.log(`[Email Outreach] Reached daily batch capacity limit (${DAILY_EMAIL_LIMIT}). Halting current run.`);
      break;
    }

    try {
      const res = await sendOutreach(lead, options);
      if (res.success) {
        sentCount++;
      } else {
        skippedCount++;
      }
    } catch (error) {
      errorCount++;
      console.error(`[Email Outreach] Error dispatching to "${lead.business_name}":`, error.message);
    }
  }

  return {
    sent: sentCount,
    skipped: skippedCount,
    errors: errorCount,
    dailyLimit: DAILY_EMAIL_LIMIT
  };
}

// Backward compatible export for existing callers
export const sendAllInitialOutreach = sendAllApprovedOutreach;

/**
 * Daily background cron task: Checks for replies to outreach threads.
 * If replied, stops sequence. If no response after 3 days, drafts and sends follow-up.
 * Maximum of 2 follow-ups before archiving.
 */
export async function checkRepliesAndFollowUp() {
  console.log('[Email Outreach] Starting reply checks and follow-ups...');
  let leads = [];
  try {
    leads = await readTab('Leads');
  } catch (error) {
    console.error('[Email Outreach] Failed to read Leads tab for follow-ups:', error.message);
    return;
  }

  const activeLeads = leads.filter(
    lead => lead.status === 'Contacted' && lead.platform === 'email' && lead.gmail_thread_id
  );

  console.log(`[Email Outreach] Found ${activeLeads.length} active contacted leads to check.`);

  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  for (const lead of activeLeads) {
    try {
      const messages = await getThread(lead.gmail_thread_id);

      if (messages.length > 1) {
        console.log(`[Email Outreach] Reply detected for lead "${lead.business_name}". Updating status to "Replied".`);
        await updateRow('Leads', 'lead_id', lead.lead_id, {
          status: 'Replied',
          replied: 'TRUE'
        });
        continue;
      }

      const lastActivityStr = lead.date_last_followup || lead.date_contacted;
      if (!lastActivityStr) continue;

      const lastActivityTime = new Date(lastActivityStr).getTime();
      if (now - lastActivityTime < threeDaysMs) {
        continue;
      }

      const currentFollowupCount = Number(lead.followup_count) || 0;

      if (currentFollowupCount < 2) {
        const nextFollowupNum = currentFollowupCount + 1;
        console.log(`[Email Outreach] Follow-up #${nextFollowupNum} window open for "${lead.business_name}".`);

        const prompt = `Write a short, professional follow-up email for a local business lead.
Business: ${lead.business_name}
Original outreach: ${lead.message}
Pain Signal: ${lead.pain_signal}
Our Services: Custom Websites, AI Agents, Automation, Chatbots.

This is follow-up #${nextFollowupNum}. Use a completely different hook or angle than the original outreach message. Do NOT repeat yourself. Keep the email body strictly under 30 words. Do NOT include any greeting or signature. Just output the email body text.`;

        let followUpText = '';
        try {
          followUpText = await generatePersonalization(prompt);
          followUpText = followUpText.trim();
        } catch (claudeErr) {
          console.error(`[Email Outreach] Claude failed to generate follow-up for "${lead.business_name}":`, claudeErr.message);
          continue;
        }

        const isDryRun = process.env.DRY_RUN === 'true';
        if (isDryRun) {
          console.log(`[Email Outreach DRY-RUN] Follow-up #${nextFollowupNum} simulated for "${lead.business_name}".`);
        } else {
          await sendEmail(lead.contact, lead.subject, followUpText, lead.gmail_thread_id);
        }

        await updateRow('Leads', 'lead_id', lead.lead_id, {
          followup_count: nextFollowupNum,
          date_last_followup: new Date().toISOString()
        });

      } else {
        console.log(`[Email Outreach] Max follow-ups reached for "${lead.business_name}". Archiving lead.`);
        await updateRow('Leads', 'lead_id', lead.lead_id, {
          status: 'No Response - Archive'
        });
      }
    } catch (err) {
      console.error(`[Email Outreach] Error processing follow-up for lead "${lead.business_name}":`, err.message);
    }
  }
}
