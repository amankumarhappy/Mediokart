/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co', 'auraboxindia.firebasestorage.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'auraboxindia.firebasestorage.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    FIREBASE_API_KEY: "AIzaSyCDVZ-xaUciry_K6VMWV8J5m4sjxLg127g",
    FIREBASE_AUTH_DOMAIN: "auraboxindia.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://auraboxindia-default-rtdb.asia-southeast1.firebasedatabase.app",
    FIREBASE_PROJECT_ID: "auraboxindia",
    FIREBASE_STORAGE_BUCKET: "auraboxindia.firebasestorage.app",
    FIREBASE_MESSAGING_SENDER_ID: "524884475252",
    FIREBASE_APP_ID: "1:524884475252:web:0506689387fab72e964021",
    FIREBASE_MEASUREMENT_ID: "G-TNRBZ01B1N"
  },
}

module.exports = nextConfig