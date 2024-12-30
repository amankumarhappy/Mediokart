'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaStethoscope, FaFirstAid, FaHeartbeat, FaPrescriptionBottleAlt, FaGlobe, FaLightbulb, FaHeart, FaTrophy, FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'

const AboutUs = () => {
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
            Empowering You with Smarter Healthcare Solutions
          </h1>
          <p className="text-xl text-white mb-12">
            Mediokart is committed to revolutionizing healthcare with innovative, accessible, and high-quality medical solutions for every home.
          </p>
        </motion.div>

        {/* Who We Are Section */}
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Who We Are</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <FaFirstAid className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">Pioneering smart healthcare solutions with AuraBox</p>
            </motion.div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <FaHeartbeat className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600">Making healthcare available to everyone</p>
            </motion.div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <FaStethoscope className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">Ensuring the highest standards in healthcare</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Vision & Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <FaGlobe className="text-blue-500 mr-3" /> Vision
              </h3>
              <p className="text-gray-700">
                To make healthcare smarter, more accessible, and more reliable for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <FaLightbulb className="text-green-500 mr-3" /> Mission
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Empower users with personalized healthcare solutions</li>
                <li>Innovate smart medical products like AuraBox</li>
                <li>Build a comprehensive healthcare ecosystem</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Leadership */}
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Meet Our Leadership</h2>
          <motion.div
            className="flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Aman Kumar Happy</h3>
              <p className="text-gray-600">Founder and CEO</p>
              <p className="text-gray-500 mt-2">"Transforming healthcare through technology and innovation."</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="bg-white rounded-lg shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600">Ambedkar Chowk, Buxar, Bihar, 802103</p>
              <p className="text-gray-600">Phone: +91 9153737258</p>
              <p className="text-gray-600">Email: amankumarhappy1@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <FaInstagram className="text-2xl text-pink-500 cursor-pointer hover:scale-110 transition-transform" />
                <FaFacebook className="text-2xl text-blue-600 cursor-pointer hover:scale-110 transition-transform" />
                <FaLinkedin className="text-2xl text-blue-700 cursor-pointer hover:scale-110 transition-transform" />
                <FaTwitter className="text-2xl text-blue-400 cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default AboutUs
