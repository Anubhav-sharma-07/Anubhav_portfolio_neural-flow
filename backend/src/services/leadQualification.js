import { readTab, updateRow } from '../integrations/sheetsClient.js';
import { generatePersonalization } from '../integrations/claudeClient.js';
import icpConfig from '../config/icp.config.js';

/**
 * Safely parses the JSON output from Claude, stripping code block markers if necessary.
 * Includes a simple retry helper if the JSON structure is slightly off.
 * @param {string} rawText
 * @returns {Object}
 */
function parseClaudeResponse(rawText) {
  let cleaned = rawText.trim();

  // Strip markdown code fences if present (e.g. ```json ... ```)
  if (cleaned.startsWith('```')) {
    cleaned = cleaned
      .replace(/^```json\s*/i, '') // remove opening ```json
      .replace(/^```\s*/, '')      // remove opening ```
      .replace(/```\s*$/, '')      // remove closing ```
      .trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Failed to parse Claude output directly as JSON. Raw text was:', rawText);
    throw error;
  }
}

/**
 * Personalizes and qualifies a single lead.
 * @param {Object} lead
 * @returns {Promise<Object>} The results of qualification
 */
export async function qualifyLead(lead) {
  console.log(`[Qualification] Processing lead: "${lead.business_name}" (${lead.platform})`);

  const prompt = `Score this lead 1-10 for fit with Neural Flow's services: ${icpConfig.services.join(', ')}.

Lead Details:
- Business Name: ${lead.business_name}
- Target Platform: ${lead.platform}
- Pain Signal: ${lead.pain_signal}
- Website: ${lead.website || 'None'}
- Source URL: ${lead.source_url}

Instructions:
1. Score: Rate from 1 to 10. A high score means they likely need websites, AI agents, AI automation, or chatbots (e.g., they have no website, a very basic static website, or require client booking/support).
2. Subject: A short, high-open-rate subject line tailored to them (relevant if platform is email).
3. Message: Write a short (under 40 words), specific, non-generic outreach message referencing their situation. Do NOT use generic openings like "I hope this finds you well", "Dear owner", or "My name is...". Get straight to the value hook.
4. Reasoning: A brief 1-sentence description of why you scored them this way.

Respond ONLY with a valid raw JSON object, without any markdown fences (like \`\`\`json) or extra text, following this schema exactly:
{
  "score": number,
  "subject": "string",
  "message": "string",
  "reasoning": "string"
}`;

  let attempts = 0;
  let parsedResult = null;

  while (attempts < 2) {
    attempts++;
    try {
      const responseText = await generatePersonalization(prompt);
      parsedResult = parseClaudeResponse(responseText);
      break; // Success! Break the retry loop
    } catch (err) {
      if (attempts >= 2) {
        console.error(`[Qualification] JSON parsing failed twice for lead: ${lead.business_name}. Rejecting lead due to parsing failure.`);
        // Fallback default response
        parsedResult = {
          score: 1,
          subject: 'Outreach',
          message: '',
          reasoning: `Qualification parsing failure: ${err.message}`
        };
      } else {
        console.log(`[Qualification] Retry attempt #${attempts + 1} due to parse error...`);
      }
    }
  }

  // Determine qualification status based on score threshold (>= 6)
  const isQualified = parsedResult.score >= 6;
  const newStatus = isQualified ? 'Qualified' : 'Rejected';

  const updateData = {
    status: newStatus,
    score: parsedResult.score,
    message: parsedResult.message,
    subject: parsedResult.subject,
    reasoning: parsedResult.reasoning
  };

  try {
    await updateRow('Leads', 'lead_id', lead.lead_id, updateData);
    console.log(`[Qualification] Lead "${lead.business_name}" updated to status: "${newStatus}" with score: ${parsedResult.score}`);
  } catch (error) {
    console.error(`[Qualification] Failed to update Google Sheets row for lead "${lead.business_name}":`, error.message);
    throw error;
  }

  return { lead_id: lead.lead_id, ...updateData };
}

/**
 * Fetches all leads with status = "New" from Google Sheets, limiting to a max of 20
 * to safeguard against excessive Claude API costs, and processes them sequentially.
 */
export async function qualifyAllNewLeads() {
  console.log('[Qualification] Starting batch lead qualification...');
  
  let leads = [];
  try {
    leads = await readTab('Leads');
  } catch (error) {
    console.error('[Qualification] Failed to read Leads tab:', error.message);
    return { qualified: 0, rejected: 0, failed: 0 };
  }

  // Filter for new leads
  const newLeads = leads.filter(lead => lead.status === 'New');
  console.log(`[Qualification] Found ${newLeads.length} new leads to process.`);

  // Rate limit safeguard: process maximum of 20 per run
  const limit = 20;
  const leadsToProcess = newLeads.slice(0, limit);
  if (newLeads.length > limit) {
    console.log(`[Qualification] Capping batch execution to the first ${limit} leads to stay within safety limits.`);
  }

  let qualifiedCount = 0;
  let rejectedCount = 0;
  let failedCount = 0;

  for (const lead of leadsToProcess) {
    try {
      const result = await qualifyLead(lead);
      if (result.status === 'Qualified') {
        qualifiedCount++;
      } else {
        rejectedCount++;
      }
    } catch (error) {
      console.error(`[Qualification] Error processing lead "${lead.business_name}":`, error.message);
      failedCount++;
    }
  }

  console.log(`[Qualification] Batch complete. Summary: ${qualifiedCount} Qualified, ${rejectedCount} Rejected, ${failedCount} Failed.`);
  return {
    processed: leadsToProcess.length,
    qualified: qualifiedCount,
    rejected: rejectedCount,
    failed: failedCount
  };
}
