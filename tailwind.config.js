/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Custom colors if needed
          'dark-bg': '#121212',
          'section-bg': '#1a1a1a',
        },
        fontFamily: {
          // Custom fonts
          'inter': ['Inter', 'system-ui', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }