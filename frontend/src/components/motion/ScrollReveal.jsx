import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = '',
  cascade = false,
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'none';
    switch (direction) {
      case 'up': return 'translate3d(0, 32px, 0)';
      case 'down': return 'translate3d(0, -32px, 0)';
      case 'left': return 'translate3d(32px, 0, 0)';
      case 'right': return 'translate3d(-32px, 0, 0)';
      case 'scale': return 'scale(0.94) translate3d(0, 16px, 0)';
      case 'fade': return 'none';
      default: return 'translate3d(0, 32px, 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} ${cascade ? 'scroll-cascade' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(6px)',
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform, filter'
      }}
      {...props}
    >
      {children}
    </div>
  );
}
