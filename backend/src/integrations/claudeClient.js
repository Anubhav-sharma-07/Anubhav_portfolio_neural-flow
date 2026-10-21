import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Calls Anthropic's Claude API to generate a personalized scoring/outreach response.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generatePersonalization(prompt) {
  const apiKey = process.env.CLAUDE_API_KEY;
  const model = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022';

  if (!apiKey) {
    console.warn('WARNING: CLAUDE_API_KEY is not defined in the environment variables.');
    return '';
  }

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model,
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        }
      }
    );

    return response.data.content?.[0]?.text || '';
  } catch (error) {
    console.error('Error calling Claude API:', error.response?.data || error.message);
    throw error;
  }
}
