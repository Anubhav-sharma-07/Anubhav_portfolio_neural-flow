import React from 'react';
import { Globe, Cpu, Rocket, Gauge, CheckCircle2 } from 'lucide-react';
import Reveal from '../motion/Reveal';

const serviceIcons = {
  'web-dev': Globe,
  'ai-automation': Cpu,
  'product-mvps': Rocket,
  'redesigns': Gauge
};

/**
 * ServicesBento component
 * - Bento grid layout for 4 core services.
 * - Staggered fade and scale entrance.
 * - One clear line of value per card, not a feature dump.
 */
export default function ServicesBento({ services = [] }) {
  if (!services || services.length === 0) return null;

  return (
    <section 
      id="services" 
      className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal direction="up" className="max-w-3xl mb-14">
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
            // SERVICES & VALUE
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-4">
            Focused capabilities that solve real business problems.
          </h2>
          <p className="text-base text-[#575550]">
            No ambiguous agency jargon. Every engagement delivers measurable performance, clean source code, and responsive execution.
          </p>
        </Reveal>

        {/* Bento Grid (2x2 on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {services.map((srv, idx) => {
            const IconComponent = serviceIcons[srv.id] || Globe;
            // First two cards span 7 and 5 cols for an asymmetrical bento feel on desktop
            const colSpan = idx === 0 ? 'lg:col-span-7' : idx === 1 ? 'lg:col-span-5' : idx === 2 ? 'lg:col-span-5' : 'lg:col-span-7';

            return (
              <Reveal
                key={srv.id}
                direction="scale"
                delay={idx * 90}
                className={`h-full ${colSpan}`}
              >
                <div className="h-full rounded-2xl bg-white/80 backdrop-blur-xs border border-[#20201E]/10 p-7 sm:p-9 flex flex-col justify-between hover:border-[#C65D35]/50 hover:shadow-lg transition-all duration-300 group">
                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-xl bg-[#C65D35]/10 text-[#C65D35] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-[#ECE6DC] font-mono text-[11px] text-[#575550] font-semibold">
                          {srv.badge}
                        </span>
                        <span className="font-mono text-xs text-[#87847C] font-semibold">
                          [{srv.number}]
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-display font-bold text-[#20201E] mb-3 group-hover:text-[#C65D35] transition-colors">
                      {srv.title}
                    </h3>

                    {/* ONE LINE OF VALUE (User Prompt Mandate) */}
                    <p className="text-base font-medium text-[#20201E] leading-relaxed mb-4">
                      {srv.value}
                    </p>

                    {/* Supporting Detail */}
                    <p className="text-xs sm:text-sm text-[#575550] leading-relaxed mb-6 font-normal">
                      {srv.description}
                    </p>
                  </div>

                  {/* Single Key Deliverable */}
                  <div className="pt-4 border-t border-[#20201E]/10 flex items-start gap-2.5 text-xs font-mono text-[#20201E]">
                    <CheckCircle2 className="w-4 h-4 text-[#C65D35] shrink-0 mt-0.5" />
                    <span>{srv.deliverable}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
