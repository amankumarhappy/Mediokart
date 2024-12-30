import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaComments, FaTimes } from 'react-icons/fa'

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white p-4 rounded-lg shadow-lg mb-4"
          >
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="mb-4">Need help? Reach out to us!</p>
            <button
              onClick={() => window.location.href = 'mailto:support@example.com'}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Email Support
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </motion.button>
    </div>
  )
}

