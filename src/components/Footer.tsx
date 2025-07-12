import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, FileText } from 'lucide-react';
import Newsletter from './Newsletter';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Newsletter Section */}
        <div className="mb-8 lg:mb-12">
          <Newsletter variant="footer" />
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <img 
                src="https://i.ibb.co/QjQgpJPz/logo-removebg-preview.png" 
                alt="Mediokart" 
                className="h-16 w-auto mb-4"
              />
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md">
                Revolutionizing healthcare with AI and IoT technology. Starting with AuraBox - 
                India's first smart first-aid companion, building towards a complete healthcare ecosystem.
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/people/Mediokart/61577391189148/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200 transform hover:scale-110" 
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://x.com/Mediokart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110" 
                aria-label="Twitter/X"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/mediokart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200 transform hover:scale-110" 
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.instagram.com/mediokart.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200 transform hover:scale-110" 
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            {/* Mobile: Horizontal layout, Desktop: Vertical layout */}
            <ul className="flex flex-wrap gap-x-4 gap-y-2 lg:flex-col lg:space-y-2 lg:gap-0">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/aurabox" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
                >
                  AuraBox
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/surveys" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
                >
                  Surveys
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            {/* Mobile: Horizontal layout, Desktop: Vertical layout */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:space-y-3 lg:gap-0 mb-6">
              <div className="flex items-start space-x-3">
                <Mail size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                <a 
                  href="mailto:mediokart@zohomail.in"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base break-all"
                >
                  mediokart@zohomail.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-400 flex-shrink-0" />
                <a 
                  href="tel:+919153737258"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
                >
                  +91 9153737258
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base whitespace-nowrap">Buxar, India</span>
              </div>
            </div>

            {/* Survey Button */}
            <Link
              to="/surveys"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <FileText size={16} className="mr-2" />
              Take Survey
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-6 lg:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © 2025 Mediokart. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;