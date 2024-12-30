'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
      <Link href="/orders">
        <motion.button
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ShoppingBag size={24} />
        </motion.button>
      </Link>
      <Link href="/contact">
        <motion.button
          className="bg-green-500 text-white p-3 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Phone size={24} />
        </motion.button>
      </Link>
      <motion.button
        className="bg-purple-500 text-white p-3 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {/* TODO: Implement chatbot functionality */}}
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  )
}

export default FloatingButtons

