'use client'

import { motion } from 'framer-motion'
import { Heart, Siren, UserPlus, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

const services = [
  { icon: Heart, title: 'Comprehensive Healthcare Products', description: 'Wide range of healthcare solutions' },
  { icon: Siren, title: 'Emergency Care', description: '24/7 emergency services' },
  { icon: UserPlus, title: 'Specialist Appointments', description: 'Easy access to specialists' },
  { icon: ShieldCheck, title: 'Preventive Healthcare', description: 'Tips and regular health screenings' },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white dark:bg-navy-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-blue-600 dark:text-teal-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Comprehensive Healthcare Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/services">
            <motion.button
              className="px-6 py-3 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Services
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="bg-light-gray dark:bg-teal-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration:300"
      whileHover={{ y: -5 }}
    >
      <Icon className="w-12 h-12 text-blue-600 dark:text-teal-300 mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-teal-300">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}

