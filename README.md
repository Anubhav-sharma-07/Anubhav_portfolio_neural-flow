# Neural Flow Automation Cockpit 🚀

Production-grade, multi-service lead-generation and outreach system built for **Neural Flow** digital agency. It targets local and international businesses with services including Custom Websites, AI Agents, AI Automation, and Chatbots.

## System Architecture

```mermaid
graph TD
  subgraph Lead Discovery
    S1[SerpAPI - Google Maps]
    S2[Apify - Social Media Scrapers]
  end

  subgraph Database / Single Source of Truth
    GS[(Google Sheets: NeuralFlow_CRM)]
    T1[Leads Tab]
    T2[Manual Send Queue Tab]
    T3[Dashboard Tab]
  end

  subgraph Backend Automation Services (Node.js)
    LD[Lead Discovery Service]
    LQ[Lead Qualification Service - Claude]
    EO[Email Outreach & Follow-Up - Gmail]
    MQ[Manual Queue Sync]
    DB[Dashboard Metrics Sync]
  end

  subgraph Frontend Cockpit (React + Vite)
    FC[Vite React Cockpit Dashboard]
  end

  S1 & S2 --> LD
  LD -->|Deduplicate & Append| T1
  T1 -->|Poll & Score| LQ
  LQ -->|Update status: Qualified/Rejected| T1
  T1 -->|Poll & Send| EO
  T1 -->|Sync LinkedIn/Instagram| MQ
  MQ -->|Append & Sort desc| T2
  T1 -->|Aggregate stats hourly| DB
  DB -->|Overwrite metrics| T3

  FC -->|Control endpoints & fetch lists| Backend
```

---

## Folder Structure

```
neural-flow-automation/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   ├── leadDiscovery.js      # Module 1
│   │   │   ├── leadQualification.js  # Module 2
│   │   │   ├── emailOutreach.js      # Module 3
│   │   │   ├── manualQueue.js        # Module 4
│   │   │   └── dashboardMetrics.js   # Module 5
│   │   ├── integrations/
│   │   │   ├── sheetsClient.js       # Google Sheets Service Account
│   │   │   ├── serpApiClient.js      # SerpAPI Search
│   │   │   ├── apifyClient.js        # Apify Scraper Act
│   │   │   ├── claudeClient.js       # Anthropic Claude API
│   │   │   └── gmailClient.js        # Personal Gmail OAuth2 sending
│   │   ├── config/
│   │   │   └── icp.config.js         # ICP configurations
│   │   ├── jobs/
│   │   │   └── scheduler.js          # Background cron jobs (node-cron)
│   │   └── server.js                 # Express server API endpoints
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx                   # Glassmorphic React dashboard UI
│   │   ├── index.css                 # Tailwind CSS v4 configurations
│   │   └── main.jsx                  # Entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Setup & Configuration

### 1. Google Sheets ("NeuralFlow_CRM") Setup
Create a new Google Sheet named `NeuralFlow_CRM` with three sheets/tabs:
1. **`Leads`**: Set the following exact columns in row 1:
   `lead_id | business_name | platform | contact | website | source_url | pain_signal | status | date_added | score | message | subject | reasoning | date_contacted | gmail_thread_id | followup_count | date_last_followup | replied`
2. **`Manual_Send_Queue`**: Set row 1:
   `business_name | platform | contact | message | score | date_queued`
3. **`Dashboard`**: Set row 1:
   `Metric | Value`

### 2. Google Cloud Service Account (Sheets API)
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project: `NeuralFlow-Automation`.
3. Enable the **Google Sheets API** and **Google Drive API**.
4. Go to **IAM & Admin > Service Accounts**, create an account (`neural-flow-sheets-bot`).
5. Select the account, navigate to **Keys**, and select **Add Key > Create new key > JSON**.
6. Share your Google Sheet `"NeuralFlow_CRM"` with the `client_email` listed in the JSON key (give **Editor** permissions).

### 3. Personal Gmail OAuth2 Credentials
Since Service Accounts cannot send emails as a personal `@gmail.com` user, you must set up OAuth2:
1. In the same Google Cloud Project, enable the **Gmail API**.
2. Go to **APIs & Services > OAuth consent screen**, set User Type to **External**, add your email as a **Test User**, and add the scope `https://www.googleapis.com/auth/gmail.send`.
3. Go to **APIs & Services > Credentials**, click **+ Create Credentials > OAuth client ID**, and select **Web Application**.
4. Set the **Authorized redirect URIs** to `https://developers.google.com/oauthplayground`.
5. Save and download the Client ID and Client Secret.
6. Go to the [Google OAuth Playground](https://developers.google.com/oauthplayground):
   - Click the gear icon in the top right, check **Use own OAuth credentials**, and enter Client ID + Client Secret.
   - In the left sidebar, enter `https://www.googleapis.com/auth/gmail.send` and click **Authorize APIs**. Log in and click allow.
   - Click **Exchange authorization code for tokens** and copy the **Refresh Token**.

### 4. Populate `.env`
Copy `backend/.env.example` to `backend/.env` and fill out your variables:
```bash
cp backend/.env.example backend/.env
```

---

## Running the Project

### Running Backend
```bash
cd backend
npm install
npm start
```
Starts the server on `http://localhost:5000` and initializes the background schedulers:
* **Lead Discovery**: Daily at 9:00 AM (Asia/Kolkata)
* **Lead Qualification**: Every 15 minutes (`*/15 * * * *`)
* **Email Outreach Campaign**: Every 15 minutes (`5,20,35,50 * * * *`)
* **Manual Queue Sync**: Every 15 minutes (`8,23,38,53 * * * *`)
* **Dashboard Sync**: Hourly (`0 * * * *`)

### Running Frontend Cockpit
```bash
cd frontend
npm install
npm run dev
```
Starts Vite development server on `http://localhost:5173`. Open it to access the interactive automation cockpit!
