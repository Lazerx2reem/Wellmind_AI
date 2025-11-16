# Quick Setup Guide

## ✅ What's Been Set Up

Sprint 1 is complete! Here's what's ready:

1. **React Project** - Initialized with Vite
2. **Firebase SDK** - Installed and configured
3. **Firestore Service** - Data operations ready
4. **Logging UI** - One-click buttons for mood, sleep, hydration, and workouts
5. **Project Structure** - Organized components and services

## 🚀 Next Steps to Get Running

### Step 1: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable Firestore Database:
   - Click "Firestore Database" in left menu
   - Click "Create database"
   - Select "Start in test mode" (for now)
   - Choose a location

4. Get your config:
   - Project Settings (gear icon) > General
   - Scroll to "Your apps" > Add app > Web (</> icon)
   - Copy the config values

5. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

6. Add your Firebase credentials to `.env`:
   ```
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### Step 2: Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` and start logging!

### Step 3: Test Logging

1. Click any logging button (mood, sleep, hydration, workout)
2. Check Firebase Console > Firestore Database to see your logs
3. You should see collections: `mood_logs`, `sleep_logs`, `hydration_logs`, `workout_logs`

## 📁 Project Structure

```
src/
├── components/
│   ├── LoggingButtons.jsx    # Main logging UI
│   └── LoggingButtons.css
├── firebase/
│   └── config.js             # Firebase initialization
├── services/
│   └── firestore.js          # All Firestore operations
├── App.jsx                    # Main app component
└── main.jsx                   # Entry point
```

## 🎯 What Works Now

- ✅ One-click mood logging (Happy, Good, Neutral, Sad, Anxious)
- ✅ Sleep logging (6-10 hours)
- ✅ Hydration tracking (250ml, 500ml, 750ml, 1000ml)
- ✅ Workout logging (Cardio, Strength, Yoga, Walk)
- ✅ All data saved to Firestore
- ✅ Success/error messages
- ✅ Responsive design

## 🔜 Coming in Sprint 2

- AI Coach chat interface
- GPT-4 API integration
- Personalized recommendations
- Chat history storage

## ⚠️ Important Notes

- Currently using `demo_user_1` as temporary user ID
- Real authentication coming in Sprint 2
- The app shows a warning if Firebase isn't configured
- All logs include timestamps for future trend analysis

## 🐛 Troubleshooting

**"Firebase not configured" warning:**
- Make sure `.env` file exists with correct values
- Restart dev server after adding `.env`

**Logs not saving:**
- Check Firebase Console for errors
- Verify Firestore is enabled
- Check browser console for errors

**Build errors:**
- Run `npm install` again
- Check Node.js version (need v18+)

