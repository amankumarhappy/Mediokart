'use client'

import { motion } from 'framer-motion'

const TermsAndConditions = () => {
  const sections = [
    {
      title: "1. Introduction",
      content: "By using the services provided by Mediokart, you agree to these terms and conditions. If you do not agree with any part of these terms, please refrain from using our website and services."
    },
    {
      title: "2. Services Provided",
      content: "Mediokart offers products like AuraBox, healthcare solutions, and related services, including but not limited to first-aid kits, health tracking, and consultation services."
    },
    {
      title: "3. User Account",
      content: "You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. If you notice any unauthorized use, contact us immediately."
    },
    {
      title: "4. Payment Terms",
      content: "All payments made on our platform are secure, and we use third-party payment gateways to process transactions. By subscribing to services like AuraBox, users agree to the subscription plans offered on the website."
    },
    {
      title: "5. Shipping & Delivery",
      content: "Mediokart strives to deliver products in a timely manner. Delivery time may vary based on location, availability, and third-party shipping partners."
    },
    {
      title: "6. Refund & Cancellation",
      content: "Refunds are available under specific conditions. For cancellations, please refer to the return policy for detailed steps and eligibility."
    },
    {
      title: "7. Product Usage",
      content: "Products sold on Mediokart should only be used as intended. Mediokart does not assume any responsibility for misuse or accidents arising from the improper use of products."
    },
    {
      title: "8. Limitation of Liability",
      content: "Mediokart shall not be held liable for any damages or loss caused by the use or misuse of the products sold on our platform."
    },
    {
      title: "9. Privacy",
      content: "Your personal information is safeguarded according to our privacy policy. We may use your data to personalize your experience or send updates about your subscriptions."
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
          Terms and Conditions
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

export default TermsAndConditions

