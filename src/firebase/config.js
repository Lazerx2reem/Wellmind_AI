// Firebase configuration
// TODO: Replace with your Firebase project credentials
// Get these from Firebase Console > Project Settings > General > Your apps

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQxwUvHJQZEK6b_uOghYPZ3nhTrlvZIRQ",
  authDomain: "wellmindai-ab5f8.firebaseapp.com",
  projectId: "wellmindai-ab5f8",
  storageBucket: "wellmindai-ab5f8.firebasestorage.app",
  messagingSenderId: "316082801458",
  appId: "1:316082801458:web:7ad7b18ce2f3b5b53e652b",
  measurementId: "G-ZB1JSXED99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

export default app;

