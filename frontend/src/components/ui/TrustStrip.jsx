import React from 'react';
import CountUp from '../motion/CountUp';

export default function TrustStrip({ brands, stats = [] }) {
  const brandList = brands?.items || [];

  if (brandList.length === 0 && (!stats || stats.length === 0)) {
    return null;
  }

  return (
    <section 
      aria-label="Projects I've built"
      className="py-12 bg-[#F5F0E8] border-b border-[rgba(32,32,30,0.08)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand / Project Strip Header */}
        <div className="text-center mb-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#72706A]">
            {brands?.heading || "Projects I've built"}
          </p>
        </div>

        {/* Minimalist Verified Brand Strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20 opacity-80 mb-10">
          {brandList.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-2 group transition-all duration-300 hover:opacity-100"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65D35] opacity-60 group-hover:opacity-100 transition-opacity"></span>
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#20201E] group-hover:text-[#C65D35] transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Verified Technical Pillars (Honest verifiable facts) */}
        {stats && stats.length >= 3 && (
          <div className="pt-8 border-t border-[rgba(32,32,30,0.06)] grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(32,32,30,0.08)]">
            {stats.map((item, idx) => (
              <div
                key={item.id}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-8' : ''}`}
              >
                <div className="flex items-baseline gap-1 font-display font-bold text-2xl sm:text-3xl text-[#20201E] tracking-tight mb-0.5">
                  <CountUp
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    duration={1400}
                  />
                </div>
                <span className="font-mono text-[11px] font-bold text-[#C65D35] uppercase tracking-wider mb-1">
                  {item.label}
                </span>
                <p className="text-xs text-[#575550] font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
