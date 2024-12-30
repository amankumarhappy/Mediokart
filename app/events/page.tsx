'use client'

import { motion } from 'framer-motion'

export default function Events() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Upcoming Events
        </motion.h1>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-700 mb-4">
            We're excited to announce that we'll soon be hosting a variety of events to engage with our community and promote better health awareness.
          </p>
          <p className="text-gray-700 mb-4">
            Our events will include health seminars, wellness workshops, and informative webinars on various healthcare topics.
          </p>
          <p className="text-gray-700">
            Stay tuned for our event calendar, which will be updated regularly with upcoming activities and how you can participate.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

