---
version: alpha
name: yudistira-portfolio
description: Personal portfolio of Yudistira Syaputra (Yuuashura), software engineer. An editorial white canvas broken by deep-green and ink bands, Archivo display type over Source Sans 3 body copy, coral as the single warm accent, and motion that reveals content with transform-only easing. Inspired by Cohere's 2026 enterprise web system, adapted into a personal brand.

colors:
  ink: "#17171c"
  body: "#414145"
  muted: "#66666f"
  line: "#d9d9dd"
  canvas: "#ffffff"
  surface-gray: "#f7f7f8"
  stone: "#eeece7"
  green: "#003c33"
  green-deep: "#002d27"
  green-soft: "#edfce9"
  mint: "#b4e3d7"
  blue: "#2456c4"
  blue-soft: "#f1f5ff"
  coral: "#ff7759"
  coral-soft: "#fff4f0"
  focus: "#4c6ee6"
  available: "#9df391"
  dark-rule: "#424248"
  dark-muted: "#aeaeb7"
  on-dark: "#ffffff"

shadcn-tokens:
  background: "0 0% 100%"
  foreground: "240 10% 10%"
  muted-surface: "43 17% 92%"
  muted-foreground: "240 4% 42%"
  border: "240 6% 86%"
  ring: "227 75% 60%"

typography:
  intro-word:
    fontFamily: Archivo
    fontSize: clamp(3.6rem, 15vw, 13rem)
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.05em
  hero-display:
    fontFamily: Archivo
    fontSize: clamp(3.35rem, 6.5vw, 5.9rem)
    fontWeight: 420
    lineHeight: 0.98
    letterSpacing: -0.04em
  detail-display:
    fontFamily: Archivo
    fontSize: clamp(3.2rem, 8vw, 7rem)
    fontWeight: 420
    lineHeight: 0.95
    letterSpacing: -0.045em
  contact-display:
    fontFamily: Archivo
    fontSize: clamp(3.7rem, 7vw, 6rem)
    fontWeight: 420
    lineHeight: 0.95
    letterSpacing: -0.04em
  section-heading:
    fontFamily: Archivo
    fontSize: clamp(2.7rem, 5vw, 4.8rem)
    fontWeight: 420
    lineHeight: 1
    letterSpacing: -0.04em
  quote:
    fontFamily: Archivo
    fontSize: clamp(2rem, 4vw, 3.8rem)
    lineHeight: 1.08
    letterSpacing: -0.035em
  project-title:
    fontFamily: Archivo
    fontSize: clamp(2rem, 3.4vw, 3.2rem)
    lineHeight: 1
    letterSpacing: -0.04em
  timeline-heading:
    fontFamily: Archivo
    fontSize: clamp(24px, 2.6vw, 34px)
    lineHeight: 1.12
  lead:
    fontFamily: Source Sans 3
    fontSize: clamp(18px, 1.5vw, 21px)
    fontWeight: 400
    lineHeight: 1.52
  body-large:
    fontFamily: Source Sans 3
    fontSize: 17px-19px
    lineHeight: 1.55
  button:
    fontFamily: Source Sans 3
    fontSize: 15px
    fontWeight: 600
  caption:
    fontFamily: Source Sans 3
    fontSize: 14px
  micro:
    fontFamily: Source Sans 3
    fontSize: 12px-13px

rounded:
  sm: 8px
  md: 10px
  lg: 14px
  card: 16px
  pill: 999px

spacing:
  container: min(1320px, 100vw - 48px)
  header: 76px (68px under 780px)
  section-y: clamp(92px, 12vw, 170px)
  detail-section-y: clamp(72px, 9vw, 130px)

motion:
  ease-out: cubic-bezier(0.16, 1, 0.3, 1)
  reveal-distance: 42px desktop / 16px compact
  stagger: 0.07s
  intro-hold: 1.6s
  intro-lift: 0.9s

components:
  intro-splash:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.intro-word}"
  button-dark:
    backgroundColor: "{colors.ink}"
    hoverBackground: "{colors.green}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-light:
    backgroundColor: "{colors.canvas}"
    hoverBackground: "{colors.coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  text-link:
    textColor: "{colors.ink}"
    border: 1px bottom rule
  coverflow-card:
    backgroundColor: "#e9e9ec"
    rounded: "{rounded.card}"
    aspectRatio: 16/10
  icon-cloud:
    backgroundColor: "{colors.canvas}"
  build-diagram:
    backgroundColor: "{colors.stone}"
    hub: "{colors.ink}"
    rounded: "{rounded.lg}"
  experience-band:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-dark}"
  principles-card:
    backgroundColor: "{colors.stone}"
    rounded: "{rounded.lg}"
  contact-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
