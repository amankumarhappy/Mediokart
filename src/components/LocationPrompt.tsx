import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const LocationPrompt: React.FC = () => {
  const { currentUser } = useAuth();
  const [location, setLocation] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser) return;
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const loc = `${position.coords.latitude},${position.coords.longitude}`;
        setLocation(loc);
        await updateDoc(doc(db, 'users', currentUser.uid), { location: loc });
      },
      () => setError('Unable to retrieve your location.')
    );
  }, [currentUser]);

  if (!currentUser) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-900 p-4 rounded shadow-lg z-50">
      {location ? (
        <span>Location saved: {location}</span>
      ) : error ? (
        <span className="text-red-600">{error}</span>
      ) : (
        <span>Detecting your location...</span>
      )}
    </div>
  );
};

export default LocationPrompt;
