import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection({ faqs = [] }) {
  const [openIdx, setOpenIdx] = useState(0); // Default open first question

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleQuestion = (idx) => {
    setOpenIdx((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section 
      id="faq"
      className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
      aria-label="Frequently asked questions"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE5DB] border border-[#20201E]/10 text-[#C65D35] font-mono text-xs font-bold mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#C65D35]" />
            <span>COMMON QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#575550]">
            Everything you need to know about pricing, timelines, code ownership, and how we work together.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            const contentId = `faq-answer-${idx}`;
            const headerId = `faq-question-${idx}`;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#C65D35]/30 shadow-md ring-1 ring-[#C65D35]/10'
                    : 'bg-white/80 border-[#20201E]/10 hover:border-[#20201E]/25'
                }`}
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleQuestion(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C65D35]"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#20201E] leading-snug">
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#C65D35] text-white rotate-180' : 'bg-[#EBE5DB] text-[#20201E]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#575550] leading-relaxed border-t border-[#20201E]/5 pt-3"
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Help Note */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-[#20201E]/10 shadow-xs max-w-xl mx-auto">
          <p className="font-display font-medium text-sm text-[#20201E] mb-2">
            Have a question that isn't answered here?
          </p>
          <a
            href="#contact"
            className="text-xs font-mono font-bold text-[#C65D35] hover:underline"
          >
            Message me directly in the contact form below →
          </a>
        </div>

      </div>
    </section>
  );
}

