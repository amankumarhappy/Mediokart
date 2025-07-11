import React from 'react';
import { Brain, Activity, Smartphone, Phone, Thermometer, Clock, Shield, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const AuraBox: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [specsRef, specsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: Brain,
      title: "Smart AI Assistant",
      description: "Advanced AI guides you through emergency situations, provides medication advice, and offers real-time health recommendations based on your medical history.",
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    },
    {
      icon: Activity,
      title: "Medicine Tracking System",
      description: "Automatic expiry date monitoring, dosage tracking, and smart reminders ensure your medications are always effective and safely managed.",
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
    },
    {
      icon: Thermometer,
      title: "Temperature Control",
      description: "Intelligent climate control maintains optimal storage conditions for different medications, preserving their efficacy and extending shelf life.",
      color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
    },
    {
      icon: Phone,
      title: "SOS Emergency Button",
      description: "One-touch emergency connection to nearest hospitals, emergency services, and your designated emergency contacts with location sharing.",
      color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
    },
    {
      icon: Smartphone,
      title: "Mobile App Integration",
      description: "Complete dashboard control through our mobile app with real-time monitoring, inventory management, and health insights.",
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
    },
    {
      icon: Users,
      title: "24/7 Customer Support",
      description: "Round-the-clock technical and medical support from our team of healthcare professionals and technical experts.",
      color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
    }
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: "Setup & Registration",
      description: "Unbox your AuraBox, connect to WiFi, and register through our mobile app with your medical profile and emergency contacts."
    },
    {
      step: "02",
      title: "Medicine Inventory",
      description: "Add your medications to the system through scanning or manual entry. AuraBox automatically tracks expiry dates and quantities."
    },
    {
      step: "03",
      title: "Smart Monitoring",
      description: "AI continuously monitors medicine conditions, sends reminders, and provides personalized health recommendations."
    },
    {
      step: "04",
      title: "Emergency Response",
      description: "In emergencies, press the SOS button for instant connection to healthcare services with your complete medical profile."
    }
  ];

  const specifications = [
    { label: "Dimensions", value: "30cm x 25cm x 15cm" },
    { label: "Storage Capacity", value: "50+ medicine items" },
    { label: "Temperature Range", value: "2°C to 30°C" },
    { label: "Connectivity", value: "WiFi, Bluetooth, 4G" },
    { label: "Battery Life", value: "72 hours backup" },
    { label: "Display", value: "7-inch touchscreen" },
    { label: "Materials", value: "Medical-grade plastic" },
    { label: "Sensors", value: "Temperature, Humidity, Motion" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🚀 MVP in Development
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Meet
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                AuraBox
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              India's First Smart First-Aid Companion - Revolutionizing Emergency Healthcare Response with AI and IoT
            </p>

            {/* Product Image Placeholder */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-300 dark:border-blue-700">
                <div className="text-center">
                  <Activity className="w-20 h-20 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                    [High-quality product photos/renders needed]
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                    360° product view, professional photography, video demonstration
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/beta-program"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
              >
                <span>Join Beta Program</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/demo"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              The Problem We're Solving
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">70%</div>
                <p className="text-gray-600 dark:text-gray-300">of medical emergencies could be better handled with proper first-aid guidance</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">40%</div>
                <p className="text-gray-600 dark:text-gray-300">of household medicines are expired or improperly stored</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-yellow-600 mb-2">15min</div>
                <p className="text-gray-600 dark:text-gray-300">average emergency response time that could be critical</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                <p className="text-gray-600 dark:text-gray-300">of people lack confidence in handling medical emergencies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section ref={featuresRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every feature designed to save lives and provide peace of mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How AuraBox Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simple setup, intelligent operation, life-saving results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section ref={specsRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${specsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Built with cutting-edge technology for reliability and performance
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className={`p-6 border-b border-gray-200 dark:border-gray-700 ${
                    index % 2 === 0 ? 'md:border-r' : ''
                  } ${index >= specifications.length - 2 ? 'border-b-0' : ''}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {spec.label}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      {spec.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose AuraBox?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                {[
                  "Save critical time during medical emergencies",
                  "Prevent medication errors and expired drugs",
                  "Get professional medical guidance 24/7",
                  "Connect instantly to emergency services",
                  "Monitor family health proactively",
                  "Reduce healthcare costs through prevention"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Experience the Future?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join our exclusive beta program and be among the first to experience 
                AuraBox's revolutionary healthcare capabilities.
              </p>
              <div className="space-y-4">
                <Link
                  to="/beta-program"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-center"
                >
                  Join Beta Program
                </Link>
                <Link
                  to="/schedule-demo"
                  className="block w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-center"
                >
                  Schedule Demo Call
                </Link>
              </div>
            </div>
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
            AuraBox isn't just a product - it's the foundation of India's first complete 
            smart healthcare ecosystem. Join us in making healthcare accessible to every family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pre-order"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Pre-Order Now
            </Link>
            <Link
              to="/investor"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Become an Investor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuraBox;