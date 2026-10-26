import React from 'react';
import { Globe, Layers, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

const serviceIcons = {
  globe: Globe,
  layers: Layers,
  cpu: Cpu
};

export default function ServicesSection({ services = [], onSelectService }) {
  const handleServiceClick = (srv) => {
    if (onSelectService) {
      onSelectService(srv.title);
    }
    const targetId = srv.nextAction === 'estimator' ? 'estimator' : 'contact';
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="services" 
      className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
            MY SERVICES
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-3">
            What I can do for you
          </h2>
          <p className="text-base text-[#575550]">
            Focused on creating digital solutions that are functional, scalable and easy to use.
          </p>
        </div>

        {/* 3 Simplified Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((srv) => {
            const IconComponent = serviceIcons[srv.icon] || Globe;

            return (
              <div
                key={srv.id}
                className="rounded-2xl bg-white border border-[#20201E]/10 p-7 sm:p-8 flex flex-col justify-between hover:border-[#C65D35]/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  {/* Burnt Orange Icon in rounded container */}
                  <div className="w-12 h-12 rounded-xl bg-[#C65D35] text-white flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#20201E] mb-3 group-hover:text-[#C65D35] transition-colors">
                    {srv.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#575550] leading-relaxed mb-6 font-normal">
                    {srv.forWhom || srv.purpose}
                  </p>

                  {/* Boxed Deliverable Highlight (matching visual reference) */}
                  <div className="p-4 rounded-xl bg-[#F5F0E8] border border-[#20201E]/10 mb-6">
                    <p className="font-mono text-xs text-[#20201E] leading-relaxed">
                      {srv.deliverableBox}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  {srv.deliverablesList && (
                    <div className="space-y-2 mb-6">
                      <span className="font-mono text-[11px] font-bold text-[#72706A] uppercase tracking-wider block">
                        Included Focus:
                      </span>
                      {srv.deliverablesList.slice(0, 4).map((d, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#575550]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C65D35] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {srv.transparencyNote && (
                    <p className="text-[11px] text-[#87847C] italic mb-6">
                      Note: {srv.transparencyNote}
                    </p>
                  )}
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-4 border-t border-[#20201E]/10">
                  <button
                    type="button"
                    onClick={() => handleServiceClick(srv)}
                    className="w-full text-xs font-semibold px-4 py-3 rounded-lg bg-[#20201E] text-[#F5F0E8] hover:bg-[#C65D35] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>{srv.nextStep}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
