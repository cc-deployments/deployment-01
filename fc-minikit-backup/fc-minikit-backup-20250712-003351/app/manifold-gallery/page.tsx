"use client";

export default function ManifoldGallery() {
  return (
    <div
      style={{
        width: 1260,
        minHeight: 800,
        maxWidth: '100vw',
        margin: "0 auto",
        background: "transparent",
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: '100vh',
      }}
    >
      <iframe
        src="https://manifold.xyz/@carculture"
        title="CarCulture Manifold Gallery"
        width={1260}
        style={{ border: "none", width: "100%", minHeight: 1200, height: '100vh' }}
        allowFullScreen
      />
    </div>
  );
} 