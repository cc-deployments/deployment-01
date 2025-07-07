"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface SharedCast {
  castHash: string;
  castFid: string;
  viewerFid?: string;
}

export default function SharePage() {
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

  if (sharedCast) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">
          cast shared to:<br />
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
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div>No shared cast context detected.</div>
    </div>
  );
} 