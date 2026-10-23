import React, { useEffect, useRef } from 'react';

export default function LuminousBackdrop({ variant = 'charcoal', className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReduced || !hasFinePointer) return;

    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      // Only update if there is active delta to avoid idle RAF shifts
      const deltaX = targetX - currentX;
      const deltaY = targetY - currentY;
      
      if (Math.abs(deltaX) > 0.01 || Math.abs(deltaY) > 0.01) {
        currentX += deltaX * 0.05;
        currentY += deltaY * 0.05;

        const orbs = container.querySelectorAll('.luminous-orb');
        orbs.forEach((orb, i) => {
          const factor = (i + 1) * 0.4;
          orb.style.transform = `translate3d(${currentX * factor}px, ${currentY * factor}px, 0)`;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isCharcoal = variant === 'charcoal';

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Orb 1: Primary Burnt Orange Glow (Fixed pixel anchor prevents percentage CLS) */}
      <div 
        className="luminous-orb absolute -top-12 -right-12 w-[380px] h-[380px] rounded-full blur-[100px] opacity-35"
        style={{
          contain: 'strict',
          background: isCharcoal 
            ? 'radial-gradient(circle, rgba(198, 93, 53, 0.28) 0%, rgba(198, 93, 53, 0) 70%)'
            : 'radial-gradient(circle, rgba(198, 93, 53, 0.15) 0%, rgba(198, 93, 53, 0) 70%)'
        }}
      />

      {/* Orb 2: Secondary Accent Glow */}
      <div 
        className="luminous-orb absolute -bottom-12 -left-12 w-[360px] h-[360px] rounded-full blur-[90px] opacity-30"
        style={{
          contain: 'strict',
          background: isCharcoal
            ? 'radial-gradient(circle, rgba(245, 240, 232, 0.12) 0%, rgba(32, 32, 30, 0) 70%)'
            : 'radial-gradient(circle, rgba(198, 93, 53, 0.12) 0%, rgba(245, 240, 232, 0) 70%)'
        }}
      />

      {/* Orb 3: Subtle Center Ambient Pulse */}
      <div 
        className="luminous-orb absolute top-48 left-1/3 w-[300px] h-[300px] rounded-full blur-[110px] opacity-20"
        style={{
          contain: 'strict',
          background: isCharcoal
            ? 'radial-gradient(circle, rgba(198, 93, 53, 0.18) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(235, 229, 219, 0.4) 0%, transparent 70%)'
        }}
      />
    </div>
  );
}
