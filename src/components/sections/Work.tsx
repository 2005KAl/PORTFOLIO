"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import TechLogo from "@/components/ui/TechLogo";
import { MINI_UI, MINI_UI_CSS } from "@/components/ui/MiniUI";

// Tech chip → logo id (only where a matching logo exists).
const TECH_LOGO: Record<string, string> = {
  Python: "python",
  Flask: "flask",
  SQL: "sql",
  "Machine Learning": "ml",
  NLP: "nlp",
};

export default function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <style>{`
        ${MINI_UI_CSS}
        .wk-row { display: flex; gap: 10px; height: min(78svh, 600px); margin-top: 48px; container-type: inline-size; }
        .wk-panel { position: relative; flex: 1 1 0; min-width: 74px; overflow: hidden; border-radius: 28px; background: var(--card);
          box-shadow: inset 0 0 0 1px var(--line); transition: flex-grow .9s var(--ease), box-shadow .6s var(--ease), background-color .6s var(--ease); }
        .wk-panel.is-active { flex-grow: 8; box-shadow: inset 0 0 0 1px var(--line), 0 40px 80px -40px rgba(13,13,13,.35); }
        .wk-panel:not(.is-active):hover { background: #fbfaf8; }

        .wk-spine { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 22px 0;
          width: 100%; transition: opacity .4s var(--ease); }
        .wk-panel.is-active .wk-spine { opacity: 0; pointer-events: none; }
        .wk-spine-title { writing-mode: vertical-rl; transform: rotate(180deg); font-size: 19px; font-weight: 700; letter-spacing: -.03em; white-space: nowrap; }
        .wk-plus { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--ink); color: #fff; font-size: 18px; line-height: 1;
          transition: transform .6s var(--ease); }
        .wk-panel:hover .wk-plus { transform: rotate(90deg); }

        .wk-open { position: absolute; inset: 0; display: grid; grid-template-columns: minmax(0, 0.95fr) minmax(0, 1fr); gap: 28px; padding: 32px;
          right: auto; width: calc((100cqw - 40px) * 8 / 12); opacity: 0; visibility: hidden; transition: opacity .3s var(--ease), visibility 0s .3s; }
        .wk-panel.is-active .wk-open { opacity: 1; visibility: visible; transition: opacity .7s var(--ease) .25s; }
        .wk-open > * { min-width: 0; }
        .wk-copy > * { opacity: 0; transform: translateY(16px); }
        .wk-panel.is-active .wk-copy > * { animation: wkIn .8s var(--ease) forwards; animation-delay: calc(.3s + var(--i) * 70ms); }
        @keyframes wkIn { to { opacity: 1; transform: none; } }
        .wk-feat { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 18px; }
        .wk-feat li { display: flex; gap: 8px; font-size: 13.5px; line-height: 1.35; color: var(--ink-2); }
        .wk-feat li::before { content: ""; width: 5px; height: 5px; margin-top: 6px; flex-shrink: 0; border-radius: 50%; background: var(--ink); }
        .wk-chip { display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 12px; border-radius: 99px; font-size: 12.5px; font-weight: 500;
          box-shadow: inset 0 0 0 1px rgba(13,13,13,.14); }
        .wk-ui { position: relative; clip-path: inset(0 100% 0 0 round 20px); }
        .wk-panel.is-active .wk-ui { animation: wipe 1.1s var(--ease) .35s forwards; }
        @keyframes wipe { to { clip-path: inset(0 0 0 0 round 20px); } }
        .wk-ui-label { position: absolute; right: 12px; bottom: 12px; z-index: 2; font-family: var(--font-mono); font-size: 9px; letter-spacing: .14em;
          text-transform: uppercase; color: var(--mute); background: rgba(255,255,255,.85); padding: 4px 8px; border-radius: 99px; box-shadow: inset 0 0 0 1px var(--line); }
        .wk-head { display: none; }

        @media (max-width: 900px) {
          .wk-row { flex-direction: column; height: auto; gap: 10px; }
          .wk-panel { min-width: 0; flex: none; border-radius: 22px; }
          .wk-spine { display: none; }
          .wk-head { display: flex; align-items: center; gap: 14px; width: 100%; padding: 18px 18px; text-align: left; }
          .wk-panel.is-active .wk-plus { transform: rotate(45deg); }
          .wk-open { position: static; display: none; width: auto; grid-template-columns: 1fr; padding: 0 18px 18px; gap: 20px; }
          .wk-panel.is-active .wk-open { display: grid; }
          .wk-ui { height: 280px; }
          .wk-feat { grid-template-columns: 1fr; }
          .wk-title { display: none; }
        }
      `}</style>

      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead id="work-title" title="Things I've" accent="built." />
          <p className="rv max-w-[380px] text-[15px] leading-[1.6] text-mute">
            {PROJECTS.length} projects across edge AI, healthcare and full-stack web. Hover or tap a panel to open it.
          </p>
        </div>

        <div className="wk-row rv">
          {PROJECTS.map((p, i) => {
            const isActive = active === i;
            const UI = MINI_UI[p.id];
            return (
              <article
                key={p.id}
                className={`wk-panel ${isActive ? "is-active" : ""}`}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                aria-labelledby={`wk-${p.id}`}
              >
                {/* Desktop: folded spine */}
                <button className="wk-spine" onClick={() => setActive(i)} onFocus={() => setActive(i)} aria-expanded={isActive} tabIndex={isActive ? -1 : 0}>
                  <span className="sr-only">Open </span>
                  <span className="mono text-[11px] text-mute">{p.index}</span>
                  <span className="wk-spine-title">{p.title}</span>
                  <span className="wk-plus" aria-hidden>
                    +
                  </span>
                </button>

                {/* Mobile: accordion header */}
                <button className="wk-head" onClick={() => setActive(isActive ? -1 : i)} aria-expanded={isActive}>
                  <span className="mono text-[11px] text-mute">{p.index}</span>
                  <span className="flex-1 text-[19px] font-bold tracking-[-0.03em]">{p.title}</span>
                  <span className="wk-plus" aria-hidden>
                    +
                  </span>
                </button>

                <div className="wk-open" aria-hidden={!isActive}>
                  <div className="wk-copy flex flex-col">
                    <p className="mono text-[11px] uppercase tracking-[.14em] text-mute" style={{ "--i": 0 } as React.CSSProperties}>
                      {p.index}
                    </p>
                    <h3 id={`wk-${p.id}`} className="wk-title h-display mt-4 text-[clamp(30px,3vw,44px)]" style={{ "--i": 1 } as React.CSSProperties}>
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.6] text-ink-2" style={{ "--i": 2 } as React.CSSProperties}>
                      {p.description}
                    </p>
                    <ul className="wk-feat mt-5" style={{ "--i": 3 } as React.CSSProperties}>
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6" style={{ "--i": 4 } as React.CSSProperties}>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <span key={t} className="wk-chip">
                            {TECH_LOGO[t] ? <TechLogo id={TECH_LOGO[t]} size={15} /> : <span className="h-1.5 w-1.5 rounded-full bg-[var(--faint)]" aria-hidden />}
                            {t}
                          </span>
                        ))}
                      </div>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-primary mt-5" tabIndex={isActive ? 0 : -1}>
                          GitHub <span aria-hidden>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="wk-ui" aria-hidden>
                    {isActive && UI && <UI />}
                    <span className="wk-ui-label">Illustrative UI</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
