/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      primary:{
        dark:'#131515',
        light:'#FFFFFF',
      },
      Secondary:{
        dark:'#2B2C28',
        light:'#E1E5F2',
      },
      wordSecondary:{
        dark:'#339989',
        light:'#1F7A8C',
      },
      wordPrimary:{
        dark:'#FFFAFB',
        light:'#022B3A',
      },
      accent:{
        dark:'#7DE2D1',
        light:'#BFDBF7',
      }
    }
  },
  plugins: [],
}

