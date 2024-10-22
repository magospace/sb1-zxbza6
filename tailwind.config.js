/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green': {
          600: '#27AE60',
        },
        'blue': {
          600: '#3498DB',
        },
        'gray': {
          100: '#ECF0F1',
        },
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};