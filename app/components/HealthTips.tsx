'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const tips = [
  { title: 'Nutrition Tips for a Healthier Life', content: 'Eat a variety of colorful fruits and vegetables...' },
  { title: 'The Importance of Regular Checkups', content: 'Regular health checkups can detect problems before they start...' },
  { title: 'Stay Active for Better Health', content: 'Regular physical activity can improve your overall health and fitness...' },
]

const HealthTips = () => {
  const [currentTip, setCurrentTip] = useState(0)

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length)
  }

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-light-gray dark:from-navy-900 dark:to-teal-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-blue-600 dark:text-teal-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Health Tips
        </motion.h2>
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-navy-900 p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-teal-300">{tips[currentTip].title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{tips[currentTip].content}</p>
          </motion.div>
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            onClick={prevTip}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            onClick={nextTip}
          >
            <ChevronRight />
          </button>
        </div>
        <div className="text-center mt-8">
          <motion.button
            className="px-6 py-3 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/general-tips" className="text-white">
              View All Tips
            </Link>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default HealthTips

