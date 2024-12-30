'use client'

import { motion } from 'framer-motion'

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information Collection",
      content: "We collect information such as name, email address, payment information, and browsing data when you register, make a purchase, or interact with our website."
    },
    {
      title: "2. Use of Information",
      content: "The information collected is used for processing orders, personalizing content, improving services, and sending relevant notifications. We may also send promotional offers with your consent."
    },
    {
      title: "3. Data Protection",
      content: "Mediokart uses encryption and other secure technologies to protect your data from unauthorized access, loss, or misuse."
    },
    {
      title: "4. Third-Party Sharing",
      content: "We do not sell, trade, or share your personal data with third parties except for services necessary to process orders (payment processors, delivery services)."
    },
    {
      title: "5. Cookies",
      content: "We use cookies to enhance your browsing experience. You can disable cookies in your browser settings."
    },
    {
      title: "6. Your Rights",
      content: "You can update, correct, or delete your personal data at any time by contacting us. We will respond to requests within a reasonable time frame."
    },
    {
      title: "7. Changes to Privacy Policy",
      content: "Mediokart reserves the right to update the privacy policy at any time. You will be notified of any significant changes."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Privacy Policy
        </motion.h1>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <h2 className="text-2xl font-bold mb-2 text-blue-600">{section.title}</h2>
              <p className="text-gray-700">{section.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

