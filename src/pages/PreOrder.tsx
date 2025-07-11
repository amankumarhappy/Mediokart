import React from 'react';
import { ArrowLeft, Clock, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PreOrder: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/aurabox"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to AuraBox
          </Link>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              AuraBox is Coming Soon!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              We're putting the finishing touches on India's first smart first-aid companion. 
              AuraBox will be available for pre-order soon, but you can get early access through our beta program.
            </p>
          </div>

          {/* Status Update */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Current Development Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Design Complete</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Product design and features finalized</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">⚡</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">MVP Development</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Currently building the prototype</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Beta Testing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Q3 2025 - Limited beta release</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Launch Timeline
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">Q3 2025 - Beta Program Launch</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Limited beta testing with select users</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">Q4 2025 - Pre-Order Opens</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Official pre-orders with early bird pricing</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">Q1 2026 - Product Launch</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Full market launch and delivery begins</div>
                </div>
              </div>
            </div>
          </div>

          {/* Early Access Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Join Beta Program</h3>
              <p className="text-blue-100 mb-6">
                Get exclusive early access to AuraBox, provide feedback, and help shape the final product. 
                Beta participants receive special pricing and priority support.
              </p>
              <Link
                to="/beta-program"
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Join Beta Program
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Schedule Demo</h3>
              <p className="text-purple-100 mb-6">
                See AuraBox in action with a personalized demo call. Learn about features, 
                ask questions, and understand how it can benefit your family.
              </p>
              <Link
                to="/schedule-demo"
                className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Be the first to know when pre-orders open and get exclusive updates on AuraBox development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrder;