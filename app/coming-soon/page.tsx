'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ComingSoon() {
  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-green-400 to-white"
      style={{
        backgroundAttachment: 'fixed'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-white p-8 rounded-lg shadow-2xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg"
      >
        <h1 className="text-4xl font-['Montserrat'] font-bold mb-4">Coming Soon</h1>
        <p className="text-xl mb-8 font-['Roboto']">We're working hard to bring you something amazing. Stay tuned!</p>
        <Link href="/">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#E8F0FF'
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 font-['Montserrat'] font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
