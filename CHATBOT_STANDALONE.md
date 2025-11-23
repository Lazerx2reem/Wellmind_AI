# 🎯 Standalone Chatbot Mode

The chatbot UI is now **completely separate** from the Firebase Function backend. You can run it in **mock mode** for testing without any backend!

## 🚀 Quick Start - Mock Mode (No Backend Needed!)

### Step 1: Enable Mock Mode

Create a `.env` file in your project root:

```bash
VITE_USE_MOCK_CHATBOT=true
```

### Step 2: Start Your App

```bash
npm run dev
```

**That's it!** The chatbot will work with mock responses - no Firebase Functions needed!

## 📋 How It Works

### Architecture

```
┌─────────────────┐
│  Chatbot UI     │  ← React Component (Frontend)
│  (ChatInterface)│
└────────┬────────┘
         │
         │ calls
         ↓
┌─────────────────┐
│  AI Service     │  ← Service Layer (Connects to backend)
│  (aiService.js) │
└────────┬────────┘
         │
         ├─→ Mock Mode (Standalone - no backend)
         │
         ├─→ Firebase Functions SDK
         │
         └─→ HTTP Fallback (emulator or production)
```

### Mock Mode

When `VITE_USE_MOCK_CHATBOT=true`, the chatbot:
- ✅ Works completely standalone
- ✅ No Firebase Functions needed
- ✅ No OpenAI API needed
- ✅ Instant responses
- ✅ Perfect for UI testing

### Backend Mode

When mock mode is off, it tries:
1. Firebase Functions SDK
2. Emulator (localhost:5001)
3. Production URL

## 🎨 Mock Responses

The mock mode provides intelligent responses based on keywords:
- **Greetings** → Welcome message
- **Sleep** → Sleep advice
- **Exercise** → Fitness tips
- **Stress** → Stress management
- **Motivation** → Motivational support
- **Default** → General wellness guidance

## 🔄 Switching Between Modes

### Use Mock Mode (Testing):
```bash
# .env file
VITE_USE_MOCK_CHATBOT=true
```

### Use Real Backend (Production):
```bash
# .env file
VITE_USE_MOCK_CHATBOT=false
# OR just remove the line
```

Then deploy or run Firebase Functions as normal.

## ✅ Benefits

1. **Independent Frontend** - Test UI without backend
2. **Fast Development** - No need to deploy functions while designing
3. **Easy Testing** - Mock responses for different scenarios
4. **Flexible** - Switch between mock and real backend easily

## 📝 Summary

- **Chatbot UI** = Separate React component
- **AI Service** = Handles communication (mock or backend)
- **Backend** = Optional (Firebase Functions with OpenAI)

You can now develop and test the chatbot UI completely independently! 🎉

