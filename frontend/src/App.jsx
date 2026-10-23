import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDown, 
  Mail,
  BookOpen
} from 'lucide-react';
import { siteContent } from './data/siteContent';
import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';
import CustomCursor from './components/motion/CustomCursor';
import ScrollProgress from './components/motion/ScrollProgress';
import LuminousBackdrop from './components/motion/LuminousBackdrop';
import BackToTop from './components/motion/BackToTop';
import HeroStudioConsole from './components/ui/HeroStudioConsole';
import ZeynaShowcaseCarousel from './components/ui/ZeynaShowcaseCarousel';
import MomentumCalculator from './components/ui/MomentumCalculator';
import TiltCard from './components/motion/TiltCard';
import AmbientParticles from './components/motion/AmbientParticles';
import Reveal from './components/motion/Reveal';
import WordRotator from './components/motion/WordRotator';
import TrustStrip from './components/ui/TrustStrip';
import ServicesBento from './components/ui/ServicesBento';
import ProcessSection from './components/ui/ProcessSection';
import WhyWorkWithMe from './components/ui/WhyWorkWithMe';
import PricingSection from './components/ui/PricingSection';
import TestimonialsSection from './components/ui/TestimonialsSection';
import ContactForm from './components/ui/ContactForm';
import { GithubIcon, LinkedinIcon } from './components/ui/Icons';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import CockpitApp from './CockpitApp';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCockpit, setShowCockpit] = useState(false);
  const [inquiryScope, setInquiryScope] = useState('');
  
  const { soundEnabled, toggleSound, playClick } = useAudioFeedback();

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
    <div className="min-h-screen flex flex-col bg-[#20201E] text-[#F5F0E8] selection:bg-[#C65D35] selection:text-[#F5F0E8] relative font-sans overflow-x-hidden">
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
        {/* SECTION 01 — HERO                                                         */}
        {/* ========================================================================= */}
        <section 
          id="hero"
          className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-12 overflow-hidden bg-[#20201E]"
        >
          {/* Dynamic Luminous Floating Light Orbs */}
          <LuminousBackdrop variant="charcoal" />

          {/* Ambient Particles in Charcoal Background */}
          <AmbientParticles count={35} />

          {/* Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,93,53,0.12)_0%,rgba(32,32,30,0)_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Headlines & Product CTA */}
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                
                {/* 1. Developer Designation & Status Badge (Staggered Entrance) */}
                <div className="animate-hero-badge">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] text-[#E07A52] font-mono text-xs font-semibold mb-6 shadow-sm hover:border-[#C65D35]/50 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[#C65D35] animate-pulse" />
                    <span>{siteContent.brand.role}</span>
                  </div>
                </div>

                {/* 2. Primary Headline with WordRotator (Static fallback in HTML for SEO) */}
                <div className="animate-hero-headline">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-[#F5F0E8] leading-[1.06] tracking-tight mb-6 min-h-[150px] sm:min-h-[140px] lg:min-h-0">
                    {siteContent.brand.headlinePrefix}
                    <WordRotator
                      words={siteContent.brand.rotatingWords}
                      interval={2000}
                      accentClassName="text-[#C65D35]"
                    />
                    {siteContent.brand.headlineSuffix}
                  </h1>
                </div>

                {/* 3. Subtext */}
                <div className="animate-hero-subtext">
                  <p className="text-base sm:text-lg text-[#A8A69E] leading-relaxed max-w-xl mb-10 font-normal min-h-[72px] sm:min-h-0">
                    {siteContent.brand.subtext}
                  </p>
                </div>

                {/* 4. Dual Conversion CTAs ("Hire me" and "View my work") */}
                <div className="animate-hero-cta">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                    <a
                      href={siteContent.brand.primaryCTA.href}
                      onClick={playClick}
                      className="btn-burnt-orange text-sm font-semibold px-7 py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>{siteContent.brand.primaryCTA.label}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <a
                      href={siteContent.brand.secondaryCTA.href}
                      onClick={playClick}
                      className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.12)] text-[#F5F0E8] hover:border-[#C65D35] hover:text-[#C65D35] transition-all hover:-translate-y-0.5"
                    >
                      <span>{siteContent.brand.secondaryCTA.label}</span>
                      <ArrowDown className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Honest Capability Ticker */}
                <div className="pt-6 border-t border-[rgba(245,240,232,0.08)] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-[#A8A69E]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>100% Code Handover</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#72706A]">•</span>
                    <span>Direct Developer Comm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#72706A]">•</span>
                    <span>Zero Bloated Templates</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Studio Capability Blueprint Console (Fast, no heavy images above fold) */}
              <div className="lg:col-span-6 flex items-center justify-center animate-hero-console">
                <HeroStudioConsole onPlayClick={playClick} />
              </div>
            </div>
          </div>

          {/* Restrained Scroll Down Indicator */}
          <div className="mx-auto mt-auto pt-4 flex flex-col items-center gap-2 pointer-events-none opacity-60 animate-float-gentle">
            <span className="font-mono text-[10px] tracking-widest text-[#72706A] uppercase">Scroll to explore</span>
            <div className="w-4 h-7 rounded-full border border-[rgba(245,240,232,0.2)] flex items-start justify-center p-1">
              <div className="w-1 h-1.5 rounded-full bg-[#C65D35] animate-bounce" />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TRUST STRIP (COUNT-UP STATS - BELOW HERO)                                 */}
        {/* ========================================================================= */}
        <TrustStrip stats={siteContent.trustStats} />

        {/* ========================================================================= */}
        {/* SECTION 02 — INTRODUCTION (WARM IVORY #F5F0E8)                             */}
        {/* ========================================================================= */}
        <section 
          id="intro"
          className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
        >
          <LuminousBackdrop variant="ivory" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Portrait with 3D TiltCard */}
              <div className="lg:col-span-5 flex justify-center">
                <Reveal direction="right" delay={100}>
                  <div className="relative w-full max-w-sm">
                    <TiltCard maxTilt={8} scale={1.02} className="rounded-2xl shadow-2xl">
                      <div className="rounded-2xl overflow-hidden border-2 border-[#20201E]/10 bg-white p-3">
                        <img
                          src={siteContent.brand.avatar}
                          alt="Anubhav Sharma - Frontend Developer"
                          className="w-full aspect-square object-cover rounded-xl"
                          loading="lazy"
                          width={400}
                          height={400}
                        />
                        
                        <div className="pt-3 px-1 flex items-center justify-between font-mono text-[11px] text-[#575550]">
                          <span className="font-bold text-[#20201E]">ANUBHAV SHARMA</span>
                          <span className="text-[#C65D35]">DELHI, INDIA</span>
                        </div>
                      </div>
                    </TiltCard>
                    <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-[#C65D35] pointer-events-none rounded-br-lg opacity-50" />
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Editorial Introduction Story */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <Reveal direction="left" delay={80}>
                  <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-4">
                    // ABOUT
                  </span>
                </Reveal>

                <Reveal direction="left" delay={140}>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#20201E] leading-tight tracking-tight mb-6">
                    Engineering digital experiences with intention.
                  </h2>
                </Reveal>

                <Reveal direction="left" delay={200}>
                  <p className="text-lg text-[#575550] leading-relaxed mb-6 font-medium">
                    Frontend developer and founder of Neural Flow, building production-grade web applications, responsive platforms, and practical AI solutions.
                  </p>
                </Reveal>

                <Reveal direction="left" delay={260}>
                  <div className="space-y-4 text-base text-[#575550] leading-relaxed mb-10">
                    <p>
                      I partner with founders, clinics, local hospitality brands, and ambitious teams to translate requirements into thoughtful, high-performance web products.
                    </p>
                    <p>
                      Rather than assembling bloated templates or over-decorating with unnecessary effects, I focus on tactile design, fast load times on phones, accessible semantic structure, and direct communication.
                    </p>
                  </div>
                </Reveal>

                {/* Stat Pillars */}
                <Reveal direction="up" delay={320} className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#20201E]/10 w-full">
                    <div className="p-3.5 rounded-xl bg-white/70 border border-[#20201E]/10 shadow-xs">
                      <span className="font-mono text-[10px] uppercase text-[#87847C] tracking-wider block mb-1">
                        Core Stack
                      </span>
                      <span className="font-display font-bold text-sm text-[#20201E] block">
                        React 19 · TypeScript · Vite
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/70 border border-[#20201E]/10 shadow-xs">
                      <span className="font-mono text-[10px] uppercase text-[#87847C] tracking-wider block mb-1">
                        Turnaround
                      </span>
                      <span className="font-display font-bold text-sm text-[#20201E] block">
                        1 – 3 Weeks Focused Sprints
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/70 border border-[#20201E]/10 shadow-xs">
                      <span className="font-mono text-[10px] uppercase text-[#87847C] tracking-wider block mb-1">
                        Direct Delivery
                      </span>
                      <span className="font-display font-bold text-sm text-[#20201E] block">
                        100% Code Ownership
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 03 — SERVICES (BENTO GRID)                                        */}
        {/* ========================================================================= */}
        <ServicesBento services={siteContent.services} />

        {/* ========================================================================= */}
        {/* SECTION 04 — SELECTED WORK & CASE STUDIES                                 */}
        {/* ========================================================================= */}
        <section 
          id="projects"
          className="py-24 sm:py-32 bg-[#20201E] text-[#F5F0E8] border-t border-[rgba(245,240,232,0.08)] relative overflow-hidden"
        >
          <LuminousBackdrop variant="charcoal" />
          <AmbientParticles count={25} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal direction="up">
              <div className="max-w-3xl mb-12">
                <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
                  // SELECTED WORK & CASE STUDIES
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F0E8] tracking-tight mb-4">
                  Verified work. Built and shipped.
                </h2>
                <p className="text-base text-[#A8A69E]">
                  Explore actual production software, client concepts, and full-stack web applications with live deployments.
                </p>
              </div>
            </Reveal>

            {/* Showcase Carousel (includes SpendLens Cursor Tour & Sample Data Chips) */}
            <Reveal direction="scale" delay={150}>
              <ZeynaShowcaseCarousel projects={siteContent.projects} />
            </Reveal>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 05 — PROCESS (SVG DRAW PATH) & MOMENTUM ESTIMATOR                  */}
        {/* ========================================================================= */}
        <ProcessSection steps={siteContent.processSteps} />

        {/* Launch Momentum Estimator Sub-section */}
        <div className="bg-[#20201E] pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Reveal direction="scale" delay={150}>
            <MomentumCalculator 
              onSelectScope={(scopeSummary) => {
                setInquiryScope(scopeSummary);
                playClick();
              }} 
            />
          </Reveal>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 06 — WHY WORK WITH ME (US VS THEM COMPARISON)                      */}
        {/* ========================================================================= */}
        <WhyWorkWithMe data={siteContent.whyWorkWithMe} />

        {/* ========================================================================= */}
        {/* SECTION 07 — ENGAGEMENT / PRICING (OPTIONAL)                               */}
        {/* ========================================================================= */}
        <PricingSection pricing={siteContent.pricing} />

        {/* ========================================================================= */}
        {/* SECTION 08 — TESTIMONIALS (REVIEW SHUFFLE - CLEANLY HIDES IF EMPTY)        */}
        {/* ========================================================================= */}
        <TestimonialsSection testimonials={siteContent.testimonials} />

        {/* ========================================================================= */}
        {/* SECTION 09 — ABOUT & RESEARCH                                             */}
        {/* ========================================================================= */}
        <section 
          id="about"
          className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
        >
          <LuminousBackdrop variant="ivory" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: Background & IEEE Research */}
              <div className="lg:col-span-7">
                <Reveal direction="right" delay={80}>
                  <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
                    // ABOUT & RESEARCH
                  </span>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#20201E] leading-tight tracking-tight mb-6">
                    {siteContent.about.headline}
                  </h2>
                </Reveal>

                <Reveal direction="right" delay={160}>
                  <div className="space-y-4 text-base text-[#575550] leading-relaxed mb-8">
                    {siteContent.about.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </Reveal>

                {/* Academic & Research Spotlight Box */}
                <Reveal direction="up" delay={240}>
                  <div className="rounded-2xl p-6 sm:p-8 bg-white border border-[#20201E]/10 shadow-sm mb-8">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#C65D35] font-semibold mb-2">
                      <BookOpen className="w-4 h-4" />
                      <span>IEEE CONFERENCE RESEARCH (UNDER REVIEW)</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#20201E] mb-2">
                      Hybrid XAI Framework for Android Malware Detection
                    </h3>
                    <p className="text-xs text-[#575550] leading-relaxed font-sans mb-4">
                      Co-authored research pairing high-accuracy Random Forest classification with game-theoretic Shapley contributions (SHAP) and local surrogate algorithms (LIME) to generate interpretable threat explanations.
                    </p>
                    <div className="flex flex-wrap gap-2 font-mono text-[10px] text-[#87847C]">
                      <span className="px-2.5 py-1 rounded bg-[#ECE6DC]">Explainable AI</span>
                      <span className="px-2.5 py-1 rounded bg-[#ECE6DC]">SHAP</span>
                      <span className="px-2.5 py-1 rounded bg-[#ECE6DC]">LIME</span>
                      <span className="px-2.5 py-1 rounded bg-[#ECE6DC]">BVCOE New Delhi</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Verified Technical Capabilities */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <Reveal direction="left" delay={150}>
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#575550] mb-6">
                      // SKILLS & TOOLS
                    </h3>

                    <div className="space-y-4">
                      <div className="p-5 rounded-xl bg-white border border-[#20201E]/10 shadow-xs">
                        <span className="font-mono text-xs text-[#C65D35] font-bold block mb-3 uppercase">
                          Frontend Frameworks & Core
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {siteContent.about.skills.frontend.map((s, idx) => (
                            <span key={idx} className="font-mono text-xs px-2.5 py-1 rounded bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 rounded-xl bg-white border border-[#20201E]/10 shadow-xs">
                        <span className="font-mono text-xs text-[#C65D35] font-bold block mb-3 uppercase">
                          Practical AI & APIs
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {siteContent.about.skills.aiAndApis.map((s, idx) => (
                            <span key={idx} className="font-mono text-xs px-2.5 py-1 rounded bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 rounded-xl bg-white border border-[#20201E]/10 shadow-xs">
                        <span className="font-mono text-xs text-[#C65D35] font-bold block mb-3 uppercase">
                          Tools & Delivery
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {siteContent.about.skills.toolsAndDelivery.map((s, idx) => (
                            <span key={idx} className="font-mono text-xs px-2.5 py-1 rounded bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-[#20201E]/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-[#87847C]">Education:</span>
                    <span className="font-bold text-[#20201E]">BVCOE Delhi (B.Tech CSE)</span>
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 10 — CONTACT (REAL FORM BACKEND & VERIFICATION CHANNELS)           */}
        {/* ========================================================================= */}
        <section 
          id="contact"
          className="py-24 sm:py-32 bg-[#FCFAF6] text-[#20201E] border-t border-[#20201E]/10 relative overflow-hidden"
        >
          <LuminousBackdrop variant="ivory" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="scale" delay={100}>
              <div className="hairline-ivory rounded-3xl p-8 sm:p-14 bg-white border border-[#20201E]/10 shadow-2xl">
                
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
                    // START A PROJECT
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-4">
                    {siteContent.contact.headline}
                  </h2>
                  <p className="text-base text-[#575550]">
                    {siteContent.contact.subheadline}
                  </p>
                </div>

                {/* Direct Verification Channels */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  <a
                    href={`mailto:${siteContent.socials.email}`}
                    onClick={playClick}
                    className="p-4 rounded-xl bg-[#F5F0E8] border border-[#20201E]/10 hover:border-[#C65D35] hover:-translate-y-1 transition-all flex items-center gap-3 shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#C65D35]/10 flex items-center justify-center text-[#C65D35]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="text-left overflow-hidden">
                      <span className="font-mono text-[10px] text-[#575550] block uppercase">Direct Email</span>
                      <span className="text-xs font-semibold text-[#20201E] truncate block">{siteContent.socials.email}</span>
                    </div>
                  </a>

                  <a
                    href={siteContent.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="p-4 rounded-xl bg-[#F5F0E8] border border-[#20201E]/10 hover:border-[#C65D35] hover:-translate-y-1 transition-all flex items-center gap-3 shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#C65D35]/10 flex items-center justify-center text-[#C65D35]">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-mono text-[10px] text-[#575550] block uppercase">LinkedIn</span>
                      <span className="text-xs font-semibold text-[#20201E]">Anubhav Sharma</span>
                    </div>
                  </a>

                  <a
                    href={siteContent.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="p-4 rounded-xl bg-[#F5F0E8] border border-[#20201E]/10 hover:border-[#C65D35] hover:-translate-y-1 transition-all flex items-center gap-3 shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#C65D35]/10 flex items-center justify-center text-[#C65D35]">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-mono text-[10px] text-[#87847C] block uppercase">GitHub</span>
                      <span className="text-xs font-semibold text-[#20201E]">@Anubhav-sharma-07</span>
                    </div>
                  </a>
                </div>

                {/* Real Verified Contact Form */}
                <ContactForm
                  contactEmail={siteContent.socials.email}
                  inquiryScope={inquiryScope}
                  onResetScope={() => setInquiryScope('')}
                  onPlayClick={playClick}
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onSwitchToCockpit={() => setShowCockpit(true)} />

      {/* Floating Back to Top Action */}
      <BackToTop onPlayClick={playClick} />
    </div>
  );
}
