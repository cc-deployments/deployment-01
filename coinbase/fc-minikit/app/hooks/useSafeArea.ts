

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function useSafeArea() {
  const safeArea: SafeAreaInsets = {
    top: 44,    // iPhone status bar + notch
    bottom: 34, // iPhone home indicator  
    left: 0,
    right: 0
  };

  // Don't wait for MiniKit context - set defaults immediately
  return { safeArea, isLoading: false };
} 