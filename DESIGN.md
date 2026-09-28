---
version: alpha
name: yudistira-portfolio
description: Personal portfolio of Yudistira Syaputra (Yuuashura), software engineer. A soft blush canvas, charcoal cards and bands, Archivo display type over Source Sans 3 body copy, and a cinematic scroll story — a pinned 3D hero, sections that rise and recede like stacked cards, and a curtain-reveal footer. Originally inspired by Cohere's editorial system, now a personal, warmer brand.

colors:
  blush: "#FFF5F5"
  rose: "#F7D6D0"
  mauve: "#E2B4BD"
  charcoal: "#4A4A4A"
  body: "#5C5758"
  muted: "#756F70"
  line: "rgba(74, 74, 74, 0.16)"
  card-deep: "#2B2728"

shadcn-tokens:
  background: "0 100% 98%"
  foreground: "0 0% 29%"
  muted-surface: "9 71% 89%"
  muted-foreground: "350 3% 45%"
  border: "348 44% 80%"
  ring: "0 0% 29%"

typography:
  intro-word:
    fontFamily: Archivo
    fontSize: clamp(3.6rem, 15vw, 13rem)
    fontWeight: 500
    letterSpacing: -0.05em
  hero-tagline:
    fontFamily: Archivo
    fontSize: 3rem / 4.5rem (md) / 6rem (lg)
    fontWeight: 600
    lineHeight: 1.02
  hero-brand:
    fontFamily: Archivo
    fontSize: clamp(2.2rem, 3.7vw, 3.2rem)
    fontWeight: 800
    letterSpacing: -0.05em
    textTransform: uppercase
  footer-heading:
    fontFamily: Archivo
    fontSize: 3rem / 6rem (md)
    fontWeight: 700
  footer-giant:
    fontFamily: Archivo
    fontSize: 19vw (24vw mobile)
    fontWeight: 900
  detail-display:
    fontFamily: Archivo
    fontSize: clamp(3.2rem, 8vw, 7rem)
    lineHeight: 0.95
    letterSpacing: -0.045em
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
  project-title:
    fontFamily: Archivo
    fontSize: clamp(1.6rem, 3.4vw, 3.2rem)
    letterSpacing: -0.035em
  timeline-heading:
    fontFamily: Archivo
    fontSize: clamp(24px, 2.6vw, 34px)
  lead:
    fontFamily: Source Sans 3
    fontSize: clamp(18px, 1.5vw, 21px)
    lineHeight: 1.52
  body-large:
    fontFamily: Source Sans 3
    fontSize: 17px-19px
    lineHeight: 1.55
  button:
    fontFamily: Source Sans 3
    fontSize: 14px-15px
    fontWeight: 600
  caption:
    fontFamily: Source Sans 3
    fontSize: 13px-14px

rounded:
  sm: 8px
  md: 10px
  lg: 14px
  card: 16px-22px
  panel: 48px (28px mobile)
  hero-card: 40px (32px mobile)
  pill: 999px

spacing:
  container: min(1320px, 100vw - 48px)
  header: 76px (68px under 780px)
  section-y: clamp(92px, 12vw, 170px)
  hero-pin: 3600px desktop / 2600px mobile

motion:
  ease-out: cubic-bezier(0.16, 1, 0.3, 1)
  scroll-engine: GSAP ScrollTrigger (pins, scrubbed timelines) + Lenis on the GSAP ticker
  ui-engine: framer-motion (reveals, stagger, per-item scroll transforms, springs)
  panel-rise: rotateX 28deg, scale 0.92, top radius 48px -> flat
  panel-recede: rotateX 10deg, scale 0.88, blur 4px, brightness 0.85
  rubber-return: elastic.out(1, 0.3), 1.2s

