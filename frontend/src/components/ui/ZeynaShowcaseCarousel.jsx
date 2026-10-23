import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  X,
  Maximize2
} from 'lucide-react';
import { GithubIcon } from './Icons';
import ProjectMockupFrame from './ProjectMockupFrame';

export default function ZeynaShowcaseCarousel({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [inspectedProject, setInspectedProject] = useState(null);

  // Filter categories matching honest badges
  const categories = ['ALL', 'PRODUCTION', 'AI PLATFORMS', 'CLIENT CONCEPTS'];

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'PRODUCTION') return p.badgeType === 'Production Build';
    if (selectedFilter === 'AI PLATFORMS') return p.category.toUpperCase().includes('AI');
    if (selectedFilter === 'CLIENT CONCEPTS') return p.badgeType === 'Client Concept';
    return true;
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const activeProject = filteredProjects[currentIndex] || filteredProjects[0];
  const isFirst = currentIndex === 0;

  return (
    <div className="w-full relative overflow-x-clip">
      {/* Top Controls: Filter Pills & Navigation Stepper */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[rgba(245,240,232,0.08)]">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedFilter(cat);
                setCurrentIndex(0);
              }}
              className={`font-mono text-xs px-4 py-2 min-h-[44px] rounded-full transition-all duration-200 cursor-pointer flex items-center ${
                selectedFilter === cat
                  ? 'bg-[#C65D35] text-[#F5F0E8] font-bold shadow-sm'
                  : 'bg-[#2A2A28] text-[#A8A69E] hover:text-[#F5F0E8] border border-[rgba(245,240,232,0.06)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel Stepper Controls (min 44px tap targets for mobile) */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#A8A69E]">
            0{currentIndex + 1} / 0{filteredProjects.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#F5F0E8] transition-colors cursor-pointer"
              aria-label="Previous project slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#F5F0E8] transition-colors cursor-pointer"
              aria-label="Next project slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stage: 3D perspective enabled only on desktop (md+); flat stacked on mobile */}
      <div className="relative overflow-hidden py-2 md:[perspective:1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Elevated Project Showcase Card */}
          <div className="lg:col-span-8 space-y-6">
            <div 
              className="hairline-charcoal rounded-3xl p-5 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl transition-all duration-300 md:[transform-style:preserve-3d]"
              style={{
                background: 'linear-gradient(135deg, #272725 0%, #20201E 100%)',
                borderColor: 'rgba(198, 93, 53, 0.35)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
              }}
            >
              {/* Header inside project card */}
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#A8A69E] mb-5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C65D35]/15 text-[#C65D35] font-semibold border border-[#C65D35]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C65D35] animate-pulse" />
                    {activeProject.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#20201E] border border-[rgba(245,240,232,0.08)] text-[#F5F0E8] text-[11px]">
                    {activeProject.badgeType}
                  </span>
                </div>
                <span>YEAR // {activeProject.year}</span>
              </div>

              {/* Title & Headline */}
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#F5F0E8] mb-1 tracking-tight">
                {activeProject.title}
              </h3>
              <p className="font-mono text-xs text-[#C65D35] mb-6">
                // {activeProject.subtitle}
              </p>

              {/* Real 1200x800 WebP Screenshot Slot */}
              <div className="mb-6">
                <ProjectMockupFrame project={activeProject} isFirst={isFirst} />
              </div>

              {/* Problem Statement (Factual proof with visible TODO if pending) */}
              {activeProject.problem.includes('TODO') ? (
                <div className="p-3.5 rounded-xl bg-[#C65D35]/10 border border-[#C65D35]/30 mb-4 text-xs font-mono">
                  <span className="text-[#C65D35] font-bold block uppercase mb-1">
                    Problem Statement (Client Verification Required):
                  </span>
                  <p className="text-[#F5F0E8]">{activeProject.problem}</p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-[#252523] border border-[rgba(245,240,232,0.06)] mb-4 text-xs leading-relaxed">
                  <strong className="text-[#F5F0E8] font-mono uppercase block mb-1">Problem:</strong>
                  <p className="text-[#A8A69E]">{activeProject.problem}</p>
                </div>
              )}

              {/* My Role / Contribution */}
              <div className="mb-4 text-xs font-mono flex flex-wrap items-baseline gap-1.5">
                <span className="text-[#F5F0E8] uppercase font-bold">My Role:</span>
                <span className="text-[#C65D35]">{activeProject.role}</span>
              </div>

              {/* Summary Description */}
              <p className="text-xs sm:text-sm text-[#A8A69E] leading-relaxed mb-6 font-normal">
                {activeProject.summary}
              </p>

              {/* Key Deliverables Highlights */}
              <div className="space-y-2 mb-6 pt-4 border-t border-[rgba(245,240,232,0.06)]">
                {activeProject.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#F5F0E8] font-mono">
                    <CheckCircle2 className="w-4 h-4 text-[#C65D35] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Stack Pills & Always-Visible Action Buttons */}
              <div className="pt-6 border-t border-[rgba(245,240,232,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.stack.map((t, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#2A2A28] border border-[rgba(245,240,232,0.08)] text-[#A8A69E]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Primary Action Buttons (Always Visible, Accessible Disabled Fallbacks) */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setInspectedProject(activeProject)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3.5 py-2.5 min-h-[44px] rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] text-[#F5F0E8] hover:border-[#C65D35] hover:text-[#C65D35] transition-colors cursor-pointer"
                    aria-label={`Deep inspect architecture for ${activeProject.title}`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Deep Inspect</span>
                  </button>

                  {/* View Live Button */}
                  {activeProject.links.live ? (
                    <a
                      href={activeProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-burnt-orange text-xs px-4 py-2.5 min-h-[44px] rounded-lg inline-flex items-center gap-1.5"
                      aria-label={`View live website for ${activeProject.title}`}
                    >
                      <span>View live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title="Private preview, available on request"
                      aria-label={`Live demo for ${activeProject.title} is a private preview, available on request`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-2.5 min-h-[44px] rounded-lg bg-[#252523] border border-[rgba(245,240,232,0.06)] text-[#72706A] cursor-not-allowed opacity-60"
                    >
                      <span>View live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* View Code Button */}
                  {activeProject.links.github ? (
                    <a
                      href={activeProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-2.5 min-h-[44px] rounded-lg bg-[#2A2A28] text-[#F5F0E8] border border-[rgba(245,240,232,0.12)] hover:border-[#C65D35] hover:text-[#C65D35] transition-colors"
                      aria-label={`View source code on GitHub for ${activeProject.title}`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>View code</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title="Private preview, available on request"
                      aria-label={`Source code for ${activeProject.title} is private, available on request`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-2.5 min-h-[44px] rounded-lg bg-[#252523] border border-[rgba(245,240,232,0.06)] text-[#72706A] cursor-not-allowed opacity-60"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>View code</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Flat Stacked Deck on Mobile, Elevated Navigator on Desktop */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase text-[#A8A69E] tracking-widest mb-1">
              ALL VERIFIED PROJECTS ({filteredProjects.length})
            </span>

            {filteredProjects.map((proj, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <div
                  key={proj.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#2A2A28] border-l-4 border-[#C65D35] shadow-lg translate-x-1 sm:translate-x-2'
                      : 'bg-[#242422] border border-[rgba(245,240,232,0.04)] hover:border-[rgba(245,240,232,0.12)] opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#A8A69E] mb-1">
                    <span>0{idx + 1}</span>
                    <span className="text-[#C65D35] font-semibold">{proj.badgeType}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#F5F0E8]">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-[#A8A69E] truncate font-mono mt-0.5">
                    {proj.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Deep Inspection Modal */}
      {inspectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all">
          <div className="bg-[#20201E] border border-[rgba(245,240,232,0.12)] rounded-3xl p-6 sm:p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              type="button"
              onClick={() => setInspectedProject(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] flex items-center justify-center text-[#F5F0E8] hover:text-[#C65D35] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-mono text-xs text-[#C65D35] uppercase tracking-wider block mb-2">
              CASE STUDY AUDIT // {inspectedProject.badgeType}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F0E8] mb-1">
              {inspectedProject.title}
            </h3>
            <p className="font-mono text-xs text-[#A8A69E] mb-6">
              // {inspectedProject.subtitle}
            </p>

            <div className="space-y-5 text-sm text-[#A8A69E] leading-relaxed mb-8">
              <div className="p-4 rounded-xl bg-[#272725] border border-[rgba(245,240,232,0.06)]">
                <span className="font-mono text-xs text-[#F5F0E8] font-bold block mb-1 uppercase">
                  Problem Context:
                </span>
                <p className="text-xs text-[#A8A69E] leading-relaxed">
                  {inspectedProject.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#272725] border border-[rgba(245,240,232,0.06)]">
                <span className="font-mono text-xs text-[#C65D35] font-bold block mb-1 uppercase">
                  My Role & Technical Contribution:
                </span>
                <p className="text-xs font-mono text-[#F5F0E8] mb-1.5">
                  {inspectedProject.role}
                </p>
                <p className="text-xs text-[#A8A69E] leading-relaxed">
                  {inspectedProject.contribution}
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-[#F5F0E8] font-bold block mb-2 uppercase">
                  Key Technical Deliverables:
                </span>
                <ul className="space-y-2">
                  {inspectedProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-mono">
                      <span className="text-[#C65D35]">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-mono text-xs text-[#F5F0E8] font-bold block mb-2 uppercase">
                  Verified Tech Stack:
                </span>
                <div className="flex flex-wrap gap-2">
                  {inspectedProject.stack.map((t, i) => (
                    <span key={i} className="font-mono text-xs px-2.5 py-1 rounded bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] text-[#F5F0E8]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[rgba(245,240,232,0.08)]">
              {inspectedProject.links.live ? (
                <a
                  href={inspectedProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-burnt-orange text-xs px-5 py-2.5 min-h-[44px] rounded-lg inline-flex items-center gap-1.5"
                  aria-label={`Open live application for ${inspectedProject.title}`}
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Private preview, available on request"
                  aria-label={`Live demo for ${inspectedProject.title} is private, available on request`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono px-4 py-2.5 min-h-[44px] rounded-lg bg-[#252523] border border-[rgba(245,240,232,0.06)] text-[#72706A] cursor-not-allowed opacity-60"
                >
                  <span>Live Preview (Private)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}

              {inspectedProject.links.github ? (
                <a
                  href={inspectedProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2.5 min-h-[44px] rounded-lg bg-[#2A2A28] text-[#F5F0E8] hover:border-[#C65D35] border border-[rgba(245,240,232,0.1)] transition-colors"
                  aria-label={`Open GitHub repository for ${inspectedProject.title}`}
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Private preview, available on request"
                  aria-label={`Source code for ${inspectedProject.title} is private, available on request`}
                  className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2.5 min-h-[44px] rounded-lg bg-[#252523] border border-[rgba(245,240,232,0.06)] text-[#72706A] cursor-not-allowed opacity-60"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repository (Private)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
