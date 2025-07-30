import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Globe, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Investor: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    investmentRange: '',
    investorType: '',
    interests: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const investmentRanges = [
    '₹10L - ₹50L',
    '₹50L - ₹1Cr',
    '₹1Cr - ₹5Cr',
    '₹5Cr - ₹10Cr',
    '₹10Cr+'
  ];

  const investorTypes = [
    'Angel Investor',
    'Venture Capital',
    'Private Equity',
    'Strategic Investor',
    'Family Office',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      // Save to Firestore
      await addDoc(collection(db, 'Investor'), {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        investmentRange: formData.investmentRange,
        investorType: formData.investorType,
        interests: formData.interests,
        message: formData.message,
        submittedAt: new Date(),
        status: 'new'
      });

      setFormStatus('success');
      setStatusMessage('Thank you for your interest! Our team will contact you within 48 hours with detailed investment information.');
      setFormData({
        name: '',
        email: '',
        company: '',
        investmentRange: '',
        investorType: '',
        interests: '',
        message: ''
      });
    } catch (error) {
      setFormStatus('error');
      setStatusMessage('Something went wrong. Please try again or contact us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Investment
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Opportunity
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join us in revolutionizing healthcare accessibility across India with AuraBox technology
            </p>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Market Opportunity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                ₹372 billion Indian healthcare market
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Target Audience
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                1.4 billion potential users in India
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Global Expansion
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Scalable to emerging markets worldwide
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Revenue Model
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Multiple revenue streams identified
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Express Your Interest
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Fill out the form below to receive our detailed investment deck
              </p>
            </div>

            {formStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <CheckCircle size={20} />
                  <span className="font-medium">{statusMessage}</span>
                </div>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                  <AlertCircle size={20} />
                  <span className="font-medium">{statusMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={formStatus === 'loading'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={formStatus === 'loading'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company/Fund Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={formStatus === 'loading'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                    placeholder="Your company or fund name"
                  />
                </div>
                <div>
                  <label htmlFor="investorType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Investor Type *
                  </label>
                  <select
                    id="investorType"
                    name="investorType"
                    required
                    value={formData.investorType}
                    onChange={handleInputChange}
                    disabled={formStatus === 'loading'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                  >
                    <option value="">Select investor type</option>
                    {investorTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="investmentRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Investment Range *
                </label>
                <select
                  id="investmentRange"
                  name="investmentRange"
                  required
                  value={formData.investmentRange}
                  onChange={handleInputChange}
                  disabled={formStatus === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                >
                  <option value="">Select investment range</option>
                  {investmentRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specific Interests
                </label>
                <input
                  type="text"
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  disabled={formStatus === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                  placeholder="e.g., Healthcare technology, IoT devices, Indian market"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={formStatus === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none disabled:opacity-50"
                  placeholder="Tell us about your investment thesis and any specific questions..."
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  * Required fields
                </p>
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  <Send size={18} />
                  <span>{formStatus === 'loading' ? 'Submitting...' : 'Submit Interest'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investor;