'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

interface Appointment {
  id: string
  doctorName: string
  specialty: string
  date: Date
  status: string
}

const BookAppointments: React.FC = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        const appointmentsRef = collection(db, 'appointments')
        const q = query(appointmentsRef, where('userId', '==', user.uid))
        const snapshot = await getDocs(q)
        const appointmentsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate()
        } as Appointment))
        setAppointments(appointmentsList)
      }
      setLoading(false)
    }

    fetchAppointments()
  }, [user])

  if (loading) {
    return <div>Loading appointments...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Appointments</h1>
      {appointments.length === 0 ? (
        <p>You have no appointments scheduled.</p>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold">{appointment.doctorName}</h2>
              <p><strong>Specialty:</strong> {appointment.specialty}</p>
              <p><strong>Date:</strong> {appointment.date.toLocaleString()}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BookAppointments

