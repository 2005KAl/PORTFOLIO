// Single source of truth for all site content.
// Every value below is taken from KALAI_MAHA_T_RESUME.pdf — do not add anything that isn't in the résumé.

export type SkillFamily = "Languages" | "Web" | "Backend & Data" | "AI / ML" | "Tools";

export interface Skill {
  n: number;
  symbol: string;
  name: string;
  family: SkillFamily;
  logo: string; // key into TechLogo BRAND or CONCEPT map
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
}

export interface TimelineStop {
  kind: "Education" | "Experience";
  year: string;
  period: string;
  title: string;
  place: string;
  detail: string;
}

export interface Achievement {
  label: string;
  icon: string; // key into TechLogo CONCEPT map
  value?: number; // counts up when first seen
  decimals?: number;
  prefix?: string;
  suffix?: string;
  text?: string; // shown instead of a number when the honour has no figure
  caption: string;
  detail: string;
}

export const PROFILE = {
  name: "Kalai Maha T",
  firstName: "Kalai",
  initials: "KM",
  role: "AI & ML Engineer",
  kicker: "Engineering portfolio",
  roles: [["AI & ML", "Engineer."], ["Machine", "Learning."], ["Data", "Analytics."], ["Full-Stack", "Developer."], ["Software", "Engineer."]] as const,
  email: "tualasikalaimaha@gmail.com",
  phone: "+91 98405 73695",
  phoneHref: "tel:+919840573695",
  location: "Bangalore, Karnataka",
  college: "K.S Institute of Technology",
  degree: "B.E. — Artificial Intelligence & Machine Learning",
  degreeShort: "B.E. AI & ML",
  cgpa: "9.406",
  batch: "2023 – 2027",
  gradYear: "2027",
  currentRole: "Web Development Intern — Patel Engineering Works",
  resumeSummary:
    "Final-year AI & Machine Learning engineer at KS Institute of Technology with hands-on experience in Machine Learning, Deep Learning, Computer Vision, and NLP using Python, TensorFlow, PyTorch, and Scikit-learn, passionate about building scalable, real-world AI solutions.",
  extraLine:
    "Recognized by the college with cash awards for securing 1st position in the department throughout the program.",
  quote: "Building scalable, real-world AI solutions.",
  github: "https://github.com/2005KAl",
  linkedin: "https://www.linkedin.com/in/kalai-maha-t-7537b72b6/",
  resume: "/Kalai_Maha_T_Resume.pdf",
  portrait: "/portrait-bust.webp" as string | null, // 480×600 head-to-shirt crop for the ID card
  heroVideo: null as string | null, // talking-video hero — added later
};

// Sections get added here as each phase is built.
export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const SKILL_FAMILIES: SkillFamily[] = ["Languages", "Web", "Backend & Data", "AI / ML", "Tools"];

export const SKILLS: Skill[] = [
  { n: 1, symbol: "Py", name: "Python", family: "Languages", logo: "python" },
  { n: 2, symbol: "Jv", name: "Java", family: "Languages", logo: "java" },
  { n: 3, symbol: "Ht", name: "HTML", family: "Web", logo: "html" },
  { n: 4, symbol: "Cs", name: "CSS", family: "Web", logo: "css" },
  { n: 5, symbol: "Js", name: "JavaScript", family: "Web", logo: "javascript" },
  { n: 6, symbol: "Re", name: "React.js", family: "Web", logo: "react" },
  { n: 7, symbol: "St", name: "Streamlit", family: "Web", logo: "streamlit" },
  { n: 8, symbol: "Fl", name: "Flask", family: "Backend & Data", logo: "flask" },
  { n: 9, symbol: "Sq", name: "SQL", family: "Backend & Data", logo: "sql" },
  { n: 10, symbol: "Mg", name: "MongoDB", family: "Backend & Data", logo: "mongodb" },
  { n: 11, symbol: "Pb", name: "Power BI", family: "Backend & Data", logo: "powerbi" },
  { n: 12, symbol: "Ml", name: "Machine Learning", family: "AI / ML", logo: "ml" },
  { n: 13, symbol: "Dl", name: "Deep Learning", family: "AI / ML", logo: "dl" },
  { n: 14, symbol: "Cv", name: "Computer Vision", family: "AI / ML", logo: "cv" },
  { n: 15, symbol: "Nl", name: "NLP", family: "AI / ML", logo: "nlp" },
  { n: 16, symbol: "Pm", name: "Predictive Modeling", family: "AI / ML", logo: "pm" },
  { n: 17, symbol: "Tf", name: "TensorFlow", family: "AI / ML", logo: "tensorflow" },
  { n: 18, symbol: "Pt", name: "PyTorch", family: "AI / ML", logo: "pytorch" },
  { n: 19, symbol: "Sk", name: "Scikit-learn", family: "AI / ML", logo: "sklearn" },
  { n: 20, symbol: "Gt", name: "Git", family: "Tools", logo: "git" },
  { n: 21, symbol: "Gh", name: "GitHub", family: "Tools", logo: "github" },
];

