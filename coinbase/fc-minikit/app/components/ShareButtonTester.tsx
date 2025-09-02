"use client";

import { useEffect, useState } from 'react';

export default function ShareButtonTester() {
  const [testResults, setTestResults] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show debug panel when localStorage has debug flag
    const debugMode = localStorage.getItem('carmania-debug') === 'true';
    setIsVisible(debugMode);
    
    // Add keyboard shortcut to toggle debug mode (Ctrl+D or Cmd+D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        const newDebugMode = !debugMode;
        localStorage.setItem('carmania-debug', newDebugMode.toString());
        setIsVisible(newDebugMode);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const runShareTest = async () => {
    const results = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      capabilities: {
        webShare: !!navigator.share,
        clipboard: !!navigator.clipboard?.writeText,
        execCommand: !!document.execCommand
      },
      windowFunctions: {
        shareCarMania: !!(window as any).shareCarMania,
        enhancedShare: !!(window as any).enhancedShare
      },
      tests: []
    };

    // Test 1: Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Test Share',
          text: 'Testing share functionality',
          url: window.location.href
        });
        results.tests.push({ name: 'Web Share API', status: 'success', method: 'web-share' });
      } catch (error) {
        results.tests.push({ name: 'Web Share API', status: 'error', error: error.message });
      }
    } else {
      results.tests.push({ name: 'Web Share API', status: 'not-supported' });
    }

    // Test 2: Clipboard API
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText('Test clipboard functionality');
        results.tests.push({ name: 'Clipboard API', status: 'success', method: 'clipboard' });
      } catch (error) {
        results.tests.push({ name: 'Clipboard API', status: 'error', error: error.message });
      }
    } else {
      results.tests.push({ name: 'Clipboard API', status: 'not-supported' });
    }

    // Test 3: execCommand
    try {
      const textArea = document.createElement('textarea');
      textArea.value = 'Test execCommand';
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      results.tests.push({ name: 'execCommand', status: success ? 'success' : 'failed', method: 'exec-command' });
    } catch (error) {
      results.tests.push({ name: 'execCommand', status: 'error', error: error.message });
    }

    // Test 4: Our custom functions
    if ((window as any).shareCarMania) {
      try {
        await (window as any).shareCarMania();
        results.tests.push({ name: 'shareCarMania', status: 'success' });
      } catch (error) {
        results.tests.push({ name: 'shareCarMania', status: 'error', error: error.message });
      }
    } else {
      results.tests.push({ name: 'shareCarMania', status: 'not-available' });
    }

    if ((window as any).enhancedShare) {
      try {
        await (window as any).enhancedShare({
          title: 'Test Enhanced Share',
          text: 'Testing enhanced share functionality',
          url: window.location.href
        });
        results.tests.push({ name: 'enhancedShare', status: 'success' });
      } catch (error) {
        results.tests.push({ name: 'enhancedShare', status: 'error', error: error.message });
      }
    } else {
      results.tests.push({ name: 'enhancedShare', status: 'not-available' });
    }

    setTestResults(results);
    console.log('🔍 Share Button Test Results:', results);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 10000,
      maxWidth: '300px'
    }}>
      <h4>🔍 Share Button Tester</h4>
      <button 
        onClick={runShareTest}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '3px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
      >
        Run Tests
      </button>
      
      {testResults && (
        <div>
          <h5>Results:</h5>
          <pre style={{ fontSize: '10px', overflow: 'auto', maxHeight: '200px' }}>
            {JSON.stringify(testResults, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
