'use client'

import { motion } from 'framer-motion'

const LoadingBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-blue-200 z-50">
      <motion.div
        className="h-full bg-blue-600"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export default LoadingBar

