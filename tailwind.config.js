/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const themeColors = {
  background: '#FFFFFF',
  blue: '#173F5F',
  'light-blue': '#E4F0F3',
  gray: '#AEADB3',
  'light-gray': '#EDEDED',
}
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background': `${themeColors.background}`,
        'blue': `${themeColors.blue}`,
        'light-blue': `${themeColors['light-blue']}`,
        'gray': `${themeColors.gray}`,
        'light-gray': `${themeColors['light-gray']}`,
      }
    },
  },
  plugins: [],
  themeColors
}