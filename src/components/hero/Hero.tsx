"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

// The talking-video centrepiece is added in a later phase (PROFILE.heroVideo).
export default function Hero() {
  const ghost = PROFILE.firstName.toUpperCase();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % PROFILE.roles.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <style>{`
        .hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; overflow: clip; }
        .hero-ghost { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .hero-ghost span { display: inline-block; font-weight: 800; letter-spacing: -.06em; line-height: .8;
          font-size: clamp(120px, 30vw, 520px); color: transparent; -webkit-text-stroke: 1.5px rgba(13,13,13,.13);
          opacity: 0; transform: translateY(60px); animation: ghostIn 1.6s var(--ease) forwards; animation-delay: calc(var(--i) * 70ms + 100ms); }
        .hero-ghost-row { display: flex; transform: translateY(-6%); }
        @keyframes ghostIn { to { opacity: 1; transform: none; } }
        .hero-orbit { position: absolute; left: 50%; top: 47%; width: clamp(220px, 34vw, 460px); aspect-ratio: 1; translate: -50% -50%;
          border-radius: 50%; border: 1px dashed rgba(13,13,13,.14); animation: spin 60s linear infinite; }
        .hero-orbit::after { content: ""; position: absolute; top: -4px; left: 50%; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%; background: var(--ink); }
        @keyframes spin { to { transform: rotate(360deg); } }
        .hero-in { opacity: 0; transform: translateY(24px); animation: heroIn 1.1s var(--ease) forwards; animation-delay: calc(var(--i) * 90ms + 450ms); }
        @keyframes heroIn { to { opacity: 1; transform: none; } }
        .hero-role-line { display: block; overflow: hidden; line-height: 1.16; padding-bottom: .12em; margin-bottom: -.12em; }
        .hero-role-text { display: block; animation: roleSlideUp .7s var(--ease) both; }
        .hero-role-line:nth-child(2) .hero-role-text { animation-delay: 80ms; }
        @keyframes roleSlideUp { from { transform: translateY(110%); } to { transform: translateY(0); } }
        .hero-fact dt { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--mute); }
        .hero-fact dd { font-size: 14.5px; font-weight: 500; letter-spacing: -.01em; margin-top: 4px; }
        .hero-scroll { position: relative; width: 1px; height: 46px; overflow: hidden; background: rgba(13,13,13,.12); }
        .hero-scroll::after { content: ""; position: absolute; inset: 0; background: var(--ink); transform: translateY(-100%); animation: drip 2.2s var(--ease) infinite; }
        @keyframes drip { 0% { transform: translateY(-100%); } 55% { transform: translateY(0); } 100% { transform: translateY(100%); } }
      `}</style>

      <div className="hero-ghost" aria-hidden>
        <div className="hero-orbit" />
        <div className="hero-ghost-row">
          {ghost.split("").map((c, i) => (
            <span key={i} style={{ "--i": i } as React.CSSProperties}>
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="wrap relative mt-auto grid gap-10 pb-10 pt-32 md:grid-cols-[1fr_auto] md:items-end md:pb-14">
        <div>
          <h1 id="hero-title" className="h-display text-[clamp(46px,14vw,64px)] md:text-[clamp(64px,9vw,140px)]">
            <span key={roleIndex}>
              <span className="hero-role-line">
                <span className="hero-role-text font-bold">{PROFILE.roles[roleIndex][0]}</span>
              </span>
              <span className="hero-role-line">
                <span className="hero-role-text">
                  <em>{PROFILE.roles[roleIndex][1]}</em>
                </span>
              </span>
            </span>
          </h1>
          <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
            <a
              href="#work"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#work");
              }}
            >
              Explore work <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="btn btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#contact");
              }}
            >
              Let&apos;s talk
            </a>
            <a href={PROFILE.resume} download className="btn btn-ghost">
              Resume <span aria-hidden>↓</span>
            </a>
          </div>
        </div>

        <dl className="hero-in grid grid-cols-2 gap-x-10 gap-y-5 md:grid-cols-1 md:text-right" style={{ "--i": 5 } as React.CSSProperties}>
          <div className="hero-fact">
            <dt>Based in</dt>
            <dd>{PROFILE.location}</dd>
          </div>
          <div className="hero-fact">
            <dt>Studying</dt>
            <dd>
              {PROFILE.degreeShort} · CGPA {PROFILE.cgpa}
            </dd>
          </div>
        </dl>
      </div>

      <div className="wrap relative flex items-center gap-4 pb-6" aria-hidden>
        <span className="hero-scroll" />
        <span className="mono text-[10.5px] uppercase tracking-[.14em] text-mute">Scroll</span>
      </div>
    </section>
  );
}
