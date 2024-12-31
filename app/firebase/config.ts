import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDVZ-xaUciry_K6VMWV8J5m4sjxLg127g",
  authDomain: "auraboxindia.firebaseapp.com",
  projectId: "auraboxindia",
  storageBucket: "auraboxindia.firebasestorage.app",
  messagingSenderId: "524884475252",
  appId: "1:524884475252:web:0506689387fab72e964021",
  measurementId: "G-TNRBZ01B1N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, firestore, auth, googleProvider };

