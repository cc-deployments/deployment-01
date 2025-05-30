'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useWallets } from '@privy-io/react-auth';
import Image from "next/image";
import { useEffect, useState } from "react";
import FrameSDK from "@farcaster/frame-sdk";
import ActionMenu from "../components/ActionMenu";

function PrivyTest() {
  const { login, logout, user, ready, authenticated } = usePrivy();
  const { wallets } = useWallets();

  if (!ready) return <div>Loading...</div>;

  if (!authenticated) {
    return <button onClick={login}>Log in with Privy</button>;
  }

  const activeWallet = wallets[0]; // Get the first connected wallet

  return (
    <div>
      <p>Welcome, {activeWallet ? 
        `${activeWallet.address.slice(0, 6)}...${activeWallet.address.slice(-4)}` : 
        user?.email?.address || 'User'}!</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}

function isInFarcasterFrame() {
  if (typeof window === 'undefined') return false;
  // Farcaster frames are always iframed
  return window.self !== window.top;
}

export default function Home() {
  const [isMiniApp, setIsMiniApp] = useState(false);

  useEffect(() => {
    FrameSDK.actions.ready();
    // Use Mini App SDK detection
    async function detectMiniApp() {
      if (FrameSDK.isInMiniApp) {
        const result = await FrameSDK.isInMiniApp();
        setIsMiniApp(result);
      }
    }
    detectMiniApp();
  }, []);

  const inFrame = isInFarcasterFrame();

  const handleActionSelect = (action: string) => {
    alert(`You selected: ${action}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <Image
            src="/logo-black.png"
            alt="CarCulture Logo"
            width={80}
            height={80}
            style={{ display: "block" }}
            priority
          />
        </div>
        <Image
          src="/splash.png"
          alt="Splash"
          width={600}
          height={400}
          style={{ maxWidth: "100%", height: "auto", margin: "2rem auto" }}
          priority
        />
        <ActionMenu onSelect={handleActionSelect} />
        {/* Only show Privy login if NOT in Mini App */}
        {!isMiniApp && <PrivyTest />}
      </div>
    </main>
  );
} 