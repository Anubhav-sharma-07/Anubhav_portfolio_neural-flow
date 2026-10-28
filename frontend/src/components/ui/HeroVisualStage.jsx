import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function HeroVisualStage() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const stageRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  const previewProjects = [
    {
      id: 'cliniva',
      title: 'Cliniva Dental',
      url: 'neuralflow-cliniva-preview.vercel.app',
      image: '/projects/cliniva.webp',
      badge: 'Client project',
      stack: 'React • Mobile patient booking'
    },
    {
      id: 'socio',
      title: 'SOCIO Venue',
      url: 'cafe-bar-self.vercel.app',
      image: '/projects/socio-bar.webp',
      badge: 'Client project',
      stack: 'React • Food & drinks menu'
    },
    {
      id: 'spendlens',
      title: 'SpendLens Tool',
      url: 'credex-audit-eight.vercel.app',
      image: '/projects/spendlens.webp',
      badge: 'My product',
      stack: 'Next.js • Team spend analytics'
    }
  ];

  const currentProject = previewProjects[activeProjectIdx];

  useEffect(() => {
    // Only enable 3D pointer tilt if fine pointer device (mouse) and no reduced motion
    const pointerFine = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!pointerFine || reducedMotion) return;

    let animId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const handleMouseMove = (e) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize between -1 and 1
      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);

      // Max tilt angles: X: -6 to 6 deg, Y: -8 to 8 deg
      mousePos.current = {
        x: Math.max(-1, Math.min(1, normY)) * -6,
        y: Math.max(-1, Math.min(1, normX)) * 8
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: 0, y: 0 };
    };

    const stageEl = stageRef.current;
    if (stageEl) {
      stageEl.addEventListener('mousemove', handleMouseMove, { passive: true });
      stageEl.addEventListener('mouseleave', handleMouseLeave);
    }

    const renderLoop = () => {
      currentRotation.current.x = lerp(currentRotation.current.x, mousePos.current.x, 0.08);
      currentRotation.current.y = lerp(currentRotation.current.y, mousePos.current.y, 0.08);

      const inner = stageRef.current?.querySelector('.perspective-stage-inner');
      if (inner) {
        inner.style.transform = `rotateX(${currentRotation.current.x.toFixed(2)}deg) rotateY(${currentRotation.current.y.toFixed(2)}deg)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      if (stageEl) {
        stageEl.removeEventListener('mousemove', handleMouseMove);
        stageEl.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div 
      ref={stageRef}
      className="relative w-full max-w-xl mx-auto lg:max-w-none select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Perspective Stage Container */}
      <div 
        className="perspective-stage-inner relative transition-transform duration-300 ease-out will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Ambient Burnt Orange & Charcoal Floor Glow */}
        <div 
          className="absolute -inset-4 bg-gradient-to-tr from-[#C65D35]/20 via-[#20201E]/5 to-transparent rounded-3xl blur-2xl -z-10 pointer-events-none"
          style={{ transform: 'translateZ(-40px)' }}
        />

        {/* ================================================================= */}
        {/* LAYER 1: MAIN DESKTOP BROWSER FRAME (Base translateZ: 0px)       */}
        {/* ================================================================= */}
        <div 
          className="relative rounded-2xl bg-[#20201E] border border-[rgba(245,240,232,0.14)] shadow-2xl overflow-hidden transition-all duration-500"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Top Window Bar */}
          <div className="px-4 py-3 bg-[#1A1A18] border-b border-[rgba(245,240,232,0.08)] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>

            <div className="px-3 py-1 rounded-md bg-[#20201E] border border-[rgba(245,240,232,0.06)] flex items-center gap-1.5 text-[10px] font-mono text-[#A8A69E]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>https://{currentProject.url}</span>
            </div>

            <span className="font-mono text-[9px] font-semibold px-2 py-0.5 rounded bg-[#C65D35]/20 text-[#E07A52] border border-[#C65D35]/30">
              {currentProject.badge}
            </span>
          </div>

          {/* Main Visual Screen */}
          <div className="relative aspect-[16/10] bg-[#161614] overflow-hidden">
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-full object-cover object-top transition-opacity duration-300"
              loading="eager"
            />
            {/* Subtle Gradient Shade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#20201E]/40 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Tech Bar */}
            <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-lg bg-[#20201E]/90 backdrop-blur-md border border-[rgba(245,240,232,0.1)] flex items-center justify-between text-[11px] font-mono text-[#F5F0E8]">
              <span className="font-bold text-[#E07A52]">{currentProject.title}</span>
              <span className="text-[#A8A69E] text-[10px] hidden sm:inline">{currentProject.stack}</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* LAYER 2: FLOATING MOBILE DEVICE (translateZ: 50px)               */}
        {/* ================================================================= */}
        <div 
          className="hidden sm:block absolute -bottom-6 -right-5 w-36 sm:w-44 rounded-2xl bg-[#20201E] p-1.5 border border-[rgba(245,240,232,0.2)] shadow-2xl transition-transform duration-500 hover:scale-105"
          style={{ 
            transform: 'translateZ(50px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
          }}
        >
          {/* Mobile Speaker / Camera Notch */}
          <div className="w-8 h-1 rounded-full bg-white/20 mx-auto my-1" />
          
          <div className="rounded-xl overflow-hidden aspect-[9/16] bg-[#141412] relative border border-white/5">
            <img
              src="/projects/cliniva.webp"
              alt="Cliniva mobile patient intake interface"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
            <div className="absolute bottom-2 left-2 right-2 px-2 py-1.5 rounded bg-[#20201E]/95 backdrop-blur-md border border-white/10 text-[10px] font-mono text-center text-[#F5F0E8] shadow-sm">
              <span className="text-[#E07A52] font-semibold">Mobile View</span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* LAYER 3: FLOATING CLIENT GUARANTEE BADGE (translateZ: 75px)       */}
        {/* ================================================================= */}
        <div 
          className="absolute -top-5 -left-4 sm:-left-6 px-4 py-2.5 rounded-xl bg-[#20201E]/95 backdrop-blur-md border border-[rgba(245,240,232,0.15)] shadow-xl flex items-center gap-3 transition-transform duration-500 hover:scale-105"
          style={{ transform: 'translateZ(75px)' }}
        >
          <div className="w-8 h-8 rounded-lg bg-[#C65D35] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <ShieldCheck className="w-4 h-4 fill-current" />
          </div>
          <div className="text-left font-mono">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F5F0E8]">
              <span>100% Code Ownership</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[10px] text-[#A8A69E] block">
              Direct developer contact • Zero lock-in
            </span>
          </div>
        </div>

      </div>

      {/* Interactive Project Preview Switcher */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 relative z-20">
        <span className="font-mono text-[10px] uppercase font-bold text-[#72706A] mr-1 hidden sm:inline">
          Live Project Preview:
        </span>
        {previewProjects.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveProjectIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeProjectIdx === idx
                ? 'bg-[#20201E] text-[#F5F0E8] border border-[#C65D35] shadow-xs font-bold'
                : 'bg-white/80 border border-[#20201E]/10 text-[#575550] hover:text-[#20201E] hover:border-[#20201E]/25'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>
    </div>
  );
}

