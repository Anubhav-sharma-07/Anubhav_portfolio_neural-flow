import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  pulse = false,
  className = ''
}) {
  const variantStyles = {
    default: "bg-[var(--badge-bg)] border-[var(--badge-border)] text-[var(--accent-interactive)]",
    marigold: "bg-[rgba(242,177,52,0.12)] border-[rgba(242,177,52,0.3)] text-[#F2B134]",
    neutral: "bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]",
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
  };

  const dotColors = {
    default: "bg-[#3B6EF5]",
    marigold: "bg-[#F2B134]",
    neutral: "bg-slate-400",
    success: "bg-emerald-400"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border tracking-wide select-none ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant] || dotColors.default}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant] || dotColors.default}`}></span>
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
