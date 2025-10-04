// React hooks for XMTP integration
import { useState, useEffect, useCallback } from 'react';
import { Client } from '@xmtp/browser-sdk';
import { DRIVRMessage, DRIVRConversation, DRIVRNotification } from './types';

export interface UseDRIVRChatOptions {
  client: Client | null;
  drivrAgentAddress: string;
}

export interface UseDRIVRChatReturn {
  conversations: DRIVRConversation[];
  currentConversation: DRIVRConversation | null;
  messages: DRIVRMessage[];
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  startConversation: () => Promise<void>;
  selectConversation: (conversationId: string) => void;
}

/**
 * Hook for managing DRIVR chat conversations
 */
export function useDRIVRChat({ client, drivrAgentAddress }: UseDRIVRChatOptions): UseDRIVRChatReturn {
  const [conversations, setConversations] = useState<DRIVRConversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<DRIVRConversation | null>(null);
  const [messages, setMessages] = useState<DRIVRMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize connection
  useEffect(() => {
    if (client) {
      setIsConnected(true);
      loadConversations();
    } else {
      setIsConnected(false);
    }
  }, [client]);

  // Load conversations
  const loadConversations = useCallback(async () => {
    if (!client) return;

    try {
      setIsLoading(true);
      const conversations = await client.conversations.list();
      
      const drivrConversations: DRIVRConversation[] = conversations
        .filter(conv => conv.peerAddress === drivrAgentAddress)
        .map(conv => ({
          id: conv.topic,
          peerAddress: conv.peerAddress,
          messages: [],
          lastMessageAt: Date.now(),
          isActive: true,
        }));

      setConversations(drivrConversations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load conversations');
    } finally {
      setIsLoading(false);
    }
  }, [client, drivrAgentAddress]);

  // Start conversation with DRIVR
  const startConversation = useCallback(async () => {
    if (!client) return;

    try {
      setIsLoading(true);
      const conversation = await client.conversations.newConversation(drivrAgentAddress);
      
      const newConversation: DRIVRConversation = {
        id: conversation.topic,
        peerAddress: drivrAgentAddress,
        messages: [],
        lastMessageAt: Date.now(),
        isActive: true,
      };

      setConversations(prev => [...prev, newConversation]);
      setCurrentConversation(newConversation);
      
      // Send initial greeting
      await conversation.send('Hello DRIVR! I\'d like to chat about automotive NFTs.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start conversation');
    } finally {
      setIsLoading(false);
    }
  }, [client, drivrAgentAddress]);

  // Send message
  const sendMessage = useCallback(async (content: string) => {
    if (!client || !currentConversation) return;

    try {
      const conversation = await client.conversations.newConversation(drivrAgentAddress);
      await conversation.send(content);

      // Add message to local state
      const newMessage: DRIVRMessage = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        senderAddress: client.address || 'unknown',
        content,
        timestamp: Date.now(),
        type: 'text',
      };

      setMessages(prev => [...prev, newMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  }, [client, currentConversation, drivrAgentAddress]);

  // Select conversation
  const selectConversation = useCallback((conversationId: string) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
      setMessages(conversation.messages);
    }
  }, [conversations]);

  return {
    conversations,
    currentConversation,
    messages,
    isConnected,
    isLoading,
    error,
    sendMessage,
    startConversation,
    selectConversation,
  };
}

/**
 * Hook for DRIVR notifications
 */
export function useDRIVRNotifications(client: Client | null) {
  const [notifications, setNotifications] = useState<DRIVRNotification[]>([]);

  useEffect(() => {
    if (!client) return;

    // Listen for messages that might be notifications
    const handleMessage = (message: any) => {
      if (message.content.includes('notification:')) {
        const notification: DRIVRNotification = {
          type: 'nft_purchase',
          title: 'DRIVR Notification',
          message: message.content.replace('notification:', '').trim(),
          timestamp: Date.now(),
        };
        
        setNotifications(prev => [...prev, notification]);
      }
    };

    // Set up message listener
    client.on('message', handleMessage);

    return () => {
      client.off('message', handleMessage);
    };
  }, [client]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    clearNotifications,
  };
}

























