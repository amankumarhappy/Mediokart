'use client'

import { motion } from 'framer-motion'

export default function News() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mediokart News
        </motion.h1>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-700 mb-4">
            Stay up-to-date with the latest news and developments from Mediokart and the healthcare industry.
          </p>
          <p className="text-gray-700 mb-4">
            We're currently setting up our news section to bring you the most relevant and timely information about our services, product updates, and important healthcare trends.
          </p>
          <p className="text-gray-700">
            Check back soon for our first news articles and updates!
          </p>
        </motion.div>
      </div>
    </div>
  )
}

