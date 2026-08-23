export const CAREER_STATS = [
  { icon: "ClipboardCheck", value: 5000, suffix: "+", label: "Audits Completed", description: "Ensuring building safety across India" },
  { icon: "Users", value: 400, suffix: "+", label: "Societies Served", description: "Trusted by societies across Mumbai" },
  { icon: "Award", value: 35, suffix: "+", label: "Experts", description: "Experienced engineers & professionals" },
];

export const OPEN_ROLES = [
  {
    icon: "HardHat",
    title: "Site Engineer",
    experience: "Fresher / Experienced",
    description:
      "Oversee day-to-day site activities, coordinate with contractors and maintain quality and safety on active project sites.",
    skills: ["Site Supervision", "AutoCAD", "Reporting"],
  },
  {
    icon: "Building2",
    title: "Structural Engineer",
    experience: "2+ Years Experience",
    description:
      "Conduct structural audits and design repair solutions, ensuring every recommendation meets safety and compliance standards.",
    skills: ["Structural Audits", "STAAD Pro", "NDT"],
  },
  {
    icon: "FolderKanban",
    title: "Project Coordinator",
    experience: "Fresher / Experienced",
    description:
      "Coordinate schedules, resources and communication across survey, tendering and PMC teams to keep projects on track.",
    skills: ["Coordination", "MS Excel", "Documentation"],
  },
  {
    icon: "Grid3x3",
    title: "AutoCAD Engineer",
    experience: "Fresher / Experienced",
    description:
      "Translate site survey findings into detailed AutoCAD drawings marking deterioration and proposed repair zones.",
    skills: ["AutoCAD", "Drafting", "Detailing"],
  },
  {
    icon: "TrendingUp",
    title: "Power BI Analyst",
    experience: "Fresher / Experienced",
    description:
      "Build dashboards and reports on the WISE ONE platform that turn project and audit data into actionable insights.",
    skills: ["Power BI", "Data Analysis", "SQL"],
  },
  {
    icon: "Handshake",
    title: "CRM Executive",
    experience: "Fresher / Experienced",
    description:
      "Manage client relationships and follow-ups end to end, keeping societies informed and satisfied at every stage.",
    skills: ["CRM Tools", "Client Servicing", "Communication"],
  },
  {
    icon: "Users",
    title: "HR Executive",
    experience: "Fresher / Experienced",
    description:
      "Support recruitment, onboarding and employee engagement as WISE grows its in-house team of professionals.",
    skills: ["Recruitment", "Onboarding", "HRMS"],
  },
  {
    icon: "Calculator",
    title: "Accounts Executive",
    experience: "Fresher / Experienced",
    description:
      "Handle day-to-day bookkeeping, invoicing and vendor reconciliation to keep project finances accurate and current.",
    skills: ["Tally", "GST", "Reconciliation"],
  },
  {
    icon: "Megaphone",
    title: "Marketing Executive",
    experience: "Fresher / Experienced",
    description:
      "Drive brand visibility and lead generation across digital and offline channels for our Mumbai operations.",
    skills: ["Digital Marketing", "Content", "Lead Gen"],
  },
  {
    icon: "GraduationCap",
    title: "Internships",
    experience: "Engineering & Management",
    description:
      "Get hands-on exposure to real structural audits and project management under the guidance of senior engineers.",
    skills: ["Learning", "Site Exposure", "Mentorship"],
  },
];

export const WHY_JOIN_WISE = [
  {
    title: "Work on real engineering projects",
    description: "Contribute to live structural audits and repair projects across Mumbai from day one.",
  },
  {
    title: "Exposure to latest technologies & WISE ONE platform",
    description: "Get hands-on with our proprietary WISE Intelligent Operations & Network Engine.",
  },
  {
    title: "Learn from experienced professionals",
    description: "Work alongside 35+ experts who bring years of structural engineering expertise.",
  },
  {
    title: "Continuous learning & skill development",
    description: "Regular training and upskilling opportunities to grow your technical and professional skills.",
  },
  {
    title: "Supportive & collaborative environment",
    description: "A flat, team-first culture where every voice is heard and every contribution matters.",
  },
  {
    title: "Clear growth path & leadership opportunities",
    description: "Defined career progression with real opportunities to step into leadership roles.",
  },
];

export const HIRING_PROCESS = [
  { step: "01", icon: "FileText", title: "Submit Application", description: "Share your updated resume for the role you're interested in." },
  { step: "02", icon: "ScanSearch", title: "Resume Screening", description: "Our HR team reviews your profile against the role requirements." },
  { step: "03", icon: "MessageCircle", title: "Technical Discussion", description: "A conversation with our engineering team about your skills and experience." },
  { step: "04", icon: "Users", title: "Interview", description: "Meet the team and discuss fit, expectations and growth path." },
  { step: "05", icon: "Mail", title: "Offer Letter", description: "Selected candidates receive a formal offer with role details." },
  { step: "06", icon: "PartyPopper", title: "Welcome to WISE Family", description: "Onboarding begins — welcome aboard!" },
];

export const LIFE_AT_WISE = [
  { icon: "HardHat", title: "Site Visits" },
  { icon: "Users", title: "Client Meetings" },
  { icon: "GraduationCap", title: "Learning & Training" },
  { icon: "Handshake", title: "Team Activities" },
  { icon: "Lightbulb", title: "Innovative Environment" },
];

export const POSITION_OPTIONS = [...OPEN_ROLES.map((r) => r.title), "Other"];

export const EXPERIENCE_OPTIONS = ["Fresher", "0-1 Years", "1-2 Years", "2-4 Years", "4+ Years"];

export const NOTICE_PERIOD_OPTIONS = ["Immediate", "15 Days", "30 Days", "60 Days", "90 Days"];

// Dedicated recruitment contact numbers from the hiring poster — distinct
// from the general office lines in constants/contact.js.
export const HIRING_CONTACT_NUMBERS = ["99870 01609", "99870 06107"];
