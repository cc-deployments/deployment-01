'use client';

import { useState, useEffect } from 'react';
import { NFTMintCardDefault } from '@coinbase/onchainkit/nft';
import { useNotification } from '@coinbase/onchainkit/minikit';
import Image from 'next/image';
import { abi } from './abi/CarNFT.json';

type CarMintCardProps = {
  // onBack?: () => void; // This prop is no longer needed
};

interface CarNFT {
  id: string;
  contractAddress: string;
  carName: string;
  date: string;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
}

export default function CarMintCard({}: CarMintCardProps) {
  const [activeCar, setActiveCar] = useState<CarNFT | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAgentChat, setShowAgentChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [mintSuccess, setMintSuccess] = useState(false);
  const sendNotification = useNotification();

  // Load the active car from localStorage
  useEffect(() => {
    const savedCars = localStorage.getItem('carNFTs');
    if (savedCars) {
      const cars: CarNFT[] = JSON.parse(savedCars);
      const active = cars.find(car => car.isActive);
      setActiveCar(active || null);
    }
    setLoading(false);
  }, []);

  // Send Duolingo-style notification after successful mint
  const handleMintSuccess = () => {
    setMintSuccess(true);
    
    // Send engaging notification
    sendNotification({
      title: '🎉 CarMania NFT Minted!',
      body: `You just added ${activeCar?.carName} to your collection! Ready for tomorrow's drop?`
    });

    // Schedule follow-up notification for next day
    setTimeout(() => {
      sendNotification({
        title: '🚗 New CarMania Drop Live!',
        body: "Don't break your streak! Today's exclusive car is ready to mint."
      });
    }, 24 * 60 * 60 * 1000); // 24 hours
  };

  // Agent Kit chat function
  const sendChatMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage;
    setChatMessage('');
    
    // Add user message to chat
    const newChatHistory = [...chatHistory, { role: 'user' as const, content: userMessage }];
    setChatHistory(newChatHistory);

    // Simulate Agent Kit response (replace with actual Agent Kit integration)
    const agentResponse = `I'm your CARMANIA car expert! I can tell you all about ${activeCar?.carName || 'this amazing car'}. What would you like to know about it?`;
    
    setTimeout(() => {
      setChatHistory([...newChatHistory, { role: 'assistant' as const, content: agentResponse }]);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading today's car...</p>
        </div>
      </div>
    );
  }

  if (!activeCar) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            No Car Available Today
          </h1>
          <p className="text-gray-300 mb-8">
            Check back later or contact the admin to add today's car.
          </p>
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-400">
              Admin can add cars at: <code className="bg-gray-700 px-2 py-1 rounded">/admin</code>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md bg-car-dark rounded-xl shadow-lg p-6 text-white border border-gray-700">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2">CarMania: Car of the Day</h2>
        <p className="text-gray-400 mb-6">Mint your exclusive daily car NFT.</p>

        {/* Clean Car Info */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            CarMania Drop: {activeCar.carName}
          </h1>
          <p className="text-gray-300 text-sm">
            Minting for {new Date(activeCar.date).toLocaleDateString()}
          </p>
          {activeCar.description && (
            <p className="text-gray-400 text-sm mt-2">
              {activeCar.description}
            </p>
          )}
        </div>

        {/* NFT Mint Card - Clean Design */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <NFTMintCardDefault
            contractAddress={activeCar.contractAddress as `0x${string}`}
            onSuccess={handleMintSuccess}
          />
        </div>

        {/* Success Message */}
        {mintSuccess && (
          <div className="bg-green-800 border border-green-600 rounded-lg p-4 mb-6 text-center">
            <p className="text-green-200 font-semibold">
              🎉 Congratulations! You've minted {activeCar?.carName}!
            </p>
            <p className="text-green-300 text-sm mt-1">
              Check back tomorrow for the next CarMania drop!
            </p>
          </div>
        )}

        {/* Agent Kit Chat Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">🤖 CarCulture AI Expert</h3>
            <button
              onClick={() => setShowAgentChat(!showAgentChat)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              {showAgentChat ? 'Hide Chat' : 'Chat about this car'}
            </button>
          </div>
          
          {showAgentChat && (
            <div className="space-y-4">
              {/* Chat History */}
              <div className="bg-gray-700 rounded-lg p-4 h-48 overflow-y-auto">
                {chatHistory.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    Ask me anything about {activeCar.carName}! I'm the CarCulture AI, your resident car expert.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {chatHistory.map((msg, index) => (
                      <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs p-3 rounded-lg ${
                          msg.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-600 text-white'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Chat Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="Ask about this car..."
                  className="flex-1 p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={sendChatMessage}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-gray-400">
          <p className="text-xs">
            CarMania NFT Contract: <code className="bg-gray-700 px-1 rounded">{activeCar.contractAddress}</code>
          </p>
        </div>
      </div>
    </div>
  );
} 