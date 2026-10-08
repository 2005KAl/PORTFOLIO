function Illustration({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mui">
      <div className="mui-heading">
        <span>{title}</span>
        <span className="mui-mark" aria-hidden />
      </div>
      <svg className="mui-art" viewBox="0 0 400 300" role="img" aria-label={title}>
        {children}
      </svg>
    </div>
  );
}

function NavShield() {
  return (
    <Illustration title="Offline navigation">
      <rect className="mui-phone" x="38" y="14" width="192" height="272" rx="24" />
      <rect x="48" y="34" width="172" height="230" rx="15" fill="#f4f2ed" />
      <path className="mui-road" d="M48 86H220M48 142H220M48 202H220M94 34V264M158 34V264" />
      <path className="mui-road-wide" d="M52 233C83 210 88 162 123 149S173 131 181 80 205 60 217 48" />
      <path className="mui-route" d="M65 225C91 205 95 164 126 151S171 132 181 84" />
      <circle className="mui-location-halo" cx="65" cy="225" r="14" />
      <circle className="mui-location" cx="65" cy="225" r="6" />
      <rect x="108" y="19" width="53" height="5" rx="3" fill="#c8c6c0" />
      <g className="mui-satellite" transform="translate(270 50)">
        <rect x="20" y="18" width="42" height="34" rx="6" className="mui-device" />
        <path d="M28 18V52M54 18V52M20 35H62" className="mui-detail" />
        <path d="M20 24H2V46H20M62 24H80V46H62" className="mui-panel" />
        <path d="M40 52V67L31 75M40 67L50 75" className="mui-detail" />
      </g>
      <path className="mui-signal mui-signal-one" d="M306 139Q330 158 306 177" />
      <path className="mui-signal mui-signal-two" d="M320 129Q356 158 320 187" />
      <path className="mui-signal mui-signal-three" d="M334 119Q382 158 334 197" />
      <text x="266" y="222" className="mui-caption">GNSS LOST</text>
      <text x="266" y="241" className="mui-caption">DEAD RECKONING</text>
    </Illustration>
  );
}

function Cardiac() {
  return (
    <Illustration title="Cardiac risk armband">
      <path className="mui-band" d="M74 57Q42 150 74 244L116 244Q94 150 116 57Z" />
      <path className="mui-band-line" d="M78 76Q61 150 79 225M102 76Q88 150 103 225" />
      <rect className="mui-device" x="105" y="100" width="188" height="102" rx="25" />
      <rect x="119" y="112" width="160" height="78" rx="16" fill="#f4f2ed" />
      <path className="mui-heart" d="M156 143C156 128 176 125 183 139C190 125 210 128 210 143C210 159 183 176 183 176S156 159 156 143Z" />
      <path className="mui-ecg" d="M122 158H147L155 153L164 163L174 140L184 174L194 153L201 158H276" />
      <path d="M299 84A54 54 0 0 1 353 138" className="mui-gauge-track" />
      <path d="M299 84A54 54 0 0 1 348 105" className="mui-gauge-active" />
      <path className="mui-needle" d="M299 138L326 98" />
      <circle cx="299" cy="138" r="5" className="mui-dot" />
      <text x="272" y="169" className="mui-caption">RISK</text>
      <text x="272" y="190" className="mui-caption-strong">LIVE</text>
      <path d="M282 215H351" className="mui-detail" />
      <text x="282" y="236" className="mui-caption">SENSOR ACTIVE</text>
    </Illustration>
  );
}

function Scribe() {
  return (
    <Illustration title="AI medical scribe">
      <rect className="mui-paper" x="38" y="34" width="195" height="232" rx="14" />
      <text x="58" y="62" className="mui-caption">CLINICAL NOTE</text>
      <path d="M58 76H207" className="mui-detail" />
      <text x="58" y="101" className="mui-caption">PATIENT SUMMARY</text>
      <rect className="mui-type mui-type-one" x="58" y="113" width="140" height="5" rx="3" />
      <rect className="mui-type mui-type-two" x="58" y="126" width="112" height="5" rx="3" />
      <text x="58" y="157" className="mui-caption">ASSESSMENT</text>
      <rect className="mui-type mui-type-three" x="58" y="169" width="149" height="5" rx="3" />
      <rect className="mui-type mui-type-four" x="58" y="182" width="120" height="5" rx="3" />
      <rect className="mui-type mui-type-five" x="58" y="195" width="135" height="5" rx="3" />
      <rect x="58" y="222" width="74" height="22" rx="11" className="mui-tag" />
      <text x="70" y="237" className="mui-caption">STRUCTURED</text>
      <path className="mui-mic-stem" d="M278 106V145A22 22 0 0 0 322 145V106" />
      <rect className="mui-mic" x="286" y="76" width="28" height="76" rx="14" />
      <path d="M270 142A30 30 0 0 0 330 142M300 172V190M285 190H315" className="mui-mic-stem" />
      <g className="mui-sound">
        <path d="M259 111V136M268 99V150M277 108V141M323 108V141M332 99V150M341 111V136" className="mui-wave" />
      </g>
      <path d="M349 75C368 86 379 102 379 121V183C379 202 368 218 349 229" className="mui-body-outline" />
      <path d="M349 95C362 104 367 113 367 126V178C367 191 362 201 349 209" className="mui-body-outline" />
      <path className="mui-scan" d="M350 151H379" />
    </Illustration>
  );
}

