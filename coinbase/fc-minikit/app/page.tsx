"use client";

import { useEffect } from "react";
import { sdk } from '@farcaster/frame-sdk';
import Image from "next/image";

export default function App() {
  useEffect(() => {
    // Call ready as soon as the interface is ready to dismiss the splash screen
    sdk.actions.ready();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--app-background)]">
      <Image
        src="/hero.png"
        alt="Hero"
        width={1200}
        height={630}
        style={{ maxWidth: "100%", height: "auto" }}
        priority
      />
    </div>
  );
}
