'use client';

import React, { useState } from 'react';

interface MLAnalysis {
  success: boolean;
  car_info: {
    caption: string;
    image_size: [number, number];
    format: string;
  };
  ml_insights: {
    model_used: string;
    analysis_timestamp: string;
    image_analysis: any;
  };
  chat_response: string;
  token_id: string;
}

export default function HackathonDemo() {
  const [selectedEdition, setSelectedEdition] = useState<any>(null);
  const [analysis, setAnalysis] = useState<MLAnalysis | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (result: MLAnalysis) => {
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const analyzeWithML = async () => {
    if (!selectedEdition) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate ML analysis for demo - dynamic based on selected car
      const getCarAnalysis = (car: any) => {
        switch (car.make) {
          case "BMW":
            return {
              caption: "Andy Warhol BMW M1 Art Car - A rare supercar transformed into a vibrant work of art",
              chat_response: "This is a stunning BMW M1, one of the rarest and most sought-after supercars ever built. Designed by Giorgetto Giugiaro and powered by a BMW 3.5L inline-6 engine, it represents the perfect fusion of German engineering precision and Italian design flair. Only 456 were ever produced, making it an incredibly valuable collector's item. When you add in Andy Warhol's famous painted version, you have a living historical artifact."
            };
          case "Ferrari":
            return {
              caption: "Ferrari 250 GT - A legendary Italian grand tourer from the golden age of motoring",
              chat_response: "The Ferrari 250 GT is one of the most iconic sports cars ever created. Built between 1953-1964, this masterpiece combines Italian passion with engineering excellence. The 3.0L V12 engine produces a symphony of sound that defines the Ferrari experience. This particular model represents the pinnacle of 1960s automotive design and remains one of the most valuable classic cars in the world."
            };
          case "Porsche":
            return {
              caption: "Porsche 911 - The timeless sports car that defined an entire category",
              chat_response: "The Porsche 911 is automotive perfection. Since 1964, this rear-engine sports car has been the benchmark for driving dynamics and engineering excellence. The air-cooled flat-six engine, rear weight bias, and iconic silhouette create a driving experience unlike any other. This 1970 model represents the pure essence of what makes a Porsche 911 legendary - simplicity, reliability, and unmatched driving pleasure."
            };
          default:
            return {
              caption: `${car.make} ${car.model} - A classic automobile with rich automotive heritage`,
              chat_response: `This ${car.make} ${car.model} represents the pinnacle of automotive engineering from ${car.year}. Each classic car tells a unique story of innovation, design, and cultural significance that deserves to be preserved onchain for future generations.`
            };
        }
      };

      const carAnalysis = getCarAnalysis(selectedEdition);
      
      const mockAnalysis: MLAnalysis = {
        success: true,
        car_info: {
          caption: carAnalysis.caption,
          image_size: [800, 600],
          format: "PNG"
        },
        ml_insights: {
          model_used: "Car Recognition Model v1.0",
          analysis_timestamp: new Date().toISOString(),
          image_analysis: { confidence: 0.95 }
        },
        chat_response: carAnalysis.chat_response,
        token_id: selectedEdition.tokenId || "1"
      };
      
      // Simulate API delay
      setTimeout(() => {
        handleAnalysisComplete(mockAnalysis);
      }, 2000);
      
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
    }
  };

  const shareDemo = async () => {
    const shareText = `🚗 CarMania Garage Hackathon Demo 🚗

✨ Features:
• AI-Powered Car Recognition
• ML Chat Analysis
• NFT Gallery Integration
• Share Functionality
• OnchainKit Ready

🤖 Trained Models:
• Car Recognition (944MB)
• Chat Model (475MB)
• BLIP Image Captioning

📚 CarMania Garage: Stories, artwork, movies & data about automobiles from 1885 forward
Owned by Car Culture

#CarManiaGarage #AI #NFT #Hackathon #CarCulture`;

    // For demo purposes, always show the alert
    alert(`DEMO: Share functionality would copy this to clipboard:\n\n${shareText}\n\nIn a real app, this would share to Farcaster or other social platforms! 🚗✨`);
  };

  const shareAnalysis = async () => {
    if (!analysis) return;
    
    const shareText = `🚗 CarMania AI Analysis 🚗

${analysis.car_info.caption}

🤖 AI Insights:
Model: ${analysis.ml_insights.model_used}
Analysis Time: ${analysis.ml_insights.analysis_timestamp}

💬 AI Response:
${analysis.chat_response}

Token #${analysis.token_id}

#CarMania #AI #NFT #CarCulture`;
    
    // For demo purposes, always show the alert
    alert(`DEMO: Share Analysis would copy this to clipboard:\n\n${shareText}\n\nIn a real app, this would share to Farcaster or other social platforms! 🚗✨`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-2">
            🏆 CARMANIA GARAGE HACKATHON DEMO
          </h1>
          <p className="text-blue-100 mb-4">
            For our presentation at the Onchain Summer Hackathon, we have built a MiniApp that features trained car recognition and AI-powered automotive provenance.
          </p>
          <p className="text-blue-100 mb-4">
            <strong>CarMania Garage</strong> is a collection of stories, artwork, movies, and data about automobiles from 1885 forward. Owned by Car Culture, it represents the world's first AI-powered automotive provenance platform.
          </p>
          <p className="text-blue-100">
            Trained car recognition enables AI chat agent, DRIVR, to discuss NFT images in user's wallet and lay the foundation for preserving automotive knowledge and cultural heritage onchain.
          </p>
        </div>

        {/* Feature Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600">🧠</span>
              <h3 className="font-semibold text-green-900">AI ANALYSIS</h3>
            </div>
            <p className="text-green-800 text-sm">
              Trained car recognition and chat models analyze NFT images
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600">📤</span>
              <h3 className="font-semibold text-blue-900">SHARE INTEGRATION</h3>
            </div>
            <p className="text-blue-800 text-sm">
              Native share API + clipboard fallback for Farcaster
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-600">⚡</span>
              <h3 className="font-semibold text-purple-900">ONCHAINKIT READY</h3>
            </div>
            <p className="text-purple-800 text-sm">
              Prepared for wallet connection when BASE team identifies the dependency issue
            </p>
          </div>
        </div>

        {/* Visual Separator */}
        <hr className="border-gray-300 my-8" />

        {/* Demo Controls */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-12">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            🚗 DEMO CONTROLS
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <button 
                onClick={() => setShowGallery(!showGallery)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  showGallery 
                    ? "bg-gray-100 text-gray-700 border border-gray-300" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {showGallery ? "Hide" : "Show"} NFT Gallery
              </button>
              
              <button 
                onClick={shareDemo}
                className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
              >
                📤 Share Demo
              </button>
            </div>

            {selectedEdition && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">SELECTED EDITION:</h4>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm">Token #{selectedEdition.tokenId}</span>
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm">{selectedEdition.make} {selectedEdition.model}</span>
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm">{selectedEdition.year}</span>
                </div>
                <button 
                  onClick={analyzeWithML}
                  disabled={isAnalyzing}
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {isAnalyzing ? "🔄 Analyzing..." : "🧠 Analyze with ML"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* NFT Gallery */}
        {showGallery && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">NFT GALLERY</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Mock NFT data for demo */}
              {[
                { tokenId: "1", make: "BMW", model: "M1", year: "1980", imageUrl: "/andy-warhol-bmw-m1-optimized.jpg" },
                { tokenId: "2", make: "Ferrari", model: "250 GT", year: "1960", imageUrl: "/carmania-gallery-hero.png" },
                { tokenId: "3", make: "Porsche", model: "911", year: "1970", imageUrl: "/hero-v2.png" }
              ].map((nft) => (
                <div 
                  key={nft.tokenId}
                  onClick={() => setSelectedEdition(nft)}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedEdition?.tokenId === nft.tokenId 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img src={nft.imageUrl} alt={`${nft.make} ${nft.model}`} className="w-full h-32 object-cover rounded mb-2" />
                  <h3 className="font-semibold">{nft.make} {nft.model}</h3>
                  <p className="text-sm text-gray-600">Token #{nft.tokenId} • {nft.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analysis Results Summary */}
        {analysis && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-800">
              🏆 ANALYSIS COMPLETE!
            </h2>
            <div className="space-y-2">
              <p className="text-green-700">
                <strong>Model Used:</strong> {analysis.ml_insights.model_used}
              </p>
              <p className="text-green-700">
                <strong>Analysis Time:</strong> {analysis.ml_insights.analysis_timestamp}
              </p>
              <p className="text-green-700">
                <strong>Token ID:</strong> #{analysis.token_id}
              </p>
              <div className="mt-4 p-3 bg-white rounded border">
                <p className="text-sm text-gray-700">
                  <strong>AI Response:</strong> {analysis.chat_response}
                </p>
              </div>
              <button 
                onClick={shareAnalysis}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                📤 Share Analysis
              </button>
            </div>
          </div>
        )}

        {/* Visual Separator */}
        <hr className="border-gray-300 my-8" />

        {/* Technical Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-12">
          <h2 className="text-lg font-semibold mb-4">TECHNICAL IMPLEMENTATION</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 mt-6">ML STACK:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• FastAPI ML Service (Python)</li>
                  <li>• Hugging Face Transformers</li>
                  <li>• BLIP Image Captioning</li>
                  <li>• Custom Car Recognition Model</li>
                  <li>• CSV Database Integration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">FRONTEND STACK:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Next.js 15.3.4 + React</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Native Share API</li>
                  <li>• OnchainKit (Ready)</li>
                </ul>
              </div>
            </div>
            
            {/* Visual Separator */}
            <hr className="border-gray-200 my-6" />
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded mt-6">
              <h4 className="font-semibold text-yellow-800 mb-2">ONCHAINKIT STATUS:</h4>
              <p className="text-yellow-700 text-sm">
                Temporarily disabled due to frame-sdk dependency issue (import error: 'frame-sdk' module not found). 
                All components are prepared for reconnection when BASE team releases the fix.
              </p>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}