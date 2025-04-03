// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI5l9ILoy0HjejgfaysIdc9LHWMpg-eW0",
  authDomain: "farm2table-3e1b2.firebaseapp.com",
  projectId: "farm2table-3e1b2",
  storageBucket: "farm2table-3e1b2.firebasestorage.app",
  messagingSenderId: "236489424876",
  appId: "1:236489424876:web:db50621985ca0c4d170ac9",
  measurementId: "G-1DTBGR4B90"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
