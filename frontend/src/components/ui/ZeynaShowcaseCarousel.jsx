import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Code2, 
  X,
  Maximize2,
  Terminal,
  Activity
} from 'lucide-react';
import { GithubIcon } from './Icons';
import ProjectMockupFrame from './ProjectMockupFrame';

export default function ZeynaShowcaseCarousel({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [inspectedProject, setInspectedProject] = useState(null);

  // Filter categories
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

  return (
    <div className="w-full relative">
      {/* Top Controls: Filter Pills & Scrubber Indicator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[rgba(245,240,232,0.08)]">
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
              className={`font-mono text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#C65D35] text-[#F5F0E8] font-bold shadow-sm'
                  : 'bg-[#2A2A28] text-[#A8A69E] hover:text-[#F5F0E8] border border-[rgba(245,240,232,0.06)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel Stepper Controls */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#72706A]">
            0{currentIndex + 1} / 0{filteredProjects.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              className="w-9 h-9 rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#F5F0E8] transition-colors cursor-pointer"
              aria-label="Previous project slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-9 h-9 rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#F5F0E8] transition-colors cursor-pointer"
              aria-label="Next project slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Perspective Cylindrical Stage */}
      <div className="relative overflow-hidden py-4 [perspective:1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Elevated Project Showcase Card */}
          <div className="lg:col-span-8 space-y-6">
            <div 
              className="hairline-charcoal rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl transition-all duration-500 transform [transform-style:preserve-3d]"
              style={{
                background: 'linear-gradient(135deg, #272725 0%, #20201E 100%)',
                borderColor: 'rgba(198, 93, 53, 0.35)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
              }}
            >
              {/* Header inside project card */}
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#72706A] mb-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C65D35]/15 text-[#C65D35] font-semibold border border-[#C65D35]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C65D35] animate-pulse" />
                    {activeProject.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#20201E] border border-[rgba(245,240,232,0.08)] text-[#A8A69E] text-[11px]">
                    {activeProject.badgeType}
                  </span>
                </div>
                <span>YEAR // {activeProject.year}</span>
              </div>

              {/* Title & Headline */}
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#F5F0E8] mb-2 tracking-tight">
                {activeProject.title}
              </h3>
              <p className="font-mono text-xs text-[#C65D35] mb-6">
                // {activeProject.subtitle}
              </p>

              {/* Dimensional Browser Mockup Frame with layered depth */}
              <div className="mb-8">
                <ProjectMockupFrame project={activeProject} />
              </div>

              {/* Summary Description */}
              <p className="text-sm sm:text-base text-[#A8A69E] leading-relaxed mb-6 font-normal">
                {activeProject.summary}
              </p>

              {/* Key Architecture Highlights */}
              <div className="space-y-2.5 mb-8 pt-6 border-t border-[rgba(245,240,232,0.06)]">
                {activeProject.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#F5F0E8] font-mono">
                    <CheckCircle2 className="w-4 h-4 text-[#C65D35] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Stack Pills & Action Buttons */}
              <div className="pt-6 border-t border-[rgba(245,240,232,0.08)] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {activeProject.stack.map((t, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-[#2A2A28] border border-[rgba(245,240,232,0.08)] text-[#A8A69E]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setInspectedProject(activeProject)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-4 py-2 rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] text-[#F5F0E8] hover:border-[#C65D35] hover:text-[#C65D35] transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Deep Inspect</span>
                  </button>

                  {activeProject.links.live && (
                    <a
                      href={activeProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-burnt-orange text-xs px-4 py-2 rounded-lg"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {activeProject.links.github && (
                    <a
                      href={activeProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-2 rounded-lg bg-[#2A2A28] text-[#A8A69E] hover:text-[#F5F0E8] transition-colors"
                      aria-label="View Source on GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Curved Neighbor Deck (Zeyna Cylindrical Preview) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase text-[#72706A] tracking-widest mb-1">
              ALL VERIFIED PROJECTS ({filteredProjects.length})
            </span>

            {filteredProjects.map((proj, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <div
                  key={proj.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 transform ${
                    isSelected
                      ? 'bg-[#2A2A28] border-l-4 border-[#C65D35] translate-x-2 shadow-lg'
                      : 'bg-[#242422] border border-[rgba(245,240,232,0.04)] hover:border-[rgba(245,240,232,0.12)] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#72706A] mb-1">
                    <span>0{idx + 1}</span>
                    <span className="text-[#C65D35] font-semibold">{proj.badgeType}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#F5F0E8]">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-[#A8A69E] truncate font-mono mt-1">
                    {proj.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Deep Inspection Modal (Zeyna Case Study Drawer) */}
      {inspectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all">
          <div className="bg-[#20201E] border border-[rgba(245,240,232,0.12)] rounded-3xl p-6 sm:p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              type="button"
              onClick={() => setInspectedProject(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] flex items-center justify-center text-[#F5F0E8] hover:text-[#C65D35] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-mono text-xs text-[#C65D35] uppercase tracking-wider block mb-2">
              CASE STUDY AUDIT // {inspectedProject.badgeType}
            </span>
            <h3 className="text-3xl font-display font-bold text-[#F5F0E8] mb-2">
              {inspectedProject.title}
            </h3>
            <p className="font-mono text-xs text-[#A8A69E] mb-6">
              // {inspectedProject.subtitle}
            </p>

            <div className="space-y-6 text-sm text-[#A8A69E] leading-relaxed mb-8">
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
                  My Technical Contribution:
                </span>
                <p className="text-xs text-[#A8A69E] leading-relaxed">
                  {inspectedProject.contribution}
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-[#F5F0E8] font-bold block mb-2 uppercase">
                  Key Technical Capabilities:
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

            <div className="flex items-center gap-4 pt-6 border-t border-[rgba(245,240,232,0.08)]">
              {inspectedProject.links.live && (
                <a
                  href={inspectedProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-burnt-orange text-xs px-5 py-2.5 rounded-lg"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {inspectedProject.links.github && (
                <a
                  href={inspectedProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-lg bg-[#2A2A28] text-[#F5F0E8] hover:border-[#C65D35] border border-[rgba(245,240,232,0.1)] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
