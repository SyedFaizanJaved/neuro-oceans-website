# Neuro Oceans — Company Website

Company portfolio site. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional locally; required in production
npm run dev                  # http://localhost:3000
```

## Scripts

| Command                | Does                                    |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Dev server with hot reload              |
| `npm run build`        | Production build                        |
| `npm start`            | Serve the production build              |
| `npm run lint`         | ESLint                                  |
| `npm run typecheck`    | TypeScript, no emit                     |
| `npm run format`       | Prettier write (sorts Tailwind classes) |
| `npm run format:check` | Prettier check, no writes               |

## Where things live

| Path              | Holds                                            |
| ----------------- | ------------------------------------------------ |
| `src/app/`        | Routes only — thin files, no business logic      |
| `src/components/` | `ui/` · `layout/` · `sections/` (see its README) |
| `src/content/`    | Typed site content — edit copy here              |
| `src/lib/`        | Content getters, SEO helper, utilities           |
| `src/types/`      | Shared content types                             |
| `public/images/`  | Static assets                                    |

**To change company name, tagline or navigation:** `src/content/site.ts`.

## Current state

Structure and wiring are complete. Routes resolve, metadata and the sitemap are
generated, and the content layer is typed — but pages render placeholder text
and no components or visual design have been built yet.

## Read next

**[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)** — the layering rule, a
"where does my new file go?" table, the reasoning behind each decision, and
recipes for adding pages and content types. Read it before adding files.
