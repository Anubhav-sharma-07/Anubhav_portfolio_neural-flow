import React from 'react';
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function PricingSection({ pricing, onSelectPlan }) {
  const pricingData = pricing || {
    eyebrow: "STRAIGHTFORWARD PROJECT PRICING",
    headline: "Solutions built around your business.",
    description: "Every business has different needs. Tell us what you're looking to build, and we'll recommend a solution based on your goals, requirements and budget.",
    startingPriceBadge: "Website projects starting at ₹5,999",
    supportingText: "Final pricing depends on project scope, features and requirements. Custom applications and AI solutions are quoted individually.",
    services: [
      {
        id: "business-websites",
        title: "Business Websites",
        priceBadge: "Starting at ₹5,999",
        isStartingPrice: true,
        description: "Landing pages, business websites, portfolios, service pages and lead-generation websites.",
        features: [
          "Responsive multi-device layout",
          "Contact & enquiry capture",
          "WhatsApp quick-contact integration",
          "Basic on-page SEO setup",
          "100% source code ownership & handover"
        ],
        ctaText: "Discuss Your Project",
        projectTypeId: "Business website"
      },
      {
        id: "web-apps",
        title: "Web Applications & Development",
        priceBadge: "Custom Quote",
        isStartingPrice: false,
        description: "Custom dashboards, portals, SaaS products, APIs and full-stack applications.",
        features: [
          "Custom React / Next.js architecture",
          "REST APIs & database integrations",
          "Authentication & state management",
          "Scalable production setup",
          "Cross-browser testing & code handover"
        ],
        ctaText: "Discuss Your Project",
        projectTypeId: "Web application"
      },
      {
        id: "ai-automation",
        title: "AI & Workflow Automation",
        priceBadge: "Custom Quote",
        isStartingPrice: false,
        description: "AI-powered tools, business process automation, integrations and custom workflows.",
        features: [
          "Workflow audit & process automation",
          "AI integrations (Groq / OpenAI / Claude)",
          "CRM, webhook & database pipelines",
          "Data transformation & export flows",
          "Transparent API & hosting cost clarity"
        ],
        ctaText: "Discuss Your Project",
        projectTypeId: "AI & workflow automation"
      }
    ]
  };

  const handlePlanClick = (service) => {
    if (onSelectPlan) {
      onSelectPlan(service.title);
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="pricing"
      className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
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

        {/* Prominent Starting Price Banner */}
        <div className="rounded-2xl p-6 sm:p-7 bg-[#EBE5DB]/80 border border-[#20201E]/10 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C65D35] flex items-center justify-center text-white font-display font-bold text-lg shrink-0 shadow-xs">
              ₹
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#20201E] block leading-tight">
                {pricingData.startingPriceBadge}
              </span>
              <p className="text-xs sm:text-sm text-[#575550] mt-0.5">
                {pricingData.supportingText}
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
              href="#projects"
              className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-3 rounded-lg bg-white border border-[#20201E]/12 text-[#20201E] hover:border-[#C65D35] hover:text-[#C65D35] transition-all"
            >
              <span>See My Work</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingData.services.map((service) => {
            const isStarting = service.isStartingPrice;

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
                      {service.priceBadge}
                    </span>
                  </div>

                  <p className="text-sm text-[#20201E] font-medium leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Included Deliverables */}
                  <div className="space-y-2.5 pt-5 border-t border-[#20201E]/10 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#575550]">
                        <Check className="w-3.5 h-3.5 text-[#C65D35] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-4 border-t border-[#20201E]/10">
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

      </div>
    </section>
  );
}
