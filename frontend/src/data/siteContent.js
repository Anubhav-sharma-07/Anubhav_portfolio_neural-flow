import { CONTACT_EMAIL, IDENTITY_LINE } from '../config/site';

/**
 * ==============================================================================
 * CANONICAL SITE CONTENT & VERIFIABLE CLAIMS
 * ==============================================================================
 * All numbers, claims, and case studies rendered across the portfolio stem from this file.
 * Any field marked with TODO represents pending verified data from the user.
 * Sections with empty data arrays hide themselves cleanly without showing placeholders.
 */

export const siteContent = {
  brand: {
    name: "Neural Flow",
    founder: "Anubhav Sharma",
    role: "Web Developer & AI Automation Specialist",
    location: "New Delhi, India · Global Delivery",
    tagline: IDENTITY_LINE,
    headlinePrefix: "I build ",
    headlineSuffix: " that help businesses grow.",
    rotatingWords: [
      "websites",
      "AI automations",
      "web apps",
      "intelligent systems"
    ],
    subtext: "Fast, modern web applications and practical AI workflows engineered for clinics, cafes, founders, and growing businesses.",
    availability: "Available for Projects",
    primaryCTA: {
      label: "Hire me",
      href: "#contact"
    },
    secondaryCTA: {
      label: "View my work",
      href: "#projects"
    },
    avatar: "/images/anubhav-sharma.jpg"
  },

  socials: {
    github: "https://github.com/Anubhav-sharma-07",
    linkedin: "https://www.linkedin.com/in/anubhav-sharma-51347628a/",
    email: CONTACT_EMAIL,
    instagram: "https://instagram.com/code_orbit7"
  },

  // ----------------------------------------------------------------------------
  // TRUST STRIP (COUNT-UP STATS)
  // RULE: Strip cleanly hides if fewer than 3 verified numbers exist.
  // ----------------------------------------------------------------------------
  trustStats: [
    {
      id: "projects-shipped",
      value: 5,
      prefix: "",
      suffix: "+",
      label: "Live Projects & Platforms",
      description: "Tested production apps and client builds"
    },
    {
      id: "tech-mastered",
      value: 12,
      prefix: "",
      suffix: "+",
      label: "Modern Technologies",
      description: "React 19, Next.js, Supabase, Groq AI"
    },
    {
      id: "years-building",
      value: 3,
      prefix: "",
      suffix: "+",
      label: "Years Engineering Software",
      description: "CSE degree track + independent delivery"
    }
    // TODO: Add further verifiable metrics here (e.g. audited client hours, etc.)
  ],

  // ----------------------------------------------------------------------------
  // SERVICES BENTO
  // ----------------------------------------------------------------------------
  services: [
    {
      id: "web-dev",
      number: "01",
      title: "Web Development",
      badge: "Speed & Conversion",
      value: "High-performance business websites that turn casual visitors into paying clients.",
      description: "Clean, responsive websites engineered with React, semantic HTML5, and mobile-first layouts.",
      deliverable: "Responsive site with sub-second load times and 100% source code ownership."
    },
    {
      id: "ai-automation",
      number: "02",
      title: "AI Automation",
      badge: "Practical Intelligence",
      value: "Custom AI workflows that eliminate repetitive manual data entry and save hours weekly.",
      description: "Practical integrations using Groq, Claude, and OpenAI APIs with structured JSON outputs and safety limits.",
      deliverable: "Automated webhook pipelines, background sync jobs, and resilient error fallbacks."
    },
    {
      id: "product-mvps",
      number: "03",
      title: "Product MVPs",
      badge: "Idea to Production",
      value: "Production-ready full-stack applications delivered in focused 2–3 week sprints.",
      description: "End-to-end web apps pairing intuitive frontends with secure Supabase/Node databases and authentication.",
      deliverable: "Production-ready app with clean REST APIs, role-based access, and deployment config."
    },
    {
      id: "redesigns",
      number: "04",
      title: "Performance & UI Redesigns",
      badge: "Modernization",
      value: "Modernizing outdated legacy websites to elevate brand perception and stop mobile drop-offs.",
      description: "Transforming slow, clunky sites into crisp, tactile experiences with 95+ Core Web Vitals.",
      deliverable: "Lighthouse mobile audit score 90+, WCAG AA contrast, and zero layout shift."
    }
  ],

  // ----------------------------------------------------------------------------
  // PROJECTS & CASE STUDIES
  // ----------------------------------------------------------------------------
  projects: [
    {
      id: "spendlens",
      title: "SpendLens (Credex Audit)",
      subtitle: "AI-Powered SaaS Spend Auditor",
      category: "Production Full-Stack App",
      badgeType: "Production Build",
      year: "2024",
      summary: "A production SaaS application that audits team AI subscription spend, tracks active developer seats, runs efficiency score simulations using LLMs, and drafts automated saving recommendations.",
      problem: "Tech teams overspend on redundant AI tools, unassigned developer seats, and recurring licenses without clear usage visibility.",
      role: "Full-Stack Architecture & AI Integration",
      contribution: "Architected the full responsive dashboard, database schema, AI recommendation engine via Groq LLM API, and CSV export pipelines.",
      stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase", "Groq AI API"],
      links: {
        live: "https://credex-audit-eight.vercel.app/",
        github: "https://github.com/Anubhav-sharma-07/credex-audit"
      },
      image: "/projects/spendlens.webp",
      highlights: [
        "Interactive analytics dashboard with cost breakdown by department",
        "Automated AI recommendations highlighting duplicate subscriptions",
        "Exportable PDF/CSV financial audit reports"
      ],
      // Sample data notification pings for SpendLens card
      samplePings: [
        { id: 1, text: "Potential duplicate seat flagged: $40/mo saving", label: "Sample data" },
        { id: 2, text: "Underutilized license detected in Design team", label: "Sample data" }
      ],
      hasCursorTour: true
    },
    {
      id: "aura-interview",
      title: "Aura Interview Platform",
      subtitle: "Adaptive AI Technical Screener",
      category: "AI Web Application",
      badgeType: "Personal Project",
      year: "2024",
      summary: "An interactive browser-based platform enabling engineering candidates to practice technical and behavioral mock interviews with real-time speech capture and automated evaluation rubrics.",
      problem: "TODO: Define specific problem statement for Aura Interview",
      role: "Frontend Engineering & Speech Recognition State Machine",
      contribution: "Designed and implemented the speech recognition pipeline, interview pacing state machine, and automated rubric scoring UI.",
      stack: ["React", "Node.js", "Web Speech API", "AI Evaluation API", "Tailwind CSS"],
      links: {
        live: null,
        github: "https://github.com/Anubhav-sharma-07/ai-mock-interview-platform"
      },
      image: null, // Styled placeholder
      highlights: [
        "Speech recognition interface with active timers and prompt progression",
        "Multi-track technical evaluation rubrics (DSA, System Design, Behavioral)",
        "Structured scorecards evaluating communication clarity"
      ]
    },
    {
      id: "cliniva",
      title: "Cliniva Healthcare & Dental",
      subtitle: "Modern Clinic Patient Experience",
      category: "Healthcare Digital Platform",
      badgeType: "Client Concept",
      year: "2024",
      summary: "A modern digital front door for medical and dental clinics, replacing antiquated clinic websites with transparent treatment guides and responsive appointment booking.",
      problem: "Local healthcare practices suffer from outdated, non-responsive websites that lose prospective patients before they can book an appointment.",
      role: "UI/UX Design & Responsive Frontend Development",
      contribution: "Built the high-contrast responsive interface, appointment request workflow, treatment pricing modules, and mobile doctor bios.",
      stack: ["React", "Vite", "Tailwind CSS", "Lucide Icons", "Responsive UI"],
      links: {
        live: "https://neuralflow-cliniva-preview.vercel.app/",
        github: null
      },
      image: "/projects/cliniva.webp",
      highlights: [
        "Accessible, mobile-optimized patient appointment request flow",
        "Transparent procedure pricing cards and doctor credentials",
        "Sub-second load times engineered for mobile patients"
      ],
      // Draggable Before/After comparison configuration
      // RULE: Only use a real "before". If none exists, this feature hides itself cleanly.
      beforeAfter: {
        beforeImage: null, // TODO: Supply real original clinic website screenshot to enable slider
        afterImage: "/projects/cliniva.webp",
        beforeLabel: "Original Website",
        afterLabel: "Cliniva Redesign"
      }
    },
    {
      id: "socio-bar",
      title: "SOCIO Kitchen & Bar",
      subtitle: "Luxury Rooftop & Social Dining",
      category: "Hospitality Web Experience",
      badgeType: "Client Concept",
      year: "2024",
      summary: "An aesthetic web experience for a premier rooftop dining destination in Pune, featuring interactive menus, Sunday brunch showcases, and a mobile reservation portal.",
      problem: "Upscale hospitality venues need digital touchpoints that match their interior atmosphere and convert casual visitors into table bookings.",
      role: "Editorial Web Design & Frontend Development",
      contribution: "Created the editorial visual hierarchy, custom cocktail and culinary tabbed menus, gallery grids, and reservation form.",
      stack: ["React", "Vite", "Tailwind CSS", "Google Fonts (Playfair & Outfit)"],
      links: {
        live: "https://cafe-bar-self.vercel.app/",
        github: null
      },
      image: "/projects/socio-bar.webp",
      highlights: [
        "Rich editorial layout with earth-toned aesthetics matching restaurant vibe",
        "Interactive food and handcrafted cocktail menu tabs",
        "Table reservation enquiry interface"
      ],
      beforeAfter: {
        beforeImage: null, // TODO: Supply real original cafe website screenshot to enable slider
        afterImage: "/projects/socio-bar.webp",
        beforeLabel: "Original Menu Page",
        afterLabel: "SOCIO Digital Experience"
      }
    },
    {
      id: "personal-portfolio",
      title: "Creative Developer Portfolio",
      subtitle: "Creative Developer Flagship",
      category: "Flagship Web Experience",
      badgeType: "Production Build",
      year: "2024",
      summary: "Personal flagship portfolio demonstrating modern creative engineering, custom Web Audio synthesis, and editorial responsive layouts.",
      problem: "Creative developers need a distinctive digital presence that immediately conveys both aesthetic maturity and rigorous frontend engineering.",
      role: "End-to-End Design & Frontend Engineering",
      contribution: "End-to-end design, interactive architecture, custom Web Audio synthesis, and performance-tuned bundling.",
      stack: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Web Audio API"],
      links: {
        live: "https://anubhav-portfolio-wine.vercel.app",
        github: "https://github.com/Anubhav-sharma-07/Anubhav_portfolio_neural-flow"
      },
      image: "/projects/personal-portfolio.webp",
      highlights: [
        "Custom Web Audio synthesizer for tactile haptic feedback",
        "Interactive Studio Blueprint Console with live telemetry",
        "Strict editorial color alternation and accessible contrast"
      ]
    }
  ],

  // ----------------------------------------------------------------------------
  // PROCESS (4 STEPS FOR SVG DRAW PATH)
  // ----------------------------------------------------------------------------
  processSteps: [
    {
      number: "01",
      title: "Brief",
      description: "We clarify your exact goals, target users, and deliverable commitments."
    },
    {
      number: "02",
      title: "Design",
      description: "Wireframes and mobile user flows defined before writing production code."
    },
    {
      number: "03",
      title: "Build",
      description: "Clean React code, robust APIs, and fluid motion in focused 1–2 week sprints."
    },
    {
      number: "04",
      title: "Launch",
      description: "Cross-device testing, production deployment, and 100% source code handover."
    }
  ],

  // ----------------------------------------------------------------------------
  // WHY WORK WITH ME (US VS THEM COMPARISON)
  // Honest, true-to-life claims for an independent specialist
  // ----------------------------------------------------------------------------
  whyWorkWithMe: {
    tagline: "// WHY WORK WITH ME",
    title: "Direct engineering, zero agency overhead.",
    subtitle: "When you hire Neural Flow, you collaborate directly with the senior developer building your product.",
    rows: [
      {
        feature: "Direct Communication",
        me: "Direct access to the developer writing your code via Slack or WhatsApp.",
        them: "Account managers, middlemen, and slow ticketing queues.",
        confirmed: true
      },
      {
        feature: "100% Code Ownership",
        me: "Clean GitHub repository transferred to you with full rights and zero lock-in.",
        them: "Proprietary builder lock-in, recurring hosting fees, or hidden exit costs.",
        confirmed: true
      },
      {
        feature: "Performance & Mobile First",
        me: "Custom React/Vite builds targeting 90+ mobile Lighthouse scores and sub-second loads.",
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

  // ----------------------------------------------------------------------------
  // PRICING / ENGAGEMENT (OPTIONAL)
  // RULE: Only render prices if real numbers are provided.
  // Otherwise render a Fixed project / Monthly support toggle with quote CTA.
  // ----------------------------------------------------------------------------
  pricing: {
    hasRealPrices: false, // TODO: Set to true and supply amounts when pricing is published
    models: [
      {
        id: "fixed-project",
        title: "Fixed Project",
        subtitle: "Best for new websites, MVPs & redesigns",
        description: "Agreed scope, clear milestones, and a guaranteed fixed investment with no surprise billing.",
        deliverables: [
          "Complete project roadmap & milestones",
          "Dedicated sprint delivery (1–3 weeks)",
          "100% source code handover on launch",
          "14 days post-launch warranty support"
        ],
        ctaText: "Get a project quote"
      },
      {
        id: "monthly-support",
        title: "Monthly Support & Automations",
        subtitle: "Best for ongoing development & AI updates",
        description: "Ongoing developer bandwidth to ship feature requests, automate workflows, and maintain performance.",
        deliverables: [
          "Continuous feature development & optimizations",
          "Workflow automations (Zapier, webhooks, LLMs)",
          "Regular performance & security audits",
          "Direct priority communication channel"
        ],
        ctaText: "Discuss retainer"
      }
    ]
  },

  // ----------------------------------------------------------------------------
  // TESTIMONIALS
  // HARD RULE: Only render if testimonials array has real, verified entries.
  // Currently empty — the entire section hides cleanly until real reviews exist.
  // ----------------------------------------------------------------------------
  testimonials: [
    // TODO: Add verified client testimonials here once gathered:
    // {
    //   id: "client-1",
    //   name: "Client Name",
    //   role: "Founder at Company",
    //   quote: "Real verified feedback...",
    //   verifiedProject: "Cliniva"
    // }
  ],

  // ----------------------------------------------------------------------------
  // ABOUT & CAPABILITIES
  // ----------------------------------------------------------------------------
  about: {
    headline: "Frontend developer with an engineering foundation.",
    paragraphs: [
      "I am an independent developer completing my B.Tech in Computer Science and Engineering at Bharati Vidyapeeth's College of Engineering (BVCOE), New Delhi (Class of 2027). Under Neural Flow, I work with businesses to design and build reliable, memorable software.",
      "In addition to client frontend development, I conduct applied academic research in Explainable Artificial Intelligence (XAI), including a co-authored research paper on Hybrid XAI Frameworks for Android Malware Detection currently under IEEE conference review.",
      "I approach freelance client work as a trusted technical partner: direct communication, disciplined milestones, clean code, and zero hidden overhead."
    ],
    skills: {
      frontend: ["React 19", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 & CSS3"],
      aiAndApis: ["Claude API", "Groq AI API", "Web Speech API", "REST APIs", "Supabase", "Node.js"],
      toolsAndDelivery: ["Vite", "Git & GitHub", "Vercel", "Web Audio API", "Responsive Design"]
    }
  },

  // ----------------------------------------------------------------------------
  // CONTACT
  // ----------------------------------------------------------------------------
  contact: {
    headline: "Have a project in mind?",
    subheadline: "Whether you need a new website, a faster redesign, or practical AI features, let's discuss your timeline and goals.",
    guarantee: "I typically reply within 24 hours with honest scope advice, timeline estimates, and clear pricing.",
    formEndpoint: "https://api.web3forms.com/submit"
  }
};
