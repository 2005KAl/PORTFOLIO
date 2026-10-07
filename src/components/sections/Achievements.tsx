"use client";

import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, type Achievement } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";

/** Big number that counts up (easeOutQuart, 1.4 s) the first time its card is seen. */
function CountUp({ a, start }: { a: Achievement; start: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start || a.value === undefined) return;
    const target = a.value;
    if (prefersReducedMotion()) return setV(target);
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 1400);
      setV(target * (1 - Math.pow(1 - t, 4)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, a.value]);

  if (a.value === undefined) return <>{a.text}</>;
  return (
    <>
      {a.prefix && <small>{a.prefix}</small>}
      {v.toFixed(a.decimals ?? 0)}
      {a.suffix && <small>{a.suffix}</small>}
    </>
  );
}

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [seen, setSeen] = useState<boolean[]>(() => ACHIEVEMENTS.map(() => false));
  const [focus, setFocus] = useState(-1);
  const travel = useRef(0);

  // Section height = viewport + horizontal travel, so vertical scroll drives the track.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      travel.current = Math.max(0, track.scrollWidth - window.innerWidth);
      setHeight(window.innerHeight + travel.current);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const sec = sectionRef.current;
      const track = trackRef.current;
      if (!sec || !track) return;
      const r = sec.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      const shift = -p * travel.current;

      // Card nearest the viewport centre gets the "lifted" state; any card on screen starts counting.
      const mid = window.innerWidth / 2;
      let best = -1;
      let bestD = Infinity;
      const visible = r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
      const cards = track.querySelectorAll<HTMLElement>("[data-card]");
      const nowSeen: number[] = [];
      cards.forEach((c, i) => {
        // layout positions + the shift we are about to apply (avoids a forced reflow)
        const left = c.offsetLeft + shift;
        const b = { left, right: left + c.offsetWidth, width: c.offsetWidth };
        const d = Math.abs(b.left + b.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
        if (visible && b.left < window.innerWidth * 0.92 && b.right > 0) nowSeen.push(i);
      });
      track.style.transform = `translate3d(${shift}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      setFocus(visible ? best : -1);
      if (nowSeen.length)
        setSeen((s) => (nowSeen.every((i) => s[i]) ? s : s.map((v, i) => v || nowSeen.includes(i))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [height]);

  return (
    <section id="achievements" ref={sectionRef} className="ach" style={{ height: height ?? undefined }} aria-labelledby="ach-title">
      <style>{`
        .ach { position: relative; }
        .ach-pin { position: sticky; top: 0; height: 100svh; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
        .ach-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px; }
        .ach-bar { position: relative; width: min(280px, 60vw); height: 2px; background: var(--soft); border-radius: 2px; overflow: hidden; }
        .ach-bar span { position: absolute; inset: 0; background: var(--ink); transform-origin: left; transform: scaleX(0); }
        .ach-track { display: flex; gap: 22px; margin-top: clamp(32px, 6vh, 64px); will-change: transform; }
        .ach-track::after { content: ""; flex: 0 0 max(var(--gutter), calc((100vw - 1320px) / 2 + var(--gutter))); }
        .ach-track { padding-left: max(var(--gutter), calc((100vw - 1320px) / 2 + var(--gutter))); }
        .ach-card { position: relative; flex: 0 0 auto; width: clamp(300px, 40vw, 540px); min-height: clamp(170px, 22vh, 200px); border-radius: 28px;
          background: var(--card); padding: 24px 26px; display: flex; flex-direction: column;
          box-shadow: inset 0 0 0 1px var(--line), 0 10px 30px -24px rgba(13,13,13,.25);
          transition: transform .7s var(--ease), box-shadow .7s var(--ease); }
        .ach-card.is-focus { transform: translateY(-12px); box-shadow: inset 0 0 0 1px var(--line), 0 40px 70px -34px rgba(13,13,13,.4); }
        .ach-num { font-size: clamp(56px, 7vw, 104px); font-weight: 700; letter-spacing: -.06em; line-height: .85; white-space: nowrap; font-variant-numeric: tabular-nums; }
        .ach-num small { font-size: .38em; letter-spacing: -.03em; margin: 0 .06em; vertical-align: .9em; color: var(--mute); }
        .ach-end { flex: 0 0 auto; align-self: center; padding: 0 10px 0 20px; font-size: clamp(26px, 3vw, 40px); font-weight: 700; letter-spacing: -.04em; white-space: nowrap; }
        @media (max-width: 640px) {
          .ach-card { width: 82vw; min-height: 260px; padding: 20px; }
          .ach-body { flex-direction: column-reverse; align-items: flex-start; gap: 14px; }
          .ach-copy { max-width: none; }
          .ach-num { font-size: 60px; }
        }
      `}</style>

      <div className="ach-pin">
        <div className="wrap ach-head">
          <div>
            <h2 id="ach-title" className="h-display text-[clamp(44px,6vw,88px)]">
              Proud <em>moments.</em>
            </h2>
          </div>
          <div className="flex items-center gap-4 pb-2">
            <span className="mono text-[11px] tracking-[.14em] text-mute">SCROLL</span>
            <span className="ach-bar" aria-hidden>
              <span ref={barRef} />
            </span>
          </div>
        </div>

        <div ref={trackRef} className="ach-track">
          {ACHIEVEMENTS.map((a, i) => (
            <article key={a.caption + a.label} data-card className={`ach-card ${focus === i ? "is-focus" : ""}`} aria-label={`${a.caption} — ${a.label}`}>
              <div className="ach-body mt-auto flex items-end justify-between gap-4">
                <div className="ach-copy min-w-0 max-w-[58%]">
                  <p className="mono text-[10.5px] uppercase leading-[1.5] tracking-[.12em] text-mute">{a.label}</p>
                  <p className="mt-2 text-[18px] font-bold leading-[1.15] tracking-[-0.03em]">{a.caption}</p>
                  <p className="mt-2 text-[13.5px] leading-[1.45] text-ink-2">{a.detail}</p>
                </div>
                <p className="ach-num" aria-hidden>
                  <CountUp a={a} start={seen[i]} />
                </p>
              </div>
            </article>
          ))}
          <p className="ach-end">
            and <em className="serif-i">counting</em> →
          </p>
        </div>
      </div>
    </section>
  );
}
