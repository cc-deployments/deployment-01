import Image from "next/image";
import React from "react";

export default function CarManiaSplashPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        {/* CarMania Splash Art */}
        <div className="flex justify-center w-full">
          <Image
            src="/carmania-splash.png"
            alt="CarMania Splash"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", maxWidth: "100%" }}
            priority
          />
        </div>
      </div>
    </main>
  );
} 