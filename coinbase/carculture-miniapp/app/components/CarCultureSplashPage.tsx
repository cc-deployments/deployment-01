import Image from "next/image";
import ActionMenu from "./ActionMenu";
import React from "react";

export default function CarCultureSplashPage() {
  const handleActionSelect = (action: string) => {
    alert(`You selected: ${action}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <Image
          src="/splash.png"
          alt="Splash"
          width={600}
          height={400}
          style={{ maxWidth: "100%", height: "auto", margin: "2rem auto" }}
          priority
        />
        <ActionMenu onSelect={handleActionSelect} />
      </div>
    </main>
  );
} 