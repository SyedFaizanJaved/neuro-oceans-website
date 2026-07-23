/**
 * Joins class names, dropping anything falsy. Lets components write
 * `cn("p-4", isActive && "bg-cyan-500")` without leaking "false" into the DOM.
 *
 * ponytail: plain join, no clsx/tailwind-merge. It does not de-duplicate
 * conflicting Tailwind classes ("p-2 p-4" stays as-is, last one wins in CSS
 * order, not source order). Add tailwind-merge only once that actually bites.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
