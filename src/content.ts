export const SOCIALS = {
  github: { label: "@avinav-b", href: "https://github.com/avinav-b" },
  linkedin: { label: "/in/avinav-bhandari", href: "https://www.linkedin.com/in/avinav-bhandari" },
  email: { label: "avinavbhandari@gmail.com", href: "mailto:avinavbhandari@gmail.com" },
};

export const RESUME_HREF = "/resume.pdf";

export type Entry = {
  id: string;
  dates: string;
  title: string;
  org?: string;
  orgHref?: string;
  context?: string;
  summary: string;
  highlights: string[];
  tags: string[];
  github?: string;
  images?: { src: string; caption: string }[];
};

export const EXPERIENCES: Entry[] = [
  {
    id: "bibliocommons",
    dates: "may 2025 — present",
    title: "Software Engineering Intern, AI & Full Stack",
    org: "BiblioCommons",
    orgHref: "https://www.bibliocommons.com",
    summary:
      "Building AI tooling and full-stack features for library software used by 20M+ patrons, from a company-wide RAG platform to production bug fixes.",
    highlights: [
      "Architected a RAG platform (Spring AI, pgvector) over 50,000+ documents, reaching 70% company-wide adoption and cutting retrieval time 80%.",
      "Built an agentic AI SRE assistant over Sumo Logic, Prometheus, Checkmk and Confluence/Jira; cut incident resolution time 50%+ and doubled the on-call pool.",
      "Cut p95 latency up to 50% on a REST API serving 20M+ users by optimizing database queries and business logic.",
      "Raised RAG retrieval accuracy to 95% on a labelled eval set with retrieval agents that re-query when context is missing.",
      "Closed 100+ production bugs for 250+ library customers and shipped WCAG 2.2-compliant React features.",
    ],
    tags: ["Java", "Spring AI", "pgvector", "React", "Rails", "ActiveMQ"],
  },
  {
    id: "rheely",
    dates: "jan 2026 — present",
    title: "Co-Founder & Lead Engineer",
    org: "Rheely",
    orgHref: "https://rheely.com",
    summary:
      "Co-founded a media provenance platform and own all of its engineering, taking it from pre-revenue to 2+ enterprise news customers.",
    highlights: [
      "Engineered a capture-integrity pipeline (custom ML models, App Attest, Play Integrity, device signals) that detects emulators, replays and recaptured media.",
      "Shipped a React Native/Expo app with native Kotlin/Swift modules for capture, pixel signing and motion sensing; 0 to 1,000+ users.",
      "Stood up the Django backend and infrastructure from scratch: Postgres, Redis, S3, GitHub Actions CI/CD and Sentry.",
      "Wrote the technical specification that passed external C2PA conformance assessment, placing Rheely on the official C2PA conformance list.",
    ],
    tags: ["React Native", "Expo", "Kotlin", "Swift", "Django", "Postgres"],
  },
  {
    id: "draftparty2",
    dates: "may 2024 — aug 2024",
    title: "Software Engineering Intern, Full Stack",
    org: "Draft Party",
    orgHref: "https://draftparty.net",
    summary:
      "Built backend and account features for a trivia platform played in a sports-draft format, used for corporate team-building.",
    highlights: [
      "Built a daily game mode on Cloudflare Workers and Durable Objects.",
      "Built 20+ TypeScript/Node.js REST endpoints for accounts (signup, email verification, password reset, JWT), tested with Jest.",
      "Built the Vue/Nuxt account dashboard and login flow, including daily-game email subscriptions.",
    ],
    tags: ["TypeScript", "Node.js", "Cloudflare Workers", "Vue/Nuxt", "Jest"],
  },
  {
    id: "draftparty1",
    dates: "jan 2024 — may 2024",
    title: "Jr. Part-time Frontend Software Developer",
    org: "Draft Party",
    orgHref: "https://draftparty.net",
    summary: "Rebuilt the Draft Party website from the ground up, translating UI/UX mock-ups into a responsive frontend.",
    highlights: [
      "Rebuilt the site in Vue/Nuxt and TypeScript with responsive layouts for 800+ players.",
      "Built a new leaderboard page that helped win several new corporate customers shortly after release.",
    ],
    tags: ["Vue/Nuxt", "TypeScript", "CSS"],
  },
  {
    id: "mechamayhem",
    dates: "feb 2022 — present",
    title: "Event Software & Livestream Lead",
    org: "Mecha Mayhem",
    orgHref: "https://mechamayhem.ca",
    summary:
      "Serve on the central leadership team of Canada's largest robotics tournament, which is entirely volunteer-run, and lead the software behind it.",
    highlights: [
      "Lead a 6-person team building a React Native/Expo app used by 400+ competitors each year.",
      "Build React event-management software used by 100+ staff to run the competition and track volunteers.",
      "Built real-time livestream graphics driven by live match data over MQTT and WebSockets, seen by 5,000+ viewers.",
      "Released tm-switcher (TypeScript/Electron), automating OBS livestreams from VEX Tournament Manager; adopted by other VEX events.",
    ],
    tags: ["React", "React Native", "Electron", "MQTT", "WebSockets"],
  },
  {
    id: "rocketry",
    dates: "sep 2022 — may 2024",
    title: "Avionics/Software Developer",
    org: "UTAT Rocketry",
    orgHref: "https://www.utat.ca/rocketry",
    summary:
      "Developed avionics software on a ~20-person hybrid-rocket team, placing 3rd (2023) and 2nd (2024) at Launch Canada among 30+ teams.",
    highlights: [
      "Wrote a headless C/C++ Linux app on a Raspberry Pi 4 driving GPIO to run the fuelling system; fuelled the rocket successfully on launch day.",
      "Led development of a C++ backend that parsed thermocouple data and transferred it reliably over a small local network.",
      "Built Python tools to parse and store GPS/GNSS telemetry for live tracking of the rocket from the ground.",
    ],
    tags: ["C/C++", "Linux", "Raspberry Pi", "Python"],
  },
];

