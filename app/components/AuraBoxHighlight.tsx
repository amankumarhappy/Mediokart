'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    number: 1,
    title: 'QR Code Scanning',
    description: 'Quickly access detailed medicine information'
  },
  {
    number: 2,
    title: 'Customizable Compartments',
    description: 'Organize your medications with ease'
  },
  {
    number: 3,
    title: 'Smart Medication Reminders',
    description: 'Never miss a dose with our intelligent reminder system'
  },
  {
    number: 4,
    title: 'Lightweight & Durable',
    description: 'Built to last and easy to carry'
  }
]

export default function AuraBoxHighlight() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              src="https://i.ibb.co/mJQGryZ/Gemini-Generated-Image-ua4jlua4jlua4jlu.jpg"
              alt="AuraBox Features"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
              priority
            />
          </motion.div>
          
          <div className="space-y-8">
            {features.map((feature) => (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: feature.number * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
                  {feature.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
            
            <div className="flex gap-4 pt-4">
              <Link href="/shop">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                  Buy Now
                </button>
              </Link>
              <Link href="/aurabox">
                <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

