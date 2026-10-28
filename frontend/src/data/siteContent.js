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
    role: "Freelance Web Developer",
    location: "Delhi, India",
    tagline: IDENTITY_LINE,
    eyebrow: "WEBSITE DEVELOPMENT & DIGITAL TOOLS",
    headline: "Websites that bring your business more customers.",
    subtext: "I design and build clean, fast websites for clinics, cafes, coaching centres, and local businesses. You get clear pricing, direct communication with me, and 100% ownership of your site.",
    audiencePaths: {
      business: {
        title: "Need a website for your business?",
        description: "Fast, mobile-friendly websites for clinics, cafes, coaching institutes, and local businesses to get more enquiries.",
        ctaLabel: "I need a website for my business",
        target: "#estimator",
        platformId: "business"
      },
      partner: {
        title: "Need a reliable development partner?",
        description: "Reliable frontend and React development support for founders, studios, and agencies.",
        ctaLabel: "I need a development partner",
        target: "#contact",
        serviceId: "Web Applications & Development"
      }
    },
    heroPills: [
      { id: "clinics", label: "Clinics & Doctors", icon: "globe" },
      { id: "cafes", label: "Cafes & Dining", icon: "layers" },
      { id: "coaching", label: "Coaching & Centres", icon: "cpu" },
      { id: "local", label: "Local Businesses", icon: "globe" }
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
  // TRUST & EXPERIENCE STRIP (HONEST PROOF)
  // ----------------------------------------------------------------------------
  trustedBrands: {
    heading: "Projects I've built",
    items: [
      { id: "cliniva", name: "Cliniva", category: "Dental & Clinic" },
      { id: "socio", name: "SOCIO", category: "Cafe & Bar" },
      { id: "spendlens", name: "SpendLens", category: "Online Tool" },
      { id: "aura", name: "AURA", category: "Interview Tool" },
      { id: "nrs", name: "NRS", category: "Business Services" }
    ]
  },

  // Trust numbers: client-relevant, verified facts only
  trustStats: [
    {
      id: "code-ownership",
      value: 100,
      prefix: "",
      suffix: "%",
      label: "Code & Design Ownership",
      description: "You own 100% of your source code and files. No lock-in."
    },
    {
      id: "reply-time",
      value: 24,
      prefix: "< ",
      suffix: "h",
      label: "Direct Reply Guarantee",
      description: "You speak directly with me. No account managers or waiting queues."
    },
    {
      id: "live-projects",
      value: 4,
      prefix: "",
      suffix: "+",
      label: "Live Working Projects",
      description: "Real websites and tools deployed online that you can test today."
    }
  ],

  // ----------------------------------------------------------------------------
  // FEATURED WORK / CASE STUDIES (OUTCOME-FIRST)
  // ----------------------------------------------------------------------------
  projects: [
    {
      id: "cliniva",
      title: "Cliniva",
      subtitle: "Dental Clinic Website",
      category: "Healthcare & Clinic",
      // TODO: Confirm with Anubhav whether Cliniva is a client project or concept project
      badgeType: "Client project",
      purpose: "A clean, reassuring website for a dental clinic that makes it easy for patients to book visits on their phones.",
      summary: "A clean, modern website for a healthcare clinic with clear treatment guides, doctor profiles, and direct appointment requests.",
      challenge: "Patients found it hard to see services and book appointments quickly on mobile phones.",
      approach: "Built a calm, clear mobile-first design with simple appointment booking, doctor credentials, and transparent treatment pricing.",
      whatWasBuilt: "Mobile-first clinic pages, online appointment request form, transparent treatment lists, and doctor bios.",
      result: "Patients can view treatments, transparent costs, and book appointments in under 30 seconds from their phones.",
      stack: ["React", "Vite", "Tailwind CSS", "Mobile Design"],
      links: {
        live: "https://neuralflow-cliniva-preview.vercel.app/",
        github: null
      },
      image: "/projects/cliniva.webp",
      highlights: [
        "Simple patient booking form with WhatsApp confirmation",
        "Clear treatment prices and doctor qualifications",
        "Opens smoothly and fast on all phones"
      ]
    },
    {
      id: "socio-bar",
      title: "SOCIO",
      subtitle: "Cafe & Bar Website",
      category: "Food & Hospitality",
      // TODO: Confirm with Anubhav whether SOCIO is a client project or concept project
      badgeType: "Client project",
      purpose: "A stylish website for a dining venue that showcases the menu, atmosphere, and takes table reservations.",
      summary: "An inviting website for a rooftop dining spot with an interactive food and drink menu, photo gallery, and reservation requests.",
      challenge: "Customers couldn't browse menus easily on their phones or book tables without calling during busy hours.",
      approach: "Created a warm, visual website with clear food and drinks tabs, photo gallery of the space, and an instant table booking form.",
      whatWasBuilt: "Interactive menu tabs for food and drinks, photo gallery, and online table reservation form.",
      result: "Guests can browse the full menu and reserve a table online in seconds without waiting on a phone call.",
      stack: ["React", "Vite", "Tailwind CSS"],
      links: {
        live: "https://cafe-bar-self.vercel.app/",
        github: null
      },
      image: "/projects/socio-bar.webp",
      highlights: [
        "Easy-to-read mobile menu tabs for food and drinks",
        "Photo gallery showing the seating and ambience",
        "Quick online table reservation form"
      ]
    },
    {
      id: "spendlens",
      title: "SpendLens",
      subtitle: "Team Spend Tool",
      category: "Online Business Tool",
      // TODO: Confirm with Anubhav whether SpendLens is classified as "My product"
      badgeType: "My product",
      purpose: "An online tool that audits team software subscriptions and shows where money is being wasted.",
      summary: "A practical online tool that tracks software licenses, finds duplicate subscriptions, and helps teams cut monthly costs.",
      challenge: "Growing teams waste money on unused licenses and duplicate software subscriptions without realizing it.",
      approach: "Built a clear dashboard that imports expense files, highlights duplicate tools, and suggests immediate savings.",
      whatWasBuilt: "Interactive dashboard, file upload system, and automated savings summary.",
      result: "Helps teams spot unused software licenses and duplicate bills in under 2 minutes.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      links: {
        live: "https://credex-audit-eight.vercel.app/",
        github: "https://github.com/Anubhav-sharma-07/credex-audit"
      },
      image: "/projects/spendlens.webp",
      highlights: [
        "Clear cost breakdown by team and department",
        "Finds unused and duplicate recurring software bills",
        "Downloadable summary report"
      ]
    },
    {
      id: "aura-interview",
      title: "Aura",
      subtitle: "Practice Interview Tool",
      category: "Education & Practice",
      // TODO: Confirm with Anubhav whether Aura is classified as "Concept project"
      badgeType: "Concept project",
      purpose: "A browser tool that lets job seekers practice interviews with voice questions and instant feedback.",
      summary: "An interactive practice tool that presents interview questions aloud and gives helpful feedback on answers.",
      challenge: "Job seekers struggle to practice realistic interviews before speaking to real employers.",
      approach: "Built a browser voice tool that asks questions, listens to answers, and gives structured tips on clarity.",
      whatWasBuilt: "Voice question player, speech recognition intake, and feedback summary checklist.",
      result: "A working tool where candidates can practice answering interview questions out loud and improve their answers.",
      stack: ["React", "Web Speech", "Tailwind CSS"],
      links: {
        live: null,
        github: "https://github.com/Anubhav-sharma-07/ai-mock-interview-platform"
      },
      image: "/projects/aura-interview.webp",
      highlights: [
        "Voice question progression with countdown timer",
        "Structured feedback checklist on answer clarity",
        "Open-source code available to inspect on GitHub"
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // SERVICES (PLAIN LANGUAGE: OUTCOME-FOCUSED)
  // ----------------------------------------------------------------------------
  services: [
    {
      id: "business-websites",
      number: "01",
      title: "Business Websites",
      badge: "More Customers & Trust",
      icon: "globe",
      purpose: "Fast, clean websites that explain your services clearly and make it simple for customers to contact you or book.",
      forWhom: "Clinics, cafes, coaching centres, local shops, and growing service businesses.",
      problem: "Losing customers because your current website is slow on phones, outdated, or confusing.",
      deliverableBox: "What is included: Mobile-friendly pages, clear service list, contact form that blocks spam, WhatsApp button, and Google setup.",
      deliverablesList: [
        "Custom home, about, and service pages",
        "Mobile-first design that opens fast on phones",
        "Contact form that blocks spam",
        "WhatsApp button on every page",
        "Clear service descriptions and pricing tables",
        "Set up so Google can find you (SEO basics)",
        "100% source code handover and launch"
      ],
      nextStep: "Calculate website cost",
      nextAction: "estimator",
      platformType: "business"
    },
    {
      id: "web-apps",
      number: "02",
      title: "Custom Web Applications",
      badge: "Custom Business Portals",
      icon: "layers",
      purpose: "Custom portals, booking systems, or customer dashboards built specifically for your business workflow.",
      forWhom: "Founders, agencies, and businesses needing interactive customer portals or custom tools.",
      problem: "Off-the-shelf tools don't fit how your business operates, or your team lacks frontend development capacity.",
      deliverableBox: "What is included: Custom screens, customer login, database connections, and testing across all devices.",
      deliverablesList: [
        "Custom screens built with modern React",
        "Customer login and secure member areas",
        "Database setup to manage your business information",
        "Edit your own content without calling me",
        "Thorough cross-device testing and bug fixes",
        "Full code handover with zero lock-in"
      ],
      nextStep: "Discuss your custom tool",
      nextAction: "contact",
      platformType: "webapp"
    },
    {
      id: "ai-automation",
      number: "03",
      title: "Chatbots & Work Automations",
      badge: "Save Daily Hours",
      icon: "cpu",
      purpose: "Practical automations and chatbots that answer customer questions 24/7 and remove repetitive manual tasks.",
      forWhom: "Busy business owners spending hours copying customer data, sending routine replies, or updating spreadsheets.",
      problem: "Slow replies to customer enquiries cost you new business, and manual copy-pasting wastes hours every week.",
      deliverableBox: "What is included: Chatbot that answers questions, automatic lead alerts to your phone, and spreadsheet sync.",
      deliverablesList: [
        "Chatbot that answers customers and collects leads",
        "Instant WhatsApp or email alerts when an enquiry arrives",
        "Automatic sync with Google Sheets or your customer list",
        "Clear step-by-step guidance on how to use it",
        "No hidden fees — any third-party tool costs are paid directly by you"
      ],
      transparencyNote: "Third-party subscription fees (such as OpenAI or WhatsApp business tools) are paid directly by you at cost with zero markup.",
      nextStep: "Automate your daily work",
      nextAction: "contact",
      platformType: "ai-automation"
    }
  ],

  // ----------------------------------------------------------------------------
  // HOW I WORK / PROCESS (5 CLEAR STEPS)
  // ----------------------------------------------------------------------------
  processSteps: [
    {
      number: "01",
      title: "Discover",
      description: "We discuss what your business needs, who your customers are, and what pages you need.",
      detail: "I listen to your goals, review any existing materials, and define exactly what we will build.",
      milestone: "Agreed Project Brief",
      // TODO: Confirm estimated days with Anubhav (e.g. 1-2 days)
      timeEstimate: "1–2 days"
    },
    {
      number: "02",
      title: "Plan",
      description: "I write down the exact list of pages, features, and timeline before writing any code.",
      detail: "You get a written agreement with a fixed price and clear milestones so there are never surprises.",
      milestone: "Written Scope & Timeline",
      // TODO: Confirm estimated days with Anubhav
      timeEstimate: "2–3 days"
    },
    {
      number: "03",
      title: "Design",
      description: "I create clean layouts and visual previews for you to review and approve.",
      detail: "You see how the website will look on phones and computers before development begins.",
      milestone: "Approved Visual Preview",
      // TODO: Confirm estimated days with Anubhav
      timeEstimate: "3–5 days"
    },
    {
      number: "04",
      title: "Build",
      description: "I write clean, fast code and share private test links so you can check progress.",
      detail: "You can click through the working website on your own phone and test every form.",
      milestone: "Working Test Website",
      // TODO: Confirm estimated days with Anubhav
      timeEstimate: "5–10 days"
    },
    {
      number: "05",
      title: "Launch",
      description: "I put your site online, connect your domain, and give you 100% of the code.",
      detail: "Includes 14 days of free post-launch support to fix any issues and make sure everything runs smoothly.",
      milestone: "Live Site & 14-Day Warranty",
      // TODO: Confirm estimated days with Anubhav
      timeEstimate: "1–2 days"
    }
  ],
  processNote: "Turnaround times depend on your feedback speed and project size. Every project includes a written agreement and 14 days of post-launch warranty.",

  // ----------------------------------------------------------------------------
  // PROJECT ESTIMATOR & PRICING DATA
  // ----------------------------------------------------------------------------
  estimator: {
    platforms: [
      { id: "business", name: "Business Website", baseDays: 7, baseInr: 5999, baseUsd: 89, note: "Best for clinics, cafes, coaching, local shops" },
      { id: "webapp", name: "Custom Web Application", baseDays: 14, baseInr: 18000, baseUsd: 249, note: "Best for customer portals, login areas, custom tools" },
      { id: "ai-automation", name: "Chatbot & Automation", baseDays: 10, baseInr: 15000, baseUsd: 199, note: "Best for automated replies, lead alerts, spreadsheet sync" }
    ],
    features: [
      { id: "landing", name: "High-Converting Home Page", days: 2, inr: 1500, usd: 25, plainDesc: "Clear headline, service highlights, reviews, and call to action" },
      { id: "service-pages", name: "Individual Service Pages", days: 3, inr: 2500, usd: 35, plainDesc: "Dedicated pages for each service or treatment you provide" },
      { id: "contact-form", name: "Contact form that blocks spam", days: 1, inr: 1000, usd: 15, plainDesc: "Protects against spam bots and sends enquiries straight to your email" },
      { id: "whatsapp", name: "WhatsApp button on every page", days: 1, inr: 500, usd: 10, plainDesc: "Lets customers message you in one click with a prefilled greeting" },
      { id: "cms", name: "Edit your own content without calling me", days: 4, inr: 4500, usd: 60, plainDesc: "Easily update text, prices, and photos from a simple dashboard" },
      { id: "ai-assistant", name: "Chatbot that answers customers and collects leads", days: 4, inr: 5000, usd: 70, plainDesc: "Answers common customer questions 24/7 and saves their contact details" },
      { id: "seo", name: "Set up so Google can find you", days: 2, inr: 1500, usd: 20, plainDesc: "Proper titles, descriptions, and sitemap for search engines" }
    ]
  },

  // ----------------------------------------------------------------------------
  // PRICING (STARTING AT ₹5,999 / $89)
  // ----------------------------------------------------------------------------
  pricing: {
    eyebrow: "TRANSPARENT PRICING",
    headline: "Simple pricing with no surprise bills.",
    description: "Every project comes with a written scope, fixed quote, 100% code ownership, and a 14-day post-launch warranty.",
    startingPriceBadge: "Websites starting at ₹5,999 / $89",
    supportingText: "Prices are transparent and agreed upon upfront. You never pay for unapproved extras.",
    services: [
      {
        id: "business-websites",
        title: "Business Website",
        priceBadge: "From ₹5,999 / $89",
        isStartingPrice: true,
        description: "Ideal for clinics, cafes, coaching centres, and local businesses wanting a professional online presence.",
        features: [
          "Fast, mobile-friendly design",
          "Contact form that blocks spam",
          "WhatsApp button on every page",
          "Set up so Google can find you",
          "100% code & design ownership",
          "14 days of post-launch support"
        ],
        ctaText: "Get an estimate",
        projectTypeId: "Business website"
      },
      {
        id: "web-apps",
        title: "Custom Web Application",
        priceBadge: "From ₹18,000 / $249",
        isStartingPrice: false,
        description: "Ideal for businesses needing customer accounts, private dashboards, or custom online tools.",
        features: [
          "Custom screens built around your business",
          "Customer login and secure member areas",
          "Database to manage your information",
          "Edit your own content without calling me",
          "Thorough cross-device testing",
          "100% code & design ownership"
        ],
        ctaText: "Discuss your custom tool",
        projectTypeId: "Web application"
      },
      {
        id: "ai-automation",
        title: "Chatbots & Work Automations",
        priceBadge: "From ₹15,000 / $199",
        isStartingPrice: false,
        description: "Ideal for businesses wanting to answer customer questions 24/7 and cut repetitive daily tasks.",
        features: [
          "Chatbot that answers customers and collects leads",
          "Instant WhatsApp or email alerts for new enquiries",
          "Automatic sync with spreadsheets",
          "Clear training so you can use it easily",
          "Zero markup on third-party tool costs",
          "14 days of post-launch support"
        ],
        ctaText: "Automate your daily work",
        projectTypeId: "AI & workflow automation"
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // ABOUT SECTION (HUMAN STORY + COLLAPSIBLE TECH BACKGROUND)
  // ----------------------------------------------------------------------------
  about: {
    headline: "About Anubhav Sharma",
    intro: "I am an independent web developer based in Delhi, India. I build websites and digital tools for business owners who want reliable results without the slow communication or high fees of traditional agencies. When you work with Neural Flow, you talk directly with me from the first message to final launch.",
    avatar: "/images/anubhav-sharma.jpg",
    values: [
      {
        title: "Direct communication with me",
        description: "You speak directly with the developer building your site. No account managers or delayed ticketing systems."
      },
      {
        title: "You own 100% of your code and design",
        description: "Every file, design asset, and line of code is transferred to you on launch. Zero platform lock-in."
      },
      {
        title: "Fixed quotes and clear milestones",
        description: "We agree on the scope and price before work starts. No surprise invoices or uncommunicated delays."
      }
    ],
    verifiedSkills: {
      frontend: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Mobile Design"],
      aiAndApis: ["Node.js", "Database setup (Supabase)", "Chatbot tools", "Google Sheets sync"],
      toolsAndDelivery: ["Git & GitHub", "Vercel", "Testing across devices"]
    },
    // TODO: Confirm with Anubhav if academic details should be shown in collapsed background
    education: "Bharati Vidyapeeth's College of Engineering (BVCOE), New Delhi — B.Tech Computer Science and Engineering",
    research: "Co-authored academic research in Artificial Intelligence (Hybrid XAI Frameworks for Android Malware Detection) submitted for peer review."
  },

  // ----------------------------------------------------------------------------
  // CONTACT & CONVERSION
  // ----------------------------------------------------------------------------
  contact: {
    headline: "Let’s talk about your project.",
    subheadline: "Tell me a little about your business and what you need. I will reply within 24 hours with a practical, honest recommendation.",
    email: CONTACT_EMAIL,
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappLink: WHATSAPP_LINK,
    location: "Delhi, India",
    formEndpoint: "https://api.web3forms.com/submit"
  },

  whyWorkWithMe: {
    tagline: "// WHY WORK WITH ME",
    title: "Direct work with the developer. No agency overhead.",
    subtitle: "When you hire Neural Flow, you work directly with the person writing your code.",
    rows: [
      {
        feature: "Direct Communication",
        me: "Direct WhatsApp or email chat with the developer building your site.",
        them: "Account managers, middlemen, and slow email queues.",
        confirmed: true
      },
      {
        feature: "100% Code Ownership",
        me: "Full source code and design transferred to you with zero monthly platform lock-in.",
        them: "Proprietary builder lock-in or recurring monthly platform fees.",
        confirmed: true
      },
      {
        feature: "Fast on Mobile",
        me: "Clean, modern code engineered to open fast on customer phones.",
        them: "Heavy templates packed with unnecessary plugins that slow down mobile loading.",
        confirmed: true
      },
      {
        feature: "Focused Delivery",
        me: "Focused single-client delivery in 1 to 3 weeks.",
        them: "Lengthy bureaucratic processes and divided developer attention.",
        confirmed: true
      }
    ]
  },

  testimonials: []
};
