import type { Skill, Experience, FeatureItem } from '../types';

export const PERSONAL_INFO = {
  name: "Patrick Nance",
  handle: "@pat_dev",
  title: "Software Engineer",
  tagline: "Developing backend, cloud-native SaaS applications, robust REST APIs, and modern data pipelines.",
  location: "Shelbyville, TN",
  email: "cre8.pat.0@gmail.com",
  github: "https://github.com/JPatoChan",
  linkedin: "https://www.linkedin.com/in/pnance94/",
  status: "Available for Software Engineering Roles",
  yearsExperience: "2.5+ Years"
};

export const SKILLS_DATA: Skill[] = [
  // Backend & Cloud Native
  { name: "Java & Spring Boot", category: "backend", level: 95, years: 3, highlight: "Microservices, REST APIs, Security" },
  { name: "Python & Data Pipelines", category: "backend", level: 90, years: 3, highlight: "Airflow, Pandas, ETL, Automation" },
  { name: "SQL & Databases", category: "backend", level: 92, years: 3, highlight: "PostgreSQL, Snowflake, MySQL" },
  
  // Cloud & DevOps
  { name: "AWS & GCP", category: "devops", level: 88, years: 2, highlight: "S3, Cloud Test Environments" },
  { name: "Docker & Kubernetes", category: "devops", level: 85, years: 2, highlight: "Containerization, Orchestration" },
  { name: "CI/CD & Jenkins", category: "devops", level: 85, years: 2, highlight: "Automated Deployment, Git" },

  // Mobile / Frontend
  { name: "Kotlin & Android", category: "mobile", level: 85, years: 2, highlight: "Android Studio, App Development" },
  { name: "React & TypeScript", category: "frontend", level: 82, years: 2, highlight: "Interactive UIs, API Integration" },
  { name: "HTML & CSS", category: "frontend", level: 88, years: 3, highlight: "Responsive Design, Tailwind" },

  // Tools & Monitoring
  { name: "Datadog & Troubleshooting", category: "backend", level: 90, years: 3, highlight: "Log Analysis, Performance Tuning" },
  { name: "Elasticsearch", category: "backend", level: 85, years: 2, highlight: "Search Aliases, Data Purging" },
];

export const EXPERIENCES_DATA: Experience[] = [
  {
    role: "Software Engineer I",
    company: "Smarsh",
    period: "June 2021 - November 2023",
    location: "Remote",
    description: [
      "Delivered 50+ backend and REST API enhancements, integrations, and production fixes for an enterprise Java communication-surveillance platform.",
      "Authored JSON Schemas and implemented YAML, JSON, CFG, and Hadoop configuration conversions for data validation and structured metadata exchange.",
      "Improved Elasticsearch and data-processing performance by resolving search-alias and wildcard-query issues, implementing incremental loads, and supporting data purging.",
      "Remediated Apache Shiro vulnerabilities and penetration-test findings involving HTTP security headers, SSL/TLS, and client-certificate authentication.",
      "Automated unit and integration testing with Kotlin, configured AWS and GCP test environments, and diagnosed memory leaks using Python, SQL, and Datadog."
    ],
    technologies: ["Java", "Spring Boot", "Python", "SQL", "Elasticsearch", "AWS", "Datadog", "Kotlin"]
  },
  {
    role: "Freelance Educator & Consultant",
    company: "Self-Employed",
    period: "Ongoing",
    location: "Middle TN Area",
    description: [
      "Provide private tutoring for aspiring developers, mentoring students on the future of programming, modern web technologies, and software engineering best practices.",
      "Offer specialized private music lessons for local marching band and concert band students, fostering technical proficiency and artistic growth.",
      "Lead philanthropy outreach initiatives, providing dedicated help, community service, and technical resources to individuals and organizations across Middle TN."
    ],
    technologies: ["Programming Instruction", "Music Education", "Community Outreach", "Mentorship", "Philanthropy"]
  }
];

export const PHILOSOPHY_POINTS = [
  {
    title: "People First, Always",
    desc: "Technology is just a tool; the real goal is serving people. I prioritize understanding user needs, uplifting my teammates, and building genuine relationships. Great software is ultimately built by and for great people."
  },
  {
    title: "Unwavering Grit",
    desc: "I believe there are no shortcuts to excellence. I bring high energy, relentless hard work, and a roll-up-my-sleeves mentality to every project, tackling complex engineering challenges head-on until the job is done right."
  },
  {
    title: "Results That Speak",
    desc: "Effort is essential, but execution is everything. I measure my success by tangible outcomes: rock-solid deployments, optimized performance, and real business value. I let my track record and the final product speak for themselves."
  },
  {
    title: "Impact-Driven Mentorship",
    desc: "I don't just want to build great apps; I want to build up the community. Whether I'm mentoring an aspiring developer, teaching music, or writing code, I strive to leave a lasting, positive impact on the world around me."
  }
];

export const FEATURES_LIST: FeatureItem[] = [
  {
    id: "cheese-fidget",
    title: "Cheese-Themed Android Fidget App",
    shortDesc: "Interactive Android app built in Kotlin featuring intensity-based icon scaling, image insertion, and responsive menus.",
    category: "Mobile & Hardware",
    badge: "In Development",
    iconName: "Smartphone"
  },
  {
    id: "audio-transcription",
    title: "AI Audio Transcription App",
    shortDesc: "Full-stack Python & JavaScript application leveraging the open-source OpenAI Whisper model to transcribe audio into text.",
    category: "Tools",
    badge: "AI / Machine Learning",
    iconName: "FileText"
  },
  {
    id: "astronomy-viz",
    title: "Astronomy Data Visualization",
    shortDesc: "React and Python application integrating NASA and Google Maps APIs to interactively visualize Earth and space data.",
    category: "API & Networking",
    badge: "Data Visualization",
    iconName: "Palette"
  },
  {
    id: "task-pulse",
    title: "TaskPulse Micro-Kanban",
    shortDesc: "Persistent productivity task board with priority tags, status progression, and LocalStorage sync.",
    category: "Productivity",
    badge: "Offline Storage",
    iconName: "CheckSquare"
  },
  {
    id: "api-sandbox",
    title: "ApiSandbox Inspector",
    shortDesc: "Simulated REST client testing endpoints, configurable network latency, headers, and formatted JSON.",
    category: "API & Networking",
    badge: "HTTP Simulator",
    iconName: "Terminal"
  },
  {
    id: "dev-converter",
    title: "DevConverter Suite",
    shortDesc: "Swiss-army knife for developers: PX to REM converter, byte units, Unix timestamps, and currency calculator.",
    category: "Tools",
    badge: "Multi-Tool",
    iconName: "Calculator"
  }
];
