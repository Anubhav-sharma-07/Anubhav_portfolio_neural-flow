import React, { useState } from 'react';
import { Calendar, Check, ArrowRight } from 'lucide-react';

export default function ProjectEstimator({ onSelectScope }) {
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD'
  const [platformType, setPlatformType] = useState('business');
  const [selectedFeatures, setSelectedFeatures] = useState([
    'landing',
    'service-pages',
    'contact-form',
    'whatsapp'
  ]);

  const platformOptions = [
    { 
      id: 'business', 
      name: 'Business Website', 
      baseDays: 7, 
      baseInr: 5999, 
      baseUsd: 89,
      audience: 'Clinics, cafes, coaching centres, and local businesses',
      summary: 'Clean, mobile-friendly website that brings you real customer enquiries'
    },
    { 
      id: 'webapp', 
      name: 'Custom Web Application', 
      baseDays: 14, 
      baseInr: 18000, 
      baseUsd: 249,
      audience: 'Founders and businesses needing customer portals or custom tools',
      summary: 'Custom screens built around your business with database setup'
    },
    { 
      id: 'ai-automation', 
      name: 'Chatbot & Work Automation', 
      baseDays: 10, 
      baseInr: 15000, 
      baseUsd: 199,
      audience: 'Businesses wanting to cut daily manual tasks and answer customers fast',
      summary: 'Chatbot that answers customers, saves leads, and updates your spreadsheets'
    }
  ];

  const featureOptions = [
    // Scope & Pages
    { id: 'landing', name: 'High-Converting Home Page', days: 2, inr: 1500, usd: 25, category: 'scope', plainDesc: 'Clear value proposition, service highlights, and mobile hero' },
    { id: 'service-pages', name: 'Individual Service Pages', days: 3, inr: 2500, usd: 35, category: 'scope', plainDesc: 'Dedicated pages for each service or treatment with transparent pricing' },
    { id: 'contact-form', name: 'Contact form that blocks spam', days: 1, inr: 1000, usd: 15, category: 'scope', plainDesc: 'Blocks spam bots and delivers enquiries straight to your email' },
    { id: 'whatsapp', name: 'WhatsApp button on every page', days: 1, inr: 500, usd: 10, category: 'integrations', plainDesc: 'Lets customers message you in one click with a prefilled greeting' },
    { id: 'cms', name: 'Edit your own content without calling me', days: 4, inr: 4500, usd: 60, category: 'integrations', plainDesc: 'Easily update text, prices, and photos from a simple dashboard' },
    { id: 'ai-assistant', name: 'Chatbot that answers customers and collects leads', days: 4, inr: 5000, usd: 70, category: 'integrations', plainDesc: 'Answers common questions 24/7 and saves customer contact details' },
    { id: 'seo', name: 'Set up so Google can find you', days: 2, inr: 1500, usd: 20, category: 'integrations', plainDesc: 'Proper search tags, descriptions, and sitemap for search engines' }
  ];

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const currentPlatform = platformOptions.find((p) => p.id === platformType) || platformOptions[0];
  
  // Calculate estimated days based on base days + selected feature days
  const addedDays = selectedFeatures.reduce((acc, fId) => {
    const f = featureOptions.find((item) => item.id === fId);
    return acc + (f ? f.days : 0);
  }, 0);

  const estimatedDays = currentPlatform.baseDays + addedDays;

  // Calculate indicative pricing
  const isINR = currency === 'INR';
  const basePrice = isINR ? currentPlatform.baseInr : currentPlatform.baseUsd;
  const addedPrice = selectedFeatures.reduce((acc, fId) => {
    const f = featureOptions.find((item) => item.id === fId);
    return acc + (f ? (isINR ? f.inr : f.usd) : 0);
  }, 0);

  const totalPrice = basePrice + addedPrice;
  const priceDisplay = isINR 
    ? `₹${totalPrice.toLocaleString('en-IN')}` 
    : `$${totalPrice.toLocaleString('en-US')}`;

  const handleRequestEstimate = () => {
    const selectedFeatureNames = selectedFeatures
      .map((id) => featureOptions.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const summary = `${currentPlatform.name} (~${estimatedDays} days estimate | Indicative: ${priceDisplay} ${currency}) | Features: ${selectedFeatureNames}`;
    
    if (onSelectScope) {
      onSelectScope(summary);
    }

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="estimator" 
      className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Region Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE5DB] border border-[#20201E]/10 text-[#C65D35] font-mono text-xs font-bold mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#C65D35] animate-pulse" />
              <span>TRANSPARENT SCOPE & TIMELINE CALCULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-3">
              Calculate your project estimate
            </h2>
            <p className="text-base text-[#575550] leading-relaxed">
              Select your platform and features to see an indicative timeline and investment range. No surprises or opaque agency markups.
            </p>
          </div>

          {/* Regional Currency Toggle */}
          <div className="flex items-center gap-2 bg-[#EBE5DB] p-1.5 rounded-xl border border-[#20201E]/10 shrink-0">
            <span className="font-mono text-[11px] text-[#72706A] px-2 font-semibold">Currency:</span>
            <button
              type="button"
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                isINR 
                  ? 'bg-[#20201E] text-[#F5F0E8] shadow-xs' 
                  : 'text-[#575550] hover:text-[#20201E]'
              }`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                !isINR 
                  ? 'bg-[#20201E] text-[#F5F0E8] shadow-xs' 
                  : 'text-[#575550] hover:text-[#20201E]'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Two-Column Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Scope Builder (col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#20201E]/10 shadow-sm space-y-8">
            
            {/* Step 1: Platform Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider">
                  Step 1 — Choose Project Platform
                </span>
                <span className="text-[11px] font-mono text-[#72706A]">Base scope</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {platformOptions.map((opt) => {
                  const isSelected = platformType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPlatformType(opt.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#F5F0E8] border-[#C65D35] ring-1 ring-[#C65D35]/30 shadow-xs'
                          : 'bg-white border-[#20201E]/10 hover:border-[#20201E]/25'
                      }`}
                    >
                      <span className={`font-display font-bold text-sm block mb-1 ${
                        isSelected ? 'text-[#20201E]' : 'text-[#575550]'
                      }`}>
                        {opt.name}
                      </span>
                      <span className="font-mono text-[11px] text-[#72706A] block leading-snug line-clamp-2">
                        {opt.audience}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Key Pages & Scope Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider">
                  Step 2 — Select Pages & Features
                </span>
                <span className="text-[11px] font-mono text-[#72706A]">Customizable deliverables</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featureOptions.map((feature) => {
                  const isChecked = selectedFeatures.includes(feature.id);
                  const priceTag = isINR ? `+₹${feature.inr}` : `+$${feature.usd}`;

                  return (
                    <label
                      key={feature.id}
                      className={`flex flex-col justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#F5F0E8] border-[#C65D35] shadow-2xs'
                          : 'bg-white border-[#20201E]/10 hover:border-[#20201E]/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleFeature(feature.id)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-[#C65D35] text-white' : 'border border-[#20201E]/30 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <span className={`text-xs font-bold block ${isChecked ? 'text-[#20201E]' : 'text-[#575550]'}`}>
                            {feature.name}
                          </span>
                          <span className="text-[11px] text-[#72706A] block leading-snug mt-0.5">
                            {feature.plainDesc}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 mt-2 border-t border-[#20201E]/5 flex items-center justify-between font-mono text-[10px]">
                        <span className="text-[#87847C]">+~{feature.days} days</span>
                        <span className="font-bold text-[#C65D35]">{priceTag}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Clear Boundaries */}
            <div className="p-4 rounded-2xl bg-[#F5F0E8] border border-[#20201E]/10 space-y-2 text-xs font-mono">
              <span className="font-bold text-[#20201E] block uppercase text-[10px] tracking-wider">
                What Every Project Includes:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#575550]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C65D35]" />
                  <span>100% full source code ownership</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C65D35]" />
                  <span>Tested sub-second load times</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C65D35]" />
                  <span>Cross-device phone & tablet QA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C65D35]" />
                  <span>14-day post-launch warranty</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Estimate & Scope Summary Panel (col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#20201E]/10 shadow-sm sticky top-28 space-y-6">
            
            <div className="pb-4 border-b border-[#20201E]/10 flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-[#20201E]">
                Scope Summary
              </h3>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBE5DB] text-[#20201E]">
                {currency} Estimate
              </span>
            </div>

            {/* Calculations Display */}
            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center py-2 border-b border-[#20201E]/5">
                <span className="text-[#72706A]">Selected Platform:</span>
                <span className="font-bold text-[#20201E]">{currentPlatform.name}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#20201E]/5">
                <span className="text-[#72706A]">Features Selected:</span>
                <span className="font-bold text-[#20201E]">{selectedFeatures.length} item(s)</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#20201E]/5">
                <span className="text-[#72706A]">Estimated Turnaround:</span>
                <div className="flex items-center gap-1.5 font-display font-bold text-sm text-[#20201E]">
                  <Calendar className="w-4 h-4 text-[#C65D35]" />
                  <span>~ {estimatedDays} business days</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#EBE5DB]/80 border border-[#20201E]/10 text-center">
                <span className="font-mono text-[10px] uppercase font-bold text-[#72706A] block mb-1">
                  Indicative Project Investment:
                </span>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#20201E] tracking-tight">
                  {priceDisplay}
                </div>
                <span className="font-mono text-[10px] text-[#87847C] block mt-1">
                  (Indicative starting estimate based on selected deliverables)
                </span>
              </div>
            </div>

            {/* Selected Pills */}
            <div className="py-2">
              <span className="font-mono text-[11px] text-[#72706A] uppercase font-bold tracking-wider block mb-2">
                Deliverable Checklist:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedFeatures.map((id) => {
                  const f = featureOptions.find((item) => item.id === id);
                  return f ? (
                    <span key={id} className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-[#F5F0E8] text-[#20201E] border border-[#20201E]/10">
                      {f.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleRequestEstimate}
              className="btn-burnt-orange w-full text-xs font-semibold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Transfer to Enquiry Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="font-mono text-[11px] text-[#87847C] text-center leading-relaxed">
              * Indicative calculations help define initial scope. Final formal proposals are reviewed personally by Anubhav with zero obligation.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
