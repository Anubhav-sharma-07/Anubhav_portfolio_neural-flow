import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
// Handle escaped newlines in environment variables
const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY 
  ? process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n') 
  : null;
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

if (!clientEmail || !privateKey || !spreadsheetId) {
  console.warn('WARNING: Google Sheets credentials are not fully configured in your environment variables.');
}

const auth = new google.auth.JWT(
  clientEmail,
  null,
  privateKey,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Reads all rows from a given tab and maps them to objects based on the header row.
 * Includes a virtual `_rowNumber` attribute on each object to simplify updates.
 * @param {string} tabName
 * @returns {Promise<Array<Object>>}
 */
export async function readTab(tabName) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!A:Z`,
    });
    
    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    const headers = rows[0];
    const dataRows = rows.slice(1);

    return dataRows.map((row, rowIndex) => {
      const obj = { _rowNumber: rowIndex + 2 }; // Row 1 is headers, row 2 is index 0
      headers.forEach((header, index) => {
        obj[header] = row[index] !== undefined && row[index] !== '' ? row[index] : null;
      });
      return obj;
    });
  } catch (error) {
    console.error(`Error reading tab "${tabName}":`, error.message);
    throw error;
  }
}

/**
 * Appends rows to a tab, mapping object keys to column headers in the correct order.
 * @param {string} tabName
 * @param {Array<Object>} rows
 * @returns {Promise<{ appended: number }>}
 */
export async function appendRows(tabName, rows) {
  try {
    if (!rows || rows.length === 0) return { appended: 0 };

    // Get headers to verify column placement
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!A1:Z1`,
    });
    
    const headers = response.data.values?.[0];
    if (!headers || headers.length === 0) {
      throw new Error(`No headers found in tab "${tabName}". Please create headers first.`);
    }

    const valuesToAppend = rows.map(rowObj => {
      return headers.map(header => {
        const val = rowObj[header];
        return val !== undefined && val !== null ? String(val) : '';
      });
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A:A`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: valuesToAppend,
      },
    });

    return { appended: rows.length };
  } catch (error) {
    console.error(`Error appending rows to tab "${tabName}":`, error.message);
    throw error;
  }
}

/**
 * Updates a specific row by its row number.
 * @param {string} tabName
 * @param {number} rowNumber
 * @param {Object} updateObject
 * @returns {Promise<boolean>}
 */
export async function updateRowByNumber(tabName, rowNumber, updateObject) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!A1:Z1`,
    });
    
    const headers = response.data.values?.[0];
    if (!headers) throw new Error(`Headers not found in tab "${tabName}"`);

    // Fetch current row data to merge updates and avoid clearing unmapped columns
    const currentRowResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!A${rowNumber}:Z${rowNumber}`,
    });
    const currentRowValues = currentRowResponse.data.values?.[0] || [];

    const updatedRow = headers.map((header, index) => {
      if (header in updateObject) {
        return updateObject[header] !== null && updateObject[header] !== undefined 
          ? String(updateObject[header]) 
          : '';
      }
      return currentRowValues[index] !== undefined ? currentRowValues[index] : '';
    });

    const maxColLetter = String.fromCharCode(65 + headers.length - 1);
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tabName}!A${rowNumber}:${maxColLetter}${rowNumber}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [updatedRow],
      },
    });

    return true;
  } catch (error) {
    console.error(`Error updating row number ${rowNumber} in tab "${tabName}":`, error.message);
    throw error;
  }
}

/**
 * Updates a row by matching a key column and value (e.g. keyColumn="lead_id", keyValue="uuid").
 * @param {string} tabName
 * @param {string} keyColumn
 * @param {string|number} keyValue
 * @param {Object} updateObject
 * @returns {Promise<boolean>}
 */
export async function updateRow(tabName, keyColumn, keyValue, updateObject) {
  try {
    const rows = await readTab(tabName);
    const matchedRow = rows.find(row => String(row[keyColumn]) === String(keyValue));
    
    if (!matchedRow) {
      throw new Error(`Row with "${keyColumn}" = "${keyValue}" not found in tab "${tabName}"`);
    }

    return await updateRowByNumber(tabName, matchedRow._rowNumber, updateObject);
  } catch (error) {
    console.error(`Error updating row by key in tab "${tabName}":`, error.message);
    throw error;
  }
}

/**
 * Clears a tab and writes a grid of values starting at cell A1.
 * @param {string} tabName
 * @param {Array<Array<string|number>>} valueGrid
 * @returns {Promise<boolean>}
 */
export async function overwriteTab(tabName, valueGrid) {
  try {
    // Clear first 100 rows and up to Z columns to remove old data
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `${tabName}!A1:Z100`,
    });

    // Write new values starting at cell A1
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tabName}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: valueGrid,
      },
    });

    return true;
  } catch (error) {
    console.error(`Error overwriting tab "${tabName}":`, error.message);
    throw error;
  }
}
