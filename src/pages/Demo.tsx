import React from 'react';
import { Play, ArrowLeft, Users, Clock, Shield, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Demo: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart AI Assistant",
      description: "Watch how AI guides users through medical emergencies"
    },
    {
      icon: Shield,
      title: "Medicine Tracking",
      description: "See automatic expiry monitoring in action"
    },
    {
      icon: Clock,
      title: "Emergency Response",
      description: "Experience the SOS system demonstration"
    },
    {
      icon: Users,
      title: "Family Management",
      description: "Learn how to manage multiple family members"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/aurabox"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to AuraBox
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              AuraBox Demo
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See India's first smart first-aid companion in action. Watch how AuraBox revolutionizes emergency healthcare response.
            </p>
          </div>
        </div>
      </div>

      {/* Video Demo Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Video Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-12 h-12 text-white ml-1" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  AuraBox Product Demo
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  [Embed your AuraBox demo video here]
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Video will be embedded once available
                </p>
              </div>
            </div>
            
            {/* Video Controls Placeholder */}
            <div className="bg-white dark:bg-gray-900 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">0:00 / 5:30</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Quality:</span>
                  <select className="text-sm bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
                    <option>1080p</option>
                    <option>720p</option>
                    <option>480p</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Features */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What You'll See in the Demo
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Experience all the revolutionary features of AuraBox
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience AuraBox?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our beta program for early access or schedule a personalized demo call
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/beta-program"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Join Beta Program
            </Link>
            <Link
              to="/schedule-demo"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Schedule Demo Call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;