import React, { useState } from 'react';
import { Check, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function MomentumCalculator({ onSelectScope }) {
  const [platformType, setPlatformType] = useState('webapp');
  const [selectedAddons, setSelectedAddons] = useState(['responsive', 'seo']);

  const platformOptions = [
    { id: 'landing', name: 'High-Impact Business Website', baseDays: 7, tech: 'React 19 · Vite · Tailwind' },
    { id: 'clinic', name: 'Clinic & Appointment Portal', baseDays: 10, tech: 'React · Patient Booking UI' },
    { id: 'webapp', name: 'Full-Stack Web App / Portal', baseDays: 14, tech: 'React / Next.js · Supabase' },
    { id: 'ai', name: 'Practical AI Tool / Integration', baseDays: 12, tech: 'React · Claude / Groq API' },
  ];

  const addonOptions = [
    { id: 'responsive', name: 'Multi-device responsive layout (phones, tablets, desktop)' },
    { id: 'seo', name: 'Fast on phones & technical SEO foundation' },
    { id: 'a11y', name: 'Accessible keyboard navigation & contrast' },
    { id: 'auth', name: 'Authentication & database setup (Supabase)' },
  ];

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => 
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const currentPlatform = platformOptions.find((p) => p.id === platformType) || platformOptions[0];
  const calculatedDays = currentPlatform.baseDays + (selectedAddons.length * 1.5);

  const handleApplyToContact = () => {
    const summary = `${currentPlatform.name} (~${Math.round(calculatedDays)} days estimated) | Add-ons: ${selectedAddons.join(', ')}`;
    if (onSelectScope) {
      onSelectScope(summary);
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hairline-ivory rounded-3xl p-6 sm:p-10 bg-white border border-[#20201E]/10 shadow-xl max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#20201E]/10">
        <div>
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-1">
            PROJECT ESTIMATOR
          </span>
          <h3 className="text-2xl font-display font-bold text-[#20201E]">
            Sprint Scope & Turnaround Estimator
          </h3>
        </div>

        {/* Turnaround Badge (Unmeasured velocity removed) */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#F5F0E8] border border-[#20201E]/10">
          <Clock className="w-5 h-5 text-[#C65D35]" />
          <div>
            <span className="font-mono text-[10px] text-[#575550] uppercase block">Typical Sprint</span>
            <span className="font-mono font-bold text-sm text-[#20201E]">1 – 3 Weeks</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Configurator Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Platform Type */}
          <div>
            <label className="block font-mono text-xs font-bold text-[#575550] uppercase tracking-wider mb-3">
              1. Select Digital Platform Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {platformOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPlatformType(opt.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                    platformType === opt.id
                      ? 'bg-[#20201E] text-[#F5F0E8] border-[#20201E] font-semibold shadow-sm'
                      : 'bg-[#F5F0E8] text-[#575550] border-[#20201E]/10 hover:border-[#C65D35]'
                  }`}
                >
                  <span className="block mb-1">{opt.name}</span>
                  <span className="font-mono text-[10px] opacity-75 block">{opt.tech}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Architecture Addons */}
          <div>
            <label className="block font-mono text-xs font-bold text-[#575550] uppercase tracking-wider mb-3">
              2. Included Deliverables & Features
            </label>
            <div className="space-y-2">
              {addonOptions.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-[#C65D35]/10 border-[#C65D35] text-[#20201E] font-medium'
                        : 'bg-[#F5F0E8] border-[#20201E]/10 text-[#575550]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                      isChecked ? 'bg-[#C65D35] border-[#C65D35] text-white' : 'border-[#87847C]'
                    }`}>
                      {isChecked && <Check className="w-3 h-3" />}
                    </div>
                    <span>{addon.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output Scorecard */}
        <div className="lg:col-span-5 bg-[#20201E] text-[#F5F0E8] p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between font-mono text-xs text-[#A8A69E] mb-4 pb-3 border-b border-[rgba(245,240,232,0.1)]">
              <span>ESTIMATED SPRINT</span>
              <span className="text-[#C65D35]">DIRECT DELIVERY</span>
            </div>

            <div className="mb-6">
              <span className="font-mono text-xs text-[#A8A69E] block mb-1">Estimated Turnaround:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-bold text-[#F5F0E8]">
                  ~{Math.round(calculatedDays)} Days
                </span>
                <span className="text-xs font-mono text-[#C65D35]">Focused Sprint</span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs text-[#A8A69E] mb-8">
              <div className="flex items-center justify-between py-1.5 border-b border-[rgba(245,240,232,0.06)]">
                <span>Codebase:</span>
                <span className="text-[#F5F0E8]">100% Owned by Client</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[rgba(245,240,232,0.06)]">
                <span>Communication:</span>
                <span className="text-[#F5F0E8]">Direct with Engineer</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[rgba(245,240,232,0.06)]">
                <span>Post-Launch Support:</span>
                <span className="text-[#C65D35]">Direct Bug Fix Support</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleApplyToContact}
            className="w-full btn-burnt-orange text-xs py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <span>Start a project with this scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
