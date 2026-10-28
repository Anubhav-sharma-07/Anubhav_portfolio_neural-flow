import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ProcessSection({ steps = [], note }) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  const processSteps = steps.length > 0 ? steps : [
    { number: "01", title: "Discover", description: "Understand your goals, requirements and audience.", milestone: "Goal & Audience Brief" },
    { number: "02", title: "Plan", description: "Build a clear scope, feature list and timeline.", milestone: "Scope & Timeline Roadmap" },
    { number: "03", title: "Design", description: "Create wireframes and visual designs for your approval.", milestone: "Approved Designs & Layouts" },
    { number: "04", title: "Develop", description: "Build, test and refine with regular updates.", milestone: "Staging Sprints & QA Demos" },
    { number: "05", title: "Launch", description: "Deliver your project and provide ongoing support.", milestone: "Deploy & Source Handover" }
  ];

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
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
            From idea to launch — with clear milestones, direct communication and no agency overhead.
          </p>
        </div>

        {/* 5-Step Process Flow with Connected Horizontal Track */}
        <div className="relative mb-12">
          {/* Desktop SVG Connecting Line that draws across the 5 steps */}
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[2px] z-0 pointer-events-none">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              {/* Background guide track */}
              <line 
                x1="0%" 
                y1="1" 
                x2="100%" 
                y2="1" 
                stroke="rgba(245, 240, 232, 0.08)" 
                strokeWidth="2" 
              />
              {/* Animated Drawing Path in Burnt Orange */}
              <line 
                x1="0%" 
                y1="1" 
                x2="100%" 
                y2="1" 
                stroke="#C65D35" 
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset={inView ? "0" : "1000"}
                style={{
                  transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}
              />
            </svg>
          </div>

          {/* 5 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {processSteps.map((step, idx) => (
              <div
                key={step.number || idx}
                className="rounded-2xl bg-[#272725] border border-[rgba(245,240,232,0.08)] p-6 flex flex-col justify-between hover:border-[#C65D35]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  {/* Step Number Badge & Node */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#20201E] border-2 border-[#C65D35] flex items-center justify-center font-mono text-sm font-bold text-[#F5F0E8] group-hover:bg-[#C65D35] group-hover:text-white transition-all shadow-md">
                      {step.number}
                    </div>
                    <span className="font-mono text-xs text-[#A8A69E] uppercase tracking-wider">
                      Step {idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-[#F5F0E8] mb-2 group-hover:text-[#C65D35] transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#D4D2CA] leading-relaxed font-normal mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Specific Verifiable Milestone Outcome (wrapped, no ellipsis) */}
                <div className="pt-4 mt-4 border-t border-[rgba(245,240,232,0.06)] flex flex-col gap-1 text-xs font-mono text-[#E07A52]">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C65D35] shrink-0 mt-0.5" />
                    <span className="text-wrap break-words leading-tight text-[#F5F0E8] font-medium">
                      {step.milestone || "Milestone Verified"}
                    </span>
                  </div>
                  {step.timeEstimate && (
                    <span className="text-[11px] text-[#A8A69E] pl-5">
                      ~ {step.timeEstimate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Working Principles Note */}
        <div className="p-4 rounded-xl bg-[#272725] border border-[rgba(245,240,232,0.06)] text-center max-w-2xl mx-auto shadow-xs">
          <p className="font-mono text-xs text-[#A8A69E]">
            {note || "Timelines depend on scope, feedback speed, and required integrations. No surprise invoices or uncommunicated delays."}
          </p>
        </div>
      </div>
    </section>
  );
}
