/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors')

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        'btn-orange': '#e06915',
        'bg-login': 'rgba(214, 40, 31, 0.6)',
        'courses-gray': 'rgb(232, 232, 232)'
      },
      backgroundImage: {
        'image-login': "url('/assets/background.png')",
        'eye': "url('/assets/eye.png')",
        'eye-slash': "url('/assets/eye-slash.png')",
      },
      fontSize: {
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
});

