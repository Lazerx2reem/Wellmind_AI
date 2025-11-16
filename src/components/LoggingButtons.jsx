import { useState } from 'react';
import { logMood, logSleep, logHydration, logWorkout } from '../services/firestore';
import './LoggingButtons.css';

// Temporary user ID - will be replaced with Firebase Auth in later sprints
const TEMP_USER_ID = 'demo_user_1';

const LoggingButtons = () => {
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleMoodLog = async (mood) => {
    setLoading('mood');
    const result = await logMood(TEMP_USER_ID, mood);
    setLoading(null);
    if (result.success) {
      showMessage('success', `Mood "${mood}" logged successfully!`);
    } else {
      showMessage('error', 'Failed to log mood. Please try again.');
    }
  };

  const handleSleepLog = async (hours) => {
    setLoading('sleep');
    const result = await logSleep(TEMP_USER_ID, hours);
    setLoading(null);
    if (result.success) {
      showMessage('success', `${hours} hours of sleep logged!`);
    } else {
      showMessage('error', 'Failed to log sleep. Please try again.');
    }
  };

  const handleHydrationLog = async (amount) => {
    setLoading('hydration');
    const result = await logHydration(TEMP_USER_ID, amount);
    setLoading(null);
    if (result.success) {
      showMessage('success', `${amount}ml of water logged!`);
    } else {
      showMessage('error', 'Failed to log hydration. Please try again.');
    }
  };

  const handleWorkoutLog = async (type, duration) => {
    setLoading('workout');
    const result = await logWorkout(TEMP_USER_ID, type, duration);
    setLoading(null);
    if (result.success) {
      showMessage('success', `${duration}min ${type} workout logged!`);
    } else {
      showMessage('error', 'Failed to log workout. Please try again.');
    }
  };

  return (
    <div className="logging-container">
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="logging-section">
        <h2>Quick Log</h2>
        <p className="subtitle">One-click wellness tracking</p>

        {/* Mood Logging */}
        <div className="logging-card">
          <h3>😊 Mood</h3>
          <div className="button-group">
            {['😄 Happy', '😊 Good', '😐 Neutral', '😔 Sad', '😰 Anxious'].map((mood) => {
              const moodValue = mood.split(' ')[1].toLowerCase();
              return (
                <button
                  key={mood}
                  className={`log-button ${loading === 'mood' ? 'loading' : ''}`}
                  onClick={() => handleMoodLog(moodValue)}
                  disabled={loading === 'mood'}
                >
                  {mood}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sleep Logging */}
        <div className="logging-card">
          <h3>😴 Sleep</h3>
          <div className="button-group">
            {[6, 7, 8, 9, 10].map((hours) => (
              <button
                key={hours}
                className={`log-button ${loading === 'sleep' ? 'loading' : ''}`}
                onClick={() => handleSleepLog(hours)}
                disabled={loading === 'sleep'}
              >
                {hours}h
              </button>
            ))}
          </div>
        </div>

        {/* Hydration Logging */}
        <div className="logging-card">
          <h3>💧 Hydration</h3>
          <div className="button-group">
            {[250, 500, 750, 1000].map((amount) => (
              <button
                key={amount}
                className={`log-button ${loading === 'hydration' ? 'loading' : ''}`}
                onClick={() => handleHydrationLog(amount)}
                disabled={loading === 'hydration'}
              >
                {amount}ml
              </button>
            ))}
          </div>
        </div>

        {/* Workout Logging */}
        <div className="logging-card">
          <h3>💪 Workout</h3>
          <div className="button-group">
            <button
              className={`log-button ${loading === 'workout' ? 'loading' : ''}`}
              onClick={() => handleWorkoutLog('cardio', 30)}
              disabled={loading === 'workout'}
            >
              🏃 Cardio (30min)
            </button>
            <button
              className={`log-button ${loading === 'workout' ? 'loading' : ''}`}
              onClick={() => handleWorkoutLog('strength', 45)}
              disabled={loading === 'workout'}
            >
              🏋️ Strength (45min)
            </button>
            <button
              className={`log-button ${loading === 'workout' ? 'loading' : ''}`}
              onClick={() => handleWorkoutLog('yoga', 30)}
              disabled={loading === 'workout'}
            >
              🧘 Yoga (30min)
            </button>
            <button
              className={`log-button ${loading === 'workout' ? 'loading' : ''}`}
              onClick={() => handleWorkoutLog('walk', 20)}
              disabled={loading === 'workout'}
            >
              🚶 Walk (20min)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggingButtons;