export const PROJECTS: Entry[] = [
  {
    id: "krumbz",
    dates: "may 2024 — present",
    title: "Krumbz Recipe App",
    context: "personal project",
    summary: "A React Native recipe app that matches the ingredients you have on hand to 1,000+ recipes you can cook.",
    highlights: [
      "Built a Go REST API with 25+ endpoints and JWT authentication on PostgreSQL, containerized with Docker and deployed on Google Cloud Run.",
      "Built ingredient matching that combines string-matching algorithms with an agentic LLM pipeline for semantic reasoning over recipes.",
      "Lets users set macronutrient goals and add ingredients with their camera.",
    ],
    tags: ["React Native", "Go", "PostgreSQL", "Docker", "Cloud Run", "LLMs"],
  },
  {
    id: "cpu",
    dates: "may 2024 — may 2025",
    title: "Breadboard CPU & Custom Instruction Set",
    context: "personal project",
    summary: "A working 8-bit CPU built on breadboards from 74LS-series logic-gate ICs, with a variable-speed clock.",
    highlights: [
      "Built an ALU supporting addition, subtraction, shifts and logic operations from simple logic gates.",
      "Implemented memory, a 4-register file and a program counter.",
      "Designed a custom 13-instruction ISA with bespoke opcodes to load and run multi-step programs.",
    ],
    tags: ["Digital logic", "74LS ICs", "ISA design"],
    images: [{ src: "/png/cpu1.png", caption: "alu of the 8-bit breadboard cpu" }],
  },
  {
    id: "niosorbit",
    dates: "jan 2024 — may 2024",
    title: "Rocket Projectile Simulator",
    context: "ece243, university of toronto",
    summary:
      "A physics-based projectile simulator disguised as a rocket game, running bare-metal (no OS) on a Nios II soft processor on a DE1-SoC FPGA.",
    highlights: [
      "Players pick a planet (gravity, air resistance), launch angle and velocity, then watch the trajectory and telemetry; make orbit to win.",
      "Wrote C drivers for a 640x480 60 Hz VGA display with double buffering.",
      "Wrote a PS/2 keyboard driver for player input.",
    ],
    tags: ["C", "Nios II", "FPGA", "VGA", "PS/2"],
    github: "https://github.com/avinav-b/nios-orbit",
    images: [
      { src: "/png/niosorbit1.png", caption: "start screen" },
      { src: "/png/niosorbit4.png", caption: "launch screen, where players pick launch parameters" },
      { src: "/png/niosorbit2.png", caption: "trajectory and telemetry in flight" },
      { src: "/png/niosorbit3.png", caption: "end screen after reaching orbit" },
    ],
  },
  {
    id: "mapper",
    dates: "jan 2024 — may 2024",
    title: "OpenStreetMap City Mapper",
    summary: "A C++ city map application for Linux with a GTK GUI and turn-by-turn directions.",
    highlights: [
      "Renders streets, street names, buildings and points of interest with panning and zooming.",
      "Uses over 2 million data points for 10+ cities from OpenStreetMap.",
      "Finds directions between any two points with Dijkstra's shortest path algorithm.",
    ],
    tags: ["C++", "GTK", "Linux", "Algorithms"],
  },
  {
    id: "humanbenchmark",
    dates: "sep 2023 — dec 2023",
    title: "FPGA Human Benchmark Games",
    context: "ece241, university of toronto",
    summary:
      "Human Benchmark-style reaction-time and chimp-memory games built entirely in Verilog/SystemVerilog on a DE1-SoC FPGA.",
    highlights: [
      "Implemented a double-buffered VGA display pipeline.",
      "Added PS/2 mouse input with an on-screen cursor for point-and-click gameplay.",
      "Showed the top reaction time, in ms, on the 7-segment display.",
    ],
    tags: ["Verilog", "SystemVerilog", "FPGA", "VGA"],
    github: "https://github.com/avinav-b/FPGA_human_benchmark",
  },
];
