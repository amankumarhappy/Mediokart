import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Brain, Smartphone, Clock, Users, TrendingUp, Heart, Stethoscope, Activity, Pill, Phone, Building } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Newsletter from '../components/Newsletter';

const Home: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [problemRef, problemInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [solutionRef, solutionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ecosystemRef, ecosystemInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [newsletterRef, newsletterInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { value: "$50B", label: "Global Digital Health Market by 2026", color: "text-blue-600" },
    { value: "1.4B", label: "Population to Serve in India", color: "text-green-600" },
    { value: "24/7", label: "AI-Powered Healthcare Support", color: "text-purple-600" },
    { value: "85%", label: "Reduction in Emergency Response Time", color: "text-orange-600" }
  ];

  const problems = [
    {
      icon: Clock,
      title: "Emergency Response Delays",
      description: "Critical minutes lost during medical emergencies due to lack of immediate guidance and delayed healthcare access"
    },
    {
      icon: Pill,
      title: "Medication Management Crisis",
      description: "Over 40% of household medicines are expired or improperly stored, leading to unsafe and ineffective treatments"
    },
    {
      icon: Shield,
      title: "Healthcare Accessibility Gap",
      description: "Limited insurance coverage and high costs making quality healthcare inaccessible to millions of Indian families"
    },
    {
      icon: Building,
      title: "Fragmented Healthcare System",
      description: "Disconnected healthcare services making it difficult to access comprehensive, coordinated medical care"
    }
  ];

  const auraboxFeatures = [
    {
      icon: Brain,
      title: "Smart AI Assistant",
      description: "Intelligent guidance for medicine usage, dosage tracking, and emergency medical situations",
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    },
    {
      icon: Activity,
      title: "Advanced Medicine Tracking",
      description: "Automatic expiry date monitoring, inventory management, and smart refill reminders for all medications",
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
    },
    {
      icon: Smartphone,
      title: "Seamless App Integration",
      description: "Complete dashboard control, real-time monitoring, and family health management through mobile app",
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
    },
    {
      icon: Phone,
      title: "SOS Emergency System",
      description: "One-touch connection to nearest hospitals, emergency services, and designated emergency contacts",
      color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
    }
  ];

  const futureServices = [
    { icon: Stethoscope, title: "Telemedicine Platform", description: "Connect with certified doctors instantly" },
    { icon: Activity, title: "Digital Lab Tests", description: "Book comprehensive tests from home" },
    { icon: Pill, title: "Smart Pharmacy Network", description: "Verified medicine delivery at doorstep" },
    { icon: Shield, title: "Integrated Health Insurance", description: "Comprehensive family coverage plans" },
    { icon: Building, title: "Premium Hospital Network", description: "Access to top-tier healthcare facilities" },
    { icon: Brain, title: "Mediobot AI Assistant", description: "Advanced AI-powered health companion" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Revolutionizing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Healthcare
              </span>
              with AI and IoT
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              India's digital health market is projected to reach $50 billion by 2026, yet millions still lack access to quality, timely healthcare. 
              We're building the solution starting with AuraBox - India's First Smart First-Aid Companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/aurabox"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
              >
                <span>Discover AuraBox MVP</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/investor"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                For Investors
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                  <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section ref={problemRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${problemInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              The Healthcare Crisis We're Solving
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Despite India's growing digital health market, critical gaps in healthcare accessibility, 
              emergency response, and medication management affect millions of families daily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  problemInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center mb-4">
                  <problem.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {problem.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AuraBox Solution */}
      <section ref={solutionRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${solutionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Introducing AuraBox
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              The world's first smart first-aid box that combines AI intelligence with IoT technology 
              to revolutionize emergency healthcare response and medication management
            </p>
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-8">
                🚀 Currently in Development - MVP Coming Q3 2025
              </div>
            </div>
          </div>

          {/* Placeholder for AuraBox Image */}
          <div className="mb-16 text-center">
            <div className="w-full max-w-3xl mx-auto h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-300 dark:border-blue-700">
              <div className="text-center">
                <Heart className="w-20 h-20 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
                  [You have to add here: Professional 3D render/photo of AuraBox]
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                  360° product view, lifestyle shots, video demonstration
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {auraboxFeatures.map((feature, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  solutionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
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

          <div className="text-center mt-12">
            <Link
              to="/aurabox"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Learn More About AuraBox
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Future Ecosystem */}
      <section ref={ecosystemRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${ecosystemInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Healthcare Ecosystem
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              AuraBox is just the beginning. We're building India's most comprehensive AI-driven healthcare platform 
              with multiple medical devices and services under the Mediokart umbrella
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {futureServices.map((service, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden ${
                  ecosystemInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs font-semibold px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Explore All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Built for Trust & Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Never Give Up</h3>
              <p className="text-gray-600 dark:text-gray-300">Persistent innovation in healthcare solutions that save lives</p>
            </div>
            <div className="p-6">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Create History</h3>
              <p className="text-gray-600 dark:text-gray-300">Building India's first smart healthcare ecosystem for millions</p>
            </div>
            <div className="p-6">
              <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation First</h3>
              <p className="text-gray-600 dark:text-gray-300">AI-powered solutions for accessible, quality healthcare</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join us in revolutionizing healthcare access across India. Whether you're an investor, 
            partner, or future team member, let's build the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/careers"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Join Our Team
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;