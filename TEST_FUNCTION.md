# Testing Your Firebase Function

The "internal" error means your Firebase Function isn't working. Here's how to fix it:

## Quick Test: Is the Function Deployed?

Test if your function is accessible:

```bash
curl -X POST https://us-central1-wellmindai-ab5f8.cloudfunctions.net/chatWithAI \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test",
    "message": "Hello",
    "wellnessData": {}
  }'
```

If you get a 404 or error, the function isn't deployed.

## Solution: Deploy the Function

1. **Make sure OpenAI API key is in functions/.env:**
```bash
cd functions
cat .env
# Should show: OPENAI_API_KEY=sk-...
```

2. **Deploy:**
```bash
firebase deploy --only functions
```

3. **Wait 2-3 minutes** for deployment to complete.

## Alternative: Run Locally

**Terminal 1:**
```bash
cd functions
npm run serve
```

**Terminal 2:**
```bash
npm run dev
```

Then in your browser console, check what URL it's trying to call.
