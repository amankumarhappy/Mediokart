import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Add your Firebase config here
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const createOrder = async (orderData: {
  userId: string;
  items: any[];
  total: number;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: new Date(),
    });
    return { success: true, orderId: docRef.id };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
