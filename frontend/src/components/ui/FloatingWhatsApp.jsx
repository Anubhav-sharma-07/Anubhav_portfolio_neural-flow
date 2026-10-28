import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Analytics } from '../../utils/analytics';

export default function FloatingWhatsApp({ whatsappNumber = '+91 87007 74976', whatsappLink }) {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const prefilledMessage = encodeURIComponent(
    "Hi Anubhav, I saw your portfolio and would like to discuss a website for my business."
  );
  const targetUrl = whatsappLink || `https://wa.me/${cleanNumber}?text=${prefilledMessage}`;

  const handleClick = () => {
    Analytics.whatsAppClick('floating_desktop_button');
  };

  return (
    <div className="hidden sm:block fixed bottom-6 right-6 z-40">
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group min-h-[44px] flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:bg-[#20ba59] transition-all hover:scale-105 active:scale-95 border border-white/20"
        aria-label="Chat directly with Anubhav on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white animate-ping" />
        </div>
        <span className="font-display font-semibold text-xs tracking-tight">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