components:
  intro-splash: { backgroundColor: "{colors.charcoal}", accent: "{colors.mauve}" }
  cinematic-hero-card: { background: "linear-gradient(145deg, #4A4A4A, #2B2728)", rounded: "{rounded.hero-card}" }
  button-dark: { backgroundColor: "{colors.charcoal}", textColor: "{colors.blush}", hoverBackground: "{colors.mauve}", hoverText: "{colors.charcoal}", rounded: "{rounded.pill}" }
  button-light: { backgroundColor: "{colors.blush}", hoverBackground: "{colors.mauve}", rounded: "{rounded.pill}" }
  tactile-button-light: { background: "linear-gradient(180deg, #FFF5F5, #F7D6D0)", textColor: "{colors.charcoal}" }
  tactile-button-dark: { background: "linear-gradient(180deg, #5C5758, #4A4A4A)", textColor: "{colors.blush}" }
  view-toggle: { backgroundColor: "{colors.blush}", active: "{colors.charcoal}", rounded: "{rounded.pill}" }
  project-card: { backgroundColor: "{colors.blush}", media: "{colors.mauve}", rounded: 22px }
  coverflow-card: { backgroundColor: "{colors.mauve}", rounded: "{rounded.card}" }
  experience-band: { backgroundColor: "{colors.charcoal}", textColor: "{colors.blush}", labels: "{colors.rose}" }
  principles-card: { backgroundColor: "{colors.rose}", rounded: "{rounded.lg}" }
  build-diagram: { backgroundColor: "{colors.rose}", hub: "{colors.charcoal}" }
  cinematic-footer: { backgroundColor: "{colors.charcoal}", textColor: "{colors.blush}", aurora: "{colors.mauve}" }
  cursor: { dot: "#FFF5F5 difference-blend", ring: "{colors.mauve}" }
---

## Overview

A personal portfolio for a software engineer who also teaches. The page is a single cinematic scroll: a blush canvas with drifting dust, a pinned hero where a charcoal card rises and fills the screen, then sections that arrive like cards tilting upright while the previous one tilts back and blurs, ending in a footer revealed like a curtain. Every project opens its own page at `/projek/{slug}`.

The palette is four colors — blush, rose, mauve, charcoal — used with restraint: blush for space, rose for surfaces, charcoal for text, cards and dark bands, mauve only for small accents and glows.

**Key characteristics**
- One pinned hero story (tagline → card → big portrait → call to action).
- Stacked 3D section transitions on desktop; lighter rise-only version on mobile.
- Real screenshots in a coverflow **or** a dealt-out card grid with rubbery magnetic hover.
- Experience rows roll through 3D like a drum as they cross the viewport.
- Custom dot-and-ring cursor for mouse users.
- Everything collapses to a static, fully visible layout under `prefers-reduced-motion`.

## Colors

| Token | Hex | Role |
|---|---|---|
| Blush | `#FFF5F5` | Page, header, light cards, text on dark |
| Rose | `#F7D6D0` | Work band, principles card, build diagram, chips, labels on dark |
| Mauve | `#E2B4BD` | Accent only: brand dot, scroll bar, timeline rail, portrait offset block, beams, cursor ring, selection, hover fills |
| Charcoal | `#4A4A4A` | Text, buttons, experience band, hero card, footer, intro curtain |
| Body | `#5C5758` | Paragraph text (6.6:1 on blush) |
| Muted | `#756F70` | Meta and captions (4.7:1 on blush) |
| Line | `rgba(74,74,74,.16)` | Hairlines |

Rules:
- Mauve is never text on a light background (1.9:1). On charcoal it passes for large text (4.45:1), e.g. the GPA figure.
- Buttons are charcoal with blush text; hover swaps to a mauve fill with charcoal text.
- On dark surfaces (`.experience-section`, hero card, footer, intro, `.detail-next`) the focus ring switches to rose via `--focus`.
- shadcn components read HSL tokens from `:root`; the surface token is `--muted-surface` because `--muted` is the site's text gray.

## Typography

Archivo (display, variable weight) and Source Sans 3 (body/UI) from Google Fonts. The pasted footer's Plus Jakarta Sans was dropped to keep one type system.

| Role | Size | Weight | Where |
|---|---|---:|---|
| Intro word | clamp(3.6rem, 15vw, 13rem) | 500 | Intro splash |
| Hero tagline | 3rem → 6rem | 600 | Cinematic hero (line 1 matte charcoal, line 2 charcoal gradient) |
| Hero brand | clamp(2.2rem, 3.7vw, 3.2rem), uppercase | 800 | "YUUASHURA" inside the hero card, blush→mauve gradient |
| Footer heading | 3rem → 6rem | 700 | Blush→rose gradient glow |
| Footer giant | 19vw | 900 | Outlined "YUUASHURA" behind the footer |
| Section heading | clamp(2.7rem, 5vw, 4.8rem) | 420 | Work, About |
| Detail display | clamp(3.2rem, 8vw, 7rem) | 420 | Project page title |
| Lead | clamp(18px, 1.5vw, 21px) | 400 | Intros |
| Button | 14–15px | 600 | Buttons, pills |

