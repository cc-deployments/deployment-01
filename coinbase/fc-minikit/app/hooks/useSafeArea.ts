

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function useSafeArea() {
  const safeArea: SafeAreaInsets = {
    top: 0,     // Remove hardcoded top padding for local development
    bottom: 0,  // Remove hardcoded bottom padding for local development
    left: 0,
    right: 0
  };

  // Don't wait for MiniKit context - set defaults immediately
  return { safeArea, isLoading: false };
} 