
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

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
const app = initializeApp(firebaseConfig);

// Enable App Check debug mode in development
if (typeof window !== 'undefined') {
  try {
    // Set debug token for development environments
    if (window.location.hostname === 'localhost' || 
        window.location.hostname.includes('webcontainer') || 
        window.location.hostname.includes('replit') ||
        window.location.hostname.includes('repl.co')) {
      (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    const appCheckProvider = new ReCaptchaV3Provider('6LcOxHQrAAAAALtzRFYObDuXifYplItL7xPl1rZW');
    
    initializeAppCheck(app, {
      provider: appCheckProvider,
      isTokenAutoRefreshEnabled: true
    });
  } catch (error) {
    console.warn('App Check initialization failed, continuing without it:', error);
    // Continue without App Check in development
  }
}

// Add error handling for Firestore operations
export const handleFirestoreError = (error: any, operation: string) => {
  console.error(`Firestore ${operation} error:`, error);
  
  if (error.code === 'permission-denied') {
    console.warn(`Permission denied for ${operation}. This might be due to Firestore security rules.`);
    return false;
  }
  
  if (error.code === 'unavailable') {
    console.warn(`Firestore temporarily unavailable for ${operation}. Please try again.`);
    return false;
  }
  
  return false;
};

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Country codes for phone authentication
export const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' }
];

// Activity tracking function
export const trackActivity = async (userId: string, activityType: string, details: any) => {
  try {
    await addDoc(collection(db, 'Activities'), {
      userId,
      activityType,
      details,
      timestamp: new Date(),
      createdAt: new Date()
    });
  } catch (error) {
    console.warn('Failed to track activity:', error);
  }
};

export default app;
