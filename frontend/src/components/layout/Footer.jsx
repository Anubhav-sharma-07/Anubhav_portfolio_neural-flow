import { ArrowUp, Mail, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../ui/Icons';
import { siteContent } from '../../content/siteContent';

export default function Footer({ onSwitchToCockpit }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[rgba(245,240,232,0.08)] bg-[#20201E] text-[#F5F0E8] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[rgba(245,240,232,0.08)]">
          {/* Brand & Identity */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display font-bold text-xl text-[#F5F0E8]">
                Neural Flow
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#2A2A28] text-[#C65D35] border border-[rgba(245,240,232,0.1)]">
                Studio
              </span>
            </div>
            <p className="text-[#A8A69E] text-sm max-w-md leading-relaxed mb-6 font-normal">
              {siteContent.brand.supportingCopy}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteContent.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#A8A69E] transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteContent.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#A8A69E] transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteContent.socials.email}`}
                className="w-10 h-10 rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#A8A69E] transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={siteContent.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] hover:text-[#C65D35] flex items-center justify-center text-[#A8A69E] transition-all"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A8A69E] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#intro" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  Introduction
                </a>
              </li>
              <li>
                <a href="#projects" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#process" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  My Process
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  About & Capabilities
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#A8A69E] hover:text-[#C65D35] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Business Outcomes & Specs */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A8A69E] mb-4">
              What you get
            </h3>
            <ul className="space-y-2 font-mono text-xs text-[#A8A69E]">
              <li className="flex items-center justify-between">
                <span>Architecture:</span>
                <span className="text-[#F5F0E8]">React 19 · Vite</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Performance:</span>
                <span className="text-[#F5F0E8]">Fast on Phones</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Code Ownership:</span>
                <span className="text-[#E07A52] font-semibold">100% Handover</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Location:</span>
                <span className="text-[#F5F0E8]">New Delhi, India</span>
              </li>
              {onSwitchToCockpit && (
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={onSwitchToCockpit}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A8A69E] hover:text-[#E07A52] transition-colors"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Launch Automation Cockpit</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A8A69E]">
          <p>
            © {new Date().getFullYear()} Anubhav Sharma. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span>A digital object, brought to life.</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-[#F5F0E8] transition-colors p-1"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
