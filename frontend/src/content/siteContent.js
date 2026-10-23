import { CONTACT_EMAIL, SITE_URL, IDENTITY_LINE } from '../config/site';

export const siteContent = {
  brand: {
    name: "Neural Flow",
    founder: "Anubhav Sharma",
    role: "Frontend Developer & AI Solutions Builder",
    location: "New Delhi, India · Global Delivery",
    tagline: IDENTITY_LINE,
    headline: "Fast, modern websites and practical AI tools.",
    supportingCopy: IDENTITY_LINE,
    availability: "Available for Projects",
    primaryCTA: "Start a project",
    secondaryCTA: "Selected Work",
    avatar: "/images/anubhav-sharma.jpg"
  },

  socials: {
    github: "https://github.com/Anubhav-sharma-07",
    linkedin: "https://www.linkedin.com/in/anubhav-sharma-51347628a/",
    email: CONTACT_EMAIL,
    instagram: "https://instagram.com/code_orbit7"
  },

  introduction: {
    tag: "// ABOUT",
    title: "Engineering digital experiences with intention.",
    subtitle: "Frontend developer and founder of Neural Flow, building production-grade web applications, responsive platforms, and practical AI solutions.",
    body: [
      "I am an independent developer completing my B.Tech in Computer Science and Engineering at Bharati Vidyapeeth's College of Engineering (BVCOE), New Delhi. Under my freelance studio Neural Flow, I partner with founders, clinics, local hospitality brands, and ambitious teams to translate requirements into thoughtful, high-performance web products.",
      "Rather than assembling bloated templates or over-decorating with unnecessary effects, I focus on tactile design, fast load times on phones, accessible semantic structure, and direct communication. When you work with me, you collaborate directly with the engineer writing your code."
    ],
    stats: [
      { label: "Core Stack", value: "React 19 · TypeScript · Vite" },
      { label: "Turnaround", value: "1 – 3 Weeks Focused Sprints" },
      { label: "Direct Delivery", value: "100% Code Ownership" }
    ]
  },

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
      highlights: [
        "Interactive analytics dashboard with cost breakdown by department",
        "Automated AI recommendations highlighting duplicate subscriptions",
        "Exportable PDF/CSV financial audit reports"
      ]
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
      highlights: [
        "Accessible, mobile-optimized patient appointment request flow",
        "Transparent procedure pricing cards and doctor credentials",
        "Sub-second load times engineered for mobile patients"
      ]
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
      highlights: [
        "Rich editorial layout with earth-toned aesthetics matching restaurant vibe",
        "Interactive food and handcrafted cocktail menu tabs",
        "Table reservation enquiry interface"
      ]
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
      highlights: [
        "Custom Web Audio synthesizer for tactile haptic feedback",
        "Interactive Studio Blueprint Console with live telemetry",
        "Strict editorial color alternation and accessible contrast"
      ]
    }
  ],

  services: [
    {
      id: "service-web-dev",
      number: "01",
      title: "Web Development",
      summary: "Fast, modern business websites that convert visitors.",
      description: "End-to-end design and engineering of high-performance business websites, clinic portals, and hospitality experiences. Built with modern React, semantic structure, and mobile-first responsiveness.",
      deliverable: "Responsive website with sub-second load times, cross-browser compatibility, and 100% source code ownership."
    },
    {
      id: "service-fullstack",
      number: "02",
      title: "Full-Stack Web Apps",
      summary: "Interactive portals, dashboards, and custom web applications.",
      description: "Developing end-to-end web applications pairing intuitive user interfaces with reliable database architectures, authentication systems, serverless endpoints, and third-party APIs.",
      deliverable: "Production-ready web application with secure data models, role-based access, and clear APIs."
    },
    {
      id: "service-ai-solutions",
      number: "03",
      title: "Practical AI Solutions",
      summary: "Useful AI features that solve real workflow bottlenecks.",
      description: "Integrating practical LLM capabilities (Claude, Groq, OpenAI) into business workflows—including automated data audits, speech interfaces, generative summaries, and natural language query systems.",
      deliverable: "Custom prompt and model pipelines with structured JSON outputs, safety limits, and error fallbacks."
    },
    {
      id: "service-automation",
      number: "04",
      title: "Workflow Automation",
      summary: "Connecting tools and automating repetitive manual tasks.",
      description: "Building background tasks, webhooks, and automated data syncing between business tools to eliminate manual data entry and accelerate operational turnaround.",
      deliverable: "Reliable background sync jobs, webhook handlers, retry policies, and operational dashboards."
    }
  ],

  process: [
    {
      step: "01",
      name: "Scope",
      label: "We agree on goals and scope",
      description: "We clarify your business goals, target audience, brand assets, and reference websites. I map out a concise project scope, milestones, and deliverable commitments."
    },
    {
      step: "02",
      name: "Structure",
      label: "Clear page structure before building",
      description: "We establish the interface wireframes, component hierarchy, and data requirements to ensure logical execution before code is written."
    },
    {
      step: "03",
      name: "Build",
      label: "Clean code & focused delivery",
      description: "Writing clean, maintainable code with modern standards. Implementing fluid responsiveness, robust APIs, and accessible controls."
    },
    {
      step: "04",
      name: "Test",
      label: "Tested across phones and browsers",
      description: "Rigorous cross-device testing on iOS and Android, performance profiling, keyboard navigation verification, and edge-case testing."
    },
    {
      step: "05",
      name: "Handover",
      label: "Live launch and full code handover",
      description: "Deploying to production infrastructure with custom domain SSL, Git repository transfer, and post-launch support."
    }
  ],

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

  contact: {
    headline: "Have a project in mind?",
    subheadline: "Whether you need a new website, a faster redesign, or practical AI features, let's discuss your timeline and goals.",
    guarantee: "I typically reply within 24 hours with honest scope advice, timeline estimates, and clear pricing."
  }
};
