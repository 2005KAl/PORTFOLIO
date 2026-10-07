// Illustrative, grayscale mini-interfaces that hint at what each project does.
// They contain no real data or metrics — they are labelled "Illustrative UI" where shown.

const Bar = ({ w, h = 6, o = 1 }: { w: string; h?: number; o?: number }) => (
  <span className="block rounded-full bg-[var(--ink)]" style={{ width: w, height: h, opacity: o * 0.12 }} />
);

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mui">
      <div className="mui-top">
        <span className="mui-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="mono">{title}</span>
      </div>
      <div className="mui-body">{children}</div>
    </div>
  );
}

function NavShield() {
  return (
    <Shell title="nav-shield · offline">
      <div className="relative h-full overflow-hidden rounded-[14px] bg-[#f6f5f2]">
        <svg viewBox="0 0 300 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {Array.from({ length: 12 }, (_, i) => (
            <path key={`v${i}`} d={`M${i * 28} 0V220`} stroke="rgba(13,13,13,.06)" />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <path key={`h${i}`} d={`M0 ${i * 28}H300`} stroke="rgba(13,13,13,.06)" />
          ))}
          <path d="M20 190 C60 170 80 120 120 118 S190 90 210 60 260 30 280 26" fill="none" stroke="rgba(13,13,13,.25)" strokeWidth="8" strokeLinecap="round" />
          <path className="mui-draw" d="M20 190 C60 170 80 120 120 118 S170 100 196 76" fill="none" stroke="#0d0d0d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M196 76 C214 60 240 40 270 30" fill="none" stroke="#0d0d0d" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
          <circle cx="196" cy="76" r="14" fill="rgba(13,13,13,.08)" className="mui-pulse" />
          <circle cx="196" cy="76" r="5" fill="#0d0d0d" />
        </svg>
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="mui-chip">IMU</span>
          <span className="mui-chip is-off">GNSS ✕</span>
        </div>
        <div className="mui-card absolute bottom-3 right-3 w-[46%]">
          <span className="mono text-[9px] tracking-[.12em] text-mute">DRIFT PREDICTION</span>
          <div className="mt-2 flex h-8 items-end gap-[3px]">
            {[40, 55, 35, 70, 50, 62, 44, 80, 58].map((h, i) => (
              <span key={i} className="flex-1 rounded-[2px] bg-[var(--ink)]" style={{ height: `${h}%`, opacity: 0.15 + i * 0.07 }} />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Cardiac() {
  return (
    <Shell title="armband · live">
      <div className="mui-card flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="mono text-[9px] tracking-[.12em] text-mute">ECG</span>
          <span className="mui-live">LIVE</span>
        </div>
        <svg viewBox="0 0 240 60" className="my-auto h-[96px] w-full" preserveAspectRatio="none" aria-hidden>
          <path
            className="mui-ecg"
            d="M0 32 H40 l6 -4 6 4 H70 l4 6 6 -34 6 44 6 -16 H120 l6 -4 6 4 H150 l4 6 6 -34 6 44 6 -16 H200 l6 -4 6 4 H240"
            fill="none"
            stroke="#0d0d0d"
            strokeWidth="1.8"
            vectorEffect="non-scaling-stroke"
            pathLength={100}
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="mt-2.5 grid grid-cols-4 gap-2">
        {["SpO₂", "HR", "TEMP", "RESP"].map((k) => (
          <div key={k} className="mui-card !p-2.5">
            <span className="mono text-[8.5px] tracking-[.1em] text-mute">{k}</span>
            <div className="mt-2 space-y-1">
              <Bar w="80%" h={5} />
              <Bar w="55%" h={5} />
            </div>
          </div>
        ))}
      </div>
      <div className="mui-card mt-2.5 flex items-center gap-4">
        <svg viewBox="0 0 80 46" className="w-[84px] shrink-0" aria-hidden>
          <path d="M8 40 A32 32 0 0 1 72 40" fill="none" stroke="rgba(13,13,13,.1)" strokeWidth="7" strokeLinecap="round" />
          <path d="M8 40 A32 32 0 0 1 40 8" fill="none" stroke="#0d0d0d" strokeWidth="7" strokeLinecap="round" />
          <path d="M40 40 L30 18" stroke="#0d0d0d" strokeWidth="2" strokeLinecap="round" className="mui-needle" />
          <circle cx="40" cy="40" r="3" fill="#0d0d0d" />
        </svg>
        <div className="flex-1">
          <span className="mono text-[9px] tracking-[.12em] text-mute">RISK · RANDOM FOREST</span>
          <div className="mt-2 space-y-1.5">
            <Bar w="90%" />
            <Bar w="60%" />
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Scribe() {
  return (
    <Shell title="scribe · recording">
      <div className="grid h-full grid-cols-[1fr_38%] gap-2.5">
        <div className="flex flex-col gap-2.5">
          <div className="mui-card flex items-center gap-3">
            <span className="mui-rec" aria-hidden />
            <div className="flex h-7 flex-1 items-center gap-[3px]">
              {Array.from({ length: 26 }, (_, i) => (
                <span key={i} className="mui-wave flex-1 rounded-full bg-[var(--ink)]" style={{ "--k": i } as React.CSSProperties} />
              ))}
            </div>
          </div>
          <div className="mui-card flex-1">
            <span className="mono text-[9px] tracking-[.12em] text-mute">CLINICAL NOTE</span>
            <div className="mt-3 space-y-2">
              {["92%", "70%", "84%", "40%", "76%", "58%"].map((w, i) => (
                <Bar key={i} w={w} o={i % 3 === 0 ? 2 : 1} />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="mui-chip">Symptoms</span>
              <span className="mui-chip">Diagnosis</span>
              <span className="mui-chip">Plan</span>
            </div>
          </div>
        </div>
        <div className="mui-card relative grid place-items-center">
          <svg viewBox="0 0 60 140" className="h-[85%]" aria-hidden>
            <g fill="none" stroke="#0d0d0d" strokeWidth="1.3" strokeLinejoin="round">
              <circle cx="30" cy="14" r="9" />
              <path d="M18 30 Q30 26 42 30 L46 72 L40 74 L39 132 L32 132 L30 84 L28 132 L21 132 L20 74 L14 72 Z" />
            </g>
            <circle cx="34" cy="44" r="6" fill="rgba(13,13,13,.18)" className="mui-pulse" />
            <circle cx="34" cy="44" r="2.4" fill="#0d0d0d" />
          </svg>
          <span className="mono absolute bottom-2 text-[8.5px] tracking-[.12em] text-mute">3D VIEW</span>
        </div>
      </div>
    </Shell>
  );
}

function Hospital() {
  return (
    <Shell title="hospital · dashboard">
      <div className="grid grid-cols-3 gap-2">
        {["PATIENTS", "ADMISSIONS", "DOCTORS"].map((k) => (
          <div key={k} className="mui-card !p-2.5">
            <span className="mono text-[8.5px] tracking-[.1em] text-mute">{k}</span>
            <div className="mt-2 flex h-7 items-end gap-[3px]">
              {[30, 50, 40, 70, 60, 85].map((h, i) => (
                <span key={i} className="mui-grow flex-1 rounded-[2px] bg-[var(--ink)]" style={{ height: `${h}%`, opacity: 0.18 + i * 0.12, "--k": i } as React.CSSProperties} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mui-card mt-2.5 flex-1 overflow-hidden !p-0">
        <div className="mono grid grid-cols-[1.3fr_1fr_.8fr] gap-2 border-b border-[var(--line)] px-3 py-2 text-[8.5px] tracking-[.1em] text-mute">
          <span>PATIENT</span>
          <span>DEPARTMENT</span>
          <span>STATUS</span>
        </div>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((r) => (
          <div key={r} className={`grid grid-cols-[1.3fr_1fr_.8fr] items-center gap-2 px-3 py-[9px] border-b border-[var(--line)]`}>
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[var(--soft)]" />
              <Bar w={`${60 + ((r * 17) % 30)}%`} />
            </span>
            <Bar w={`${45 + ((r * 23) % 40)}%`} />
            <span className={`mui-status ${r % 2 ? "" : "is-on"}`} />
          </div>
        ))}
      </div>
    </Shell>
  );
}

function HousePrice() {
  const pins = [
    [22, 30],
    [48, 22],
    [70, 40],
    [36, 58],
    [60, 66],
    [82, 70],
  ];
  return (
    <Shell title="house-price · map">
      <div className="relative h-full overflow-hidden rounded-[14px] bg-[#f6f5f2]">
        <svg viewBox="0 0 300 220" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <path d="M-10 150 C60 130 90 160 160 120 S260 90 320 110" fill="none" stroke="rgba(13,13,13,.08)" strokeWidth="18" />
          <path d="M80 -10 L120 240 M200 -10 L170 240 M-10 70 L320 50" stroke="rgba(13,13,13,.09)" strokeWidth="5" />
          <path d="M-10 190 L320 170 M250 -10 L270 240" stroke="rgba(13,13,13,.06)" strokeWidth="3" />
        </svg>
        {pins.map(([x, y], i) => (
          <span key={i} className={`mui-pin ${i === 3 ? "is-on" : ""}`} style={{ left: `${x}%`, top: `${y}%`, "--k": i } as React.CSSProperties} />
        ))}
        <div className="mui-card absolute right-3 top-3 w-[44%]">
          <span className="mono text-[9px] tracking-[.12em] text-mute">PREDICTED PRICE</span>
          <div className="mt-2">
            <Bar w="75%" h={10} o={3} />
          </div>
          <div className="mt-3 space-y-1.5">
            {["Neighborhood", "Amenities"].map((k, i) => (
              <div key={k} className="flex items-center gap-2">
                <span className="w-[62px] text-[9.5px] text-mute">{k}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[rgba(13,13,13,.08)]">
                  <span className="mui-fill block h-full rounded-full bg-[var(--ink)]" style={{ width: i ? "58%" : "82%" }} />
                </span>
              </div>
            ))}
          </div>
        </div>
        <span className="mui-chip absolute bottom-3 left-3">POST /predict</span>
      </div>
    </Shell>
  );
}

export const MINI_UI: Record<string, () => React.ReactElement> = {
  "nav-shield": NavShield,
  "cardiac-armband": Cardiac,
  "medical-scribe": Scribe,
  "hospital-dbms": Hospital,
  "house-price": HousePrice,
};

export const MINI_UI_CSS = `
  .mui { height: 100%; display: flex; flex-direction: column; border-radius: 20px; background: #fbfaf8; box-shadow: inset 0 0 0 1px var(--line), 0 30px 60px -36px rgba(13,13,13,.35); overflow: hidden; }
  .mui-top { display: flex; align-items: center; gap: 10px; height: 34px; padding: 0 12px; border-bottom: 1px solid var(--line); font-size: 10px; letter-spacing: .08em; color: var(--mute); }
  .mui-dots { display: flex; gap: 5px; } .mui-dots i { width: 7px; height: 7px; border-radius: 50%; background: rgba(13,13,13,.14); }
  .mui-body { flex: 1; padding: 12px; min-height: 0; display: flex; flex-direction: column; }
  .mui-body > .relative, .mui-body > .grid.h-full { flex: 1; }
  .mui-card { background: #fff; border-radius: 12px; padding: 12px; box-shadow: inset 0 0 0 1px var(--line); }
  .mui-chip { display: inline-flex; align-items: center; height: 20px; padding: 0 8px; border-radius: 99px; background: #fff; box-shadow: inset 0 0 0 1px var(--line);
    font-family: var(--font-mono); font-size: 8.5px; letter-spacing: .08em; color: var(--ink-2); }
  .mui-chip.is-off { color: var(--mute); text-decoration: line-through; }
  .mui-live { font-family: var(--font-mono); font-size: 8.5px; letter-spacing: .12em; display: inline-flex; align-items: center; gap: 5px; }
  .mui-live::before, .mui-rec { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--ink); animation: blink 1.4s ease-in-out infinite; }
  .mui-rec { width: 10px; height: 10px; flex-shrink: 0; }
  @keyframes blink { 50% { opacity: .2; } }
  .mui-draw { stroke-dasharray: 400; stroke-dashoffset: 400; animation: draw 2.4s var(--ease) .3s forwards; }
  @keyframes draw { to { stroke-dashoffset: 0; } }
  .mui-ecg { stroke-dasharray: 100; stroke-dashoffset: 100; animation: ecg 2.8s linear infinite; }
  @keyframes ecg { 0% { stroke-dashoffset: 100; } 80%, 100% { stroke-dashoffset: 0; } }
  .mui-pulse { transform-box: fill-box; transform-origin: center; animation: pulse 2s var(--ease) infinite; }
  @keyframes pulse { 0% { transform: scale(.6); opacity: 1; } 100% { transform: scale(2.2); opacity: 0; } }
  .mui-needle { transform-box: view-box; transform-origin: 40px 40px; animation: needle 3.6s var(--ease) infinite alternate; }
  @keyframes needle { from { transform: rotate(-30deg); } to { transform: rotate(18deg); } }
  .mui-wave { height: 30%; opacity: .75; animation: wave 1.1s ease-in-out infinite alternate; animation-delay: calc(var(--k) * -73ms); }
  @keyframes wave { to { height: 100%; } }
  .mui-grow { transform-origin: bottom; animation: grow 1s var(--ease) both; animation-delay: calc(var(--k) * 70ms + .2s); }
  @keyframes grow { from { transform: scaleY(0); } }
  .mui-status { width: 44px; height: 16px; border-radius: 99px; box-shadow: inset 0 0 0 1px rgba(13,13,13,.2); }
  .mui-status.is-on { background: var(--ink); box-shadow: none; }
  .mui-pin { position: absolute; width: 14px; height: 14px; margin: -14px 0 0 -7px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg);
    background: #fff; box-shadow: inset 0 0 0 2px var(--ink); animation: drop .7s var(--ease) both; animation-delay: calc(var(--k) * 90ms + .2s); }
  .mui-pin.is-on { background: var(--ink); width: 20px; height: 20px; margin: -20px 0 0 -10px; }
  @keyframes drop { from { opacity: 0; translate: 0 -16px; } }
  .mui-fill { transform-origin: left; animation: fill 1.4s var(--ease) both .4s; }
  @keyframes fill { from { transform: scaleX(0); } }
`;
