import React, { useState } from 'react';
import { 
  ArrowRight, 
  Globe, 
  Layers, 
  Cpu
} from 'lucide-react';
import { siteContent } from './data/siteContent';
import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';
import CustomCursor from './components/motion/CustomCursor';
import ScrollProgress from './components/motion/ScrollProgress';
import LuminousBackdrop from './components/motion/LuminousBackdrop';
import BackToTop from './components/motion/BackToTop';
import TrustStrip from './components/ui/TrustStrip';
import FeaturedWork from './components/ui/FeaturedWork';
import ServicesSection from './components/ui/ServicesSection';
import ProcessSection from './components/ui/ProcessSection';
import ProjectEstimator from './components/ui/ProjectEstimator';
import PricingSection from './components/ui/PricingSection';
import AboutSection from './components/ui/AboutSection';
import ContactSection from './components/ui/ContactSection';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import CockpitApp from './CockpitApp';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCockpit, setShowCockpit] = useState(false);
  const [inquiryScope, setInquiryScope] = useState('');
  
  const { soundEnabled, toggleSound, playClick } = useAudioFeedback();

  // Audience CTA actions
  const handleAudienceClick = (audienceType) => {
    playClick();
    if (audienceType === 'business') {
      const el = document.getElementById('estimator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setInquiryScope('Development Partner / Frontend & React Support');
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If user requests the internal automation cockpit
  if (showCockpit) {
    return (
      <div className="relative min-h-screen bg-[#0B1220] text-white">
        <div className="fixed top-4 right-4 z-50">
          <button 
            onClick={() => setShowCockpit(false)} 
            className="px-4 py-2 rounded-lg bg-[#2A2A28] border border-white/20 text-xs font-mono font-bold hover:bg-[#343431] transition-colors"
          >
            ← Return to Portfolio
          </button>
        </div>
        <CockpitApp />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#20201E] selection:bg-[#C65D35] selection:text-[#F5F0E8] relative font-sans overflow-x-hidden">
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] px-4 py-2 bg-[#C65D35] text-[#F5F0E8] font-mono text-xs font-bold rounded-lg shadow-xl"
      >
        Skip to main content
      </a>

      <CustomCursor />
      <ScrollProgress />
      
      {/* Navigation */}
      <Navbar 
        onOpenMobileMenu={() => setMobileMenuOpen(true)} 
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
      />
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main id="main-content" className="flex-1">
        {/* ========================================================================= */}
        {/* SECTION 01 — HERO (WARM IVORY #F5F0E8)                                     */}
        {/* ========================================================================= */}
        <section 
          id="hero"
          className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden bg-[#F5F0E8]"
        >
          {/* Subtle Warm Ivory Ambient Glow */}
          <LuminousBackdrop variant="ivory" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Headlines & Dual Audience Paths */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                
                {/* 1. Category Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBE5DB] border border-[#20201E]/10 text-[#C65D35] font-mono text-xs font-bold mb-6 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#C65D35] animate-pulse" />
                  <span>{siteContent.brand.eyebrow}</span>
                </div>

                {/* 2. Client-Focused Headline */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-[#20201E] leading-[1.08] tracking-tight mb-6">
                  Your business deserves more than a basic website.
                </h1>

                {/* 3. Supporting Copy */}
                <p className="text-base sm:text-lg text-[#575550] leading-relaxed max-w-2xl mb-8 font-normal">
                  {siteContent.brand.subtext}
                </p>

                {/* 4. Dual Audience Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
                  <button
                    type="button"
                    onClick={() => handleAudienceClick('business')}
                    className="btn-burnt-orange text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>{siteContent.brand.audiencePaths.business.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAudienceClick('partner')}
                    className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-lg bg-white border border-[#20201E]/15 text-[#20201E] hover:border-[#C65D35] hover:text-[#C65D35] transition-all hover:-translate-y-0.5 cursor-pointer shadow-2xs active:scale-95"
                  >
                    <span>{siteContent.brand.audiencePaths.partner.ctaLabel}</span>
                  </button>
                </div>

                {/* 5. Capability Badge Pills */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#20201E]/10 w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#20201E]/10 text-xs font-mono text-[#20201E] shadow-2xs">
                    <Globe className="w-3.5 h-3.5 text-[#C65D35]" />
                    <span>Business Websites</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#20201E]/10 text-xs font-mono text-[#20201E] shadow-2xs">
                    <Layers className="w-3.5 h-3.5 text-[#C65D35]" />
                    <span>Web Applications</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#20201E]/10 text-xs font-mono text-[#20201E] shadow-2xs">
                    <Cpu className="w-3.5 h-3.5 text-[#C65D35]" />
                    <span>AI & Automation</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Laptop + Mobile Device Mockup */}
              <div className="lg:col-span-5 flex items-center justify-center relative">
                <div className="relative w-full max-w-lg lg:max-w-none group">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#20201E]/10 bg-[#20201E]/5 transition-transform duration-500 hover:scale-[1.01]">
                    <img
                      src={siteContent.brand.heroMockup}
                      alt="Modern responsive website demonstrated across laptop and mobile devices"
                      className="w-full h-auto object-cover"
                      width={800}
                      height={600}
                      loading="eager"
                      fetchpriority="high"
                    />
                  </div>

                  {/* Subtle Corner Accent */}
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-[#C65D35] pointer-events-none rounded-br-2xl opacity-60" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TRUST STRIP (VERIFIED BRANDS & STATS - WARM IVORY)                         */}
        {/* ========================================================================= */}
        <TrustStrip brands={siteContent.trustedBrands} stats={siteContent.trustStats} />

        {/* ========================================================================= */}
        {/* SECTION 02 — FEATURED WORK / CASE STUDIES (CHARCOAL #20201E)               */}
        {/* ========================================================================= */}
        <FeaturedWork projects={siteContent.projects} />

        {/* ========================================================================= */}
        {/* SECTION 03 — SERVICES (WARM IVORY #F5F0E8)                                 */}
        {/* ========================================================================= */}
        <ServicesSection 
          services={siteContent.services} 
          onSelectService={(serviceTitle) => {
            setInquiryScope(`Service Interest: ${serviceTitle}`);
            playClick();
          }}
        />

        {/* ========================================================================= */}
        {/* SECTION 04 — HOW I WORK / PROCESS (CHARCOAL #20201E)                       */}
        {/* ========================================================================= */}
        <ProcessSection steps={siteContent.processSteps} note={siteContent.processNote} />

        {/* ========================================================================= */}
        {/* SECTION 05 — PROJECT ESTIMATOR (WARM IVORY #F5F0E8)                        */}
        {/* ========================================================================= */}
        <ProjectEstimator 
          onSelectScope={(scopeSummary) => {
            setInquiryScope(scopeSummary);
            playClick();
          }}
        />

        {/* ========================================================================= */}
        {/* SECTION 06 — ENGAGEMENT MODELS & PRICING (WARM IVORY #F5F0E8)               */}
        {/* ========================================================================= */}
        <PricingSection 
          engagementModels={siteContent.engagementModels} 
          onSelectPlan={(planTitle) => {
            setInquiryScope(`Engagement Model: ${planTitle}`);
            playClick();
          }}
        />

        {/* ========================================================================= */}
        {/* SECTION 07 — ABOUT ANUBHAV & NEURAL FLOW (WARM IVORY #F5F0E8)              */}
        {/* ========================================================================= */}
        <AboutSection about={siteContent.about} />

        {/* ========================================================================= */}
        {/* SECTION 08 — CONTACT & CONVERSION (CHARCOAL #20201E)                       */}
        {/* ========================================================================= */}
        <ContactSection
          contact={siteContent.contact}
          inquiryScope={inquiryScope}
          onResetScope={() => setInquiryScope('')}
          onPlayClick={playClick}
        />
      </main>

      {/* Footer (Charcoal #20201E) */}
      <Footer onSwitchToCockpit={() => setShowCockpit(true)} />

      {/* Floating Back to Top Action */}
      <BackToTop onPlayClick={playClick} />
    </div>
  );
}
