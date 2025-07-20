"use client";

import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function NotificationHandler() {
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        const context = await sdk.context;
        
        // Check if notifications are available
        if (context?.client?.notificationDetails) {
          console.log('🔔 Notifications enabled for this user');
          console.log('📧 Notification URL:', context.client.notificationDetails.url);
          
          // Store notification details for later use
          // You could save this to localStorage or state management
        } else {
          console.log('🔕 Notifications not enabled for this user');
        }
      } catch (error) {
        console.error('❌ Error initializing notifications:', error);
      }
    };

    initializeNotifications();
  }, []);

  // Function to send a notification (can be called from other components)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendNotification = async (title: string, body: string) => {
    try {
      const context = await sdk.context;
      
      if (context?.client?.notificationDetails) {
        console.log('📤 Sending notification:', { title, body });
        
        // You would typically send this to your backend
        // which would then send it to Farcaster's notification API
        console.log('📧 Notification details:', context.client.notificationDetails);
        
        // Example: Send to your webhook endpoint
        const response = await fetch('/api/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            body,
            notificationDetails: context.client.notificationDetails,
          }),
        });
        
        if (response.ok) {
          console.log('✅ Notification sent successfully');
        } else {
          console.error('❌ Failed to send notification');
        }
      } else {
        console.log('🔕 Cannot send notification - not enabled');
      }
    } catch (error) {
      console.error('❌ Error sending notification:', error);
    }
  };

  return null;
} 