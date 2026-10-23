import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Mail, 
  RotateCcw 
} from 'lucide-react';

/**
 * ContactForm component
 * - HARD RULE: Never shows fake success. Only transitions to 'success' upon HTTP 200 + { success: true }.
 * - States: 'idle' | 'loading' | 'success' | 'error'
 * - Honeypot field (botcheck) for spam mitigation.
 * - Basic field validation.
 * - Actionable error state with retry and prefilled mailto fallback.
 */
export default function ContactForm({ 
  contactEmail,
  inquiryScope,
  onResetScope,
  onPlayClick
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development (Responsive Websites & Landing Pages)',
    budget: 'Under ₹25,000 ($300)',
    message: '',
    botcheck: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please provide your name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please describe your project in at least 10 characters.';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'checked' : '') : value
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onPlayClick) onPlayClick();

    // Check honeypot
    if (formData.botcheck) {
      console.warn('Bot detected via honeypot');
      setStatus('error');
      setErrorMessage('Spam detection triggered. Please reach out directly via email.');
      return;
    }

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Use Web3Forms access key from environment or fallback public key
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';
      
      const payload = {
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        service: formData.service,
        budget: formData.budget,
        message: formData.message,
        blueprint: inquiryScope || 'None',
        subject: `New Project Inquiry from ${formData.name} [${formData.service}]`
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
      } else {
        throw new Error(result.message || 'API rejected submission');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus('error');
      setErrorMessage(
        'Unable to complete online delivery right now. You can retry or send directly via your email client.'
      );
    }
  };

  const getMailtoHref = () => {
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name || 'Client'} [${formData.service}]`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.service}\nBudget Range: ${formData.budget}\n\nProject Scope & Goals:\n${formData.message}\n\n[Blueprint: ${inquiryScope || 'Direct Inquiry'}]`
    );
    return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  if (status === 'success') {
    return (
      <div className="p-8 sm:p-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-display font-bold text-2xl text-[#20201E] mb-2">
          Project Inquiry Received
        </h3>
        <p className="text-sm text-[#575550] max-w-md mx-auto mb-6 leading-relaxed">
          Thank you, <strong>{formData.name}</strong>. Your message has been safely delivered to Anubhav. You will receive a direct reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setFormData({
              name: '',
              email: '',
              service: 'Web Development (Responsive Websites & Landing Pages)',
              budget: 'Under ₹25,000 ($300)',
              message: '',
              botcheck: ''
            });
          }}
          className="text-xs font-mono text-[#C65D35] hover:underline font-bold cursor-pointer"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-6 border-t border-[#20201E]/10" noValidate>
      
      {/* Honeypot field (hidden from human users) */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        checked={!!formData.botcheck}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Attached Blueprint Indicator */}
      {inquiryScope && (
        <div className="p-3.5 rounded-xl bg-[#C65D35]/10 border border-[#C65D35]/30 flex items-center justify-between text-xs font-mono text-[#20201E]">
          <span className="truncate">Attached Blueprint: <strong>{inquiryScope}</strong></span>
          <button 
            type="button" 
            onClick={onResetScope}
            className="text-[#C65D35] hover:underline font-bold ml-2 cursor-pointer"
          >
            Reset
          </button>
        </div>
      )}

      {/* Error Alert Box with Fallback */}
      {status === 'error' && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-[#20201E]">
          <div className="flex items-start gap-2.5 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-800 uppercase font-bold mb-0.5">Delivery Interrupted</strong>
              <span>{errorMessage}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-amber-500/20">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65D35] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry submission</span>
            </button>
            <span className="text-[#87847C]">•</span>
            <a
              href={getMailtoHref()}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#20201E] hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send prefilled email instead</span>
            </a>
          </div>
        </div>
      )}

      {/* Name and Email Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="block font-mono text-xs text-[#575550] mb-2 uppercase tracking-wider">
            Your Name *
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Alex Morgan"
            className={`w-full px-4 py-3 rounded-lg bg-[#F5F0E8] border text-[#20201E] placeholder-[#87847C] text-sm focus:border-[#C65D35] transition-colors ${
              validationErrors.name ? 'border-red-500' : 'border-[#20201E]/10'
            }`}
          />
          {validationErrors.name && (
            <span className="font-mono text-[11px] text-red-600 block mt-1">{validationErrors.name}</span>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="block font-mono text-xs text-[#575550] mb-2 uppercase tracking-wider">
            Your Email *
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="alex@company.com"
            className={`w-full px-4 py-3 rounded-lg bg-[#F5F0E8] border text-[#20201E] placeholder-[#87847C] text-sm focus:border-[#C65D35] transition-colors ${
              validationErrors.email ? 'border-red-500' : 'border-[#20201E]/10'
            }`}
          />
          {validationErrors.email && (
            <span className="font-mono text-[11px] text-red-600 block mt-1">{validationErrors.email}</span>
          )}
        </div>
      </div>

      {/* Project Type & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-service" className="block font-mono text-xs text-[#575550] mb-2 uppercase tracking-wider">
            Project Type
          </label>
          <select
            id="contact-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E] text-sm focus:border-[#C65D35] transition-colors"
          >
            <option value="Web Development (Responsive Websites & Landing Pages)">Web Development (Responsive Websites & Landing Pages)</option>
            <option value="Full-Stack Applications (Platforms & APIs)">Full-Stack Applications (Platforms & APIs)</option>
            <option value="AI Solutions (LLMs, Speech & Practical AI)">AI Solutions (LLMs, Speech & Practical AI)</option>
            <option value="Automation Systems (Workflows & Pipelines)">Automation Systems (Workflows & Pipelines)</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-budget" className="block font-mono text-xs text-[#575550] mb-2 uppercase tracking-wider">
            Estimated Budget
          </label>
          <select
            id="contact-budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#F5F0E8] border border-[#20201E]/10 text-[#20201E] text-sm focus:border-[#C65D35] transition-colors"
          >
            <option value="Under ₹25,000 ($300)">Under ₹25,000 ($300)</option>
            <option value="₹25,000 – ₹50,000 ($300 – $600)">₹25,000 – ₹50,000 ($300 – $600)</option>
            <option value="₹50,000 – ₹1,00,000 ($600 – $1,200)">₹50,000 – ₹1,00,000 ($600 – $1,200)</option>
            <option value="₹1,00,000+ ($1,200+)">₹1,00,000+ ($1,200+)</option>
            <option value="Not sure yet / Let's discuss">Not sure yet / Let's discuss</option>
          </select>
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="contact-message" className="block font-mono text-xs text-[#575550] mb-2 uppercase tracking-wider">
          Project Goals & Requirements *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about what you need built, reference sites, target timeline..."
          className={`w-full px-4 py-3 rounded-lg bg-[#F5F0E8] border text-[#20201E] placeholder-[#87847C] text-sm focus:border-[#C65D35] transition-colors resize-none ${
            validationErrors.message ? 'border-red-500' : 'border-[#20201E]/10'
          }`}
        ></textarea>
        {validationErrors.message && (
          <span className="font-mono text-[11px] text-red-600 block mt-1">{validationErrors.message}</span>
        )}
      </div>

      {/* Submit Button & Status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <span className="font-mono text-xs text-[#87847C]">
          Direct response guaranteed within 24 hours.
        </span>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-burnt-orange w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-lg disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px]"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <span>Send Project Enquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
