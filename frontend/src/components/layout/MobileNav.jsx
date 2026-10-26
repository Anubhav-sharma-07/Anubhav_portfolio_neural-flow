import React, { useEffect } from 'react';
import { X, ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { siteContent } from '../../content/siteContent';

export default function MobileNav({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Work', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#20201E]/98 backdrop-blur-xl transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-between p-5 border-b border-[rgba(245,240,232,0.08)]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#C65D35] flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18L10 6L14 18L20 6" />
            </svg>
          </div>
          <span className="font-display font-bold text-base text-[#F5F0E8]">
            Neural Flow
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] text-[#F5F0E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C65D35]"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
        <nav className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={onClose}
              className="text-lg font-display font-semibold text-[#F5F0E8] hover:text-[#C65D35] transition-colors py-2.5 flex items-center justify-between border-b border-[rgba(245,240,232,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C65D35] rounded-md px-1"
            >
              <span>{link.name}</span>
              <ArrowUpRight className="w-4 h-4 text-[#A8A69E]" />
            </a>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-[rgba(245,240,232,0.08)] flex flex-col gap-4">
          <a
            href="#contact"
            onClick={onClose}
            className="w-full py-3.5 rounded-lg bg-[#C65D35] text-[#F5F0E8] font-semibold text-center text-sm shadow-md flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-6 pt-2 text-[#A8A69E]">
            <a 
              href={siteContent.socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className="p-2 hover:text-[#F5F0E8] transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a 
              href={siteContent.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="p-2 hover:text-[#F5F0E8] transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a 
              href={`mailto:${siteContent.socials.email}`} 
              aria-label="Email"
              className="p-2 hover:text-[#F5F0E8] transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
