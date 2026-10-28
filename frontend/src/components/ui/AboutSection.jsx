import React from 'react';
import { CheckCircle2, ChevronDown, Code2, GraduationCap } from 'lucide-react';

export default function AboutSection({ about }) {
  const values = about?.values || [
    {
      title: "Direct communication with me",
      description: "You speak directly with the developer building your site. No account managers or delayed ticketing systems."
    },
    {
      title: "You own 100% of your code and design",
      description: "Every file, design asset, and line of code is transferred to you on launch. Zero platform lock-in."
    },
    {
      title: "Fixed quotes and clear milestones",
      description: "We agree on the scope and price before work starts. No surprise invoices or uncommunicated delays."
    }
  ];

  return (
    <section 
      id="about"
      className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Real Photo + Simple Profile Card */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
            <div className="relative w-full max-w-sm mb-6">
              <div className="rounded-2xl overflow-hidden border-2 border-[#20201E]/10 bg-white p-3 shadow-lg">
                <img
                  src={about?.avatar || "/images/anubhav-sharma.jpg"}
                  alt="Anubhav Sharma — Freelance Web Developer"
                  className="w-full aspect-[4/5] object-cover rounded-xl"
                  loading="lazy"
                />
                
                <div className="pt-3 px-1 flex items-center justify-between font-mono text-[11px] text-[#575550]">
                  <span className="font-bold text-[#20201E]">ANUBHAV SHARMA</span>
                  <span className="text-[#C65D35] font-semibold">NEURAL FLOW</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-r-2 border-b-2 border-[#C65D35] pointer-events-none rounded-br-lg opacity-60" />
            </div>

            {/* Quick Facts Card */}
            <div className="w-full max-w-sm bg-white rounded-2xl p-5 border border-[#20201E]/10 shadow-xs text-xs space-y-3 font-mono">
              <div className="flex items-center justify-between text-[#575550]">
                <span>Location:</span>
                <span className="font-semibold text-[#20201E]">Delhi, India</span>
              </div>
              <div className="flex items-center justify-between text-[#575550]">
                <span>Availability:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Taking new projects
                </span>
              </div>
              <div className="flex items-center justify-between text-[#575550]">
                <span>Clients:</span>
                <span className="font-semibold text-[#20201E]">India, US, UK, Global</span>
              </div>
            </div>
          </div>

          {/* Right Column: Natural Story & 3 Working-Style Points */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
              ABOUT ANUBHAV & NEURAL FLOW
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#20201E] leading-tight tracking-tight mb-6">
              Web development with clear communication.
            </h2>

            {/* Natural Introduction copy */}
            <p className="text-base sm:text-lg text-[#20201E] leading-relaxed mb-6 font-medium bg-white/70 p-6 rounded-2xl border border-[#20201E]/10">
              {about?.intro}
            </p>

            {/* 3 Working-Style Points */}
            <div className="mt-2">
              <h3 className="font-mono text-xs font-bold text-[#20201E] uppercase tracking-wider mb-4">
                What You Can Expect:
              </h3>

              <div className="space-y-3.5">
                {values.map((v, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-[#20201E]/10 flex items-start gap-3.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#C65D35] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-[#20201E] mb-0.5">
                        {v.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#575550] leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collapsed Technical Background & Education Block */}
            <div className="mt-8 border-t border-[#20201E]/10 pt-6">
              <details className="group rounded-xl bg-white/60 border border-[#20201E]/10 p-4 transition-all">
                <summary className="flex items-center justify-between cursor-pointer font-mono text-xs font-bold text-[#20201E] hover:text-[#C65D35] select-none">
                  <span className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#C65D35]" />
                    Tools I use & technical background
                  </span>
                  <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180 text-[#72706A]" />
                </summary>

                <div className="pt-4 mt-3 border-t border-[#20201E]/10 space-y-4 text-xs">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#72706A] block mb-2">
                      Tools & Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {about?.verifiedSkills?.frontend?.concat(about?.verifiedSkills?.aiAndApis || [])?.map((tech, i) => (
                        <span key={i} className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#F5F0E8] text-[#20201E] border border-[#20201E]/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {about?.education && (
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#72706A] block mb-1">
                        Degree:
                      </span>
                      <p className="font-mono text-xs text-[#20201E] flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#C65D35]" />
                        {about.education}
                      </p>
                    </div>
                  )}

                  {about?.research && (
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#72706A] block mb-1">
                        Research Background:
                      </span>
                      <p className="font-sans text-xs text-[#575550] leading-relaxed">
                        {about.research}
                      </p>
                    </div>
                  )}
                </div>
              </details>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
