/**
 * Firebase Functions for WellMind AI
 * Handles AI Coach integration with GPT-4 API
 */

const { onRequest } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const OpenAI = require('openai');

// Initialize Firebase Admin
initializeApp();
const db = getFirestore();

// Initialize OpenAI
// API key should be set as an environment variable or secret:
// For Firebase Functions v2, use: firebase functions:secrets:set OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Format wellness data for AI context
 */
function formatWellnessData(wellnessData) {
  let context = '';

  if (wellnessData.mood && wellnessData.mood.length > 0) {
    const recentMoods = wellnessData.mood.slice(0, 7).map(log => 
      `${log.mood} (${new Date(log.timestamp?.toDate() || log.timestamp).toLocaleDateString()})`
    );
    context += `Recent mood logs: ${recentMoods.join(', ')}.\n`;
  }

  if (wellnessData.sleep && wellnessData.sleep.length > 0) {
    const avgSleep = wellnessData.sleep.slice(0, 7).reduce((sum, log) => sum + (log.hours || 0), 0) / wellnessData.sleep.length;
    context += `Average sleep over last 7 days: ${avgSleep.toFixed(1)} hours.\n`;
  }

  if (wellnessData.hydration && wellnessData.hydration.length > 0) {
    const totalHydration = wellnessData.hydration.slice(0, 7).reduce((sum, log) => sum + (log.amount || 0), 0);
    context += `Total hydration over last 7 days: ${totalHydration}ml.\n`;
  }

  if (wellnessData.workout && wellnessData.workout.length > 0) {
    const workouts = wellnessData.workout.slice(0, 7).map(log => 
      `${log.type} (${log.duration}min)`
    );
    context += `Recent workouts: ${workouts.join(', ')}.\n`;
  }

  return context || 'No recent wellness data available.';
}

/**
 * System prompt for the AI coach
 */
const SYSTEM_PROMPT = `You are WellMind AI, a compassionate and knowledgeable wellness coach. Your role is to help users understand their wellness patterns and provide personalized, actionable advice.

Guidelines:
- Be empathetic, supportive, and encouraging
- Provide specific, actionable recommendations based on the user's data
- Focus on evidence-based wellness practices
- Keep responses concise (2-3 sentences when possible, longer when needed for complex topics)
- If wellness data is provided, reference it naturally in your responses
- Encourage positive behavior changes without being preachy
- If asked about something outside wellness, politely redirect to wellness topics

Always prioritize the user's mental and physical wellbeing.`;

/**
 * Chat with AI Coach - Cloud Function
 * Handles user messages and returns AI-generated wellness advice
 */
exports.chatWithAI = onRequest(
  {
    cors: true,
    memory: '512MiB',
    timeoutSeconds: 60,
  },
  async (req, res) => {
    // Handle CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { userId, message, wellnessData } = req.body;

      // Validate input
      if (!userId || !message || typeof message !== 'string' || !message.trim()) {
        res.status(400).json({ error: 'Invalid request. userId and message are required.' });
        return;
      }

      // Check if OpenAI API key is configured
      if (!process.env.OPENAI_API_KEY) {
        console.error('OpenAI API key not configured');
        res.status(500).json({ 
          error: 'AI service not configured. Please set OPENAI_API_KEY as a Firebase Functions secret.' 
        });
        return;
      }

      // Format wellness context
      const wellnessContext = wellnessData ? formatWellnessData(wellnessData) : 'No wellness data available.';

      // Prepare messages for GPT-4
      const messages = [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'system',
          content: `User's recent wellness data:\n${wellnessContext}\nUse this context to provide personalized advice when relevant.`,
        },
        {
          role: 'user',
          content: message.trim(),
        },
      ];

      // Call GPT-4 API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      const aiResponse = completion.choices[0]?.message?.content || 
        'I apologize, but I could not generate a response. Please try again.';

      // Log the conversation (optional - for analytics)
      try {
        await db.collection('chat_logs').add({
          userId,
          userMessage: message.trim(),
          aiResponse,
          timestamp: new Date(),
          wellnessDataProvided: !!wellnessData,
        });
      } catch (logError) {
        console.error('Error logging conversation:', logError);
        // Don't fail the request if logging fails
      }

      // Return response
      res.status(200).json({
        success: true,
        response: aiResponse,
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      console.error('Error in chatWithAI function:', error);
      
      // Handle OpenAI API errors
      if (error.response) {
        res.status(500).json({
          error: 'AI service error',
          message: error.response.data?.error?.message || 'Failed to generate response',
        });
      } else {
        res.status(500).json({
          error: 'Internal server error',
          message: error.message || 'An unexpected error occurred',
        });
      }
    }
  }
);

