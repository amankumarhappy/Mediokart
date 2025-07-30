import React, { createContext, useContext, useEffect, useState } from 'react';
import '../styles/loading-animation.css';
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
import { auth, db, googleProvider, trackActivity } from '../config/firebase';

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
  logout: () => Promise<boolean>;
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
    try {
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
      
      // Create main profile document with retry logic
      await setDoc(doc(db, 'Profile', user.uid), userDoc, { merge: true });
      
      // Create Basic Information subcollection
      await setDoc(doc(db, 'Profile', user.uid, 'Basic Information', 'data'), {
        firstName: '',
        lastName: '',
        dob: '',
        age: '',
        gender: '',
        bloodGroup: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        createdAt: new Date()
      }, { merge: true });
      
      // Create Contact Information subcollection
      await setDoc(doc(db, 'Profile', user.uid, 'Contact Information', 'data'), {
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        alternateNumber: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        createdAt: new Date()
      }, { merge: true });
      
      // Create Health Profile subcollection
      await setDoc(doc(db, 'Profile', user.uid, 'Health Profile', 'data'), {
        height: '',
        weight: '',
        bmi: '',
        allergies: '',
        chronic: '',
        medications: '',
        familyHistory: '',
        createdAt: new Date()
      }, { merge: true });
    } catch (error: any) {
      console.error('Error creating user document:', error);
      // Don't throw error for permission issues, just log them
      if (error.code === 'permission-denied' || error.code === 'unauthenticated') {
        console.warn('Firestore permissions issue, user authenticated but document creation failed');
        return; // Continue with authentication even if document creation fails
      }
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, acceptedTerms: boolean) => {
    if (!acceptedTerms) {
      throw new Error('You must accept the terms and conditions to sign up');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    try {
      await updateProfile(user, { displayName: name });
      await createUserDocument(user, 'email', name);
      await trackActivity(user.uid, 'user_signup', {
        method: 'email',
        displayName: name,
        email
      });
    } catch (error: any) {
      console.warn('Could not create user profile document:', error);
      // Don't fail signup if profile creation fails
    }
  };

  const login = async (email: string, password: string, acceptedTerms: boolean) => {
    if (!acceptedTerms) {
      throw new Error('You must accept the terms and conditions to sign in');
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    try {
      await setDoc(doc(db, 'Profile', user.uid), {
        lastLoginAt: new Date()
      }, { merge: true });
      await trackActivity(user.uid, 'user_login', {
        method: 'email',
        email
      });
    } catch (error: any) {
      console.warn('Could not update lastLoginAt:', error);
      // Don't fail login if we can't update the timestamp
    }
  };

  const loginWithGoogle = async (acceptedTerms: boolean) => {
    if (!acceptedTerms) {
      throw new Error('You must accept the terms and conditions to sign in');
    }

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    try {
      await createUserDocument(user, 'google');
      await trackActivity(user.uid, 'user_login', {
        method: 'google',
        email: user.email,
        displayName: user.displayName
      });
    } catch (error: any) {
      console.warn('Could not create user profile document for Google user:', error);
      // Don't fail login if profile creation fails
    }
  };

  const setupRecaptcha = (elementId: string) => {
    try {
      // Clear any existing reCAPTCHA instance
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }

      const verifier = new RecaptchaVerifier(auth, elementId, {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber
          console.log('reCAPTCHA verified');
        },
        'expired-callback': () => {
          // Reset the reCAPTCHA
          console.log('reCAPTCHA expired');
          setupRecaptcha(elementId);
        }
      });

      // Render the reCAPTCHA
      verifier.render();
      setRecaptchaVerifier(verifier);
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      throw new Error('Failed to set up phone authentication. Please try again.');
    }
  };

  const loginWithPhone = async (phoneNumber: string, acceptedTerms: boolean): Promise<ConfirmationResult> => {
    if (!acceptedTerms) {
      throw new Error('You must accept the terms and conditions to sign in');
    }

    if (!recaptchaVerifier) {
      throw new Error('reCAPTCHA not initialized');
    }

    try {
      // Format the phone number to E.164 format
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
      setConfirmationResult(confirmation);
      return confirmation;
    } catch (error: any) {
      console.error('Phone auth error:', error);
      // Clear the reCAPTCHA on error
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        setRecaptchaVerifier(null);
      }
      throw error;
    }
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
    try {
      // Sign out from Firebase
      await signOut(auth);
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      // Clear app state
      setCurrentUser(null);
      setUserData(null);
      setConfirmationResult(null);
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        setRecaptchaVerifier(null);
      }
      // Force a hard redirect to home (clears all React state)
      window.location.assign('/');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const fetchUserData = async (user: User) => {
    try {
      const userDoc = await getDoc(doc(db, 'Profile', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        
        // Fetch subcollection data with error handling
        let basicInfo = {};
        let contactInfo = {};
        let healthProfile = {};
        
        try {
          const basicInfoDoc = await getDoc(doc(db, 'Profile', user.uid, 'Basic Information', 'data'));
          basicInfo = basicInfoDoc.exists() ? basicInfoDoc.data() : {};
        } catch (error) {
          console.warn('Could not fetch basic info:', error);
        }
        
        try {
          const contactInfoDoc = await getDoc(doc(db, 'Profile', user.uid, 'Contact Information', 'data'));
          contactInfo = contactInfoDoc.exists() ? contactInfoDoc.data() : {};
        } catch (error) {
          console.warn('Could not fetch contact info:', error);
        }
        
        try {
          const healthProfileDoc = await getDoc(doc(db, 'Profile', user.uid, 'Health Profile', 'data'));
          healthProfile = healthProfileDoc.exists() ? healthProfileDoc.data() : {};
        } catch (error) {
          console.warn('Could not fetch health profile:', error);
        }
        
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
          firstName: (basicInfo as any).firstName || '',
          lastName: (basicInfo as any).lastName || '',
          dob: (basicInfo as any).dob || '',
          gender: (basicInfo as any).gender || '',
          bloodGroup: (basicInfo as any).bloodGroup || '',
          emergencyContactName: (basicInfo as any).emergencyContactName || '',
          emergencyContactNumber: (basicInfo as any).emergencyContactNumber || '',
          alternateNumber: (contactInfo as any).alternateNumber || '',
          address: (contactInfo as any).address || '',
          city: (contactInfo as any).city || '',
          state: (contactInfo as any).state || '',
          pincode: (contactInfo as any).pincode || '',
          country: (contactInfo as any).country || '',
          height: (healthProfile as any).height || '',
          weight: (healthProfile as any).weight || '',
          allergies: (healthProfile as any).allergies || '',
          chronic: (healthProfile as any).chronic || '',
          medications: (healthProfile as any).medications || '',
          familyHistory: (healthProfile as any).familyHistory || ''
        });
      } else {
        // If no user document exists, create basic user data from auth
        setUserData({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'User',
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          createdAt: new Date(),
          lastLoginAt: new Date(),
          authMethod: 'email',
          firstName: '',
          lastName: '',
          dob: '',
          gender: '',
          bloodGroup: '',
          emergencyContactName: '',
          emergencyContactNumber: '',
          alternateNumber: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          country: '',
          height: '',
          weight: '',
          allergies: '',
          chronic: '',
          medications: '',
          familyHistory: ''
        });
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      if (error.code === 'permission-denied') {
        console.warn('Permission denied for user data, using basic auth data');
        // Set basic user data from auth when permissions are denied
        setUserData({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'User',
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          createdAt: new Date(),
          lastLoginAt: new Date(),
          authMethod: 'email',
          firstName: '',
          lastName: '',
          dob: '',
          gender: '',
          bloodGroup: '',
          emergencyContactName: '',
          emergencyContactNumber: '',
          alternateNumber: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          country: '',
          height: '',
          weight: '',
          allergies: '',
          chronic: '',
          medications: '',
          familyHistory: ''
        });
      }
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
        <div className="loading-container">
          <div className="loading-content">
            <div className="logo-container">
              <div className="logo-element">
                <img src="/Logo.png" alt="Mediokart" width="40" height="40" />
              </div>
            </div>
            <div className="loading-spinner" />
            <div className="loading-text">Loading</div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};