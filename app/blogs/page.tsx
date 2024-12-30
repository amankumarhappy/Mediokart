'use client'

import { motion } from 'framer-motion'

export default function Blogs() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-500 via-green-400 to-white py-12"
      style={{
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-['Montserrat'] font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mediokart Blog
        </motion.h1>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-700 mb-4 font-['Roboto']">
            Welcome to the Mediokart Blog! We're excited to share with you the latest news, insights, and tips related to healthcare and wellness.
          </p>
          <p className="text-gray-700 mb-4 font-['Roboto']">
            Our team of experts is currently working on creating valuable content that will help you make informed decisions about your health and well-being.
          </p>
          <p className="text-gray-700 font-['Roboto']">
            Stay tuned for our upcoming articles covering a wide range of topics, including preventive care, nutrition, mental health, and the latest advancements in medical technology.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
