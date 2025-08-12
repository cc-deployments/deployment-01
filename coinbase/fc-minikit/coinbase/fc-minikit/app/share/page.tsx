"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ShareContent from "./ShareContent";

export default function SharePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading shared cast...</div>}>
      <ShareContent />
    </Suspense>
  );
} 