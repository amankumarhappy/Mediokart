import { auth } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';

export const updateUserProfile = async (userData: {
  displayName?: string;
  photoURL?: string;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user logged in');

  try {
    await updateProfile(user, userData);
    return { success: true };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
