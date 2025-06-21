import React from 'react';

interface CastProps {
  cast: any;
}

const Cast: React.FC<CastProps> = ({ cast }) => {
  // Placeholder handlers
  const handleLike = () => {};
  const handleRecast = () => {};
  const handleQuoteCast = () => {};
  const handleShare = () => {};
  const handleShareToX = () => {};

  return (
    <div className="border p-4 rounded shadow">
      <div className="mb-2 font-bold">{cast.author?.username || 'Unknown'}</div>
      <div className="mb-2">{cast.text}</div>
      <div className="flex space-x-2 mt-2">
        <button onClick={handleLike} className="px-2 py-1 bg-gray-200 rounded">Like</button>
        <button onClick={handleRecast} className="px-2 py-1 bg-gray-200 rounded">Recast</button>
        <button onClick={handleQuoteCast} className="px-2 py-1 bg-gray-200 rounded">Quote Cast</button>
        <button onClick={handleShare} className="px-2 py-1 bg-gray-200 rounded">Share</button>
        <button onClick={handleShareToX} className="px-2 py-1 bg-blue-200 rounded">Share to X</button>
      </div>
    </div>
  );
};

export default Cast; 