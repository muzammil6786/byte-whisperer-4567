/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      primary:{
        dark:'#131515',
        light:'#FFFCF2',
      },
      Secondary:{
        dark:'#2B2C28',
        light:'#CCC5B9',
      },
      wordSecondary:{
        dark:'#339989',
        light:'#403D39',
      },
      wordPrimary:{
        dark:'#FFFAFB',
        light:'#252422',
      },
      accent:{
        dark:'#7DE2D1',
        light:'#EB5E28',
      }
    }
  },
  plugins: [],
}

