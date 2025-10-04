'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { DRIVRChatClient } from '../services/drivr-xmtp-client';
import { DRIVRMessage, DRIVRConversation, DRIVRNotification } from '../../../../packages/shared-xmtp/src/types';

interface DRIVRChatInterfaceProps {
  className?: string;
  onPaymentRequest?: (amount: string, description: string) => void;
  onNotification?: (notification: DRIVRNotification) => void;
}

export function DRIVRChatInterface({ 
  className = '', 
  onPaymentRequest,
  onNotification 
}: DRIVRChatInterfaceProps) {
  const { address, isConnected } = useAccount();
  const [chatClient, setChatClient] = useState<DRIVRChatClient | null>(null);
  const [conversations, setConversations] = useState<DRIVRConversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<DRIVRConversation | null>(null);
  const [messages, setMessages] = useState<DRIVRMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<DRIVRNotification[]>([]);

  // Initialize chat client when wallet connects
  useEffect(() => {
    if (isConnected && address && !chatClient) {
      const client = new DRIVRChatClient();
      
      // Set up message handler
      client.onMessage((message: DRIVRMessage) => {
        setMessages(prev => [...prev, message]);
      });

      // Set up notification handler
      client.onNotification((notification: DRIVRNotification) => {
        setNotifications(prev => [...prev, notification]);
        if (onNotification) {
          onNotification(notification);
        }
      });

      // Connect to XMTP
      client.connect({ getAddress: () => address }).then(() => {
        setChatClient(client);
        setConversations(client.getConversations());
      }).catch((err) => {
        setError(err.message);
      });
    }
  }, [isConnected, address, chatClient, onNotification]);

  // Start conversation with DRIVR when client is ready
  useEffect(() => {
    if (chatClient && conversations.length === 0) {
      startConversationWithDRIVR();
    }
  }, [chatClient, conversations.length]);

  // Update messages when conversation changes
  useEffect(() => {
    if (currentConversation) {
      setMessages(currentConversation.messages);
    }
  }, [currentConversation]);

  const startConversationWithDRIVR = async () => {
    if (!chatClient) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const conversation = await chatClient.startConversationWithDRIVR();
      setCurrentConversation(conversation);
      setConversations(chatClient.getConversations());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start conversation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatClient || !inputMessage.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      
      await chatClient.sendMessage(inputMessage.trim());
      setInputMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectConversation = (conversationId: string) => {
    if (chatClient) {
      chatClient.selectConversation(conversationId);
      setCurrentConversation(chatClient.getCurrentConversation());
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  if (!isConnected) {
    return (
      <div className={`drivr-chat-interface ${className}`}>
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Connect Your Wallet</h3>
            <p className="text-gray-500">Please connect your wallet to chat with DRIVR</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`drivr-chat-interface ${className}`}>
        <div className="flex items-center justify-center h-64 bg-red-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-700 mb-2">Connection Error</h3>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`drivr-chat-interface ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">D</span>
          </div>
          <div>
            <h2 className="font-semibold">DRIVR</h2>
            <p className="text-blue-100 text-sm">CarCulture AI Assistant</p>
          </div>
        </div>
        
        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="relative">
            <button
              onClick={clearNotifications}
              className="relative p-2 bg-blue-500 rounded-full hover:bg-blue-400"
            >
              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Conversations Sidebar */}
      {conversations.length > 1 && (
        <div className="flex border-b">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => selectConversation(conv.id)}
              className={`px-4 py-2 text-sm border-r ${
                currentConversation?.id === conv.id
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              DRIVR Chat
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 bg-gray-50 max-h-96 overflow-y-auto">
        {isLoading && !messages.length && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="ml-2 text-gray-600">Connecting to DRIVR...</span>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderAddress === address ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.senderAddress === address
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 border'
              }`}
            >
              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              <div className={`text-xs mt-1 ${
                message.senderAddress === address ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isLoading && messages.length > 0 && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 px-4 py-2 rounded-lg border">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask DRIVR about automotive NFTs..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            onClick={() => setInputMessage('Show me available NFTs')}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
          >
            Browse NFTs
          </button>
          <button
            onClick={() => setInputMessage('Check current prices')}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
          >
            Check Prices
          </button>
          <button
            onClick={() => setInputMessage('Find Woodie Wagon NFTs')}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
          >
            Find Cars
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="absolute top-16 right-4 space-y-2 z-10">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-sm"
            >
              <div className="flex items-start space-x-2">
                <div className="text-yellow-500">🔔</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-800">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {notification.message}
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(prev => prev.filter((_, i) => i !== index))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

























