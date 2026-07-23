# Architecture

How this codebase is organised, and the reasoning behind each decision. Read
this before adding files — it exists so the structure stays intact as the site
grows rather than degrading into one flat pile.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind
CSS v4 · ESLint · Prettier.

---

## 1. The map

```
company/
├─ docs/
│  └─ ARCHITECTURE.md          this file
├─ public/
│  └─ images/                  static assets served from /images/...
├─ src/
│  ├─ app/                     ROUTING ONLY — thin files, no business logic
│  │  ├─ layout.tsx            root shell: fonts, metadata defaults
│  │  ├─ page.tsx              /
│  │  ├─ not-found.tsx         404
│  │  ├─ error.tsx             render-error boundary (client component)
│  │  ├─ sitemap.ts            generated from lib/content.ts
│  │  ├─ robots.ts             generated from lib/seo.ts
│  │  ├─ globals.css           Tailwind entry + @theme design tokens
│  │  ├─ about/page.tsx
│  │  ├─ services/page.tsx
│  │  ├─ careers/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ work/
│  │  │  ├─ page.tsx           listing
│  │  │  └─ [slug]/page.tsx    detail — reference dynamic route
│  │  └─ blog/
│  │     ├─ page.tsx           listing
│  │     └─ [slug]/page.tsx    detail
│  ├─ components/
│  │  ├─ ui/                   dumb + reusable, props only
│  │  ├─ layout/               Header, Footer, MobileNav
│  │  ├─ sections/             page-sized blocks (Hero, ServicesGrid, CTA)
│  │  └─ README.md             the three-tier rule
│  ├─ content/                 typed data — the facts about the company
│  │  ├─ site.ts               name, tagline, nav, socials
│  │  ├─ services.ts
│  │  ├─ projects.ts           case studies
│  │  ├─ posts.ts              blog posts
│  │  ├─ team.ts
│  │  └─ roles.ts              open positions
│  ├─ lib/
│  │  ├─ content.ts            getters — the swappable content seam
│  │  ├─ seo.ts                buildMetadata() + siteUrl
│  │  └─ utils.ts              cn()
│  └─ types/
│     └─ index.ts              shared content types
├─ .env.example
├─ .prettierrc
├─ eslint.config.mjs
├─ next.config.ts
├─ postcss.config.mjs
└─ tsconfig.json
```

---

## 2. The one rule

> **`app/` composes · `sections/` arrange · `ui/` renders · `content/` knows the
> facts · `lib/` fetches them.**

Dependencies flow in one direction down that list and never back up.

```
content/projects.ts → lib/content.ts → app/work/[slug]/page.tsx → sections/ → ui/
     typed data        getProject()      route + metadata          layout    pixels
```

Concretely, this means:

- A file in `app/` should be short. If a page file grows past a screen or two,
  the excess belongs in `components/sections/`.
- **Nothing outside `lib/content.ts` imports from `src/content/` directly.**
- A `ui/` component never imports `lib/` or `content/`. If it needs data, the
  data comes in as a prop.

Each violation is individually harmless. Together they are what turns a tidy
project into one nobody wants to touch.

---

## 3. Where does my new file go?

| I want to add…                        | It goes in…                            |
| ------------------------------------- | -------------------------------------- |
| A new URL                             | `src/app/<route>/page.tsx`             |
| A reusable button, card, container    | `src/components/ui/`                   |
| The header, footer, nav               | `src/components/layout/`               |
| A hero, a pricing block, a CTA band   | `src/components/sections/`             |
| A new service / project / post / role | the matching file in `src/content/`    |
| A new _kind_ of content               | `src/types/` → `src/content/` → `lib/` |
| A way to read content                 | `src/lib/content.ts`                   |
| A colour, font size, spacing token    | `@theme` in `src/app/globals.css`      |
| A logo, photo, OG image               | `public/images/`                       |
| A config value that varies by env     | `.env.example` + read it in `lib/`     |

