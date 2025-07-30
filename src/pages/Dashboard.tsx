import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, onSnapshot, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { Calendar, Mail, User, MessageSquare, Edit, LogIn, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    
    // Fetch user profile
    const unsub = onSnapshot(doc(db, 'Profile', currentUser.uid), (docSnap) => {
      setUserData(docSnap.exists() ? docSnap.data() : null);
    });

    // Fetch recent activities
    const fetchActivities = async () => {
      try {
        const activitiesQuery = query(
          collection(db, 'Activities'),
          where('userId', '==', currentUser.uid),
          orderBy('timestamp', 'desc'),
          limit(10)
        );
        const activitiesSnapshot = await getDocs(activitiesQuery);
        const activitiesData = activitiesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate()
        }));
        setActivities(activitiesData);
      } catch (error) {
        console.warn('Could not fetch activities:', error);
        setActivities([]);
      } finally {
        setLoadingActivities(false);
      }
    };

    fetchActivities();
    
    return () => unsub();
  }, [currentUser]);

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'user_signup':
      case 'user_login':
        return <LogIn className="w-4 h-4" />;
      case 'profile_update':
        return <Edit className="w-4 h-4" />;
      case 'newsletter_subscription':
        return <Mail className="w-4 h-4" />;
      case 'contact_form_submission':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getActivityColor = (activityType: string) => {
    switch (activityType) {
      case 'user_signup':
      case 'user_login':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      case 'profile_update':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20';
      case 'newsletter_subscription':
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20';
      case 'contact_form_submission':
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getActivityTitle = (activityType: string, details: any) => {
    switch (activityType) {
      case 'user_signup':
        return `Account created via ${details?.method || 'email'}`;
      case 'user_login':
        return `Logged in via ${details?.method || 'email'}`;
      case 'profile_update':
        return 'Profile information updated';
      case 'newsletter_subscription':
        return 'Subscribed to newsletter';
      case 'contact_form_submission':
        return `Contact form submitted: ${details?.subject || 'General inquiry'}`;
      default:
        return 'Activity recorded';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    if (!timestamp) return 'Recently';
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return timestamp.toLocaleDateString();
  };

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

      {/* Recent Activity Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Activity</h2>
          <Clock className="w-5 h-5 text-gray-500" />
        </div>
        
        {loadingActivities ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Loading activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Your activities will appear here as you use the platform</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className={`p-2 rounded-full ${getActivityColor(activity.activityType)}`}>
                  {getActivityIcon(activity.activityType)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {getActivityTitle(activity.activityType, activity.details)}
                  </p>
                  {activity.details && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.activityType === 'contact_form_submission' && activity.details.priority && 
                        `Priority: ${activity.details.priority}`}
                      {activity.activityType === 'newsletter_subscription' && activity.details.email && 
                        `Email: ${activity.details.email}`}
                      {activity.activityType === 'profile_update' && activity.details.sections && 
                        `Updated: ${activity.details.sections.join(', ')}`}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
            ))}
            
            {activities.length >= 10 && (
              <div className="text-center pt-4">
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  View all activities
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
