import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDown, 
  CheckCircle2, 
  ExternalLink,
  Mail,
  Terminal,
  Sparkles,
  BookOpen,
  Cpu,
  Layers,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { siteContent } from './content/siteContent';
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
import ScrollReveal from './components/motion/ScrollReveal';
import TiltCard from './components/motion/TiltCard';
import AmbientParticles from './components/motion/AmbientParticles';
import AnimatedCounter from './components/motion/AnimatedCounter';
import { 
  WebDevDiagram, 
  FullStackDiagram, 
  AiSolutionsDiagram, 
  AutomationDiagram 
} from './components/ui/ServiceIllustrations';
import { GithubIcon, LinkedinIcon } from './components/ui/Icons';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import CockpitApp from './CockpitApp';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCockpit, setShowCockpit] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    playClick();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const budget = formData.get('budget');
    const message = formData.get('message');

    // Build mailto fallback with structured query parameters
    const subject = encodeURIComponent(`Project Inquiry from ${name} [${service}]`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${service}\nBudget Range: ${budget}\n\nProject Scope & Goals:\n${message}\n\n[Configured Blueprint: ${inquiryScope || 'Direct Inquiry'}]`
    );

    window.location.href = `mailto:${siteContent.socials.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#20201E] text-[#F5F0E8] selection:bg-[#C65D35] selection:text-[#F5F0E8] relative font-sans overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      
      {/* Navigation with Blualpha Audio Toggle */}
      <Navbar 
        onOpenMobileMenu={() => setMobileMenuOpen(true)} 
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
      />
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* SECTION 01 — HERO (CHARCOAL #20201E)                                      */}
        {/* ========================================================================= */}
        <section 
          id="hero"
          className="relative min-h-[94vh] flex flex-col justify-center pt-28 pb-12 overflow-hidden bg-[#20201E]"
        >
          {/* Dynamic Luminous Floating Light Orbs */}
          <LuminousBackdrop variant="charcoal" />

          {/* Ambient Particles in Charcoal Background */}
          <AmbientParticles count={40} />

          {/* Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,93,53,0.12)_0%,rgba(32,32,30,0)_70%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Headlines & Product CTA */}
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                {/* Developer Designation & Status with Float animation */}
                <ScrollReveal direction="down" delay={100}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A2A28] border border-[rgba(245,240,232,0.1)] text-[#C65D35] font-mono text-xs font-semibold mb-6 shadow-sm hover:border-[#C65D35]/50 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[#C65D35] animate-pulse" />
                    <span>{siteContent.brand.role}</span>
                  </div>
                </ScrollReveal>

                {/* Primary Headline with cascading reveal and shimmer sweep */}
                <ScrollReveal direction="up" delay={200}>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-[#F5F0E8] leading-[1.05] tracking-tight mb-6">
                    Digital experiences, built to move <span className="animate-shimmer-sweep">businesses forward.</span>
                  </h1>
                </ScrollReveal>

                {/* Supporting Copy */}
                <ScrollReveal direction="up" delay={300}>
                  <p className="text-base sm:text-lg text-[#A8A69E] leading-relaxed max-w-xl mb-10 font-normal">
                    {siteContent.brand.supportingCopy}
                  </p>
                </ScrollReveal>

                {/* Dual Conversion CTAs */}
                <ScrollReveal direction="up" delay={400}>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                    <a
                      href="#projects"
                      onClick={playClick}
                      className="btn-burnt-orange text-sm font-semibold px-7 py-3.5 rounded-lg shadow-lg"
                    >
                      <span>{siteContent.brand.primaryCTA}</span>
                      <ArrowDown className="w-4 h-4" />
                    </a>
                    <a
                      href="#contact"
                      onClick={playClick}
                      className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-lg bg-[#2A2A28] border border-[rgba(245,240,232,0.12)] text-[#F5F0E8] hover:border-[#C65D35] hover:text-[#C65D35] transition-all hover:-translate-y-0.5"
                    >
                      <span>{siteContent.brand.secondaryCTA}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </ScrollReveal>

                {/* Blualpha-Inspired Live Capability Ticker */}
                <ScrollReveal direction="up" delay={500}>
                  <div className="pt-6 border-t border-[rgba(245,240,232,0.08)] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-[#A8A69E]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>100% Shipped Code</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#72706A]">•</span>
                      <span>Direct Developer Comm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#72706A]">•</span>
                      <span>Zero Agency Overhead</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Studio Capability Blueprint Console (No 3D Animation) */}
              <div className="lg:col-span-6 flex items-center justify-center">
                <ScrollReveal direction="scale" delay={250} duration={800} className="w-full">
                  <HeroStudioConsole onPlayClick={playClick} />
                </ScrollReveal>
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
        {/* SECTION 02 — INTRODUCTION (WARM IVORY #F5F0E8)                             */}
        {/* ========================================================================= */}
        <section 
          id="intro"
          className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
        >
          <LuminousBackdrop variant="ivory" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Authentic Uploaded Portrait with 3D TiltCard */}
              <div className="lg:col-span-5 flex justify-center">
                <ScrollReveal direction="right" delay={150}>
                  <div className="relative w-full max-w-sm">
                    {/* TiltCard gives interactive 3D depth and specular sheen */}
                    <TiltCard maxTilt={8} scale={1.02} className="rounded-2xl shadow-2xl">
                      <div className="rounded-2xl overflow-hidden border-2 border-[#20201E]/10 bg-white p-3">
                        <img
                          src={siteContent.brand.avatar}
                          alt="Anubhav Sharma - Frontend Developer"
                          className="w-full aspect-square object-cover rounded-xl"
                          loading="eager"
                        />
                        
                        {/* Caption Tag */}
                        <div className="pt-3 px-1 flex items-center justify-between font-mono text-[11px] text-[#575550]">
                          <span className="font-bold text-[#20201E]">ANUBHAV SHARMA</span>
                          <span className="text-[#C65D35]">DELHI, INDIA</span>
                        </div>
                      </div>
                    </TiltCard>

                    {/* Decorative Corner Accent */}
                    <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-[#C65D35] pointer-events-none rounded-br-lg opacity-50" />
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Editorial Introduction Story with ScrollReveal */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <ScrollReveal direction="left" delay={100}>
                  <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-4">
                    {siteContent.introduction.tag}
                  </span>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={200}>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#20201E] leading-tight tracking-tight mb-6">
                    {siteContent.introduction.title}
                  </h2>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={300}>
                  <p className="text-lg text-[#575550] leading-relaxed mb-6 font-medium">
                    {siteContent.introduction.subtitle}
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={400}>
                  <div className="space-y-4 text-base text-[#575550] leading-relaxed mb-10">
                    {siteContent.introduction.body.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Animated Stat Pillars */}
                <ScrollReveal direction="up" delay={500} className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#20201E]/10 w-full">
                    {siteContent.introduction.stats.map((st, idx) => (
                      <TiltCard key={idx} maxTilt={6} scale={1.03} className="rounded-xl">
                        <div className="p-3.5 rounded-xl bg-white/70 border border-[#20201E]/10 hover:border-[#C65D35]/50 transition-all shadow-xs">
                          <span className="font-mono text-[10px] uppercase text-[#87847C] tracking-wider block mb-1">
                            {st.label}
                          </span>
                          <span className="font-display font-bold text-sm text-[#20201E] block">
                            {st.value}
                          </span>
                        </div>
                      </TiltCard>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 03 — ZEYNA-STYLE 3D SHOWCASE CAROUSEL (CHARCOAL #20201E)          */}
        {/* ========================================================================= */}
        <section 
          id="projects"
          className="py-24 sm:py-32 bg-[#20201E] text-[#F5F0E8] border-t border-[rgba(245,240,232,0.08)] relative overflow-hidden"
        >
          <LuminousBackdrop variant="charcoal" />
          <AmbientParticles count={25} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal direction="up">
              <div className="max-w-3xl mb-12">
                <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
                  SECTION 03 // ZEYNA 3D SHOWCASE CAROUSEL
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F0E8] tracking-tight mb-4">
                  Verified work. Built and shipped.
                </h2>
                <p className="text-base text-[#A8A69E]">
                  Explore actual production software, client concepts, and full-stack web applications wrapped in an interactive 3D curved showcase dock.
                </p>
              </div>
            </ScrollReveal>

            {/* Zeyna-Style Cylindrical Showcase Carousel */}
            <ScrollReveal direction="scale" delay={200}>
              <ZeynaShowcaseCarousel projects={siteContent.projects} />
            </ScrollReveal>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 04 — SERVICES (WARM IVORY #F5F0E8)                                */}
        {/* ========================================================================= */}
        <section 
          id="services"
          className="py-24 sm:py-32 bg-[#F5F0E8] text-[#20201E] border-t border-[rgba(32,32,30,0.06)] relative overflow-hidden"
        >
          <LuminousBackdrop variant="ivory" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal direction="up">
              <div className="max-w-3xl mb-16">
                <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
                  SECTION 04 // CAPABILITIES & SERVICES
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#20201E] tracking-tight mb-4">
                  What I build for businesses.
                </h2>
                <p className="text-base text-[#575550]">
                  Honest, capable frontend services. No exaggerated marketing claims—only solid engineering, accessible semantics, and real business value.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {siteContent.services.map((srv, idx) => {
                const diagrams = [
                  <WebDevDiagram key={1} className="w-12 h-12 text-[#C65D35]" />,
                  <FullStackDiagram key={2} className="w-12 h-12 text-[#C65D35]" />,
                  <AiSolutionsDiagram key={3} className="w-12 h-12 text-[#C65D35]" />,
                  <AutomationDiagram key={4} className="w-12 h-12 text-[#C65D35]" />,
                ];

                return (
                  <ScrollReveal key={srv.id} direction="up" delay={idx * 120}>
                    <TiltCard maxTilt={5} scale={1.015} className="h-full rounded-2xl shadow-sm">
                      <div className="hairline-ivory rounded-2xl p-8 sm:p-10 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            {diagrams[idx]}
                            <span className="font-mono text-xs text-[#87847C] font-semibold">
                              [{srv.number}]
                            </span>
                          </div>

                          <h3 className="text-2xl font-display font-bold text-[#20201E] mb-2">
                            {srv.title}
                          </h3>

                          <p className="font-mono text-xs text-[#C65D35] mb-4">
                            // {srv.summary}
                          </p>

                          <p className="text-sm text-[#575550] leading-relaxed mb-6">
                            {srv.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#20201E]/10 flex items-start gap-2.5 text-xs font-mono text-[#20201E]">
                          <CheckCircle2 className="w-4 h-4 text-[#C65D35] shrink-0 mt-0.5" />
                          <span>{srv.deliverable}</span>
                        </div>
                      </div>
                    </TiltCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 05 — MY PROCESS & SUPERCONSCIOUS MOMENTUM ESTIMATOR (CHARCOAL)    */}
        {/* ========================================================================= */}
        <section 
          id="process"
          className="py-24 sm:py-32 bg-[#20201E] text-[#F5F0E8] border-t border-[rgba(245,240,232,0.08)] relative overflow-hidden"
        >
          <LuminousBackdrop variant="charcoal" />
          <AmbientParticles count={25} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal direction="up">
              <div className="max-w-3xl mb-16">
                <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
                  SECTION 05 // DELIVERY PIPELINE & VELOCITY
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F0E8] tracking-tight mb-4">
                  Predictable, 5-step delivery.
                </h2>
                <p className="text-base text-[#A8A69E]">
                  From initial alignment to production launch, every milestone has agreed deliverables and clear communication.
                </p>
              </div>
            </ScrollReveal>

            {/* Connected Animated Beam Line running behind steps */}
            <div className="relative mb-16">
              <div className="hidden lg:block absolute top-12 left-8 right-8 h-0.5 animate-beam-travel opacity-70 pointer-events-none" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
                {siteContent.process.map((step, idx) => (
                  <ScrollReveal key={step.step} direction="up" delay={idx * 80}>
                    <TiltCard maxTilt={5} scale={1.02} className="h-full rounded-2xl">
                      <div className="hairline-charcoal rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full group">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#C65D35] group-hover:scale-110 transition-transform">
                              {step.step}
                            </span>
                            <span className="font-mono text-[9px] text-[#72706A] uppercase tracking-widest">
                              STEP {idx + 1} OF 5
                            </span>
                          </div>

                          <h3 className="text-lg font-display font-bold text-[#F5F0E8] mb-1">
                            {step.name}
                          </h3>

                          <p className="font-mono text-[11px] text-[#C65D35] mb-3">
                            // {step.label}
                          </p>

                          <p className="text-xs text-[#A8A69E] leading-relaxed mb-4 font-normal">
                            {step.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[rgba(245,240,232,0.06)] flex items-center gap-1.5 text-xs font-mono text-[#C65D35]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C65D35]" />
                          <span>Agreed Milestone</span>
                        </div>
                      </div>
                    </TiltCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Superconscious-Inspired Interactive Launch Momentum Estimator */}
            <ScrollReveal direction="scale" delay={200}>
              <MomentumCalculator 
                onSelectScope={(scopeSummary) => {
                  setInquiryScope(scopeSummary);
                  playClick();
                }} 
              />
            </ScrollReveal>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 06 — ABOUT & CAPABILITIES (WARM IVORY #F5F0E8)                     */}
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
                <ScrollReveal direction="right" delay={100}>
                  <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
                    SECTION 06 // ABOUT & CAPABILITIES
                  </span>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#20201E] leading-tight tracking-tight mb-6">
                    {siteContent.about.headline}
                  </h2>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={200}>
                  <div className="space-y-4 text-base text-[#575550] leading-relaxed mb-8">
                    {siteContent.about.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Academic & Research Spotlight Box */}
                <ScrollReveal direction="up" delay={300}>
                  <TiltCard maxTilt={4} scale={1.01} className="rounded-2xl">
                    <div className="hairline-ivory rounded-2xl p-6 sm:p-8 bg-white border border-[#20201E]/10 shadow-sm mb-8">
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
                  </TiltCard>
                </ScrollReveal>
              </div>

              {/* Right Column: Verified Technical Capabilities in IBM Plex Mono */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <ScrollReveal direction="left" delay={200}>
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#87847C] mb-6">
                      // TECHNICAL SPECIFICATIONS
                    </h3>

                    {/* Skills Groups with TiltCards */}
                    <div className="space-y-4">
                      <TiltCard maxTilt={5} scale={1.015} className="rounded-xl">
                        <div className="p-5 rounded-xl bg-white border border-[#20201E]/10">
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
                      </TiltCard>

                      <TiltCard maxTilt={5} scale={1.015} className="rounded-xl">
                        <div className="p-5 rounded-xl bg-white border border-[#20201E]/10">
                          <span className="font-mono text-xs text-[#C65D35] font-bold block mb-3 uppercase">
                            Interactive & Motion Systems
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {siteContent.about.skills.creative3d.map((s, idx) => (
                              <span key={idx} className="font-mono text-xs px-2.5 py-1 rounded bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E]">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </TiltCard>

                      <TiltCard maxTilt={5} scale={1.015} className="rounded-xl">
                        <div className="p-5 rounded-xl bg-white border border-[#20201E]/10">
                          <span className="font-mono text-xs text-[#C65D35] font-bold block mb-3 uppercase">
                            APIs, Runtimes & Delivery
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {siteContent.about.skills.toolsAndApis.map((s, idx) => (
                              <span key={idx} className="font-mono text-xs px-2.5 py-1 rounded bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E]">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </TiltCard>
                    </div>
                  </div>

                  {/* Direct Personal Contact Pill */}
                  <div className="pt-8 mt-8 border-t border-[#20201E]/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-[#87847C]">Education:</span>
                    <span className="font-bold text-[#20201E]">BVCOE Delhi (B.Tech CSE)</span>
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 07 — CONTACT (WARM IVORY WITH CHARCOAL & BURNT ORANGE ACCENTS)     */}
        {/* ========================================================================= */}
        <section 
          id="contact"
          className="py-24 sm:py-32 bg-[#FCFAF6] text-[#20201E] border-t border-[#20201E]/10 relative overflow-hidden"
        >
          <LuminousBackdrop variant="ivory" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="scale" delay={150}>
              <div className="hairline-ivory rounded-3xl p-8 sm:p-14 bg-white border border-[#20201E]/10 shadow-2xl">
                
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-3">
                    SECTION 07 // PROJECT ENQUIRY
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
                      <span className="font-mono text-[10px] text-[#87847C] block uppercase">Academic / Main</span>
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
                      <span className="font-mono text-[10px] text-[#87847C] block uppercase">LinkedIn</span>
                      <span className="text-xs font-semibold text-[#20201E]">anubhav8210</span>
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

                {/* Functional Enquiry Form */}
                {formSubmitted ? (
                  <div className="p-8 rounded-2xl bg-[#EBE5DB] text-center border border-[#C65D35]/30">
                    <CheckCircle2 className="w-10 h-10 text-[#C65D35] mx-auto mb-3" />
                    <h3 className="font-display font-bold text-xl text-[#20201E] mb-2">
                      Enquiry Drafted & Transferred
                    </h3>
                    <p className="text-sm text-[#575550] max-w-md mx-auto">
                      Your message details have been transferred to your email client. I will review your requirements and respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6 pt-6 border-t border-[#20201E]/10">
                    {inquiryScope && (
                      <div className="p-3.5 rounded-xl bg-[#C65D35]/10 border border-[#C65D35]/30 flex items-center justify-between text-xs font-mono text-[#20201E]">
                        <span className="truncate">Attached Blueprint: <strong>{inquiryScope}</strong></span>
                        <button 
                          type="button" 
                          onClick={() => setInquiryScope('')}
                          className="text-[#C65D35] hover:underline font-bold ml-2 cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-mono text-xs text-[#575550] mb-2 uppercase tracking-wider">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-4 py-3 rounded-lg bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E] placeholder-[#87847C] text-sm focus:border-[#C65D35] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs text-[#575550] mb-2 uppercase tracking-wider">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-lg bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E] placeholder-[#87847C] text-sm focus:border-[#C65D35] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-mono text-xs text-[#575550] mb-2 uppercase tracking-wider">
                          Project Type
                        </label>
                        <select
                          name="service"
                          className="w-full px-4 py-3 rounded-lg bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E] text-sm focus:border-[#C65D35] transition-colors"
                        >
                          <option value="Web Development (Responsive Websites & Landing Pages)">Web Development (Responsive Websites & Landing Pages)</option>
                          <option value="Full-Stack Applications (Platforms & APIs)">Full-Stack Applications (Platforms & APIs)</option>
                          <option value="AI Solutions (LLMs, Speech & Practical AI)">AI Solutions (LLMs, Speech & Practical AI)</option>
                          <option value="Automation Systems (Workflows & Pipelines)">Automation Systems (Workflows & Pipelines)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-xs text-[#575550] mb-2 uppercase tracking-wider">
                          Estimated Budget
                        </label>
                        <select
                          name="budget"
                          className="w-full px-4 py-3 rounded-lg bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E] text-sm focus:border-[#C65D35] transition-colors"
                        >
                          <option value="₹15,000 – ₹30,000 ($200 – $400)">₹15,000 – ₹30,000 ($200 – $400)</option>
                          <option value="₹30,000 – ₹60,000 ($400 – $800)">₹30,000 – ₹60,000 ($400 – $800)</option>
                          <option value="₹60,000+ ($800+)">₹60,000+ ($800+)</option>
                          <option value="Custom Scope / To Be Discussed">Custom Scope / To Be Discussed</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-[#575550] mb-2 uppercase tracking-wider">
                        Project Goals & Requirements *
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell me about what you need built, any reference links, timeline preferences..."
                        className="w-full px-4 py-3 rounded-lg bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E] placeholder-[#87847C] text-sm focus:border-[#C65D35] transition-colors resize-none"
                      ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                      <span className="font-mono text-xs text-[#87847C]">
                        {siteContent.contact.guarantee}
                      </span>
                      <button
                        type="submit"
                        className="btn-burnt-orange w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-lg"
                      >
                        <span>Send Project Enquiry</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
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
