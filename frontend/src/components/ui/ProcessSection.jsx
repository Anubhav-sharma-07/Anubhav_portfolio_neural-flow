import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Reveal from '../motion/Reveal';
import DrawPath from '../motion/DrawPath';

/**
 * ProcessSection component
 * - Features an SVG line that draws itself through Brief -> Design -> Build -> Launch as it scrolls into view.
 * - One line of description per step.
 * - Responsive: Connected horizontal line on desktop (lg+), vertical track on mobile.
 */
export default function ProcessSection({ steps = [] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <section 
      id="process"
      className="py-24 sm:py-32 bg-[#20201E] text-[#F5F0E8] border-t border-[rgba(245,240,232,0.08)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal direction="up" className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
            // DELIVERY PROCESS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F0E8] tracking-tight mb-4">
            Predictable, transparent execution.
          </h2>
          <p className="text-base text-[#A8A69E]">
            From alignment to launch, every phase has agreed deliverables, zero scope ambiguity, and direct developer communication.
          </p>
        </Reveal>

        {/* Process Flow with SVG DrawPath */}
        <div className="relative mb-16">
          
          {/* Desktop SVG Connecting Draw Line */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] z-0 pointer-events-none">
            <DrawPath
              d="M 0,20 L 800,20"
              viewBox="0 0 800 40"
              strokeColor="#C65D35"
              strokeWidth={3}
              duration={1400}
              delay={200}
            />
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <Reveal
                key={step.number}
                direction="up"
                delay={idx * 100}
                className="h-full"
              >
                <div className="h-full rounded-2xl bg-[#272725] border border-[rgba(245,240,232,0.08)] p-6 sm:p-7 flex flex-col justify-between hover:border-[#C65D35]/50 transition-all duration-300 group">
                  <div>
                    {/* Node Circle & Step Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#20201E] border-2 border-[#C65D35] flex items-center justify-center font-mono text-sm font-bold text-[#F5F0E8] group-hover:scale-110 group-hover:bg-[#C65D35] group-hover:text-white transition-all shadow-md">
                        {step.number}
                      </div>
                      <span className="font-mono text-[10px] text-[#72706A] uppercase tracking-widest">
                        PHASE {idx + 1}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-2xl font-display font-bold text-[#F5F0E8] mb-2 group-hover:text-[#C65D35] transition-colors">
                      {step.title}
                    </h3>

                    {/* Single Line Description (Mandated by Prompt) */}
                    <p className="text-sm text-[#A8A69E] leading-relaxed mb-6 font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Agreed Milestone Marker */}
                  <div className="pt-4 border-t border-[rgba(245,240,232,0.06)] flex items-center gap-2 text-xs font-mono text-[#C65D35]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C65D35]" />
                    <span>Clear Milestone Review</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
