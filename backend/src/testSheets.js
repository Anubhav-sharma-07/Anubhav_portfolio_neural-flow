import { readTab, appendRows, updateRow } from './integrations/sheetsClient.js';
import { v4 as uuidv4 } from 'uuid';

async function runTests() {
  console.log('🚀 Starting Google Sheets integration tests...');
  const testId = uuidv4();
  const tabName = 'Leads';

  try {
    // 1. Test Read Tab
    console.log(`\n1. Reading tab "${tabName}"...`);
    const initialRows = await readTab(tabName);
    console.log(`✅ Read successful. Found ${initialRows.length} rows.`);

    // 2. Test Append Row
    console.log(`\n2. Appending test lead (ID: ${testId})...`);
    const dummyLead = {
      lead_id: testId,
      business_name: `Test Cafe ${Date.now()}`,
      platform: 'email',
      contact: 'test@example.com',
      website: 'http://testcafe.com',
      source_url: 'http://serpapi.com/test',
      pain_signal: 'No website found',
      status: 'New',
      date_added: new Date().toISOString(),
      score: null,
      message: null,
      subject: null,
      reasoning: null,
      date_contacted: null,
      gmail_thread_id: null,
      followup_count: 0,
      date_last_followup: null,
      replied: 'FALSE'
    };

    const appendResult = await appendRows(tabName, [dummyLead]);
    console.log(`✅ Append successful. Result:`, appendResult);

    // 3. Verify Appended Row
    console.log(`\n3. Verifying the appended row exists in the sheet...`);
    const rowsAfterAppend = await readTab(tabName);
    const foundLead = rowsAfterAppend.find(row => row.lead_id === testId);
    if (!foundLead) {
      throw new Error(`Failed to find the appended lead with ID: ${testId}`);
    }
    console.log('✅ Verification successful. Row found:', foundLead);

    // 4. Test Update Row
    console.log(`\n4. Updating lead status from "New" to "Qualified" (score = 8)...`);
    const updateResult = await updateRow(tabName, 'lead_id', testId, {
      status: 'Qualified',
      score: 8,
      reasoning: 'Verified test run update logic.'
    });
    console.log(`✅ Update successful. Result:`, updateResult);

    // 5. Verify Update
    console.log(`\n5. Verifying the update in the sheet...`);
    const rowsAfterUpdate = await readTab(tabName);
    const updatedLead = rowsAfterUpdate.find(row => row.lead_id === testId);
    if (!updatedLead || updatedLead.status !== 'Qualified' || String(updatedLead.score) !== '8') {
      throw new Error(`Failed to verify row update. Current state: ${JSON.stringify(updatedLead)}`);
    }
    console.log('✅ Final verification successful. Updated row:', updatedLead);
    console.log('\n🎉 ALL GOOGLE SHEETS CLIENT TESTS PASSED SUCCESSFULLY!');

  } catch (error) {
    console.error('\n❌ TEST RUN FAILED:', error);
    process.exit(1);
  }
}

runTests();
