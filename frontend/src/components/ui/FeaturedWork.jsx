import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, X, Eye } from 'lucide-react';
import { GithubIcon } from './Icons';
import HoverVideo from '../motion/HoverVideo';

export default function FeaturedWork({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Identify flagship project (SpendLens) and secondary projects
  const flagshipProject = projects.find(p => p.id === 'spendlens') || projects[0];
  const secondaryProjects = projects.filter(p => p.id !== flagshipProject?.id);

  // Handle URL hash deep-linking on mount & hashchange
  useEffect(() => {
    const handleHashCheck = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash) {
        const matched = projects.find(
          (p) => p.id.toLowerCase() === hash || `case-${p.id.toLowerCase()}` === hash
        );
        if (matched) {
          setSelectedProject(matched);
        }
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, [projects]);

  // Modal open/close side effects: lock body scroll, manage focus, handle Escape key
  useEffect(() => {
    if (selectedProject) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';

      // Focus modal on next frame
      requestAnimationFrame(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      });

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          handleCloseModal();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        if (previousActiveElement.current?.focus) {
          previousActiveElement.current.focus();
        }
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    if (window.history?.pushState) {
      window.history.pushState(null, '', `#case-${project.id}`);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    if (window.history?.pushState) {
      window.history.pushState(null, '', `${window.location.pathname}#projects`);
    }
  };

  return (
    <section 
      id="projects"
      className="py-24 sm:py-32 bg-[#20201E] text-[#F5F0E8] border-t border-[rgba(245,240,232,0.08)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#272725] border border-[rgba(245,240,232,0.1)] text-[#C65D35] font-mono text-xs font-bold mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#C65D35] animate-pulse" />
              <span>REAL PROJECTS & PROVEN RESULTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F0E8] tracking-tight mb-3">
              Featured Work
            </h2>
            <p className="text-base text-[#D4D2CA] max-w-xl font-normal leading-relaxed">
              Clean websites and custom web tools built for real businesses. Every project has a live link or open code so you can test it yourself.
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

        {/* =================================================================== */}
        {/* 1. ASYMMETRIC FLAGSHIP SPOTLIGHT CARD (SpendLens SaaS)              */}
        {/* =================================================================== */}
        {flagshipProject && (
          <div className="mb-10 rounded-3xl bg-[#272725] border border-[rgba(245,240,232,0.12)] overflow-hidden shadow-2xl hover:border-[#C65D35]/50 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column: Editorial Project Overview (col-span-5) */}
              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[rgba(245,240,232,0.08)]">
                <div>
                  {/* Top Badge & Platform */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#20201E] text-[#E07A52] border border-[#C65D35]/30">
                      {flagshipProject.badgeType}
                    </span>
                    <span className="font-mono text-xs text-[#A8A69E]">
                      {flagshipProject.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#F5F0E8] tracking-tight mb-3">
                    {flagshipProject.title}
                  </h3>

                  {/* Purpose */}
                  <p className="text-sm text-[#D4D2CA] leading-relaxed mb-6 font-normal">
                    {flagshipProject.summary || flagshipProject.purpose}
                  </p>

                  {/* Verifiable Highlights */}
                  {flagshipProject.highlights && (
                    <div className="space-y-2 pt-5 border-t border-[rgba(245,240,232,0.06)] mb-6">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#72706A] block mb-2">
                        Engineering Highlights:
                      </span>
                      {flagshipProject.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D4D2CA]">
                          <CheckCircle2 className="w-4 h-4 text-[#C65D35] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {flagshipProject.stack?.map((tech, i) => (
                      <span key={i} className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#20201E] text-[#D8CFC1] border border-[rgba(245,240,232,0.08)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Flagship CTAs */}
                <div className="pt-6 border-t border-[rgba(245,240,232,0.08)] flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenProject(flagshipProject)}
                    className="font-mono text-xs font-semibold px-4 py-2.5 rounded-lg bg-[#C65D35] text-white hover:bg-[#d46a42] transition-colors flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                  >
                    <Eye className="w-4 h-4" />
                    <span>See how I built it</span>
                  </button>

                  {flagshipProject.links?.live && (
                    <a
                      href={flagshipProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-semibold px-4 py-2.5 rounded-lg bg-[#20201E] text-[#F5F0E8] border border-[rgba(245,240,232,0.12)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>Visit live site</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {flagshipProject.links?.github && (
                    <a
                      href={flagshipProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-semibold px-3 py-2.5 rounded-lg bg-[#20201E] text-[#A8A69E] border border-[rgba(245,240,232,0.12)] hover:text-[#F5F0E8] flex items-center gap-1.5 transition-all"
                      title="Inspect Source Code on GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>View code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Full Browser Window Canvas (col-span-7) */}
              <div className="lg:col-span-7 bg-[#1A1A18] flex flex-col justify-between overflow-hidden relative group">
                {/* Browser Window Chrome */}
                <div className="px-4 py-3 bg-[#1F1F1D] border-b border-[rgba(245,240,232,0.08)] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="font-mono text-[10px] text-[#A8A69E] tracking-wider truncate max-w-xs">
                    https://{flagshipProject.links?.live?.replace('https://', '') || 'credex-audit.neuralflow.dev'}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live product</span>
                  </div>
                </div>

                {/* Screenshot / Hover Video with subtle hover zoom */}
                <div className="relative aspect-[16/10] sm:aspect-[16/11] bg-[#141412] overflow-hidden">
                  <HoverVideo
                    posterSrc={flagshipProject.image}
                    videoSrc={flagshipProject.video}
                    alt={flagshipProject.title}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#20201E]/40 to-transparent pointer-events-none" />

                  {/* Floating Result Metric Chip */}
                  <div className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-[#20201E]/95 backdrop-blur-md border border-[rgba(245,240,232,0.15)] shadow-xl flex items-center gap-2.5 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#C65D35]" />
                    <span className="text-[#F5F0E8] font-bold">Audits team spend in &lt; 2 minutes</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 2. SECONDARY TRI-GRID (Cliniva, SOCIO, Aura Interview)             */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {secondaryProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-[#272725] border border-[rgba(245,240,232,0.08)] hover:border-[#C65D35]/60 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Browser Window Chrome */}
                <div className="px-4 py-2.5 bg-[#1F1F1D] border-b border-[rgba(245,240,232,0.06)] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="font-mono text-[10px] text-[#72706A] tracking-wider truncate max-w-[140px]">
                    {project.links?.live?.replace('https://', '') || `${project.id}.neuralflow.dev`}
                  </span>
                  <span className="font-mono text-[9px] font-semibold px-2 py-0.5 rounded bg-[#20201E] text-[#E07A52] border border-[#C65D35]/30">
                    {project.badgeType}
                  </span>
                </div>

                {/* Screenshot / Hover Video Frame */}
                <div className="relative aspect-[16/10] bg-[#161614] overflow-hidden border-b border-[rgba(245,240,232,0.06)]">
                  <HoverVideo
                    posterSrc={project.image}
                    videoSrc={project.video}
                    alt={`${project.title} — ${project.category}`}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#20201E]/30 to-transparent pointer-events-none" />
                </div>

                {/* Content: Outcome-Led Format */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <h3 className="font-display font-bold text-xl text-[#F5F0E8] group-hover:text-[#C65D35] transition-colors">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-[#A8A69E] shrink-0">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#D4D2CA] leading-relaxed mb-4 line-clamp-2 font-normal">
                    {project.purpose || project.summary}
                  </p>

                  {/* Outcome-Led Breakdown: Problem & Result */}
                  <div className="space-y-2.5 pt-3 border-t border-[rgba(245,240,232,0.06)] text-xs mb-4">
                    <div className="text-[#A8A69E]">
                      <span className="font-mono text-[10px] text-[#C65D35] uppercase font-bold block mb-0.5">Problem:</span>
                      <p className="text-[11px] text-[#D4D2CA] line-clamp-2 leading-relaxed">{project.challenge}</p>
                    </div>
                    <div className="text-[#D4D2CA]">
                      <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold block mb-0.5">Result:</span>
                      <p className="text-[11px] text-[#F5F0E8] line-clamp-2 font-medium leading-relaxed">{project.result}</p>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  {project.stack && (
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-[rgba(245,240,232,0.06)] mb-2">
                      {project.stack.map((tech, i) => (
                        <span key={i} className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#20201E] text-[#D8CFC1] border border-[rgba(245,240,232,0.08)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Links */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-[rgba(245,240,232,0.06)] mt-auto">
                <button
                  type="button"
                  onClick={() => handleOpenProject(project)}
                  className="font-mono text-xs font-semibold text-[#C65D35] hover:text-[#E07A52] flex items-center gap-1.5 transition-colors cursor-pointer py-2 focus-visible:outline-none focus-visible:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>See how I built it</span>
                </button>

                {project.links?.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#20201E] text-[#F5F0E8] border border-[rgba(245,240,232,0.12)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>Visit live site</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ) : project.links?.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#20201E] text-[#A8A69E] border border-[rgba(245,240,232,0.12)] hover:text-[#F5F0E8] flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>View code</span>
                    <GithubIcon className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-mono text-[10px] text-[#72706A]">Verified Build</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. DEEP ARCHITECTURAL CASE STUDY MODAL                              */}
      {/* =================================================================== */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          <div 
            ref={modalRef}
            tabIndex={-1}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#272725] border border-[rgba(245,240,232,0.15)] p-6 sm:p-10 text-[#F5F0E8] shadow-2xl relative outline-none"
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
                <h3 id="case-study-title" className="font-display font-bold text-2xl sm:text-3xl text-[#F5F0E8]">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-lg bg-[#20201E] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] flex items-center justify-center text-[#F5F0E8] transition-colors cursor-pointer"
                aria-label="Close case study dialog"
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
                  1. The Problem & Business Context
                </h4>
                <p className="bg-[#20201E] p-4 rounded-xl border border-[rgba(245,240,232,0.06)]">
                  {selectedProject.challenge}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider mb-2">
                  2. What I Did & How I Approached It
                </h4>
                <p className="bg-[#20201E] p-4 rounded-xl border border-[rgba(245,240,232,0.06)]">
                  {selectedProject.approach}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider mb-2">
                  3. What Was Built & Tools Used
                </h4>
                <p className="bg-[#20201E] p-4 rounded-xl border border-[rgba(245,240,232,0.06)] mb-3">
                  {selectedProject.whatWasBuilt}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack?.map((t, idx) => (
                    <span key={idx} className="font-mono text-xs px-2.5 py-1 rounded bg-[#20201E] border border-[rgba(245,240,232,0.08)] text-[#A8A69E]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider mb-2">
                  4. The Verified Result
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
                {selectedProject.links?.live ? (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-burnt-orange text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-xs"
                  >
                    <span>View Live Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg bg-[#20201E] border border-[rgba(245,240,232,0.08)] text-[#A8A69E]">
                    <GithubIcon className="w-3.5 h-3.5 text-[#C65D35]" />
                    <span>Prototype Repository Available</span>
                  </div>
                )}

                {selectedProject.links?.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-4 py-2.5 rounded-lg bg-[#20201E] border border-[rgba(245,240,232,0.12)] text-[#F5F0E8] hover:border-[#C65D35] transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Code</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="font-mono text-xs text-[#A8A69E] hover:text-[#F5F0E8] px-3 py-2 cursor-pointer transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
