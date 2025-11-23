# ✅ Secure Backend Setup - Complete Guide

Your chatbot now uses a **secure backend architecture** where the API key is safely stored on the server, not exposed in the frontend!

## 🎯 Architecture

```
User → React Frontend → Backend Server (Port 3001) → OpenAI API
                             ↑
                    API Key stored here (SECURE)
```

## 🚀 Quick Start

### Step 1: Set Up Backend API Key

1. Go to the `server` directory:
   ```bash
   cd server
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
   ⚠️ **IMPORTANT: Replace with your actual API key!**

### Step 2: Install Backend Dependencies (Already Done ✅)

The dependencies are already installed. If you need to reinstall:
```bash
cd server
npm install
```

### Step 3: Start the Backend Server

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

You should see:
```
🚀 WellMind AI backend server running on http://localhost:3001
✅ Health check: http://localhost:3001/health
💬 Chat endpoint: http://localhost:3001/api/chat
```

### Step 4: Start the Frontend

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

### Step 5: Test It!

1. Open your browser to the frontend (usually `http://localhost:5173`)
2. Try sending a message in the chatbot
3. It should work! 🎉

## 🔒 Security Benefits

✅ **API key is safe** - Stored only on the backend server  
✅ **Not exposed** - Never sent to the browser  
✅ **Secure** - Can't be stolen by inspecting frontend code  
✅ **Production ready** - Proper architecture for deployment  

## 🧪 Testing

### Test Backend Health:
```bash
curl http://localhost:3001/health
```

Should return:
```json
{"status":"ok","message":"WellMind AI backend server is running"}
```

### Test Chat Endpoint:
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

## 📁 File Structure

```
Wellmind_AI/
├── server/
│   ├── index.js          # Backend server (API key here)
│   ├── package.json      # Backend dependencies
│   ├── .env              # API key (NOT in git)
│   └── .env.example      # Template
├── src/
│   └── services/
│       └── aiService.js  # Frontend service (no API key!)
└── package.json          # Frontend dependencies
```

## ⚠️ Important Notes

1. **Never commit `server/.env`** - It contains your secret API key
2. **API key is only in `server/.env`** - Not in frontend `.env`
3. **Backend must be running** - Frontend won't work without it
4. **Port 3001** - Make sure nothing else is using this port

## 🐛 Troubleshooting

### Backend won't start:
- Check if port 3001 is already in use
- Make sure `server/.env` exists with `OPENAI_API_KEY`
- Run `cd server && npm install`

### Frontend can't connect:
- Make sure backend is running on port 3001
- Check browser console (F12) for errors
- Verify backend health: `curl http://localhost:3001/health`

### API key errors:
- Make sure `server/.env` has `OPENAI_API_KEY=sk-...`
- No quotes around the value
- Restart backend after changing `.env`

## 🎯 Next Steps

Your chatbot is now secure and ready! The API key stays on the backend where it belongs.

To deploy:
- Deploy backend to a hosting service (Railway, Render, Heroku, etc.)
- Update frontend to call your deployed backend URL
- Keep API key in backend environment variables (never commit it!)

