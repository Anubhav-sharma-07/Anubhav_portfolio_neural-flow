import React from 'react';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';

export default function ContactSection({ 
  contact, 
  inquiryScope, 
  onResetScope, 
  onPlayClick 
}) {
  return (
    <section 
      id="contact"
      className="py-24 sm:py-32 bg-[#20201E] text-[#F5F0E8] border-t border-[rgba(245,240,232,0.08)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header & CTA strip matching visual reference */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 mb-12 border-b border-[rgba(245,240,232,0.08)]">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold text-[#C65D35] uppercase tracking-wider block mb-2">
              CONTACT & CONVERSION
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F5F0E8] tracking-tight mb-4">
              {contact?.headline || "Let’s build something great together."}
            </h2>
            <p className="text-base text-[#A8A69E]">
              {contact?.subheadline || "Tell me a little about your business or project. I’ll review the requirements and help you work out a practical next step."}
            </p>
          </div>

          {/* Quick Direct Contacts */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href={`mailto:${contact?.email || 'anubhavsharma8210@gmail.com'}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#272725] border border-[rgba(245,240,232,0.08)] hover:border-[#C65D35] text-[#F5F0E8] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#C65D35]" />
              <span>{contact?.email || 'anubhavsharma8210@gmail.com'}</span>
            </a>

            <a
              href={contact?.whatsappLink || 'https://wa.me/918700774976'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#272725] border border-[rgba(245,240,232,0.08)] hover:border-[#C65D35] text-[#F5F0E8] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{contact?.whatsappNumber || '+91 87007 74976'}</span>
            </a>

            <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#272725] border border-[rgba(245,240,232,0.08)] text-[#A8A69E]">
              <MapPin className="w-4 h-4 text-[#C65D35]" />
              <span>{contact?.location || 'Delhi, India'}</span>
            </div>
          </div>
        </div>

        {/* Main Contact Form Container */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#272725] border border-[rgba(245,240,232,0.12)] p-6 sm:p-10 shadow-2xl">
          <div className="mb-8">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F5F0E8] mb-2">
              Start Your Project Enquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A69E]">
              Fill out the details below. If you used the estimator above, your scope summary has already been included.
            </p>
          </div>

          <ContactForm
            contactEmail={contact?.email || 'anubhavsharma8210@gmail.com'}
            inquiryScope={inquiryScope}
            onResetScope={onResetScope}
            onPlayClick={onPlayClick}
          />
        </div>

      </div>
    </section>
  );
}
