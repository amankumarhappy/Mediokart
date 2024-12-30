import { ref, set, get } from "firebase/database";
import { db } from './config';

export interface UserProfile {
  username: string;
  email: string;
  age?: string;
  gender?: string;
  city?: string;
  state?: string;
  phone?: string;
  allergies?: string;
  healthConditions?: string;
  profilePicture?: string;
  createdAt?: number;
  updatedAt?: number;
}

export const saveUserProfile = async (userId: string, userData: Partial<UserProfile>): Promise<boolean> => {
  try {
    const userRef = ref(db, `users/${userId}`);
    await set(userRef, {
      ...userData,
      updatedAt: Date.now()
    });
    console.log("User profile saved successfully in Firebase.");
    return true;
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw new Error("Failed to save user profile. Please try again.");
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val() as UserProfile;
    } else {
      console.log("User profile not found.");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw new Error("Failed to retrieve user profile. Please try again.");
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<boolean> => {
  try {
    const currentProfile = await getUserProfile(userId);
    if (!currentProfile) {
      throw new Error("User profile not found.");
    }
    
    const updatedProfile = {
      ...currentProfile,
      ...updates,
      updatedAt: Date.now()
    };
    
    await saveUserProfile(userId, updatedProfile);
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Failed to update user profile. Please try again.");
  }
};

