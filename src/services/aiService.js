// Service for communicating with Firebase Functions (AI Coach)
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase/config';

/**
 * Send a message to the AI coach via Firebase Function
 * @param {string} userId - User ID
 * @param {string} message - User's message
 * @param {object} wellnessData - User's recent wellness logs (mood, sleep, hydration, workout)
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export const sendMessageToAI = async (userId, message, wellnessData = {}) => {
  try {
    // Check if functions is available (might not be in dev mode)
    if (!functions) {
      // Fallback: Try using fetch to call the function directly
      return await sendMessageViaHTTP(userId, message, wellnessData);
    }

    const chatWithAI = httpsCallable(functions, 'chatWithAI');
    const result = await chatWithAI({
      userId,
      message,
      wellnessData
    });

    return {
      success: true,
      message: result.data.response || result.data.message
    };
  } catch (error) {
    console.error('Error calling AI function:', error);
    
    // If function doesn't exist yet, try HTTP fallback
    if (error.code === 'functions/not-found' || error.code === 'not-found') {
      return await sendMessageViaHTTP(userId, message, wellnessData);
    }

    return {
      success: false,
      error: error.message || 'Failed to communicate with AI coach'
    };
  }
};

/**
 * Fallback: Send message via HTTP request (for development or when functions aren't available)
 * This will work once the Firebase Function is deployed
 */
const sendMessageViaHTTP = async (userId, message, wellnessData) => {
  try {
    // Get the Firebase project ID from config
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    
    if (!projectId || projectId === 'your-project-id') {
      return {
        success: false,
        error: 'Firebase Functions not configured. Please set up Firebase Functions with GPT-4 API integration.'
      };
    }

    // Construct the function URL
    // In development, you might need to use the local emulator URL
    // In production, this will be: https://[region]-[project-id].cloudfunctions.net/chatWithAI
    const functionUrl = import.meta.env.VITE_FIREBASE_FUNCTION_URL || 
      `https://us-central1-${projectId}.cloudfunctions.net/chatWithAI`;

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        message,
        wellnessData
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      message: data.response || data.message
    };
  } catch (error) {
    console.error('Error sending message via HTTP:', error);
    return {
      success: false,
      error: error.message || 'Failed to communicate with AI coach'
    };
  }
};

