import { readTab, overwriteTab } from '../integrations/sheetsClient.js';

/**
 * Calculates dashboard metrics from all leads and writes them to the Dashboard tab.
 * @returns {Promise<Object>} The aggregated metrics
 */
export async function syncDashboardMetrics() {
  console.log('[Dashboard] Starting metrics aggregation...');
  
  let leads = [];
  try {
    leads = await readTab('Leads');
  } catch (error) {
    console.error('[Dashboard] Failed to read Leads tab for metrics aggregation:', error.message);
    throw error;
  }

  const totalLeads = leads.length;

  // Initialize status counts
  const statusCounts = {
    'New': 0,
    'Rejected': 0,
    'Qualified': 0,
    'Contacted': 0,
    'Replied': 0,
    'No Response - Archive': 0,
    'Queued for Manual Send': 0,
    'Client': 0
  };

  // Initialize platform counts
  const platformCounts = {
    'email': 0,
    'linkedin': 0,
    'instagram': 0
  };

  let totalScore = 0;
  let scoredCount = 0;

  let messagesSentToday = 0;
  let messagesSentThisWeek = 0;

  const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }); // Format: YYYY-MM-DD
  const nowMs = Date.now();
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

  leads.forEach(lead => {
    // 1. Status Counts
    if (lead.status in statusCounts) {
      statusCounts[lead.status]++;
    } else if (lead.status) {
      // Dynamic fallback for any other status (e.g. capitalized, lowercase)
      const matchedKey = Object.keys(statusCounts).find(
        key => key.toLowerCase() === lead.status.toLowerCase()
      );
      if (matchedKey) {
        statusCounts[matchedKey]++;
      }
    }

    // 2. Platform Counts
    if (lead.platform && lead.platform.toLowerCase() in platformCounts) {
      platformCounts[lead.platform.toLowerCase()]++;
    }

    // 3. Average Score
    const scoreVal = Number(lead.score);
    if (lead.score !== null && lead.score !== '' && !isNaN(scoreVal)) {
      totalScore += scoreVal;
      scoredCount++;
    }

    // 4. Message Count Sent Today & This Week
    if (lead.date_contacted) {
      try {
        const contactDate = new Date(lead.date_contacted);
        const contactDateStr = contactDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        
        // Today comparison
        if (contactDateStr === todayStr) {
          messagesSentToday++;
        }

        // Within 7 days comparison
        if (nowMs - contactDate.getTime() <= oneWeekMs) {
          messagesSentThisWeek++;
        }
      } catch (err) {
        console.error('Error parsing date_contacted for lead ID:', lead.lead_id, err.message);
      }
    }
  });

  const avgScore = scoredCount > 0 ? (totalScore / scoredCount).toFixed(2) : 0;

  // Calculate reply rate: Replied / Contacted.
  // Contacted here represents leads that we reached out to (including those that replied)
  const totalContacted = statusCounts['Contacted'] + statusCounts['Replied'];
  const totalReplied = statusCounts['Replied'];
  const replyRate = totalContacted > 0 ? totalReplied / totalContacted : 0;

  // Conversion rate: Client / Total
  const conversionRate = totalLeads > 0 ? statusCounts['Client'] / totalLeads : 0;

  const metrics = {
    totalLeads,
    statusCounts,
    platformCounts,
    avgScore,
    replyRate,
    conversionRate,
    messagesSentToday,
    messagesSentThisWeek,
    lastUpdated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  };

  // Convert metrics into a structured grid for Sheets
  const valueGrid = [
    ['Metric', 'Value'],
    ['Total Leads', totalLeads],
    ['Status: New', statusCounts['New']],
    ['Status: Qualified', statusCounts['Qualified']],
    ['Status: Contacted', statusCounts['Contacted']],
    ['Status: Replied', statusCounts['Replied']],
    ['Status: Rejected', statusCounts['Rejected']],
    ['Status: Queued for Manual Send', statusCounts['Queued for Manual Send']],
    ['Status: No Response - Archive', statusCounts['No Response - Archive']],
    ['Status: Client', statusCounts['Client']],
    ['Platform: Email', platformCounts['email']],
    ['Platform: LinkedIn', platformCounts['linkedin']],
    ['Platform: Instagram', platformCounts['instagram']],
    ['Average Score', avgScore],
    ['Reply Rate (%)', (replyRate * 100).toFixed(1) + '%'],
    ['Conversion Rate (%)', (conversionRate * 100).toFixed(1) + '%'],
    ['Messages Sent Today', messagesSentToday],
    ['Messages Sent This Week', messagesSentThisWeek],
    ['Last Updated', metrics.lastUpdated]
  ];

  try {
    await overwriteTab('Dashboard', valueGrid);
    console.log('[Dashboard] Metrics successfully written to Google Sheets.');
  } catch (error) {
    console.error('[Dashboard] Failed to write dashboard metrics to Sheets:', error.message);
    throw error;
  }

  return metrics;
}

/**
 * Reads the Dashboard tab from Sheets and formats it into a clean JSON structure.
 * Fallbacks to sync if tab is empty.
 * @returns {Promise<Object>}
 */
export async function getDashboardJSON() {
  try {
    const rows = await readTab('Dashboard');
    if (!rows || rows.length === 0) {
      console.log('[Dashboard] Dashboard tab is empty. Performing initial metrics sync...');
      return await syncDashboardMetrics();
    }

    const metrics = {};
    const statusCounts = {};
    const platformCounts = {};

    rows.forEach(row => {
      // Columns are: Metric, Value
      const metric = row.Metric;
      const value = row.Value;
      if (!metric) return;

      if (metric.startsWith('Status: ')) {
        const status = metric.replace('Status: ', '');
        statusCounts[status] = Number(value) || 0;
      } else if (metric.startsWith('Platform: ')) {
        const platform = metric.replace('Platform: ', '').toLowerCase();
        platformCounts[platform] = Number(value) || 0;
      } else if (metric === 'Total Leads') {
        metrics.totalLeads = Number(value) || 0;
      } else if (metric === 'Average Score') {
        metrics.avgScore = Number(value) || 0;
      } else if (metric === 'Reply Rate (%)') {
        metrics.replyRate = value;
      } else if (metric === 'Conversion Rate (%)') {
        metrics.conversionRate = value;
      } else if (metric === 'Messages Sent Today') {
        metrics.messagesSentToday = Number(value) || 0;
      } else if (metric === 'Messages Sent This Week') {
        metrics.messagesSentThisWeek = Number(value) || 0;
      } else if (metric === 'Last Updated') {
        metrics.lastUpdated = value;
      }
    });

    return {
      ...metrics,
      statusCounts,
      platformCounts
    };
  } catch (error) {
    console.error('[Dashboard] Failed to retrieve dashboard metrics:', error.message);
    throw error;
  }
}
