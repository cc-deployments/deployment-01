// Force redeploy:  Tue Jul 1 01:35:27 EDT 2025
import Image from "next/image";

export default function App() {
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
