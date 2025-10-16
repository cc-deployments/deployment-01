'use client';

import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!mounted) return null;

  return (
    <div>
      <h1>Error</h1>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
