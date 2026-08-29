// Firebase initialisation — Authentication + Cloud Firestore.
// Firestore backs the user profile document at users/{uid} (onboarding wizard).
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Values can be overridden per-environment via Vite env vars; the defaults are the
// AsraVerse web app credentials (Firebase web config is public by design).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyD9AFg6xShGAbqEfJAGlLm5XhPkHKv8HNY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'rd-year-project-fe918.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'rd-year-project-fe918',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'rd-year-project-fe918.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '663137493503',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:663137493503:web:f3c05081b8b628677947ca',
};

// Guard against re-initialising during Vite HMR.
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// Keep the session alive across page reloads / tab restarts.
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn('[Firebase Auth] Could not set local persistence:', err);
});
