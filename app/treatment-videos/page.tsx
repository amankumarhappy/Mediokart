'use client'

import { motion } from 'framer-motion'

export default function TreatmentVideos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Treatment Videos
        </motion.h1>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-700 mb-4">
            We're currently working on creating a comprehensive library of treatment videos to help our users better understand various medical procedures and treatments.
          </p>
          <p className="text-gray-700 mb-4">
            These videos will cover a wide range of topics, from common ailments to complex surgical procedures, all explained in an easy-to-understand format.
          </p>
          <p className="text-gray-700">
            Check back soon to access our growing collection of informative treatment videos.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

