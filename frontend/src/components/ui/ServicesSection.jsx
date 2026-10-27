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
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
            STUDIO CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-3">
            What I build for businesses
          </h2>
          <p className="text-base text-[#575550]">
            From high-converting business websites to custom web applications and practical AI automations.
          </p>
        </div>

        {/* 3 Architectural Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {services.map((srv, idx) => {
            const IconComponent = serviceIcons[srv.icon] || Globe;
            const isFlagship = idx === 0;

            return (
              <div
                key={srv.id}
                className={`rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group hover:-translate-y-1 ${
                  isFlagship 
                    ? 'bg-white border-[#C65D35]/30 ring-1 ring-[#C65D35]/15 shadow-sm' 
                    : 'bg-white border-[#20201E]/10 hover:border-[#C65D35]/40 shadow-xs'
                }`}
              >
                <div>
                  {/* Top Header: Monogram Index & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs ${
                        isFlagship 
                          ? 'bg-[#C65D35] text-white' 
                          : 'bg-[#20201E] text-white'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#72706A]">
                        0{idx + 1}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#EBE5DB] text-[#20201E] border border-[#20201E]/10">
                      {srv.badge || "Core Service"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#20201E] mb-3 group-hover:text-[#C65D35] transition-colors leading-tight">
                    {srv.title}
                  </h3>

                  {/* For Whom / Problem solved */}
                  <p className="text-sm text-[#575550] leading-relaxed mb-6 font-normal">
                    {srv.purpose || srv.forWhom}
                  </p>

                  {/* Boxed Deliverable Highlight */}
                  <div className="p-4 rounded-xl bg-[#F5F0E8] border border-[#20201E]/10 mb-6">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#72706A] block mb-1">
                      Deliverable Scope:
                    </span>
                    <p className="font-mono text-xs text-[#20201E] leading-relaxed font-medium">
                      {srv.deliverableBox}
                    </p>
                  </div>

                  {/* Included Focus Checklist */}
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
                    <p className="text-[11px] text-[#87847C] italic mb-6 leading-relaxed">
                      * {srv.transparencyNote}
                    </p>
                  )}
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-5 border-t border-[#20201E]/10 mt-auto">
                  <button
                    type="button"
                    onClick={() => handleServiceClick(srv)}
                    className={`w-full text-xs font-semibold px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
                      isFlagship
                        ? 'btn-burnt-orange'
                        : 'bg-[#20201E] text-[#F5F0E8] hover:bg-[#C65D35]'
                    }`}
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
