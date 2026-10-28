import React, { useRef, useState, useEffect } from 'react';

/**
 * Reusable HoverVideo component
 * - Displays high-resolution poster image by default.
 * - On hover (desktop pointer:fine), plays muted loop video if videoSrc exists.
 * - If video is missing (TODO: Anubhav to record 5-8s screen clips), displays poster only.
 * - Strictly respects prefers-reduced-motion.
 */
export default function HoverVideo({
  posterSrc,
  videoSrc,
  alt = 'Project preview',
  className = ''
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  const handleMouseEnter = () => {
    if (reducedMotion || !videoSrc || !videoRef.current) return;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
      // Ignore autoplay prevention
    });
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Poster Image (always rendered as foundation) */}
      <img
        src={posterSrc}
        alt={alt}
        className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
      />

      {/* Optional Preview Video (Plays on hover if available) */}
      {videoSrc && !reducedMotion && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
            isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}
    </div>
  );
}

