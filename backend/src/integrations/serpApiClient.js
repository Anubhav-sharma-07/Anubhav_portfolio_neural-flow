import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Searches Google using SerpAPI to discover local businesses.
 * @param {string} query
 * @param {string} location
 * @returns {Promise<Array<Object>>}
 */
export async function searchGoogleLeads(query, location) {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    console.warn('WARNING: SERPAPI_KEY is not defined in the environment variables.');
    return [];
  }

  try {
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        q: query,
        location: location,
        engine: 'google',
        num: 20,
        api_key: apiKey
      }
    });

    const organicResults = response.data.organic_results || [];
    return organicResults.map(result => ({
      name: result.title,
      website: result.link || null,
      snippet: result.snippet || '',
      source_url: result.link || '',
      source: 'google'
    }));
  } catch (error) {
    console.error('Error fetching from SerpAPI:', error.response?.data || error.message);
    throw error;
  }
}
