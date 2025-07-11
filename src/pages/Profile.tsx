import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const bloodGroups = [
  '', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];
const genders = ['', 'Male', 'Female', 'Other'];

const Profile: React.FC = () => {
  const { currentUser, userData } = useAuth();
  const [profile, setProfile] = useState({
    fullName: userData?.displayName || '',
    gender: userData?.gender || '',
    dob: userData?.dob || '',
    age: '',
    bloodGroup: userData?.bloodGroup || '',
    emergencyContactName: userData?.emergencyContactName || '',
    emergencyContactNumber: userData?.emergencyContactNumber || '',
    email: userData?.email || '',
    phoneNumber: userData?.phoneNumber || '',
    alternateNumber: userData?.alternateNumber || '',
    address: userData?.address || '',
    city: userData?.city || '',
    state: userData?.state || '',
    pincode: userData?.pincode || '',
    country: userData?.country || '',
    height: userData?.height || '',
    weight: userData?.weight || '',
    bmi: '',
    allergies: userData?.allergies || '',
    chronic: userData?.chronic || '',
    medications: userData?.medications || '',
    familyHistory: userData?.familyHistory || ''
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

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
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, profile);
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
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
              <input name="fullName" value={profile.fullName} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select name="gender" value={profile.gender} onChange={handleChange} className="w-full border rounded px-3 py-2">
                {genders.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input type="date" name="dob" value={profile.dob} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input value={profile.age} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Blood Group</label>
              <select name="bloodGroup" value={profile.bloodGroup} onChange={handleChange} className="w-full border rounded px-3 py-2">
                {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Emergency Contact Name</label>
              <input name="emergencyContactName" value={profile.emergencyContactName} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Emergency Contact Number</label>
              <input name="emergencyContactNumber" value={profile.emergencyContactNumber} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        </section>
        {/* 2. Contact Information */}
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input name="email" value={profile.email} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile Number</label>
              <input name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alternate Number</label>
              <input name="alternateNumber" value={profile.alternateNumber} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Residential Address</label>
              <input name="address" value={profile.address} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input name="city" value={profile.city} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input name="state" value={profile.state} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input name="pincode" value={profile.pincode} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input name="country" value={profile.country} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        </section>
        {/* 3. Health Profile */}
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Health Profile <span className="text-xs text-gray-400">(Optional)</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Height (cm)</label>
              <input name="height" value={profile.height} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg)</label>
              <input name="weight" value={profile.weight} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">BMI</label>
              <input value={profile.bmi} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Allergies</label>
              <input name="allergies" value={profile.allergies} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Chronic Conditions</label>
              <input name="chronic" value={profile.chronic} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Medications</label>
              <input name="medications" value={profile.medications} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Family Medical History</label>
              <textarea name="familyHistory" value={profile.familyHistory} onChange={handleChange} className="w-full border rounded px-3 py-2" />
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
