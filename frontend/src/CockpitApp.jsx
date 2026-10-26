import React, { useState, useEffect } from 'react';

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

export default function App() {
  const [metrics, setMetrics] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Fetch metrics and leads list
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [dashRes, leadsRes] = await Promise.all([
        fetch(`${API_BASE}/api/dashboard`),
        fetch(`${API_BASE}/api/leads`)
      ]);

      if (!dashRes.ok || !leadsRes.ok) {
        throw new Error('Server returned an error status.');
      }

      const dashData = await dashRes.json();
      const leadsData = await leadsRes.json();

      if (dashData.success) {
        setMetrics(dashData.metrics);
      } else {
        throw new Error(dashData.error || 'Failed to fetch dashboard metrics');
      }

      if (leadsData.success) {
        setLeads(leadsData.leads || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Could not connect to the automation backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Trigger backend endpoints
  const runAction = async (endpoint, actionName) => {
    if (actionLoading) return;
    setActionLoading(true);
    setActionStatus(`Running ${actionName}...`);
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionStatus(`✅ ${actionName} finished successfully!`);
        // Refresh data
        await fetchData();
      } else {
        setActionStatus(`❌ ${actionName} failed: ${data.error || 'Unknown error'}`);
      }
    } catch {
      setActionStatus(`❌ Connection error running ${actionName}`);
    } finally {
      setActionLoading(false);
      setTimeout(() => setActionStatus(''), 8000);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Group leads for "Discovery Activity" over last 7 days
  const getRecentDiscoveryData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-CA'); // YYYY-MM-DD
      last7Days.push({ date: dateStr, display: d.toLocaleDateString('en-US', { weekday: 'short' }), count: 0 });
    }

    leads.forEach(lead => {
      if (lead.date_added) {
        const addedStr = lead.date_added.split('T')[0];
        const dayObj = last7Days.find(day => day.date === addedStr);
        if (dayObj) {
          dayObj.count++;
        }
      }
    });

    const maxCount = Math.max(...last7Days.map(d => d.count), 1);
    return last7Days.map(d => ({
      ...d,
      heightPercentage: (d.count / maxCount) * 100
    }));
  };

  if (loading && !metrics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1329] text-gray-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-400">Loading Neural Flow Cockpit...</p>
        </div>
      </div>
    );
  }

  const recentDiscovery = getRecentDiscoveryData();

  return (
    <div className="min-h-screen bg-[#0b1329] text-gray-100 flex flex-col antialiased">
      {/* Header */}
      <header className="border-b border-[#1e293b] bg-[#0f172a]/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white">N</div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-200 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Neural Flow Outreach Control
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Refresh Cockpit Data"
            >
              <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4" />
              </svg>
            </button>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 mr-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              Live Dashboard
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-start space-x-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-semibold text-red-300">Connection Error</h3>
              <p className="text-sm mt-0.5 text-red-400/90">{error}</p>
            </div>
          </div>
        )}

        {/* Action Status Banner */}
        {actionStatus && (
          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl flex items-center justify-between animate-fade-in">
            <span className="text-sm font-medium">{actionStatus}</span>
            {actionLoading && <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>}
          </div>
        )}

        {/* Key Metrics Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#0f172a]/60 border border-[#1e293b] rounded-2xl p-6 hover:border-[#3b82f6]/40 transition shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full filter blur-xl group-hover:bg-blue-500/10 transition"></div>
            <p className="text-sm font-medium text-gray-400">Total Leads Found</p>
            <h3 className="text-3xl font-extrabold text-white mt-2">{metrics?.totalLeads || 0}</h3>
            <p className="text-xs text-indigo-400 mt-2 font-medium">Accumulated database</p>
          </div>

          <div className="bg-[#0f172a]/60 border border-[#1e293b] rounded-2xl p-6 hover:border-[#a855f7]/40 transition shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full filter blur-xl group-hover:bg-purple-500/10 transition"></div>
            <p className="text-sm font-medium text-gray-400">Average AI Fit Score</p>
            <h3 className="text-3xl font-extrabold text-white mt-2">{metrics?.avgScore || '0.00'}</h3>
            <p className="text-xs text-indigo-400 mt-2 font-medium">Out of 10 (fit threshold ≥ 6)</p>
          </div>

          <div className="bg-[#0f172a]/60 border border-[#1e293b] rounded-2xl p-6 hover:border-[#10b981]/40 transition shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full filter blur-xl group-hover:bg-emerald-500/10 transition"></div>
            <p className="text-sm font-medium text-gray-400">Email Reply Rate</p>
            <h3 className="text-3xl font-extrabold text-white mt-2">{metrics?.replyRate || '0.0%'}</h3>
            <p className="text-xs text-emerald-400 mt-2 font-medium">Replied / Contacted leads</p>
          </div>

          <div className="bg-[#0f172a]/60 border border-[#1e293b] rounded-2xl p-6 hover:border-[#f59e0b]/40 transition shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-xl group-hover:bg-amber-500/10 transition"></div>
            <p className="text-sm font-medium text-gray-400">Conversion Rate</p>
            <h3 className="text-3xl font-extrabold text-white mt-2">{metrics?.conversionRate || '0.0%'}</h3>
            <p className="text-xs text-indigo-400 mt-2 font-medium">Clients / Total leads</p>
          </div>

        </section>

        {/* Cockpit Actions Board */}
        <section className="bg-[#0f172a]/40 border border-[#1e293b] rounded-2xl p-6">
          <h2 className="text-lg font-semibold tracking-wide text-indigo-300 border-b border-[#1e293b] pb-3 mb-6">Cockpit Trigger Board</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            <button
              onClick={() => runAction('/api/leads/discover', 'Lead Discovery')}
              disabled={actionLoading}
              className="p-4 bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-[#334155] rounded-xl flex flex-col items-center text-center space-y-2 hover:border-indigo-500 hover:from-indigo-950/20 hover:to-[#0f172a] transition disabled:opacity-50"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <span className="text-xs font-semibold">1. Discovery</span>
            </button>

            <button
              onClick={() => runAction('/api/leads/qualify', 'Lead Qualification')}
              disabled={actionLoading}
              className="p-4 bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-[#334155] rounded-xl flex flex-col items-center text-center space-y-2 hover:border-indigo-500 hover:from-indigo-950/20 hover:to-[#0f172a] transition disabled:opacity-50"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <span className="text-xs font-semibold">2. Qualify & Score</span>
            </button>

            <button
              onClick={() => runAction('/api/outreach/send-initial', 'Email Outreach')}
              disabled={actionLoading}
              className="p-4 bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-[#334155] rounded-xl flex flex-col items-center text-center space-y-2 hover:border-indigo-500 hover:from-indigo-950/20 hover:to-[#0f172a] transition disabled:opacity-50"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-2 11H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2z" /></svg>
              </div>
              <span className="text-xs font-semibold">3. Send Emails</span>
            </button>

            <button
              onClick={() => runAction('/api/outreach/check-replies', 'Reply Follow-up')}
              disabled={actionLoading}
              className="p-4 bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-[#334155] rounded-xl flex flex-col items-center text-center space-y-2 hover:border-indigo-500 hover:from-indigo-950/20 hover:to-[#0f172a] transition disabled:opacity-50"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <span className="text-xs font-semibold">4. Reply Check</span>
            </button>

            <button
              onClick={() => runAction('/api/queue/sync', 'Manual Queue Sync')}
              disabled={actionLoading}
              className="p-4 bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-[#334155] rounded-xl flex flex-col items-center text-center space-y-2 hover:border-indigo-500 hover:from-indigo-950/20 hover:to-[#0f172a] transition disabled:opacity-50"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <span className="text-xs font-semibold">5. Social Sync</span>
            </button>

            <button
              onClick={() => runAction('/api/dashboard/sync', 'Dashboard Sync')}
              disabled={actionLoading}
              className="p-4 bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-[#334155] rounded-xl flex flex-col items-center text-center space-y-2 hover:border-indigo-500 hover:from-indigo-950/20 hover:to-[#0f172a] transition disabled:opacity-50"
            >
              <div className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
              </div>
              <span className="text-xs font-semibold">6. Sync Metrics</span>
            </button>

          </div>
        </section>

        {/* Funnel Pipeline & Performance Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Funnel Pipeline Visualizer */}
          <div className="lg:col-span-2 bg-[#0f172a]/40 border border-[#1e293b] rounded-2xl p-6 flex flex-col">
            <h2 className="text-lg font-semibold tracking-wide text-indigo-300 pb-3 mb-6 border-b border-[#1e293b]">Outreach Funnel Pipeline</h2>
            
            <div className="flex-1 flex flex-col justify-center space-y-6">
              {[
                { stage: 'New Discoveries', key: 'New', color: 'from-blue-600 to-blue-500' },
                { stage: 'AI Qualified', key: 'Qualified', color: 'from-purple-600 to-purple-500' },
                { stage: 'Outreach Contacted', key: 'Contacted', color: 'from-amber-600 to-amber-500' },
                { stage: 'Leads Replied', key: 'Replied', color: 'from-emerald-600 to-emerald-500' },
                { stage: 'Signed Clients', key: 'Client', color: 'from-indigo-600 to-indigo-500' }
              ].map((stage, idx) => {
                const count = metrics?.statusCounts?.[stage.key] || 0;
                // Base percentage on total leads to show proportional drop off
                const percentage = metrics?.totalLeads > 0 ? (count / metrics.totalLeads) * 100 : 0;
                
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-gray-300">{stage.stage}</span>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono font-bold">{count}</span>
                        <span className="text-slate-400 font-mono">({percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-[#1e293b] h-3.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${stage.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Social Platforms & Discovery Volume */}
          <div className="space-y-8 flex flex-col">
            
            {/* Social Platform Distribution */}
            <div className="bg-[#0f172a]/40 border border-[#1e293b] rounded-2xl p-6">
              <h2 className="text-lg font-semibold tracking-wide text-indigo-300 pb-3 mb-6 border-b border-[#1e293b]">Platform Mix</h2>
              <div className="space-y-4">
                {[
                  { name: 'Email Campaign', count: metrics?.platformCounts?.email || 0, color: 'bg-blue-500' },
                  { name: 'LinkedIn (Manual)', count: metrics?.platformCounts?.linkedin || 0, color: 'bg-sky-600' },
                  { name: 'Instagram (Manual)', count: metrics?.platformCounts?.instagram || 0, color: 'bg-pink-500' }
                ].map((platform, idx) => {
                  const total = (metrics?.platformCounts?.email || 0) + 
                                (metrics?.platformCounts?.linkedin || 0) + 
                                (metrics?.platformCounts?.instagram || 0) || 1;
                  const pct = (platform.count / total) * 100;
                  
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-medium">{platform.name}</span>
                        <span className="font-mono text-gray-200 font-bold">{platform.count} ({pct.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full bg-[#1e293b] h-2.5 rounded-full overflow-hidden">
                        <div className={`h-full ${platform.color} rounded-full`} style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Discovery Trend (Last 7 Days) */}
            <div className="bg-[#0f172a]/40 border border-[#1e293b] rounded-2xl p-6 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold tracking-wide text-indigo-300 pb-3 mb-4 border-b border-[#1e293b]">Recent Discoveries</h2>
              <div className="flex-1 flex items-end justify-between px-2 pt-6 h-36">
                {recentDiscovery.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center space-y-2 w-full">
                    <div className="text-[10px] font-mono text-indigo-400 font-bold">{day.count}</div>
                    <div className="w-6 bg-[#1e293b] rounded-t-md relative flex items-end overflow-hidden" style={{ height: '90px' }}>
                      <div
                        className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-md transition-all duration-1000"
                        style={{ height: `${day.heightPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-semibold">{day.display}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </section>

        {/* Leads Outreach Queue & Review Dashboard */}
        <section className="bg-[#0f172a]/40 border border-[#1e293b] rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-[#1e293b] flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-wide text-indigo-300">Outreach Queue & AI Custom Message Review</h2>
              <p className="text-xs text-gray-400 mt-1">Review, copy generated copywriting scripts, or inspect lead validation logs</p>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Showing {leads.slice(0, 30).length} of {leads.length} leads
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1e293b]">
              <thead className="bg-[#0f172a]/80">
                <tr>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Business Name</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Platform</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Details</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Score</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Personalized Copywriting</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b] bg-slate-900/10">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-400">
                      No leads present in your Google sheet yet. Run "Lead Discovery" to get started!
                    </td>
                  </tr>
                ) : (
                  leads.slice(0, 50).map((lead, idx) => {
                    const statusColors = {
                      'New': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                      'Rejected': 'bg-red-500/10 text-red-400 border-red-500/20',
                      'Qualified': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                      'Contacted': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                      'Replied': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                      'Queued for Manual Send': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
                      'No Response - Archive': 'bg-slate-700/20 text-slate-400 border-slate-700/30'
                    };

                    const statusClass = statusColors[lead.status] || 'bg-slate-500/10 text-gray-400 border-slate-500/20';

                    return (
                      <tr key={idx} className="hover:bg-slate-800/20 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-200">
                          {lead.business_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded font-medium ${
                            lead.platform === 'email' ? 'bg-blue-500/10 text-blue-400' :
                            lead.platform === 'linkedin' ? 'bg-sky-600/10 text-sky-400' :
                            'bg-pink-500/10 text-pink-400'
                          }`}>
                            {lead.platform}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-400">
                          {lead.contact ? (
                            lead.platform === 'email' ? lead.contact : (
                              <a href={lead.contact} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                                Profile link ↗
                              </a>
                            )
                          ) : (
                            <span className="italic text-gray-500">None</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-300">
                          {lead.score ? (
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              Number(lead.score) >= 8 ? 'text-emerald-400 bg-emerald-400/5' :
                              Number(lead.score) >= 6 ? 'text-purple-400 bg-purple-400/5' :
                              'text-red-400 bg-red-400/5'
                            }`}>
                              {lead.score}/10
                            </span>
                          ) : '-'}
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-300 max-w-xs truncate" title={lead.message}>
                          {lead.message ? (
                            <div className="flex items-center space-x-2">
                              <span className="truncate flex-1">{lead.message}</span>
                              <button
                                onClick={() => copyToClipboard(lead.message, lead.lead_id)}
                                className="p-1 hover:bg-slate-800 text-gray-400 hover:text-white rounded"
                                title="Copy script"
                              >
                                {copiedId === lead.lead_id ? (
                                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                ) : (
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="italic text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${statusClass}`}>
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
        
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e293b] bg-[#0c1020] py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <span>&copy; {new Date().getFullYear()} Neural Flow Automation Cockpit. All rights reserved.</span>
          <span>Last metrics sync: {metrics?.lastUpdated || 'Never'}</span>
        </div>
      </footer>
    </div>
  );
}
