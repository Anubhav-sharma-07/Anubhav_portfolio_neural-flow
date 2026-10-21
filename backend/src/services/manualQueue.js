import { readTab, updateRow, overwriteTab } from '../integrations/sheetsClient.js';

/**
 * Syncs qualified LinkedIn/Instagram leads from Leads tab into Manual_Send_Queue.
 * Sorts the queue by score descending and updates source status to "Queued for Manual Send".
 * @returns {Promise<{ queued: number }>}
 */
export async function syncManualQueue() {
  console.log('[Manual Queue] Starting sync process...');

  let leads = [];
  try {
    leads = await readTab('Leads');
  } catch (error) {
    console.error('[Manual Queue] Failed to read Leads tab:', error.message);
    throw error;
  }

  // Filter for qualified social leads that haven't been queued yet
  const qualifiedSocialLeads = leads.filter(
    lead => lead.status === 'Qualified' && ['linkedin', 'instagram'].includes(lead.platform?.toLowerCase())
  );

  if (qualifiedSocialLeads.length === 0) {
    console.log('[Manual Queue] No qualified social leads found to queue.');
    return { queued: 0 };
  }

  console.log(`[Manual Queue] Found ${qualifiedSocialLeads.length} new social leads to queue.`);

  // Fetch current manual queue to merge and maintain sorting
  let currentQueue = [];
  try {
    currentQueue = await readTab('Manual_Send_Queue');
  } catch (error) {
    console.warn('[Manual Queue] Could not read existing Manual_Send_Queue tab. Starting fresh.', error.message);
  }

  const queueList = currentQueue.map(item => ({
    business_name: item.business_name || '',
    platform: item.platform || '',
    contact: item.contact || '',
    message: item.message || '',
    score: Number(item.score) || 0,
    date_queued: item.date_queued || ''
  }));

  // Merge the new leads into our queue list
  qualifiedSocialLeads.forEach(lead => {
    queueList.push({
      business_name: lead.business_name,
      platform: lead.platform,
      contact: lead.contact,
      message: lead.message,
      score: Number(lead.score) || 0,
      date_queued: new Date().toISOString()
    });
  });

  // Sort queue list by score descending
  queueList.sort((a, b) => b.score - a.score);

  // Convert list back to grid format for sheet overwriting
  const valueGrid = [
    ['business_name', 'platform', 'contact', 'message', 'score', 'date_queued']
  ];

  queueList.forEach(item => {
    valueGrid.push([
      item.business_name,
      item.platform,
      item.contact,
      item.message,
      item.score,
      item.date_queued
    ]);
  });

  try {
    // Overwrite with sorted queue
    await overwriteTab('Manual_Send_Queue', valueGrid);
    console.log(`[Manual Queue] Successfully updated queue with ${queueList.length} items.`);

    // Update status of qualified leads to "Queued for Manual Send"
    for (const lead of qualifiedSocialLeads) {
      await updateRow('Leads', 'lead_id', lead.lead_id, {
        status: 'Queued for Manual Send'
      });
      console.log(`[Manual Queue] Updated lead "${lead.business_name}" status to "Queued for Manual Send".`);
    }

  } catch (error) {
    console.error('[Manual Queue] Failed to complete sheet update actions:', error.message);
    throw error;
  }

  return { queued: qualifiedSocialLeads.length };
}
