'use client';

import Head from 'next/head';

const FarcasterMetaTags = () => {
  const baseUrl = 'https://carmania.carculture.com';
  
  return (
    <Head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content={`${baseUrl}/hero-v2.png`} />
      <meta property="fc:frame:button:1" content="🚗 Unlock the Ride" />
      <meta property="fc:frame:post_url" content={`${baseUrl}/api/frame`} />
    </Head>
  );
};

export default FarcasterMetaTags; 