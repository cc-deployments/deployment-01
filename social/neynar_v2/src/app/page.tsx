'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useWallets } from '@privy-io/react-auth';
import Image from "next/image";
import { useEffect } from "react";
import FrameSDK from "@farcaster/frame-sdk";

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

export default function Home() {
  useEffect(() => {
    FrameSDK.actions.ready();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">CarCulture</h1>
        <Image
          src="/splash.png"
          alt="Splash"
          width={600}
          height={400}
          style={{ maxWidth: "100%", height: "auto", margin: "2rem auto" }}
          priority
        />
        <PrivyTest />
      </div>
    </main>
  );
} 