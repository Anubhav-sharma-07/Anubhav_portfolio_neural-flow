import React from 'react';
import { ArrowUp, Mail, MessageCircle, MapPin, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/Icons';
import { siteContent } from '../../content/siteContent';

export default function Footer({ onSwitchToCockpit }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(245,240,232,0.08)] bg-[#20201E] text-[#F5F0E8] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[rgba(245,240,232,0.08)]">
          {/* Brand & Identity */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#C65D35] flex items-center justify-center text-white shadow-xs">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 18L10 6L14 18L20 6" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-[#F5F0E8]">
                Neural Flow
              </span>
            </div>
            <p className="text-[#A8A69E] text-xs sm:text-sm max-w-md leading-relaxed mb-6 font-normal">
              {siteContent.brand.subtext}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={siteContent.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#272725] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#A8A69E] transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteContent.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#272725] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#A8A69E] transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteContent.socials.email}`}
                className="w-9 h-9 rounded-lg bg-[#272725] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#A8A69E] transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={siteContent.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#272725] border border-[rgba(245,240,232,0.1)] hover:border-emerald-400 hover:text-emerald-400 flex items-center justify-center text-[#A8A69E] transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={siteContent.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#272725] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#A8A69E] transition-all"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F5F0E8] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a href="#hero" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  Featured Work
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#process" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  Process
                </a>
              </li>
              <li>
                <a href="#estimator" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  Project Estimator
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Details */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F5F0E8] mb-4">
              Contact & Location
            </h3>
            <ul className="space-y-3 text-xs font-mono text-[#A8A69E]">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C65D35] shrink-0" />
                <a href={`mailto:${siteContent.socials.email}`} className="hover:text-[#F5F0E8] transition-colors">
                  {siteContent.socials.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={siteContent.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F0E8] transition-colors">
                  {siteContent.socials.whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C65D35] shrink-0" />
                <span>{siteContent.brand.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Cockpit Link & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#72706A]">
          <div className="flex items-center gap-3">
            <span>© {currentYear} Neural Flow · Anubhav Sharma</span>
            <span>•</span>
            <span>All rights reserved</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Secret Cockpit Mode toggle */}
            {onSwitchToCockpit && (
              <button
                type="button"
                onClick={onSwitchToCockpit}
                className="hover:text-[#A8A69E] transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100"
                title="Open Automation Cockpit"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Cockpit</span>
              </button>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-[#C65D35] transition-colors flex items-center gap-1 text-xs"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
