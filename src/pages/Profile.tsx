
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, updateDoc, onSnapshot, setDoc } from 'firebase/firestore';

const bloodGroups = [
  '', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];
const genders = ['', 'Male', 'Female', 'Other'];

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    fullName: '',
    gender: '',
    dob: '',
    age: '',
    bloodGroup: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    email: '',
    phoneNumber: '',
    alternateNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    height: '',
    weight: '',
    bmi: '',
    allergies: '',
    chronic: '',
    medications: '',
    familyHistory: ''
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Real-time sync with Firestore
  useEffect(() => {
    if (!currentUser) return;
    
    const unsubscribers: (() => void)[] = [];
    
    // Listen to main profile
    const profileUnsub = onSnapshot(doc(db, 'Profile', currentUser.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(prev => ({
          ...prev,
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          fullName: data.displayName || ''
        }));
      }
    });
    unsubscribers.push(profileUnsub);
    
    // Listen to Basic Information
    const basicInfoUnsub = onSnapshot(doc(db, 'Profile', currentUser.uid, 'Basic Information', 'data'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(prev => ({
          ...prev,
          gender: data.gender || '',
          dob: data.dob || '',
          bloodGroup: data.bloodGroup || '',
          emergencyContactName: data.emergencyContactName || '',
          emergencyContactNumber: data.emergencyContactNumber || ''
        }));
      }
    });
    unsubscribers.push(basicInfoUnsub);
    
    // Listen to Contact Information
    const contactInfoUnsub = onSnapshot(doc(db, 'Profile', currentUser.uid, 'Contact Information', 'data'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(prev => ({
          ...prev,
          alternateNumber: data.alternateNumber || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          pincode: data.pincode || '',
          country: data.country || ''
        }));
      }
    });
    unsubscribers.push(contactInfoUnsub);
    
    // Listen to Health Profile
    const healthProfileUnsub = onSnapshot(doc(db, 'Profile', currentUser.uid, 'Health Profile', 'data'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(prev => ({
          ...prev,
          height: data.height || '',
          weight: data.weight || '',
          allergies: data.allergies || '',
          chronic: data.chronic || '',
          medications: data.medications || '',
          familyHistory: data.familyHistory || ''
        }));
      }
    });
    unsubscribers.push(healthProfileUnsub);
    
    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [currentUser]);

  // Calculate age and BMI
  useEffect(() => {
    if (profile.dob) {
      const birth = new Date(profile.dob);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      setProfile((p) => ({ ...p, age: age > 0 ? String(age) : '' }));
    }
    if (profile.height && profile.weight) {
      const h = parseFloat(profile.height) / 100;
      const w = parseFloat(profile.weight);
      if (h && w) {
        const bmi = (w / (h * h)).toFixed(1);
        setProfile((p) => ({ ...p, bmi }));
      }
    }
  }, [profile.dob, profile.height, profile.weight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setSaving(true);
    
    try {
      // Update main profile
      await setDoc(doc(db, 'Profile', currentUser.uid), {
        displayName: profile.fullName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        updatedAt: new Date()
      }, { merge: true });
      
      // Update Basic Information
      await setDoc(doc(db, 'Profile', currentUser.uid, 'Basic Information', 'data'), {
        firstName: profile.fullName.split(' ')[0] || '',
        lastName: profile.fullName.split(' ').slice(1).join(' ') || '',
        gender: profile.gender,
        dob: profile.dob,
        age: profile.age,
        bloodGroup: profile.bloodGroup,
        emergencyContactName: profile.emergencyContactName,
        emergencyContactNumber: profile.emergencyContactNumber,
        updatedAt: new Date()
      }, { merge: true });
      
      // Update Contact Information
      await setDoc(doc(db, 'Profile', currentUser.uid, 'Contact Information', 'data'), {
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        alternateNumber: profile.alternateNumber,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        pincode: profile.pincode,
        country: profile.country,
        updatedAt: new Date()
      }, { merge: true });
      
      // Update Health Profile
      await setDoc(doc(db, 'Profile', currentUser.uid, 'Health Profile', 'data'), {
        height: profile.height,
        weight: profile.weight,
        bmi: profile.bmi,
        allergies: profile.allergies,
        chronic: profile.chronic,
        medications: profile.medications,
        familyHistory: profile.familyHistory,
        updatedAt: new Date()
      }, { merge: true });
      
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Profile</h1>
      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. Basic Information */}
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input name="fullName" value={profile.fullName} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select name="gender" value={profile.gender} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                {genders.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input type="date" name="dob" value={profile.dob} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input value={profile.age} readOnly className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Blood Group</label>
              <select name="bloodGroup" value={profile.bloodGroup} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Emergency Contact Name</label>
              <input name="emergencyContactName" value={profile.emergencyContactName} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Emergency Contact Number</label>
              <input name="emergencyContactNumber" value={profile.emergencyContactNumber} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
          </div>
        </section>
        {/* 2. Contact Information */}
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input name="email" value={profile.email} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile Number</label>
              <input name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alternate Number</label>
              <input name="alternateNumber" value={profile.alternateNumber} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Residential Address</label>
              <input name="address" value={profile.address} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input name="city" value={profile.city} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input name="state" value={profile.state} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input name="pincode" value={profile.pincode} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input name="country" value={profile.country} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
          </div>
        </section>
        {/* 3. Health Profile */}
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Health Profile <span className="text-xs text-gray-400">(Optional)</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Height (cm)</label>
              <input name="height" value={profile.height} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg)</label>
              <input name="weight" value={profile.weight} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">BMI</label>
              <input value={profile.bmi} readOnly className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Allergies</label>
              <input name="allergies" value={profile.allergies} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Chronic Conditions</label>
              <input name="chronic" value={profile.chronic} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Medications</label>
              <input name="medications" value={profile.medications} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Family Medical History</label>
              <textarea name="familyHistory" value={profile.familyHistory} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
          </div>
        </section>
        <div className="flex justify-end mt-6">
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        {success && <div className="text-green-600 mt-2">Profile updated!</div>}
      </form>
    </div>
  );
};

export default Profile;
