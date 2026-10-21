import { v4 as uuidv4 } from 'uuid';
import { searchGoogleLeads } from '../integrations/serpApiClient.js';
import { scrapeSocialLeads } from '../integrations/apifyClient.js';
import { readTab, appendRows } from '../integrations/sheetsClient.js';

/**
 * Normalizes business names for strict deduping.
 * Removes common legal suffixes, converts to lowercase, removes non-alphanumeric chars.
 * @param {string} name
 * @returns {string}
 */
export function normalizeBusinessName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/\b(pvt|ltd|inc|llp|gmbh|co|corp|limited|private)\b/gi, '')
    .replace(/[^\w\s]/gi, '') // remove punctuation/special chars
    .replace(/\s+/g, ' ')      // collapse spaces
    .trim();
}

/**
 * Orchestrates the discovery process: fetches from SerpAPI & Apify,
 * normalizes, dedupes, checks against current Sheets records, and saves new leads.
 * @param {Object} icpConfig
 * @returns {Promise<{ found: number, new: number, duplicates: number }>}
 */
export async function discoverLeads(icpConfig) {
  console.log(`Starting lead discovery with query: "${icpConfig.query}" in location: "${icpConfig.location}"`);

  let serpLeads = [];
  let apifyLeads = [];

  // 1. Fetch leads from SerpAPI
  try {
    serpLeads = await searchGoogleLeads(icpConfig.query, icpConfig.location);
    console.log(`SerpAPI returned ${serpLeads.length} leads.`);
  } catch (error) {
    console.error('Error fetching SerpAPI leads during discovery:', error.message);
  }

  // 2. Fetch leads from Apify
  try {
    apifyLeads = await scrapeSocialLeads(icpConfig.query);
    console.log(`Apify returned ${apifyLeads.length} leads.`);
  } catch (error) {
    console.error('Error fetching Apify leads during discovery:', error.message);
  }

  // 3. Normalize and combine
  const rawLeads = [];

  // Map SerpAPI organic results
  serpLeads.forEach(lead => {
    rawLeads.push({
      business_name: lead.name,
      platform: 'email',
      contact: '', // To be populated or researched later, defaults to blank
      website: lead.website,
      source_url: lead.source_url,
      pain_signal: 'No website found in Google maps listings or outdated design snippet'
    });
  });

  // Map Apify social results
  apifyLeads.forEach(lead => {
    rawLeads.push({
      business_name: lead.name,
      platform: lead.platform,
      contact: lead.contact_handle || lead.source_url,
      website: lead.website,
      source_url: lead.source_url,
      pain_signal: `Discovered social handle on ${lead.platform}`
    });
  });

  const totalFound = rawLeads.length;
  console.log(`Total raw leads found across APIs: ${totalFound}`);

  // 4. Fetch existing sheets records to avoid adding duplicates
  let existingLeads = [];
  try {
    existingLeads = await readTab('Leads');
    console.log(`Retrieved ${existingLeads.length} existing leads from Google Sheets.`);
  } catch (error) {
    console.warn('Could not read existing leads from Sheets. Proceeding with clean dedupe.', error.message);
  }

  // Build a set of normalized names that already exist in the sheet
  const existingNormalizedNames = new Set(
    existingLeads.map(lead => normalizeBusinessName(lead.business_name)).filter(Boolean)
  );

  // 5. Deduplicate client-side (both against the sheet and within the new batch)
  const uniqueNewLeads = [];
  const localNormalizedSeen = new Set();
  let duplicatesCount = 0;

  for (const lead of rawLeads) {
    const normalizedName = normalizeBusinessName(lead.business_name);
    if (!normalizedName) {
      duplicatesCount++;
      continue;
    }

    if (existingNormalizedNames.has(normalizedName) || localNormalizedSeen.has(normalizedName)) {
      duplicatesCount++;
      continue;
    }

    // Mark as seen
    localNormalizedSeen.add(normalizedName);

    // Format to match Google Sheets schema exactly
    uniqueNewLeads.push({
      lead_id: uuidv4(),
      business_name: lead.business_name,
      platform: lead.platform,
      contact: lead.contact || '',
      website: lead.website || '',
      source_url: lead.source_url || '',
      pain_signal: lead.pain_signal || '',
      status: 'New',
      date_added: new Date().toISOString(),
      score: '',
      message: '',
      subject: '',
      reasoning: '',
      date_contacted: '',
      gmail_thread_id: '',
      followup_count: 0,
      date_last_followup: '',
      replied: 'FALSE'
    });
  }

  console.log(`Deduplication finished. Unique new leads to add: ${uniqueNewLeads.length} (Filtered duplicates/existing: ${duplicatesCount})`);

  // 6. Write new leads to Google Sheets
  if (uniqueNewLeads.length > 0) {
    try {
      await appendRows('Leads', uniqueNewLeads);
      console.log(`Successfully appended ${uniqueNewLeads.length} new leads to the Leads sheet.`);
    } catch (error) {
      console.error('Failed to write new leads to Google Sheets:', error.message);
      throw error;
    }
  }

  return {
    found: totalFound,
    new: uniqueNewLeads.length,
    duplicates: duplicatesCount
  };
}
