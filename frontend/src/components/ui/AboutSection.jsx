import React from 'react';
import { CheckCircle2, BookOpen } from 'lucide-react';

export default function AboutSection({ about }) {
  const values = about?.values || [
    {
      title: "Direct communication",
      description: "You speak directly with the developer building your software. No middlemen or slow agency ticketing."
    },
    {
      title: "Clear scope and deliverables",
      description: "Agreed milestones, documented scope, and no surprise invoices."
    },
    {
      title: "Practical technical decisions",
      description: "Choosing the right tool for the job to keep things maintainable and fast."
    },
    {
      title: "Regular progress updates",
      description: "Continuous communication and staging links so you can inspect progress along the way."
    },
    {
      title: "Testing and handover",
      description: "Thorough cross-device testing and full 100% source code ownership transferred on completion."
    }
  ];

  return (
    <section 
      id="about"
      className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Real Photo + Verified Skills */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
            <div className="relative w-full max-w-sm mb-8">
              <div className="rounded-2xl overflow-hidden border-2 border-[#20201E]/10 bg-white p-3 shadow-lg">
                <img
                  src={about?.avatar || "/images/anubhav-sharma.jpg"}
                  alt="Anubhav Sharma — Web Developer & AI Specialist"
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

            {/* Verified Tech Stack Pills */}
            <div className="w-full max-w-sm bg-white rounded-2xl p-6 border border-[#20201E]/10 shadow-xs space-y-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
                  Frontend & Frameworks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {about?.verifiedSkills?.frontend?.map((tech, i) => (
                    <span key={i} className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#F5F0E8] text-[#20201E] border border-[#20201E]/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
                  AI & APIs
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {about?.verifiedSkills?.aiAndApis?.map((tech, i) => (
                    <span key={i} className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#F5F0E8] text-[#20201E] border border-[#20201E]/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#20201E]/10">
                <span className="font-mono text-[10px] text-[#87847C] block mb-1">Academic Background:</span>
                <p className="font-mono text-xs font-semibold text-[#20201E]">
                  BVCOE New Delhi (B.Tech CSE)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Natural Story & How Clients Work With Me */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
              ABOUT ANUBHAV & NEURAL FLOW
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#20201E] leading-tight tracking-tight mb-6">
              Engineering with intention. Clear communication.
            </h2>

            {/* Natural Introduction copy mandated in prompt */}
            <p className="text-base sm:text-lg text-[#20201E] leading-relaxed mb-6 font-medium bg-white/70 p-6 rounded-2xl border border-[#20201E]/10">
              {about?.intro}
            </p>

            {/* How Clients Work With Me */}
            <div className="mt-4">
              <h3 className="font-mono text-xs font-bold text-[#20201E] uppercase tracking-wider mb-4">
                How You Work With Me:
              </h3>

              <div className="space-y-3.5">
                {values.map((v, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-[#20201E]/10 flex items-start gap-3.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#C65D35] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#20201E] mb-0.5">
                        {v.title}
                      </h4>
                      <p className="text-xs text-[#575550] leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Research Box */}
            <div className="mt-8 p-5 rounded-xl bg-[#EBE5DB]/60 border border-[#20201E]/10 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-[#C65D35] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#C65D35] block mb-1">
                  Academic Research
                </span>
                <p className="text-xs text-[#20201E] font-medium leading-relaxed">
                  Co-authored research in Explainable Artificial Intelligence (Hybrid XAI Frameworks for Android Malware Detection) currently under IEEE conference review.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