function Hospital() {
  return (
    <Illustration title="Hospital data system">
      <path className="mui-building" d="M30 262V96L114 48L198 96V262Z" />
      <path d="M103 48V29H125V54" className="mui-building-detail" />
      <path d="M105 66V90M93 78H117" className="mui-cross" />
      <path d="M26 262H208" className="mui-building-detail" />
      {Array.from({ length: 12 }, (_, i) => {
        const x = 54 + (i % 3) * 42;
        const y = 116 + Math.floor(i / 3) * 34;
        return <rect key={i} className={`mui-window mui-window-${i + 1}`} x={x} y={y} width="18" height="19" rx="3" />;
      })}
      <path className="mui-data-line" d="M204 150H265M204 191H265" />
      <circle className="mui-packet mui-packet-one" cx="211" cy="150" r="5" />
      <circle className="mui-packet mui-packet-two" cx="211" cy="191" r="5" />
      <ellipse className="mui-db" cx="318" cy="129" rx="48" ry="15" />
      <path className="mui-db" d="M270 129V203C270 212 291 220 318 220S366 212 366 203V129" />
      <path d="M270 153C270 162 291 170 318 170S366 162 366 153M270 178C270 187 291 195 318 195S366 187 366 178" className="mui-db-line" />
      <rect className="mui-dashboard-bar mui-bar-one" x="281" y="239" width="12" height="19" rx="3" />
      <rect className="mui-dashboard-bar mui-bar-two" x="301" y="229" width="12" height="29" rx="3" />
      <rect className="mui-dashboard-bar mui-bar-three" x="321" y="215" width="12" height="43" rx="3" />
      <rect className="mui-dashboard-bar mui-bar-four" x="341" y="201" width="12" height="57" rx="3" />
      <text x="275" y="279" className="mui-caption">LIVE RECORDS</text>
    </Illustration>
  );
}

