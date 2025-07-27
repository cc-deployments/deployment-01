import React from 'react';

interface FixedSizeContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function FixedSizeContainer({ children, className = "" }: FixedSizeContainerProps) {
  return (
    <div
      className={`flex flex-col justify-end items-center mx-auto ${className}`}
      style={{
        width: '1260px',
        height: '2400px',
        maxWidth: '100%',
        maxHeight: '100vh',
        position: 'relative',
        background: 'transparent',
      }}
    >
      {children}
    </div>
  );
} 