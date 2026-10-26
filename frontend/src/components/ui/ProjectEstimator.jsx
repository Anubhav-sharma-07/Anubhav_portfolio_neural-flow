import React, { useState } from 'react';
import { Calendar, Check, ArrowRight } from 'lucide-react';

export default function ProjectEstimator({ onSelectScope }) {
  const [platformType, setPlatformType] = useState('business');
  const [selectedFeatures, setSelectedFeatures] = useState([
    'landing',
    'service-pages',
    'contact-form',
    'whatsapp'
  ]);

  const platformOptions = [
    { id: 'business', name: 'Business Website', baseDays: 10, audience: 'Clinics, services, manufacturing, consulting' },
    { id: 'webapp', name: 'Web Application', baseDays: 16, audience: 'Dashboards, portals, SaaS frontend, interactive tools' },
    { id: 'ai-automation', name: 'AI & Automation', baseDays: 12, audience: 'Workflow integrations, lead processing, AI assistants' }
  ];

  const featureOptions = [
    { id: 'landing', name: 'Landing Page', days: 2 },
    { id: 'service-pages', name: 'Service Pages', days: 3 },
    { id: 'contact-form', name: 'Contact Form', days: 1 },
    { id: 'whatsapp', name: 'WhatsApp Integration', days: 1 },
    { id: 'cms', name: 'Custom CMS / API', days: 4 },
    { id: 'seo', name: 'SEO Optimization', days: 2 }
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

  const handleRequestEstimate = () => {
    const selectedFeatureNames = selectedFeatures
      .map((id) => featureOptions.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const summary = `${currentPlatform.name} (~${estimatedDays} days estimate) | Features: ${selectedFeatureNames}`;
    
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
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
            ESTIMATOR
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-3">
            Get a quick project estimate
          </h2>
          <p className="text-base text-[#575550]">
            Select your platform and features to see an estimated timeline. This is a preliminary estimate and may change based on your exact requirements.
          </p>
        </div>

        {/* Two-Column Estimator Layout matching Visual Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Platform Selection + Checkboxes + Turnaround */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#20201E]/10 shadow-sm">
            {/* 1. Platform Type Dropdown */}
            <div className="mb-6">
              <label 
                htmlFor="platform-select" 
                className="block font-mono text-xs font-bold text-[#20201E] uppercase tracking-wider mb-2"
              >
                Project Type
              </label>
              <select
                id="platform-select"
                value={platformType}
                onChange={(e) => setPlatformType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F0E8] border border-[#20201E]/15 text-sm font-semibold text-[#20201E] focus:outline-none focus:ring-2 focus:ring-[#C65D35] cursor-pointer"
              >
                {platformOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name} — {opt.audience}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Key Features Checkboxes */}
            <div className="mb-8">
              <label className="block font-mono text-xs font-bold text-[#20201E] uppercase tracking-wider mb-3">
                Key Features
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featureOptions.map((feature) => {
                  const isChecked = selectedFeatures.includes(feature.id);
                  return (
                    <label
                      key={feature.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#F5F0E8] border-[#C65D35] text-[#20201E] font-semibold'
                          : 'bg-white border-[#20201E]/10 text-[#575550] hover:border-[#20201E]/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFeature(feature.id)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-[#C65D35] text-white' : 'border border-[#20201E]/30 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="flex-1">{feature.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. Estimated Turnaround & CTA */}
            <div className="pt-6 border-t border-[#20201E]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="font-mono text-xs text-[#72706A] block mb-1">
                  Estimated Turnaround
                </span>
                <div className="flex items-center gap-2 text-2xl font-display font-bold text-[#20201E]">
                  <Calendar className="w-6 h-6 text-[#C65D35]" />
                  <span>~ {estimatedDays} days</span>
                </div>
                <span className="font-mono text-[11px] text-[#87847C]">
                  (Preliminary estimate)
                </span>
              </div>

              <button
                type="button"
                onClick={handleRequestEstimate}
                className="btn-burnt-orange w-full sm:w-auto text-xs font-semibold px-6 py-3.5 rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Request a project estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Scope Summary Panel matching Visual Reference */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#20201E]/10 shadow-sm sticky top-28">
            <h3 className="font-display font-bold text-lg text-[#20201E] mb-6 pb-4 border-b border-[#20201E]/10">
              Scope Summary
            </h3>

            <div className="space-y-4 text-xs mb-8">
              <div className="flex justify-between items-center py-2 border-b border-[#20201E]/5">
                <span className="font-mono text-[#72706A]">Platform</span>
                <span className="font-semibold text-[#20201E]">{currentPlatform.name}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#20201E]/5">
                <span className="font-mono text-[#72706A]">Features</span>
                <span className="font-semibold text-[#20201E]">{selectedFeatures.length} selected</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#20201E]/5">
                <span className="font-mono text-[#72706A]">Estimated Turnaround</span>
                <span className="font-bold text-[#C65D35]">~ {estimatedDays} days</span>
              </div>

              <div className="py-2">
                <span className="font-mono text-[11px] text-[#72706A] uppercase tracking-wider block mb-1">
                  Selected Features:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedFeatures.map((id) => {
                    const f = featureOptions.find((item) => item.id === id);
                    return f ? (
                      <span key={id} className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#F5F0E8] text-[#20201E] border border-[#20201E]/10">
                        {f.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="p-3.5 rounded-xl bg-[#F5F0E8] border border-[#20201E]/10">
              <p className="font-mono text-[11px] text-[#575550] leading-relaxed">
                <strong>Note:</strong> This is a preliminary estimate. Final timeline may vary based on detailed requirements, content and integrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
