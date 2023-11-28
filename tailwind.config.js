/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        blue: '#173F5F',
        'light-blue': '#E4F0F3',
        gray: '#AEADB3',
        'light-gray': '#EDEDED',
      }
    },
  },
  plugins: [],
};