import React, { useState, useEffect, useRef } from 'react';
import { MousePointer, Sparkles, TrendingDown } from 'lucide-react';

/**
 * SpendLensCursorTour component
 * - Looping mock UI demonstrating SpendLens automated AI spend audit.
 * - Virtual cursor moves, clicks, and reveals a savings result.
 * - Pauses execution completely when not in view (via IntersectionObserver).
 * - Reduced motion fallback: statically displays result with zero movement.
 */
export default function SpendLensCursorTour() {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [stage, setStage] = useState(0); // 0: moving to button, 1: click, 2: revealed, 3: pause
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setReducedMotion(true);
        setStage(2);
        return;
      }
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || reducedMotion) return;

    let timer;
    if (stage === 0) {
      // Moving cursor towards "Audit Seats" button
      timer = setTimeout(() => setStage(1), 1400);
    } else if (stage === 1) {
      // Click simulation
      timer = setTimeout(() => setStage(2), 500);
    } else if (stage === 2) {
      // Display result for 3 seconds
      timer = setTimeout(() => setStage(3), 3200);
    } else if (stage === 3) {
      // Reset loop
      timer = setTimeout(() => setStage(0), 600);
    }

    return () => clearTimeout(timer);
  }, [isInView, stage, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl bg-[#1A1A18] border border-[rgba(245,240,232,0.12)] p-4 sm:p-5 overflow-hidden select-none font-mono text-xs text-[#F5F0E8]"
    >
      {/* Top Console Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(245,240,232,0.08)] text-[11px] text-[#A8A69E]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-[#F5F0E8]">SpendLens Live Interactive Tour</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#2A2A28] text-[10px] text-[#C65D35] border border-[#C65D35]/30">
          Sample Simulation
        </span>
      </div>

      {/* Main Tour Interface */}
      <div className="relative min-h-[160px] flex flex-col justify-between">
        
        {/* Mock Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#72706A] uppercase block">Detected Subscriptions</span>
            <span className="font-display font-bold text-lg text-[#F5F0E8]">14 Active Developer Tools</span>
          </div>

          {/* Target Button */}
          <div
            className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-all duration-200 ${
              stage >= 1 && stage <= 2
                ? 'bg-[#C65D35] text-white border-[#C65D35] scale-95 shadow-md'
                : 'bg-[#2A2A28] text-[#F5F0E8] border-[rgba(245,240,232,0.15)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Audit Team Seats</span>
          </div>
        </div>

        {/* Revealed Audit Result (Appears on stage 2) */}
        <div
          className={`mt-4 p-3.5 rounded-xl border transition-all duration-400 ${
            stage === 2 || reducedMotion
              ? 'opacity-100 translate-y-0 bg-[#252523] border-[#C65D35]/50'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white text-xs block">Duplicate License Detected</span>
                <span className="text-[11px] text-[#A8A69E]">
                  2 unassigned seats in GitHub Copilot • Potential saving: <strong className="text-emerald-400">$480 / yr</strong>
                </span>
              </div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#C65D35]/20 text-[#C65D35] shrink-0 uppercase font-bold">
              Sample data
            </span>
          </div>
        </div>

        {/* Fake Cursor (Moves and clicks smoothly) */}
        {!reducedMotion && (
          <div
            className="absolute z-30 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              top: stage === 0 ? '70%' : '14px',
              right: stage === 0 ? '75%' : '48px',
              transform: stage === 1 ? 'scale(0.85)' : 'scale(1)',
              opacity: stage === 3 ? 0 : 1
            }}
          >
            <div className="relative">
              <MousePointer className="w-5 h-5 text-[#C65D35] fill-[#C65D35] drop-shadow-md" />
              {stage === 1 && (
                <div className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-[#C65D35]/40 animate-ping" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-3 pt-2 border-t border-[rgba(245,240,232,0.06)] flex items-center justify-between text-[10px] text-[#72706A]">
        <span>Auto-pauses when scrolled out of view</span>
        <span>Loop: 6s cycle</span>
      </div>
    </div>
  );
}
