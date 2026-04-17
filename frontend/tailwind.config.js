/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",      // Angular components
    "./node_modules/primeng/**/*.{js,ts,css}", // PrimeNG utilities
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-primeui')
  ],
};
