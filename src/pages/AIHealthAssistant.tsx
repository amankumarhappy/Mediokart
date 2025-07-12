import React, { useState } from 'react';
import FloatingButtons from '../components/FloatingButtons';

const AIHealthAssistant: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 z-0">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl z-10">
        <div className="flex flex-col items-center w-full mb-4">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-lg mb-4 z-20">
            <img
              src="/MEDIOBOTFLOAT.png"
              alt="Mediobot Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 object-contain"
            />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center font-sans">
          AI Health Assistant
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8 text-center font-sans text-base md:text-lg max-w-2xl">
          Your AI-powered health assistant for India. Ask about symptoms, get general health tips, or learn more about Mediokart services.
        </p>
        <button
          onClick={() => setShowChat(true)}
          className="inline-flex items-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl w-full max-w-xs justify-center transform hover:scale-105"
        >
          <img src="/MEDIOBOTFLOAT.png" alt="Mediobot" className="w-8 h-8 mr-3" />
          Chat with Mediobot
        </button>
      </div>
      {showChat && (
        <div className="fixed inset-0 z-50">
          <FloatingButtons alwaysOpen forceFullPreview showInstallPrompt />
        </div>
      )}
    </div>
  );
};

export default AIHealthAssistant;
