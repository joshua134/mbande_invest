/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // deep blue
        secondary: '#2563EB', // bright blue
        accent: '#3B82F6', // light blue
        dark: '#1F2937',
        light: '#F3F4F6'
      },
      fontFamily:{
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

