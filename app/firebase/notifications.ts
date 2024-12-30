import { ref, onValue, query, orderByChild, limitToLast } from "firebase/database";
import { db } from './config';

export const getNotifications = (userId: string, callback: (data: any) => void) => {
  const notificationsRef = query(
    ref(db, `notifications/${userId}`),
    orderByChild('timestamp'),
    limitToLast(10)
  );
  
  return onValue(notificationsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const addNotification = async (userId: string, notification: any) => {
  try {
    const notificationsRef = ref(db, `notifications/${userId}`);
    const newNotificationRef = push(notificationsRef);
    await set(newNotificationRef, {
      ...notification,
      timestamp: Date.now()
    });
    console.log("Notification added successfully.");
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error;
  }
};

