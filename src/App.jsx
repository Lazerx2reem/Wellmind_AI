import { useState, useEffect } from 'react';
import LoggingButtons from './components/LoggingButtons';
import './App.css';

function App() {
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(false);

  useEffect(() => {
    // Check if Firebase is configured
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    if (apiKey && apiKey !== 'your-api-key') {
      setIsFirebaseConfigured(true);
    }
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🧠 WellMind AI</h1>
          <p className="tagline">Your AI-powered wellness companion</p>
        </div>
      </header>

      <main className="app-main">
        {!isFirebaseConfigured && (
          <div className="warning-banner">
            <p>
              ⚠️ <strong>Firebase not configured:</strong> Please set up your Firebase credentials in{' '}
              <code>src/firebase/config.js</code> or use environment variables. 
              See README.md for setup instructions.
            </p>
          </div>
        )}

        <LoggingButtons />
      </main>

      <footer className="app-footer">
        <p>WellMind AI - Sprint 1: Foundation & Logging</p>
      </footer>
    </div>
  );
}

export default App;
