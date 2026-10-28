/**
 * Privacy-friendly event tracking utility.
 * Safe, zero-cookie, no PII tracking.
 * Compatible with Vercel Web Analytics, Plausible, or console in dev.
 */

export function trackEvent(eventName, eventData = {}) {
  try {
    if (typeof window !== 'undefined' && window.va) {
      window.va('event', { name: eventName, data: eventData });
    }
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, { props: eventData });
    }
    // Safe dev log
    if (import.meta.env.DEV) {
      // Dev telemetry log
    }
  } catch (_e) {
    // Ignore tracking errors
  }
}

export const Analytics = {
  formSubmit: (projectType) => trackEvent('form_submit', { projectType }),
  whatsAppClick: (source) => trackEvent('whatsapp_click', { source }),
  callBookingClick: () => trackEvent('call_booking_click'),
  estimatorTransfer: (platform, estimatedDays) => 
    trackEvent('estimator_transfer', { platform, estimatedDays })
};

