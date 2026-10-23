import React, { useEffect, useRef, useState } from 'react';

/**
 * Reusable Reveal component
 * Performance-focused: Animates ONLY transform and opacity.
 * Triggers via IntersectionObserver (once: true).
 * Respects prefers-reduced-motion (turns off transform, reduces to immediate or simple fade).
 */
export default function Reveal({
  children,
  direction = 'up', // 'up' | 'down' | 'fade' | 'scale' | 'left' | 'right'
  delay = 0,
  duration = 500,
  threshold = 0.15,
  className = '',
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
        setIsVisible(true);
        return;
      }
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold]);

  const getInitialTransform = () => {
    if (reducedMotion) return 'none';
    switch (direction) {
      case 'up':
        return 'translate3d(0, 24px, 0)';
      case 'down':
        return 'translate3d(0, -24px, 0)';
      case 'left':
        return 'translate3d(24px, 0, 0)';
      case 'right':
        return 'translate3d(-24px, 0, 0)';
      case 'scale':
        return 'scale(0.96) translate3d(0, 12px, 0)';
      case 'fade':
      default:
        return 'none';
    }
  };

  const style = reducedMotion
    ? { opacity: isVisible ? 1 : 0 }
    : {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getInitialTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform'
      };

  return (
    <Component
      ref={ref}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}
