import React, { useState } from 'react';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import Reveal from '../motion/Reveal';

/**
 * PricingSection component
 * - Toggle between "Fixed project" and "Monthly support".
 * - RULE: Renders NO fake numbers when hasRealPrices is false.
 * - Provides clear deliverable scopes and a "Get a quote" CTA.
 */
export default function PricingSection({ pricing }) {
  const [activeTab, setActiveTab] = useState('fixed-project');

  if (!pricing || !pricing.models || pricing.models.length === 0) return null;

  const currentModel = pricing.models.find((m) => m.id === activeTab) || pricing.models[0];

  return (
    <section 
      id="pricing"
      className="py-24 sm:py-32 bg-[#20201E] text-[#F5F0E8] border-t border-[rgba(245,240,232,0.08)] relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
            // ENGAGEMENT MODELS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F0E8] tracking-tight mb-4">
            Simple, transparent collaboration.
          </h2>
          <p className="text-base text-[#A8A69E]">
            Choose between a dedicated sprint build with fixed milestones or ongoing monthly technical support.
          </p>
        </Reveal>

        {/* Toggle Pills (Fixed project / Monthly support) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#2A2A28] border border-[rgba(245,240,232,0.1)]">
            {pricing.models.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => setActiveTab(model.id)}
                className={`font-mono text-xs font-semibold px-5 py-2.5 rounded-full min-h-[44px] transition-all duration-200 cursor-pointer ${
                  activeTab === model.id
                    ? 'bg-[#B24F29] text-white shadow-md'
                    : 'text-[#D4D2CA] hover:text-[#F5F0E8]'
                }`}
              >
                {model.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Engagement Model Card */}
        <Reveal direction="scale" delay={150}>
          <div className="rounded-3xl bg-[#272725] border border-[rgba(245,240,232,0.12)] p-8 sm:p-12 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6 pb-6 border-b border-[rgba(245,240,232,0.08)]">
              <div>
                <span className="font-mono text-xs text-[#E07A52] font-semibold uppercase tracking-wider block mb-1">
                  {currentModel.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F0E8]">
                  {currentModel.title}
                </h3>
              </div>

              {/* No fake prices shown; honest scoping CTA */}
              <div className="text-left sm:text-right">
                <span className="font-mono text-[11px] text-[#A8A69E] block">Investment</span>
                <span className="font-display font-bold text-xl text-[#F5F0E8]">Custom Scope</span>
              </div>
            </div>

            <p className="text-sm text-[#A8A69E] leading-relaxed mb-8">
              {currentModel.description}
            </p>

            {/* Scope Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {currentModel.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#F5F0E8] font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#E07A52] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-[rgba(245,240,232,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-xs text-[#A8A69E]">
                Includes fixed agreement and zero surprise invoices.
              </span>
              <a
                href="#contact"
                className="btn-burnt-orange w-full sm:w-auto px-7 py-3 text-xs font-semibold rounded-lg inline-flex items-center justify-center gap-2"
              >
                <span>{currentModel.ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
