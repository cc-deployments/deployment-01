"use client";

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔍 Debug page mounted');
    
    // Test basic functionality
    try {
      // Test if we can access window
      console.log('✅ Window object accessible:', typeof window);
      
      // Test if we can access document
      console.log('✅ Document object accessible:', typeof document);
      
      // Test if we can access localStorage
      console.log('✅ LocalStorage accessible:', typeof localStorage);
      
      // Test if we can access fetch
      console.log('✅ Fetch accessible:', typeof fetch);
      
      setLoading(false);
    } catch (err) {
      console.error('❌ Error in debug page:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '18px'
      }}>
        Loading debug page...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        color: '#ff0000',
        fontSize: '18px',
        padding: '20px'
      }}>
        <h1>❌ Error Detected</h1>
        <p>{error}</p>
        <p>Check browser console for more details</p>
      </div>
    );
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      color: '#00ff00',
      fontSize: '18px',
      padding: '20px'
    }}>
      <h1>✅ Debug Page Working</h1>
      <p>Basic JavaScript functionality is working</p>
      <p>Check browser console for detailed logs</p>
      <button 
        onClick={() => window.location.href = '/gallery-hero'}
        style={{
          padding: '10px 20px',
          backgroundColor: '#fff',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Go to Gallery Hero
      </button>
    </div>
  );
} 