function HousePrice() {
  return (
    <Illustration title="House price prediction">
      <path d="M20 191C95 172 123 219 191 189S306 153 386 170M30 77L159 286M238 18L185 286M20 119L386 93M53 24L362 277" className="mui-map-line" />
      <path d="M143 111L202 65L261 111V176H143Z" className="mui-house" />
      <path d="M132 114L202 58L272 114M187 176V133H216V176" className="mui-house-detail" />
      <rect x="158" y="123" width="20" height="19" rx="3" className="mui-house-window" />
      <rect x="227" y="123" width="20" height="19" rx="3" className="mui-house-window" />
      <g className="mui-pin mui-pin-one" transform="translate(93 107)">
        <path d="M0 18C-8 9-12 5-12 0A12 12 0 1 1 12 0C12 5 8 9 0 18Z" />
        <circle cy="0" r="3" className="mui-pin-hole" />
      </g>
      <g className="mui-pin mui-pin-two" transform="translate(304 91)">
        <path d="M0 18C-8 9-12 5-12 0A12 12 0 1 1 12 0C12 5 8 9 0 18Z" />
        <circle cy="0" r="3" className="mui-pin-hole" />
      </g>
      <g className="mui-pin mui-pin-three" transform="translate(316 202)">
        <path d="M0 18C-8 9-12 5-12 0A12 12 0 1 1 12 0C12 5 8 9 0 18Z" />
        <circle cy="0" r="3" className="mui-pin-hole" />
      </g>
      <g className="mui-price-tag">
        <path d="M282 27H359L372 40L359 53H282Z" className="mui-tag" />
        <circle cx="292" cy="40" r="3" className="mui-tag-hole" />
        <text x="306" y="44" className="mui-caption-strong">$</text>
      </g>
      <path className="mui-chart-axis" d="M40 254V216M40 254H122" />
      <path className="mui-trend" d="M47 245L65 236L77 239L93 223L111 218" />
    </Illustration>
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
  .mui { position: relative; height: 100%; min-height: 0; overflow: hidden; border-radius: 20px; background: #f8f7f3;
    box-shadow: inset 0 0 0 1px var(--line), 0 30px 60px -36px rgba(13,13,13,.35); }
  .mui-heading { position: absolute; z-index: 1; top: 14px; left: 16px; right: 16px; display: flex; align-items: center; justify-content: space-between;
    color: var(--mute); font-family: var(--font-mono); font-size: 9px; letter-spacing: .14em; text-transform: uppercase; }
  .mui-mark { width: 7px; height: 7px; border-radius: 50%; background: var(--ink); }
  .mui-art { display: block; width: 100%; height: 100%; }
  .mui-phone, .mui-paper { fill: #fff; stroke: #0d0d0d; stroke-width: 1.4; }
  .mui-road { fill: none; stroke: #dedcd6; stroke-width: 1.2; }
  .mui-road-wide { fill: none; stroke: #d2d0ca; stroke-width: 8; stroke-linecap: round; }
  .mui-route { fill: none; stroke: #0d0d0d; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 160; animation: mui-route-draw 2s ease-out both; }
  @keyframes mui-route-draw { from { stroke-dashoffset: 160; } to { stroke-dashoffset: 0; } }
  .mui-location-halo { fill: rgba(13,13,13,.12); animation: mui-location-pulse 1.8s ease-out infinite; }
  .mui-location { fill: #0d0d0d; animation: mui-location-move 6s ease-in-out infinite alternate; }
  @keyframes mui-location-pulse { 50% { opacity: .3; transform: scale(1.6); transform-origin: center; } }
  @keyframes mui-location-move { 0% { translate: 0 0; } 35% { translate: 46px -37px; } 70% { translate: 82px -55px; } 100% { translate: 116px -140px; } }
  .mui-satellite { animation: mui-satellite-float 3.8s ease-in-out infinite alternate; }
  @keyframes mui-satellite-float { to { translate: 0 -5px; } }
  .mui-device, .mui-panel { fill: #fff; stroke: #0d0d0d; stroke-width: 1.7; }
  .mui-detail { fill: none; stroke: rgba(13,13,13,.28); stroke-width: 1.5; }
  .mui-signal { fill: none; stroke: #0d0d0d; stroke-width: 2; stroke-linecap: round; animation: mui-signal-drop 1.8s ease-in-out infinite; }
  .mui-signal-two { animation-delay: .35s; }
  .mui-signal-three { animation-delay: .7s; }
  @keyframes mui-signal-drop { 0%, 35% { opacity: .85; } 70%, 100% { opacity: .08; } }
  .mui-caption { fill: #77756f; font-family: var(--font-mono); font-size: 8px; letter-spacing: 1px; }
  .mui-caption-strong { fill: #0d0d0d; font-family: var(--font-mono); font-size: 12px; font-weight: 700; letter-spacing: 1px; }
  .mui-band { fill: #e7e5df; stroke: #0d0d0d; stroke-width: 1.5; }
  .mui-band-line { fill: none; stroke: #aaa8a1; stroke-width: 1.3; }
  .mui-heart { fill: #d7d5cf; stroke: #0d0d0d; stroke-width: 1.4; transform-box: fill-box; transform-origin: center; animation: mui-heartbeat 1.05s ease-in-out infinite; }
  @keyframes mui-heartbeat { 0%, 30%, 60%, 100% { transform: scale(1); } 15%, 45% { transform: scale(1.13); } }
  .mui-ecg { fill: none; stroke: #0d0d0d; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 270; animation: mui-ecg-scroll 2.2s linear infinite; }
  @keyframes mui-ecg-scroll { to { stroke-dashoffset: -270; } }
  .mui-gauge-track { fill: none; stroke: #d8d6d0; stroke-width: 9; stroke-linecap: round; }
  .mui-gauge-active { fill: none; stroke: #0d0d0d; stroke-width: 9; stroke-linecap: round; }
  .mui-needle { fill: none; stroke: #0d0d0d; stroke-width: 2.5; stroke-linecap: round; transform-box: view-box; transform-origin: 299px 138px; animation: mui-needle-swing 2.8s ease-in-out infinite alternate; }
  @keyframes mui-needle-swing { from { transform: rotate(-25deg); } to { transform: rotate(25deg); } }
  .mui-dot { fill: #0d0d0d; }
  .mui-mic, .mui-tag { fill: #e7e5df; stroke: #0d0d0d; stroke-width: 1.5; }
  .mui-mic-stem, .mui-body-outline { fill: none; stroke: #0d0d0d; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
  .mui-wave { fill: none; stroke: #0d0d0d; stroke-width: 2; stroke-linecap: round; animation: mui-waveform .65s ease-in-out infinite alternate; transform-origin: center; }
  @keyframes mui-waveform { to { transform: scaleY(.3); } }
  .mui-type { fill: #aaa8a1; transform-box: fill-box; transform-origin: left; animation: mui-type-line .8s steps(12, end) both; }
  .mui-type-one { animation-delay: .2s; } .mui-type-two { animation-delay: .65s; } .mui-type-three { animation-delay: 1.1s; }
  .mui-type-four { animation-delay: 1.55s; } .mui-type-five { animation-delay: 2s; }
  @keyframes mui-type-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .mui-tag { fill: #eeece6; stroke: none; }
  .mui-building { fill: #fff; stroke: #0d0d0d; stroke-width: 1.6; stroke-linejoin: round; }
  .mui-building-detail, .mui-cross { fill: none; stroke: #0d0d0d; stroke-width: 1.6; stroke-linecap: round; }
  .mui-cross { stroke-width: 3; }
  .mui-window { fill: #d8d6d0; stroke: #aaa8a1; stroke-width: 1; animation: mui-window-light 2.8s ease-in-out infinite alternate; }
  .mui-window-2, .mui-window-5, .mui-window-8, .mui-window-11 { animation-delay: .35s; }
  .mui-window-3, .mui-window-6, .mui-window-9, .mui-window-12 { animation-delay: .7s; }
  @keyframes mui-window-light { to { fill: #0d0d0d; } }
  .mui-data-line, .mui-db-line { fill: none; stroke: #aaa8a1; stroke-width: 1.5; stroke-dasharray: 4 5; }
  .mui-packet { fill: #0d0d0d; animation: mui-packet-flow 1.8s linear infinite; }
  .mui-packet-two { animation-delay: .9s; }
  @keyframes mui-packet-flow { to { translate: 58px 0; opacity: .15; } }
  .mui-db { fill: #eeece6; stroke: #0d0d0d; stroke-width: 1.5; }
  .mui-dashboard-bar { fill: #0d0d0d; transform-box: fill-box; transform-origin: bottom; animation: mui-bar-rise 1.1s ease-out both; }
  .mui-bar-two { animation-delay: .15s; } .mui-bar-three { animation-delay: .3s; } .mui-bar-four { animation-delay: .45s; }
  @keyframes mui-bar-rise { from { transform: scaleY(.05); } }
  .mui-map-line { fill: none; stroke: #dedcd6; stroke-width: 5; }
  .mui-house { fill: #fff; stroke: #0d0d0d; stroke-width: 1.6; stroke-linejoin: round; }
  .mui-house-detail { fill: none; stroke: #0d0d0d; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .mui-house-window { fill: #dedcd6; stroke: #0d0d0d; stroke-width: 1; }
  .mui-pin { fill: #0d0d0d; transform-box: fill-box; transform-origin: top; animation: mui-pin-drop .65s cubic-bezier(.2,.8,.2,1) both; }
  .mui-pin-two { animation-delay: .25s; } .mui-pin-three { animation-delay: .5s; }
  .mui-pin-hole { fill: #f8f7f3; }
  @keyframes mui-pin-drop { from { opacity: 0; translate: 0 -24px; } }
  .mui-price-tag { transform-box: fill-box; transform-origin: 0 0; animation: mui-tag-swing 2.7s ease-in-out infinite alternate; }
  .mui-tag-hole { fill: #f8f7f3; }
  @keyframes mui-tag-swing { from { rotate: -6deg; } to { rotate: 7deg; } }
  .mui-chart-axis { fill: none; stroke: #aaa8a1; stroke-width: 1.5; stroke-linecap: round; }
  .mui-trend { fill: none; stroke: #0d0d0d; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 100; animation: mui-trend-draw 2s ease-out both; }
  @keyframes mui-trend-draw { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
  @media (prefers-reduced-motion: reduce) {
    .mui *, .mui *::before, .mui *::after { animation: none !important; }
    .mui-route, .mui-trend { stroke-dashoffset: 0; }
    .mui-location { translate: 116px -140px; }
    .mui-location-halo { opacity: .45; }
    .mui-type { transform: none; }
    .mui-pin { opacity: 1; }
    .mui-window { fill: #d8d6d0; }
  }
`;
