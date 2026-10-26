import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ProcessSection({ steps = [], note }) {
  const processSteps = steps.length > 0 ? steps : [
    { number: "01", title: "Discover", description: "Understand your goals, requirements and audience." },
    { number: "02", title: "Plan", description: "Build a clear scope, feature list and timeline." },
    { number: "03", title: "Design", description: "Create wireframes and visual designs for your approval." },
    { number: "04", Develop: "Develop", title: "Develop", description: "Build, test and refine with regular updates." },
    { number: "05", title: "Launch", description: "Deliver your project and provide ongoing support." }
  ];

  return (
    <section 
      id="process"
      className="py-24 sm:py-32 bg-[#20201E] text-[#F5F0E8] border-t border-[rgba(245,240,232,0.08)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F0E8] tracking-tight mb-3">
            Simple, transparent process
          </h2>
          <p className="text-base text-[#A8A69E]">
            From idea to launch — with clear steps and communication.
          </p>
        </div>

        {/* 5-Step Process Flow with Connected Horizontal Track */}
        <div className="relative mb-12">
          {/* Desktop Connecting Line behind nodes */}
          <div className="hidden lg:block absolute top-[28px] left-[6%] right-[6%] h-[2px] bg-[#C65D35]/40 z-0 pointer-events-none" />

          {/* 5 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {processSteps.map((step, idx) => (
              <div
                key={step.number || idx}
                className="rounded-2xl bg-[#272725] border border-[rgba(245,240,232,0.08)] p-6 flex flex-col justify-between hover:border-[#C65D35]/50 transition-all duration-300 group"
              >
                <div>
                  {/* Step Number Badge & Node */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#20201E] border-2 border-[#C65D35] flex items-center justify-center font-mono text-sm font-bold text-[#F5F0E8] group-hover:bg-[#C65D35] group-hover:text-white transition-all shadow-md">
                      {step.number}
                    </div>
                    <span className="font-mono text-[10px] text-[#72706A] uppercase tracking-widest">
                      Step {idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-[#F5F0E8] mb-2 group-hover:text-[#C65D35] transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#D4D2CA] leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[rgba(245,240,232,0.06)] flex items-center gap-1.5 text-[11px] font-mono text-[#C65D35]">
                  <CheckCircle2 className="w-3 h-3 text-[#C65D35]" />
                  <span>Agreed Scope</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Honest Note */}
        <div className="p-4 rounded-xl bg-[#272725] border border-[rgba(245,240,232,0.06)] text-center max-w-2xl mx-auto">
          <p className="font-mono text-xs text-[#A8A69E]">
            {note || "Timelines depend on scope, feedback speed, and required integrations. No surprise invoices or uncommunicated delays."}
          </p>
        </div>
      </div>
    </section>
  );
}
