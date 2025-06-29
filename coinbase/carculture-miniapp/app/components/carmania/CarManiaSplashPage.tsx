import Image from "next/image";
import React from "react";

export default function CarManiaSplashPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12">
      <div className="z-10 max-w-5xl w-full items-center justify-center">
        {/* CarMania Splash Art */}
        <div className="flex justify-center w-full">
          <Image
            src="/carmania-splash.png"
            alt="CarMania Splash"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", maxWidth: "100%" }}
            priority
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
} 