---

## 4. Key decisions

### `lib/content.ts` is a seam, not a formality

Content currently lives in typed TypeScript arrays. Pages do not know that —
they call `getProjects()` and `getProject(slug)`.

When the site outgrows TS files, MDX or a headless CMS gets swapped in **inside
those functions only**. No page and no component changes. That is the entire
reason the indirection exists; without it, migrating later means touching every
page that touched content.

### Typed content fails the build, not the page

`src/types/index.ts` defines `Project`, `Post`, `Service`, `TeamMember`, `Role`.
Content files are typed against them, so a missing `date` or a typo'd field is a
`next build` error rather than a blank space discovered in production.

### One metadata helper

Every page calls `buildMetadata()` from `lib/seo.ts` instead of hand-writing a
`Metadata` object. Titles, canonical URLs and social cards therefore cannot
drift apart page by page. The root layout sets a `title.template`, so pages pass
`title: "About"` and get `"About — Neuro Oceans"`.

`sitemap.ts` reads from `lib/content.ts`, so publishing a project or post
indexes it automatically. There is no URL list to maintain.

### Absolute URLs come from the environment

`NEXT_PUBLIC_SITE_URL` drives canonicals, Open Graph and the sitemap. It falls
back to `http://localhost:3000`, so a fresh clone runs with no `.env.local` at
all — but it must be set in production or every canonical URL points at
localhost.

### No barrel files

Import `@/components/ui/Button`, never `@/components/ui`. Barrel `index.ts`
files defeat tree-shaking, create import cycles, and make every new component a
two-file edit.

### One file per component

`Button.tsx`, not `Button/Button.tsx` + `Button/index.ts`. The folder-per-
component pattern doubles the file count to buy nothing at this size.

### `globals.css` stays in `app/`

Next.js's own convention, and it is currently one file. A `styles/` folder
holding a single file is filing, not organisation. Create one if and when a
second global stylesheet genuinely exists.

### Server components by default

Add `"use client"` only for state, effects or browser events. `error.tsx` is a
client component because Next.js requires it, not by choice.

---

## 5. Recipes

### Add a static page

1. `src/app/<route>/page.tsx`
2. `export const metadata = buildMetadata({ title: "...", path: "/<route>" })`
3. Add it to `nav` in `src/content/site.ts` if it belongs in the header — the
   sitemap picks it up from there automatically.

### Add an entry to an existing collection

Append an object to the array in `src/content/`. The detail route, the listing,
and the sitemap all update on the next build. Nothing else to touch.

### Add a whole new content type

1. Define the type in `src/types/index.ts`
2. Create `src/content/<thing>.ts` typed against it
3. Add `get<Things>()` / `get<Thing>(slug)` to `src/lib/content.ts`
4. Create the route, copying the shape of `app/work/[slug]/page.tsx` — it is the
   reference implementation for `generateStaticParams`, `generateMetadata` and
   the `notFound()` path.

---

## 6. Deliberately not here

Each of these is a real tool that this project does not yet need. Listed with
the trigger that should make you add it, so the omission is a decision rather
than an oversight.

| Not included              | Add it when                                             |
| ------------------------- | ------------------------------------------------------- |
| MDX / content layer       | posts need real long-form formatting, not just excerpts |
| Headless CMS              | non-developers must edit content without a deploy       |
| Vitest / Playwright       | `lib/` holds logic worth breaking (it is array filters) |
| Husky, lint-staged, CI    | more than one person commits to this repo               |
| `clsx` + `tailwind-merge` | conflicting Tailwind classes actually cause a bug       |
| Animation library         | a real motion design exists to implement                |
| `src/styles/`             | a second global stylesheet exists                       |
| State manager             | server components and URL state stop being enough       |

Empty "for later" folders were left out on purpose: a directory that holds
nothing teaches nothing, and it rots.
