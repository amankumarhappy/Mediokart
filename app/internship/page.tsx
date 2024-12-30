'use client'

import { motion } from 'framer-motion'

export default function Internship() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Internship Opportunities
        </motion.h1>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-700 mb-4">
            We're excited to announce that we'll soon be offering internship opportunities for students and recent graduates in various fields related to healthcare and technology.
          </p>
          <p className="text-gray-700 mb-4">
            Our internship program is currently under development. We're working on creating meaningful experiences that will provide valuable insights into the healthcare industry and hands-on experience with cutting-edge technologies.
          </p>
          <p className="text-gray-700">
            Please check back soon for more information on available positions and how to apply.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

