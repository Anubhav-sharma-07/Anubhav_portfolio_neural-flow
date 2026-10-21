import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, Volume2, VolumeX } from 'lucide-react';
import { siteContent } from '../../content/siteContent';

export default function Navbar({ onOpenMobileMenu, soundEnabled, toggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'intro', 'projects', 'services', 'process', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Introduction', href: '#intro', id: 'intro' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'About', href: '#about', id: 'about' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3.5 bg-[#20201E]/92 backdrop-blur-md border-b border-[rgba(245,240,232,0.08)] shadow-lg' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <a 
          href="#" 
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C65D35] rounded-lg p-1"
          aria-label="Neural Flow Homepage"
        >
          <div className="w-8 h-8 rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.12)] group-hover:border-[#C65D35] flex items-center justify-center transition-colors">
            <span className="font-mono text-xs font-bold text-[#F5F0E8] group-hover:text-[#C65D35]">
              NF
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-tight text-[#F5F0E8] flex items-center gap-1.5">
              Neural Flow
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C65D35] animate-pulse"></span>
            </span>
            <span className="font-mono text-[10px] text-[#A8A69E] tracking-wider uppercase">
              Anubhav Sharma · Creative Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#272725]/80 backdrop-blur-md border border-[rgba(245,240,232,0.08)] px-3 py-1.5 rounded-full">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-[#C65D35] text-[#F5F0E8] shadow-xs'
                    : 'text-[#A8A69E] hover:text-[#F5F0E8] hover:bg-[#343431]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5">
          {/* Blualpha Haptic Audio Feedback Toggle with Live Equalizer */}
          {toggleSound && (
            <button
              type="button"
              onClick={toggleSound}
              className={`h-9 px-2.5 rounded-lg flex items-center gap-1.5 border transition-all active:scale-95 cursor-pointer ${
                soundEnabled
                  ? 'bg-[#C65D35]/20 border-[#C65D35] text-[#C65D35] shadow-[0_0_12px_rgba(198,93,53,0.25)]'
                  : 'bg-[#2A2A28] border-[rgba(245,240,232,0.1)] text-[#72706A] hover:text-[#F5F0E8]'
              }`}
              title={soundEnabled ? 'Haptic Sound: Enabled' : 'Haptic Sound: Muted'}
              aria-label="Toggle haptic audio feedback"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 shrink-0" />
                  <div className="flex items-end gap-0.5 h-3.5 px-0.5">
                    <span className="w-0.5 bg-[#C65D35] rounded-full animate-eq-1" />
                    <span className="w-0.5 bg-[#C65D35] rounded-full animate-eq-2" />
                    <span className="w-0.5 bg-[#C65D35] rounded-full animate-eq-3" />
                  </div>
                </>
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          )}

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#C65D35] text-[#F5F0E8] hover:bg-[#B24F29] transition-all shadow-sm active:scale-95"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-[#2A2A28] border border-[rgba(245,240,232,0.12)] text-[#F5F0E8]"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
