import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function PricingSection({ engagementModels = [], onSelectPlan }) {
  const models = engagementModels.length > 0 ? engagementModels : [
    {
      id: "website-basic",
      title: "Website (Basic)",
      price: "Starting at ₹15,000",
      idealFor: "Ideal for small businesses and service providers.",
      deliverables: [
        "Up to 5 pages",
        "Responsive design",
        "Contact / enquiry form",
        "Basic SEO setup"
      ],
      exclusions: "Domain, hosting, paid plugins, and continuous content writing quoted separately.",
      ctaText: "Get Started"
    },
    {
      id: "web-app",
      title: "Web Application",
      price: "Custom Quote",
      idealFor: "For complex features and integrations.",
      deliverables: [
        "Custom functionality",
        "API integrations",
        "Scalable architecture",
        "Ongoing support"
      ],
      exclusions: "Third-party cloud infrastructure, database hosting, and paid APIs billed separately.",
      ctaText: "Discuss Your Project"
    },
    {
      id: "ai-automation",
      title: "AI & Automation",
      price: "Custom Quote",
      idealFor: "For workflow and process automation.",
      deliverables: [
        "Process automation",
        "AI integrations",
        "Database & CRM setup",
        "Ongoing support"
      ],
      exclusions: "Third-party automation subscriptions and API token usage paid directly by client.",
      ctaText: "Discuss Your Project"
    }
  ];

  const handlePlanClick = (model) => {
    if (onSelectPlan) {
      onSelectPlan(`${model.title} (${model.price})`);
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
        <div className="max-w-3xl mb-14">
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
            ENGAGEMENT MODELS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-3">
            Flexible options for every project
          </h2>
          <p className="text-base text-[#575550]">
            Choose the model that works best for your needs.
          </p>
        </div>

        {/* 3 Pricing / Engagement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {models.map((model, idx) => {
            const isFeatured = idx === 0;

            return (
              <div
                key={model.id}
                className="rounded-2xl bg-white border border-[#20201E]/10 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#C65D35]/50 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-xl text-[#20201E]">
                      {model.title}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#20201E]">
                      {model.price}
                    </span>
                  </div>

                  {/* Subtitle / Ideal For */}
                  <p className="text-xs text-[#575550] leading-relaxed mb-6 font-medium">
                    {model.idealFor}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 pt-6 border-t border-[#20201E]/10 mb-8">
                    {model.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#20201E]">
                        <Check className="w-4 h-4 text-[#C65D35] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {model.exclusions && (
                    <p className="text-[11px] text-[#87847C] italic mb-6">
                      * {model.exclusions}
                    </p>
                  )}
                </div>

                {/* Button CTA */}
                <div className="pt-4 border-t border-[#20201E]/10">
                  <button
                    type="button"
                    onClick={() => handlePlanClick(model)}
                    className={`w-full text-xs font-semibold px-5 py-3 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
                      isFeatured
                        ? 'btn-burnt-orange'
                        : 'bg-[#20201E] text-[#F5F0E8] hover:bg-[#C65D35]'
                    }`}
                  >
                    <span>{model.ctaText}</span>
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
