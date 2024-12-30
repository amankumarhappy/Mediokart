'use client'

import { motion } from 'framer-motion'
import { Shield, Heart, Stethoscope, Award } from 'lucide-react'
import Image from 'next/image'

const features = [
  { icon: Shield, title: 'Trusted', description: 'Your health data is secure with us' },
  { icon: Heart, title: 'Caring', description: 'We prioritize your well-being' },
  { icon: Stethoscope, title: 'Professional', description: 'Expert healthcare at your fingertips' },
  { icon: Award, title: 'Certified', description: 'Recognized for excellence in healthcare' },
]

const CompanyOverview = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-primary dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Mediokart?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-primary dark:text-white">Meet Our Leadership</h3>
            <div className="grid grid-cols-1 gap-4">
              <LeadershipCard name="Aman Kumar Happy" role="Founder and CEO of Mediokart" image="/ceo.jpg" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold mb-4 text-primary dark:text-white">Customer Testimonials</h3>
            <TestimonialCarousel />
          </motion.div>
        </div>
        <div className="mt-16 text-center">
          <motion.div
            className="inline-block text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We have Zero Customers
          </motion.div>
          <motion.div
            className="inline-block ml-8 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Become a part of Mediokart
          </motion.div>
        </div>
        <div className="mt-8 text-center">
          <motion.button
            className="bg-primary text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Rate Us
          </motion.button>
        </div>
      </div>
    </section>
  )
}

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="bg-accent/20 dark:bg-primary/20 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <Icon className="w-12 h-12 text-primary dark:text-secondary mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-primary dark:text-white">{title}</h3>
      <p className="text-text-light dark:text-dark-text-light">{description}</p>
    </motion.div>
  )
}

const LeadershipCard = ({ name, role, image }) => {
  return (
    <motion.div
      className="bg-accent/20 dark:bg-primary/20 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src="https://i.ibb.co/LY9wNrg/1.png"
        alt="Aman Kumar Happy"
        width={100}
        height={100}
        className="rounded-full mb-4"
      />
      <h4 className="text-lg font-semibold text-primary dark:text-white">{name}</h4>
      <p className="text-text-light dark:text-dark-text-light">{role}</p>
    </motion.div>
  )
}

const TestimonialCarousel = () => {
  return (
    <div className="bg-accent/20 dark:bg-primary/20 p-6 rounded-lg shadow-md">
      <p className="text-text-light dark:text-dark-text-light mb-4">
        "We are waiting for you to become our first customer and leave a testimonial!"
      </p>
      <p className="font-semibold text-primary dark:text-white">- Future Mediokart Customer</p>
    </div>
  )
}

export default CompanyOverview

