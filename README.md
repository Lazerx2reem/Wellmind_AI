# WellMind AI

An AI-powered wellness tracking application that helps users monitor their mood, sleep, hydration, and workouts with personalized AI recommendations.

## 🚀 Project Status

**Current Sprint: Sprint 1 - Foundation & Logging**

### Completed Features (Sprint 1)
- ✅ React project setup with Vite
- ✅ Firebase SDK integration
- ✅ Firestore database configuration
- ✅ One-click wellness logging UI (Mood, Sleep, Hydration, Workout)
- ✅ Data storage in Firestore

### Upcoming Features
- Sprint 2: AI Coach integration (GPT-4 API)
- Sprint 3: Trend visualization dashboard
- Sprint 4: Privacy-first onboarding & responsive design
- Sprint 5: Testing, deployment, and stretch goals

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account and project

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database:
   - Go to Firestore Database in Firebase Console
   - Click "Create database"
   - Start in test mode (we'll add security rules later)
   - Choose a location for your database

3. Get your Firebase credentials:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click on the web icon (`</>`) to add a web app
   - Copy the Firebase configuration object

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

5. Edit `.env` and add your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### 3. Firestore Collections Structure

The app will automatically create the following collections when you start logging:
- `mood_logs` - User mood entries
- `sleep_logs` - Sleep duration and quality
- `hydration_logs` - Water intake records
- `workout_logs` - Exercise activities

Each log entry includes:
- `userId` - User identifier
- `timestamp` - Firestore timestamp
- `date` - ISO date string (YYYY-MM-DD)
- Type-specific fields (mood, hours, amount, type, duration, etc.)

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
Wellmind_AI/
├── src/
│   ├── components/
│   │   ├── LoggingButtons.jsx    # One-click logging UI
│   │   └── LoggingButtons.css
│   ├── firebase/
│   │   └── config.js              # Firebase initialization
│   ├── services/
│   │   └── firestore.js           # Firestore data operations
│   ├── App.jsx                     # Main app component
│   ├── App.css
│   ├── main.jsx                    # App entry point
│   └── index.css
├── public/
├── .env.example                    # Environment variables template
├── package.json
└── README.md
```

## 🎯 Features

### One-Click Logging
- **Mood Tracking**: Quick selection of emotional state (Happy, Good, Neutral, Sad, Anxious)
- **Sleep Logging**: Record hours of sleep (6-10 hours)
- **Hydration Tracking**: Log water intake (250ml, 500ml, 750ml, 1000ml)
- **Workout Logging**: Track exercise activities (Cardio, Strength, Yoga, Walk)

All logs are stored in Firestore with timestamps for trend analysis.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Notes

- Currently using a temporary user ID (`demo_user_1`) for testing
- Firebase Authentication will be implemented in Sprint 2
- The app will show a warning banner if Firebase is not configured
- All data is stored in Firestore with proper timestamps

## 🚧 Next Steps (Sprint 2)

1. Build AI coach chat interface
2. Integrate GPT-4 API via Firebase Functions
3. Test AI chat responses
4. Connect AI recommendations to user data

## 📚 Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: Firebase Functions
- **Database**: Firestore
- **AI**: OpenAI GPT-4 API (upcoming)
- **Hosting**: Vercel (planned)

## 📄 License

This project is part of a 5-week development plan for WellMind AI.
