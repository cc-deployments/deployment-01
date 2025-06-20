import { useEffect, useState } from 'react';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';

export function useFeed() {
  const [casts, setCasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const client = new NeynarAPIClient(process.env.NEXT_PUBLIC_NEYNAR_API_KEY!);
        // Log available methods to help identify the correct one
        console.log('NeynarAPIClient methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(client)));
        // TODO: Replace with the correct method once identified
        setCasts([]);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch feed');
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, []);

  return { casts, loading, error };
}