import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Runs a social media scraper actor on Apify and returns scraped dataset items.
 * @param {string} query
 * @returns {Promise<Array<Object>>}
 */
export async function scrapeSocialLeads(query) {
  const token = process.env.APIFY_API_TOKEN;
  const actorId = process.env.APIFY_LINKEDIN_ACTOR_ID || 'apify/instagram-scraper';

  if (!token) {
    console.warn('WARNING: APIFY_API_TOKEN is not defined in the environment variables.');
    return [];
  }

  try {
    const response = await axios.post(
      `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items`,
      {
        searchTerms: [query],
        maxResults: 20
      },
      {
        params: { token },
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const items = response.data || [];
    return items.map(item => {
      // Handle structures from different common instagram or linkedin directory actors
      const name = item.username || item.name || item.companyName || item.fullName || '';
      const website = item.externalUrl || item.website || item.websiteUrl || null;
      const contactHandle = item.username || item.handle || item.companyId || '';
      const platform = (item.username || actorId.includes('instagram')) ? 'instagram' : 'linkedin';
      const sourceUrl = item.url || (item.username ? `https://instagram.com/${item.username}` : '');

      return {
        name,
        contact_handle: contactHandle,
        platform,
        website,
        source_url: sourceUrl,
        source: 'apify'
      };
    });
  } catch (error) {
    console.error('Error fetching from Apify:', error.response?.data || error.message);
    throw error;
  }
}
