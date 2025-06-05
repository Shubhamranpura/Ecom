import { transform } from 'motion';

/** @type {import('tailwindcss').Config} */
export default {

  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      keyframes: {
        appear: {
          from: {
            opacity: '0',
            transform: 'translateX(-150px)',
             
          },
          to: {
            opacity: '1',
            transform:'translateX(0px)',

          },
        },
      },
      animation: {
        appear: 'appear 1.5s ease-out forwards', 
      },
    },
  },
  plugins: [],
}