export const PROJECTS: Project[] = [
  {
    id: "nav-shield",
    index: "01",
    title: "NAV-SHIELD",
    kicker: "Android · Edge AI · Machine Learning",
    description:
      "An offline-first intelligent navigation system that provides reliable navigation in GNSS-denied and degraded environments.",
    features: [
      "Smartphone IMU / GNSS sensors",
      "INS-based dead reckoning",
      "AI-powered drift prediction",
      "Offline map matching",
      "Adaptive sensor fusion",
    ],
    tech: ["Android", "Edge AI", "Machine Learning"],
    github: "https://github.com/2005KAl/NAV-SHIELD",
  },
  {
    id: "cardiac-armband",
    index: "02",
    title: "Cardiac Risk Armband",
    kicker: "Wearable IoT · Machine Learning",
    description:
      "A wearable sensor-integrated armband for real-time cardiac risk prediction, built on Random Forest–based ML models.",
    features: ["ECG", "SpO₂", "Heart rate", "Temperature", "Respiratory signals", "Real-time risk prediction"],
    tech: ["Machine Learning", "Random Forest", "IoT"],
    github: "https://github.com/2005KAl/CARDIAC-RISK-PREDICTION",
  },
  {
    id: "medical-scribe",
    index: "03",
    title: "AI Medical Scribe",
    kicker: "NLP · Voice Processing · AI",
    description:
      "An AI-driven system using speech recognition, medical NLP and 3D anatomical visualization to automate clinical documentation and help patients understand their conditions.",
    features: ["Speech recognition", "Medical NLP", "3D anatomical visualization", "Automated clinical notes"],
    tech: ["NLP", "Voice Processing", "AI"],
    github: "https://github.com/2005KAl/Medical-Scribe1",
  },
  {
    id: "hospital-dbms",
    index: "04",
    title: "Hospital DBMS",
    kicker: "Python · Flask · SQL",
    description:
      "A web-based hospital management system with patient records, admissions, department and doctor management, and a live statistics dashboard.",
    features: ["Patient records", "Admissions", "Departments & doctors", "User authentication", "Real-time stats dashboard"],
    tech: ["Python", "Flask", "SQL"],
    github: "https://github.com/2005KAl/Hospital_Management-System",
  },
  {
    id: "house-price",
    index: "05",
    title: "House Price Prediction",
    kicker: "Python · Flask · XGBoost · Leaflet",
    description:
      "A full-stack price prediction app: an XGBoost regression model with neighborhood and amenity-based feature engineering, served through a Flask REST API.",
    features: ["XGBoost regression", "Neighborhood & amenity features", "Interactive Leaflet map", "Flask REST API", "Real-time predictions"],
    tech: ["Python", "Flask", "XGBoost", "Leaflet"],
    github: "https://github.com/2005KAl/AI-PRICE-PREDICTION-",
  },
];

export const CERTIFICATIONS = [
  { title: "Unix Linux OS: Unix Commands in Details", issuer: "Infosys Springboard", date: "Dec 2025" },
  { title: "Database Management Systems (DBMS)", issuer: "Infosys Springboard" },
];

export const TIMELINE: TimelineStop[] = [
  {
    kind: "Education",
    year: "2021",
    period: "2021",
    title: "Class 10",
    place: "Everwin Vidhyashram Senior Secondary School",
    detail: "Score 85%",
  },
  {
    kind: "Education",
    year: "2023",
    period: "2023",
    title: "Class 12",
    place: "Everwin Vidhyashram Senior Secondary School",
    detail: "Score 85%",
  },
  {
    kind: "Education",
    year: "2023",
    period: "2023 – 2027",
    title: "B.E. — Artificial Intelligence & Machine Learning",
    place: "K.S Institute of Technology",
    detail: "CGPA 9.406 · 1st in the department throughout the program",
  },
  {
    kind: "Experience",
    year: "2024",
    period: "Apr 2024 – Jun 2026",
    title: "Assistant Program Coordinator (Part Time)",
    place: "ShadowFox",
    detail:
      "Coordinated mentor–intern meetings, clarified internship-related doubts, and scheduled and maintained communication between mentors and interns.",
  },
  {
    kind: "Experience",
    year: "2026",
    period: "Feb 2026 – Jun 2026",
    title: "Web Development Intern",
    place: "Patel Engineering Works, Vizag",
    detail:
      "Developed and deployed a responsive static website for the company, enhancing its digital presence through modern, user-friendly web design.",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    label: "B.E. AI & ML · K.S Institute of Technology",
    icon: "cap",
    value: 9.406,
    decimals: 3,
    caption: "CGPA",
    detail: "Bachelor of Engineering, 2023 – 2027.",
  },
  {
    label: "Department rank",
    icon: "medal",
    value: 1,
    suffix: "st",
    caption: "1st in the department",
    detail: "Throughout the program — recognized by the college with cash awards.",
  },
  {
    label: "Hackathon · Team Lead",
    icon: "trophy",
    value: 1,
    suffix: "st",
    caption: "1st Prize Winner",
    detail: "Led the team behind an AI-powered wearable cardiac risk prediction system with real-time alerts.",
  },
  {
    label: "Ideathon 2025 · National level",
    icon: "bulb",
    value: 30,
    prefix: "Top ",
    caption: "Certificate of Excellence",
    detail: "For securing a Top 30 rank at the national-level Ideathon 2025.",
  },
  {
    label: "Synaptix 2026 · Biotech Codeathon",
    icon: "award",
    value: 2,
    suffix: "nd",
    caption: "2nd place",
    detail: "For developing an AI-powered medical scribe.",
  },
  {
    label: "HydroHackathon 2026 · IIT Madras",
    icon: "wave",
    text: "Jury",
    caption: "Special Jury Appreciation Award",
    detail: "For excellence in ship stability and hydrostatics analysis.",
  },
];
