# Firebase Functions Setup Guide

This guide will help you set up Firebase Functions for the WellMind AI GPT-4 integration.

## Prerequisites

1. **Firebase CLI**: Install if you haven't already
   ```bash
   npm install -g firebase-tools
   ```

2. **Firebase Login**: 
   ```bash
   firebase login
   ```

3. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

## Setup Steps

### 1. Initialize Firebase Functions (if not already done)

```bash
cd functions
npm install
```

### 2. Configure OpenAI API Key

You have two options:

**Option A: Environment Variable (Recommended)**
```bash
firebase functions:config:set openai.key="your-openai-api-key-here"
```

**Option B: Direct Environment Variable (Firebase Functions v2)**
```bash
firebase functions:secrets:set OPENAI_API_KEY
# Enter your API key when prompted
```

Then update `functions/index.js` to use the secret:
```javascript
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

### 3. Initialize Firebase Project (if not already done)

```bash
firebase init functions
```

When prompted:
- Select your Firebase project
- Choose JavaScript as the language
- Use ESLint: Yes
- Install dependencies: Yes

### 4. Test Locally (Optional)

```bash
cd functions
npm run serve
```

This starts the Firebase emulator. Your function will be available at:
`http://localhost:5001/[project-id]/us-central1/chatWithAI`

### 5. Deploy Functions

```bash
firebase deploy --only functions
```

After deployment, your function will be available at:
`https://us-central1-[project-id].cloudfunctions.net/chatWithAI`

### 6. Update Frontend Environment Variables

Add to your `.env` file (optional, for direct HTTP calls):
```
VITE_FIREBASE_FUNCTION_URL=https://us-central1-[project-id].cloudfunctions.net/chatWithAI
```

The frontend will automatically detect and use the deployed function via the Firebase SDK.

## Testing the Function

Once deployed, you can test it using curl:

```bash
curl -X POST https://us-central1-[project-id].cloudfunctions.net/chatWithAI \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user",
    "message": "How can I improve my sleep?",
    "wellnessData": {
      "sleep": [{"hours": 6, "timestamp": "2024-01-01"}]
    }
  }'
```

## Cost Considerations

- **Firebase Functions**: Free tier includes 2 million invocations/month
- **GPT-4 API**: Pay per use. Monitor usage at [OpenAI Usage Dashboard](https://platform.openai.com/usage)
- Consider implementing rate limiting for production use

## Troubleshooting

### Function not found error
- Make sure the function is deployed: `firebase deploy --only functions`
- Check that your Firebase project ID matches in both frontend and functions

### OpenAI API errors
- Verify your API key is set correctly
- Check your OpenAI account has credits/quota
- Review error logs: `firebase functions:log`

### CORS errors
- The function is configured with CORS enabled
- If issues persist, check the function logs for CORS errors

## Security Notes

- Never commit your OpenAI API key to git
- Use Firebase Functions config or secrets for API keys
- Consider adding authentication checks before allowing function calls
- Implement rate limiting for production use

