import Head from 'next/head';

interface FarcasterMetaTagsProps {
  pageUrl: string;
  buttonTitle?: string;
}

export default function FarcasterMetaTags({ pageUrl, buttonTitle = "Unlock the Ride" }: FarcasterMetaTagsProps) {
  const baseUrl = 'https://web3-social-starter-fc-minikit.vercel.app';
  const imageUrl = 'https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png';
  const splashImageUrl = 'https://i.imgur.com/y3PmlLB.jpeg';
  const splashBackgroundColor = '#a32428';
  const appName = 'Car Culture: CarMania Garage';

  const miniappEmbed = {
    version: "1",
    imageUrl: imageUrl,
    button: {
      title: buttonTitle,
      action: {
        type: "launch_miniapp",
        url: `${baseUrl}${pageUrl}`,
        name: appName,
        splashImageUrl: splashImageUrl,
        splashBackgroundColor: splashBackgroundColor
      }
    }
  };

  const frameEmbed = {
    version: "1",
    imageUrl: imageUrl,
    button: {
      title: buttonTitle,
      action: {
        type: "launch_frame",
        url: `${baseUrl}${pageUrl}`,
        name: appName,
        splashImageUrl: splashImageUrl,
        splashBackgroundColor: splashBackgroundColor
      }
    }
  };

  return (
    <Head>
      <meta name="fc:miniapp" content={JSON.stringify(miniappEmbed)} />
      <meta name="fc:frame" content={JSON.stringify(frameEmbed)} />
    </Head>
  );
} 