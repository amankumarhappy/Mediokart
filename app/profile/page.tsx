'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ref, onValue, set } from 'firebase/database'
import { db } from '../firebase/config'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { saveUserProfile, getUserProfile, updateUserProfile, UserProfile } from '../firebase/userProfile'
import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react'


interface UserProfile {
  displayName: string;
  email: string;
  age: number; // Ensure age is included
}

interface ProfileData {
  displayName: string
  email: string
  age: number
  gender: string
  city: string
  state: string
  phone: string
  allergies: string
  healthConditions: string
  createdAt?: number
  updatedAt?: number
}

export default function Profile() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [profile, setProfile] = useState<ProfileData>({
    displayName: '',
    email: '',
    age: 0,
    gender: '',
    city: '',
    state: '',
    phone: '',
    allergies: '',
    healthConditions: ''
  })

  // Reset save status after showing success
  useEffect(() => {
    if (saveStatus === 'success' || saveStatus === 'error') {
      const timer = setTimeout(() => {
        setSaveStatus('idle')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [saveStatus])

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false)
      return
    }

    const loadUserProfile = async () => {
      try {
        const userData = await getUserProfile(user.uid)
        if (userData) {
          setProfile({
            displayName: userData.displayName || user.email?.split('@')[0] || '',
            email: user.email || '',
            age: userData.age || 0,
            gender: userData.gender || '',
            city: userData.city || '',
            state: userData.state || '',
            phone: userData.phone || '',
            allergies: userData.allergies || '',
            healthConditions: userData.healthConditions || ''
          })
        } else {
          const newProfile: UserProfile = {
            displayName: user.email?.split('@')[0] || '',
            email: user.email || '',
            age: 0,
            createdAt: Date.now()
          }
          
          await saveUserProfile(user.uid, newProfile)
          setProfile(newProfile)
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        toast.error('Error loading profile. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [user])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!user?.uid) {
      toast.error('You must be logged in to update your profile')
      return
    }

    setSaving(true)
    setSaveStatus('saving')
    
    try {
      const updatedProfile: Partial<UserProfile> = {
        ...profile,
      }

      await updateUserProfile(user.uid, updatedProfile)
      setSaveStatus('success')
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      setSaveStatus('error')
      toast.error(error instanceof Error ? error.message : 'Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please log in</h2>
          <p className="mt-2 text-gray-600">You need to be logged in to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Profile Management</h2>
            <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800">
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
            {saveStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-green-600 flex items-center"
              >
                {/* <Alert variant="success" className="bg-green-50 text-green-800">
                  Profile updated successfully!
                </Alert> */}
              </motion.div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields remain the same */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={profile.displayName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                Allergies (if any)
              </label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                value={profile.allergies}
                onChange={handleChange}
                placeholder="e.g., peanuts, dairy, penicillin"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="healthConditions" className="block text-sm font-medium text-gray-700">
                Health Conditions (if any)
              </label>
              <input
                type="text"
                id="healthConditions"
                name="healthConditions"
                value={profile.healthConditions}
                onChange={handleChange}
                placeholder="e.g., diabetes, hypertension, asthma"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  saving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : saveStatus === 'success' ? (
                  'Saved!'
                ) : saveStatus === 'error' ? (
                  'Try Again'
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

