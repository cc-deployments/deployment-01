// Cloudflare Workers Types
export interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
}

export interface D1PreparedStatement {
  bind: (...values: any[]) => D1PreparedStatement;
  first: <T = any>() => Promise<T | null>;
  all: <T = any>() => Promise<{ results: T[] }>;
  run: () => Promise<{ meta: { last_row_id: number } }>;
}

export interface KVNamespace {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
  delete: (key: string) => Promise<void>;
}

export interface R2Bucket {
  put: (key: string, value: any) => Promise<void>;
  get: (key: string) => Promise<R2Object | null>;
  delete: (key: string) => Promise<void>;
}

export interface R2Object {
  key: string;
  size: number;
  etag: string;
  uploaded: Date;
  httpEtag: string;
  httpMetadata?: {
    contentType?: string;
    contentLanguage?: string;
    contentDisposition?: string;
    contentEncoding?: string;
    cacheControl?: string;
    cacheExpiry?: Date;
  };
  customMetadata?: Record<string, string>;
} 