'use client'

import { motion } from 'framer-motion'

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Disclaimer
        </motion.h1>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-700 mb-4">
            The information provided by Mediokart and on the AuraBox is for general educational and informational purposes only. While we strive to provide accurate and up-to-date health information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li><strong>No Substitution for Professional Advice:</strong> The tips and product features are not a replacement for medical diagnosis or treatment. Always consult a licensed healthcare provider for specific medical needs.</li>
            <li><strong>Liability:</strong> Mediokart is not responsible for misuse of products or incorrect application of first-aid instructions.</li>
            <li><strong>Medicine Usage:</strong> Always read the labels on medications and consult a doctor or pharmacist if you have questions.</li>
          </ul>
          <p className="text-gray-700">
            By using AuraBox and Mediokart services, you acknowledge that the responsibility for medical decisions remains with you and your healthcare provider.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Disclaimer

