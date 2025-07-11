import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, Phone, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { countryCodes } from '../config/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const { 
    signup, 
    login, 
    loginWithGoogle, 
    loginWithPhone, 
    verifyPhoneCode, 
    loginAnonymously, 
    resetPassword, 
    setupRecaptcha,
    confirmationResult 
  } = useAuth();

  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | 'google' | 'anonymous'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    verificationCode: ''
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [phoneStep, setPhoneStep] = useState<'phone' | 'verification'>('phone');

  useEffect(() => {
    if (isOpen && authMethod === 'phone') {
      setupRecaptcha('recaptcha-container');
    }
  }, [isOpen, authMethod, setupRecaptcha]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!acceptedTerms) {
      setError('You must accept the terms and conditions');
      return false;
    }

    if (authMethod === 'email') {
      if (mode === 'signup' && !formData.name.trim()) {
        setError('Name is required');
        return false;
      }

      if (!formData.email.trim()) {
        setError('Email is required');
        return false;
      }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Email is invalid');
        return false;
      }

      if (!formData.password) {
        setError('Password is required');
        return false;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }

      if (mode === 'signup' && formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }

    if (authMethod === 'phone') {
      if (phoneStep === 'phone' && !formData.phoneNumber.trim()) {
        setError('Phone number is required');
        return false;
      }
      if (phoneStep === 'verification' && !formData.verificationCode.trim()) {
        setError('Verification code is required');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    
    try {
      if (authMethod === 'email') {
        if (mode === 'signup') {
          await signup(formData.email, formData.password, formData.name, acceptedTerms);
          setSuccess('Account created successfully! Welcome to Mediokart.');
        } else {
          await login(formData.email, formData.password, acceptedTerms);
          setSuccess('Logged in successfully! Welcome back.');
        }
      } else if (authMethod === 'phone') {
        if (phoneStep === 'phone') {
          const fullPhoneNumber = selectedCountryCode + formData.phoneNumber;
          await loginWithPhone(fullPhoneNumber, acceptedTerms);
          setPhoneStep('verification');
          setSuccess('Verification code sent to your phone!');
          setIsLoading(false);
          return;
        } else {
          await verifyPhoneCode(formData.verificationCode);
          setSuccess('Phone verified successfully! Welcome to Mediokart.');
        }
      } else if (authMethod === 'google') {
        await loginWithGoogle(acceptedTerms);
        setSuccess('Logged in with Google successfully!');
      } else if (authMethod === 'anonymous') {
        await loginAnonymously(acceptedTerms);
        setSuccess('Logged in anonymously! You can upgrade your account later.');
      }
      
      setTimeout(() => {
        setFormData({ name: '', email: '', password: '', confirmPassword: '', phoneNumber: '', verificationCode: '' });
        setSuccess('');
        setPhoneStep('phone');
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error('Auth error:', error);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Try logging in instead.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please choose a stronger password.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email. Please sign up first.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        case 'auth/invalid-phone-number':
          setError('Invalid phone number. Please check and try again.');
          break;
        case 'auth/invalid-verification-code':
          setError('Invalid verification code. Please try again.');
          break;
        default:
          setError(error.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(formData.email);
      setSuccess('Password reset email sent! Check your inbox.');
      setShowForgotPassword(false);
    } catch (error: any) {
      setError('Failed to send reset email. Please check your email address.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '', phoneNumber: '', verificationCode: '' });
    setError('');
    setSuccess('');
    setPhoneStep('phone');
    setAcceptedTerms(false);
  };

  const handleAuthMethodChange = (method: 'email' | 'phone' | 'google' | 'anonymous') => {
    setAuthMethod(method);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join Mediokart'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {mode === 'login' 
                ? 'Sign in to access your healthcare dashboard' 
                : 'Create your account to get started'
              }
            </p>
          </div>

          {/* Auth Method Selector */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              onClick={() => handleAuthMethodChange('email')}
              className={`p-3 rounded-lg border-2 transition-all ${
                authMethod === 'email'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Mail className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm font-medium">Email</span>
            </button>
            <button
              onClick={() => handleAuthMethodChange('phone')}
              className={`p-3 rounded-lg border-2 transition-all ${
                authMethod === 'phone'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Phone className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm font-medium">Phone</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              onClick={() => handleAuthMethodChange('google')}
              className={`p-3 rounded-lg border-2 transition-all ${
                authMethod === 'google'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="w-5 h-5 mx-auto mb-1 text-lg">🔍</div>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button
              onClick={() => handleAuthMethodChange('anonymous')}
              className={`p-3 rounded-lg border-2 transition-all ${
                authMethod === 'anonymous'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'
              }`}
            >
              <User className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm font-medium">Guest</span>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                <AlertCircle size={16} />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <CheckCircle size={16} />
                <span className="text-sm">{success}</span>
              </div>
            </div>
          )}

          {/* Google/Anonymous Auth */}
          {(authMethod === 'google' || authMethod === 'anonymous') && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms-simple"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms-simple" className="text-sm text-gray-600 dark:text-gray-300">
                  I accept the{' '}
                  <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading || !acceptedTerms}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? 'Processing...' : 
                 authMethod === 'google' ? 'Continue with Google' : 'Continue as Guest'}
              </button>
            </div>
          )}

          {/* Email/Phone Form */}
          {(authMethod === 'email' || authMethod === 'phone') && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {authMethod === 'email' && (
                <>
                  {mode === 'signup' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {authMethod === 'phone' && (
                <>
                  {phoneStep === 'phone' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="flex">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className="flex items-center space-x-2 px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            <span>{countryCodes.find(c => c.code === selectedCountryCode)?.flag}</span>
                            <span>{selectedCountryCode}</span>
                            <ChevronDown size={16} />
                          </button>
                          
                          {showCountryDropdown && (
                            <div className="absolute top-full left-0 z-10 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                              {countryCodes.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountryCode(country.code);
                                    setShowCountryDropdown(false);
                                  }}
                                  className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                                >
                                  <span>{country.flag}</span>
                                  <span className="text-sm">{country.country}</span>
                                  <span className="text-sm text-gray-500">{country.code}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className="flex-1 px-4 py-3 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        name="verificationCode"
                        value={formData.verificationCode}
                        onChange={handleInputChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Enter the verification code sent to {selectedCountryCode} {formData.phoneNumber}
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                  I accept the{' '}
                  <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || !acceptedTerms}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? 'Processing...' : 
                 authMethod === 'phone' && phoneStep === 'verification' ? 'Verify Code' :
                 authMethod === 'phone' ? 'Send Code' :
                 mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          )}

          {mode === 'login' && authMethod === 'email' && (
            <div className="mt-4 text-center">
              <button
                onClick={handleForgotPassword}
                disabled={isLoading}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm transition-colors disabled:opacity-50"
              >
                Forgot your password?
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  onModeChange(mode === 'login' ? 'signup' : 'login');
                  resetForm();
                }}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* reCAPTCHA container */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default AuthModal;