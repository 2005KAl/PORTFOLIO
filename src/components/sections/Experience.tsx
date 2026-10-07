"use client";

import { useEffect, useRef, useState } from "react";
import { TIMELINE } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";

export default function Experience() {
  const pathRef = useRef<HTMLOListElement>(null);
  const spineRef = useRef<HTMLSpanElement>(null);
  const [lit, setLit] = useState(0); // number of stops the spine has reached

  // The spine draws with scroll progress; each stop lights up once the spine passes it.
  useEffect(() => {
    let raf = 0;
    let offsets: number[] = [];
    let lastH = -1;
    const measure = () => {
      offsets = Array.from(pathRef.current?.querySelectorAll<HTMLElement>("[data-stop]") ?? [], (s) => s.offsetTop + 22);
    };
    const update = () => {
      raf = 0;
      const el = pathRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Off-screen sections skip layout (content-visibility), so re-measure once real sizes exist.
      if (rect.height !== lastH) {
        lastH = rect.height;
        measure();
      }
      const head = window.innerHeight * 0.62 - rect.top; // px of the path above the "pen"
      const p = Math.min(1, Math.max(0, head / rect.height));
      if (spineRef.current) spineRef.current.style.transform = `scaleY(${p})`;
      setLit(offsets.filter((o) => o <= head).length);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      lastH = -1;
      onScroll();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="experience" className="section exp" aria-labelledby="exp-title">
      <style>{`
        .exp-path { position: relative; margin-top: 64px; display: grid; gap: 20px; }
        .exp-track, .exp-spine { position: absolute; top: 0; bottom: 0; left: 190px; width: 2px; margin-left: -1px; }
        .exp-track { background: repeating-linear-gradient(var(--faint) 0 4px, transparent 4px 10px); opacity: .6; }
        .exp-spine { background: var(--ink); transform-origin: top; transform: scaleY(0); }
        .exp-stop { position: relative; display: grid; grid-template-columns: 190px minmax(0, 1fr); }
        .exp-year { padding: 22px 40px 0 0; text-align: right; font-size: clamp(30px, 3.4vw, 46px); font-weight: 700; letter-spacing: -.05em; line-height: 1;
          color: var(--soft); transition: color .7s var(--ease); }
        .exp-dot { position: absolute; left: 190px; top: 30px; width: 14px; height: 14px; margin-left: -7px; border-radius: 50%; background: var(--paper);
          box-shadow: inset 0 0 0 2px var(--faint); transition: box-shadow .5s var(--ease), background-color .5s var(--ease), transform .6s var(--ease); }
        .exp-card { margin-left: 40px; padding: 24px 26px; opacity: .45; transform: translateX(12px);
          transition: opacity .7s var(--ease), transform .7s var(--ease), box-shadow .7s var(--ease); }
        .exp-stop.is-lit .exp-year { color: var(--ink); }
        .exp-stop.is-lit .exp-dot { background: var(--ink); box-shadow: 0 0 0 6px rgba(13,13,13,.08); transform: scale(1.1); }
        .exp-stop.is-lit .exp-card { opacity: 1; transform: none; box-shadow: inset 0 0 0 1px var(--line), 0 24px 50px -30px rgba(13,13,13,.3); }
        .exp-kind { display: inline-flex; height: 24px; align-items: center; padding: 0 10px; border-radius: 99px; font-family: var(--font-mono); font-size: 10px;
          letter-spacing: .12em; text-transform: uppercase; box-shadow: inset 0 0 0 1px rgba(13,13,13,.16); color: var(--ink-2); }
        .exp-kind.is-work { background: var(--ink); color: #fff; box-shadow: none; }
        .exp-next { margin-left: 40px; padding: 26px; border-radius: 26px; border: 1.5px dashed rgba(13,13,13,.22); }
        @media (max-width: 760px) {
          .exp-track, .exp-spine, .exp-dot { left: 7px; }
          .exp-stop { grid-template-columns: 1fr; padding-left: 30px; }
          .exp-year { padding: 0 0 10px; text-align: left; font-size: 30px; }
          .exp-dot { top: 6px; }
          .exp-card, .exp-next { margin-left: 0; }
          .exp-card { padding: 20px; }
        }
      `}</style>

      <div className="wrap">
        <SectionHead id="exp-title" title="Education &" accent="experience." />

        <ol ref={pathRef} className="exp-path">
          <span className="exp-track" aria-hidden />
          <span ref={spineRef} className="exp-spine" aria-hidden />
          {TIMELINE.map((t, i) => (
            <li key={t.title + t.period} data-stop className={`exp-stop ${i < lit ? "is-lit" : ""}`}>
              <span className="exp-year" aria-hidden>
                {t.year}
              </span>
              <span className="exp-dot" aria-hidden />
              <article className="exp-card card">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={`exp-kind ${t.kind === "Experience" ? "is-work" : ""}`}>{t.kind}</span>
                  <span className="mono text-[11.5px] tracking-[.06em] text-mute">{t.period}</span>
                </div>
                <h3 className="mt-4 text-[clamp(20px,2vw,26px)] font-bold leading-[1.15] tracking-[-0.035em]">{t.title}</h3>
                <p className="serif-i mt-1 text-[19px]">{t.place}</p>
                <p className="mt-3 max-w-[640px] text-[15px] leading-[1.6] text-ink-2">{t.detail}</p>
              </article>
            </li>
          ))}
          <li data-stop className={`exp-stop ${lit > TIMELINE.length ? "is-lit" : ""}`}>
            <span className="exp-year" aria-hidden>
              Next
            </span>
            <span className="exp-dot" aria-hidden />
            <div className="exp-next">
              <p className="mono text-[11px] uppercase tracking-[.14em] text-mute">Next —</p>
              <p className="mt-2 text-[clamp(22px,2.4vw,32px)] font-bold tracking-[-0.04em]">
                Your <em className="serif-i">team?</em>
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
