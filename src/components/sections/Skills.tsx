"use client";

import { useState } from "react";
import { SKILLS, SKILL_FAMILIES, type Skill, type SkillFamily } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionHead from "@/components/ui/SectionHead";
import TechLogo, { BRAND, isBrand } from "@/components/ui/TechLogo";

// Grayscale family shades — dark to light, like the blocks of a periodic table.
const SHADE: Record<SkillFamily, { bg: string; fg: string; sub: string }> = {
  Languages: { bg: "#0d0d0d", fg: "#ffffff", sub: "rgba(255,255,255,.55)" },
  Web: { bg: "#34332f", fg: "#ffffff", sub: "rgba(255,255,255,.55)" },
  "Backend & Data": { bg: "#77756f", fg: "#ffffff", sub: "rgba(255,255,255,.62)" },
  "AI / ML": { bg: "#cfcbc3", fg: "#0d0d0d", sub: "rgba(13,13,13,.55)" },
  Tools: { bg: "#ffffff", fg: "#0d0d0d", sub: "rgba(13,13,13,.5)" },
};

export default function Skills() {
  const [filter, setFilter] = useState<SkillFamily | null>(null);
  const [current, setCurrent] = useState<Skill | null>(null);
  const [gridRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  const count = (f: SkillFamily) => SKILLS.filter((s) => s.family === f).length;

  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <style>{`
        .sk-layout { display: grid; grid-template-columns: minmax(0,1fr) 320px; gap: clamp(24px, 3vw, 48px); align-items: start; margin-top: 44px; }
        .sk-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .sk-chip { display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px; border-radius: 999px; font-size: 13px; font-weight: 500;
          box-shadow: inset 0 0 0 1px rgba(13,13,13,.14); transition: background-color .4s var(--ease), color .4s var(--ease), box-shadow .4s var(--ease); }
        .sk-chip:hover { box-shadow: inset 0 0 0 1px var(--ink); }
        .sk-chip[aria-pressed="true"] { background: var(--ink); color: #fff; box-shadow: none; }
        .sk-chip i { width: 9px; height: 9px; border-radius: 3px; box-shadow: inset 0 0 0 1px rgba(13,13,13,.25); }
        .sk-chip small { font-family: var(--font-mono); font-size: 10.5px; opacity: .55; }

        .sk-grid { display: grid; grid-template-columns: repeat(8, minmax(0,1fr)); gap: 8px; margin-top: 22px; }
        .sk-tile { --d: calc((var(--r) + var(--c)) * 40ms); position: relative; aspect-ratio: 1 / 1.08; border-radius: 12px; padding: 9px 10px 8px;
          display: flex; flex-direction: column; text-align: left; background: var(--bg); color: var(--fg); box-shadow: inset 0 0 0 1px rgba(13,13,13,.08);
          opacity: 0; transform: translateY(14px) scale(.94);
          transition: opacity .7s var(--ease) var(--d), transform .7s var(--ease) var(--d), filter .4s var(--ease), box-shadow .4s var(--ease); }
        .sk-grid.is-in .sk-tile { opacity: 1; transform: none; }
        .sk-grid.is-in .sk-tile { transition-delay: var(--d), var(--d), 0s, 0s; }
        .sk-grid.is-in .sk-tile.is-dim { opacity: .16; transform: scale(.96); filter: grayscale(1); transition-delay: 0s; }
        .sk-tile:hover, .sk-tile:focus-visible, .sk-tile.is-current { transform: translateY(-4px) scale(1.03) !important;
          box-shadow: inset 0 0 0 1px rgba(13,13,13,.12), 0 16px 30px -14px rgba(13,13,13,.45); z-index: 1; }
        .sk-tile:focus-visible { outline-offset: 2px; }
        .sk-n { font-family: var(--font-mono); font-size: 10px; color: var(--sub); }
        .sk-sym { margin-top: auto; font-size: clamp(20px, 2.1vw, 30px); font-weight: 700; letter-spacing: -.04em; line-height: 1; }
        .sk-name { margin-top: 4px; font-size: 10.5px; line-height: 1.2; color: var(--sub); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .sk-panel { position: sticky; top: 96px; padding: 22px; min-height: 340px; display: flex; flex-direction: column; }
        .sk-logo { position: relative; display: grid; place-items: center; height: 190px; margin: 6px 0 18px; }
        .sk-logo::before { content: ""; position: absolute; width: 170px; height: 170px; border-radius: 50%; background: var(--tint, transparent);
          opacity: .16; filter: blur(30px); transition: background-color .5s var(--ease); }
        .sk-logo > * { position: relative; animation: pop .6s var(--ease); }
        .sk-logo svg { color: var(--ink); }
        @keyframes pop { from { opacity: 0; transform: scale(.6) rotate(-8deg); } to { opacity: 1; transform: none; } }
        .sk-empty { display: grid; place-items: center; height: 100%; color: var(--mute); }

        @media (max-width: 1060px) { .sk-layout { grid-template-columns: 1fr; } .sk-panel { position: static; min-height: 0; } }
        @media (max-width: 720px) {
          .sk-grid { grid-template-columns: repeat(4, minmax(0,1fr)); }
          .sk-tile { --d: calc((var(--rm) + var(--cm)) * 40ms); }
          .sk-sym { font-size: 24px; }
        }
      `}</style>

      <div className="wrap">
        <SectionHead id="skills-title" title="The periodic table" accent="of my stack." />
        <p className="rv mt-6 max-w-[560px] text-[16px] leading-[1.6] text-ink-2">
          {SKILLS.length} elements in {SKILL_FAMILIES.length} families. Hover or tap a tile to inspect it, or pick a family to light it up.
        </p>

        <div className="sk-layout">
          <div>
            <div className="sk-chips rv" role="group" aria-label="Filter skills by family">
              <button className="sk-chip" aria-pressed={filter === null} onClick={() => setFilter(null)}>
                All <small>{SKILLS.length}</small>
              </button>
              {SKILL_FAMILIES.map((f) => (
                <button key={f} className="sk-chip" aria-pressed={filter === f} onClick={() => setFilter(filter === f ? null : f)}>
                  <i style={{ background: SHADE[f].bg }} aria-hidden />
                  {f} <small>{count(f)}</small>
                </button>
              ))}
            </div>

            <div ref={gridRef} className={`sk-grid ${inView ? "is-in" : ""}`} onMouseLeave={() => setCurrent(null)}>
              {SKILLS.map((s, i) => {
                const shade = SHADE[s.family];
                const dim = filter !== null && s.family !== filter;
                return (
                  <button
                    key={s.name}
                    className={`sk-tile ${dim ? "is-dim" : ""} ${current?.name === s.name ? "is-current" : ""}`}
                    style={
                      {
                        "--bg": shade.bg,
                        "--fg": shade.fg,
                        "--sub": shade.sub,
                        "--r": Math.floor(i / 8),
                        "--c": i % 8,
                        "--rm": Math.floor(i / 4),
                        "--cm": i % 4,
                      } as React.CSSProperties
                    }
                    onMouseEnter={() => setCurrent(s)}
                    onFocus={() => setCurrent(s)}
                    onClick={() => setCurrent(s)}
                    aria-label={`${s.name}, ${s.family}`}
                  >
                    <span className="sk-n">{String(s.n).padStart(2, "0")}</span>
                    <span className="sk-sym">{s.symbol}</span>
                    <span className="sk-name">{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="sk-panel card" aria-live="polite" aria-label="Skill inspector">
            {current ? (
              <div key={current.name} className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="mono text-[11px] tracking-[.14em] text-mute">
                    NO. {String(current.n).padStart(2, "0")}
                  </span>
                  <span className="mono text-[11px] uppercase tracking-[.14em] text-mute">{current.family}</span>
                </div>
                <div className="sk-logo" style={{ "--tint": BRAND[current.logo]?.tint ?? "#77756f" } as React.CSSProperties}>
                  <TechLogo id={current.logo} size={isBrand(current.logo) ? 150 : 120} />
                </div>
                <p className="text-[30px] font-bold leading-none tracking-[-0.045em]">{current.name}</p>
                <p className="serif-i mt-1 text-[18px]">{current.family}</p>
              </div>
            ) : (
              <div className="sk-empty text-center">
                <div>
                  <p className="text-[64px] font-bold leading-none tracking-[-0.05em] text-[var(--soft)]">?</p>
                  <p className="mono mt-4 text-[11px] uppercase tracking-[.14em]">Hover or tap a tile</p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
