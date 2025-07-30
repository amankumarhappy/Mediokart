import React from 'react';
import { Users, Stethoscope, TrendingUp, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Surveys: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [surveysRef, surveysInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const surveys = [
    {
      icon: Users,
      title: "General Public Survey",
      description: "Share your healthcare challenges and help us understand community needs",
      targetAudience: "General Public",
      estimatedTime: "5-7 minutes",
      participants: "2,500+",
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      buttonText: "Take Survey",
      benefits: [
        "Help shape AuraBox features",
        "Contribute to healthcare innovation",
        "Get early access updates",
        "Join our community"
      ]
    },
    {
      icon: Stethoscope,
      title: "Medical Professionals",
      description: "Healthcare providers' insights on technology integration and patient care",
      targetAudience: "Doctors, Nurses, Healthcare Workers",
      estimatedTime: "8-10 minutes",
      participants: "450+",
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      buttonText: "Professional Survey",
      benefits: [
        "Influence medical device development",
        "Share professional expertise",
        "Network with healthcare innovators",
        "Access to research findings"
      ]
    },
    {
      icon: TrendingUp,
      title: "Investors & Advisors",
      description: "Strategic feedback on market opportunities and business development",
      targetAudience: "Investors, Business Advisors, Industry Experts",
      estimatedTime: "10-12 minutes",
      participants: "125+",
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      buttonText: "Investor Survey",
      benefits: [
        "Early investment opportunities",
        "Market insights and analysis",
        "Strategic partnership discussions",
        "Exclusive investor updates"
      ]
    }
  ];

  const whyParticipate = [
    {
      icon: CheckCircle,
      title: "Shape the Future",
      description: "Your feedback directly influences the development of India's first smart healthcare ecosystem"
    },
    {
      icon: Users,
      title: "Join Our Community",
      description: "Become part of a growing community of healthcare innovators and early adopters"
    },
    {
      icon: Clock,
      title: "Quick & Easy",
      description: "Surveys are designed to be completed quickly while gathering meaningful insights"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Help Us Build
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Better Healthcare
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Your insights are crucial in developing AuraBox and the complete Mediokart healthcare ecosystem. 
              Share your experiences and help us create solutions that truly matter.
            </p>
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold">
              🎯 Your Voice Shapes Innovation
            </div>
          </div>
        </div>
      </section>

      {/* Why Participate */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Your Feedback Matters
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every response helps us understand real healthcare challenges and build solutions that work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyParticipate.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Survey Cards */}
      <section ref={surveysRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${surveysInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Survey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Select the survey that best matches your background and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {surveys.map((survey, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                  surveysInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="p-8">
                  <div className={`w-16 h-16 ${survey.color} rounded-xl flex items-center justify-center mb-6`}>
                    <survey.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {survey.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                    {survey.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Audience:</span>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                        {survey.targetAudience}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Estimated Time:</span>
                      <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                        {survey.estimatedTime}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Participants:</span>
                      <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                        {survey.participants}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {survey.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 px-8 py-6">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105">
                    <span>{survey.buttonText}</span>
                    <ArrowRight size={16} />
                  </button>
                  <p className="text-center text-gray-500 dark:text-gray-400 text-xs mt-2">
                    Survey questions will be added soon
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Survey Impact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Your Impact on Healthcare Innovation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Every survey response helps us understand real healthcare challenges and build solutions that truly work for Indian families.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3,000+</div>
              <p className="text-gray-600 dark:text-gray-300">Total Survey Responses</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">85%</div>
              <p className="text-gray-600 dark:text-gray-300">Positive Feedback on AuraBox Concept</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
              <p className="text-gray-600 dark:text-gray-300">Feature Suggestions Implemented</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of others who are helping shape the future of healthcare in India. 
              Your insights are invaluable in creating solutions that truly matter.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
              Start Any Survey
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Be Part of the Healthcare Revolution
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Your feedback today shapes the healthcare solutions of tomorrow. 
            Help us build AuraBox and the complete Mediokart ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105">
              Take a Survey Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
              Learn More About AuraBox
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Surveys;