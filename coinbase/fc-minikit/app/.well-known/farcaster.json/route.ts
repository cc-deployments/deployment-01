function withValidProperties(
  properties: Record<string, undefined | string | string[]>,
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    }),
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL || "https://web3-social-starter-fc-minikit.vercel.app";
  const IMAGE_DOMAIN = "https://web3-social-starter-fc-minikit.vercel.app";

  return Response.json({
    miniapp: withValidProperties({
      version: "1",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      subtitle: process.env.NEXT_PUBLIC_APP_SUBTITLE,
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
      iconUrl: `${IMAGE_DOMAIN}/favicon.png`,
      splashImageUrl: `${IMAGE_DOMAIN}/splash.png`,
      splashBackgroundColor: process.env.NEXT_PUBLIC_APP_SPLASH_BACKGROUND_COLOR,
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: (process.env.NEXT_PUBLIC_APP_PRIMARY_CATEGORY || "entertainment").toLowerCase(),
      heroImageUrl: `${IMAGE_DOMAIN}/hero-v2.png`,
      tagline: process.env.NEXT_PUBLIC_APP_TAGLINE,
      ogTitle: process.env.NEXT_PUBLIC_APP_OG_TITLE,
      ogDescription: process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION,
      ogImageUrl: `${IMAGE_DOMAIN}/hero-v2.png`,
      screenshotUrls: [
        `${IMAGE_DOMAIN}/screenshot1.png`,
        `${IMAGE_DOMAIN}/screenshot2.png`,
        `${IMAGE_DOMAIN}/screenshot3.png`
      ],
      tags: [
        "social",
        "carculture",
        "car",
        "storytelling",
        "nft"
      ],
      buttonTitle: process.env.NEXT_PUBLIC_APP_BUTTON_TITLE,
      previewImageUrl: `${IMAGE_DOMAIN}/hero-v2.png`,
      castShareUrl: process.env.NEXT_PUBLIC_APP_CAST_SHARE_URL,
    })
  });
}
