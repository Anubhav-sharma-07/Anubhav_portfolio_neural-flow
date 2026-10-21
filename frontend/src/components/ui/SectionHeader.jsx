import React from 'react';

export default function SectionHeader({
  number,
  tag,
  title,
  subtitle,
  align = 'left',
  className = ''
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {(number || tag) && (
        <div className={`inline-flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-wider text-[#3B6EF5] font-semibold ${isCenter ? 'justify-center' : ''}`}>
          {number && <span className="text-[var(--text-muted)]">[{number}]</span>}
          {number && tag && <span className="text-[var(--border-prominent)]">/</span>}
          {tag && <span>{tag}</span>}
        </div>
      )}

      {title && (
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[var(--text-primary)] leading-[1.15] tracking-tight mb-4">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
