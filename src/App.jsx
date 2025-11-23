import LoggingButtons from './components/LoggingButtons';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🧠 WellMind AI</h1>
          <p className="tagline">Your AI-powered wellness companion</p>
        </div>
      </header>

      <main className="app-main">
        <div className="main-content-grid">
          <div className="content-section">
            <LoggingButtons />
          </div>
          <div className="content-section">
            <ChatInterface />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>WellMind AI - Sprint 2: AI Integration Complete 🚀</p>
      </footer>
    </div>
  );
}

export default App;
