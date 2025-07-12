import React from 'react';
import { Mail } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Blog: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Our Blog
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Coming Soon
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay tuned for insights on healthcare technology, medical innovations, and industry updates.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section 
        ref={contentRef} 
        className={`py-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-purple-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Write for Mediokart
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We're currently building our blog section and looking for expert voices in healthcare, technology, and innovation. If you're passionate about these topics and want to contribute, we'd love to hear from you.
            </p>

            <div className="space-y-6 text-left">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                We're interested in articles about:
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Healthcare Technology and Innovation</li>
                <li>AI and IoT in Healthcare</li>
                <li>Digital Health Transformation</li>
                <li>Medical Device Innovation</li>
                <li>Healthcare Accessibility in India</li>
                <li>Emergency Healthcare Solutions</li>
              </ul>
            </div>

            <div className="mt-12">
              <a 
                href="mailto:contact@mediokart.com" 
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us Your Pitch
              </a>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                contact@mediokart.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;