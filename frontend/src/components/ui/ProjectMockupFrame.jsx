import React, { useState } from 'react';
import { ExternalLink, Terminal, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export default function ProjectMockupFrame({ project, isFirst = false }) {
  const [imgError, setImgError] = useState(false);
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
  const hasLiveUrl = !!project.links.live;
  const isPlaceholder = project.id === 'aura-interview' || imgError;

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
        <div className="px-3 py-1 rounded-md bg-[#1D1D1B] border border-[rgba(245,240,232,0.06)] flex items-center gap-2 max-w-xs sm:max-w-sm w-full text-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
          <span className="font-mono text-[10px] text-[#A8A69E] truncate">
            {hasLiveUrl ? project.links.live.replace('https://', '').replace(/\/$/, '') : 'Private development build'}
          </span>
        </div>

        {/* Status pill */}
        <span 
          className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded"
          style={{ color: accentColor, backgroundColor: `${accentColor}15` }}
        >
          {project.badgeType}
        </span>
      </div>

      {/* Viewport: Real WebP Screenshot or Honest Placeholder */}
      {isPlaceholder ? (
        <div className="w-full aspect-[16/10] bg-[#1E1E1C] flex flex-col items-center justify-center p-6 text-center border-t border-[rgba(245,240,232,0.04)]">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
            style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
          >
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider mb-1.5">
            [TODO: Add /public/projects/{project.id}.webp]
          </span>
          <p className="text-xs text-[#A8A69E] max-w-sm font-sans mb-3">
            Private project build. Real screenshot will be added once a public deployment is live.
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {project.stack.map((t, i) => (
              <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#252523] text-[#A8A69E]">
                {t}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden w-full aspect-[16/10] bg-[#161615]">
          <img
            src={`/projects/${project.id}.webp`}
            alt={`${project.title} — ${project.subtitle} interface screenshot`}
            width={1200}
            height={800}
            loading={isFirst ? "eager" : "lazy"}
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
    </div>
  );
}
