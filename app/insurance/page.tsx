'use client'

import { motion } from 'framer-motion'

export default function Insurance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Insurance Information
        </motion.h1>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-700 mb-4">
            We understand the importance of insurance coverage in healthcare. We're currently working on partnerships with various insurance providers to ensure our services are accessible to as many people as possible.
          </p>
          <p className="text-gray-700 mb-4">
            In the near future, this page will provide detailed information about:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Insurance plans we accept</li>
            <li>How to verify your coverage</li>
            <li>The process for filing claims</li>
            <li>Frequently asked questions about insurance</li>
          </ul>
          <p className="text-gray-700">
            We appreciate your patience as we work to bring you comprehensive insurance information. If you have any urgent questions, please don't hesitate to contact our customer support team.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

