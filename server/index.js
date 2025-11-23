import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Lazy initialization of OpenAI client (only created when needed)
let openaiClient = null;

// Helper function to get or create OpenAI client
const getOpenAIClient = () => {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'your-api-key-here' || apiKey.trim() === '') {
      throw new Error('OpenAI API key not configured. Please create server/.env file with OPENAI_API_KEY=sk-your-key-here');
    }

    openaiClient = new OpenAI({
      apiKey: apiKey.trim()
    });
  }
  return openaiClient;
};

// System prompt for the wellness coach
const SYSTEM_PROMPT = `You are WellMind AI, a compassionate and knowledgeable wellness coach dedicated to helping people improve their physical health, mental wellbeing, motivation, and overall wellness.

Your Core Expertise:
1. **Physical Health**: Exercise, nutrition, sleep, fitness, injury prevention, healthy habits
2. **Mental Health**: Stress management, anxiety, depression support, emotional wellbeing, mindfulness
3. **Motivation**: Goal setting, habit building, staying accountable, overcoming obstacles
4. **Wellness**: Holistic health, work-life balance, self-care, personal growth

Your Communication Style:
- Be warm, empathetic, and supportive - like a caring friend who truly understands
- Provide practical, actionable advice that users can implement immediately
- Use encouraging and positive language to motivate users
- Be evidence-based but accessible - explain concepts simply
- Ask thoughtful questions to better understand the user's needs
- Celebrate small wins and progress
- Be non-judgmental and understanding

Response Guidelines:
- Keep responses conversational and concise (2-4 sentences typically, longer when needed for complex topics)
- Focus on actionable steps users can take
- Provide encouragement and motivation
- If asked about medical issues, recommend consulting healthcare professionals
- If asked about serious mental health concerns, encourage professional support while providing immediate support
- Stay focused on wellness topics - gently redirect if asked about unrelated subjects

Your goal is to empower users to make positive changes in their wellness journey through understanding, motivation, and practical guidance.`;

// Health check endpoint
app.get("/health", (req, res) => {
  const hasApiKey = !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-api-key-here');
  res.json({ 
    status: "ok", 
    message: "WellMind AI backend server is running",
    apiKeyConfigured: hasApiKey
  });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    // Validate request
    if (!req.body.message || typeof req.body.message !== 'string' || !req.body.message.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    // Get OpenAI client (will check for API key)
    let openaiClient;
    try {
      openaiClient = getOpenAIClient();
    } catch (error) {
      console.error('OpenAI API key not configured:', error.message);
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'OpenAI API key not configured. Please create server/.env file with OPENAI_API_KEY=sk-your-key-here' 
      });
    }

    // Prepare messages for GPT-4
    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: req.body.message.trim(),
      },
    ];

    // Call OpenAI API
    const result = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini", // Using gpt-4o-mini for cost efficiency
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = result.choices[0]?.message?.content || 
      'I apologize, but I could not generate a response. Please try again.';

    res.json({ 
      success: true, 
      message: aiResponse 
    });

  } catch (err) {
    console.error('Error in /api/chat:', err);
    
    // Handle OpenAI API errors
    if (err.response?.status === 401) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid OpenAI API key. Please check your OPENAI_API_KEY in server/.env file.' 
      });
    }

    res.status(500).json({ 
      success: false, 
      error: err.message || 'An error occurred while processing your request.' 
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 WellMind AI backend server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
  
  // Check if API key is configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-api-key-here') {
    console.warn('');
    console.warn('⚠️  WARNING: OpenAI API key not configured!');
    console.warn('   Create server/.env file with: OPENAI_API_KEY=sk-your-key-here');
    console.warn('   The server will start, but chat requests will fail.');
    console.warn('');
  } else {
    console.log(`✅ OpenAI API key configured`);
  }
});
