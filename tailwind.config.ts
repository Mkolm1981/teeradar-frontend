/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'tee-green': '#0A1F0E',
          'tee-gold': '#C9A050',
          'tee-sand': '#F5EDD6',
          'tee-white': '#FAFAF5',
          'tee-gold-light': '#E0BF7A',
          'tee-green-light': '#132B17',
        },
        fontFamily: {
          serif: ['"Playfair Display"', 'Georgia', 'serif'],
          sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }