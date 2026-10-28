import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  RotateCcw,
  MessageCircle
} from 'lucide-react';
import { Analytics } from '../../utils/analytics';

export default function ContactForm({ 
  contactEmail = 'anubhavsharma8210@gmail.com',
  inquiryScope = '',
  onResetScope,
  onPlayClick
}) {
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Business website',
    budget: '₹5,999–₹10,000',
    goal: 'Get more customer enquiries',
    timeline: 'Within a month',
    message: '',
    botcheck: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // When estimator or audience CTA passes inquiryScope
  useEffect(() => {
    if (inquiryScope) {
      setFormData((prev) => {
        // If scope contains web app or automation, adjust projectType if matched
        let inferredType = prev.projectType;
        if (inquiryScope.toLowerCase().includes('web application')) {
          inferredType = 'Web application';
        } else if (inquiryScope.toLowerCase().includes('automation')) {
          inferredType = 'AI & workflow automation';
        } else if (inquiryScope.toLowerCase().includes('business')) {
          inferredType = 'Business website';
        }

        return {
          ...prev,
          projectType: inferredType,
          message: prev.message 
            ? prev.message 
            : `Selected Scope: ${inquiryScope}\n\nProject goals & details: `
        };
      });
    }
  }, [inquiryScope]);

  // INR and USD budget brackets
  const inrBudgets = [
    '₹5,999–₹10,000',
    '₹10,000–₹20,000',
    '₹20,000–₹30,000',
    '₹30,000+',
    'Not sure yet'
  ];

  const usdBudgets = [
    'Under $500',
    '$500–$1,500',
    '$1,500–$3,000',
    '$3,000+',
    'Flexible / Custom quote'
  ];

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setFormData((prev) => ({
      ...prev,
      budget: newCurrency === 'INR' ? inrBudgets[0] : usdBudgets[0]
    }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email or WhatsApp number.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      errors.message = 'Please provide a short description of what you need.';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onPlayClick) onPlayClick();

    if (formData.botcheck) {
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
      // 1. First-party submission attempt to backend /api/contact endpoint
      const localApi = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
      let serverHandled = false;

      try {
        const backendRes = await fetch(`${localApi}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            projectType: formData.projectType,
            budget: `${formData.budget} (${currency})`,
            goal: formData.goal,
            timeline: formData.timeline,
            message: formData.message,
            scopeData: inquiryScope || 'Direct Form',
            botcheck: formData.botcheck
          })
        });

        if (backendRes.ok) {
          const resData = await backendRes.json();
          if (resData.success) {
            Analytics.formSubmit(formData.projectType);
            setStatus('success');
            serverHandled = true;
            return;
          }
        }
      } catch (_backendErr) {
        // Backend not reachable or running in static preview; fall through
      }

      if (serverHandled) return;

      // 2. If access key is configured, post to Web3Forms
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (accessKey && accessKey !== 'YOUR_ACCESS_KEY_HERE') {
        const payload = {
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          budget: `${formData.budget} (${currency})`,
          goal: formData.goal,
          timeline: formData.timeline,
          message: formData.message,
          scopeData: inquiryScope || 'None',
          subject: `New Project Enquiry: ${formData.projectType} — ${formData.name}`
        };

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (response.ok && result.success) {
          Analytics.formSubmit(formData.projectType);
          setStatus('success');
          return;
        }
      }

      // 3. Fallback: Open prefilled mailto and confirm to user
      const mailtoUrl = getMailtoHref();
      window.location.href = mailtoUrl;
      setStatus('success');
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus('error');
      setErrorMessage(
        'Unable to send via online form service right now. Please retry or click below to message directly via email or WhatsApp.'
      );
    }
  };

  const getMailtoHref = () => {
    const subject = encodeURIComponent(`Project Enquiry: ${formData.projectType} — ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Anubhav,\n\nName: ${formData.name}\nContact (Email/WhatsApp): ${formData.email}\nProject Type: ${formData.projectType}\nEstimated Budget: ${formData.budget} (${currency})\nPrimary Goal: ${formData.goal}\nExpected Timeline: ${formData.timeline}\n\nProject Scope & Requirements:\n${formData.message}\n\n[Blueprint / Estimator: ${inquiryScope || 'Direct Form'}]`
    );
    return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  if (status === 'success') {
    return (
      <div className="p-8 sm:p-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="font-display font-bold text-2xl text-[#F5F0E8] mb-2">
          Enquiry Received
        </h3>
        <p className="text-sm text-[#A8A69E] max-w-md mx-auto mb-6 leading-relaxed">
          Thank you, <strong>{formData.name}</strong>. Your enquiry has been received. I review all project requirements personally and reply within 24 hours.
        </p>

        {/* What Happens Next Roadmap */}
        <div className="max-w-md mx-auto text-left bg-[#20201E] p-4 rounded-xl border border-[rgba(245,240,232,0.08)] mb-6 text-xs font-mono space-y-2">
          <span className="text-[#C65D35] font-bold block uppercase text-[10px] tracking-wider">
            What happens next:
          </span>
          <div className="flex items-start gap-2 text-[#D4D2CA]">
            <span className="text-[#C65D35] font-bold">1.</span>
            <span>Personal requirement review within 24 hours.</span>
          </div>
          <div className="flex items-start gap-2 text-[#D4D2CA]">
            <span className="text-[#C65D35] font-bold">2.</span>
            <span>Preliminary scope & tech feasibility breakdown.</span>
          </div>
          <div className="flex items-start gap-2 text-[#D4D2CA]">
            <span className="text-[#C65D35] font-bold">3.</span>
            <span>Fixed milestone proposal & clear delivery timeline.</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setFormData({
              name: '',
              email: '',
              projectType: 'Business website',
              budget: inrBudgets[0],
              goal: 'Get more customer enquiries',
              timeline: 'Within a month',
              message: '',
              botcheck: ''
            });
            if (onResetScope) onResetScope();
          }}
          className="font-mono text-xs text-[#C65D35] hover:text-[#E07A52] flex items-center gap-1.5 mx-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Send another enquiry</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot for spam mitigation */}
      <input
        type="text"
        name="botcheck"
        value={formData.botcheck}
        onChange={handleChange}
        className="hidden"
        tabIndex="-1"
        autoComplete="off"
      />

      {/* Scope banner if prefilled */}
      {inquiryScope && (
        <div className="p-3.5 rounded-xl bg-[#20201E] border border-[#C65D35]/40 flex items-center justify-between text-xs font-mono text-[#E07A52]">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#C65D35] shrink-0" />
            <span className="truncate">Prefilled Scope: {inquiryScope}</span>
          </div>
          {onResetScope && (
            <button
              type="button"
              onClick={onResetScope}
              className="text-[#A8A69E] hover:text-[#F5F0E8] text-[10px] ml-2 shrink-0 underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Row 1: Project Type & Primary Goal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="projectType" className="block font-mono text-xs font-semibold text-[#A8A69E] mb-1.5">
            1. Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#20201E] border border-[rgba(245,240,232,0.1)] text-sm text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#C65D35] cursor-pointer"
          >
            <option value="Business website">Business website</option>
            <option value="Web application">Web application</option>
            <option value="AI & workflow automation">AI & workflow automation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="goal" className="block font-mono text-xs font-semibold text-[#A8A69E] mb-1.5">
            2. Primary Goal
          </label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#20201E] border border-[rgba(245,240,232,0.1)] text-sm text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#C65D35] cursor-pointer"
          >
            <option value="Get more customer enquiries">Get more customer enquiries</option>
            <option value="Showcase products or services">Showcase products or services</option>
            <option value="Build a web application or digital product">Build a web application or digital product</option>
            <option value="Automate business processes">Automate business processes</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Row 2: Estimated Budget (with Currency Toggle) & Expected Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="budget" className="font-mono text-xs font-semibold text-[#A8A69E]">
              3. Estimated Budget
            </label>
            {/* Currency Selector */}
            <div className="flex items-center gap-1 font-mono text-[10px]">
              <span className="text-[#72706A] mr-1">Currency:</span>
              <button
                type="button"
                onClick={() => handleCurrencyChange('INR')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  currency === 'INR' 
                    ? 'bg-[#C65D35] text-white font-bold' 
                    : 'bg-[#20201E] text-[#A8A69E] hover:text-white'
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => handleCurrencyChange('USD')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  currency === 'USD' 
                    ? 'bg-[#C65D35] text-white font-bold' 
                    : 'bg-[#20201E] text-[#A8A69E] hover:text-white'
                }`}
              >
                $ USD / Intl
              </button>
            </div>
          </div>

          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#20201E] border border-[rgba(245,240,232,0.1)] text-sm text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#C65D35] cursor-pointer"
          >
            {(currency === 'INR' ? inrBudgets : usdBudgets).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block font-mono text-xs font-semibold text-[#A8A69E] mb-1.5">
            4. Expected Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#20201E] border border-[rgba(245,240,232,0.1)] text-sm text-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-[#C65D35] cursor-pointer"
          >
            <option value="As soon as possible">As soon as possible (1–2 weeks)</option>
            <option value="Within a month">Within a month</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
      </div>

      {/* Row 3: Name & Contact Method */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block font-mono text-xs font-semibold text-[#A8A69E] mb-1.5">
            Your Name <span className="text-[#C65D35]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rahul Verma or Clinic Name"
            className={`w-full px-4 py-3 rounded-xl bg-[#20201E] border text-sm text-[#F5F0E8] placeholder-[#72706A] focus:outline-none focus:ring-2 focus:ring-[#C65D35] transition-all ${
              validationErrors.name ? 'border-red-500' : 'border-[rgba(245,240,232,0.1)]'
            }`}
          />
          {validationErrors.name && (
            <span className="text-red-400 font-mono text-[11px] mt-1 block">
              {validationErrors.name}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-xs font-semibold text-[#A8A69E] mb-1.5">
            Email or WhatsApp <span className="text-[#C65D35]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="text"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com or +91..."
            className={`w-full px-4 py-3 rounded-xl bg-[#20201E] border text-sm text-[#F5F0E8] placeholder-[#72706A] focus:outline-none focus:ring-2 focus:ring-[#C65D35] transition-all ${
              validationErrors.email ? 'border-red-500' : 'border-[rgba(245,240,232,0.1)]'
            }`}
          />
          {validationErrors.email && (
            <span className="text-red-400 font-mono text-[11px] mt-1 block">
              {validationErrors.email}
            </span>
          )}
        </div>
      </div>

      {/* Short Project Description */}
      <div>
        <label htmlFor="message" className="block font-mono text-xs font-semibold text-[#A8A69E] mb-1.5">
          Short Project Description <span className="text-[#C65D35]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your business, the features you're looking to build, and any existing website or references..."
          className={`w-full px-4 py-3 rounded-xl bg-[#20201E] border text-sm text-[#F5F0E8] placeholder-[#72706A] focus:outline-none focus:ring-2 focus:ring-[#C65D35] transition-all resize-y ${
            validationErrors.message ? 'border-red-500' : 'border-[rgba(245,240,232,0.1)]'
          }`}
        />
        {validationErrors.message && (
          <span className="text-red-400 font-mono text-[11px] mt-1 block">
            {validationErrors.message}
          </span>
        )}
      </div>

      {/* Error State Alert */}
      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs text-red-200">
            <p className="font-semibold mb-1">{errorMessage}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <a
                href={getMailtoHref()}
                className="underline text-red-300 hover:text-white font-mono"
              >
                Send via Email Client →
              </a>
              <span className="text-red-400">or</span>
              <a
                href="https://wa.me/918210724256"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-emerald-400 hover:text-emerald-300 font-mono"
              >
                Message on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Submit Action & WhatsApp Quick Option */}
      <div className="pt-2 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-burnt-orange text-xs font-semibold px-8 py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending enquiry...</span>
              </>
            ) : (
              <>
                <span>Send Project Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <a
            href="https://wa.me/918210724256?text=Hi%20Anubhav,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20website"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => Analytics.whatsAppClick('contact_form_fallback')}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs font-semibold cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>Prefer WhatsApp? Chat now</span>
          </a>
        </div>

        <span className="font-mono text-[11px] text-[#A8A69E] text-center lg:text-right">
          Direct reply within 24 hours · No obligation
        </span>
      </div>
    </form>
  );
}
