# Neuro Oceans — Website Design Spec

Date: 2026-07-23 · Status: approved by user

## Intent

Redesign the Neuro Oceans site (currently stub pages) as a Mosa-style
(getmosa.ai) dark, structured, content-first site with the teal/cyan accent
taken from the company logo, and give an admin the ability to edit all real
content via Sanity CMS — without rewriting any page when the CMS lands.

## Decisions made

| Decision | Choice |
|---|---|
| Accent color | Teal/cyan from logo (`#22D3EE` → `#2DD4BF`), not Mosa's orange |
| Visual direction | "Structured + ocean depth": Mosa's bordered-grid, content-first layout on near-black, with subtle deep-navy gradients and teal glow |
| CMS | Sanity, Studio embedded at `/studio` in this Next.js app |
| Auth | Sanity's own login (Google supported) — no custom auth built |
| Logo | `public/images/logo-icon.png` (28px screenshot crop — **must be replaced with high-res original before launch**) |

## Design tokens (→ `@theme` in `src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `surface-base` | `#030507` | Page background |
| `surface-muted` | `#0A0F16` | Alternating sections (navy tint) |
| `surface-raised` | `#0D141D` | Cards, panels |
| `border-default` | `rgba(255,255,255,0.08)` | Hairline borders, grid lines |
| `accent` | `#22D3EE` | Links, buttons, highlights, focus rings |
| `accent-deep` | `#2DD4BF` | Gradient pair with accent |
| `text-primary` | `#E6E6EA` | Headings, body |
| `text-secondary` | `#8A8A94` | Captions, meta |

- Font: Inter via `next/font`, stack `Inter, ui-sans-serif, system-ui, sans-serif`.
- Scale: base 16/24; xs 11 · sm 12 · md 14 · lg 16 · xl 18 · 2xl 48 · 3xl 72.
  Hero: 72px desktop / 48px mobile.
- Spacing: 8px scale (8, 10, 12, 16, 20, 24, 32, 40).
- Motion: 150ms transitions; teal glow on hover/focus; honor
  `prefers-reduced-motion`.
- Accessibility: WCAG 2.2 AA. 2px teal focus-visible ring on all interactives.
  All text ≥ 4.5:1 contrast on its surface. Keyboard-first.
- No raw hex in components — semantic tokens only.

## Pages

Shared shell: sticky near-black header (logo, nav from `content/site.ts`, teal
"Contact" button), footer, bordered-grid card language. Each page gets a
distinct layout treatment:

- **`/` Landing** — 72px hero ("Applied AI, engineered for *depth*" — "depth"
  in teal gradient), navy depth-gradient backdrop, services card grid,
  2 featured projects, stats band, latest blog teasers, full-width CTA band.
- **`/about`** — oversized mission statement, values as numbered structured
  list, team grid with photos.
- **`/services`** — numbered rows (01/02/…) alternating text-left/right,
  capability tags per service.
- **`/work`** — image-led case-study cards; detail (`/work/[slug]`): full-bleed
  hero image, challenge/approach/outcome, tech tags, next-project nav.
- **`/blog`** — featured latest post + clean list; detail (`/blog/[slug]`):
  65ch prose column, reading time, related posts.
- **`/careers`** — roles grouped by team as bordered list rows + culture band.
- **`/contact`** — split layout: form (name/email/message) | email, socials,
  response-time note.

## Admin / CMS architecture

- Sanity Studio mounted at `/studio` (next-sanity). Admin edits: blog posts,
  projects (image uploads → Sanity image CDN), services, team members, roles,
  and a singleton **Site Settings** document (tagline, descriptions, hero
  copy, socials, contact email). No page-builder — structured content only.
- **Swap happens only in `src/lib/content.ts`**: internals change from TS
  arrays to GROQ queries; pages keep calling `getProjects()` /
  `getProject(slug)` etc. unchanged. This is the seam the architecture doc
  reserved for exactly this.
- Sanity webhook → Next.js revalidation, so publishing updates the live site
  without a redeploy.
- Images rendered through `next/image` with Sanity CDN URLs.

## Sanity schemas

`post`, `project`, `service`, `teamMember`, `role`, `siteSettings`
(singleton). Fields mirror the existing types in `src/types/index.ts` so the
`lib/content.ts` getters keep their return shapes.

## Out of scope (YAGNI)

- Custom auth / user accounts — Sanity login covers admin access.
- Page-builder ("edit any pixel") — admin edits structured content + site copy.
- Animation library — CSS transitions + one hero gradient suffice.
- Contact form backend choice deferred to implementation plan (simplest:
  mailto or a form action; decide in plan).

## Companion deliverable

`docs/design-brief-prompt.md` — the full token-driven design brief in the
Mosa spec format, usable as a standalone prompt for any Claude design session
and as the source of truth during implementation.
