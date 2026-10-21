import React from 'react';
import { ExternalLink, Terminal, ShieldCheck, Sparkles, Layers, Activity } from 'lucide-react';

export default function ProjectMockupFrame({ project }) {
  if (!project) return null;

  // Visual theme accents based on project
  const getThemeColor = () => {
    switch (project.id) {
      case 'spendlens': return '#10B981'; // emerald for finance/savings
      case 'aura-interview': return '#8B5CF6'; // purple for AI screener
      case 'cliniva': return '#0EA5E9'; // cyan for healthcare
      case 'socio-bar': return '#C65D35'; // burnt orange for dining/cocktails
      case 'personal-portfolio': return '#E07A52'; // terracotta for creative dev
      default: return '#C65D35';
    }
  };

  const accentColor = getThemeColor();

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[rgba(245,240,232,0.12)] bg-[#1A1A18] shadow-2xl relative group">
      {/* Browser Chrome Header */}
      <div className="px-4 py-2.5 bg-[#252523] border-b border-[rgba(245,240,232,0.08)] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
        </div>

        {/* Browser URL Pill */}
        <div className="px-3 py-1 rounded-md bg-[#1D1D1B] border border-[rgba(245,240,232,0.06)] flex items-center gap-2 max-w-xs w-full text-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span className="font-mono text-[10px] text-[#A8A69E] truncate">
            {project.links.live ? project.links.live.replace('https://', '') : `github.com/Anubhav-sharma-07/${project.id}`}
          </span>
        </div>

        {/* Status pill */}
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#72706A]">
          SSL SECURE
        </span>
      </div>

      {/* Dimensional Mockup Viewport */}
      <div className="relative p-6 sm:p-8 min-h-[260px] sm:min-h-[300px] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#20201E] to-[#161615]">
        {/* Ambient Subtle Grid & Radial Glow */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${accentColor} 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Top Badges inside Frame */}
        <div className="relative z-10 flex items-center justify-between">
          <span 
            className="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider border shadow-xs"
            style={{
              color: accentColor,
              borderColor: `${accentColor}40`,
              backgroundColor: `${accentColor}15`
            }}
          >
            {project.badgeType || 'Verified Work'}
          </span>
          <span className="font-mono text-[11px] text-[#87847C]">
            REL // {project.year}
          </span>
        </div>

        {/* Central Dimensional Showcase Visual */}
        <div className="relative z-10 my-4 p-5 rounded-xl bg-[#262624]/90 border border-[rgba(245,240,232,0.08)] backdrop-blur-md shadow-lg transform transition-transform duration-300 group-hover:scale-[1.01]">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h4 className="font-display font-bold text-lg sm:text-xl text-[#F5F0E8] tracking-tight">
                {project.title}
              </h4>
              <p className="font-mono text-xs text-[#A8A69E]">
                // {project.subtitle}
              </p>
            </div>
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              <Activity className="w-4 h-4" />
            </div>
          </div>

          {/* Quick Problem & Solution Strip */}
          <div className="pt-3 border-t border-[rgba(245,240,232,0.06)] space-y-1.5 text-xs">
            <p className="text-[#A8A69E]">
              <strong className="text-[#F5F0E8] font-mono text-[11px]">Problem: </strong>
              {project.problem}
            </p>
            <p className="text-[#C65D35]">
              <strong className="text-[#F5F0E8] font-mono text-[11px]">Contribution: </strong>
              {project.contribution}
            </p>
          </div>
        </div>

        {/* Bottom Technology Stack Strip */}
        <div className="relative z-10 flex flex-wrap items-center gap-1.5 pt-2">
          {project.stack.map((tech, idx) => (
            <span
              key={idx}
              className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#2A2A28] border border-[rgba(245,240,232,0.08)] text-[#A8A69E]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
