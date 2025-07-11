import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  ConfirmationResult
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';

interface UserData {
  uid: string;
  email: string | null;
  displayName: string;
  phoneNumber: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  authMethod: 'email' | 'phone' | 'google' | 'anonymous';
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  bloodGroup?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  alternateNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  height?: string;
  weight?: string;
  allergies?: string;
  chronic?: string;
  medications?: string;
  familyHistory?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  recaptchaVerifier: RecaptchaVerifier | null;
  confirmationResult: ConfirmationResult | null;
  signup: (email: string, password: string, name: string, acceptedTerms: boolean) => Promise<void>;
  login: (email: string, password: string, acceptedTerms: boolean) => Promise<void>;
  loginWithGoogle: (acceptedTerms: boolean) => Promise<void>;
  loginWithPhone: (phoneNumber: string, acceptedTerms: boolean) => Promise<ConfirmationResult>;
  verifyPhoneCode: (code: string) => Promise<void>;
  loginAnonymously: (acceptedTerms: boolean) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setupRecaptcha: (elementId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const createUserDocument = async (user: User, authMethod: 'email' | 'phone' | 'google' | 'anonymous', displayName?: string) => {
    const userDoc: any = {
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.displayName || 'User',
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      isAnonymous: user.isAnonymous,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      authMethod
    };
    // Only add extra fields if they are defined
    if (user.displayName) userDoc.firstName = '';
    if (user.displayName) userDoc.lastName = '';
    if (user.displayName) userDoc.dob = '';
    await setDoc(doc(db, 'users', user.uid), userDoc, { merge: true });
  };

  const signup = async (email: string, password: string, name: string, acceptedTerms: boolean) => {
    if (!acceptedTerms) {
      throw new Error('You must accept the terms and conditions to sign up');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });
    await createUserDocument(user, 'email', name);
  };

  const login = async (email: string, password: string, acceptedTerms: boolean) => {
    if (!acceptedTerms) {
      throw new Error('You must accept the terms and conditions to sign in');
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      lastLoginAt: new Date()
    }, { merge: true });
  };

  const loginWithGoogle = async (acceptedTerms: boolean) => {
    if (!acceptedTerms) {
      throw new Error('You must accept the terms and conditions to sign in');
    }

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    await createUserDocument(user, 'google');
  };

  const setupRecaptcha = (elementId: string) => {
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
    }

    const verifier = new RecaptchaVerifier(auth, elementId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      }
    });

    setRecaptchaVerifier(verifier);
  };

  const loginWithPhone = async (phoneNumber: string, acceptedTerms: boolean): Promise<ConfirmationResult> => {
    if (!acceptedTerms) {
      throw new Error('You must accept the terms and conditions to sign in');
    }

    if (!recaptchaVerifier) {
      throw new Error('reCAPTCHA not initialized');
    }

    const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    setConfirmationResult(confirmation);
    return confirmation;
  };

  const verifyPhoneCode = async (code: string) => {
    if (!confirmationResult) {
      throw new Error('No confirmation result available');
    }

    const result = await confirmationResult.confirm(code);
    const user = result.user;

    await createUserDocument(user, 'phone');
    setConfirmationResult(null);
  };

  const loginAnonymously = async (acceptedTerms: boolean) => {
    if (!acceptedTerms) {
      throw new Error('You must accept the terms and conditions to continue');
    }

    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;

    await createUserDocument(user, 'anonymous');
  };

  const logout = async () => {
    await signOut(auth);
    setUserData(null);
    setConfirmationResult(null);
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      setRecaptchaVerifier(null);
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const fetchUserData = async (user: User) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || data.displayName || 'User',
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          lastLoginAt: data.lastLoginAt?.toDate ? data.lastLoginAt.toDate() : new Date(),
          authMethod: data.authMethod || 'email',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          dob: data.dob || '',
          gender: data.gender || '',
          bloodGroup: data.bloodGroup || '',
          emergencyContactName: data.emergencyContactName || '',
          emergencyContactNumber: data.emergencyContactNumber || '',
          alternateNumber: data.alternateNumber || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          pincode: data.pincode || '',
          country: data.country || '',
          height: data.height || '',
          weight: data.weight || '',
          allergies: data.allergies || '',
          chronic: data.chronic || '',
          medications: data.medications || '',
          familyHistory: data.familyHistory || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    recaptchaVerifier,
    confirmationResult,
    signup,
    login,
    loginWithGoogle,
    loginWithPhone,
    verifyPhoneCode,
    loginAnonymously,
    logout,
    resetPassword,
    setupRecaptcha
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};