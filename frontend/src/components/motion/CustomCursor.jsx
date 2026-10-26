import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad) and user doesn't prefer reduced motion
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (!mediaQuery.matches || prefersReduced.matches) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    let animFrameId;

    const handlePointerMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-interactive="true"], .cursor-pointer'
      );
      setIsHovered(!!interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // High performance 120Hz RAF render loop with lerp physics
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const render = () => {
      // Lerp ring towards mouse position
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.18);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer fluid trailing ring with Burnt Orange glow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[70] rounded-full will-change-transform"
        style={{
          width: isClicking ? '26px' : isHovered ? '48px' : '32px',
          height: isClicking ? '26px' : isHovered ? '48px' : '32px',
          border: isHovered 
            ? '1.5px solid rgba(198, 93, 53, 0.8)' 
            : '1px solid rgba(198, 93, 53, 0.45)',
          backgroundColor: isHovered 
            ? 'rgba(198, 93, 53, 0.12)' 
            : 'rgba(198, 93, 53, 0.03)',
          boxShadow: isHovered 
            ? '0 0 20px rgba(198, 93, 53, 0.35)' 
            : '0 0 8px rgba(198, 93, 53, 0.15)',
          transition: 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), border 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease'
        }}
      />

      {/* Inner sharp precision dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[71] rounded-full bg-[#C65D35] will-change-transform"
        style={{
          width: isClicking ? '8px' : isHovered ? '4px' : '6px',
          height: isClicking ? '8px' : isHovered ? '4px' : '6px',
          boxShadow: '0 0 10px #C65D35',
          transition: 'width 0.15s ease, height 0.15s ease'
        }}
      />
    </>
  );
}
