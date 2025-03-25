/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        playfair: ['"Playfair Display"', 'serif'],
        cabin: ['"Cabin"', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
