'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('https://formspree.io/f/xannelqp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubscribed(true)
        setEmail('')
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to subscribe. Please try again.')
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-light-gray dark:from-navy-900 dark:to-teal-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-blue-600 dark:text-teal-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Stay Informed with Our Free Weekly Healthcare Insights!
        </motion.h2>
        {!isSubscribed ? (
          <motion.form
            className="max-w-md mx-auto"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-full border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-orange-500 text-white rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe Now - It's Free!
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            className="text-center text-xl text-blue-600 dark:text-teal-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Thank you for subscribing to our free newsletter!
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Newsletter

