import React, { useEffect, useRef, useState } from 'react';

/**
 * Reusable CountUp component
 * Animates numerical count from 0 to target once on scroll into viewport.
 * Uses requestAnimationFrame with cubic ease-out.
 * Instantly displays final value if prefers-reduced-motion is active.
 */
export default function CountUp({
  value,
  duration = 1400,
  prefix = '',
  suffix = '',
  className = ''
}) {
  const target = typeof value === 'number' ? value : parseInt(value, 10) || 0;
  const [displayValue, setDisplayValue] = useState(target);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const target = typeof value === 'number' ? value : parseInt(value, 10) || 0;

    // Check reduced motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setDisplayValue(target);
        return;
      }
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(entry.target);

          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Cubic ease-out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(easeOut * target));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setDisplayValue(target);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
