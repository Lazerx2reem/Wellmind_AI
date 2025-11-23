# 🔧 Fix: Server Failed to Start

## Problem

The server was trying to initialize the OpenAI client immediately, which failed if the API key wasn't configured.

## ✅ Fixed

The server now:
- ✅ Starts even without an API key
- ✅ Only creates OpenAI client when needed (lazy initialization)
- ✅ Shows helpful warning messages
- ✅ Gives clear error messages when API key is missing

## 🚀 How to Start the Server

### Step 1: Add Your API Key

Edit `server/.env` and replace `your-api-key-here` with your actual API key:

```bash
cd server
# Edit .env file
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### Step 2: Start the Server

```bash
cd server
npm run dev
```

You should see:
```
🚀 WellMind AI backend server running on http://localhost:3001
✅ Health check: http://localhost:3001/health
💬 Chat endpoint: http://localhost:3001/api/chat
✅ OpenAI API key configured
```

If the API key isn't set, you'll see a warning but the server will still start.

### Step 3: Start Frontend

In a **new terminal**:
```bash
npm run dev
```

## 🧪 Test the Server

### Health Check:
```bash
curl http://localhost:3001/health
```

Should return:
```json
{"status":"ok","message":"WellMind AI backend server is running","apiKeyConfigured":true}
```

### Test Chat:
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

## ⚠️ Common Issues

### Port 3001 already in use:
```bash
# Find what's using the port
lsof -i :3001

# Kill the process or use a different port
PORT=3002 npm run dev
```

### API key not working:
- Make sure `server/.env` exists
- Check the API key starts with `sk-`
- No quotes around the value
- Restart server after changing `.env`

The server is now fixed and should start properly! 🎉

