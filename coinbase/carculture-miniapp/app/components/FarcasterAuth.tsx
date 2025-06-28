'use client';

import { useMiniKit } from '@coinbase/onchainkit/minikit';

export default function FarcasterAuth() {
  const { context } = useMiniKit();
  
  // Verify user identity using FID
  const userFid = context?.user?.fid;
  
  if (!userFid) {
    return <div>Please authenticate to access this content</div>;
  }
  
  // Create JWT or session based on verified FID
  const createSession = async () => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fid: userFid,
        username: context?.user?.username,
        location: context?.location
      })
    });
    
    return response.json();
  };
  
  return <div>Protected content for user {userFid}</div>;
} 