import { saveUserProfile } from '../firebase/userProfile';

const testUserProfile = async () => {
  const userId = "testUserId"; // Replace with actual user ID
  const userData = {
    username: "Aman Kumar Happy",
    email: "john.doe@example.com",
    phone: "1234567890",
    age: 18,
    gender: "Male",
    city: "Delhi",
    state: "Tamil Nadu",
    allergies: "peanuts, dairy",
    healthConditions: "asthma",
    profileImage: "https://example.com/profile.jpg"
  };

  await saveUserProfile(userId, userData);
  console.log("User profile saved successfully.");
};

testUserProfile(); 