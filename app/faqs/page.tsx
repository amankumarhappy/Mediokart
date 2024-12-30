'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQs = () => {
  const faqs = [
    {
      question: "What is AuraBox?",
      answer: "AuraBox is a smart first-aid kit designed with technology integration, including features like a QR code scanner for medicine details, customizable compartments, and health tracking."
    },
    {
      question: "How does the QR code scanning feature work?",
      answer: "The QR code scanning feature allows you to quickly access detailed information about the medicines in your AuraBox. Simply scan the QR code on the medicine packaging using the Mediokart app to view usage instructions, dosage, and potential side effects."
    },
    {
      question: "Can I customize the compartments in AuraBox?",
      answer: "Yes, AuraBox comes with customizable compartments that you can adjust according to your specific needs. This allows you to organize your medicines and first-aid supplies efficiently."
    },
    {
      question: "Is AuraBox suitable for travel?",
      answer: "AuraBox is designed to be lightweight and portable, making it perfect for travel. Its compact size allows you to easily pack it in your luggage or carry-on bag."
    },
    {
      question: "How does AuraBox integrate with the Mediokart app?",
      answer: "AuraBox pairs with the Mediokart app to provide features like medication reminders, refill alerts, and access to health tips. The app also stores your medical information securely for easy access during emergencies."
    },
    {
      question: "What are the different AuraBox models available?",
      answer: "We offer three AuraBox models: Basic (₹999), Premium (₹1499), and Pro (₹1999). They differ in the number of compartments, battery life, and additional features. Check our product page for detailed comparisons."
    },
    {
      question: "Is there a warranty on AuraBox?",
      answer: "Yes, AuraBox comes with a 1-year warranty for manufacturing defects. Please refer to our warranty policy for more details on coverage and claim procedures."
    },
    {
      question: "How often should I replace the items in my AuraBox?",
      answer: "We recommend checking your AuraBox contents regularly and replacing any expired medications or used items. The Mediokart app can help you keep track of expiration dates and send reminders for replacements."
    }
  ]

  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <button
                className="flex justify-between items-center w-full text-left font-bold text-lg text-blue-600 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openIndex === index && (
                <motion.p
                  className="mt-2 text-gray-700"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default FAQs

