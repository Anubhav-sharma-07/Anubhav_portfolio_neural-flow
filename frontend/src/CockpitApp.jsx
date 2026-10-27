import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Send, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  LogOut, 
  Eye, 
  Check, 
  Copy, 
  Sliders
} from 'lucide-react';

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
const DEV_DEFAULT_KEY = 'neuralflow-dev-access-key-2026';

export default function CockpitApp() {
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem('nf_admin_token') || '');
  const [loginKey, setLoginKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [leads, setLeads] = useState([]);
  const [approvalQueue, setApprovalQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState('review'); // 'review' | 'leads' | 'analytics'
  const [dryRunMode, setDryRunMode] = useState(true);

  // Authenticated fetch wrapper
  const authFetch = async (endpoint, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      ...options.headers
    };

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    if (res.status === 401) {
      sessionStorage.removeItem('nf_admin_token');
      setAuthToken('');
      throw new Error('Session expired or unauthorized. Please re-authenticate.');
    }

    return res;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginKey.trim()) {
      setAuthError('Please enter the Admin Access Key.');
      return;
    }

    setAuthError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: loginKey.trim() })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        sessionStorage.setItem('nf_admin_token', loginKey.trim());
        setAuthToken(loginKey.trim());
      } else {
        setAuthError(data.error || 'Authentication rejected.');
      }
    } catch {
      // If server is offline, allow dev key login locally for dashboard preview
      if (loginKey.trim() === DEV_DEFAULT_KEY) {
        sessionStorage.setItem('nf_admin_token', loginKey.trim());
        setAuthToken(loginKey.trim());
      } else {
        setAuthError('Cannot reach authentication server at localhost:5000.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('nf_admin_token');
    setAuthToken('');
    setMetrics(null);
    setLeads([]);
    setApprovalQueue([]);
  };

  // Fetch metrics, leads list, and approval queue
  const fetchData = async () => {
    if (!authToken) return;

    try {
      setLoading(true);
      setError(null);

      const [dashRes, leadsRes, queueRes] = await Promise.all([
        authFetch('/api/dashboard').catch(() => null),
        authFetch('/api/leads').catch(() => null),
        authFetch('/api/outreach/approval-queue').catch(() => null)
      ]);

      if (dashRes && dashRes.ok) {
        const dashData = await dashRes.json();
        if (dashData.success) setMetrics(dashData.metrics);
      }

      if (leadsRes && leadsRes.ok) {
        const leadsData = await leadsRes.json();
        if (leadsData.success) {
          setLeads(leadsData.leads || []);
          // Extract pending approval if queue endpoint isn't separate
          const pending = (leadsData.leads || []).filter(l => l.status === 'Pending Approval');
          setApprovalQueue(pending);
        }
      }

      if (queueRes && queueRes.ok) {
        const queueData = await queueRes.json();
        if (queueData.success && queueData.queue) {
          setApprovalQueue(queueData.queue);
        }
      }
    } catch (err) {
      console.error('Error fetching cockpit data:', err);
      setError(err.message || 'Could not connect to the automation backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  // Execute authenticated administrative actions
  const runAction = async (endpoint, actionName, body = {}) => {
    if (actionLoading) return;
    setActionLoading(true);
    setActionStatus(`Running ${actionName}...`);

    try {
      const res = await authFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setActionStatus(`✅ ${actionName} finished successfully!`);
        await fetchData();
      } else {
        setActionStatus(`❌ ${actionName} failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      setActionStatus(`❌ Error running ${actionName}: ${err.message}`);
    } finally {
      setActionLoading(false);
      setTimeout(() => setActionStatus(''), 7000);
    }
  };

  // Human Approval / Rejection triggers
  const handleApprove = async (leadId) => {
    await runAction('/api/outreach/approve', 'Approve Lead Draft', { leadId });
  };

  const handleReject = async (leadId) => {
    const reason = window.prompt('Reason for rejecting draft (optional):', 'Not a good fit / poor signal');
    if (reason !== null) {
      await runAction('/api/outreach/reject', 'Reject Lead Draft', { leadId, reason });
    }
  };

  // Dispatch approved outreach
  const handleDispatchApproved = async () => {
    const approvedCount = leads.filter(l => l.status === 'Approved' && l.platform === 'email').length;
    const modeLabel = dryRunMode ? 'SIMULATED DRY-RUN' : 'LIVE OUTREACH VIA GMAIL';

    if (approvedCount === 0) {
      alert('There are no Approved leads ready for dispatch. Please review and approve drafts first.');
      return;
    }

    const confirmed = window.confirm(
      `Confirm dispatch to ${approvedCount} approved lead(s)?\nMode: ${modeLabel}\n\nNo unauthorized or unapproved messages will be sent.`
    );

    if (confirmed) {
      await runAction('/api/outreach/send-initial', `Outreach Dispatch (${dryRunMode ? 'Dry Run' : 'Live'})`, {
        dryRun: dryRunMode
      });
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ---------------------------------------------------------------------------
  // AUTHENTICATION GATE SCREEN
  // ---------------------------------------------------------------------------
  if (!authToken) {
    return (
      <div className="min-h-screen bg-[#20201E] text-[#F5F0E8] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#272725] border border-[rgba(245,240,232,0.12)] rounded-2xl p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-[#C65D35] flex items-center justify-center text-white mb-6 mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl text-[#F5F0E8] tracking-tight">
              Neural Flow Cockpit
            </h2>
            <p className="text-xs font-mono text-[#A8A69E] mt-1.5">
              Restricted Operational Lead & Automation Console
            </p>
          </div>

          {authError && (
            <div className="p-3 mb-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label 
                htmlFor="admin-key" 
                className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#A8A69E] mb-2"
              >
                Admin Access Key
              </label>
              <input
                id="admin-key"
                type="password"
                value={loginKey}
                onChange={(e) => setLoginKey(e.target.value)}
                placeholder="Enter ADMIN_API_KEY..."
                className="w-full px-4 py-3 rounded-xl bg-[#20201E] border border-[rgba(245,240,232,0.15)] text-sm font-mono text-[#F5F0E8] focus:outline-none focus:border-[#C65D35] transition-colors"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-burnt-orange w-full py-3.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Enter Cockpit Console'}</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[rgba(245,240,232,0.08)] text-center">
            <p className="text-[11px] font-mono text-[#72706A]">
              Dev hint: default key is defined in <code className="text-[#C65D35]">ADMIN_API_KEY</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // AUTHENTICATED COCKPIT DASHBOARD
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#20201E] text-[#F5F0E8] flex flex-col font-sans">
      
      {/* Top Cockpit Header */}
      <header className="border-b border-[rgba(245,240,232,0.08)] bg-[#272725]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#C65D35] flex items-center justify-center font-bold text-sm text-white">
              NF
            </div>
            <div>
              <h1 className="text-base font-display font-bold text-[#F5F0E8] leading-none">
                Neural Flow Operations Cockpit
              </h1>
              <span className="font-mono text-[10px] text-[#A8A69E]">
                Autonomous Lead Engine & Human Review Pipeline
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Dry Run Toggle Badge */}
            <button
              onClick={() => setDryRunMode(!dryRunMode)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 transition-colors ${
                dryRunMode 
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}
              title="Click to toggle Dry Run Mode"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{dryRunMode ? 'DRY RUN: ON' : 'LIVE DISPATCH: ON'}</span>
            </button>

            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 text-[#A8A69E] hover:text-[#F5F0E8] rounded-lg bg-[#20201E] border border-[rgba(245,240,232,0.08)] transition"
              title="Refresh Cockpit Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-[#A8A69E] hover:text-red-400 rounded-lg bg-[#20201E] border border-[rgba(245,240,232,0.08)] transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Status & Alerts */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span className="text-xs font-mono">{error}</span>
          </div>
        )}

        {actionStatus && (
          <div className="p-4 bg-[#C65D35]/15 border border-[#C65D35]/40 text-[#F5F0E8] rounded-xl flex items-center justify-between text-xs font-mono animate-fade-in">
            <span>{actionStatus}</span>
            {actionLoading && <div className="w-4 h-4 border-2 border-[#C65D35] border-t-transparent rounded-full animate-spin" />}
          </div>
        )}

        {/* Safety Boundary Notice */}
        <div className="p-4 rounded-xl bg-[#272725] border border-[rgba(245,240,232,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#F5F0E8] block">
                Human-in-the-Loop Safety Enforced
              </span>
              <span className="text-[11px] text-[#A8A69E]">
                All AI-generated email drafts require explicit operator approval before outreach can be dispatched.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDispatchApproved}
              disabled={actionLoading}
              className="btn-burnt-orange text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Approved Leads</span>
            </button>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#272725] border border-[rgba(245,240,232,0.08)] rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-mono uppercase text-[#A8A69E]">Total Leads in CRM</span>
            <h3 className="text-3xl font-display font-bold text-[#F5F0E8] mt-2">{leads.length || metrics?.totalLeads || 0}</h3>
            <p className="text-[11px] text-[#C65D35] font-mono mt-1">Multi-channel database</p>
          </div>

          <div className="bg-[#272725] border border-[rgba(245,240,232,0.08)] rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-mono uppercase text-[#A8A69E]">Pending Human Review</span>
            <h3 className="text-3xl font-display font-bold text-amber-400 mt-2">{approvalQueue.length}</h3>
            <p className="text-[11px] text-[#A8A69E] font-mono mt-1">Drafts awaiting approval</p>
          </div>

          <div className="bg-[#272725] border border-[rgba(245,240,232,0.08)] rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-mono uppercase text-[#A8A69E]">Approved for Dispatch</span>
            <h3 className="text-3xl font-display font-bold text-emerald-400 mt-2">
              {leads.filter(l => l.status === 'Approved').length}
            </h3>
            <p className="text-[11px] text-[#A8A69E] font-mono mt-1">Ready for outreach</p>
          </div>

          <div className="bg-[#272725] border border-[rgba(245,240,232,0.08)] rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-mono uppercase text-[#A8A69E]">Avg AI ICP Fit</span>
            <h3 className="text-3xl font-display font-bold text-[#F5F0E8] mt-2">{metrics?.avgScore || '8.20'} / 10</h3>
            <p className="text-[11px] text-[#A8A69E] font-mono mt-1">Claude qualification score</p>
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="flex border-b border-[rgba(245,240,232,0.08)] gap-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('review')}
            className={`pb-3 font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'review'
                ? 'border-b-2 border-[#C65D35] text-[#C65D35]'
                : 'text-[#A8A69E] hover:text-[#F5F0E8]'
            }`}
          >
            <span>Review Queue</span>
            {approvalQueue.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#C65D35] text-white text-[10px]">
                {approvalQueue.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 font-semibold transition-colors ${
              activeTab === 'leads'
                ? 'border-b-2 border-[#C65D35] text-[#C65D35]'
                : 'text-[#A8A69E] hover:text-[#F5F0E8]'
            }`}
          >
            All Leads Database ({leads.length})
          </button>
        </div>

        {/* TAB 1: Human Approval Review Queue */}
        {activeTab === 'review' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-bold text-lg text-[#F5F0E8]">
                Drafts Awaiting Your Explicit Approval
              </h2>
              <span className="font-mono text-xs text-[#A8A69E]">
                {approvalQueue.length} draft(s) pending
              </span>
            </div>

            {approvalQueue.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#272725] border border-[rgba(245,240,232,0.08)]">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h3 className="font-display font-bold text-lg text-[#F5F0E8]">
                  Approval Queue is Clear
                </h3>
                <p className="text-xs text-[#A8A69E] max-w-sm mx-auto mt-1">
                  All qualified leads have been reviewed. Trigger new lead discovery and qualification to generate new drafts.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => runAction('/api/leads/discover', 'Lead Discovery')}
                    disabled={actionLoading}
                    className="btn-burnt-orange text-xs px-4 py-2 rounded-lg"
                  >
                    Run Discovery
                  </button>
                  <button
                    onClick={() => runAction('/api/leads/qualify', 'Lead Qualification')}
                    disabled={actionLoading}
                    className="px-4 py-2 rounded-lg bg-[#20201E] border border-[rgba(245,240,232,0.12)] text-xs font-mono"
                  >
                    Run Qualification
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {approvalQueue.map((lead) => (
                  <div
                    key={lead.lead_id}
                    className="p-6 rounded-2xl bg-[#272725] border border-[rgba(245,240,232,0.08)] hover:border-[#C65D35]/50 transition-all space-y-4 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(245,240,232,0.06)]">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-lg text-[#F5F0E8]">
                            {lead.business_name}
                          </h4>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#20201E] text-amber-400 border border-amber-400/30">
                            Fit Score: {lead.score}/10
                          </span>
                        </div>
                        <p className="font-mono text-xs text-[#A8A69E] mt-0.5">
                          Target: {lead.contact || 'No direct email found'} | Platform: {lead.platform}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(lead.lead_id)}
                          disabled={actionLoading}
                          className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/30 transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve Draft</span>
                        </button>
                        <button
                          onClick={() => handleReject(lead.lead_id)}
                          disabled={actionLoading}
                          className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold hover:bg-red-500/20 transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="bg-[#20201E] p-3.5 rounded-xl border border-[rgba(245,240,232,0.06)]">
                        <span className="text-[#A8A69E] block mb-1 uppercase font-bold text-[10px]">
                          Claude AI Rationale:
                        </span>
                        <p className="text-[#D4D2CA]">{lead.reasoning || 'Qualified based on ICP pain signals.'}</p>
                      </div>

                      <div className="bg-[#20201E] p-3.5 rounded-xl border border-[rgba(245,240,232,0.06)]">
                        <span className="text-[#A8A69E] block mb-1 uppercase font-bold text-[10px]">
                          Proposed Subject:
                        </span>
                        <p className="text-[#F5F0E8] font-bold">{lead.subject || 'Improving Neural Flow systems'}</p>
                      </div>
                    </div>

                    <div className="bg-[#20201E] p-3.5 rounded-xl border border-[rgba(245,240,232,0.06)] text-xs font-mono">
                      <span className="text-[#A8A69E] block mb-1 uppercase font-bold text-[10px]">
                        Draft Message Body:
                      </span>
                      <p className="text-[#D4D2CA] whitespace-pre-wrap leading-relaxed">
                        {lead.message || 'No draft message generated.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB 2: All Leads Database Table */}
        {activeTab === 'leads' && (
          <section className="bg-[#272725] border border-[rgba(245,240,232,0.08)] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-[rgba(245,240,232,0.08)] flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-[#F5F0E8]">All Discovered Leads</h3>
                <p className="text-xs font-mono text-[#A8A69E] mt-0.5">Showing {leads.length} leads stored in Google Sheets CRM</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[rgba(245,240,232,0.08)]">
                <thead className="bg-[#20201E]">
                  <tr>
                    <th scope="col" className="px-6 py-3.5 text-left text-[11px] font-mono font-bold text-[#A8A69E] uppercase tracking-wider">Business</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-[11px] font-mono font-bold text-[#A8A69E] uppercase tracking-wider">Platform</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-[11px] font-mono font-bold text-[#A8A69E] uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-[11px] font-mono font-bold text-[#A8A69E] uppercase tracking-wider">Score</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-[11px] font-mono font-bold text-[#A8A69E] uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-6 py-3.5 text-right text-[11px] font-mono font-bold text-[#A8A69E] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(245,240,232,0.06)] text-xs font-mono">
                  {leads.map((lead) => (
                    <tr key={lead.lead_id} className="hover:bg-[#20201E]/40 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-[#F5F0E8] font-bold">
                        {lead.business_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#A8A69E]">
                        {lead.platform}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          lead.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          lead.status === 'Pending Approval' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          lead.status === 'Contacted' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          lead.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                          'bg-[#20201E] text-[#A8A69E]'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#E07A52]">
                        {lead.score ? `${lead.score}/10` : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[#A8A69E] max-w-xs truncate">
                        {lead.contact || 'None'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {lead.message && (
                          <button
                            onClick={() => copyToClipboard(lead.message, lead.lead_id)}
                            className="text-[#A8A69E] hover:text-[#C65D35] transition inline-flex items-center gap-1"
                            title="Copy Pitch Message"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedId === lead.lead_id ? 'Copied!' : 'Copy'}</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
