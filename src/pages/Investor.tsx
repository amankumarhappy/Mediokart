import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Target, CheckCircle, AlertCircle, ArrowRight, FileText, BarChart, Globe } from 'lucide-react';

const Investor: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    investorType: '',
    investmentRange: '',
    interests: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const investorTypes = [
    'Angel Investor',
    'Venture Capital',
    'Private Equity',
    'Corporate Investor',
    'Family Office',
    'Healthcare Fund',
    'Other'
  ];

  const investmentRanges = [
    '$10K - $50K',
    '$50K - $100K',
    '$100K - $500K',
    '$500K - $1M',
    '$1M - $5M',
    '$5M+',
    'Prefer not to disclose'
  ];

  const marketOpportunity = [
    {
      icon: Globe,
      title: "$50B Market Size",
      description: "Global digital health market by 2026",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Users,
      title: "1.4B Population",
      description: "Target market in India alone",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: TrendingUp,
      title: "25% CAGR",
      description: "Healthcare IoT market growth rate",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Target,
      title: "First Mover",
      description: "India's first smart first-aid ecosystem",
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  const keyHighlights = [
    "Revolutionary AI-powered healthcare device (AuraBox)",
    "Complete healthcare ecosystem roadmap",
    "Experienced founder with clear vision",
    "Massive underserved market opportunity",
    "Strong IP potential and competitive moats",
    "Scalable technology platform",
    "Multiple revenue streams planned",
    "Strategic partnerships in development"
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
      const response = await fetch('https://formspree.io/f/manjrygg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'Investor Inquiry - Mediokart',
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setStatusMessage('Thank you for your interest! Our team will contact you within 48 hours with detailed investment information.');
        setFormData({
          name: '',
          email: '',
          company: '',
          investorType: '',
          investmentRange: '',
          interests: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setFormStatus('error');
      setStatusMessage('Something went wrong. Please try again or contact us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Invest in the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Future of Healthcare
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              Join us in revolutionizing healthcare access for 1.4 billion people in India. 
              Be part of building the world's first AI-powered healthcare ecosystem.
            </p>
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold">
              🚀 Pre-Series A Investment Opportunity
            </div>
          </div>
        </div>
      </div>

      {/* Market Opportunity */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Massive Market Opportunity
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Healthcare technology is experiencing unprecedented growth, and India represents the largest untapped market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketOpportunity.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Presentation */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Investment Presentation
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive overview of our business model, market strategy, and growth projections
            </p>
          </div>

          {/* PPT Placeholder */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl mb-12">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-20 h-20 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Investor Pitch Deck
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [Embed your investor presentation/PPT here]
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Presentation will be embedded once available
                </p>
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Investment Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyHighlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Projections */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Growth Projections
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Conservative estimates based on market research and comparable companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
              <BarChart className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Year 1-2</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">AuraBox Launch & Market Entry</p>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">$2M</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Projected Revenue</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
              <TrendingUp className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Year 3-4</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Ecosystem Expansion</p>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">$15M</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Projected Revenue</p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
              <Target className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Year 5+</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Market Leadership</p>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">$50M+</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Projected Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Investor Inquiry Form */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Investment Inquiry
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Interested in investing? Fill out the form below and we'll send you detailed information
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
                    Company/Fund Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={formStatus === 'loading'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                    placeholder="Your investment firm"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="investmentRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Investment Range
                  </label>
                  <select
                    id="investmentRange"
                    name="investmentRange"
                    value={formData.investmentRange}
                    onChange={handleInputChange}
                    disabled={formStatus === 'loading'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                  >
                    <option value="">Select range</option>
                    {investmentRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Investment Focus
                  </label>
                  <input
                    type="text"
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleInputChange}
                    disabled={formStatus === 'loading'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                    placeholder="e.g., Healthcare, IoT, AI"
                  />
                </div>
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
                  placeholder="Tell us about your investment interests and any specific questions..."
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
                  <span>{formStatus === 'loading' ? 'Sending...' : 'Request Information'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Healthcare Together?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join us in building India's first AI-powered healthcare ecosystem. 
            Your investment can help save millions of lives and create substantial returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105">
              Download Pitch Deck
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
              Schedule Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investor;