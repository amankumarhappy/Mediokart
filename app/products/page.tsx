'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { LogIn } from 'lucide-react'

const products = [
  {
    id: 'basic',
    name: 'AuraBox Basic',
    description: 'Essential features for everyday use',
    image: '/placeholder.svg?height=200&width=200',
    price: 7999
  },
  {
    id: 'premium',
    name: 'AuraBox Premium',
    description: 'Advanced features for enhanced experience',
    image: '/placeholder.svg?height=200&width=200',
    price: 11999
  },
  {
    id: 'pro',
    name: 'AuraBox Pro',
    description: 'Professional-grade features for power users',
    image: '/placeholder.svg?height=200&width=200',
    price: 15999
  }
]

export default function ProductsPage() {
  const { user } = useAuth()
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Our Products</h1>
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">₹{product.price.toLocaleString('en-IN')}</p>
                  <div className="flex justify-between">
                    <Link href={`/products/${product.id}`}>
                      <motion.button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </Link>
                    <Link href={`/buy-now/${product.id}`}>
                      <motion.button
                        className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${
                          hoveredProduct === product.id ? 'animate-pulse' : ''
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Buy Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Unlock Exclusive Product Access</h2>
            <p className="text-gray-600 mb-6">
              Log in to view our full range of products and enjoy personalized recommendations.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Access to all AuraBox models</li>
              <li>Exclusive member discounts</li>
              <li>Personalized product suggestions</li>
              <li>Early access to new releases</li>
            </ul>
            <Link href="/login">
              <motion.button
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="mr-2" />
                Log In to View Products
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

