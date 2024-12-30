'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FileText } from 'lucide-react'

const blogPosts = [
  { title: 'The Future of Telemedicine', author: 'Dr. Emily Chen', image: '/blog1.jpg' },
  { title: 'Understanding Chronic Diseases', author: 'Dr. Michael Brown', image: '/blog2.jpg' },
  { title: 'Nutrition Tips for a Healthier Life', author: 'Sarah Thompson, RD', image: '/blog3.jpg' },
]

const researchPapers = [
  { title: 'Advances in Cancer Treatment', authors: 'Smith et al.' },
  { title: 'The Impact of AI on Healthcare', authors: 'Johnson et al.' },
  { title: 'New Frontiers in Genetic Engineering', authors: 'Lee et al.' },
]

const BlogAndResearch = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <motion.h2
              className="text-3xl font-bold mb-8 text-primary dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Latest Blog Posts
            </motion.h2>
            <div className="grid gap-8">
              {blogPosts.map((post, index) => (
                <BlogPostCard key={index} {...post} />
              ))}
            </div>
            <motion.button
              className="btn-primary mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Posts
            </motion.button>
          </div>
          <div>
            <motion.h2
              className="text-3xl font-bold mb-8 text-primary dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Research Papers
            </motion.h2>
            <div className="grid gap-4">
              {researchPapers.map((paper, index) => (
                <ResearchPaperCard key={index} {...paper} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const BlogPostCard = ({ title, author, image }) => {
  return (
    <motion.div
      className="bg-accent/20 dark:bg-primary/20 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <Image src={image} alt={title} width={400} height={200} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-primary dark:text-white">{title}</h3>
        <p className="text-text-light dark:text-dark-text-light">{author}</p>
        <motion.button
          className="mt-4 text-primary dark:text-secondary font-semibold"
          whileHover={{ x: 5 }}
        >
          Read More →
        </motion.button>
      </div>
    </motion.div>
  )
}

const ResearchPaperCard = ({ title, authors }) => {
  return (
    <motion.div
      className="bg-accent/20 dark:bg-primary/20 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start">
        <FileText className="w-6 h-6 text-primary dark:text-secondary mr-4 mt-1" />
        <div>
          <h3 className="text-lg font-semibold mb-1 text-primary dark:text-white">{title}</h3>
          <p className="text-text-light dark:text-dark-text-light">{authors}</p>
          <motion.button
            className="mt-2 text-primary dark:text-secondary font-semibold"
            whileHover={{ x: 5 }}
          >
            Download PDF →
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogAndResearch

