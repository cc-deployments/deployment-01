'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Share2, Brain, Zap, Trophy } from 'lucide-react';
import NFTMLAnalyzer from '@/components/NFTMLAnalyzer';
import EditionGallery from '@/components/EditionGallery';

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

  const handleAnalysisComplete = (result: MLAnalysis) => {
    setAnalysis(result);
  };

  const shareDemo = async () => {
    const shareText = `🚗 CarMania Hackathon Demo 🚗

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

#CarMania #AI #NFT #Hackathon #CarCulture`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CarMania Hackathon Demo - AI + NFT Integration',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Demo info copied to clipboard! Share it in your Farcaster cast! 🚗✨');
      } catch (err) {
        console.error('Clipboard copy failed:', err);
        alert('Share failed. Please copy manually.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Trophy className="h-8 w-8" />
              CarMania Hackathon Demo
            </CardTitle>
            <p className="text-blue-100">
              AI-Powered NFT Analysis + Share Integration
            </p>
          </CardHeader>
        </Card>

        {/* Feature Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-900">AI Analysis</h3>
              </div>
              <p className="text-green-800 text-sm">
                Trained car recognition and chat models analyze NFT images
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Share2 className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Share Integration</h3>
              </div>
              <p className="text-blue-800 text-sm">
                Native share API + clipboard fallback for Farcaster
              </p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-purple-900">OnchainKit Ready</h3>
              </div>
              <p className="text-purple-800 text-sm">
                Prepared for wallet connection when dependency fixed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Demo Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Demo Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Button 
                onClick={() => setShowGallery(!showGallery)}
                variant={showGallery ? "outline" : "default"}
              >
                {showGallery ? "Hide" : "Show"} NFT Gallery
              </Button>
              
              <Button 
                onClick={shareDemo}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Demo
              </Button>
            </div>

            {selectedEdition && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Selected Edition:</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">Token #{selectedEdition.tokenId}</Badge>
                  <Badge variant="secondary">{selectedEdition.make} {selectedEdition.model}</Badge>
                  <Badge variant="secondary">{selectedEdition.year}</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* NFT Gallery */}
        {showGallery && (
          <Card>
            <CardHeader>
              <CardTitle>NFT Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <EditionGallery 
                onEditionSelect={setSelectedEdition}
                showMLAnalysis={true}
              />
            </CardContent>
          </Card>
        )}

        {/* ML Analysis */}
        {selectedEdition && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Analysis for Selected NFT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NFTMLAnalyzer
                nftImage={selectedEdition.imageUrl || 'https://via.placeholder.com/400x300'}
                tokenId={selectedEdition.tokenId}
                collectionAddress={selectedEdition.collectionAddress}
                onAnalysisComplete={handleAnalysisComplete}
              />
            </CardContent>
          </Card>
        )}

        {/* Analysis Results Summary */}
        {analysis && (
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Trophy className="h-5 w-5" />
                Analysis Complete!
              </CardTitle>
            </CardHeader>
            <CardContent>
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
              </div>
            </CardContent>
          </Card>
        )}

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">ML Stack:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• FastAPI ML Service (Python)</li>
                  <li>• Hugging Face Transformers</li>
                  <li>• BLIP Image Captioning</li>
                  <li>• Custom Car Recognition Model</li>
                  <li>• CSV Database Integration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Frontend Stack:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Next.js + React</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Native Share API</li>
                  <li>• OnchainKit (Ready)</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h4 className="font-semibold text-yellow-800 mb-2">OnchainKit Status:</h4>
              <p className="text-yellow-700 text-sm">
                Temporarily disabled due to frame-sdk dependency issue. 
                All components are prepared for reconnection when BASE team releases the fix.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
