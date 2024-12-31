'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../firebase/config'
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
        const ordersRef = collection(firestore, 'users', user.uid, 'orders')
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No recent orders.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="border p-4 rounded-lg shadow-sm">
              <p className="font-semibold">{order.item}</p>
              <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

