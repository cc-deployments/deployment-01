import React from 'react';
import Image from 'next/image';

interface ImageWithOverlayProps {
  imageSrc: string;
  imageAlt: string;
  overlayContent?: React.ReactNode;
  className?: string;
}

export default function ImageWithOverlay({
  imageSrc,
  imageAlt,
  overlayContent,
  className = ""
}: ImageWithOverlayProps) {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        width: '630px',
        height: '1800px',
        maxWidth: '100%',
        maxHeight: '100vh'
      }}
    >
      {/* Main image area */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={630}
        height={1800}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '12px',
        }}
        priority
      />
      
      {/* Bottom overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '630px',
          height: '600px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {overlayContent}
      </div>
    </div>
  );
} 