import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowUpRight, CheckCircle2, X, Eye } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function FeaturedWork({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  return (
    <section 
      id="projects"
      className="py-24 sm:py-32 bg-[#20201E] text-[#F5F0E8] border-t border-[rgba(245,240,232,0.08)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
              SELECTED PROJECTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F0E8] tracking-tight mb-3">
              Featured Work
            </h2>
            <p className="text-base text-[#A8A69E] max-w-xl">
              Real projects. Practical solutions. Built for business.
            </p>
          </div>

          <a 
            href="#contact" 
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#F5F0E8] hover:text-[#C65D35] transition-colors group"
          >
            <span>Have a project in mind? Let's discuss</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 4 Project Cards Grid (1 col on mobile, 2 cols on tablet, 4 cols on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-[#272725] border border-[rgba(245,240,232,0.08)] hover:border-[#C65D35]/60 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Screenshot Frame with Browser Bar */}
                <div className="relative aspect-[16/10] bg-[#1A1A18] overflow-hidden border-b border-[rgba(245,240,232,0.06)]">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.category}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#20201E]/40 to-transparent pointer-events-none" />
                  
                  {/* Status Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-[#20201E]/80 backdrop-blur-md text-[#E07A52] border border-[#C65D35]/30 shadow-xs">
                      {project.badgeType}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-display font-bold text-xl text-[#F5F0E8] group-hover:text-[#C65D35] transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <span className="font-mono text-xs text-[#A8A69E] block mb-3 font-medium">
                    {project.category}
                  </span>

                  <p className="text-xs text-[#D4D2CA] leading-relaxed mb-4 line-clamp-3">
                    {project.purpose || project.summary}
                  </p>

                  {/* Key Features Bullet List */}
                  {project.highlights && (
                    <div className="space-y-1.5 pt-3 border-t border-[rgba(245,240,232,0.06)] mb-4">
                      {project.highlights.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#A8A69E]">
                          <span className="text-[#C65D35] font-bold shrink-0">•</span>
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Links */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-[rgba(245,240,232,0.06)] mt-auto">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="font-mono text-xs font-semibold text-[#C65D35] hover:text-[#E07A52] flex items-center gap-1 transition-colors cursor-pointer py-2"
                >
                  <span>Case Study</span>
                  <Eye className="w-3.5 h-3.5" />
                </button>

                {project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#F5F0E8] hover:text-[#C65D35] flex items-center gap-1 transition-colors py-2"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : project.links.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#A8A69E] hover:text-[#F5F0E8] flex items-center gap-1 transition-colors py-2"
                  >
                    <span>View Code</span>
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="font-mono text-[10px] text-[#72706A]">Verified Build</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Case Study Modal (Step 6 Mandate) */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#272725] border border-[rgba(245,240,232,0.15)] p-6 sm:p-10 text-[#F5F0E8] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-[rgba(245,240,232,0.08)] mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider">
                    {selectedProject.badgeType}
                  </span>
                  <span className="text-[#72706A]">•</span>
                  <span className="font-mono text-xs text-[#A8A69E]">
                    {selectedProject.category}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F5F0E8]">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-lg bg-[#20201E] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] flex items-center justify-center text-[#F5F0E8] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="rounded-2xl overflow-hidden border border-[rgba(245,240,232,0.08)] mb-8 bg-[#1A1A18] aspect-[16/10]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Factual Case Study Sections */}
            <div className="space-y-6 text-sm text-[#D4D2CA] leading-relaxed mb-8">
              <div>
                <h4 className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider mb-2">
                  The Challenge
                </h4>
                <p className="bg-[#20201E] p-4 rounded-xl border border-[rgba(245,240,232,0.06)]">
                  {selectedProject.challenge}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider mb-2">
                  The Approach & Architecture
                </h4>
                <p className="bg-[#20201E] p-4 rounded-xl border border-[rgba(245,240,232,0.06)]">
                  {selectedProject.approach}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider mb-2">
                  What Was Built & Technology
                </h4>
                <p className="bg-[#20201E] p-4 rounded-xl border border-[rgba(245,240,232,0.06)] mb-3">
                  {selectedProject.whatWasBuilt}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((t, idx) => (
                    <span key={idx} className="font-mono text-xs px-2.5 py-1 rounded bg-[#20201E] border border-[rgba(245,240,232,0.08)] text-[#A8A69E]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider mb-2">
                  Demonstrable Result
                </h4>
                <div className="bg-[#20201E] p-4 rounded-xl border border-[rgba(245,240,232,0.06)] flex items-start gap-2.5 text-xs text-[#F5F0E8]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{selectedProject.result}</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[rgba(245,240,232,0.08)]">
              <div className="flex items-center gap-3">
                {selectedProject.links.live && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-burnt-orange text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5"
                  >
                    <span>View Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-4 py-2.5 rounded-lg bg-[#20201E] border border-[rgba(245,240,232,0.12)] text-[#F5F0E8] hover:border-[#C65D35] transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="font-mono text-xs text-[#A8A69E] hover:text-[#F5F0E8] px-3 py-2 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
