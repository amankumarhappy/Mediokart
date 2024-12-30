'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'

interface Notification {
  id: string
  message: string
  date: Date
  read: boolean
}

const Notifications: React.FC = () => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        const notificationsRef = collection(db, 'notifications')
        const q = query(
          notificationsRef,
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        )
        const snapshot = await getDocs(q)
        const notificationsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate()
        } as Notification))
        setNotifications(notificationsList)
      }
      setLoading(false)
    }

    fetchNotifications()
  }, [user])

  if (loading) {
    return <div>Loading notifications...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <p>You have no notifications.</p>
      ) : (
        <div className="grid gap-4">
          {notifications.map((notification) => (
            <div key={notification.id} className={`bg-white shadow-md rounded-lg p-4 ${notification.read ? 'opacity-50' : ''}`}>
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500 mt-2">{notification.date.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notifications

