"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;

export function scrollToTarget(target: string | number) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : null;
  if (lenis) {
    lenis.scrollTo(el ?? (target as number), { offset: 0, duration: 1.4 });
    return;
  }
  if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  else if (typeof target === "number") window.scrollTo({ top: target });
}

export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = requestAnimationFrame(function loop(t) {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
