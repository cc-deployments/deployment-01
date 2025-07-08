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
  const IMAGE_DOMAIN = "https://web3-social-starter-fc-minikit.vercel.app";
  const URL = IMAGE_DOMAIN;

  return Response.json({
    miniapp: withValidProperties({
      version: "1",
      name: "CarCulture: CarMania Garage",
      subtitle: "Daily Drops, Legendary Rides",
      description: "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.",
      iconUrl: `${IMAGE_DOMAIN}/favicon.png`,
      splashImageUrl: `${IMAGE_DOMAIN}/splash.png`,
      splashBackgroundColor: "#a32428",
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: "entertainment",
      heroImageUrl: `${IMAGE_DOMAIN}/hero-v2.png`,
      tagline: "Drive the Past. Own the Moment.",
      ogTitle: "CarCulture: CarMania Garage",
      ogDescription: "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.",
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
      previewImageUrl: `${IMAGE_DOMAIN}/hero-v2.png`,
      buttonTitle: "Unlock the Ride"
    })
  });
}
