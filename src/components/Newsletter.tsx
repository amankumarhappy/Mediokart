import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { db, trackActivity } from '../config/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

interface NewsletterProps {
  variant?: 'inline' | 'modal' | 'footer';
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ variant = 'inline', className = '' }) => {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Try to save to Firestore with error handling
      try {
        // Check if email already exists
        const existingEmailQuery = query(
          collection(db, 'Newsletter'),
          where('email', '==', email)
        );
        const existingEmails = await getDocs(existingEmailQuery);

        if (!existingEmails.empty) {
          setMessage('You\'re already subscribed to our newsletter!');
          setEmail('');
          setStatus('idle');
          return;
        }

        // Save to Firestore
        await addDoc(collection(db, 'Newsletter'), {
          email,
          source: 'newsletter',
          subscribedAt: new Date(),
          status: 'active'
        });

        // Track activity if user is logged in
        if (currentUser) {
          await trackActivity(currentUser.uid, 'newsletter_subscription', {
            email,
            source: 'newsletter',
            variant
          });
        }
      } catch (firestoreError: any) {
        console.warn('Firestore save failed, continuing with email subscription:', firestoreError);
        // Continue even if Firestore fails
      }

      // Send via email as backup
      const response = await fetch('https://formspree.io/f/xannelqp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'newsletter',
          _subject: 'Newsletter Subscription - Mediokart',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing! You\'ll receive updates about AuraBox and our healthcare innovations.');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'footer':
        return 'bg-gray-800 dark:bg-gray-900 text-white p-6 rounded-lg';
      case 'modal':
        return 'bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md mx-auto';
      default:
        return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl';
    }
  };

  return (
    <div className={`${getVariantStyles()} ${className}`}>
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-white/20 dark:bg-blue-600/20 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-white dark:text-blue-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">
          {variant === 'footer' ? 'Stay Updated' : 'Join Our Newsletter'}
        </h3>
        <p className="text-blue-100 dark:text-gray-300">
          Get the latest updates on AuraBox development, healthcare insights, and company news.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700 dark:focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {status === 'success' && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-4 mt-4">
            <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
              <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
              <div>
                <p className="font-semibold">Successfully Subscribed!</p>
                <p className="text-sm">{message}</p>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center space-x-2 text-red-200 dark:text-red-400">
            <AlertCircle size={16} />
            <span className="text-sm">{message}</span>
          </div>
        )}

        <p className="text-blue-100 dark:text-gray-400 text-xs text-center">
          No spam, unsubscribe at any time. We respect your privacy.
        </p>
      </form>
    </div>
  );
};

export default Newsletter;