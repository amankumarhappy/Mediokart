import React, { useState, useCallback } from 'react';
import { User, LogOut, Settings, Heart, ChevronDown, Shield, Phone, Mail, FileText, Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserMenu: React.FC = () => {
  const { currentUser, userData, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Logout button component for reuse
  const LogoutButton = () => (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleLogout(e);
      }}
      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Sign Out
    </button>
  );

  const handleLogout = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Close menus first to avoid any state updates after unmount
    setIsOpen(false);
    setMobileMenuOpen(false);
    
    const loadingToast = toast.loading('Signing out...');
    
    try {
      // Perform logout
      await logout();
      // The auth context will handle the redirect
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to sign out. Please try again.');
      // If there's an error, we can try to force a redirect
      window.location.href = '/';
    } finally {
      toast.dismiss(loadingToast);
    }
  }, [logout]);

  if (!currentUser) return null;

  const getAuthMethodIcon = () => {
    switch (userData?.authMethod) {
      case 'google':
        return '🔍';
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'anonymous':
        return <Shield className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getAuthMethodLabel = () => {
    switch (userData?.authMethod) {
      case 'google':
        return 'Google Account';
      case 'phone':
        return 'Phone Account';
      case 'anonymous':
        return 'Guest Account';
      default:
        return 'Email Account';
    }
  };

  // Menu options for reuse
  const menuOptions = (
    <>
      <button onClick={() => { setIsOpen(false); setMobileMenuOpen(false); navigate('/profile'); }} className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <User className="w-4 h-4" />
        <span>Profile</span>
      </button>
      <button onClick={() => { setIsOpen(false); setMobileMenuOpen(false); navigate('/dashboard'); }} className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <Heart className="w-4 h-4" />
        <span>Dashboard</span>
      </button>
      <button onClick={() => { setIsOpen(false); setMobileMenuOpen(false); navigate('/my-devices'); }} className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <Shield className="w-4 h-4" />
        <span>My Devices</span>
      </button>
      <button onClick={() => { setIsOpen(false); setMobileMenuOpen(false); navigate('/ai-assistant'); }} className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <Mail className="w-4 h-4" />
        <span>AI Health Assistant</span>
      </button>
      <button onClick={() => { setIsOpen(false); setMobileMenuOpen(false); navigate('/appointments'); }} className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <Phone className="w-4 h-4" />
        <span>Appointments</span>
      </button>
      <button onClick={() => { setIsOpen(false); setMobileMenuOpen(false); navigate('/orders'); }} className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <FileText className="w-4 h-4" />
        <span>Orders</span>
      </button>
      <button onClick={() => { setIsOpen(false); setMobileMenuOpen(false); navigate('/learning-center'); }} className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <Heart className="w-4 h-4" />
        <span>Learning Center</span>
      </button>
      <button onClick={() => { setIsOpen(false); setMobileMenuOpen(false); navigate('/settings'); }} className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <Settings className="w-4 h-4" />
        <span>Settings</span>
      </button>
    </>
  );

  return (
    <div className="relative">
      {/* Desktop UserMenu Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="User menu"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          {currentUser.photoURL ? (
            <img 
              src={currentUser.photoURL} 
              alt="Profile" 
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
          {userData?.displayName || currentUser.email?.split('@')[0] || 'Guest'}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg"
        aria-label="Open user menu"
        onClick={() => setMobileMenuOpen(true)}
      >
        <MenuIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Desktop Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {userData?.displayName || userData?.firstName || 'User'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentUser.email || currentUser.phoneNumber || 'Guest User'}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getAuthMethodIcon()}
                    <span className="text-xs text-gray-400">
                      {getAuthMethodLabel()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-2">
              {menuOptions}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 py-2">
              <LogoutButton />
            </div>
          </div>
        </>
      )}

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex">
          <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative ml-auto w-72 max-w-full h-full bg-white dark:bg-gray-900 shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Profile" className="w-10 h-10 rounded-full" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-base">
                    {userData?.displayName || userData?.firstName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {currentUser.email || currentUser.phoneNumber || 'Guest User'}
                  </p>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <CloseIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {menuOptions}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 py-2">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;