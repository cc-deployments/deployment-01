// Global type declarations for window object extensions

declare global {
  interface Window {
    shareCarMania?: () => Promise<any>;
    shareCarManiaGarage?: () => Promise<any>;
    enhancedShare?: (options: {
      title: string;
      text: string;
      url: string;
    }) => Promise<any>;
  }
}

export {};
