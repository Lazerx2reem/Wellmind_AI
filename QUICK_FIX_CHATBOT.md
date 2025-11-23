# Quick Fix: Chatbot Not Working

## ✅ What I Just Fixed

1. **Made wellness data optional** - Chatbot now works with just the prompt, wellness logs are optional
2. **Improved system prompt** - Better, more comprehensive wellness coach prompt
3. **Better error handling** - Should show actual errors instead of "internal"

## 🚨 The "Internal" Error Issue

The "internal" error means your **Firebase Function is not deployed or not accessible**. The chatbot needs the Firebase Function to work.

## 🔧 Quick Solution (Choose One)

### Option 1: Deploy Firebase Function (Recommended for Production)

```bash
# 1. Make sure you have OpenAI API key in functions/.env
cd functions
cat .env  # Should show OPENAI_API_KEY=sk-...

# 2. Set the secret for production
firebase functions:secrets:set OPENAI_API_KEY
# (Enter your API key when prompted)

# 3. Deploy
firebase deploy --only functions

# Wait 2-3 minutes for deployment...
```

### Option 2: Run Locally with Emulator (Quick Testing)

**Terminal 1 - Start Firebase Emulator:**
```bash
cd functions
npm run serve
```

**Terminal 2 - Start React App:**
```bash
# In project root
npm run dev
```

**Terminal 3 - Set emulator environment (if needed):**
The app should automatically detect the emulator, but if not, create a `.env` file in the project root:
```
VITE_USE_FUNCTIONS_EMULATOR=true
```

## 📝 How It Works Now

The chatbot is **prompt-based** and doesn't require wellness logs:

1. **System Prompt**: The AI is configured with a comprehensive wellness coach prompt
2. **Optional Wellness Data**: If logs exist, they're included for context, but not required
3. **Works Without Logs**: The chatbot will work perfectly fine with just the prompt

## 🎯 Test It

After deploying or starting the emulator:

1. Open your React app (`npm run dev`)
2. Send a message in the chatbot
3. It should respond with wellness advice

## ❓ Still Not Working?

Check the browser console (F12) for detailed error messages. The improved error handling should show you exactly what's wrong.

Common issues:
- **"OpenAI API key not configured"** → Add key to `functions/.env`
- **"Function not found"** → Deploy with `firebase deploy --only functions`
- **CORS error** → Make sure function is deployed and CORS is enabled
- **Network error** → Check if emulator is running or function is deployed