---

## Overview

A personal portfolio for a software engineer who also teaches. The tone is calm and editorial: one oversized headline per section, generous whitespace, thin rules instead of boxes, and color that arrives in full-width bands (deep green for experience, ink for contact) rather than as decoration. Coral is the only warm accent and is reserved for small markers — the brand dot, arrows, the scroll bar, timeline progress, the active GPA figure.

The first visit opens with a full-screen ink curtain spelling **Yuuashura**, which lifts upward to reveal the hero. From there the page reads as a sequence: who I am, what I built (coverflow carousel), how I learned (experience band), what I use (icon cloud), how I work, and how to reach me. Every project opens its own page at `/projek/{slug}`.

The system started from an analysis of Cohere's 2026 web design (monumental tight display type, white canvas, dark product bands, pill CTAs) and was adapted to a personal, bilingual (EN/ID) site.

**Key characteristics**
- Archivo display at weight 420 with tight negative tracking; Source Sans 3 for everything else.
- White canvas, `#f7f7f8` for the work area, green band for experience, ink band for contact.
- Pill CTAs in ink that turn green on hover; secondary actions are underlined text links.
- Real product screenshots in a 3D coverflow instead of invented mock UIs.
- Transform-only motion (no fades on content), full `prefers-reduced-motion` fallback.

## Colors

### Brand & accent
- **Ink** `#17171c` — primary text, dark buttons, intro curtain, contact band, build-diagram hub.
- **Green** `#003c33` — experience band, mobile menu, button hover, Booking Hotels architecture card.
- **Coral** `#ff7759` — brand dot, scroll progress, timeline rail, arrows, selection highlight, GPA figure, "Teaching" pill. Never a large surface.
- **Blue** `#2456c4` — end of the feature beams in the build diagram.

### Surfaces
- **Canvas** `#ffffff` — default page.
- **Surface gray** `#f7f7f8` — work section and detail gallery.
- **Stone** `#eeece7` — principles card, build diagram.
- **Green soft** `#edfce9` — portrait offset block, "Completed" status chip.
- **Coral soft** `#fff4f0` — "In progress" status chip.

### Text & rules
- **Body** `#414145`, **Muted** `#66666f`, **Line** `#d9d9dd`.
- On dark bands: white text, `rgba(255,255,255,.68–.78)` secondary, **Mint** `#b4e3d7` labels, **Dark rule** `#424248`.

### Semantic
- **Focus** `#4c6ee6` — 3px focus outline, carousel focus ring.
- **Available** `#9df391` — availability dot in the portrait caption.

### shadcn tokens
`src/components/ui/*` components use Tailwind classes like `bg-background`, `text-foreground`, `bg-muted`, `ring-ring`. These map to HSL channels in `:root` (`--background`, `--foreground`, `--muted-surface`, `--muted-foreground`, `--border`, `--ring`) via `tailwind.config.js`. Note `--muted` is the site's text gray, so the shadcn surface token is named `--muted-surface`.

## Typography

- **Display**: Archivo (Google Fonts, variable weight), default weight 420, `text-wrap: balance`.
- **Body/UI**: Source Sans 3 (400/500/600), `text-wrap: pretty`.

| Role | Size | Line height | Tracking | Where |
|---|---|---:|---:|---|
| Intro word | clamp(3.6rem, 15vw, 13rem) | 1 | -0.05em | Intro splash |
| Hero display | clamp(3.35rem, 6.5vw, 5.9rem) | 0.98 | -0.04em | Home hero |
| Detail display | clamp(3.2rem, 8vw, 7rem) | 0.95 | -0.045em | Project page title |
| Contact display | clamp(3.7rem, 7vw, 6rem) | 0.95 | -0.04em | Contact band |
| Section heading | clamp(2.7rem, 5vw, 4.8rem) | 1 | -0.04em | Work, About |
| Quote | clamp(2rem, 4vw, 3.8rem) | 1.08 | -0.035em | Principles card |
| Project title | clamp(2rem, 3.4vw, 3.2rem) | 1 | -0.04em | Work caption |
| Timeline heading | clamp(24px, 2.6vw, 34px) | 1.12 | 0 | Experience |
| Lead | clamp(18px, 1.5vw, 21px) | 1.52 | 0 | Hero intro, detail intro |
| Body large | 17–19px | 1.55 | 0 | Section intros |
| Button | 15px / 600 | — | 0 | Buttons, links |
| Caption | 14px | — | 0 | Meta rows, labels |
| Micro | 12–13px | — | 0 | Chips, footer |

