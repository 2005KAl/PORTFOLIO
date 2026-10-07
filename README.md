# Kalai Maha T — Engineering Portfolio

A single-page personal portfolio for **Kalai Maha T, AI & ML Engineer**.
Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 and Lenis smooth scroll.
Quiet paper/ink grayscale design; every section has its own component and animation.

## Requirements

- [Node.js](https://nodejs.org) 18.18 or newer (built and tested on Node 24)
- npm (comes with Node)

## Run it

```bash
npm install        # first time only — installs dependencies
npm run dev        # development server → http://localhost:3000
```

Production:

```bash
npm run build      # production build
npm start          # serve the production build → http://localhost:3000
```

> Don't run `npm run build` while `npm run dev` is running — both use the `.next` folder and the dev server breaks.
> Stop the dev server first (Ctrl + C).

## Deploy

The site is fully static, so any Next.js host works. Easiest: push this folder to a GitHub repo and import it on
[Vercel](https://vercel.com/new) — no settings needed.

## Editing content

All text lives in **`src/lib/data.ts`** and comes from the résumé (`public/Kalai_Maha_T_Resume.pdf`).
Components only read from that file — edit it and the whole site follows.

| What                         | Where in `data.ts`                       |
|------------------------------|------------------------------------------|
| Name, role, email, phone, links | `PROFILE`                             |
| Skills (periodic table)      | `SKILLS`, `SKILL_FAMILIES`               |
| Projects + GitHub buttons    | `PROJECTS` (set `github` to show the button) |
| Certifications               | `CERTIFICATIONS`                         |
| Education & experience       | `TIMELINE`                               |
| Achievements                 | `ACHIEVEMENTS`                           |

Other things you might change:

- **ID-card photo** — `public/portrait-bust.webp` (480×600, head-to-shirt crop). Replace the file to change the photo.
- **ID-card back ("What I am")** — `BACK_LINES` in `src/components/ui/LanyardCard.tsx`.
- **Résumé download** — replace `public/Kalai_Maha_T_Resume.pdf` (keep the same name, or update `PROFILE.resume`).

### Project GitHub links

| Project                | Repository                                             |
|------------------------|--------------------------------------------------------|
| NAV-SHIELD             | https://github.com/2005KAl/NAV-SHIELD                  |
| Cardiac Risk Armband   | https://github.com/2005KAl/CARDIAC-RISK-PREDICTION     |
| AI Medical Scribe      | https://github.com/2005KAl/Medical-Scribe1             |
| Hospital DBMS          | https://github.com/2005KAl/Hospital_Management-System  |
| House Price Prediction | https://github.com/2005KAl/AI-PRICE-PREDICTION-        |

A repository must be **public** on GitHub for its button to work for visitors.

## Sections

| Section        | Component                              | Signature interaction                                  |
|----------------|----------------------------------------|--------------------------------------------------------|
| Navigation     | `Navigation.tsx`                       | Frosted pill, sliding active indicator, mobile overlay |
| Hero           | `hero/Hero.tsx`                        | Outlined ghost name, staggered entrance                |
| About          | `sections/About.tsx`, `ui/LanyardCard` | Swinging lanyard ID card that flips                    |
| Skills         | `sections/Skills.tsx`                  | Periodic table, family filter, logo inspector          |
| Work           | `sections/Work.tsx`, `ui/MiniUI`       | Expanding accordion with illustrative mini-UIs         |
| Certifications | `sections/Certifications.tsx`          | Ink-flood rows                                         |
| Experience     | `sections/Experience.tsx`              | Timeline spine that draws on scroll                    |
| Achievements   | `sections/Achievements.tsx`            | Pinned horizontal gallery, count-up numbers            |
| Contact        | `sections/Contact.tsx`                 | Hopping letters, copy-email chip, spinning badge       |

## Folder structure

```
src/
  app/          layout.tsx (metadata, fonts), page.tsx, globals.css (design tokens)
  components/   App.tsx, Navigation.tsx, hero/, sections/, ui/
  lib/          data.ts (all content), hooks.ts, scroll.tsx (Lenis)
  fonts/        self-hosted .woff2 fonts
public/
  logos/        tech logos + licence
  portrait-bust.webp, Kalai_Maha_T_Resume.pdf
scripts/
  shoot.py      screenshot / overflow check (optional)
```

## Hero video (planned)

The talking-video hero isn't built yet. When the intro video is ready it goes in `public/hero/`
(`hero.mp4` + `hero.webm`) with `PROFILE.heroVideo` pointing at it.

## Quality checks

- `npm run build` passes with no type or lint errors.
- No horizontal overflow at 1440×900 or 390×844; no console errors.
- Lighthouse (production build): desktop Performance 97–100, Accessibility 96, Best Practices 100, SEO 100.
  Mobile Performance scores ~70–80 under Lighthouse's simulated low-end phone.
- Optional: `python scripts/shoot.py <out_dir>` (needs Python + Playwright, dev server on port 3100)
  screenshots every section and reports overflow and console errors.

## Credits & licences

- Tech logos: [devicon](https://github.com/devicons/devicon) "original" SVGs, MIT — see `public/logos/LICENSE-devicon.txt`.
  Concept and achievement icons are custom line icons in `src/components/ui/TechLogo.tsx`.
- Fonts (self-hosted in `src/fonts`, SIL Open Font License): Inter Tight, Instrument Serif, JetBrains Mono.
