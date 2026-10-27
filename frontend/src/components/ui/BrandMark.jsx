import React from 'react';

/**
 * BrandMark Component
 * Renders the official Neural Flow ribbon emblem.
 * Incorporates the warm ivory, sculpted metallic stone, and glowing burnt-orange fold.
 */
export default function BrandMark({ 
  size = 'md', 
  className = '', 
  showImage = true,
  withGlow = false 
}) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  if (showImage) {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 rounded-xl overflow-hidden bg-[#20201E] border border-[rgba(245,240,232,0.12)] shadow-xs transition-all duration-300 group-hover:border-[#C65D35]/60 ${currentSize} ${className}`}>
        <img
          src="/images/neural-flow-brand-logo.jpg"
          alt="Neural Flow"
          className="w-full h-full object-cover"
          width={64}
          height={64}
          loading="eager"
        />
        {withGlow && (
          <div className="absolute inset-0 bg-[#C65D35]/15 pointer-events-none mix-blend-overlay" />
        )}
      </div>
    );
  }

  // Fallback crisp SVG representation of the NF ribbon
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 rounded-xl bg-[#20201E] border border-[rgba(245,240,232,0.12)] text-[#F5F0E8] shadow-xs ${currentSize} ${className}`}>
      <svg 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-5/6 h-5/6"
      >
        {/* N Leg Left */}
        <path 
          d="M7 24V8L16 19V8" 
          stroke="#F5F0E8" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* F Fold in Burnt Orange */}
        <path 
          d="M16 8H25M16 14H22" 
          stroke="#C65D35" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );
}
