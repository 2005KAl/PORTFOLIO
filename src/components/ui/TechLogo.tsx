// Brand logos are official devicon "original" SVGs in /public/logos (MIT, see LICENSE-devicon.txt).
// Concept skills get thin line icons drawn in the same style.

export const BRAND: Record<string, { src: string; tint: string }> = {
  python: { src: "/logos/python.svg", tint: "#3776AB" },
  java: { src: "/logos/java.svg", tint: "#E76F00" },
  html: { src: "/logos/html.svg", tint: "#E34F26" },
  css: { src: "/logos/css.svg", tint: "#1572B6" },
  javascript: { src: "/logos/javascript.svg", tint: "#F7DF1E" },
  react: { src: "/logos/react.svg", tint: "#61DAFB" },
  streamlit: { src: "/logos/streamlit.svg", tint: "#FF4B4B" },
  flask: { src: "/logos/flask.svg", tint: "#6b6b6b" },
  mongodb: { src: "/logos/mongodb.svg", tint: "#47A248" },
  tensorflow: { src: "/logos/tensorflow.svg", tint: "#FF6F00" },
  pytorch: { src: "/logos/pytorch.svg", tint: "#EE4C2C" },
  sklearn: { src: "/logos/sklearn.svg", tint: "#F7931E" },
  git: { src: "/logos/git.svg", tint: "#F05032" },
  github: { src: "/logos/github.svg", tint: "#6b6b6b" },
};

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const CONCEPT: Record<string, React.ReactNode> = {
  // Machine learning: connected nodes
  ml: (
    <g {...S}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M6.7 7.2 10.1 10.6M6.7 16.8l3.4-3.4M14.4 12H17" />
    </g>
  ),
  // Deep learning: layered network
  dl: (
    <g {...S}>
      {[6, 12, 18].map((y) => (
        <circle key={`a${y}`} cx="4" cy={y} r="1.5" />
      ))}
      {[4, 9, 15, 20].map((y) => (
        <circle key={`b${y}`} cx="12" cy={y} r="1.5" />
      ))}
      {[9, 15].map((y) => (
        <circle key={`c${y}`} cx="20" cy={y} r="1.5" />
      ))}
      <path d="M5.5 6 10.5 4M5.5 6l5 3M5.5 12l5-3M5.5 12l5 3M5.5 18l5-3M5.5 18l5 2M13.5 4l5 5M13.5 9l5 0M13.5 15l5 0M13.5 20l5-5" opacity=".55" />
    </g>
  ),
  // Computer vision: eye inside a frame
  cv: (
    <g {...S}>
      <path d="M3 8V4h4M17 4h4v4M21 16v4h-4M7 20H3v-4" />
      <path d="M5 12s2.6-4.5 7-4.5S19 12 19 12s-2.6 4.5-7 4.5S5 12 5 12Z" />
      <circle cx="12" cy="12" r="2" />
    </g>
  ),
  // NLP: speech bubble with text lines
  nlp: (
    <g {...S}>
      <path d="M4 5h16v11H11l-4 3.5V16H4z" />
      <path d="M8 9h8M8 12.3h5" />
    </g>
  ),
  // Predictive modeling: trend with forecast
  pm: (
    <g {...S}>
      <path d="M3 20h18M3 20V4" />
      <path d="M5 16l4-4 3 2 4-5" />
      <path d="M16 9l4-3" strokeDasharray="1.6 2" />
      <circle cx="20" cy="6" r="1.3" />
    </g>
  ),
  // SQL: database cylinder
  sql: (
    <g {...S}>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </g>
  ),
  // Achievement icons
  cap: (
    <g {...S}>
      <path d="M2 9.5 12 5l10 4.5L12 14z" />
      <path d="M6 11.3V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.7M22 9.5V15" />
    </g>
  ),
  medal: (
    <g {...S}>
      <path d="M8 3h3l1.5 5M16 3h-3" />
      <circle cx="12" cy="15" r="6" />
      <path d="M12 12v6M10.6 13.2 12 12" />
    </g>
  ),
  trophy: (
    <g {...S}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 14v3.5M8.5 20.5h7M9.5 17.5h5v3h-5z" />
    </g>
  ),
  bulb: (
    <g {...S}>
      <path d="M9 17.5h6M10 20.5h4" />
      <path d="M12 3.5a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2v1h5v-1c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3.5Z" />
    </g>
  ),
  award: (
    <g {...S}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13.3 7 21l5-2.5 5 2.5-1.5-7.7" />
      <path d="M10.5 9.2h1.6V6.5" />
    </g>
  ),
  wave: (
    <g {...S}>
      <path d="M6 14 7.5 9h9l1.5 5" />
      <path d="M12 9V4l4 3.5h-4" />
      <path d="M2 17c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <path d="M2 20.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" opacity=".5" />
    </g>
  ),
  // Power BI: dashboard bars
  powerbi: (
    <g {...S}>
      <rect x="4" y="12" width="3.6" height="8" rx="1" />
      <rect x="10.2" y="7" width="3.6" height="13" rx="1" />
      <rect x="16.4" y="3" width="3.6" height="17" rx="1" />
    </g>
  ),
};

export const isBrand = (id: string) => id in BRAND;

export default function TechLogo({ id, size = 24, className = "" }: { id: string; size?: number; className?: string }) {
  const brand = BRAND[id];
  if (brand) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={brand.src} alt="" width={size} height={size} className={className} draggable={false} />;
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
      {CONCEPT[id]}
    </svg>
  );
}
