"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

/** Each letter hops when the cursor passes over it. */
function HopLine({ text, italic = false }: { text: string; italic?: boolean }) {
  return (
    <span className={`ct-line ${italic ? "serif-i" : ""}`} aria-hidden>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span key={i} className="ct-hop" onMouseEnter={(e) => restart(e.currentTarget)}>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

function restart(el: HTMLElement) {
  el.classList.remove("is-hop");
  void el.offsetWidth; // reflow so the animation can replay
  el.classList.add("is-hop");
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  const links = [
    { label: "Phone", value: PROFILE.phone, href: PROFILE.phoneHref },
    { label: "GitHub", value: PROFILE.github.replace("https://", ""), href: PROFILE.github, external: true },
    { label: "LinkedIn", value: "in/kalai-maha-t", href: PROFILE.linkedin, external: true },
    { label: "Location", value: PROFILE.location },
  ];

  return (
    <section id="contact" className="ct" aria-labelledby="ct-title">
      <style>{`
        .ct { padding-top: var(--section-pad); }
        .ct-title { font-size: clamp(50px, 10vw, 168px); font-weight: 700; letter-spacing: -.055em; line-height: .95; }
        .ct-line { display: block; white-space: nowrap; }
        .ct-line.serif-i { letter-spacing: -.02em; }
        .ct-hop { display: inline-block; }
        .ct-hop.is-hop { animation: hop .6s var(--ease); }
        @keyframes hop { 0% { transform: none; } 35% { transform: translateY(-.16em); } 70% { transform: translateY(.03em); } 100% { transform: none; } }
        .ct-mail { font-size: clamp(22px, 3.6vw, 52px); font-weight: 600; letter-spacing: -.04em; overflow-wrap: anywhere;
          background: linear-gradient(var(--ink), var(--ink)) 0 100% / 100% 2px no-repeat; padding-bottom: 4px; transition: background-size .6s var(--ease); }
        .ct-mail:hover { background-size: 0% 2px; background-position: 100% 100%; }
        .ct-copy { height: 36px; padding: 0 14px; border-radius: 99px; font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
          box-shadow: inset 0 0 0 1px rgba(13,13,13,.18); transition: background-color .4s var(--ease), color .4s var(--ease); }
        .ct-copy:hover, .ct-copy.is-done { background: var(--ink); color: #fff; }
        .ct-links { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); border-top: 1px solid var(--line); }
        .ct-links > div { padding: 20px 20px 20px 0; }
        .ct-links dt { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--mute); }
        .ct-links dd { margin-top: 6px; font-size: 15px; font-weight: 500; overflow-wrap: anywhere; }
        .ct-links a:hover { text-decoration: underline; text-underline-offset: 4px; }
        .ct-badge { width: 132px; height: 132px; flex-shrink: 0; position: relative; display: grid; place-items: center; }
        .ct-badge svg { position: absolute; inset: 0; animation: spin 18s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ct-foot { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 12px; padding-block: 28px; margin-top: clamp(64px, 10vh, 120px);
          border-top: 1px solid var(--line); font-size: 13px; color: var(--mute); }
        .ct-foot a:hover { color: var(--ink); }
        @media (max-width: 860px) { .ct-links { grid-template-columns: 1fr 1fr; } .ct-badge { display: none; } }
      `}</style>

      <div className="wrap">

        <div className="flex items-end justify-between gap-8">
          <h2 id="ct-title" className="ct-title rv">
            <span className="sr-only">Let&apos;s build something together.</span>
            <HopLine text="Let's build" />
            <HopLine text="something together." italic />
          </h2>
          <div className="ct-badge rv" aria-hidden>
            <svg viewBox="0 0 132 132">
              <defs>
                <path id="ct-circle" d="M66 66m-52 0a52 52 0 1 1 104 0a52 52 0 1 1-104 0" />
              </defs>
              <text className="mono" fontSize="11" fill="#0d0d0d">
                <textPath href="#ct-circle" textLength="324" lengthAdjust="spacing">
                  SAY HELLO · SAY HELLO · SAY HELLO ·
                </textPath>
              </text>
            </svg>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--ink)] text-[18px] text-white">↗</span>
          </div>
        </div>

        <div className="rv mt-14 flex flex-wrap items-center gap-4">
          <a href={`mailto:${PROFILE.email}`} className="ct-mail">
            {PROFILE.email}
          </a>
          <button className={`ct-copy ${copied ? "is-done" : ""}`} onClick={copy}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>

        <dl className="ct-links rv mt-12">
          {links.map((l) => (
            <div key={l.label}>
              <dt>{l.label}</dt>
              <dd>
                {l.href ? (
                  <a href={l.href} {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                    {l.value}
                    {l.external && <span aria-hidden> ↗</span>}
                  </a>
                ) : (
                  l.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <footer className="ct-foot">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget(0);
            }}
          >
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
