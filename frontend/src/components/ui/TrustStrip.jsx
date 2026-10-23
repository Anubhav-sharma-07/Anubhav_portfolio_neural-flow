import React from 'react';
import CountUp from '../motion/CountUp';
import Reveal from '../motion/Reveal';

/**
 * TrustStrip component
 * - Triggers single-fire CountUp on scroll.
 * - RULE: Cleanly hides itself if fewer than 3 verified numbers are supplied.
 */
export default function TrustStrip({ stats = [] }) {
  if (!stats || stats.length < 3) {
    return null;
  }

  return (
    <section 
      aria-label="Verified engineering stats"
      className="py-10 bg-[#252523] border-y border-[rgba(245,240,232,0.06)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(245,240,232,0.08)]">
          {stats.map((item, idx) => (
            <Reveal
              key={item.id}
              direction="up"
              delay={idx * 100}
              className={`flex flex-col items-start ${idx > 0 ? 'pt-6 sm:pt-0 sm:pl-8' : ''}`}
            >
              <div className="flex items-baseline gap-1 font-display font-bold text-3xl sm:text-4xl text-[#F5F0E8] tracking-tight mb-1">
                <CountUp
                  value={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  duration={1600}
                />
              </div>
              <span className="font-mono text-xs font-semibold text-[#C65D35] uppercase tracking-wider mb-1">
                {item.label}
              </span>
              <p className="text-xs text-[#A8A69E] font-normal leading-relaxed">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
