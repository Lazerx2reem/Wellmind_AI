import { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../services/aiService';
import { getRecentLogs } from '../services/firestore';
import './ChatInterface.css';

// Temporary user ID - will be replaced with Firebase Auth in later sprints
const TEMP_USER_ID = 'demo_user_1';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! Im your WellMind AI coach. I can help you understand your wellness patterns and provide personalized recommendations. How are you feeling today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      // Get recent wellness logs to provide context to AI
      const [moodLogs, sleepLogs, hydrationLogs, workoutLogs] = await Promise.all([
        getRecentLogs(TEMP_USER_ID, 'mood', 7),
        getRecentLogs(TEMP_USER_ID, 'sleep', 7),
        getRecentLogs(TEMP_USER_ID, 'hydration', 7),
        getRecentLogs(TEMP_USER_ID, 'workout', 7)
      ]);

      const wellnessData = {
        mood: moodLogs.success ? moodLogs.logs : [],
        sleep: sleepLogs.success ? sleepLogs.logs : [],
        hydration: hydrationLogs.success ? hydrationLogs.logs : [],
        workout: workoutLogs.success ? workoutLogs.logs : []
      };

      // Send message to AI via Firebase Function
      const response = await sendMessageToAI(TEMP_USER_ID, userMessage.content, wellnessData);

      if (response.success) {
        const aiMessage = {
          role: 'assistant',
          content: response.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const errorMessage = {
          role: 'assistant',
          content: 'I apologize, but I encountered an error processing your message. Please try again in a moment.',
          timestamp: new Date(),
          error: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your message. Please try again in a moment.',
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>💬 AI Wellness Coach</h2>
        <p className="chat-subtitle">Ask me anything about your wellness data</p>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message-wrapper ${message.role}`}>
            <div className={`message-bubble ${message.role} ${message.error ? 'error' : ''}`}>
              <p>{message.content}</p>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message-wrapper assistant">
            <div className="message-bubble assistant loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <textarea
          ref={inputRef}
          className="chat-input"
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          rows={1}
        />
        <button
          className="chat-send-button"
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || loading}
        >
          {loading ? (
            <div className="send-loading"></div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;

