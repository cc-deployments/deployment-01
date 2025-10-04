-- Cloudflare D1 Database Schema for Signups
-- File: carculture-landing/database/schema.sql

-- Signups table for email collection
CREATE TABLE IF NOT EXISTS signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT NOT NULL DEFAULT 'landing_page',
  interests TEXT, -- JSON array of interests
  wallet_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'active', -- active, unsubscribed, bounced
  last_contacted DATETIME,
  notes TEXT
);

-- User engagement tracking
CREATE TABLE IF NOT EXISTS user_engagement (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  action TEXT NOT NULL, -- 'page_view', 'nft_view', 'wallet_connect', 'purchase'
  details TEXT, -- JSON with action-specific data
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (email) REFERENCES signups(email)
);

-- Cross-domain authentication tracking
CREATE TABLE IF NOT EXISTS cross_domain_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT UNIQUE NOT NULL,
  email TEXT,
  wallet_address TEXT,
  domains TEXT, -- JSON array of domains accessed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
CREATE INDEX IF NOT EXISTS idx_signups_source ON signups(source);
CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at);
CREATE INDEX IF NOT EXISTS idx_engagement_email ON user_engagement(email);
CREATE INDEX IF NOT EXISTS idx_engagement_action ON user_engagement(action);
CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON cross_domain_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_wallet ON cross_domain_sessions(wallet_address);

