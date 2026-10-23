import React, { useState, useEffect } from 'react';

/**
 * Reusable WordRotator component
 * - Cycles words every 2 seconds with smooth transform and opacity enter/exit.
 * - aria-live="polite" for screen reader accessibility.
 * - Initial SSR/static word rendered immediately for SEO.
 * - Reduced motion fallback: simple fade without vertical translation.
 */
export default function WordRotator({
  words = [],
  interval = 2000,
  className = '',
  accentClassName = 'text-[#C65D35]'
}) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setReducedMotion(true);
      }
    }

    if (!words || words.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 250); // half-cycle for exit before enter
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  if (!words || words.length === 0) return null;

  const currentWord = words[index];

  return (
    <span
      className={`inline-block relative overflow-hidden align-baseline ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className={`inline-block font-inherit transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${accentClassName}`}
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: reducedMotion
            ? 'none'
            : isTransitioning
            ? 'translate3d(0, -10px, 0)'
            : 'translate3d(0, 0, 0)'
        }}
      >
        {currentWord}
      </span>
    </span>
  );
}
