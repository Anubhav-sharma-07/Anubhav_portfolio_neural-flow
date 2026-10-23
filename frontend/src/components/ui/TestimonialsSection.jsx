import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import Reveal from '../motion/Reveal';

/**
 * TestimonialsSection component (Review Shuffle)
 * - HARD RULE: ONLY renders if testimonials array contains real, verified entries.
 * - If empty, returns null cleanly without displaying placeholders.
 */
export default function TestimonialsSection({ testimonials = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // HARD RULE: Cleanly hide if no verified testimonials exist.
  if (!testimonials || testimonials.length === 0) {
    // TODO: Supply verified client testimonials in siteContent.testimonials to activate Review Shuffle.
    return null;
  }

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section 
      id="testimonials"
      className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
            // CLIENT FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-4">
            Direct client feedback.
          </h2>
          <p className="text-base text-[#575550]">
            Verified reviews from founders and teams I have built for.
          </p>
        </Reveal>

        {/* Stacked Review Shuffle Card */}
        <div className="relative">
          <Reveal direction="scale" delay={100}>
            <div className="rounded-3xl bg-white border border-[#20201E]/10 p-8 sm:p-12 shadow-xl relative">
              <Quote className="w-10 h-10 text-[#C65D35]/20 mb-6" />
              
              <p className="text-lg sm:text-xl text-[#20201E] leading-relaxed mb-8 font-medium">
                "{current.quote}"
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#20201E]/10">
                <div>
                  <h4 className="font-display font-bold text-base text-[#20201E]">
                    {current.name}
                  </h4>
                  <span className="font-mono text-xs text-[#575550]">
                    {current.role} • Project: <strong className="text-[#C65D35]">{current.verifiedProject}</strong>
                  </span>
                </div>

                {/* Shuffle Controls */}
                {testimonials.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevReview}
                      className="w-10 h-10 rounded-full border border-[#20201E]/15 hover:border-[#C65D35] flex items-center justify-center text-[#20201E] transition-colors"
                      aria-label="Previous review"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextReview}
                      className="w-10 h-10 rounded-full border border-[#20201E]/15 hover:border-[#C65D35] flex items-center justify-center text-[#20201E] transition-colors"
                      aria-label="Next review"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
