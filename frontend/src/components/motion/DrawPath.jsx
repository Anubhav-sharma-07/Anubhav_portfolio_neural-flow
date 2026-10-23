import React, { useEffect, useRef, useState } from 'react';

/**
 * Reusable DrawPath component
 * Draws an SVG path using stroke-dasharray and stroke-dashoffset as it scrolls into view.
 * Respects prefers-reduced-motion by rendering fully drawn stroke immediately.
 */
export default function DrawPath({
  d,
  viewBox = "0 0 1000 100",
  strokeColor = "#C65D35",
  strokeWidth = 2,
  duration = 1200,
  delay = 100,
  className = "",
  svgClassName = "w-full h-auto overflow-visible"
}) {
  const pathRef = useRef(null);
  const containerRef = useRef(null);
  const [pathLength, setPathLength] = useState(1000);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }

    // Check reduced motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsDrawn(true);
        return;
      }
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <svg
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={svgClassName}
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={d}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: isDrawn ? 0 : pathLength,
            transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
          }}
        />
      </svg>
    </div>
  );
}
