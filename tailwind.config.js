/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981', 
        accent: '#8B5CF6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif', 'Roboto'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

