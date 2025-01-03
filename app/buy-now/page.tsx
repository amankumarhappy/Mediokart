'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { db } from '../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { GetServerSideProps } from 'next'

interface PageProps {
  params: {
    productId: string
  }
}

const products = {
  basic: { name: 'AuraBox Basic', price: 99.99 },
  premium: { name: 'AuraBox Premium', price: 149.99 },
  pro: { name: 'AuraBox Pro', price: 199.99 }
}

const BuyNowPage = ({ params }: PageProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    address: '',
    state: '',
    city: ''
  })
  const [isFormValid, setIsFormValid] = useState(false)

  const product = products[params.productId as keyof typeof products]

  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      toast.error('Please log in to make a purchase')
      router.push('/login')
    }
  }, [user, router])

  useEffect(() => {
    const { name, contactNumber, address, state, city } = formData
    setIsFormValid(name !== '' && contactNumber !== '' && address !== '' && state !== '' && city !== '')
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        productId: params.productId,
        productName: product.name,
        price: product.price,
        ...formData,
        status: 'Pending',
        orderDate: serverTimestamp()
      })

      toast.success('Order placed successfully!')
      router.push(`/order-confirmation/${orderRef.id}`)
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order. Please try again.')
    }
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Buy {product.name}</h1>
          <p className="text-gray-600 mb-4">Price: ${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mb-6">Currently, only Cash on Delivery (COD) is available.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <select
                id="state"
                name="state"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleInputChange}
              >
                <option value="">Select State</option>
                <option value="State1">State 1</option>
                <option value="State2">State 2</option>
                {/* Add more states as needed */}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                id="city"
                name="city"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={handleInputChange}
              >
                <option value="">Select City</option>
                <option value="City1">City 1</option>
                <option value="City2">City 2</option>
                {/* Add more cities as needed */}
              </select>
            </div>

            <motion.button
              type="submit"
              disabled={!isFormValid}
              className={`w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Place Order
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productId } = context.params

  return {
    props: {
      params: {
        productId
      }
    }
  }
}

export default BuyNowPage

