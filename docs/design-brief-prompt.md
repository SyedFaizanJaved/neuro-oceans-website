# Neuro Oceans — Applied AI, engineered for depth.

## Mission

Design a complete, implementation-ready, token-driven website UI for **Neuro
Oceans**, an applied-AI engineering company. The design must be dark,
structured, and content-first (in the style of getmosa.ai), but branded with
Neuro Oceans' own deep-navy + teal/cyan identity taken from its logo. Optimize
for consistency, WCAG 2.2 AA accessibility, and fast delivery on a Next.js +
Tailwind v4 content site.

## Brand

- Product/brand: Neuro Oceans — applied AI systems that work in production.
- Tagline: "Applied AI, engineered for depth."
- Audience: engineering leaders and teams evaluating an AI consultancy/product
  studio; secondary: candidates (careers) and readers (blog).
- Product surface: marketing/content site — Landing, About, Services, Work
  (case studies), Blog, Careers, Contact — plus an admin studio (Sanity) that
  is out of design scope.
- Logo: dark navy rounded square containing a teal/cyan spiral swirl. The
  site's accent colors MUST come from this logo, never from any other brand.

## Style Foundations

- Visual style: structured, tokenized, content-first, "ocean depth" — near
  black surfaces with subtle deep-navy gradients and restrained teal glow.
  Bordered hairline grids, generous negative space, oversized confident type.
- Font: `font.family.primary=Inter`,
  `font.family.stack=Inter, ui-sans-serif, system-ui, sans-serif`,
  `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=11px`, `font.size.sm=12px`,
  `font.size.md=14px`, `font.size.lg=16px`, `font.size.xl=18px`,
  `font.size.2xl=48px`, `font.size.3xl=72px`. Hero display: 72px desktop,
  48px mobile, weight 600, tracking -2%.
- Color palette (semantic tokens — components must never use raw hex):
  - `color.surface.base=#030507` (page background)
  - `color.surface.muted=#0A0F16` (alternating sections, navy tint)
  - `color.surface.raised=#0D141D` (cards, panels)
  - `color.border.default=rgba(255,255,255,0.08)` (hairlines, grid lines)
  - `color.accent=#22D3EE` (links, buttons, highlights, focus rings)
  - `color.accent.deep=#2DD4BF` (gradient pair: #22D3EE → #2DD4BF)
  - `color.text.primary=#E6E6EA`
  - `color.text.secondary=#8A8A94`
  - `color.text.onAccent=#03110F` (text on teal buttons)
- Spacing scale: `space.1=8px`, `space.2=10px`, `space.3=12px`,
  `space.4=16px`, `space.5=20px`, `space.6=24px`, `space.7=32px`,
  `space.8=40px`
- Radius: `radius.sm=6px` (buttons, inputs), `radius.md=12px` (cards),
  `radius.full` (pills/tags). Shadow: none — depth comes from surface tint
  and hairline borders, plus an optional teal glow
  (`0 0 24px rgba(34,211,238,0.15)`) reserved for primary CTAs and the hero.
- Motion: `motion.duration.instant=150ms`, ease-out; hover/focus transitions
  only. All motion must respect `prefers-reduced-motion`.

## Accessibility

- Target: WCAG 2.2 AA.
- Keyboard-first interactions required; logical tab order; skip-to-content
  link.
- Focus-visible required on every interactive element: 2px `color.accent`
  ring, 2px offset, never removed.
- Contrast: body text ≥ 4.5:1 on its surface; large text ≥ 3:1; teal on
  `surface.base` used for text must pass 4.5:1 (verify; otherwise reserve
  teal for non-text accents).

## Writing Tone

Concise, confident, engineering-literate. Verbs over adjectives. No AI hype
words ("revolutionary", "cutting-edge", "unleash"). Example: "We ship AI
systems that survive production." not "Unlock the power of AI!"

## Page Blueprints

Every page shares the shell: sticky header on `surface.base` with hairline
bottom border (logo icon + wordmark left; nav: About, Services, Work, Blog,
Careers; teal Contact button right; hamburger → full-screen overlay under
768px), and a footer (logo, nav columns, socials, copyright). Each page must
keep the shared token system but use a DISTINCT layout treatment:

1. **Landing** — 72px hero headline "Applied AI, engineered for *depth*."
   with "depth" in a #22D3EE→#2DD4BF gradient; sub-line, primary + secondary
   CTA; deep-navy radial gradient fading downward behind the hero; then a
   3-up bordered services grid, 2 featured case-study cards, a 4-stat band on
   `surface.muted`, 3 latest blog teasers, and a full-width CTA band.
2. **About** — oversized mission statement (2xl), values as a numbered
   structured list (01/02/03), team grid (photo, name, role).
3. **Services** — numbered full-width rows alternating text alignment, each
   with title, description, capability tag pills.
4. **Work** — image-led case-study cards (16:9 image, client, title,
   one-line outcome, tags). Detail page: full-bleed hero image,
   Challenge/Approach/Outcome sections, tech tags, prev/next project nav.
5. **Blog** — featured latest post (large card) above a clean dated list.
   Detail: 65ch centered prose column, 18px/1.7 body, reading time, related
   posts.
6. **Careers** — intro + culture band, then roles grouped by team as
   bordered list rows (title, location, type, arrow). Empty state: "No open
   roles right now — write to us anyway." with contact link.
7. **Contact** — split layout: left form (name, email, message, submit),
   right contact email, socials, response-time note.

## Rules: Do

- Use semantic tokens, not raw hex values, in all component guidance.
- Every component must define states for default, hover, focus-visible,
  active, disabled, loading, and error.
- Component behavior must specify responsive behavior (breakpoints: 640,
  768, 1024, 1280) and edge-case handling (long titles, missing images,
  empty lists, slow image loads).
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.
- Cards and grids must use `border.default` hairlines; hover raises to a
  teal-tinted border (`rgba(34,211,238,0.4)`) + 150ms transition.
- Images must define aspect ratio and a `surface.raised` placeholder to
  prevent layout shift.

## Rules: Don't

- Do not use Mosa's orange (#F97316) or any color outside the token palette.
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions ("Click here",
  "Learn more" without context).
- Do not ship component guidance without explicit state rules.
- Do not use pure #000 or pure #FFF; use the surface/text tokens.
- Do not add decorative animation beyond hover/focus transitions and the
  hero gradient; no parallax, no particle fields.

## Component Rule Expectations

- Components to specify: Button (primary teal / secondary outline / ghost),
  NavLink, Card (service / project / post variants), Tag pill, Input +
  Textarea + Label + error text, SectionHeading (eyebrow + title + lede),
  StatBlock, FooterColumn, MobileNav overlay, Pagination/PrevNext.
- Include keyboard, pointer, and touch behavior for each.
- Include spacing and typography token requirements per component.
- Include long-content, overflow, and empty-state handling.
- Expected page density: links (~26), cards (~7), buttons (~5),
  navigation (3), inputs (3), lists (2) per page.

## Required Output Structure

- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Per-page layout specs following the Page Blueprints above.
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist (contrast passes, focus visible everywhere, keyboard-only
  walkthrough of every page, reduced-motion verified, 320px–1440px layouts
  verified, empty/long-content states verified).

## Quality Gates

- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
