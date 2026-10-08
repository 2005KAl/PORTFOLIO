"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";

const BACK_LINES = [
  { title: "AI & ML Engineer", sub: "Machine Learning · Deep Learning" },
  { title: "Final-Year Engineer", sub: `${PROFILE.degreeShort} · CGPA ${PROFILE.cgpa}` },
  { title: "Problem Solver", sub: "Real-world AI solutions" },
  { title: "AI System Builder", sub: "NAV-SHIELD · Medical Scribe" },
];

/** Deterministic barcode widths derived from the name, so it never changes between renders. */
function barcode(seed: string) {
  const bars: number[] = [];
  for (let i = 0; i < 46; i++) {
    const c = seed.charCodeAt(i % seed.length);
    bars.push(((c * (i + 7)) % 3) + 1);
  }
  return bars;
}

export default function LanyardCard() {
  const swingRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const pointerType = useRef<string>("mouse");

  // Damped pendulum: pointer velocity kicks the card, a spring pulls it back, plus a gentle idle sway.
  useEffect(() => {
    const el = swingRef.current;
    if (!el || prefersReducedMotion()) return;
    let angle = 0;
    let vel = 0;
    let lastX: number | null = null;
    let lastT = 0;
    let raf = 0;
    let t0 = 0;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastX !== null) {
        const dt = Math.max(8, now - lastT);
        const vx = (e.clientX - lastX) / dt; // px per ms
        vel += Math.max(-1.6, Math.min(1.6, vx * 0.55));
      }
      lastX = e.clientX;
      lastT = now;
    };

    const tick = (now: number) => {
      const dt = Math.min(32, now - t0) / 16.67;
      t0 = now;
      const idle = Math.sin(now / 1400) * 0.9;
      const acc = -0.045 * (angle - idle) - 0.09 * vel;
      vel += acc * dt;
      angle += vel * dt;
      angle = Math.max(-24, Math.min(24, angle));
      el.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    const section = el.closest("section") ?? window;
    section.addEventListener("pointermove", onMove as EventListener);
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) {
        t0 = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    return () => {
      section.removeEventListener("pointermove", onMove as EventListener);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const bars = barcode(PROFILE.name + PROFILE.email);
  const strapText = `${PROFILE.name.toUpperCase()} · ${PROFILE.role.toUpperCase()} · `;

  return (
    <div className="lan">
      <style>{`
        .lan { position: relative; display: flex; justify-content: center; margin-top: calc(-1 * var(--section-pad)); height: 100%; }
        .lan-swing { display: flex; flex-direction: column; align-items: center; transform-origin: 50% 0; will-change: transform; }
        .lan-strap { position: relative; width: 30px; height: calc(var(--section-pad) + 56px); overflow: hidden; border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg, #1b1b1b, #2c2c2c 50%, #1b1b1b); box-shadow: inset 0 0 0 1px rgba(255,255,255,.06); }
        .lan-strap-text { position: absolute; left: 50%; top: 0; translate: -50% 0; writing-mode: vertical-rl; white-space: nowrap;
          font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .22em; color: rgba(255,255,255,.62); animation: strap 14s linear infinite; }
        @keyframes strap { from { transform: translateY(-50%); } to { transform: translateY(0); } }
        .lan-clip { position: relative; width: 38px; height: 26px; margin-top: -2px; border-radius: 6px 6px 10px 10px;
          background: linear-gradient(180deg, #d9d9d9, #9a9a9a 55%, #c9c9c9); box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 2px 4px rgba(0,0,0,.25); }
        .lan-clip::after { content: ""; position: absolute; left: 50%; bottom: -12px; width: 16px; height: 16px; margin-left: -8px; border-radius: 50%;
          border: 3px solid #a8a8a8; border-top-color: #e2e2e2; background: transparent; }
        .lan-scene { margin-top: 6px; perspective: 1400px; }
        .lan-card { position: relative; width: 300px; height: 404px; transform-style: preserve-3d; transition: transform 1s var(--ease); cursor: pointer; border-radius: 22px; }
        .lan-card.is-flipped { transform: rotateY(180deg); }
        .lan-face { position: absolute; inset: 0; border-radius: 22px; overflow: hidden; backface-visibility: hidden; -webkit-backface-visibility: hidden;
          background: #fff; box-shadow: inset 0 0 0 1px var(--line), 0 30px 60px -28px rgba(13,13,13,.35), 0 10px 20px -12px rgba(13,13,13,.18); }
        .lan-back { transform: rotateY(180deg); }
        .lan-slot { position: absolute; top: 12px; left: 50%; width: 46px; height: 7px; margin-left: -23px; border-radius: 99px; background: var(--paper); box-shadow: inset 0 1px 2px rgba(0,0,0,.18); z-index: 2; }
        .lan-band { height: 56px; background: var(--ink); color: #fff; display: flex; align-items: flex-end; justify-content: space-between; padding: 0 20px 12px; }
        .lan-band b { font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: .22em; }
        .lan-band span { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .14em; color: rgba(255,255,255,.55); }
        .lan-photo { position: relative; width: 128px; height: 156px; margin: 18px auto 0; border-radius: 16px; padding: 3px;
          background: linear-gradient(145deg, #e6e6e6, #8d8d8d 45%, #f2f2f2 70%, #a5a5a5); box-shadow: 0 0 0 5px #fff, 0 0 0 6px var(--line), 0 18px 40px -14px rgba(13,13,13,.35); }
        .lan-photo-in { width: 100%; height: 100%; border-radius: 13px; overflow: hidden; display: grid; place-items: center;
          background: radial-gradient(120% 90% at 50% 20%, #fafafa, #dedcd7); transition: transform .8s var(--ease); }
        .lan-card:hover .lan-photo-in { transform: scale(1.04); }
        .lan-photo-in img { width: 100%; height: 100%; object-fit: cover; }
        .lan-initials { font-size: 46px; font-weight: 700; letter-spacing: -.06em; color: var(--ink-2); }
        .lan-rows { display: grid; grid-template-columns: repeat(3, 1fr); margin: 12px 20px 0; border-top: 1px solid var(--line); padding-top: 12px; }
        .lan-rows dt { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--mute); }
        .lan-rows dd { font-size: 12px; font-weight: 600; margin-top: 3px; letter-spacing: -.01em; }
        .lan-foot { position: absolute; left: 20px; right: 20px; bottom: 16px; display: flex; align-items: flex-end; justify-content: space-between; }
        .lan-bars { display: flex; align-items: stretch; height: 24px; gap: 1.5px; }
        .lan-bars i { display: block; background: var(--ink); }
        .lan-holo { width: 32px; height: 32px; border-radius: 50%; position: relative; overflow: hidden;
          background: conic-gradient(from 0deg, #f4f4f4, #9b9b9b, #ececec, #6f6f6f, #f7f7f7, #b4b4b4, #f4f4f4); box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); }
        .lan-holo::after { content: ""; position: absolute; inset: -50%; background: linear-gradient(115deg, transparent 40%, rgba(255,255,255,.85) 50%, transparent 60%);
          animation: holo 3.6s var(--ease) infinite; }
        @keyframes holo { 0% { transform: translateX(-60%); } 60%, 100% { transform: translateX(60%); } }
        .lan-back-in { padding: 38px 24px 18px; height: 100%; display: flex; flex-direction: column; }
        .lan-back ul { margin-top: 20px; display: grid; gap: 16px; }
        .lan-back li { display: grid; grid-template-columns: 20px 1fr; line-height: 1.25; }
        .lan-back li::before { content: "◉"; font-size: 11px; line-height: 1.3; color: var(--ink); }
        .lan-back li b { display: block; font-size: 13.5px; font-weight: 600; letter-spacing: -.015em; color: var(--ink); }
        .lan-back li span { display: block; margin-top: 1px; font-size: 11.5px; color: var(--mute); }
        .lan-sign { margin-top: auto; border-top: 1px dashed rgba(13,13,13,.2); padding-top: 12px; }
        @media (max-width: 1060px) { .lan { margin-top: 0; } .lan-strap { height: 90px; } }
        @media (max-width: 360px) { .lan-card { width: 280px; } }
      `}</style>

      <div ref={swingRef} className="lan-swing">
        <div className="lan-strap" aria-hidden>
          <span className="lan-strap-text">{strapText.repeat(6)}</span>
        </div>
        <div className="lan-clip" aria-hidden />
        <div className="lan-scene">
          <div
            className={`lan-card ${flipped ? "is-flipped" : ""}`}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-describedby="lan-help"
            onPointerDown={(e) => (pointerType.current = e.pointerType)}
            onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
            onClick={() => pointerType.current !== "mouse" && setFlipped((f) => !f)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setFlipped((f) => !f);
              }
            }}
          >
            {/* Front */}
            <div className="lan-face" aria-hidden={flipped}>
              <span className="lan-slot" />
              <div className="lan-band">
                <b>ENGINEER ID</b>
                <span>{PROFILE.gradYear}</span>
              </div>
              <div className="lan-photo">
                <div className="lan-photo-in">
                  {PROFILE.portrait ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={PROFILE.portrait} alt={`Portrait of ${PROFILE.name}`} />
                  ) : (
                    <span className="lan-initials" aria-hidden>
                      {PROFILE.initials}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-[19px] font-bold tracking-[-0.035em]">{PROFILE.name}</p>
                <p className="serif-i text-[16px]">{PROFILE.role}</p>
              </div>
              <dl className="lan-rows">
                <div>
                  <dt>Dept.</dt>
                  <dd>AI &amp; ML</dd>
                </div>
                <div>
                  <dt>Batch</dt>
                  <dd>2023–27</dd>
                </div>
                <div>
                  <dt>Valid till</dt>
                  <dd>{PROFILE.gradYear}</dd>
                </div>
              </dl>
              <div className="lan-foot">
                <div className="lan-bars" aria-hidden>
                  {bars.map((w, i) => (
                    <i key={i} style={{ width: w, opacity: i % 5 === 0 ? 0.55 : 1 }} />
                  ))}
                </div>
                <span className="lan-holo" aria-hidden />
              </div>
            </div>

            {/* Back */}
            <div className="lan-face lan-back" aria-hidden={!flipped}>
              <span className="lan-slot" />
              <div className="lan-back-in">
                <p className="text-[26px] font-bold leading-none tracking-[-0.045em]">
                  What I <em className="serif-i">am</em>
                </p>
                <ul>
                  {BACK_LINES.map((l) => (
                    <li key={l.title}>
                      <div>
                        <b>{l.title}</b>
                        <span>{l.sub}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="lan-sign">
                  <p className="serif-i text-[26px] leading-none text-ink">{PROFILE.name}</p>
                  <p className="mono mt-2 text-[9.5px] leading-relaxed tracking-[.06em] text-mute">
                    IF FOUND, SAY HELLO · {PROFILE.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p id="lan-help" className="sr-only">
          Hover · tap to flip
        </p>
      </div>
    </div>
  );
}
