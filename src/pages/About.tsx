import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Clock, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [roadmapRef, roadmapInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const values = [
    {
      icon: TrendingUp,
      title: "Never Give Up",
      description: "Persistent innovation and determination to solve healthcare challenges"
    },
    {
      icon: Clock,
      title: "Create History",
      description: "Building revolutionary solutions that will change healthcare forever"
    },
    {
      icon: Users,
      title: "Self-Made Excellence",
      description: "Independent innovation with focus on quality and impact"
    },
    {
      icon: Target,
      title: "Calculated Risk-Taking",
      description: "Strategic decisions based on research and market understanding"
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Leading with cutting-edge technology and creative solutions"
    }
  ];

  const roadmapItems = [
    {
      year: "2024",
      title: "Concept Development & Market Research",
      description: "Deep market analysis, prototype conceptualization, and initial validation",
      status: "completed"
    },
    {
      year: "2025",
      title: "AuraBox MVP Design & Prototyping",
      description: "Complete product development, testing, and refinement of core features",
      status: "current"
    },
    {
      year: "2025",
      title: "Beta Testing & User Feedback",
      description: "Pilot program with select users, feedback collection, and improvements",
      status: "upcoming"
    },
    {
      year: "2026",
      title: "Product Launch Preparation",
      description: "Manufacturing setup, regulatory approvals, and market launch preparation",
      status: "upcoming"
    },
    {
      year: "2027",
      title: "Ecosystem Expansion Planning",
      description: "Integration of additional healthcare services and platform scaling",
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Mediokart
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The story behind India's most ambitious healthcare innovation
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section ref={storyRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${storyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Founder Image */}
              <div className="order-2 lg:order-1">
                <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://i.ibb.co/RG3Mf20w/1.jpg" 
                    alt="Aman Kumar Happy - Founder of Mediokart" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  The Founder's Journey
                </h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-600 mb-6">
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Growing up in a modest background in rural Bihar, I witnessed the challenges that millions face due to poor access to timely and reliable healthcare. These experiences shaped my determination to solve real-world problems through technology and build something that could truly make a difference."
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Now, as a first-year BTech CSE student, my passion for innovation and social impact led to the creation of Mediokart. The vision is clear: to develop intelligent, accessible healthcare solutions using AI and IoT—starting with AuraBox, the world's first smart first-aid system.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Mediokart is more than just a startup—it's a mission to transform healthcare in India, especially for those in underserved and rural communities who need it most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl">
              <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Making quality healthcare accessible to every Indian family through intelligent technology, 
                starting with revolutionary first-aid solutions and expanding into a complete healthcare ecosystem.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-2xl">
              <Eye className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                To build the world's most comprehensive AI-driven healthcare ecosystem that empowers 
                individuals, connects healthcare providers, and transforms how medical care is delivered globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that drive every decision and innovation at Mediokart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section ref={roadmapRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${roadmapInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From concept to India's leading healthcare ecosystem
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-start mb-12 transition-all duration-1000 ${
                  roadmapInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline dot */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 ${
                  item.status === 'completed' ? 'bg-green-500' :
                  item.status === 'current' ? 'bg-blue-500' :
                  'bg-gray-400'
                }`}>
                  {item.year}
                </div>

                {/* Content */}
                <div className="ml-6 flex-grow">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      {item.status === 'current' && (
                        <span className="ml-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of the revolution that's transforming healthcare across India. 
            Whether as an investor, partner, or team member, your contribution can help save lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/careers"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Join Our Team
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

export default About;