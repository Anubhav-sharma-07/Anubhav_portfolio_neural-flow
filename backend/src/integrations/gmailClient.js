import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.GMAIL_CLIENT_ID;
const clientSecret = process.env.GMAIL_CLIENT_SECRET;
const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

if (!clientId || !clientSecret || !refreshToken) {
  console.warn('WARNING: Gmail API credentials are not fully configured in your environment variables.');
}

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: refreshToken
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

/**
 * Sends an email using the personal Gmail account of the authenticated user.
 * Supports sending replies to existing threads by linking thread IDs and headers.
 * @param {string} to Receiver's email address
 * @param {string} subject Subject of the email
 * @param {string} body Message body (HTML allowed)
 * @param {string} [threadId] Optional thread ID to reply to
 * @returns {Promise<{ messageId: string, threadId: string }>}
 */
export async function sendEmail(to, subject, body, threadId = null) {
  try {
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    let messageParts = [
      `To: ${to}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      ''
    ];

    if (threadId) {
      try {
        // Fetch the thread to find the Message-ID of the initial message
        const threadRes = await gmail.users.threads.get({
          userId: 'me',
          id: threadId
        });
        
        const messages = threadRes.data.messages || [];
        if (messages.length > 0) {
          const firstMessage = messages[0];
          const messageIdHeader = firstMessage.payload.headers.find(
            h => h.name.toLowerCase() === 'message-id'
          )?.value;

          if (messageIdHeader) {
            messageParts.unshift(`In-Reply-To: ${messageIdHeader}`);
            messageParts.unshift(`References: ${messageIdHeader}`);
          }
        }
      } catch (err) {
        console.warn(`Could not set reply headers for threadId: ${threadId}, sending standard message.`, err.message);
      }
    }

    messageParts.push(body);
    const message = messageParts.join('\n');

    // Base64Url encode RFC 2822 message
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
        threadId: threadId || undefined
      }
    });

    return {
      messageId: res.data.id,
      threadId: res.data.threadId
    };
  } catch (error) {
    console.error('Error sending email via Gmail API:', error.message);
    throw error;
  }
}

/**
 * Retrieves all messages in a specific thread to check for responses.
 * @param {string} threadId
 * @returns {Promise<Array<Object>>}
 */
export async function getThread(threadId) {
  try {
    const res = await gmail.users.threads.get({
      userId: 'me',
      id: threadId
    });
    return res.data.messages || [];
  } catch (error) {
    console.error(`Error retrieving thread "${threadId}":`, error.message);
    throw error;
  }
}
