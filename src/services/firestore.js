// Firestore service for data operations
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Collection names
const COLLECTIONS = {
  MOOD: 'mood_logs',
  SLEEP: 'sleep_logs',
  HYDRATION: 'hydration_logs',
  WORKOUT: 'workout_logs'
};

/**
 * Log a mood entry
 * @param {string} userId - User ID
 * @param {string} mood - Mood value (e.g., "happy", "sad", "anxious")
 * @param {number} intensity - Intensity level (1-10)
 */
export const logMood = async (userId, mood, intensity = 5) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.MOOD), {
      userId,
      mood,
      intensity,
      timestamp: Timestamp.now(),
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error logging mood:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Log a sleep entry
 * @param {string} userId - User ID
 * @param {number} hours - Hours of sleep
 * @param {number} quality - Sleep quality (1-10)
 */
export const logSleep = async (userId, hours, quality = 5) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.SLEEP), {
      userId,
      hours,
      quality,
      timestamp: Timestamp.now(),
      date: new Date().toISOString().split('T')[0]
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error logging sleep:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Log a hydration entry
 * @param {string} userId - User ID
 * @param {number} amount - Amount in ml
 */
export const logHydration = async (userId, amount) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.HYDRATION), {
      userId,
      amount,
      timestamp: Timestamp.now(),
      date: new Date().toISOString().split('T')[0]
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error logging hydration:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Log a workout entry
 * @param {string} userId - User ID
 * @param {string} type - Workout type (e.g., "cardio", "strength", "yoga")
 * @param {number} duration - Duration in minutes
 * @param {number} intensity - Intensity level (1-10)
 */
export const logWorkout = async (userId, type, duration, intensity = 5) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.WORKOUT), {
      userId,
      type,
      duration,
      intensity,
      timestamp: Timestamp.now(),
      date: new Date().toISOString().split('T')[0]
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error logging workout:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get recent logs for a user
 * @param {string} userId - User ID
 * @param {string} logType - Type of log (mood, sleep, hydration, workout)
 * @param {number} limitCount - Number of recent entries to fetch
 */
export const getRecentLogs = async (userId, logType, limitCount = 10) => {
  try {
    const collectionName = COLLECTIONS[logType.toUpperCase()];
    if (!collectionName) {
      throw new Error(`Invalid log type: ${logType}`);
    }

    const q = query(
      collection(db, collectionName),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const logs = [];
    querySnapshot.forEach((doc) => {
      logs.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, logs };
  } catch (error) {
    console.error(`Error fetching ${logType} logs:`, error);
    return { success: false, error: error.message, logs: [] };
  }
};

/**
 * Get logs for a specific date range
 * @param {string} userId - User ID
 * @param {string} logType - Type of log
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 */
export const getLogsByDateRange = async (userId, logType, startDate, endDate) => {
  try {
    const collectionName = COLLECTIONS[logType.toUpperCase()];
    if (!collectionName) {
      throw new Error(`Invalid log type: ${logType}`);
    }

    const q = query(
      collection(db, collectionName),
      where('userId', '==', userId),
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      where('timestamp', '<=', Timestamp.fromDate(endDate)),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const logs = [];
    querySnapshot.forEach((doc) => {
      logs.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, logs };
  } catch (error) {
    console.error(`Error fetching ${logType} logs by date range:`, error);
    return { success: false, error: error.message, logs: [] };
  }
};

