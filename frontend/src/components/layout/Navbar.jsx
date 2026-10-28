import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import BrandMark from '../ui/BrandMark';

export default function Navbar({ onOpenMobileMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'projects', 'services', 'process', 'estimator', 'pricing', 'about', 'contact'];
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
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Work', href: '#projects', id: 'projects' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Pricing', href: '#estimator', id: 'estimator' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-[#F5F0E8]/90 backdrop-blur-md border-b border-[rgba(32,32,30,0.08)] shadow-xs' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <a 
          href="#hero" 
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C65D35] rounded-lg p-1"
          aria-label="Neural Flow Homepage"
        >
          {/* Authentic Neural Flow Emblem */}
          <BrandMark size="md" className="group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-display text-base font-bold tracking-tight text-[#20201E] flex items-center gap-1.5 leading-none">
              Neural Flow
            </span>
            <span className="font-mono text-[9px] text-[#575550] tracking-wider uppercase">
              Anubhav Sharma
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#EBE5DB]/75 backdrop-blur-md border border-[rgba(32,32,30,0.08)] px-2 py-1 rounded-full shadow-xs">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C65D35] ${
                  isActive
                    ? 'bg-[#20201E] text-[#F5F0E8] shadow-xs'
                    : 'text-[#575550] hover:text-[#20201E] hover:bg-[#DDD6C9]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5">
          {/* Primary CTA Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#C65D35] text-[#F5F0E8] hover:bg-[#B24F29] transition-all shadow-xs active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20201E]"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-white/80 border border-[#20201E]/10 text-[#20201E] hover:border-[#C65D35] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C65D35]"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
