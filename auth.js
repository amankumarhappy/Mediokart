import { auth, googleProvider, RecaptchaVerifier, signInWithPhoneNumber } from './firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// Email/Password Signup
const emailSignup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User info:', userCredential.user);
  } catch (error) {
    console.error('Error during email signup:', error);
  }
};

// Email/Password Login
const emailLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User info:', userCredential.user);
  } catch (error) {
    console.error('Error during email login:', error);
  }
};

// Google Login
const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log('User info:', user);
  } catch (error) {
    console.error('Error during Google login:', error);
  }
};

// Phone Login
const phoneLogin = async (phoneNumber, appVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    const verificationCode = window.prompt('Please enter the verification code that was sent to your mobile device.');
    const result = await confirmationResult.confirm(verificationCode);
    const user = result.user;
    console.log('User info:', user);
  } catch (error) {
    console.error('Error during phone login:', error);
  }
};

// Initialize reCAPTCHA
const setupRecaptcha = (elementId) => {
  window.recaptchaVerifier = new RecaptchaVerifier(elementId, {
    'size': 'invisible',
    'callback': (response) => {
      console.log('reCAPTCHA solved:', response);
    }
  }, auth);
};

export { emailSignup, emailLogin, googleLogin, phoneLogin, setupRecaptcha };
