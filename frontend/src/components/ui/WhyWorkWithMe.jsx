import React from 'react';
import { Check, X } from 'lucide-react';
import Reveal from '../motion/Reveal';

/**
 * WhyWorkWithMe component
 * - 2-column "Us vs Them" comparison.
 * - Staggered row-by-row entrance.
 * - Only includes honest, verified claims for an independent specialist.
 */
export default function WhyWorkWithMe({ data }) {
  if (!data || !data.rows || data.rows.length === 0) return null;

  return (
    <section 
      id="why-me"
      className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
            {data.tagline || '// WHY WORK WITH ME'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-4">
            {data.title || 'Direct engineering, zero agency overhead.'}
          </h2>
          <p className="text-base text-[#575550]">
            {data.subtitle || 'When you hire Neural Flow, you collaborate directly with the senior developer building your product.'}
          </p>
        </Reveal>

        {/* 2-Column Comparison Table Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 font-mono text-xs uppercase tracking-wider font-bold">
          <div className="hidden md:block md:col-span-4 text-[#87847C] pl-4">
            Feature & Standard
          </div>
          <div className="hidden md:block md:col-span-4 text-[#C65D35] pl-4">
            Neural Flow (Direct Partner)
          </div>
          <div className="hidden md:block md:col-span-4 text-[#87847C] pl-4">
            Traditional Agency / Templates
          </div>
        </div>

        {/* Rows Reveal Staggered One by One */}
        <div className="space-y-4">
          {data.rows.map((row, idx) => (
            <Reveal
              key={row.feature}
              direction="up"
              delay={idx * 100}
            >
              <div className="rounded-2xl bg-white border border-[#20201E]/10 p-5 sm:p-6 shadow-xs hover:border-[#C65D35]/40 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Feature Title */}
                  <div className="md:col-span-4 font-display font-bold text-base text-[#20201E]">
                    {row.feature}
                  </div>

                  {/* With Me Column */}
                  <div className="md:col-span-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-[#20201E] font-medium flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{row.me}</span>
                  </div>

                  {/* With Them Column */}
                  <div className="md:col-span-4 p-3.5 rounded-xl bg-[#20201E]/5 border border-[#20201E]/10 text-xs text-[#575550] flex items-start gap-2.5">
                    <X className="w-4 h-4 text-[#87847C] shrink-0 mt-0.5" />
                    <span>{row.them}</span>
                  </div>

                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
