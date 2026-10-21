import React from 'react';

// 01: Web Development — Responsive business websites and landing pages
export function WebDevDiagram({ className = "w-12 h-12 text-[#C65D35]" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="6" y="8" width="36" height="30" rx="3" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
      <path d="M6 16H42" stroke="currentColor" strokeWidth="2" />
      <path d="M14 24L18 28L14 32" stroke="#20201E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 32H30" stroke="#C65D35" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="12" r="1.5" fill="currentColor" />
      <circle cx="14" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 02: Full-Stack Applications — Frontend experiences, backend integration, and APIs
export function FullStackDiagram({ className = "w-12 h-12 text-[#C65D35]" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Client Layer */}
      <rect x="6" y="8" width="36" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* API Middleware Layer */}
      <rect x="10" y="20" width="28" height="8" rx="2" stroke="#20201E" strokeWidth="2" />
      {/* Database Storage Layer */}
      <rect x="14" y="32" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* Connecting Flow Lines */}
      <path d="M24 16V20M24 28V32" stroke="#C65D35" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="18" r="1.5" fill="#C65D35" />
      <circle cx="24" cy="30" r="1.5" fill="#C65D35" />
    </svg>
  );
}

// 03: AI Solutions — Practical AI features and AI-powered application development
export function AiSolutionsDiagram({ className = "w-12 h-12 text-[#C65D35]" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Central Neural Node */}
      <circle cx="24" cy="24" r="5" stroke="#C65D35" strokeWidth="2" fill="#C65D35" fillOpacity="0.15" />
      {/* Radiating Satellite Intelligence Nodes */}
      <circle cx="12" cy="14" r="3" stroke="#20201E" strokeWidth="2" />
      <circle cx="36" cy="14" r="3" stroke="#20201E" strokeWidth="2" />
      <circle cx="12" cy="34" r="3" stroke="#20201E" strokeWidth="2" />
      <circle cx="36" cy="34" r="3" stroke="#20201E" strokeWidth="2" />
      {/* Connecting Synaptic Beams */}
      <path d="M14 16L20 21M34 16L28 21M14 32L20 27M34 32L28 27" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="24" cy="24" r="1.5" fill="#C65D35" />
    </svg>
  );
}

// 04: Automation Systems — Workflows, integrations, and agent-assisted processes
export function AutomationDiagram({ className = "w-12 h-12 text-[#C65D35]" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Input Stage */}
      <rect x="6" y="19" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      {/* Decision Router */}
      <path d="M24 18L30 24L24 30L18 24Z" stroke="#C65D35" strokeWidth="2" fill="#C65D35" fillOpacity="0.15" />
      {/* Parallel Executions */}
      <rect x="34" y="11" width="8" height="8" rx="1.5" stroke="#20201E" strokeWidth="2" />
      <rect x="34" y="29" width="8" height="8" rx="1.5" stroke="#20201E" strokeWidth="2" />
      {/* Routing Paths */}
      <path d="M16 24H18M30 24H32M32 24V15H34M32 24V33H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