**Principles**
- One oversized headline per section; everything else settles to 14–21px.
- Weight stays near 420 for display; hierarchy comes from size and tracking, not bold.
- Headlines animate by line (hero) or by word (experience) inside overflow masks.

## Layout

### Page sequence — home (`/`)
1. **Intro splash** — once per tab session.
2. **Hero** — white; copy (1.6fr) + portrait (0.7fr); proof strip of core tech under a rule.
3. **Work** — `#f7f7f8`; heading row, 3D coverflow of projects, centered caption for the active project with a "View project details" button.
4. **Experience** — green band; sticky intro (Development ⇄ Teaching beam, word-reveal heading, education + GPA counter) beside the timeline.
5. **About** — white; heading row, icon cloud (0.9fr) beside grouped stack list (1.1fr), stone principles card.
6. **Contact** — ink band; big heading, email button, 3-column contact grid, footer.

### Page sequence — project (`/projek/{slug}`)
1. Slim header: brand → home, "All projects" → `/#work`, language switcher.
2. Hero: category · year · status chip, detail display title, lead + tech chips + links.
3. Gallery (`#f7f7f8`): screenshot coverflow with captions; Booking Hotels shows the architecture visual instead.
4. How it's built (white): stone build diagram — stack → project hub → features, connected by animated beams.
5. Next project (ink band) + footer.

Routing is a pathname check in `src/main.tsx` — no router library. Static hosts need an SPA rewrite to `index.html` for deep links.

### Grid & container
- Container `min(1320px, 100vw - 48px)`; full-bleed sections pad with `max(24px, (100vw - 1320px) / 2)`.
- Nav is a three-zone grid (brand / links / actions).
- Section headings are a 2-column grid: heading left, intro right-aligned.

## Elevation & Depth

Mostly flat. Depth only where it carries meaning:

| Treatment | Use |
|---|---|
| 3D perspective + `shadow-xl` | Coverflow cards (`box-shadow: 0 24px 60px -28px rgba(23,23,28,.45)`) |
| Offset color block | Portrait sits over a `green-soft` block |
| Ring halo | Build hub `0 0 0 8px rgba(23,23,28,.06)`, availability dot, timeline dot pulse |
| Full-width band | Experience (green), contact / next project (ink) |

## Shapes

| Token | Value | Use |
|---|---:|---|
| `sm` | 8px | Service nodes, feature nodes, portrait caption |
| `md` | 10px | Mock window frames |
| `lg` | 14px | Portrait, project visuals, principles card, build diagram, build hub |
| `card` | 16px | Coverflow cards (`rounded-2xl`) |
| `pill` | 999px | Buttons, chips, language switcher, stack nodes, Development/Teaching pills |

## Components

### `intro-splash` — `src/components/IntroSplash.tsx`
Fixed ink layer, "Yuuashura" letters rise out of masks (0.05s stagger), a coral dot pops in, and a coral progress line fills along the bottom for 1.6s. When the line completes the layer exits `y: -100%` over 0.9s and the hero entrance starts mid-lift. Plays once per session (`sessionStorage`), home only, skipped for reduced motion. Scroll and Lenis are paused while visible. Helpers live in `src/lib/intro.ts`.

### `button` (`--dark`, `--light`, `--large`), `text-link`, `project-link`, `nav-cta`
Ink pill → green on hover, lifts 2px, arrow icon nudges diagonally; active state scales 0.97. Light variant turns coral on hover. Text links are 600 weight with a 1px bottom rule.

### `language-switcher` — `src/components/LanguageSwitcher.tsx`
Two-button pill (EN / ID), active button filled ink. Preference stored in `localStorage` via `src/hooks/useLanguage.ts`, shared by both pages.

### `coverflow-carousel` — `src/components/ui/coverflow-carousel.tsx`
3D ring of cards painted straight to the DOM (no per-frame React state). Drag/flick, arrow keys, prev/next buttons, pagination dots. Project-specific extensions: `aspectRatio` (16:10 here), `render` (custom slide content), `onSelect` (sync the caption), `onOpen` (tap or Enter on the centered card; tapping a side card only centers it). Screenshots use `object-position: top` and lazy loading.

### `ArchitectureVisual` — `src/components/ArchitectureVisual.tsx`
Green service-flow diagram (React client → API gateway → Auth / Hotels / Booking) used for Booking Hotels until it has screenshots. Inside a carousel card a container query hides the title/footer rows and shrinks nodes.

