"use client";

import { useEffect } from "react";

/** Adds .is-in to every .rv / .rv-mask element the first time it enters the viewport. */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const observe = () =>
      document.querySelectorAll(".rv:not(.is-in), .rv-mask:not(.is-in)").forEach((el) => io.observe(el));
    observe();
    // Pick up elements rendered later (e.g. sections mounted after hydration).
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