## Layout

### Home (`/`)
1. **Intro splash** — once per tab session, skipped on `#hash` deep links.
2. **Cinematic hero** (`#top`, pinned 3600px): kicker + tagline → charcoal card rises and fills the viewport → big portrait photo (`/aku.jpg`, 0.82 aspect, rounded 28px, mauve offset block behind) wiping up into view, with floating badges (availability, core stack) on its corners and the card copy → card pulls back and exits → CTA "View selected work" / "Download CV".
3. **Work** (rose band, stack panel): heading, **Slide / Cards** toggle, then coverflow + caption or the card grid.
4. **Experience** (charcoal band, stack panel): Development ⇄ Teaching beam, word-reveal heading, education + GPA counter, 3D timeline.
5. **About** (blush, stack panel, rounded bottom): icon cloud + stack list, principles card.
6. **Footer** (`#contact`, curtain reveal): marquee, heading, magnetic contact pills, credits, back to top.

### Project page (`/projek/{slug}`)
Header → hero (meta, status chip, title, tech, links) → screenshot coverflow (rose band) → "How it's built" beam diagram → next-project band. Same palette, particles and cursor.

## Elevation & Depth

| Treatment | Use |
|---|---|
| Physical card | Hero card: deep gradient, heavy outer shadow, inset highlights, mouse-following sheen |
| Glass | Floating hero badges, footer pills (blur 16–24px, 1px blush border) |
| 3D transforms | Hero portrait tilt, panel rise/recede, timeline drum, grid deal-in, magnetic tilt |
| Soft shadow | Coverflow and grid cards, About's bottom edge over the footer |

## Components

### `CinematicHero` — `src/components/ui/cinematic-landing-hero.tsx`
Adapted from a pasted GSAP component. All copy comes from props (`content.ts`). Every scroll tween is an explicit `fromTo` with `invalidateOnRefresh`, so re-runs on breakpoint change or refresh can't record half-animated start values. Pin length 3600px desktop / 2600px mobile. The center column is `.hero-media`: a portrait card (`width: min(clamp(240px, 32vw, 440px), 58vh)`, `min(62vw, 260px, 36vh)` on mobile) that flies in with a 3D entrance, then its frame wipes up (`clip-path` inset) while the image settles from `scale 1.25`. The card tilts with the mouse on fine pointers only; its offset block sits at `translateZ(-40px)` so it parallaxes. Reduced motion adds `.cinematic--static`: no pin, text → card → CTA stacked in flow.

### Stack panels — `src/hooks/useStackTransitions.ts`
Work, Experience and About are each wrapped in `.stack-panel`. Each panel's section rises from `rotateX 28° / scale .92 / 48px top corners` to flat as its top reaches the viewport top. On desktop the previous panel pins by its bottom edge for one viewport and recedes (`rotateX 10° / scale .88 / blur 4px / brightness .85`) while the next slides over it. Mobile: rise only (14°, no pin, no blur). Reduced motion: none.

### Project view toggle + `ProjectGrid` — `src/components/ProjectGrid.tsx`
Pill toggle (Slide / Cards). The grid deals cards in with a 0.12s stagger from `rotateX -75°, y 90, z -120` on a spring (stiffness 140, damping 16). Each card is a `MagneticButton` (strength 0.08): it follows the pointer with a tilt and snaps back with `elastic.out(1, 0.3)` — the "rubber" hover. Framer animates the `li`, GSAP the inner anchor, so they never fight.

### `MagneticButton` + `CinematicFooter` — `src/components/ui/motion-footer.tsx`
Footer is `position: fixed` under the page, visible only through a `clip-path` wrapper (`#contact`) that tucks 48px under About's rounded corners. Charcoal with a breathing mauve aurora, faint grid, outlined giant text with scroll parallax, a tilted marquee of the stack, magnetic glass pills (Email, Phone, GitHub, LinkedIn, CV), heartbeat credit, back-to-top. Its ScrollTriggers use `refreshPriority: -1` so they measure after the hero pin spacer.