### `icon-cloud` — `src/components/ui/interactive-icon-cloud.tsx`
Rotating 3D cloud of simple-icons logos (fetched at runtime from jsDelivr, simple-icons v14). Light theme only. Always paired with the text stack list so skills stay readable to screen readers.

### `animated-beam` — `src/components/ui/animated-beam.tsx`
SVG quadratic path between two refs with a traveling gradient. Used for:
- **Development ⇄ Teaching** pills on the experience band (two opposing beams, coral ↔ mint).
- **Build diagram** on project pages (coral → green into the hub, green → blue out to features).
The gradient is dropped under reduced motion; only the faint base path remains.

### `timeline`
Coral rail scales with scroll progress; each dot pulses (staggered 0.7s) and turns coral on hover; the role heading shifts 4px and turns mint on hover.

### `education-note` + `CountUp`
Degree, university, and GPA counted up from 0 to 3.80 (locale-formatted, `3,80` in Indonesian) when scrolled into view.

### `stack-group`, `principles`, `contact-details`
Rule-separated rows of stack items; stone quote card with three principle rows; 3-column contact grid with coral icons.

### `build-diagram` — `src/pages/ProjectDetail.tsx`
Stone panel: stack pills (left), ink hub with the YS coral badge and project title (center), feature cards (right, right-aligned). Beams recompute on resize.

### `status-chip`
Completed = green-soft / green, In progress = coral-soft / `#a4442c`.

## Motion

- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` everywhere (CSS `--ease-out` and framer `[0.16, 1, 0.3, 1]`).
- **Reveal** (`src/components/MotionSystem.tsx`): `rise`, `slide-left`, `slide-right`, `scale`; transform only, once per element.
- **Cinematic vs compact** (`useDesktopMotion`): desktop with fine pointer gets 42px travel and longer durations; touch/small screens get 16px.
- **Stagger**: 0.07s between list items, 0.05s between intro letters.
- **Smooth scroll**: Lenis on desktop only, paused while the intro or mobile menu is open.
- **Micro-interactions**: button lift, arrow nudge, portrait sheen sweep, nav underline grow, node lift.
- **Reduced motion**: `MotionConfig reducedMotion="user"`, intro skipped, beams static, and a global CSS rule shortens all animations/transitions.

## Do's and Don'ts

### Do
- Keep the canvas white; introduce green or ink only as full-width bands.
- Use coral for small markers and motion accents only.
- Show real screenshots; fall back to an honest diagram when there are none.
- Put all copy in `src/content.ts` for both `en` and `id`.
- Pair any canvas/visual-only element (icon cloud, beams) with readable text.

### Don't
- Don't add heavy drop shadows outside the coverflow.
- Don't fade content in with opacity; move it with transforms.
- Don't use more than one display-size headline per section.
- Don't invent dashboard data or fake metrics.
- Don't name new CSS variables that collide with existing ones (`--muted` is taken).

## Responsive Behavior

| Breakpoint | Changes |
|---|---|
| ≤1080px | Container 980px; hero columns tighten; timeline items stack date above content; skills become one column (cloud max 460px, centered); standalone architecture visual goes vertical |
| ≤780px | Header 68px, hamburger + green full-screen mobile menu; hero, section headings, experience, contact collapse to one column; experience intro no longer sticky; detail header becomes brand / back / language; build diagram nodes shrink to 12px |
| ≤520px | Hero actions stack; proof strip stacks; work caption actions stack; contact footer stacks |

Coverflow cards scale with `clamp(260px, 46vw, 640px)` (home) and `clamp(260px, 58vw, 780px)` (project page); touch drag keeps vertical page scrolling (`touch-action: pan-y`).

## Known Gaps

- Legacy Genshin/Fontaine components (`HeroTeyvat`, `WishAnimation`, `Constellation`, `ContactAltar`, etc. in `src/components/`, plus `src/components/ui/OrnateFrame.tsx` and `WishButton.tsx`) are unused and not part of this system; `animejs` and `react-intersection-observer` are only used by them.
- Icon cloud fetches icons from jsDelivr at runtime and `react-icon-cloud` uses `eval` internally (build warning; matters only under a strict CSP).
- Muladari Coffee screenshots are ~2 MB PNGs each; converting to WebP would speed up the carousel.
- The CV file is still named `JAVA DEVELOPER - YUDISTIRA SYAPUTRA.pdf`.
- Deep links (`/projek/...`) need an SPA rewrite on the production host.
