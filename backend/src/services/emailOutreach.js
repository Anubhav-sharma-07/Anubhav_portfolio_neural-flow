import { readTab, updateRow } from '../integrations/sheetsClient.js';
import { sendEmail, getThread } from '../integrations/gmailClient.js';
import { generatePersonalization } from '../integrations/claudeClient.js';

/**
 * Sends initial email outreach to a qualified lead.
 * @param {Object} lead
 */
export async function sendOutreach(lead) {
  console.log(`[Email Outreach] Sending initial outreach to: ${lead.business_name} (${lead.contact})`);
  
  if (!lead.contact) {
    console.warn(`[Email Outreach] Missing contact email for lead: ${lead.business_name}. Skipping.`);
    return;
  }

  const subject = lead.subject || 'Improving Neural Flow systems';
  const message = lead.message || 'We noticed opportunities to automate your chatbot/website systems.';

  try {
    const result = await sendEmail(lead.contact, subject, message);
    
    const updateData = {
      status: 'Contacted',
      date_contacted: new Date().toISOString(),
      gmail_thread_id: result.threadId
    };

    await updateRow('Leads', 'lead_id', lead.lead_id, updateData);
    console.log(`[Email Outreach] Sent successfully. Lead ${lead.business_name} updated to "Contacted". Thread ID: ${result.threadId}`);
  } catch (error) {
    console.error(`[Email Outreach] Failed to send outreach to ${lead.business_name}:`, error.message);
    throw error;
  }
}

/**
 * Processes all Qualified leads that are designated for Email outreach.
 */
export async function sendAllInitialOutreach() {
  console.log('[Email Outreach] Checking for new Qualified email leads...');
  let leads = [];
  try {
    leads = await readTab('Leads');
  } catch (error) {
    console.error('[Email Outreach] Failed to read Leads tab:', error.message);
    return;
  }

  const emailLeads = leads.filter(
    lead => lead.status === 'Qualified' && lead.platform === 'email'
  );

  console.log(`[Email Outreach] Found ${emailLeads.length} qualified email leads to contact.`);

  for (const lead of emailLeads) {
    try {
      await sendOutreach(lead);
    } catch (error) {
      console.error(`[Email Outreach] Error processing lead "${lead.business_name}":`, error.message);
    }
  }
}

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

  // Target contacted email leads that haven't replied or been archived
  const activeLeads = leads.filter(
    lead => lead.status === 'Contacted' && lead.platform === 'email' && lead.gmail_thread_id
  );

  console.log(`[Email Outreach] Found ${activeLeads.length} active contacted leads to check.`);

  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  for (const lead of activeLeads) {
    try {
      // 1. Check Gmail thread for replies
      const messages = await getThread(lead.gmail_thread_id);
      
      if (messages.length > 1) {
        // If thread has more than 1 message, a reply was received (or we sent a manual message)
        console.log(`[Email Outreach] Reply detected for lead "${lead.business_name}". Updating status to "Replied".`);
        await updateRow('Leads', 'lead_id', lead.lead_id, {
          status: 'Replied',
          replied: 'TRUE'
        });
        continue; // Move to next lead
      }

      // 2. No reply. Check if 3 days have elapsed since last activity
      const lastActivityStr = lead.date_last_followup || lead.date_contacted;
      if (!lastActivityStr) continue;

      const lastActivityTime = new Date(lastActivityStr).getTime();
      if (now - lastActivityTime < threeDaysMs) {
        // Not enough time has passed yet
        console.log(`[Email Outreach] Lead "${lead.business_name}" contacted on ${lastActivityStr}. Waiting for 3-day window.`);
        continue;
      }

      // 3. 3 days have passed without reply. Determine next step
      const currentFollowupCount = Number(lead.followup_count) || 0;

      if (currentFollowupCount < 2) {
        // Send next follow-up
        const nextFollowupNum = currentFollowupCount + 1;
        console.log(`[Email Outreach] Preparing follow-up #${nextFollowupNum} for "${lead.business_name}"`);

        const prompt = `Write a short, professional follow-up email for a local business lead.
Business: ${lead.business_name}
Original outreach: ${lead.message}
Pain Signal: ${lead.pain_signal}
Our Services: Custom Websites, AI Agents, Automation, Chatbots.

This is follow-up #${nextFollowupNum}. Use a completely different hook or angle than the original outreach message. Do NOT repeat yourself. Keep the email body strictly under 30 words. Do NOT include any greeting or signature (no "Hi", "Dear", "Sincerely", or "Best regards"). Just output the email body text.`;

        let followUpText = '';
        try {
          followUpText = await generatePersonalization(prompt);
          followUpText = followUpText.trim();
        } catch (claudeErr) {
          console.error(`[Email Outreach] Claude failed to generate follow-up for "${lead.business_name}":`, claudeErr.message);
          continue; // Skip sending if generation failed
        }

        // Send threaded reply
        const sendResult = await sendEmail(lead.contact, lead.subject, followUpText, lead.gmail_thread_id);
        
        await updateRow('Leads', 'lead_id', lead.lead_id, {
          followup_count: nextFollowupNum,
          date_last_followup: new Date().toISOString()
        });

        console.log(`[Email Outreach] Follow-up #${nextFollowupNum} sent successfully to "${lead.business_name}". Thread: ${sendResult.threadId}`);

      } else {
        // Already sent 2 followups. Archive the lead.
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
