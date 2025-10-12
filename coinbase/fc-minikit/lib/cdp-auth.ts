import { createCdpClient } from '@coinbase/cdp-sdk';

// CDP Configuration
const CDP_PROJECT_ID = process.env.NEXT_PUBLIC_CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a';
const CDP_API_KEY_ID = process.env.NEXT_PUBLIC_CDP_API_KEY_ID || '';
const CDP_API_KEY_SECRET = process.env.CDP_API_KEY_SECRET || '';

// Create CDP client
export const cdpClient = createCdpClient({
  projectId: CDP_PROJECT_ID,
  apiKeyId: CDP_API_KEY_ID,
  apiKeySecret: CDP_API_KEY_SECRET,
});

// CDP Authentication utilities
export const getCdpAuthToken = async () => {
  try {
    // This would typically involve getting a JWT token from your backend
    // For now, we'll use the API key directly
    return {
      projectId: CDP_PROJECT_ID,
      apiKeyId: CDP_API_KEY_ID,
    };
  } catch (error) {
    console.error('Failed to get CDP auth token:', error);
    throw error;
  }
};
