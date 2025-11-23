# 🚀 Get Your Chatbot Working - Quick Guide

Your chatbot isn't working because the Firebase Function isn't deployed or running. Here's the **easiest way** to get it working right now:

## Option 1: Run Locally (FASTEST - 2 minutes)

### Step 1: Make sure OpenAI API key is set

```bash
cd functions
# Check if .env exists and has your API key
cat .env
```

If it doesn't exist or doesn't have your key:
```bash
cd functions
echo "OPENAI_API_KEY=sk-your-actual-openai-key-here" > .env
```
*(Replace with your actual OpenAI API key from https://platform.openai.com/api-keys)*

### Step 2: Install dependencies (if needed)

```bash
cd functions
npm install
```

### Step 3: Start the Firebase Emulator

Open **Terminal 1** and run:
```bash
cd functions
npm run serve
```

Wait until you see: `✔  functions[us-central1-chatWithAI]: http function initialized`

### Step 4: Start your React app

Open **Terminal 2** and run:
```bash
npm run dev
```

### Step 5: Test it!

1. Open your browser to `http://localhost:5173`
2. Try sending a message in the chatbot
3. It should work! 🎉

---

## Option 2: Deploy to Firebase (For Production)

### Step 1: Set OpenAI secret

```bash
firebase functions:secrets:set OPENAI_API_KEY
# Enter your OpenAI API key when prompted
```

### Step 2: Deploy

```bash
firebase deploy --only functions
```

Wait 2-3 minutes for deployment to complete.

### Step 3: Test it!

The chatbot should now work in your deployed app.

---

## ⚠️ Troubleshooting

**If you see "OpenAI API key not configured":**
- Make sure your `.env` file in `functions/` has: `OPENAI_API_KEY=sk-...`

**If you see "Function not found":**
- Make sure the emulator is running (Terminal 1)
- Check the browser console for the exact error

**If emulator doesn't start:**
- Make sure you're in the `functions` directory
- Run `npm install` first
- Check that `firebase.json` exists in the project root

---

## 🎯 Quick Commands Summary

**To run locally (recommended for testing):**
```bash
# Terminal 1
cd functions && npm run serve

# Terminal 2  
npm run dev
```

**To deploy (production):**
```bash
firebase functions:secrets:set OPENAI_API_KEY
firebase deploy --only functions
```

That's it! Your chatbot should work now. 🚀

