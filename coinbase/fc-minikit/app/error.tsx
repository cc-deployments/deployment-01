'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h1>Error</h1>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
