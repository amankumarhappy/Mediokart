import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCDVZ-xaUciry_K6VMWV8J5m4sjxLg127g",
  authDomain: "auraboxindia.firebaseapp.com",
  databaseURL: "https://auraboxindia-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auraboxindia",
  storageBucket: "auraboxindia.firebasestorage.app",
  messagingSenderId: "524884475252",
  appId: "1:524884475252:web:0506689387fab72e964021",
  measurementId: "G-TNRBZ01B1N"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes ? analytics = getAnalytics(app) : null);
}

export { app, auth, db, analytics, googleProvider };



