'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ref, onValue } from 'firebase/database'
import { db } from '../firebase/config'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ShoppingCart, Bell, BookOpen, User, LogIn, Settings, FileText } from 'lucide-react'
import Link from 'next/link'

interface UserData {
  username: string
  email: string
  createdAt?: string
  lastLogin?: string
  appointments?: number
  prescriptions?: number
  orders?: number
  notifications?: number
}

export default function Dashboard() {
  const { user } = useAuth()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false)
      return
    }

    const userRef = ref(db, `users/${user.uid}`)
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const displayName = data.username || user.email?.split('@')[0] || 'User'
        setUserData({
          ...data,
          username: displayName,
          email: user.email || '',
        })

        if (data.createdAt) {
          const createdAt = new Date(data.createdAt)
          const now = new Date()
          const diffHours = Math.abs(now.getTime() - createdAt.getTime()) / 36e5
          setIsNewUser(diffHours < 24)
        }
      }
      setLoading(false)
    }, (error) => {
      console.error('Error loading user data:', error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please log in</h2>
          <p className="mt-2 text-gray-600">You need to be logged in to view your dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {user ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4"
            >
              <div className="max-w-7xl mx-auto">
                <motion.h1
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl font-bold mb-2"
                >
                  {isNewUser ? 'Welcome to MedioKart! 🎉' : 'Welcome back to MedioKart! 👋'}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg opacity-90"
                >
                  Hello, {userData.username}! {isNewUser ? "We're excited to have you here." : "Great to see you again."}
                </motion.p>
              </div>
            </motion.div>

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{userData.appointments || 0}</p>
                  <Link href="/appointments" className="text-blue-500 hover:underline text-sm mt-2 inline-block">
                    View all appointments →
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Recent Orders</h2>
                    <ShoppingCart className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-green-600">{userData.orders || 0}</p>
                  <Link href="/orders" className="text-green-500 hover:underline text-sm mt-2 inline-block">
                    View order history →
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <Bell className="h-6 w-6 text-purple-500" />
                  </div>
                  <p className="text-3xl font-bold text-purple-600">{userData.notifications || 0}</p>
                  <Link href="/notifications" className="text-purple-500 hover:underline text-sm mt-2 inline-block">
                    View all notifications →
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-lg shadow p-6 sm:col-span-2 lg:col-span-3"
                >
                  <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Link href="/book-appointment" 
                      className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Calendar className="h-8 w-8 text-blue-500 mb-2" />
                      <span className="text-sm font-medium">Book Appointment</span>
                    </Link>
                    
                    <Link href="/medicines" 
                      className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <ShoppingCart className="h-8 w-8 text-green-500 mb-2" />
                      <span className="text-sm font-medium">Order Medicines</span>
                    </Link>
                    
                    <Link href="/health-records" 
                      className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                      <BookOpen className="h-8 w-8 text-purple-500 mb-2" />
                      <span className="text-sm font-medium">Health Records</span>
                    </Link>
                    
                    <Link href="/profile" 
                      className="flex flex-col items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
                      <User className="h-8 w-8 text-pink-500 mb-2" />
                      <span className="text-sm font-medium">Update Profile</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center">
              <motion.h1
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                Welcome to MedioKart
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-gray-600 mb-8"
              >
                Your one-stop solution for all your healthcare needs.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold text-gray-800">Why Join MedioKart?</h2>
                <ul className="text-left max-w-md mx-auto space-y-2">
                  <li className="flex items-center">
                    <Calendar className="h-6 w-6 text-blue-500 mr-2" />
                    <span>Easy appointment booking with top doctors</span>
                  </li>
                  <li className="flex items-center">
                    <ShoppingCart className="h-6 w-6 text-green-500 mr-2" />
                    <span>Order medicines and healthcare products online</span>
                  </li>
                  <li className="flex items-center">
                    <BookOpen className="h-6 w-6 text-purple-500 mr-2" />
                    <span>Access and manage your health records securely</span>
                  </li>
                  <li className="flex items-center">
                    <Bell className="h-6 w-6 text-yellow-500 mr-2" />
                    <span>Get timely health reminders and notifications</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8"
              >
                <Link href="/login" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Log In or Sign Up
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