### `CoverflowCarousel`, `IconCloud`, `AnimatedBeam`, `ArchitectureVisual`
Unchanged behavior, recolored: coverflow cards on mauve, icon cloud rendered for a blush background, beams mauve ↔ rose on charcoal and mauve ↔ charcoal on rose, architecture diagram on charcoal with mauve arrows.

### Timeline (3D list)
`TimelineItem` maps its own scroll progress to `rotateX 40° → 0 → -40°`, `scale .86 → 1 → .86`, `z -120 → 0 → -120` (flat through the middle 16%), inside a `perspective: 1000px` list. Rail, dot pulse and hover tint remain.

### `ParticleField` — `src/components/ParticleField.tsx`
Fixed canvas overlay above sections (z 30), below header and cursor: 45 soft dots (24 on mobile) in mauve, rose and faint charcoal drifting upward with a sine sway. DPR-aware, paused when the tab is hidden, frozen under reduced motion. Overlay because the stacked panels are opaque.

### `AestheticCursor` — `src/components/AestheticCursor.tsx`
Mouse users only. 6px blush dot with `mix-blend-mode: difference` (dark on blush, light on charcoal) plus a 34px mauve ring trailing via `gsap.quickTo`. Over links/buttons the ring grows to 64px with a mauve wash; elements with `data-cursor` show a label (carousel "Drag", grid cards "View"). Native cursor hidden only while it is mounted.

### Other
Intro splash, language switcher, buttons, status chips, build diagram, principles card — as before, recolored to the palette.

## Motion

- **Engines**: GSAP ScrollTrigger owns pins and scrubbed scroll timelines (hero, panels, footer, magnetic hover, cursor). framer-motion owns component-level motion (reveals, stagger, word reveal, GPA counter, timeline drum, grid deal-in).
- **Smooth scroll**: Lenis (desktop only) runs on `gsap.ticker` and calls `ScrollTrigger.update` on scroll, so pins and smooth scroll share one clock.
- **Refresh**: `ScrollTrigger.refresh()` after fonts load, on window load, and when language or project view changes. `#hash` deep links scroll after the refresh so pin spacers are counted.
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` / `expo.out` for entrances; `elastic.out(1, 0.3)` only for the rubber return.
- **Reduced motion**: no intro, static hero, no panel transitions, static timeline, frozen particles, instant cursor ring, no magnetic movement.

## Do's and Don'ts

### Do
- Keep blush as the dominant surface; charcoal for bands and the hero card.
- Use mauve for small accents, glows and fills behind charcoal text.
- State start values explicitly (`fromTo`) for any scrubbed GSAP tween.
- Mark new canvas/visual-only UI `aria-hidden` and keep a text equivalent.
- Put all copy in `src/content.ts` for `en` and `id`.

### Don't
- Don't put mauve text on blush or rose.
- Don't let CSS `transition: transform` touch elements GSAP moves (footer pills, cards).
- Don't add another pinned section without checking `refreshPriority` of triggers created before it.
- Don't reuse an existing CSS variable name for a new token (`--muted` is taken).

## Responsive Behavior

| Breakpoint | Changes |
|---|---|
| ≤1080px | Container 980px; timeline stacks date above content; skills one column |
| ≤780px | Hamburger + charcoal mobile menu; panels rise-only (no pin/blur); grid one column; toggle left-aligned; About radius 28px |
| ≤767px | Hero uses the mobile timeline (92vw/92vh card, 2600px pin) and stacked card layout |
| Touch | No custom cursor, no magnetic hover, no hero portrait tilt |

## Known Gaps

- Legacy Genshin/Fontaine components in `src/components/` (except `ParticleField`, rewritten) are unused; `animejs` and `react-intersection-observer` only serve them.
- Particles sit above content (low alpha) because the stacked panels are opaque.
- `react-icon-cloud` fetches icons from jsDelivr at runtime and uses `eval` internally.
- Muladari Coffee screenshots are ~2 MB PNGs; WebP would help.
- JS bundle is ~500 kB+ (GSAP + framer-motion + icon cloud); code-splitting the project page would help.
- Deep links (`/projek/...`) need an SPA rewrite on the production host.
