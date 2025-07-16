"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeroWithStart from "../components/HeroWithShare";
import Image from "next/image";

interface SharedCast {
  castHash: string;
  castFid: string;
  viewerFid?: string;
}

export default function ShareContent() {
  const searchParams = useSearchParams();
  const [sharedCast, setSharedCast] = useState<SharedCast | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const castHash = searchParams.get("castHash");
    const castFid = searchParams.get("castFid");
    const viewerFid = searchParams.get("viewerFid");
    if (castHash && castFid) {
      setSharedCast({ castHash, castFid, viewerFid: viewerFid || undefined });
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading shared cast...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
      <div className="w-[1200px] max-w-full">
        <HeroWithStart
          onStart={() => {
            if (navigator.share) {
              navigator.share({
                title: "CarMania Garage",
                text: "Check out CarMania Garage!",
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }
          }}
        />
      </div>
      {/* Car Culture Logo and Button Section with White Background */}
      <div className="w-full bg-white flex flex-col items-center">
        <div className="flex justify-center w-full mt-6 mb-2">
          <Image
            src="/carculture-logo.png"
            alt="Car Culture Logo"
            width={112}
            height={48}
            style={{ width: "112px", height: "auto" }}
            priority
          />
        </div>
        <div className="flex flex-col items-center w-full mt-0">
          <a
            href="https://app.manifold.xyz/c/man-driving-car"
            target="_blank"
            rel="noopener noreferrer"
            className="md:w-auto flex justify-center"
            style={{ pointerEvents: 'auto' }}
          >
            <button
              type="button"
              className="rounded-full text-white shadow-md hover:opacity-90 transition bg-[#a32428] whitespace-nowrap font-semibold text-xs px-1.5 md:px-5 py-0.5 md:py-1.5 min-w-[54px] md:min-w-[156px] h-4 md:h-8 flex items-center justify-center border-none"
              style={{
                fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '0.08em',
              }}
            >
              Unlock&nbsp;the&nbsp;Ride
            </button>
          </a>
        </div>
      </div>
      {/* Optionally show shared cast info below */}
      {sharedCast && (
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold mb-4">
            Cast shared to:<br />
            CarCulture: CarMania Garage
          </h1>
          <div className="bg-gray-100 rounded p-4 mb-4 w-full max-w-md">
            <div><b>Cast Hash:</b> {sharedCast.castHash}</div>
            <div><b>Author FID:</b> {sharedCast.castFid}</div>
            {sharedCast.viewerFid && <div><b>Viewer FID:</b> {sharedCast.viewerFid}</div>}
          </div>
          <p className="text-gray-600">
            Thanks for sharing this cast! Collect the Classics. One Garage at a Time.
          </p>
        </div>
      )}
    </div>
  );
} 