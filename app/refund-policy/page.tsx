'use client'

import { motion } from 'framer-motion'

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Refund Policy
        </motion.h1>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Refund Policy</h2>
          <p className="mb-4">
            At Mediokart, we strive to ensure your complete satisfaction with our products and services. If you are not entirely satisfied with your purchase, we're here to help.
          </p>
          <h3 className="text-xl font-bold mb-2 text-blue-600">Eligibility for Refunds</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Products must be returned within 14 days of the original purchase date.</li>
            <li>Items must be in their original condition, unused, and with all original packaging and accessories.</li>
            <li>Digital products and services are non-refundable once accessed or downloaded.</li>
          </ul>
          <h3 className="text-xl font-bold mb-2 text-blue-600">Refund Process</h3>
          <ol className="list-decimal list-inside mb-4">
            <li>Contact our customer service team to initiate a refund request.</li>
            <li>You will receive instructions on how to return the product.</li>
            <li>Once we receive and inspect the returned item, we will process your refund.</li>
            <li>Refunds will be credited to the original method of payment within 5-10 business days.</li>
          </ol>
          <p className="mb-4">
            Please note that shipping costs for returns are the responsibility of the customer unless the return is due to our error.
          </p>
          <p>
            For any questions or concerns about our refund policy, please contact our customer service team.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default RefundPolicy

