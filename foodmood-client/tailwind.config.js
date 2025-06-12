/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "green":"#ADD899",
        "red":"#BC5A94",
        "secondary":"#555",
        "primaryBG":"#FCFCFC"
      }
    },
  },
  plugins: [require('daisyui')],
}

