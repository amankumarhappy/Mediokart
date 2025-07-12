import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, LayoutDashboard, TabletSmartphone, Bot, Calendar, ShoppingBag, BookOpen, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import UserMenu from './UserMenu';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login'
  });
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const location = useLocation();
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'AuraBox', href: '/aurabox' },
    { name: 'Services', href: '/services' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Increased Size */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://i.ibb.co/QjQgpJPz/logo-removebg-preview.png" 
                alt="Mediokart" 
                className="h-20 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* Auth Section */}
              {currentUser ? (
                <div className="relative group">
                  <button
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-lg transition-colors duration-200 focus:outline-none"
                  >
                    <User size={18} />
                    <span>Account</span>
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all duration-200">
                    <div className="p-3">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 pl-1">Account</div>
                      <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <User size={18} /> Profile
                      </Link>
                      <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>
                      <Link to="/my-devices" className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <TabletSmartphone size={18} /> My Devices
                      </Link>
                      <Link to="/ai-health-assistant" className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <Bot size={18} /> AI Health Assistant
                      </Link>
                      <Link to="/appointments" className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <Calendar size={18} /> Appointments
                      </Link>
                      <Link to="/orders" className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <ShoppingBag size={18} /> Orders
                      </Link>
                      <Link to="/learning-center" className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <BookOpen size={18} /> Learning Center
                      </Link>
                      <Link to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <Settings size={18} /> Settings
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      <button
                        onClick={() => {
                          if (typeof window !== 'undefined') window.location.href = '/';
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <LogOut size={18} /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* CTA Button */}
              <Link
                to="/aurabox"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                Discover AuraBox
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                {/* If not showing account menu, show main nav and account button */}
                {currentUser && showAccountMenu ? (
                  <div className="pt-2">
                    <button
                      onClick={() => setShowAccountMenu(false)}
                      className="flex items-center gap-2 mb-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                      Back
                    </button>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow p-3 mb-3">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 pl-1">Account</div>
                      <Link to="/profile" onClick={() => { setIsOpen(false); setShowAccountMenu(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"><User size={18} /> Profile</Link>
                      <Link to="/dashboard" onClick={() => { setIsOpen(false); setShowAccountMenu(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"><LayoutDashboard size={18} /> Dashboard</Link>
                      <Link to="/my-devices" onClick={() => { setIsOpen(false); setShowAccountMenu(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"><TabletSmartphone size={18} /> My Devices</Link>
                      <Link to="/ai-health-assistant" onClick={() => { setIsOpen(false); setShowAccountMenu(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"><Bot size={18} /> AI Health Assistant</Link>
                      <Link to="/appointments" onClick={() => { setIsOpen(false); setShowAccountMenu(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"><Calendar size={18} /> Appointments</Link>
                      <Link to="/orders" onClick={() => { setIsOpen(false); setShowAccountMenu(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"><ShoppingBag size={18} /> Orders</Link>
                      <Link to="/learning-center" onClick={() => { setIsOpen(false); setShowAccountMenu(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg textBase font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"><BookOpen size={18} /> Learning Center</Link>
                      <Link to="/settings" onClick={() => { setIsOpen(false); setShowAccountMenu(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg textBase font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"><Settings size={18} /> Settings</Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      <button
                        onClick={() => {
                          if (typeof window !== 'undefined') window.location.href = '/';
                          setIsOpen(false); setShowAccountMenu(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg textBase font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <LogOut size={18} /> Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {currentUser ? (
                      <button
                        onClick={() => setShowAccountMenu(true)}
                        className="flex items-center gap-2 w-full px-3 py-2 mt-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <User size={18} /> Account
                      </button>
                    ) : (
                      <div className="pt-4 space-y-2">
                        <button
                          onClick={() => {
                            openAuthModal('login');
                            setIsOpen(false);
                          }}
                          className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => {
                            openAuthModal('signup');
                            setIsOpen(false);
                          }}
                          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                          Sign Up
                        </button>
                      </div>
                    )}
                    <Link
                      to="/aurabox"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 rounded-lg font-medium mt-4 transition-all duration-200"
                    >
                      Discover AuraBox
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        mode={authModal.mode}
        onModeChange={(mode) => setAuthModal({ isOpen: true, mode })}
      />
    </>
  );
};

export default Navbar;