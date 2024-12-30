'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaMedkit, FaCog, FaClock, FaQrcode, FaToolbox, FaBell, FaCloud, FaWallet, FaShield, FaArrowRight } from 'react-icons/fa'

const AuraBox = () => {
  const features = [
    { 
      title: "QR Code Scanning",
      description: "Instantly access detailed medicine information",
      icon: <FaQrcode className="text-3xl text-blue-500" />
    },
    {
      title: "Customizable Compartments", 
      description: "Organize medications based on your needs",
      icon: <FaToolbox className="text-3xl text-green-500" />
    },
    {
      title: "Smart Medication Reminders",
      description: "Never miss a dose with automated reminders",
      icon: <FaBell className="text-3xl text-purple-500" />
    },
    {
      title: "IoT Integration",
      description: "Connect with your smartphone for enhanced health insights (Coming Soon)",
      icon: <FaCloud className="text-3xl text-blue-400" />
    }
  ]

  const variants = [
    { model: "Basic", price: "₹999", compartments: 4, qrScanning: true, batteryLife: "1 week" },
    { model: "Premium", price: "₹1499", compartments: 6, qrScanning: true, batteryLife: "2 weeks" },
    { model: "Pro", price: "₹1999", compartments: 8, qrScanning: true, batteryLife: "1 month" }
  ]

  const steps = [
    { title: "Scan QR Codes", description: "Use your phone to scan medicine QR codes for detailed information" },
    { title: "Organize Your Box", description: "Arrange medicines in labeled compartments" },
    { title: "Set Reminders", description: "Use the app to schedule medication alerts" },
    { title: "Stay Connected", description: "Monitor usage and refill needs via the Mediokart app" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-green-400 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Meet AuraBox: Revolutionizing First-Aid for Every Home!
          </h1>
          <p className="text-xl text-white mb-12">
            Your personal health companion designed to make first-aid smarter, organized, and accessible.
          </p>
        </motion.div>

        {/* Introduction Section */}
        <motion.div 
          className="bg-white rounded-lg shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-6">What is AuraBox?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 text-lg mb-6">
                AuraBox is a state-of-the-art, tech-integrated first-aid solution, designed for modern homes. With features like QR code scanning, customizable compartments, and smart medication reminders, AuraBox empowers you to manage your family's healthcare effortlessly.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[<FaMedkit key="1" />, <FaCog key="2" />, <FaClock key="3" />].map((icon, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center p-4 bg-blue-50 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl text-blue-500 mb-2">
                      {icon}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px]">
              {/* Placeholder for 3D render */}
              <div className="absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">3D Render Placeholder</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">AuraBox Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Variants Section */}
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Choose Your AuraBox</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {variants.map((variant, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-4">{variant.model}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-6">{variant.price}</p>
                <ul className="space-y-3 mb-6">
                  <li>✓ {variant.compartments} Compartments</li>
                  <li>✓ QR Scanning</li>
                  <li>✓ {variant.batteryLife} Battery Life</li>
                </ul>
              
                <Link href="/shop">
                  <motion.button
                    className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Buy Now
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">How Does AuraBox Work?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-blue-500 mb-4">{index + 1}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <FaArrowRight className="text-blue-300 text-2xl" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Take the First Step Towards Smarter Healthcare</h2>
          <p className="text-xl text-white mb-8">Experience the convenience and innovation of AuraBox. Order yours today!</p>
          <div className="space-x-4">
            <Link href="/shop">
              <motion.button
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop AuraBox Now
              </motion.button>
            </Link>
            <Link href="/aurabox">
              <motion.button
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AuraBox
