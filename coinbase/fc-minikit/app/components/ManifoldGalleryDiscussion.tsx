"use client";

import { useEffect, useState } from 'react';

interface ManifoldDiscussionPost {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  replies: number;
}

interface ManifoldGalleryDiscussionProps {
  collectionId?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export default function ManifoldGalleryDiscussion({ 
  collectionId = '@carculture',
  autoRefresh = true,
  refreshInterval = 30000 // 30 seconds
}: ManifoldGalleryDiscussionProps) {
  const [discussions, setDiscussions] = useState<ManifoldDiscussionPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  // Load sample discussions (Manifold doesn't have a public API)
  const fetchDiscussions = async () => {
    setLoading(true);
    setError(null);
    
    // Since Manifold doesn't have a public API, we'll use sample data
    const sampleDiscussions = [
      {
        id: '1',
        title: 'Welcome to CarMania Gallery Discussion!',
        content: 'Share your thoughts about the latest car drops and collections.',
        author: 'CarCulture Team',
        timestamp: new Date().toISOString(),
        likes: 12,
        replies: 3
      },
      {
        id: '2',
        title: 'Light Bulb Moment - Amazing drop!',
        content: 'Just minted the Light Bulb Moment NFT. The artwork is incredible!',
        author: 'Car Enthusiast',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        likes: 8,
        replies: 1
      },
      {
        id: '3',
        title: 'Summertime Blues Collection',
        content: 'The vintage car aesthetic in this collection is perfect for summer vibes!',
        author: 'Vintage Car Lover',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        likes: 15,
        replies: 5
      }
    ];
    
    setDiscussions(sampleDiscussions);
    setLoading(false);
  };

  // Simulate posting a new discussion (no API available)
  const postDiscussion = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    // Since Manifold doesn't have a public API, simulate posting locally
    const newDiscussion = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: 'You',
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: 0
    };

    // Add to local discussions
    setDiscussions(prev => [newDiscussion, ...prev]);
    setNewPost({ title: '', content: '' });
    
    alert('Discussion posted! (Note: This is simulated since Manifold doesn\'t have a public API)');
  };

  // Auto-refresh discussions
  useEffect(() => {
    fetchDiscussions();
    
    if (autoRefresh) {
      const interval = setInterval(fetchDiscussions, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [collectionId, autoRefresh, refreshInterval]);

  if (loading && discussions.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-600">Loading discussions...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            🚗 CarMania Gallery Discussion
          </h2>
          <p className="text-gray-600 mt-2">
            Share your thoughts about CarMania collections and connect with the community
          </p>
        </div>

        {/* New Post Form */}
        <div className="border-b border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Start a Discussion</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Discussion title..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Share your thoughts..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={postDiscussion}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Post Discussion
            </button>
          </div>
        </div>

        {/* Discussions List */}
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
            <p className="text-blue-800">
              ℹ️ This is a simulated discussion board since Manifold doesn't have a public API. Posts are stored locally.
            </p>
          </div>
          
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {discussion.title}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {new Date(discussion.timestamp).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">{discussion.content}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>by {discussion.author}</span>
                  <div className="flex space-x-4">
                    <span>👍 {discussion.likes}</span>
                    <span>💬 {discussion.replies}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
