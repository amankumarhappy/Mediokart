import React from 'react';
import { Users, Lightbulb, TrendingUp, Heart, Code, Pen, Video, Palette, Brain, DollarSign, Stethoscope, Megaphone, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Careers: React.FC = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [cultureRef, cultureInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [rolesRef, rolesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const cultureValues = [
    {
      icon: Heart,
      title: "Mission-Driven Work",
      description: "Every line of code, every design, every decision directly impacts lives and healthcare accessibility"
    },
    {
      icon: Lightbulb,
      title: "Innovation & Creativity",
      description: "We encourage bold ideas and creative solutions to complex healthcare challenges"
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      description: "Grow your skills while building cutting-edge healthcare technology"
    },
    {
      icon: Users,
      title: "Collaborative Team",
      description: "Work with passionate individuals who share your vision for better healthcare"
    }
  ];

  const openRoles = [
    {
      icon: Users,
      title: "Co-founder Positions",
      department: "Leadership",
      type: "Equity",
      description: "Join as a founding team member and help shape the future of Mediokart",
      specializations: ["Tech Co-founder", "Pharma Co-founder", "Finance Co-founder"],
      requirements: [
        "5+ years relevant industry experience",
        "Entrepreneurial mindset and leadership skills",
        "Passion for healthcare innovation",
        "Ability to work in high-pressure startup environment"
      ]
    },
    {
      icon: Code,
      title: "Frontend/Backend Developers",
      department: "Technology",
      type: "Full-time/Contract",
      description: "Build scalable web applications and mobile apps for our healthcare ecosystem",
      specializations: ["React/React Native", "Node.js/Python", "Cloud Architecture"],
      requirements: [
        "3+ years development experience",
        "Experience with healthcare/medical applications preferred",
        "Knowledge of security best practices",
        "Experience with AI/ML integration is a plus"
      ]
    },
    {
      icon: Brain,
      title: "AI/ML Engineers",
      department: "Technology",
      type: "Full-time/Contract",
      description: "Develop intelligent algorithms for health monitoring and predictive analytics",
      specializations: ["Computer Vision", "NLP", "Predictive Analytics"],
      requirements: [
        "Master's in AI/ML or equivalent experience",
        "Experience with healthcare data",
        "Python/TensorFlow/PyTorch expertise",
        "Understanding of medical privacy regulations"
      ]
    },
    {
      icon: Palette,
      title: "UI/UX Designers",
      department: "Design",
      type: "Full-time/Part-time",
      description: "Create intuitive and accessible healthcare interfaces that save lives",
      specializations: ["Mobile App Design", "Web Design", "Healthcare UX"],
      requirements: [
        "3+ years UI/UX design experience",
        "Portfolio showcasing healthcare/medical apps",
        "Proficiency in Figma, Adobe Creative Suite",
        "Understanding of accessibility standards"
      ]
    },
    {
      icon: Pen,
      title: "Content Writers",
      department: "Marketing",
      type: "Part-time/Contract",
      description: "Create compelling content that educates and engages our healthcare audience",
      specializations: ["Medical Writing", "Blog Content", "Technical Documentation"],
      requirements: [
        "Experience in healthcare/medical writing",
        "SEO knowledge and content marketing skills",
        "Ability to simplify complex medical concepts",
        "Research and fact-checking capabilities"
      ]
    },
    {
      icon: Video,
      title: "Video Editors",
      department: "Marketing",
      type: "Part-time/Contract",
      description: "Produce educational and marketing videos for our healthcare products",
      specializations: ["Educational Videos", "Product Demos", "Social Media Content"],
      requirements: [
        "2+ years video editing experience",
        "Proficiency in Adobe Premiere, After Effects",
        "Experience with healthcare/medical content",
        "Understanding of social media video formats"
      ]
    },
    {
      icon: Stethoscope,
      title: "Healthcare Professionals",
      department: "Medical Advisory",
      type: "Advisory/Part-time",
      description: "Provide medical expertise and validate our healthcare solutions",
      specializations: ["General Medicine", "Emergency Medicine", "Public Health"],
      requirements: [
        "MBBS or equivalent medical degree",
        "Active medical practice experience",
        "Interest in healthcare technology",
        "Strong communication skills"
      ]
    },
    {
      icon: Megaphone,
      title: "Digital Marketing Specialists",
      department: "Marketing",
      type: "Full-time/Part-time",
      description: "Drive growth and awareness for our healthcare innovations",
      specializations: ["Social Media Marketing", "Performance Marketing", "Healthcare Marketing"],
      requirements: [
        "2+ years digital marketing experience",
        "Experience with healthcare marketing preferred",
        "Data-driven approach to marketing",
        "Knowledge of healthcare regulations"
      ]
    }
  ];

  const perks = [
    "Equity participation in a revolutionary healthcare startup",
    "Skill development in cutting-edge healthcare technology",
    "Direct impact on millions of lives across India",
    "Flexible work arrangements and remote-friendly culture",
    "Learning opportunities with industry experts",
    "Future full-time opportunities as we scale",
    "Access to healthcare industry network and events",
    "Professional development budget"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Join the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Revolution
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Help us build India's first AI-powered healthcare ecosystem. Be part of something that will impact millions of lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#open-roles"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
              >
                <span>View Open Positions</span>
                <ArrowRight size={20} />
              </a>
              <a
                href="#culture"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Our Culture
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Join Mediokart?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              More than a job - it's an opportunity to create history in healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Impact Millions of Lives
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your work directly contributes to making healthcare accessible across India
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Exponential Growth
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Grow with a rapidly scaling startup in the massive healthcare market
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Equity Opportunity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Participate in our success with equity compensation and future financial rewards
              </p>
            </div>
          </div>

          {/* Perks Grid */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              What We Offer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {perks.map((perk, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section ref={cultureRef} id="culture" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${cultureInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Culture & Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built on the foundation of never giving up and creating history
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureValues.map((value, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  cultureInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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

      {/* Open Roles */}
      <section ref={rolesRef} id="open-roles" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${rolesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join our growing team and help build the future of healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {openRoles.map((role, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                  rolesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <role.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {role.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>{role.department}</span>
                          <span>•</span>
                          <span>{role.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {role.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Specializations:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {role.specializations.map((spec, specIndex) => (
                        <span
                          key={specIndex}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium px-2 py-1 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Requirements:
                    </h4>
                    <ul className="space-y-2">
                      {role.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-300 text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 px-8 py-4">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Application Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A transparent and efficient hiring process designed to find the right fit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Application", description: "Submit your application with portfolio/resume" },
              { step: "02", title: "Initial Review", description: "We review your application and skills" },
              { step: "03", title: "Interview", description: "Video interview to discuss your experience" },
              { step: "04", title: "Welcome!", description: "Onboarding and integration into the team" }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make History?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join a mission-driven team that's transforming healthcare for millions. 
            Your skills can help save lives and create lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105">
              Apply for Any Position
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
              Send General Inquiry
            </button>
          </div>
          <p className="text-blue-100 mt-6 text-sm">
            Don't see a perfect fit? We're always looking for exceptional talent. Reach out!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Careers;