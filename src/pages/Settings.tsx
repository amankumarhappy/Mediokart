import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Settings: React.FC = () => {
  const { currentUser, resetPassword, logout } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    if (!currentUser?.email) return;
    try {
      await resetPassword(currentUser.email);
      setEmailSent(true);
      setError('');
    } catch (err) {
      setError('Failed to send reset email.');
    }
  };

  // Placeholder for delete account
  const handleDeleteAccount = async () => {
    setShowDelete(false);
    alert('Account deletion coming soon (Firebase integration required).');
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading('Signing out...');

    try {
      await logout();
      // Note: No need to navigate, AuthContext logout will handle redirect
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to sign out. Please try again.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h1>
      {/* a. Profile Settings */}
      <section className="bg-white dark:bg-gray-900 rounded-lg shadow p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Profile Settings</h2>
          <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Edit Profile</button>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your name, email, phone, and more.</p>
      </section>
      {/* b. Notification Preferences */}
      <section className="bg-white dark:bg-gray-900 rounded-lg shadow p-5 mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Notification Preferences</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" disabled /> Appointments <span className="text-xs text-gray-400">(Coming soon)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" disabled /> Offers & updates <span className="text-xs text-gray-400">(Coming soon)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" disabled /> Health alerts <span className="text-xs text-gray-400">(Coming soon)</span>
          </label>
        </div>
        <div className="mt-2 flex flex-wrap gap-4">
          <span className="font-medium">Channels:</span>
          <label className="flex items-center gap-1"><input type="checkbox" disabled /> Email</label>
          <label className="flex items-center gap-1"><input type="checkbox" disabled /> SMS</label>
          <label className="flex items-center gap-1"><input type="checkbox" disabled /> App</label>
        </div>
      </section>
      {/* c. Security */}
      <section className="bg-white dark:bg-gray-900 rounded-lg shadow p-5 mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Security</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          <button onClick={handlePasswordReset} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Send Password Reset Email</button>
          <button disabled className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded cursor-not-allowed">Enable 2FA <span className='text-xs'>(Coming soon)</span></button>
          <button disabled className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded cursor-not-allowed">View Login History <span className='text-xs'>(Coming soon)</span></button>
          <button disabled className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded cursor-not-allowed">Device Management <span className='text-xs'>(Coming soon)</span></button>
        </div>
        {emailSent && <div className="text-green-600 mt-2">Reset email sent!</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </section>
      {/* Danger Zone */}
      <section className="bg-white dark:bg-gray-900 rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold mb-2 text-red-600">Danger Zone</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Sign Out
          </button>
          <button onClick={() => setShowDelete(true)} className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 dark:bg-red-900/20 dark:text-red-300 transition">Delete Account</button>
        </div>
        {showDelete && (
          <div className="mt-4 bg-red-50 dark:bg-red-900/20 p-4 rounded">
            <p className="mb-2 text-gray-900 dark:text-gray-100">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-600 text-white rounded">Yes, Delete</button>
              <button onClick={() => setShowDelete(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded">Cancel</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Settings;
