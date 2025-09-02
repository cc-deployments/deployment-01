'use client';

import React, { useState, useEffect } from 'react';
// UI components removed - using basic HTML elements instead
import { Car, Brain, Search, Filter, ExternalLink } from 'lucide-react';
import { editionDataService, EditionDisplayData } from '../services/editionDataService';
import NFTMLAnalyzer from './NFTMLAnalyzer';

export default function EditionGallery() {
  const [editions, setEditions] = useState<EditionDisplayData[]>([]);
  const [filteredEditions, setFilteredEditions] = useState<EditionDisplayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChain, setSelectedChain] = useState<string>('all');
  const [selectedMake, setSelectedMake] = useState<string>('all');
  const [selectedEdition, setSelectedEdition] = useState<EditionDisplayData | null>(null);
  const [showMLAnalysis, setShowMLAnalysis] = useState(false);

  useEffect(() => {
    loadEditions();
  }, []);

  useEffect(() => {
    filterEditions();
  }, [editions, searchQuery, selectedChain, selectedMake]);

  const loadEditions = async () => {
    try {
      setLoading(true);
      const data = await editionDataService.getDisplayData();
      setEditions(data);
      setFilteredEditions(data);
    } catch (error) {
      console.error('Failed to load editions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEditions = () => {
    let filtered = editions;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(edition =>
        edition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        edition.carInfo.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        edition.carInfo.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Chain filter
    if (selectedChain !== 'all') {
      filtered = filtered.filter(edition => edition.chain === selectedChain);
    }

    // Make filter
    if (selectedMake !== 'all') {
      filtered = filtered.filter(edition => edition.carInfo.make === selectedMake);
    }

    setFilteredEditions(filtered);
  };

  const handleAnalyzeWithML = (edition: EditionDisplayData) => {
    setSelectedEdition(edition);
    setShowMLAnalysis(true);
  };

  const handleAnalysisComplete = (analysis: any) => {
    console.log('ML Analysis completed:', analysis);
    // You can integrate this with DRIVR chat here
  };

  const getUniqueChains = () => {
    const chains = [...new Set(editions.map(e => e.chain))];
    return chains.filter(chain => chain && chain !== 'Nil');
  };

  const getUniqueMakes = () => {
    const makes = [...new Set(editions.map(e => e.carInfo.make))];
    return makes.filter(make => make && make !== 'Nil');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Car className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-gray-600">Loading your car editions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🚗 CarMania Editions Gallery
        </h1>
        <p className="text-gray-600">
          Your curated collection of classic cars, ready for AI analysis
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select 
          value={selectedChain} 
          onChange={(e) => setSelectedChain(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Chains</option>
          {getUniqueChains().map(chain => (
            <option key={chain} value={chain}>{chain}</option>
          ))}
        </select>

        <select 
          value={selectedMake} 
          onChange={(e) => setSelectedMake(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Makes</option>
          {getUniqueMakes().map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearchQuery('');
            setSelectedChain('all');
            setSelectedMake('all');
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Clear Filters
        </button>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-gray-600">
          Showing {filteredEditions.length} of {editions.length} editions
        </p>
      </div>

      {/* Editions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEditions.map((edition) => (
          <div key={edition.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <div className="pb-3">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold line-clamp-2">{edition.title}</h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {edition.chain}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Car Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {edition.imageUrl ? (
                  <img
                    src={edition.imageUrl}
                    alt={edition.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-car.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Car className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Car Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">
                    {edition.carInfo.year} {edition.carInfo.make} {edition.carInfo.model}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {edition.description || 'Classic automotive excellence'}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {edition.carInfo.vehicle_type}
                  </Badge>
                  {edition.editionSize && (
                    <Badge variant="outline" className="text-xs">
                      Edition of {edition.editionSize}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAnalyzeWithML(edition)}
                  className="flex-1"
                  size="sm"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  AI Analysis
                </Button>
                
                {edition.mintUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(edition.mintUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredEditions.length === 0 && (
        <div className="text-center py-12">
          <Car className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find more editions.
          </p>
        </div>
      )}

      {/* ML Analysis Modal */}
      {showMLAnalysis && selectedEdition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  AI Analysis: {selectedEdition.title}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setShowMLAnalysis(false)}
                >
                  Close
                </Button>
              </div>
              
              <NFTMLAnalyzer
                nftImage={selectedEdition.imageUrl}
                tokenId={selectedEdition.id}
                collectionAddress={selectedEdition.contract}
                onAnalysisComplete={handleAnalysisComplete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



