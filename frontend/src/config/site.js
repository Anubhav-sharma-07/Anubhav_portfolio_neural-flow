/**
 * Single Central Site Configuration
 * All contact information, site URLs, and core positioning live here.
 * To change the contact email or site URL, edit the constants below.
 */

export const CONTACT_EMAIL = 'anubhavsharma8210@gmail.com';

// Configurable via environment variable VITE_SITE_URL
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://anubhavsharma.dev';

// Single unified identity line (consistent across Hero, Title, Meta, OG tags & Footer)
export const IDENTITY_LINE =
  'Frontend developer and AI solutions builder helping businesses get modern, fast websites and practical AI tools.';

export const SITE_CONFIG = {
  brandName: 'Neural Flow',
  founder: 'Anubhav Sharma',
  role: 'Frontend Developer & AI Solutions Builder',
  location: 'New Delhi, India · Global Delivery',
  contactEmail: CONTACT_EMAIL,
  siteUrl: SITE_URL,
  identityLine: IDENTITY_LINE,
  socials: {
    github: 'https://github.com/Anubhav-sharma-07',
    linkedin: 'https://www.linkedin.com/in/anubhav-sharma-51347628a/',
    instagram: 'https://instagram.com/code_orbit7',
    email: `mailto:${CONTACT_EMAIL}`
  }
};
