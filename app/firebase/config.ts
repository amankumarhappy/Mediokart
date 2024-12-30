import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDVZ-xaUciry_K6VMWV8J5m4sjxLg127g",
  authDomain: "auraboxindia.firebaseapp.com",
  databaseURL: "https://auraboxindia-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auraboxindia",
  storageBucket: "auraboxindia.firebasestorage.app",
  messagingSenderId: "524884475252",
  appId: "1:524884475252:web:0506689387fab72e964021",
  measurementId: "G-TNRBZ01B1N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); // Realtime Database instance
export const auth = getAuth(app); // Authentication instance
export const googleProvider = new GoogleAuthProvider(); // Google Auth Provider instance

