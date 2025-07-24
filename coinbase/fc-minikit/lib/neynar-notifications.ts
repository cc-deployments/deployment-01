// Neynar Notification Utility
// This replaces the old Redis-based notification system

export interface NotificationRequest {
  title: string;
  body: string;
  targetUrl?: string;
  targetFids?: number[];
  filters?: {
    exclude_fids?: number[];
    following_fid?: number;
    minimum_user_score?: number;
    near_location?: {
      latitude: number;
      longitude: number;
      radius?: number;
    };
  };
}

export interface NotificationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Send a notification to users via Neynar API
 * 
 * @param notification - The notification details
 * @param neynarApiKey - Your Neynar API key
 * @returns Promise<NotificationResponse>
 */
export async function sendNeynarNotification(
  notification: NotificationRequest,
  neynarApiKey: string
): Promise<NotificationResponse> {
  try {
    const response = await fetch('https://api.neynar.com/v2/farcaster/frame/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_key': neynarApiKey,
      },
      body: JSON.stringify({
        target_fids: notification.targetFids || [],
        filters: notification.filters || {},
        notification: {
          title: notification.title,
          body: notification.body,
          target_url: notification.targetUrl || 'https://web3-social-starter-fc-minikit.vercel.app',
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Notification sent successfully',
      };
    } else {
      return {
        success: false,
        error: data.error || 'Failed to send notification',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send a notification to all users who have added your mini app
 * 
 * @param title - Notification title
 * @param body - Notification body
 * @param neynarApiKey - Your Neynar API key
 * @returns Promise<NotificationResponse>
 */
export async function sendBroadcastNotification(
  title: string,
  body: string,
  neynarApiKey: string
): Promise<NotificationResponse> {
  return sendNeynarNotification(
    {
      title,
      body,
      targetFids: [], // Empty array means broadcast to all users
    },
    neynarApiKey
  );
}

/**
 * Send a notification to specific users
 * 
 * @param title - Notification title
 * @param body - Notification body
 * @param targetFids - Array of FIDs to target
 * @param neynarApiKey - Your Neynar API key
 * @returns Promise<NotificationResponse>
 */
export async function sendTargetedNotification(
  title: string,
  body: string,
  targetFids: number[],
  neynarApiKey: string
): Promise<NotificationResponse> {
  return sendNeynarNotification(
    {
      title,
      body,
      targetFids,
    },
    neynarApiKey
  );
}

/**
 * Send a notification with filters (e.g., exclude certain users, target followers)
 * 
 * @param title - Notification title
 * @param body - Notification body
 * @param filters - Filter criteria
 * @param neynarApiKey - Your Neynar API key
 * @returns Promise<NotificationResponse>
 */
export async function sendFilteredNotification(
  title: string,
  body: string,
  filters: NotificationRequest['filters'],
  neynarApiKey: string
): Promise<NotificationResponse> {
  return sendNeynarNotification(
    {
      title,
      body,
      filters,
    },
    neynarApiKey
  );
} 