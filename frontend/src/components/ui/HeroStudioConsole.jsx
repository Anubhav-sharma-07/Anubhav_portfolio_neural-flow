import React, { useState } from 'react';
import { 
  Code2, 
  Cpu, 
  Zap, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal
} from 'lucide-react';
import TiltCard from '../motion/TiltCard';

export default function HeroStudioConsole({ onPlayClick }) {
  const [activeTab, setActiveTab] = useState('web-dev');

  const capabilities = [
    {
      id: 'web-dev',
      label: 'Web Dev',
      title: 'Modern Business Websites',
      badge: 'FRONTEND ARCHITECTURE',
      icon: Code2,
      description: 'Custom React 19 & TypeScript business websites engineered for fast load times on phones, fluid layout responsiveness, and clean semantics.',
      metrics: [
        { label: 'Architecture', value: 'React 19 · Vite' },
        { label: 'Responsiveness', value: '360px to 4K' },
        { label: 'Code Quality', value: '100% Handover' }
      ],
      stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite']
    },
    {
      id: 'fullstack',
      label: 'Full-Stack',
      title: 'End-to-End Web Applications',
      badge: 'SCALABLE INFRASTRUCTURE',
      icon: Layers,
      description: 'Pairing clean frontend interfaces with relational database architectures, serverless endpoints, authentication, and secure APIs.',
      metrics: [
        { label: 'Frontend', value: 'Next.js & React' },
        { label: 'Database', value: 'Supabase / SQL' },
        { label: 'Security', value: 'OAuth & Secure APIs' }
      ],
      stack: ['Next.js 14', 'Node.js', 'Supabase', 'PostgreSQL']
    },
    {
      id: 'ai-solutions',
      label: 'AI Solutions',
      title: 'Practical Intelligence & APIs',
      badge: 'INTELLIGENT WORKFLOWS',
      icon: Cpu,
      description: 'Integrating structured LLM pipelines (Claude, Groq), automated data audits, and speech recognition into intuitive user workflows.',
      metrics: [
        { label: 'Model APIs', value: 'Claude & Groq' },
        { label: 'Interfaces', value: 'Speech & Streaming' },
        { label: 'Outputs', value: 'Structured JSON' }
      ],
      stack: ['Claude API', 'Groq API', 'Web Speech API', 'Node.js']
    },
    {
      id: 'automation',
      label: 'Automation',
      title: 'Background Tasks & Workflows',
      badge: 'STREAMLINED PROCESSES',
      icon: Zap,
      description: 'Building webhook receivers, asynchronous task workers, and automated synchronization pipelines that eliminate manual operations.',
      metrics: [
        { label: 'Integration', value: 'REST & Webhooks' },
        { label: 'Execution', value: 'Node Workers' },
        { label: 'Reliability', value: 'Error Logging' }
      ],
      stack: ['Webhooks', 'Background Queues', 'REST APIs', 'Node Workers']
    }
  ];

  const current = capabilities.find((c) => c.id === activeTab) || capabilities[0];

  return (
    <div className="w-full max-w-xl mx-auto">
      <TiltCard maxTilt={5} scale={1.015} className="rounded-3xl shadow-2xl">
        <div className="hairline-charcoal rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#272725] to-[#20201E] border border-[rgba(245,240,232,0.12)] relative overflow-hidden">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#C65D35]/10 blur-[80px] pointer-events-none" />

          {/* Console Header Bar */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-[rgba(245,240,232,0.08)] relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
              <span className="font-mono text-xs font-bold text-[#F5F0E8] tracking-wider uppercase">
                NEURAL FLOW // WHAT YOU GET
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#A8A69E] px-2.5 py-1 rounded-full bg-[#20201E] border border-[rgba(245,240,232,0.08)]">
              DIRECT DELIVERY
            </span>
          </div>

          {/* Interactive Capability Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 relative z-10">
            {capabilities.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (onPlayClick) onPlayClick();
                    setActiveTab(item.id);
                  }}
                  className={`p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#C65D35] text-[#F5F0E8] shadow-md scale-[1.02]'
                      : 'bg-[#20201E]/80 hover:bg-[#2A2A28] text-[#A8A69E] border border-[rgba(245,240,232,0.05)]'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-2 ${isActive ? 'text-[#F5F0E8]' : 'text-[#C65D35]'}`} />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider block truncate">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Capability Display Screen */}
          <div className="p-5 rounded-2xl bg-[#1E1E1C] border border-[rgba(245,240,232,0.08)] relative z-10 mb-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="font-mono text-[10px] text-[#C65D35] uppercase tracking-widest font-semibold block mb-1">
                  {current.badge}
                </span>
                <h3 className="font-display font-bold text-lg text-[#F5F0E8]">
                  {current.title}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#C65D35]/15 text-[#C65D35] flex items-center justify-center shrink-0">
                <current.icon className="w-4 h-4" />
              </div>
            </div>

            <p className="text-xs text-[#A8A69E] leading-relaxed mb-4 font-normal">
              {current.description}
            </p>

            {/* Architectural Facts Grid (Unmeasured claims removed) */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[rgba(245,240,232,0.06)]">
              {current.metrics.map((m, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-[#252523] text-center">
                  <span className="font-mono text-[9px] text-[#A8A69E] uppercase block">
                    {m.label}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#F5F0E8] block mt-0.5">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack & Explore Link Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 pt-2 text-xs font-mono">
            <div className="flex flex-wrap gap-1.5">
              {current.stack.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-[#20201E] border border-[rgba(245,240,232,0.08)] text-[#A8A69E] text-[10px]"
                >
                  {s}
                </span>
              ))}
            </div>

            <a
              href="#services"
              onClick={onPlayClick}
              className="inline-flex items-center gap-1 text-[#C65D35] hover:text-[#F5F0E8] transition-colors font-semibold"
            >
              <span>Explore Services</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </TiltCard>
    </div>
  );
}
