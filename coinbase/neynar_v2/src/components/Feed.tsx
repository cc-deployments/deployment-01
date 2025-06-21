import React from 'react';
import { useFeed } from '../hooks/useFeed';
import Cast from './Cast';

const Feed: React.FC = () => {
  const { casts, loading, error } = useFeed();

  if (loading) return <div>Loading feed...</div>;
  if (error) return <div>Error loading feed: {error}</div>;

  return (
    <div className="space-y-4">
      {casts.map((cast: any) => (
        <Cast key={cast.hash} cast={cast} />
      ))}
    </div>
  );
};

export default Feed; 