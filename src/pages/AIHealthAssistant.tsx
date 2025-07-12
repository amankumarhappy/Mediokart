import React, { useState } from 'react';
import FloatingButtons from '../components/FloatingButtons';

const AIHealthAssistant: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Health Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your personal health companion powered by advanced AI. Get instant health guidance, symptom analysis, and medical information.
          </p>
        </div>

        {/* Mediobot Launch Button */}
        {!showChat && (
          <div className="flex flex-col items-center mt-8">
            <button
              onClick={() => setShowChat(true)}
              className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 relative">
                <img
                  src="/MEDIOBOTFLOAT.png"
                  alt="Mediobot"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Chat with Mediobot
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get instant health guidance and answers to your medical queries
                </p>
              </div>
            </button>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Symptom Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get instant analysis of your symptoms and understand potential causes
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Health Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access reliable medical information and health tips
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              24/7 Availability
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get health guidance anytime, anywhere with our AI assistant
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-4 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200 text-center">
            ⚠️ For emergencies, always call emergency services. Mediobot provides general guidance only.
          </p>
        </div>
      </div>

      {/* Floating Button Component */}
      {showChat && (
        <FloatingButtons
          alwaysOpen={true}
          forceFullPreview={true}
          hideFloating={true}
        />
      )}
    </div>
  );
};

export default AIHealthAssistant;
