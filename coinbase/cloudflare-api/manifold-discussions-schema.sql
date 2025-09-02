-- MANIFOLD Gallery Discussion Database Schema
-- This schema supports the MANIFOLD Gallery Discussion integration
-- as a replacement for some Cloudflare API functionality

-- Create manifold_discussions table
CREATE TABLE IF NOT EXISTS manifold_discussions (
    id TEXT PRIMARY KEY,
    collection_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create manifold_discussion_replies table
CREATE TABLE IF NOT EXISTS manifold_discussion_replies (
    id TEXT PRIMARY KEY,
    discussion_id TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (discussion_id) REFERENCES manifold_discussions(id) ON DELETE CASCADE
);

-- Create manifold_discussion_likes table
CREATE TABLE IF NOT EXISTS manifold_discussion_likes (
    id TEXT PRIMARY KEY,
    discussion_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (discussion_id) REFERENCES manifold_discussions(id) ON DELETE CASCADE,
    UNIQUE(discussion_id, user_id)
);

-- Create manifold_discussion_analytics table
CREATE TABLE IF NOT EXISTS manifold_discussion_analytics (
    id TEXT PRIMARY KEY,
    collection_id TEXT NOT NULL,
    date TEXT NOT NULL,
    total_discussions INTEGER DEFAULT 0,
    total_likes INTEGER DEFAULT 0,
    total_replies INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    engagement_rate REAL DEFAULT 0.0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(collection_id, date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_manifold_discussions_collection_id ON manifold_discussions(collection_id);
CREATE INDEX IF NOT EXISTS idx_manifold_discussions_timestamp ON manifold_discussions(timestamp);
CREATE INDEX IF NOT EXISTS idx_manifold_discussion_replies_discussion_id ON manifold_discussion_replies(discussion_id);
CREATE INDEX IF NOT EXISTS idx_manifold_discussion_likes_discussion_id ON manifold_discussion_likes(discussion_id);
CREATE INDEX IF NOT EXISTS idx_manifold_discussion_analytics_collection_date ON manifold_discussion_analytics(collection_id, date);

-- Insert sample data for testing
INSERT OR IGNORE INTO manifold_discussions (id, collection_id, title, content, author, timestamp, likes, replies) VALUES
('1', '@carculture', 'Welcome to CarMania Gallery Discussion!', 'Share your thoughts about the latest car drops and collections. This is a community space for CarMania enthusiasts!', 'CarCulture Team', '2024-01-15T10:00:00Z', 12, 3),
('2', '@carculture', 'Light Bulb Moment - Amazing drop!', 'Just minted the Light Bulb Moment NFT. The artwork is incredible and the concept is brilliant!', 'Car Enthusiast', '2024-01-15T11:30:00Z', 8, 1),
('3', '@carculture', 'Future CarMania Drops Discussion', 'What kind of cars would you like to see in future CarMania drops? Classic muscle cars? Modern supercars?', 'Community Member', '2024-01-15T14:20:00Z', 15, 5);

-- Insert sample replies
INSERT OR IGNORE INTO manifold_discussion_replies (id, discussion_id, content, author, timestamp, likes) VALUES
('r1', '1', 'Thanks for creating this space! Looking forward to engaging with the community.', 'NFT Collector', '2024-01-15T10:15:00Z', 2),
('r2', '1', 'Great to see CarMania expanding with community features!', 'Car Culture Fan', '2024-01-15T10:30:00Z', 1),
('r3', '2', 'I agree! The Light Bulb Moment is one of my favorite drops so far.', 'Art Lover', '2024-01-15T12:00:00Z', 3);

-- Insert sample analytics
INSERT OR IGNORE INTO manifold_discussion_analytics (id, collection_id, date, total_discussions, total_likes, total_replies, active_users, engagement_rate) VALUES
('a1', '@carculture', '2024-01-15', 3, 35, 8, 12, 0.23);
