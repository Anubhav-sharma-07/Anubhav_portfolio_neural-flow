export const siteContent = {
  brand: {
    name: "Neural Flow",
    founder: "Anubhav Sharma",
    role: "Creative Developer & Software Engineer",
    location: "New Delhi, India · Global Delivery",
    tagline: "A digital object, brought to life.",
    headline: "Digital experiences, built to move businesses forward.",
    supportingCopy: "I design and build modern websites, web applications, and AI-powered solutions for businesses with ambitious ideas.",
    availability: "Available for Q2/Q3 Projects",
    primaryCTA: "Explore My Work",
    secondaryCTA: "Start a Project",
    avatar: "/images/anubhav-sharma.jpg"
  },

  socials: {
    github: "https://github.com/Anubhav-sharma-07",
    linkedin: "https://linkedin.com/in/anubhav8210",
    email: "anubhav8210@bvcoe.edu.in",
    emailAlt: "anubhavsharma.dev@gmail.com",
    instagram: "https://instagram.com/code_orbit7"
  },

  introduction: {
    tag: "SECTION 02 // INTRODUCTION & PHILOSOPHY",
    title: "Engineering digital experiences with intention.",
    subtitle: "Frontend developer and founder of Neural Flow, building production-grade web applications, responsive platforms, and practical AI solutions.",
    body: [
      "I am an independent developer and Computer Science student at BVCOE Delhi. Under my freelance studio Neural Flow, I partner with founders, clinics, local hospitality brands, and ambitious teams to translate requirements into thoughtful, high-performance web products.",
      "Rather than assembling bloated templates or over-decorating with unnecessary effects, I focus on tactile design, fast load times, accessible semantic structure, and direct communication. When you work with me, you collaborate directly with the engineer writing your code."
    ],
    stats: [
      { label: "Core Foundation", value: "React 19 · TypeScript · Node.js" },
      { label: "Turnaround", value: "1 – 3 Weeks Focused Sprints" },
      { label: "Direct Delivery", value: "Zero Agency Overhead" }
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
      problem: "Software candidates lack realistic, objective technical interview practice environments with structured speech and rubric feedback.",
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
      contribution: "Built the high-contrast responsive interface, appointment request workflow, treatment pricing modules, and mobile doctor bios.",
      stack: ["React", "Vite", "Tailwind CSS", "Lucide Icons", "Responsive UI"],
      links: {
        live: "https://neuralflow-cliniva-preview.vercel.app/",
        github: "https://github.com/Anubhav-sharma-07"
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
      contribution: "Created the editorial visual hierarchy, custom cocktail and culinary tabbed menus, gallery grids, and reservation form.",
      stack: ["React", "Vite", "Tailwind CSS", "Google Fonts (Playfair & Outfit)"],
      links: {
        live: "https://cafe-bar-self.vercel.app/",
        github: "https://github.com/Anubhav-sharma-07"
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
      contribution: "End-to-end design, interactive architecture, custom Web Audio synthesis, and performance-tuned bundling.",
      stack: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Web Audio API"],
      links: {
        live: "https://anubhav-portfolio-wine.vercel.app",
        github: "https://github.com/Anubhav-sharma-07"
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
      summary: "Responsive business websites and landing pages.",
      description: "End-to-end conception and engineering of high-performance business websites, marketing pages, and digital brand hubs tailored to commercial goals. Built with modern React and clean semantic markup.",
      deliverable: "Responsive website with sub-second load times, cross-browser compatibility, and 100% source code ownership."
    },
    {
      id: "service-fullstack",
      number: "02",
      title: "Full-Stack Applications",
      summary: "Frontend experiences, backend integration, and APIs.",
      description: "Developing end-to-end web applications pairing expressive, responsive user interfaces with reliable database architectures, authentication systems, serverless functions, and third-party APIs.",
      deliverable: "Production-ready web application with relational data models, role-based access, and optimized query pipelines."
    },
    {
      id: "service-ai-solutions",
      number: "03",
      title: "AI Solutions",
      summary: "Practical AI features and AI-powered application development.",
      description: "Integrating intelligent LLM capabilities into user workflows—including automated data audits, speech interfaces, generative summaries, and natural language query systems that solve real business problems.",
      deliverable: "Custom prompt and model pipelines (Claude, OpenAI, Groq) with structured JSON schemas and error fallbacks."
    },
    {
      id: "service-automation",
      number: "04",
      title: "Automation Systems",
      summary: "Workflows, integrations, and agent-assisted processes.",
      description: "Building automated workflows and background queue processors that connect disparate SaaS tools, synchronize records, eliminate manual spreadsheets, and accelerate operational turnaround.",
      deliverable: "Reliable webhook endpoints, asynchronous job handlers, retry policies, and operational status dashboards."
    }
  ],

  process: [
    {
      step: "01",
      name: "Discover",
      label: "Discovery & Alignment",
      description: "We clarify your business goals, target audience, brand assets, and reference websites. I map out a concise project scope, milestones, and deliverable commitments."
    },
    {
      step: "02",
      name: "Plan",
      label: "Architecture & Layout",
      description: "We establish the technical stack, interface wireframes, data flows, and component hierarchies to ensure logical execution before code is written."
    },
    {
      step: "03",
      name: "Build",
      label: "Precision Sprint Development",
      description: "Writing clean, maintainable code with modern standards. Implementing 3D interactions, responsive matrices, resilient APIs, and accessible controls."
    },
    {
      step: "04",
      name: "Refine",
      label: "Testing, QA & Polish",
      description: "Rigorous cross-device audit, Core Web Vitals profiling, animation performance tuning, keyboard navigation verification, and edge-case testing."
    },
    {
      step: "05",
      name: "Launch",
      label: "Deployment & Handover",
      description: "Deploying to production infrastructure with custom domain SSL, Git repository transfer, documentation walkthrough, and post-launch support."
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
      creative3d: ["GSAP & ScrollTrigger", "Interactive Canvas", "CSS Perspective", "Web Audio API"],
      toolsAndApis: ["Vite", "Git & GitHub", "Vercel", "REST APIs", "Claude & Groq AI APIs", "Supabase"]
    }
  },

  contact: {
    headline: "Have an idea worth building?",
    subheadline: "Whether you need a new website from scratch, an upgrade to your existing platform, or custom frontend development, let's talk through your goals.",
    guarantee: "I typically reply within 24 hours with honest scope advice, timeline estimates, and transparent pricing."
  }
};
