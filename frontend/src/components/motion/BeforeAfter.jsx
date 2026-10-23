import React, { useState, useRef, useCallback } from 'react';

/**
 * Reusable BeforeAfter comparison slider component
 * - Draggable divider with pointer and touch events.
 * - Keyboard accessible with ArrowLeft / ArrowRight / Home / End keys.
 * - Auto-hides cleanly (returns null) if beforeImage or afterImage is missing.
 */
export default function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
  initialPosition = 50
}) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percent);
  }, []);

  // HARD RULE: Only render if a real beforeImage exists. Otherwise hide cleanly.
  if (!beforeImage || !afterImage) {
    return null;
  }

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(prev + 5, 100));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[16/10] overflow-hidden rounded-2xl select-none cursor-ew-resize ${className}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      role="slider"
      aria-label="Before and after image comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* "After" Image (Background layer) */}
      <img
        src={afterImage}
        alt={`${afterLabel} view`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        width={1200}
        height={800}
        loading="lazy"
      />
      <span className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-[#20201E]/80 backdrop-blur-xs font-mono text-[11px] text-[#F5F0E8] border border-white/10 uppercase font-semibold">
        {afterLabel}
      </span>

      {/* "Before" Image (Clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={`${beforeLabel} view`}
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          width={1200}
          height={800}
          loading="lazy"
        />
        <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-[#20201E]/80 backdrop-blur-xs font-mono text-[11px] text-[#F5F0E8] border border-white/10 uppercase font-semibold">
          {beforeLabel}
        </span>
      </div>

      {/* Draggable Divider Line & Knob */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#F5F0E8] shadow-lg pointer-events-none z-20 flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 rounded-full bg-[#C65D35] text-[#F5F0E8] shadow-md border-2 border-white flex items-center justify-center font-mono text-xs font-bold pointer-events-none">
          ↔
        </div>
      </div>
    </div>
  );
}
