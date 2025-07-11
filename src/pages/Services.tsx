import React from 'react';
import { Stethoscope, Activity, Pill, Shield, Building, Brain, Clock, Users, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      icon: Stethoscope,
      title: "Telemedicine Platform",
      description: "Connect with certified doctors instantly through video consultations. Get prescriptions, second opinions, and follow-up care from the comfort of your home.",
      features: [
        "24/7 doctor availability",
        "Multi-specialty consultations",
        "Digital prescriptions",
        "Medical record integration",
        "Emergency consultations"
      ],
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      comingSoon: "Q3 2025"
    },
    {
      icon: Activity,
      title: "Digital Lab Tests",
      description: "Book comprehensive lab tests with home sample collection. Get accurate results delivered digitally with AI-powered health insights.",
      features: [
        "Home sample collection",
        "200+ test categories",
        "Fast digital reports",
        "Health trend analysis",
        "Doctor consultation included"
      ],
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      comingSoon: "Q4 2025"
    },
    {
      icon: Pill,
      title: "Smart Pharmacy",
      description: "Order medicines online with guaranteed authenticity. Smart refill reminders and automatic prescription management integrated with AuraBox.",
      features: [
        "Prescription auto-refill",
        "Medicine authenticity verification",
        "Same-day delivery",
        "Drug interaction warnings",
        "Cost optimization suggestions"
      ],
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      comingSoon: "Q1 2026"
    },
    {
      icon: Shield,
      title: "Health Insurance",
      description: "Comprehensive health insurance plans tailored for Indian families. Seamless claims processing with our partner network of hospitals.",
      features: [
        "Family health plans",
        "Cashless treatment",
        "Pre-existing condition coverage",
        "Wellness benefits",
        "Quick claim settlements"
      ],
      color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
      comingSoon: "Q2 2026"
    },
    {
      icon: Building,
      title: "Hospital Network",
      description: "Access to premium hospitals across India with bed availability tracking, appointment scheduling, and emergency admission support.",
      features: [
        "Premium hospital partnerships",
        "Real-time bed availability",
        "Emergency admission priority",
        "Specialist appointments",
        "Treatment cost transparency"
      ],
      color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
      comingSoon: "Q3 2026"
    },
    {
      icon: Brain,
      title: "Mediobot AI Assistant",
      description: "Advanced AI health assistant providing personalized health advice, symptom analysis, and proactive health monitoring for your entire family.",
      features: [
        "Symptom analysis",
        "Health risk assessment",
        "Personalized recommendations",
        "Medication management",
        "Emergency guidance"
      ],
      color: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
      comingSoon: "Q4 2026"
    }
  ];

  const ecosystemBenefits = [
    {
      icon: Clock,
      title: "Integrated Experience",
      description: "All services work together seamlessly, sharing your health data securely to provide personalized care."
    },
    {
      icon: Users,
      title: "Family Health Management",
      description: "Manage health records and services for your entire family from a single platform."
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Enterprise-grade security ensures your health data remains private and protected."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Complete Healthcare
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Ecosystem
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Beyond AuraBox - Building India's most comprehensive AI-driven healthcare platform
            </p>
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold">
              🚀 Future Services - Coming 2025-2026
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              The Future of Healthcare in India
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Each service designed to work seamlessly together, creating an unparalleled healthcare experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                  servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center`}>
                      <service.icon className="w-8 h-8" />
                    </div>
                    <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-sm font-semibold px-3 py-1 rounded-full">
                      {service.comingSoon}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 px-8 py-4">
                  <button className="w-full flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    <span>Join Waitlist</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Our Ecosystem Approach?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Individual services are powerful, but together they create something revolutionary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {ecosystemBenefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Integration Diagram */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Everything Connected Through AuraBox
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your smart first-aid companion serves as the central hub for all healthcare services
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
              <div className="grid grid-cols-2 gap-4">
                {services.slice(0, 4).map((service, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
                    <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {service.title.split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="text-white font-bold text-sm text-center">
                    AuraBox<br />Hub
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {services.slice(4, 6).map((service, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
                    <service.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {service.title.split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Service Launch Timeline
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our phased approach to building the complete healthcare ecosystem
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-600"></div>
            
            {services.map((service, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-3">
                      <service.icon className={`w-6 h-6 text-blue-600 dark:text-blue-400 ${index % 2 === 0 ? 'ml-2' : 'mr-2'}`} />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {service.description}
                    </p>
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold px-2 py-1 rounded">
                      {service.comingSoon}
                    </span>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Be First to Experience the Future
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our exclusive waitlist to get early access to each service as we launch. 
            Help us shape the future of healthcare in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/beta-program"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Join Complete Waitlist
            </Link>
            <Link
              to="/careers"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;