import React from 'react';
import { MessageCircle, Calculator } from 'lucide-react';
import { Analytics } from '../../utils/analytics';

export default function MobileBottomBar({ whatsappNumber = '+91 87007 74976', whatsappLink }) {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const prefilledMessage = encodeURIComponent(
    "Hi Anubhav, I saw your portfolio and would like to discuss a website for my business."
  );
  const targetUrl = whatsappLink || `https://wa.me/${cleanNumber}?text=${prefilledMessage}`;

  const handleWhatsAppClick = () => {
    Analytics.whatsAppClick('mobile_sticky_bar');
  };

  const handleQuoteClick = () => {
    const el = document.getElementById('estimator') || document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#20201E]/95 backdrop-blur-md border-t border-white/10 px-3 py-2.5 flex items-center gap-2.5 shadow-2xl">
      {/* 1. Direct WhatsApp Action */}
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="flex-1 min-h-[44px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#25D366] text-white font-display font-bold text-xs tracking-tight shadow-md active:scale-95 transition-transform"
        aria-label="Direct message on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-current shrink-0" />
        <span>WhatsApp</span>
      </a>

      {/* 2. Fast Project Quote Action */}
      <button
        type="button"
        onClick={handleQuoteClick}
        className="flex-1 min-h-[44px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#C65D35] text-white font-display font-bold text-xs tracking-tight shadow-md active:scale-95 transition-transform cursor-pointer"
      >
        <Calculator className="w-4 h-4 shrink-0" />
        <span>Get a Quote</span>
      </button>
    </div>
  );
}

