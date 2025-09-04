/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#a21caf', // fuchsia-800
        secondary: '#c026d3', // fuchsia-600 for a nice gradient
        accent: '#F3E8FF', // light fuchsia background
        background: '#F9FAFB',
      },
    },
  },
  plugins: [],
};
