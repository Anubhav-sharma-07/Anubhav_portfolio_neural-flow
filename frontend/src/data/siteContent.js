import { CONTACT_EMAIL, WHATSAPP_NUMBER, WHATSAPP_LINK, IDENTITY_LINE } from '../config/site';

/**
 * ==============================================================================
 * CANONICAL SITE CONTENT & VERIFIABLE CLAIMS
 * ==============================================================================
 * All numbers, claims, and case studies rendered across the portfolio stem from this file.
 * Faithfully aligned with the visual reference and brand design system.
 */

export const siteContent = {
  brand: {
    name: "Neural Flow",
    founder: "Anubhav Sharma",
    role: "Web Developer & AI Automation Specialist",
    location: "Delhi, India",
    tagline: IDENTITY_LINE,
    eyebrow: "WEBSITE DEVELOPMENT & DIGITAL SOLUTIONS",
    headline: "Your business deserves more than a basic website.",
    subtext: "I design and build professional websites, web applications, and practical AI-powered solutions that help businesses present their services clearly, earn customer trust, and make enquiries easier.",
    audiencePaths: {
      business: {
        title: "Need a website for your business?",
        description: "Professional, responsive websites for service businesses, clinics, coaching institutes, manufacturers, and growing companies.",
        ctaLabel: "I need a website for my business",
        target: "#estimator",
        platformId: "business"
      },
      partner: {
        title: "Need a reliable development partner?",
        description: "Website implementation, responsive frontend development, React/Next.js projects, landing pages, and web development support.",
        ctaLabel: "I need a development partner",
        target: "#contact",
        serviceId: "Web Applications & Development"
      }
    },
    heroPills: [
      { id: "business", label: "Business Websites", icon: "globe" },
      { id: "webapp", label: "Web Applications", icon: "layers" },
      { id: "automation", label: "AI & Automation", icon: "cpu" }
    ],
    heroMockup: "/images/hero-devices.webp",
    avatar: "/images/anubhav-sharma.jpg"
  },

  socials: {
    github: "https://github.com/Anubhav-sharma-07",
    linkedin: "https://www.linkedin.com/in/anubhav-sharma-51347628a/",
    email: CONTACT_EMAIL,
    whatsapp: WHATSAPP_LINK,
    whatsappNumber: WHATSAPP_NUMBER,
    instagram: "https://instagram.com/code_orbit7"
  },

  // ----------------------------------------------------------------------------
  // TRUST & EXPERIENCE STRIP (VERIFIED PROJECTS / BRANDS)
  // ----------------------------------------------------------------------------
  trustedBrands: {
    heading: "Trusted by businesses across industries",
    items: [
      { id: "cliniva", name: "Cliniva", category: "Healthcare & Dental" },
      { id: "credex", name: "CREDEX", category: "Spend Analytics" },
      { id: "aura", name: "AURA", category: "Interview Platform" },
      { id: "socio", name: "SOCIO", category: "Kitchen & Bar" },
      { id: "nrs", name: "NRS", category: "Digital Solutions" }
    ]
  },

  // Trust numbers (verifiable metrics)
  trustStats: [
    {
      id: "projects-shipped",
      value: 5,
      prefix: "",
      suffix: "+",
      label: "Live Projects & Platforms",
      description: "Tested production applications and client concepts"
    },
    {
      id: "tech-mastered",
      value: 12,
      prefix: "",
      suffix: "+",
      label: "Modern Technologies",
      description: "React 19, Next.js, Supabase, Groq AI API"
    },
    {
      id: "years-building",
      value: 3,
      prefix: "",
      suffix: "+",
      label: "Years Engineering Software",
      description: "CSE degree track + independent delivery"
    }
  ],

  // ----------------------------------------------------------------------------
  // FEATURED WORK / CASE STUDIES (STEP 6)
  // ----------------------------------------------------------------------------
  projects: [
    {
      id: "cliniva",
      title: "Cliniva",
      subtitle: "Healthcare & Dental Clinic",
      category: "Healthcare & Dental Clinic",
      badgeType: "Live Website",
      purpose: "A modern website for a healthcare and dental clinic with easy appointment booking.",
      summary: "A modern website for a healthcare and dental clinic with easy appointment booking, transparent procedure guides, and doctor credential profiles.",
      challenge: "Local healthcare practices lose patients through antiquated, slow websites that lack clear treatment guides or easy mobile appointment booking.",
      approach: "Built a high-contrast clean layout, mobile-first appointment booking flow, procedure cards with pricing clarity, and verified doctor bios.",
      whatWasBuilt: "Complete responsive frontend in React, appointment request workflow, treatment pricing modules, and mobile-optimized doctor bios.",
      result: "Live responsive clinic website loading in under 1 second on mobile devices with zero layout shift.",
      stack: ["React", "Vite", "Tailwind CSS", "Lucide Icons", "Mobile UI"],
      links: {
        live: "https://neuralflow-cliniva-preview.vercel.app/",
        github: null
      },
      image: "/projects/cliniva.webp",
      highlights: [
        "Mobile-first patient appointment request flow",
        "Transparent procedure pricing cards and doctor credentials",
        "Sub-second load times engineered for mobile patients"
      ]
    },
    {
      id: "spendlens",
      title: "SpendLens",
      subtitle: "Credex Audit",
      category: "Financial Analytics Platform",
      badgeType: "Live Website",
      purpose: "A clean, informative platform that presents financial insights and reports.",
      summary: "A production SaaS application that audits team AI subscription spend, tracks active developer seats, and generates automated saving recommendations.",
      challenge: "Tech teams overspend on duplicate AI subscriptions, unassigned developer seats, and recurring licenses without clear usage visibility.",
      approach: "Engineered a responsive analytics dashboard with departmental cost breakdown, CSV ingestion, and AI-assisted saving recommendations via Groq API.",
      whatWasBuilt: "Full responsive dashboard, database schema, AI recommendation engine via Groq LLM API, and CSV export pipelines.",
      result: "Live SaaS application providing immediate spend insights and duplicate subscription detection in under 2 minutes.",
      stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase", "Groq AI API"],
      links: {
        live: "https://credex-audit-eight.vercel.app/",
        github: "https://github.com/Anubhav-sharma-07/credex-audit"
      },
      image: "/projects/spendlens.webp",
      highlights: [
        "Interactive analytics dashboard with cost breakdown by team",
        "Automated AI recommendations highlighting duplicate subscriptions",
        "Exportable CSV financial audit reports"
      ]
    },
    {
      id: "aura-interview",
      title: "Aura",
      subtitle: "Interview Platform",
      category: "Interview Platform",
      badgeType: "Live Website",
      purpose: "A modern platform for interview preparation with a clean and focused user experience.",
      summary: "An interactive browser-based platform enabling engineering candidates to practice technical and behavioral mock interviews with real-time speech capture and evaluation rubrics.",
      challenge: "Software engineering candidates struggle to practice real-time technical interviews with structured rubric feedback.",
      approach: "Designed a browser-based speech recognition pipeline paired with an interview pacing state machine and automated scoring rubrics.",
      whatWasBuilt: "Real-time speech recognition interface, interview pacing state machine, technical evaluation rubrics, and communication scorecards.",
      result: "Functional mock interview platform supporting real-time voice interview practice and structured feedback.",
      stack: ["React", "Node.js", "Web Speech API", "AI Evaluation API", "Tailwind CSS"],
      links: {
        live: null,
        github: "https://github.com/Anubhav-sharma-07/ai-mock-interview-platform"
      },
      image: "/projects/aura-interview.webp",
      highlights: [
        "Speech recognition interface with active timers and prompt progression",
        "Multi-track technical evaluation rubrics (DSA, System Design, Behavioral)",
        "Structured scorecards evaluating communication clarity"
      ]
    },
    {
      id: "socio-bar",
      title: "SOCIO",
      subtitle: "Restaurant & Bar",
      category: "Restaurant & Bar",
      badgeType: "Live Website",
      purpose: "A stylish website for a café and bar with menu, ambience and booking details.",
      summary: "An aesthetic web experience for a premier rooftop dining destination in Pune, featuring interactive menus, Sunday brunch showcases, and a mobile reservation portal.",
      challenge: "Upscale hospitality venues need a digital presence that matches their physical atmosphere and converts visitors into table bookings.",
      approach: "Crafted an earth-toned editorial layout, interactive food and handcrafted cocktail tabbed menus, gallery grids, and a reservation enquiry form.",
      whatWasBuilt: "Editorial visual hierarchy, custom cocktail and culinary tabbed menus, image gallery, and table reservation form.",
      result: "High-converting live restaurant website with seamless mobile menu navigation and reservation inquiries.",
      stack: ["React", "Vite", "Tailwind CSS", "Google Fonts (Playfair & Outfit)"],
      links: {
        live: "https://cafe-bar-self.vercel.app/",
        github: null
      },
      image: "/projects/socio-bar.webp",
      highlights: [
        "Rich editorial layout with earth-toned aesthetics matching venue vibe",
        "Interactive food and handcrafted cocktail menu tabs",
        "Table reservation enquiry interface"
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // SERVICES (STEP 7: 3 SIMPLIFIED CATEGORIES)
  // ----------------------------------------------------------------------------
  services: [
    {
      id: "business-websites",
      number: "01",
      title: "Business Websites",
      badge: "Visibility & Enquiries",
      icon: "globe",
      purpose: "Professional, responsive websites that explain your services, build trust, and make it easier for customers to contact you.",
      forWhom: "Manufacturers, clinics, service businesses, and growing companies.",
      problem: "Losing customers to outdated design, slow mobile load times, or confusing enquiry flows.",
      deliverableBox: "Deliverables: pages, mobile-friendly layouts, service or product information and enquiry forms.",
      deliverablesList: [
        "Business and service pages",
        "Mobile-responsive layouts",
        "Contact and enquiry forms",
        "WhatsApp contact integration where appropriate",
        "Service or product presentation",
        "Basic on-page SEO structure",
        "Deployment and handover"
      ],
      nextStep: "Build My Business Website",
      nextAction: "estimator",
      platformType: "business"
    },
    {
      id: "web-apps",
      number: "02",
      title: "Web Applications & Development",
      badge: "Custom Products",
      icon: "layers",
      purpose: "Custom web experiences and application interfaces built around your product, users, and workflow.",
      forWhom: "Custom dashboards, SaaS products, landing pages and frontend implementation for businesses and agencies.",
      problem: "Technical bottlenecks, lack of dedicated frontend bandwidth, or slow turnaround on new feature interfaces.",
      deliverableBox: "Deliverables depend on scope, integrations and technical requirements.",
      deliverablesList: [
        "React and Next.js interfaces where appropriate",
        "Landing pages and frontend implementation",
        "Dashboard and application UI",
        "API integration where within scope",
        "Responsive layouts",
        "Testing and bug fixes"
      ],
      nextStep: "Discuss Development Support",
      nextAction: "contact",
      platformType: "webapp"
    },
    {
      id: "ai-automation",
      number: "03",
      title: "AI & Workflow Automation",
      badge: "Practical Efficiency",
      icon: "cpu",
      purpose: "Practical automation that can reduce repetitive work and connect useful tools into a clearer workflow.",
      forWhom: "Businesses spending excessive hours on manual data entry, customer follow-up, or fragmented tool updates.",
      problem: "Manual overhead and disconnected systems that delay customer response and waste team hours.",
      deliverableBox: "Examples: chatbots, data processing, CRM automation, and workflow integrations.",
      deliverablesList: [
        "Workflow automation planning",
        "API and tool integrations",
        "AI-assisted business workflows",
        "Chatbot or assistant prototypes",
        "Data processing and reporting workflows"
      ],
      transparencyNote: "Third-party APIs, hosting, and subscription costs (e.g. OpenAI/Groq/Zapier) are paid directly by the client and clarified upfront.",
      nextStep: "Explore Practical Automation",
      nextAction: "contact",
      platformType: "ai-automation"
    }
  ],

  // ----------------------------------------------------------------------------
  // HOW I WORK / PROCESS (STEP 8: 5 TRANSPARENT STEPS)
  // ----------------------------------------------------------------------------
  processSteps: [
    {
      number: "01",
      title: "Discover",
      description: "Understand your goals, requirements and audience.",
      detail: "We clarify the business context, audience expectations, deliverable milestones, and technical constraints."
    },
    {
      number: "02",
      title: "Plan",
      description: "Build a clear scope, feature list and timeline.",
      detail: "Define the exact page count, features, integrations, and milestones before writing production code."
    },
    {
      number: "03",
      title: "Design",
      description: "Create wireframes and visual designs for your approval.",
      detail: "Develop clean layouts, typography, and interactive directions reviewed against agreed requirements."
    },
    {
      number: "04",
      title: "Develop",
      description: "Build, test and refine with regular updates.",
      detail: "Implement responsive code, test interactions across phones and desktop, and fix issues in focused sprints."
    },
    {
      number: "05",
      title: "Launch",
      description: "Deliver your project and provide ongoing support.",
      detail: "Deploy the verified build, provide full source code handover, and clarify post-launch warranty support."
    }
  ],
  processNote: "Timelines depend on scope, feedback turnaround, and required third-party integrations.",

  // ----------------------------------------------------------------------------
  // PROJECT ESTIMATOR (STEP 9)
  // ----------------------------------------------------------------------------
  estimator: {
    platforms: [
      { id: "business", name: "Business Website", baseDays: 10, note: "Ideal for clinics, manufacturers, coaching institutes, service businesses" },
      { id: "webapp", name: "Web Application", baseDays: 16, note: "Dashboards, custom SaaS UI, portals, interactive web tools" },
      { id: "ai-automation", name: "AI & Automation", baseDays: 12, note: "API automations, lead processing workflows, AI assistant prototypes" }
    ],
    features: [
      { id: "landing", name: "Landing Page", days: 2 },
      { id: "service-pages", name: "Service Pages", days: 3 },
      { id: "contact-form", name: "Contact Form", days: 1 },
      { id: "whatsapp", name: "WhatsApp Integration", days: 1 },
      { id: "cms", name: "Custom CMS / API", days: 4 },
      { id: "seo", name: "SEO Optimization", days: 2 }
    ]
  },

  // ----------------------------------------------------------------------------
  // PRICING & ENGAGEMENT (ONLY PUBLIC STARTING PRICE: ₹5,999 FOR WEBSITES)
  // ----------------------------------------------------------------------------
  pricing: {
    eyebrow: "STRAIGHTFORWARD PROJECT PRICING",
    headline: "Solutions built around your business.",
    description: "Every business has different needs. Tell us what you're looking to build, and we'll recommend a solution based on your goals, requirements and budget.",
    startingPriceBadge: "Website projects starting at ₹5,999",
    supportingText: "Final pricing depends on project scope, features and requirements. Custom applications and AI solutions are quoted individually.",
    services: [
      {
        id: "business-websites",
        title: "Business Websites",
        priceBadge: "Starting at ₹5,999",
        isStartingPrice: true,
        description: "Landing pages, business websites, portfolios, service pages and lead-generation websites.",
        features: [
          "Responsive multi-device layout",
          "Contact & enquiry capture",
          "WhatsApp quick-contact integration",
          "Basic on-page SEO setup",
          "100% source code ownership & handover"
        ],
        ctaText: "Discuss Your Project",
        projectTypeId: "Business website"
      },
      {
        id: "web-apps",
        title: "Web Applications & Development",
        priceBadge: "Custom Quote",
        isStartingPrice: false,
        description: "Custom dashboards, portals, SaaS products, APIs and full-stack applications.",
        features: [
          "Custom React / Next.js architecture",
          "REST APIs & database integrations",
          "Authentication & state management",
          "Scalable production setup",
          "Cross-browser testing & code handover"
        ],
        ctaText: "Discuss Your Project",
        projectTypeId: "Web application"
      },
      {
        id: "ai-automation",
        title: "AI & Workflow Automation",
        priceBadge: "Custom Quote",
        isStartingPrice: false,
        description: "AI-powered tools, business process automation, integrations and custom workflows.",
        features: [
          "Workflow audit & process automation",
          "AI integrations (Groq / OpenAI / Claude)",
          "CRM, webhook & database pipelines",
          "Data transformation & export flows",
          "Transparent API & hosting cost clarity"
        ],
        ctaText: "Discuss Your Project",
        projectTypeId: "AI & workflow automation"
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // ABOUT SECTION (STEP 11)
  // ----------------------------------------------------------------------------
  about: {
    headline: "About Anubhav & Neural Flow",
    intro: "I’m Anubhav Sharma, a developer who enjoys turning ideas into useful digital products. Through Neural Flow, I work on websites, web applications, and practical automation solutions. My approach is to understand the problem first, keep communication clear, and build around the requirements rather than adding complexity for its own sake.",
    avatar: "/images/anubhav-sharma.jpg",
    values: [
      {
        title: "Direct communication",
        description: "You speak directly with the developer building your software. No middlemen or slow agency ticketing."
      },
      {
        title: "Clear scope and deliverables",
        description: "Agreed milestones, documented scope, and no surprise invoices."
      },
      {
        title: "Practical technical decisions",
        description: "Choosing the right tool for the job to keep things maintainable and fast."
      },
      {
        title: "Regular progress updates",
        description: "Continuous communication and staging links so you can inspect progress along the way."
      },
      {
        title: "Testing and handover",
        description: "Thorough cross-device testing and full 100% source code ownership transferred on completion."
      }
    ],
    verifiedSkills: {
      frontend: ["React 19", "Next.js 14", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 & CSS3"],
      aiAndApis: ["Groq AI API", "Claude API", "OpenAI API", "REST APIs", "Supabase", "Node.js"],
      toolsAndDelivery: ["Vite", "Git & GitHub", "Vercel", "Responsive Web Design", "Web Audio API"]
    },
    education: "Bharati Vidyapeeth's College of Engineering (BVCOE), New Delhi — B.Tech Computer Science and Engineering"
  },

  // ----------------------------------------------------------------------------
  // CONTACT & CONVERSION (STEP 12)
  // ----------------------------------------------------------------------------
  contact: {
    headline: "Let’s build something great together.",
    subheadline: "Tell me a little about your business or project. I’ll review the requirements and help you work out a practical next step.",
    email: CONTACT_EMAIL,
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappLink: WHATSAPP_LINK,
    location: "Delhi, India",
    formEndpoint: "https://api.web3forms.com/submit"
  },

  // Retain whyWorkWithMe for deep comparisons
  whyWorkWithMe: {
    tagline: "// WHY WORK WITH ME",
    title: "Direct engineering, zero agency overhead.",
    subtitle: "When you hire Neural Flow, you collaborate directly with the developer building your product.",
    rows: [
      {
        feature: "Direct Communication",
        me: "Direct access to the developer writing your code via WhatsApp or email.",
        them: "Account managers, middlemen, and slow ticketing queues.",
        confirmed: true
      },
      {
        feature: "100% Code Ownership",
        me: "Clean GitHub repository transferred to you with full rights and zero lock-in.",
        them: "Proprietary builder lock-in, recurring hosting markups, or hidden exit costs.",
        confirmed: true
      },
      {
        feature: "Performance & Mobile First",
        me: "Custom React/Vite builds targeting sub-second loads and accessible contrast.",
        them: "Heavy 5MB WordPress themes stuffed with slow third-party plugins.",
        confirmed: true
      },
      {
        feature: "Turnaround & Focus",
        me: "Focused single-client sprints delivering working builds in 1 to 3 weeks.",
        them: "Lengthy bureaucratic processes and fragmented developer attention.",
        confirmed: true
      }
    ]
  },

  // Testimonials (hard rule: hides cleanly if empty)
  testimonials: []
};
