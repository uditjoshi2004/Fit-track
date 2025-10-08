/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Add this line
  content: [
    "./src/**/*.{html,ts}", // This line is the important one!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

