import { CERTIFICATIONS } from "@/lib/data";

const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

export default function Certifications() {
  const issuers = new Set(CERTIFICATIONS.map((c) => c.issuer));

  return (
    <section id="certifications" className="section cert" aria-labelledby="cert-title">
      <style>{`
        .cert { background: var(--card); border-block: 1px solid var(--line); }
        .cert-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(32px, 6vw, 96px); align-items: start; }
        .cert-head { position: sticky; top: 120px; }
        .cert-list { border-top: 1px solid var(--line); counter-reset: c; }
        .cert-row { position: relative; display: grid; grid-template-columns: 56px minmax(0,1fr) auto; align-items: center; gap: 18px;
          padding: 28px 22px; border-bottom: 1px solid var(--line); isolation: isolate; overflow: hidden; outline: none;
          transition: color .55s var(--ease); }
        .cert-row::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--ink); transform: scaleX(0); transform-origin: 0 50%;
          transition: transform .7s var(--ease); }
        .cert-row:hover, .cert-row:focus-visible { color: #fff; }
        .cert-row:hover::before, .cert-row:focus-visible::before { transform: scaleX(1); }
        .cert-n { font-family: var(--font-mono); font-size: 12px; color: var(--faint); transition: color .55s var(--ease); }
        .cert-row:hover .cert-n, .cert-row:focus-visible .cert-n { color: rgba(255,255,255,.5); }
        .cert-title { font-size: clamp(19px, 1.9vw, 26px); font-weight: 600; letter-spacing: -.03em; line-height: 1.2; }
        .cert-meta { margin-top: 6px; font-size: 14px; color: var(--mute); transition: color .55s var(--ease); }
        .cert-row:hover .cert-meta, .cert-row:focus-visible .cert-meta { color: rgba(255,255,255,.62); }
        .cert-mark { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(255,255,255,.35);
          opacity: 0; transform: translateX(-16px); transition: opacity .5s var(--ease), transform .6s var(--ease); }
        .cert-row:hover .cert-mark, .cert-row:focus-visible .cert-mark { opacity: 1; transform: none; transition-delay: .12s; }
        @media (max-width: 860px) {
          .cert-grid { grid-template-columns: 1fr; }
          .cert-head { position: static; }
          .cert-row { grid-template-columns: 40px minmax(0,1fr); padding: 22px 12px; }
          .cert-mark { display: none; }
        }
      `}</style>

      <div className="wrap cert-grid">
        <div className="cert-head">
          <h2 id="cert-title" className="h-display text-[clamp(44px,6vw,88px)]">
            <span className="rv-mask">
              <span>Always</span>
            </span>
            <span className="rv-mask" style={{ "--i": 1 } as React.CSSProperties}>
              <span>
                <em>learning.</em>
              </span>
            </span>
          </h2>
          <p className="rv mt-6 max-w-[360px] text-[15px] leading-[1.6] text-mute" style={{ "--i": 2 } as React.CSSProperties}>
            {words[CERTIFICATIONS.length] ?? CERTIFICATIONS.length} certifications from {[...issuers].join(", ")}, covering operating systems and databases.
          </p>
        </div>

        <ol className="cert-list" aria-label="Certifications">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="cert-row rv" tabIndex={0} style={{ "--i": i } as React.CSSProperties}>
              <span className="cert-n" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="cert-title">{c.title}</p>
                <p className="cert-meta">
                  {c.issuer}
                  {c.date ? ` · ${c.date}` : ""}
                </p>
              </div>
              <span className="cert-mark" aria-hidden>
                ✓
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
