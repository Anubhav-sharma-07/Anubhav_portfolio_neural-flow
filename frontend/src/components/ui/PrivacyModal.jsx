import React, { useEffect, useRef } from 'react';
import { X, Shield } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#272725] border border-[rgba(245,240,232,0.15)] p-6 sm:p-8 text-[#F5F0E8] shadow-2xl relative outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(245,240,232,0.08)] mb-6">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#C65D35]" />
            <h3 id="privacy-policy-title" className="font-display font-bold text-lg text-[#F5F0E8]">
              Privacy Policy
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#20201E] border border-[rgba(245,240,232,0.1)] hover:border-[#C65D35] flex items-center justify-center text-[#F5F0E8] cursor-pointer"
            aria-label="Close privacy policy"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#D4D2CA] leading-relaxed">
          <p>
            <strong className="text-[#F5F0E8]">1. Zero Cookie Tracking:</strong> This website does not use tracking cookies, advertising pixels, or third-party behavioral trackers.
          </p>
          <p>
            <strong className="text-[#F5F0E8]">2. Contact Form Submissions:</strong> Any information you submit through the contact form (such as your name, email, or message) is used solely to respond to your project enquiry and discuss your website requirements.
          </p>
          <p>
            <strong className="text-[#F5F0E8]">3. No Selling of Information:</strong> Your contact information is never sold, shared, or distributed to any third parties or marketers.
          </p>
          <p>
            <strong className="text-[#F5F0E8]">4. Analytics:</strong> If anonymous page-view statistics are collected, they are privacy-friendly, aggregated, and contain zero personally identifiable data.
          </p>
          <p>
            <strong className="text-[#F5F0E8]">5. Contact:</strong> If you have questions about your data or want to request its deletion, email{' '}
            <a href="mailto:anubhavsharma8210@gmail.com" className="text-[#C65D35] underline">
              anubhavsharma8210@gmail.com
            </a>.
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-[rgba(245,240,232,0.08)] text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#C65D35] text-white font-mono text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

