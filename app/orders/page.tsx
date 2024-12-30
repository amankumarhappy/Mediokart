'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { toast } from 'react-hot-toast'

interface Order {
  id: string
  item: string
  quantity: number
  status: string
}

export default function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) return

      try {
        const ordersRef = collection(db, 'users', user.uid, 'orders')
        const snapshot = await getDocs(ordersRef)
        const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[]
        setOrders(ordersData)
      } catch (error) {
        console.error('Error fetching orders:', error)
        toast.error('Failed to load orders.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Recent Orders</h2>
      {orders.length === 0 ? (
        <p>No recent orders.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              {order.item} (Quantity: {order.quantity}) - Status: {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

