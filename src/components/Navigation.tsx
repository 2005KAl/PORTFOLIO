"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget, setScrollLocked } from "@/lib/scroll";

type NavItem = (typeof NAV)[number];

export default function Navigation() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, visible: false });
  const progressRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const pillRef = useRef<HTMLDivElement>(null);

  // Only show links for sections that are actually on the page.
  useEffect(() => {
    setItems(NAV.filter((n) => document.getElementById(n.id)));
  }, []);

  // Scrolled state + top progress bar.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
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
    };
  }, []);

  // Active section tracking.
  useEffect(() => {
    if (!items.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const hero = document.getElementById("top");
    if (hero) io.observe(hero);
    items.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  // Slide the ink indicator under the active link.
  useLayoutEffect(() => {
    const measure = () => {
      const link = linkRefs.current[active];
      const pill = pillRef.current;
      if (!link || !pill) return setIndicator((s) => ({ ...s, visible: false }));
      const a = link.getBoundingClientRect();
      const p = pill.getBoundingClientRect();
      setIndicator({ x: a.left - p.left, w: a.width, visible: true });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, items]);

  // Mobile menu: lock scroll + Esc to close.
  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    setScrollLocked(false);
    scrollToTarget(id === "top" ? 0 : `#${id}`);
  };

  return (
    <>
      <style>{`
        .nav { position: fixed; inset: 0 0 auto 0; z-index: 50; pointer-events: none; }
        .nav-progress { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--ink); transform-origin: 0 50%; transform: scaleX(0); }
        .nav-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-top: 18px; }
        .nav-row > * { pointer-events: auto; }
        .nav-name { font-size: 14px; font-weight: 600; letter-spacing: -.02em; }
        .nav-pill { position: relative; display: flex; gap: 2px; padding: 5px; border-radius: 999px;
          transition: background-color .5s var(--ease), box-shadow .5s var(--ease), backdrop-filter .5s; }
        .nav.is-scrolled .nav-pill { background: rgba(255,255,255,.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          box-shadow: inset 0 0 0 1px var(--line), 0 8px 30px -12px rgba(13,13,13,.18); }
        .nav-ind { position: absolute; top: 5px; bottom: 5px; left: 0; border-radius: 999px; background: var(--ink);
          transition: transform .6s var(--ease), width .6s var(--ease), opacity .3s; }
        .nav-link { position: relative; z-index: 1; padding: 9px 15px; border-radius: 999px; font-size: 13.5px; font-weight: 500; color: var(--ink-2);
          transition: color .4s var(--ease); }
        .nav-link:hover { color: var(--ink); }
        .nav-link[aria-current="true"] { color: #fff; }
        .nav-menu-btn { display: none; height: 42px; padding: 0 18px; border-radius: 999px; background: rgba(255,255,255,.8);
          backdrop-filter: blur(12px); box-shadow: inset 0 0 0 1px var(--line); font-size: 13.5px; font-weight: 500; }
        .nav-overlay { position: fixed; inset: 0; z-index: 60; background: var(--paper); display: flex; flex-direction: column;
          padding: 18px var(--gutter) 40px; clip-path: circle(0% at calc(100% - 50px) 38px); visibility: hidden;
          transition: clip-path .8s var(--ease), visibility 0s .8s; }
        .nav-overlay.is-open { clip-path: circle(150% at calc(100% - 50px) 38px); visibility: visible; transition: clip-path .8s var(--ease); }
        .nav-overlay ol { margin-top: auto; display: grid; gap: 6px; }
        .nav-overlay li { opacity: 0; transform: translateY(30px); transition: opacity .6s var(--ease), transform .6s var(--ease); }
        .nav-overlay.is-open li { opacity: 1; transform: none; transition-delay: calc(150ms + var(--i) * 60ms); }
        .nav-overlay a { display: flex; align-items: baseline; gap: 14px; font-size: clamp(40px, 12vw, 64px); font-weight: 700; letter-spacing: -.045em; line-height: 1.05; }
        .nav-overlay a small { font-family: var(--font-mono); font-size: 12px; font-weight: 400; letter-spacing: 0; color: var(--mute); }
        @media (max-width: 860px) {
          .nav::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 76px; background: var(--paper); opacity: 0; box-shadow: 0 1px 0 var(--line); transition: opacity .4s var(--ease); }
          .nav.is-scrolled::before { opacity: .96; }
          .nav-row { position: relative; padding-top: 16px; }
          .nav-pill { display: none; }
          .nav-menu-btn { display: inline-flex; align-items: center; }
        }
      `}</style>

      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Primary">
        <div ref={progressRef} className="nav-progress" aria-hidden />
        <div className="wrap nav-row">
          <a href="#top" onClick={(e) => go(e, "top")} className="flex items-center gap-3">
            <span className="nav-name">{PROFILE.name}</span>
            <span className="sr-only"> — back to top</span>
          </a>

          {items.length > 0 && (
            <div ref={pillRef} className="nav-pill">
              <span
                className="nav-ind"
                aria-hidden
                style={{ width: indicator.w, transform: `translateX(${indicator.x - 5}px)`, opacity: indicator.visible ? 1 : 0, marginLeft: 5 }}
              />
              {items.map((n) => (
                <a
                  key={n.id}
                  ref={(el) => {
                    linkRefs.current[n.id] = el;
                  }}
                  href={`#${n.id}`}
                  onClick={(e) => go(e, n.id)}
                  className="nav-link"
                  aria-current={active === n.id ? "true" : undefined}
                >
                  {n.label}
                </a>
              ))}
            </div>
          )}

          <button className="nav-menu-btn" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu">
            Menu
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`nav-overlay ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <div className="flex items-center justify-between">
          <span className="nav-name">{PROFILE.name}</span>
          <button className="btn btn-ghost" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Close
          </button>
        </div>
        <ol>
          {items.map((n, i) => (
            <li key={n.id} style={{ "--i": i } as React.CSSProperties}>
              <a href={`#${n.id}`} onClick={(e) => go(e, n.id)} tabIndex={open ? 0 : -1}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {n.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
