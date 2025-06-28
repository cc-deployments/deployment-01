import React from "react";

export default function ActionMenu({ onSelect }: { onSelect: (action: string) => void }) {
  return (
    <div style={{ margin: "2rem 0" }}>
      <ul className="space-y-2">
        <li>
          <button onClick={() => onSelect("post")} className="btn">Post a new cast</button>
        </li>
        <li>
          <button onClick={() => onSelect("like")} className="btn">Like a cast</button>
        </li>
        <li>
          <button onClick={() => onSelect("comment")} className="btn">Comment on a cast</button>
        </li>
        <li>
          <button onClick={() => onSelect("quote")} className="btn">Quote cast</button>
        </li>
        <li>
          <button onClick={() => onSelect("shareX")} className="btn">Share to X (Twitter)</button>
        </li>
      </ul>
    </div>
  );
} 