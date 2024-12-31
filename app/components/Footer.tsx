'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <motion.footer 
      className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-montserrat font-bold mb-6 text-primary-600 dark:text-primary-400">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Services", "Products", "Blogs"].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "tween" }}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} 
                        className="text-primary-900 dark:text-primary-100 hover:text-primary-600 dark:hover:text-primary-400 
                                 transition-colors duration-300 font-roboto">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-montserrat font-bold mb-6 text-primary-600 dark:text-primary-400">Legal</h3>
            <ul className="space-y-3">
              {["Terms & Conditions", "Privacy Policy", "Refund Policy", "Disclaimer"].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "tween" }}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} 
                        className="text-primary-900 dark:text-primary-100 hover:text-primary-600 dark:hover:text-primary-400 
                                 transition-colors duration-300 font-roboto">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-montserrat font-bold mb-6 text-primary-600 dark:text-primary-400">Contact Us</h3>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, text: "Ambedkar Chowk, Buxar, Bihar, 802103" },
                { Icon: Phone, text: "+91 9153737258" },
                { Icon: Mail, text: "amankumarhappy1@gmail.com" }
              ].map(({ Icon, text }, index) => (
                <motion.li key={index} 
                          className="flex items-center space-x-3"
                          whileHover={{ x: 5 }}
                          transition={{ type: "tween" }}>
                  <Icon className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                  <span className="text-primary-900 dark:text-primary-100 font-roboto">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-montserrat font-bold mb-6 text-primary-600 dark:text-primary-400">Follow Us</h3>
            <div className="flex space-x-4">
              <SocialIcon Icon={FaInstagram} href="https://instagram.com" />
              <SocialIcon Icon={FaTwitter} href="https://twitter.com" />
              <SocialIcon Icon={FaLinkedin} href="https://linkedin.com" />
              <SocialIcon Icon={FaGithub} href="https://github.com" />
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-primary-900 dark:text-primary-100 font-roboto">
            &copy; {new Date().getFullYear()} Mediokart. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

const SocialIcon = ({ Icon, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -3 }}
    whileTap={{ scale: 0.95 }}
    className="bg-primary-100 dark:bg-gray-800 p-3 rounded-full 
               text-primary-500 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-gray-700 
               transition-colors duration-300"
  >
    <Icon size={20} />
  </motion.a>
)

export default Footer

