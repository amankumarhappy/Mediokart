import { Auth, RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider, signInWithPopup, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const setupRecaptcha = (elementId: string) => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    },
  });
};


export const phoneLogin = async (phoneNumber: string) => {
  try {
    // Improved phone number validation
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      throw new Error('Invalid phone number format. Please use the format +[country code][number] (e.g., +14155552671)');
    }

    const appVerifier = window.recaptchaVerifier;
    if (!appVerifier) {
      throw new Error('Recaptcha verifier is not initialized');
    }
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error('Error during phone login:', error);
    throw error;
  }
};

export const verifyPhoneCode = async (code: string) => {
  try {
    if (!window.confirmationResult) {
      throw new Error('No confirmation result available. Please try sending the code again.');
    }
    const result = await window.confirmationResult.confirm(code);
    return result.user;
  } catch (error) {
    console.error('Error during phone code verification:', error);
    throw error;
  }
};

export const googleSignIn = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Add this to the global Window interface
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: any;
  }
}


export const updateUserProfile = async (user, displayName) => {
  // Implement the updateUserProfile function here
  // This is just a placeholder implementation
  console.log('Updating user profile:', user, displayName);
  // Add your Firebase logic here
}
