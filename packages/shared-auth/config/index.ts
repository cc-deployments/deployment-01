// packages/shared-auth/config/index.ts

// Export chains and connectors, but not wagmi (to avoid conflict with providers)
export * from './chains';
export * from './connectors'; 