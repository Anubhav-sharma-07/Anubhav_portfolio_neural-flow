/**
 * Single Central Site Configuration
 * All contact information, site URLs, and core positioning live here.
 * To change the contact email or site URL, edit the constants below.
 */

export const CONTACT_EMAIL = 'anubhavsharma8210@gmail.com';
export const WHATSAPP_NUMBER = '+91 82107 24256';
export const WHATSAPP_LINK = 'https://wa.me/918210724256';

// Configurable via environment variable VITE_SITE_URL
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://anubhavsharma.dev';

// Single unified identity line
export const IDENTITY_LINE =
  'I design and build professional websites, web applications, and practical AI-powered solutions that help businesses present their services clearly, earn customer trust, and make enquiries easier.';

export const SITE_CONFIG = {
  brandName: 'Neural Flow',
  founder: 'Anubhav Sharma',
  role: 'Web Developer & AI Automation Specialist',
  location: 'Delhi, India',
  contactEmail: CONTACT_EMAIL,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappLink: WHATSAPP_LINK,
  siteUrl: SITE_URL,
  identityLine: IDENTITY_LINE,
  socials: {
    github: 'https://github.com/Anubhav-sharma-07',
    linkedin: 'https://www.linkedin.com/in/anubhav-sharma-51347628a/',
    instagram: 'https://instagram.com/code_orbit7',
    email: `mailto:${CONTACT_EMAIL}`,
    whatsapp: WHATSAPP_LINK
  }
};

