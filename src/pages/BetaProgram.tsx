import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, Users, Star, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const BetaProgram: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    location: '',
    healthcareExperience: '',
    interests: [] as string[],
    feedback: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const professions = [
    'Healthcare Professional',
    'Technology Professional',
    'Student',
    'Business Professional',
    'Homemaker',
    'Retired',
    'Other'
  ];

  const interests = [
    'Smart Healthcare Devices',
    'AI in Medicine',
    'Emergency Response',
    'Family Health Management',
    'IoT Technology',
    'Healthcare Innovation'
  ];

  const benefits = [
    {
      icon: Star,
      title: "Early Access",
      description: "Be among the first to experience AuraBox before public launch"
    },
    {
      icon: Users,
      title: "Exclusive Community",
      description: "Join a select group of healthcare innovation enthusiasts"
    },
    {
      icon: Clock,
      title: "Priority Support",
      description: "Get dedicated support and direct feedback channels"
    },
    {
      icon: Shield,
      title: "Special Pricing",
      description: "Exclusive beta pricing and early bird discounts"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      // Save to Firestore
      await addDoc(collection(db, 'beta-program'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        profession: formData.profession,
        location: formData.location,
        healthcareExperience: formData.healthcareExperience,
        interests: formData.interests,
        feedback: formData.feedback,
        registeredAt: new Date(),
        status: 'registered'
      });

      // Also send via email
      const response = await fetch('https://formspree.io/f/mrbkngrj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          interests: formData.interests.join(', '),
          _subject: 'Beta Program Registration - Mediokart AuraBox',
        }),
      });

      setFormStatus('success');
      setStatusMessage('Thank you for joining our beta program! We\'ll contact you soon with exclusive updates and early access information.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        profession: '',
        location: '',
        healthcareExperience: '',
        interests: [],
        feedback: ''
      });
    } catch (error) {
      setFormStatus('error');
      setStatusMessage('Something went wrong. Please try again or contact us directly.');
    }
  };

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
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Join AuraBox Beta Program
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Be among the first to experience India's revolutionary smart first-aid companion. 
              Help us shape the future of healthcare technology.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Beta Program Benefits
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Exclusive advantages for our beta community members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Register for Beta Access
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Fill out the form below to join our exclusive beta program
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={formStatus === 'loading'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profession *
                  </label>
                  <select
                    id="profession"
                    name="profession"
                    required
                    value={formData.profession}
                    onChange={handleInputChange}
                    disabled={formStatus === 'loading'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                  >
                    <option value="">Select your profession</option>
                    {professions.map((profession) => (
                      <option key={profession} value={profession}>
                        {profession}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location (City, State) *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={formStatus === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                  placeholder="Mumbai, Maharashtra"
                />
              </div>

              <div>
                <label htmlFor="healthcareExperience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Healthcare Experience
                </label>
                <input
                  type="text"
                  id="healthcareExperience"
                  name="healthcareExperience"
                  value={formData.healthcareExperience}
                  onChange={handleInputChange}
                  disabled={formStatus === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                  placeholder="Any healthcare background or experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Areas of Interest (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        disabled={formStatus === 'loading'}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Comments
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows={4}
                  value={formData.feedback}
                  onChange={handleInputChange}
                  disabled={formStatus === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none disabled:opacity-50"
                  placeholder="Tell us why you're interested in AuraBox or any specific features you'd like to see..."
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  * Required fields
                </p>
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {formStatus === 'loading' ? 'Submitting...' : 'Join Beta Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaProgram;