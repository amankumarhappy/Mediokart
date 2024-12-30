'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { toast } from 'react-hot-toast'

interface Appointment {
  id: string
  date: string
  time: string
  doctor: string
}

export default function Appointments() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [doctor, setDoctor] = useState('')

  useEffect(() => {
    fetchAppointments()
  }, [user])

  const fetchAppointments = async () => {
    if (!user?.uid) return

    try {
      const appointmentsRef = collection(db, 'users', user.uid, 'appointments')
      const snapshot = await getDocs(appointmentsRef)
      const appointmentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Appointment[]
      setAppointments(appointmentsData)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      toast.error('Failed to load appointments.')
    } finally {
      setLoading(false)
    }
  }

  const createAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.uid) return

    try {
      const appointmentsRef = collection(db, 'users', user.uid, 'appointments')
      await addDoc(appointmentsRef, {
        date,
        time,
        doctor,
        createdAt: serverTimestamp()
      })
      toast.success('Appointment created successfully!')
      setDate('')
      setTime('')
      setDoctor('')
      fetchAppointments() // Refresh the appointments list
    } catch (error) {
      console.error('Error creating appointment:', error)
      toast.error('Failed to create appointment.')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      
      <form onSubmit={createAppointment} className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create New Appointment</h2>
        <div className="flex flex-col space-y-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            placeholder="Doctor's name"
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Create Appointment
          </button>
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul className="space-y-2">
          {appointments.map(appointment => (
            <li key={appointment.id} className="border p-2 rounded">
              {appointment.date} at {appointment.time} with Dr. {appointment.doctor}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

