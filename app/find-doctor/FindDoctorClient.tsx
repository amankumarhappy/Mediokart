'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

interface Doctor {
  id: string
  name: string
  specialty: string
  location: string
  availability: string
  rating: number
}

const FindDoctorClient: React.FC = () => {
  const { user } = useAuth()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [specialty, setSpecialty] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsRef = collection(db, 'doctors')
      const snapshot = await getDocs(doctorsRef)
      const doctorsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor))
      setDoctors(doctorsList)
      setLoading(false)
    }

    fetchDoctors()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredDoctors = doctors.filter(
      (doctor) =>
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase()) &&
        doctor.location.toLowerCase().includes(location.toLowerCase())
    )
    setDoctors(filteredDoctors)
    toast.success('Search results updated')
  }

  const handleBookAppointment = async (doctor: Doctor) => {
    if (user) {
      try {
        const appointment = {
          userId: user.uid,
          doctorId: doctor.id,
          doctorName: doctor.name,
          specialty: doctor.specialty,
          date: serverTimestamp(),
          status: 'pending',
        }
        await addDoc(collection(db, 'appointments'), appointment)
        toast.success('Appointment booked successfully!')
      } catch (error) {
        console.error('Error booking appointment:', error)
        toast.error('Failed to book appointment. Please try again.')
      }
    } else {
      toast.error('Please log in to book an appointment')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4"
      >
        Find Your Doctor Easily with Mediokart
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        Search and connect with top healthcare professionals in your area.
      </motion.p>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-wrap gap-4">
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Specialty</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="dermatologist">Dermatologist</option>
            <option value="pediatrician">Pediatrician</option>
          </select>
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
                </div>
                <div className="px-6 py-4">
                  <p><strong>Specialty:</strong> {doctor.specialty}</p>
                  <p><strong>Location:</strong> {doctor.location}</p>
                  <p><strong>Availability:</strong> {doctor.availability}</p>
                  <div className="flex items-center mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <span>{doctor.rating.toFixed(1)}</span>
                  </div>
                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {user ? 'Book Appointment' : 'Log in to Book'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 p-4 bg-blue-100 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-2">Unlock Mediokart's Full Potential!</h2>
          <ul className="list-disc list-inside">
            <li>Book appointments with top doctors</li>
            <li>Access personalized health recommendations</li>
            <li>Track your medical history securely</li>
            <li>Receive timely reminders for check-ups</li>
          </ul>
          <Link href="/login" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Log in or Sign up
          </Link>
        </motion.div>
      )}

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Mediokart as a Doctor</h2>
        <p className="mb-4">Are you a healthcare professional? Join our network and expand your practice.</p>
        <Link href="/doctor-registration" className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Register as a Doctor
        </Link>
      </div>
    </div>
  )
}

export default FindDoctorClient

