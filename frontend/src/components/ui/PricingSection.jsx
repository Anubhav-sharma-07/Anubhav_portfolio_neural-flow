import React, { useState } from 'react';
import { Check, ArrowRight, ArrowUpRight, HelpCircle } from 'lucide-react';

export default function PricingSection({ pricing, onSelectPlan }) {
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD'

  const pricingData = pricing || {
    eyebrow: "STRAIGHTFORWARD PROJECT PRICING",
    headline: "Solutions built around your business.",
    description: "Every business has different needs. Tell us what you're looking to build, and we'll recommend a solution based on your goals, requirements and budget.",
    services: [
      {
        id: "business-websites",
        title: "Business Websites",
        inrBadge: "Starting at ₹5,999",
        usdBadge: "Starting at $89",
        isStartingPrice: true,
        turnaround: "5 to 10 days",
        description: "Landing pages, business websites, portfolios, service pages and lead-generation websites.",
        features: [
          "Custom responsive multi-device design",
          "Contact & enquiry forms with WhatsApp integration",
          "Basic on-page SEO structure & meta tags",
          "Fast loading performance (zero template bloat)",
          "100% full source code ownership & handover",
          "14-day post-launch warranty & minor revisions"
        ],
        ctaText: "Discuss Business Website",
        projectTypeId: "Business website"
      },
      {
        id: "web-apps",
        title: "Web Applications & Development",
        inrBadge: "Custom Quote",
        usdBadge: "Custom Quote",
        isStartingPrice: false,
        turnaround: "2 to 4 weeks",
        description: "Custom dashboards, portals, SaaS products, APIs and full-stack applications.",
        features: [
          "React 19 / Next.js architecture",
          "REST APIs & database integrations (Supabase/PostgreSQL)",
          "User authentication & session state management",
          "Cross-browser and mobile QA testing",
          "Clean GitHub repository with deployment setup",
          "30-day post-launch support & bug fixing"
        ],
        ctaText: "Discuss Web Application",
        projectTypeId: "Web application"
      },
      {
        id: "ai-automation",
        title: "AI & Workflow Automation",
        inrBadge: "Custom Quote",
        usdBadge: "Custom Quote",
        isStartingPrice: false,
        turnaround: "1 to 3 weeks",
        description: "AI-powered tools, business process automation, integrations and custom workflows.",
        features: [
          "Workflow audit & automation roadmap",
          "AI integrations (Groq / Claude / OpenAI API)",
          "Webhook, CRM & Google Sheets pipelines",
          "Data transformation, filtering & reporting",
          "Full operational handover & documentation",
          "Transparent third-party API & hosting cost clarity"
        ],
        ctaText: "Discuss Practical Automation",
        projectTypeId: "AI & workflow automation"
      }
    ]
  };

  const handlePlanClick = (service) => {
    if (onSelectPlan) {
      onSelectPlan(`${service.title} (${currency})`);
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isINR = currency === 'INR';
  const startingBadge = isINR ? "Website projects starting at ₹5,999" : "Website projects starting at $89";
  const currencySymbol = isINR ? "₹" : "$";

  return (
    <section 
      id="pricing"
      className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Currency Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
              {pricingData.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-3">
              {pricingData.headline}
            </h2>
            <p className="text-base text-[#575550] leading-relaxed">
              {pricingData.description}
            </p>
          </div>

          {/* Regional Currency Toggle */}
          <div className="flex items-center gap-2 bg-[#EBE5DB] p-1.5 rounded-xl border border-[#20201E]/10 shrink-0">
            <span className="font-mono text-[11px] text-[#72706A] px-2 font-semibold">Region:</span>
            <button
              type="button"
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                isINR 
                  ? 'bg-[#20201E] text-[#F5F0E8] shadow-xs' 
                  : 'text-[#575550] hover:text-[#20201E]'
              }`}
            >
              ₹ INR (India)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                !isINR 
                  ? 'bg-[#20201E] text-[#F5F0E8] shadow-xs' 
                  : 'text-[#575550] hover:text-[#20201E]'
              }`}
            >
              $ USD (Global)
            </button>
          </div>
        </div>

        {/* Prominent Starting Price Banner */}
        <div className="rounded-2xl p-6 sm:p-7 bg-[#EBE5DB]/80 border border-[#20201E]/10 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C65D35] flex items-center justify-center text-white font-display font-bold text-xl shrink-0 shadow-xs">
              {currencySymbol}
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#20201E] block leading-tight">
                {startingBadge}
              </span>
              <p className="text-xs sm:text-sm text-[#575550] mt-0.5">
                Starting prices are region-specific indicative estimates. Custom web applications and AI automations are quoted individually.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="btn-burnt-orange text-xs font-semibold px-5 py-3 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#estimator"
              className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-3 rounded-lg bg-white border border-[#20201E]/12 text-[#20201E] hover:border-[#C65D35] hover:text-[#C65D35] transition-all"
            >
              <span>Calculate Scope</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingData.services.map((service) => {
            const isStarting = service.isStartingPrice;
            const badgeText = isStarting 
              ? (isINR ? service.inrBadge : service.usdBadge) 
              : "Custom Scope & Quote";

            return (
              <div
                key={service.id}
                className="rounded-2xl bg-white border border-[#20201E]/10 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#C65D35]/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#72706A]">
                      {service.title}
                    </span>
                    <span className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isStarting 
                        ? 'bg-[#C65D35]/10 text-[#C65D35] border border-[#C65D35]/25 font-bold' 
                        : 'bg-[#F5F0E8] text-[#575550] border border-[#20201E]/10'
                    }`}>
                      {badgeText}
                    </span>
                  </div>

                  <p className="text-sm text-[#20201E] font-medium leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="mb-6 pb-3 border-b border-[#20201E]/8">
                    <span className="font-mono text-[11px] text-[#72706A]">
                      Estimated Turnaround: <strong className="text-[#20201E]">{service.turnaround}</strong>
                    </span>
                  </div>

                  {/* Included Deliverables */}
                  <div className="space-y-2.5 mb-8">
                    <span className="font-mono text-[11px] font-bold text-[#72706A] uppercase tracking-wider block">
                      Included Deliverables:
                    </span>
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#575550]">
                        <Check className="w-3.5 h-3.5 text-[#C65D35] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-4 border-t border-[#20201E]/10 mt-auto">
                  <button
                    type="button"
                    onClick={() => handlePlanClick(service)}
                    className="w-full text-xs font-semibold px-4 py-3 rounded-lg bg-[#20201E] text-[#F5F0E8] hover:bg-[#C65D35] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Transparency Note */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-[#20201E]/10 flex items-start gap-3 max-w-3xl mx-auto shadow-2xs">
          <HelpCircle className="w-4 h-4 text-[#C65D35] shrink-0 mt-0.5" />
          <p className="text-xs font-mono text-[#575550] leading-relaxed">
            <strong>Clear pricing policy:</strong> Every project receives a written deliverable milestone agreement before work begins. No hidden markups, and you retain 100% ownership of your repository and domain.
          </p>
        </div>

      </div>
    </section>
  );
}
