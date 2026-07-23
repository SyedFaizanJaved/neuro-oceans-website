"use client";

/**
 * Catches render errors below the root layout. Must be a client component —
 * that is a Next.js requirement, not a choice.
 *
 * `reset()` re-renders the failed segment without a full page reload.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <p>Something went wrong.</p>
      {/* digest is the server-side error id — useful when a visitor reports it. */}
      {error.digest && <p>Reference: {error.digest}</p>}
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
