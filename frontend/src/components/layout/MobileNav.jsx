import React, { useEffect } from 'react';
import { X, ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { siteContent } from '../../content/siteContent';

export default function MobileNav({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navLinks = [
    { name: 'Introduction', href: '#intro' },
    { name: 'Selected Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'My Process', href: '#process' },
    { name: 'About & Capabilities', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#20201E]/98 backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center justify-between p-5 border-b border-[rgba(245,240,232,0.08)]">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-base text-[#F5F0E8]">
            Anubhav Sharma
          </span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#C65D35]/20 text-[#C65D35] border border-[#C65D35]/30">
            Frontend
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] text-[#F5F0E8]"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={onClose}
              className="text-xl font-display font-semibold text-[#F5F0E8] hover:text-[#C65D35] transition-colors py-2.5 flex items-center justify-between border-b border-[rgba(245,240,232,0.06)]"
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
            className="w-full py-3.5 rounded-lg bg-[#C65D35] text-[#F5F0E8] font-semibold text-center text-sm shadow-md flex items-center justify-center gap-2"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-6 pt-2 text-[#A8A69E]">
            <a href={siteContent.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon className="w-5 h-5 hover:text-[#F5F0E8]" />
            </a>
            <a href={siteContent.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedinIcon className="w-5 h-5 hover:text-[#F5F0E8]" />
            </a>
            <a href={`mailto:${siteContent.socials.email}`} aria-label="Email">
              <Mail className="w-5 h-5 hover:text-[#F5F0E8]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
