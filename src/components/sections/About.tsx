import { PROFILE } from "@/lib/data";
import LanyardCard from "@/components/ui/LanyardCard";

const FACTS = [
  { k: "Location", v: PROFILE.location },
  { k: "Education", v: `${PROFILE.degree}, ${PROFILE.college} (${PROFILE.batch})` },
  { k: "Email", v: PROFILE.email, href: `mailto:${PROFILE.email}` },
];

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <style>{`
        .about-grid { display: grid; grid-template-columns: minmax(0,1fr) 320px minmax(0,1fr); gap: clamp(28px, 4vw, 64px); align-items: stretch; }
        .about-facts { border-top: 1px solid var(--line); }
        .about-facts > div { display: grid; grid-template-columns: 96px 1fr; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--line); }
        .about-facts dt { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--mute); padding-top: 3px; }
        .about-facts dd { font-size: 15px; line-height: 1.45; font-weight: 500; letter-spacing: -.01em; overflow-wrap: anywhere; }
        .about-facts a { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .5s var(--ease); }
        .about-facts a:hover { background-size: 100% 1px; }
        .about-quote::before { content: "“"; display: block; font-family: var(--font-serif); font-size: 64px; line-height: .6; color: var(--faint); }
        @media (max-width: 1060px) {
          .about-grid { grid-template-columns: 1fr; }
          .about-card-col { order: -1; padding-bottom: 40px; }
        }
      `}</style>

      <div className="wrap about-grid">
        {/* Left — intro */}
        <div className="flex flex-col">
          <h2 id="about-title" className="h-display text-[clamp(44px,5.6vw,84px)]">
            <span className="rv-mask">
              <span>Hi, I&apos;m</span>
            </span>
            <span className="rv-mask" style={{ "--i": 1 } as React.CSSProperties}>
              <span>
                <em>{PROFILE.firstName}.</em>
              </span>
            </span>
          </h2>
          <p className="rv mt-8 text-[17px] leading-[1.6] text-ink-2" style={{ "--i": 2 } as React.CSSProperties}>
            {PROFILE.resumeSummary}
          </p>
          <p className="rv mt-4 text-[15px] leading-[1.6] text-mute" style={{ "--i": 3 } as React.CSSProperties}>
            {PROFILE.extraLine}
          </p>
          <div className="rv mt-8 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
            <a href={PROFILE.resume} download className="btn btn-primary">
              Resume <span aria-hidden>↓</span>
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              GitHub <span aria-hidden>↗</span>
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
              LinkedIn <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        {/* Centre — hanging ID card */}
        <div className="about-card-col">
          <LanyardCard />
        </div>

        {/* Right — quick facts */}
        <div className="flex flex-col justify-end">
          <p className="tag rv" data-i="—">
            <span>Quick facts</span>
          </p>
          <dl className="about-facts mt-5">
            {FACTS.map((f, i) => (
              <div key={f.k} className="rv" style={{ "--i": i } as React.CSSProperties}>
                <dt>{f.k}</dt>
                <dd>{f.href ? <a href={f.href}>{f.v}</a> : f.v}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="about-quote rv mt-10">
            <p className="serif-i text-[clamp(26px,2.4vw,34px)] leading-[1.15] text-ink">{PROFILE.quote}</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
