'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Car, Brain, MessageSquare } from 'lucide-react';

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

interface NFTMLAnalyzerProps {
  nftImage: string;
  tokenId: string;
  collectionAddress: string;
  onAnalysisComplete?: (analysis: MLAnalysis) => void;
}

export default function NFTMLAnalyzer({ 
  nftImage, 
  tokenId, 
  collectionAddress,
  onAnalysisComplete 
}: NFTMLAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<MLAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeWithML = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Convert image to base64 if it's a URL
      let imageBase64 = nftImage;
      if (nftImage.startsWith('http')) {
        // For demo purposes, we'll use a placeholder
        // In production, you'd fetch and convert the image
        imageBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'; // Placeholder
      }

      const response = await fetch('http://localhost:8000/analyze-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_base64: imageBase64,
          token_id: tokenId,
          collection_address: collectionAddress,
          user_message: "Tell me about this car and its history"
        }),
      });

      if (!response.ok) {
        throw new Error(`ML Analysis failed: ${response.statusText}`);
      }

      const result: MLAnalysis = await response.json();
      setAnalysis(result);
      
      // Notify parent component
      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      console.error('ML Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          AI Car Analysis
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Analysis Button */}
        <div className="flex gap-2">
          <Button 
            onClick={analyzeWithML} 
            disabled={isAnalyzing}
            className="flex-1"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Car className="h-4 w-4 mr-2" />
                Analyze This Car
              </>
            )}
          </Button>
          
          {analysis && (
            <Button 
              variant="outline" 
              onClick={resetAnalysis}
              size="sm"
            >
              Reset
            </Button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-4">
            {/* Car Info */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Car className="h-4 w-4" />
                Car Analysis
              </h4>
              <p className="text-blue-800 text-sm">{analysis.car_info.caption}</p>
              <div className="mt-2 flex gap-2">
                <Badge variant="secondary">
                  {analysis.car_info.image_size[0]}x{analysis.car_info.image_size[1]}
                </Badge>
                <Badge variant="secondary">
                  {analysis.car_info.format}
                </Badge>
              </div>
            </div>

            {/* ML Insights */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Insights
              </h4>
              <p className="text-green-800 text-sm">
                <strong>Model:</strong> {analysis.ml_insights.model_used}
              </p>
              <p className="text-green-800 text-sm">
                <strong>Analysis Time:</strong> {analysis.ml_insights.analysis_timestamp}
              </p>
            </div>

            {/* Chat Response */}
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                AI Response
              </h4>
              <p className="text-purple-800 text-sm">{analysis.chat_response}</p>
            </div>

            {/* Token Info */}
            <div className="text-center">
              <Badge variant="outline">
                Token #{analysis.token_id}
              </Badge>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!analysis && !isAnalyzing && (
          <div className="text-center text-gray-500 text-sm">
            <p>Click "Analyze This Car" to get AI-powered insights about this NFT</p>
            <p className="mt-1">Uses your trained car recognition and chat models</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


