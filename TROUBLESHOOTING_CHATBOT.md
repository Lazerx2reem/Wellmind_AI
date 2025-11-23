# Chatbot Troubleshooting Guide

If you're seeing the error: "I apologize, but I encountered an error processing your message", follow these steps:

## Step 1: Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab. You should see detailed error messages there now.

## Step 2: Verify OpenAI API Key

Make sure your OpenAI API key is set in `functions/.env`:

```bash
cd functions
cat .env
```

Should show:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

If not, add it:
```bash
echo "OPENAI_API_KEY=sk-your-actual-key-here" > .env
```

## Step 3: Choose Your Setup Method

You have two options:

### Option A: Run Locally with Emulator (Recommended for Development)

1. **Start the Firebase Emulator:**
   ```bash
   cd functions
   npm run serve
   ```

2. **In a new terminal, start your React app:**
   ```bash
   npm run dev
   ```

3. **Create a `.env` file in the project root** (if using emulator):
   ```
   VITE_USE_FUNCTIONS_EMULATOR=true
   VITE_FUNCTIONS_EMULATOR_PORT=5001
   ```

### Option B: Deploy to Firebase (For Production)

1. **Set the OpenAI secret in Firebase:**
   ```bash
   firebase functions:secrets:set OPENAI_API_KEY
   ```
   (Enter your API key when prompted)

2. **Deploy the function:**
   ```bash
   cd functions
   firebase deploy --only functions
   ```

3. **Wait for deployment to complete** - this may take a few minutes.

## Step 4: Test the Function

### If using Emulator:
The function URL should be: `http://localhost:5001/wellmindai-ab5f8/us-central1/chatWithAI`

### If deployed:
The function URL should be: `https://us-central1-wellmindai-ab5f8.cloudfunctions.net/chatWithAI`

You can test it with curl:
```bash
curl -X POST https://us-central1-wellmindai-ab5f8.cloudfunctions.net/chatWithAI \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user",
    "message": "Hello",
    "wellnessData": {}
  }'
```

## Common Errors and Solutions

### Error: "Firebase Functions not configured"
- **Solution**: Make sure `firebase.json` exists and Firebase CLI is installed
- Run: `firebase login` and `firebase init functions`

### Error: "OpenAI API key not configured"
- **Solution**: Set your API key in `functions/.env` for local, or use `firebase functions:secrets:set OPENAI_API_KEY` for production

### Error: "Function not found" or HTTP 404
- **Solution**: The function isn't deployed or emulator isn't running
- Deploy: `firebase deploy --only functions`
- Or start emulator: `cd functions && npm run serve`

### Error: "CORS error" or "Network error"
- **Solution**: Make sure CORS is enabled in the function (it should be) and the function URL is correct

### Error: "HTTP 500" or "Internal server error"
- **Solution**: Check Firebase Functions logs:
  ```bash
  firebase functions:log
  ```
- Or check emulator console output

## Quick Start (Local Development)

```bash
# Terminal 1: Start Firebase Emulator
cd functions
npm run serve

# Terminal 2: Start React App (with emulator env var)
cd ..
export VITE_USE_FUNCTIONS_EMULATOR=true
npm run dev
```

## Need More Help?

Check the browser console for detailed error messages. The improved error handling should show you exactly what's wrong!

