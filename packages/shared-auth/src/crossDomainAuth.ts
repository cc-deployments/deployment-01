// packages/shared-auth/src/crossDomainAuth.ts

// CDP configuration - no need to import CDPReactProvider here

// Shared CDP Configuration for cross-domain access
export const SHARED_CDP_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a',
  ethereum: { createOnLogin: 'eoa' },
  appName: 'CarCulture Platform'
};

// Cross-domain authentication state management
export interface CrossDomainAuthState {
  isAuthenticated: boolean;
  walletAddress?: string;
  domain: string;
  timestamp: number;
}

// Storage key for cross-domain auth state
const AUTH_STATE_KEY = 'carculture_auth_state';

// Allowed domains for cross-domain communication
export const ALLOWED_DOMAINS = [
  'https://carculture.com',
  'https://carmania.carculture.com',
  'http://localhost:3000',
  'http://localhost:3001'
];

/**
 * Store authentication state in localStorage with cross-domain support
 */
export function setCrossDomainAuthState(state: Partial<CrossDomainAuthState>) {
  const currentState = getCrossDomainAuthState();
  const newState: CrossDomainAuthState = {
    ...currentState,
    ...state,
    domain: window.location.origin,
    timestamp: Date.now()
  };
  
  localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(newState));
  
  // Broadcast to other domains via postMessage
  broadcastAuthState(newState);
}

/**
 * Get authentication state from localStorage
 */
export function getCrossDomainAuthState(): CrossDomainAuthState {
  try {
    const stored = localStorage.getItem(AUTH_STATE_KEY);
    if (!stored) {
      return {
        isAuthenticated: false,
        domain: window.location.origin,
        timestamp: 0
      };
    }
    
    const state = JSON.parse(stored);
    
    // Check if state is still valid (not older than 24 hours)
    const isExpired = Date.now() - state.timestamp > 24 * 60 * 60 * 1000;
    if (isExpired) {
      return {
        isAuthenticated: false,
        domain: window.location.origin,
        timestamp: 0
      };
    }
    
    return state;
  } catch (error) {
    console.error('Error reading cross-domain auth state:', error);
    return {
      isAuthenticated: false,
      domain: window.location.origin,
      timestamp: 0
    };
  }
}

/**
 * Broadcast authentication state to other domains
 */
function broadcastAuthState(state: CrossDomainAuthState) {
  // Send to all allowed domains
  ALLOWED_DOMAINS.forEach(domain => {
    if (domain !== window.location.origin) {
      try {
        // Use postMessage to communicate with other domains
        window.postMessage({
          type: 'CARCULTURE_AUTH_STATE',
          data: state
        }, domain);
      } catch (error) {
        // Ignore errors for domains that aren't loaded
        console.debug(`Could not broadcast to ${domain}:`, error);
      }
    }
  });
}

/**
 * Listen for authentication state updates from other domains
 */
export function listenForCrossDomainAuthUpdates(
  callback: (state: CrossDomainAuthState) => void
) {
  const handleMessage = (event: MessageEvent) => {
    // Verify origin
    if (!ALLOWED_DOMAINS.includes(event.origin)) {
      return;
    }
    
    // Check message type
    if (event.data?.type === 'CARCULTURE_AUTH_STATE') {
      const state = event.data.data as CrossDomainAuthState;
      
      // Update local storage
      localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(state));
      
      // Call callback
      callback(state);
    }
  };
  
  window.addEventListener('message', handleMessage);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('message', handleMessage);
  };
}

/**
 * Clear authentication state across all domains
 */
export function clearCrossDomainAuthState() {
  localStorage.removeItem(AUTH_STATE_KEY);
  
  // Broadcast logout to other domains
  const logoutState: CrossDomainAuthState = {
    isAuthenticated: false,
    domain: window.location.origin,
    timestamp: Date.now()
  };
  
  broadcastAuthState(logoutState);
}

/**
 * Check if current domain is allowed for cross-domain auth
 */
export function isAllowedDomain(): boolean {
  return ALLOWED_DOMAINS.includes(window.location.origin);
}

/**
 * Get DRIVR agent configuration for cross-domain access
 */
export function getDRIVRAgentConfig() {
  return {
    agentAddress: '0x564D30E9c91dF7B0B7B5C65E1d21A4e164905142',
    basename: 'drivr.base.eth',
    xmtpEnv: 'dev',
    allowedDomains: ALLOWED_DOMAINS
  };
}

