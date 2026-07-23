# Components

Three tiers. The tier a component belongs to is decided by **who it knows about**,
not by how big it is.

| Folder      | Knows about                  | Example                               |
| ----------- | ---------------------------- | ------------------------------------- |
| `ui/`       | Nothing. Props only.         | `Button`, `Container`, `Card`         |
| `layout/`   | Site config (nav, socials).  | `Header`, `Footer`, `MobileNav`       |
| `sections/` | Content getters from `lib/`. | `Hero`, `ServicesGrid`, `WorkPreview` |

## The rule

Dependencies point **downward only**: `sections/` may import from `ui/`, and
`ui/` may import from nothing but itself.

A `ui/` component that imports `lib/content` is misfiled — pass the data in as a
prop and it becomes reusable again. This is the check that stops the folder from
degrading into one flat pile over time.

## Conventions

- **One file per component**, PascalCase: `Button.tsx`, not `Button/index.tsx`.
  A folder plus a barrel file per component is two extra files buying nothing.
- **No `index.ts` barrels.** Import the real path: `@/components/ui/Button`.
  Barrels defeat tree-shaking and turn every addition into a second edit.
- **Server by default.** Add `"use client"` only when the component needs state,
  effects or browser events — most will not.
- Co-locate a component's types in its own file unless they are shared content
  types, which live in `src/types/`.
