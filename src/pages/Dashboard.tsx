import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (!currentUser) return;
    const unsub = onSnapshot(doc(db, 'users', currentUser.uid), (docSnap) => {
      setUserData(docSnap.exists() ? docSnap.data() : null);
    });
    return () => unsub();
  }, [currentUser]);

  if (!userData) return <div className="p-8 font-sans text-gray-900 dark:text-white">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      {/* Personal Welcome Message */}
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Welcome back, {userData.displayName || userData.firstName || 'User'} <span role="img" aria-label="wave">👋</span>
      </h1>

      {/* Snapshot Panel */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Snapshot Panel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="font-medium">Last Doctor Consultation</div>
            <div className="text-gray-500 dark:text-gray-400">Coming soon</div>
          </div>
          <div className="border rounded p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="font-medium">Last Lab Test</div>
            <div className="text-gray-500 dark:text-gray-400">Coming soon</div>
          </div>
          <div className="border rounded p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="font-medium">Last Medicine Delivery</div>
            <div className="text-gray-500 dark:text-gray-400">Coming soon</div>
          </div>
          <div className="border rounded p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="font-medium">Total Orders (Medicines & AuraBox Device)</div>
            <div className="text-gray-500 dark:text-gray-400">Coming soon</div>
          </div>
          <div className="border rounded p-3 col-span-1 md:col-span-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="font-medium">Subscription Status</div>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs">Free Version</span>
              <button className="ml-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition" onClick={() => alert('Upgrade coming soon!')}>Upgrade</button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition" onClick={() => alert('Coming soon')}>Book Appointment</button>
          <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition" onClick={() => alert('Coming soon')}>View Health Summary</button>
          <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition" onClick={() => alert('Coming soon')}>Check Reminders</button>
          <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition" onClick={() => alert('Coming soon')}>Renew Subscription</button>
        </div>
      </div>

      {/* AuraBox Device Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">AuraBox Device</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded mb-2 hover:bg-indigo-700 transition" onClick={() => alert('Coming soon')}>Add AuraBox Device</button>
        <div className="text-gray-500 dark:text-gray-400">Device name where account is login: <span className="font-medium">Coming soon</span></div>
      </div>
    </div>
  );
};

export default Dashboard;
