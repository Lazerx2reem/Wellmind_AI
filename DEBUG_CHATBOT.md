# 🔍 Debugging Chatbot Issues

## Common Issues & Solutions

### Issue 1: API Key Not Working

**Symptom:** Chatbot shows error message or doesn't respond

**Check:**
1. Open browser console (F12 → Console tab)
2. Look for error messages - they'll tell you exactly what's wrong
3. Check if you see: "API key exists: false"

**Solution:**
1. Make sure your `.env` file has the API key:
   ```env
   VITE_OPENAI_API_KEY=sk-your-actual-key-here
   ```
   ⚠️ **No quotes, no spaces around the = sign**

2. **RESTART your dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```
   ⚠️ **CRITICAL: Vite only loads .env on startup - you MUST restart!**

3. Verify the API key format:
   - Should start with `sk-`
   - Should be a long string (usually 50+ characters)
   - No spaces or quotes

### Issue 2: Dev Server Not Restarted

**Symptom:** API key is in .env but still shows error

**Solution:**
- Vite only reads `.env` when the dev server starts
- You MUST restart after changing `.env`
- Stop the server completely (Ctrl+C) and start again

### Issue 3: API Key Format Wrong

**Symptom:** "Invalid API key" error

**Check in browser console:**
- Look for: "API key starts with sk-: false"

**Solution:**
- Make sure your API key starts with `sk-`
- Copy it directly from OpenAI dashboard
- No extra spaces or characters

### Issue 4: CORS or Network Errors

**Symptom:** Network errors in console

**Check:**
- Open browser console (F12)
- Look for CORS errors or network failures

**Note:** OpenAI API should work from browser, but if you see CORS errors, it might be a browser security issue.

## 🧪 How to Debug

### Step 1: Check Browser Console

1. Open your app in browser
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Try sending a message in chatbot
5. Look for:
   - `Checking API key...`
   - `API key exists: true/false`
   - `API key starts with sk-: true/false`
   - Any error messages

### Step 2: Verify .env File

```bash
cat .env
```

Should show:
```
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
```

⚠️ Make sure:
- No quotes around the value
- No spaces: `VITE_OPENAI_API_KEY=sk-...` not `VITE_OPENAI_API_KEY = sk-...`
- Value is your actual API key

### Step 3: Restart Dev Server

```bash
# Stop current server
# Press Ctrl+C in terminal

# Start again
npm run dev
```

### Step 4: Test in Browser

1. Open the app
2. Open browser console (F12)
3. Send a message
4. Check console for debug logs
5. Check the error message in the chatbot

## 📝 Quick Checklist

- [ ] API key is in `.env` file as `VITE_OPENAI_API_KEY=sk-...`
- [ ] No quotes around the API key value
- [ ] No spaces around the = sign
- [ ] API key starts with `sk-`
- [ ] Dev server was restarted after adding API key
- [ ] Browser console shows debug messages
- [ ] Check error message in chatbot for details

## 🎯 Most Common Issue

**99% of the time:** The dev server wasn't restarted after adding/changing the API key in `.env`.

**Solution:** Stop server (Ctrl+C) and run `npm run dev` again.

