import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './config'

export const createAppointment = async (userId: string, doctorId: string, doctorName: string, specialty: string) => {
  try {
    const appointmentData = {
      userId,
      doctorId,
      doctorName,
      specialty,
      date: serverTimestamp(),
      status: 'pending',
    }

    const docRef = await addDoc(collection(db, 'appointments'), appointmentData)

    // Create a notification for the user
    await addDoc(collection(db, 'notifications'), {
      userId,
      message: `Your appointment with Dr. ${doctorName} has been scheduled.`,
      date: serverTimestamp(),
      read: false,
    })

    return docRef.id
  } catch (error) {
    console.error('Error creating appointment:', error)
    throw error
  }
}

