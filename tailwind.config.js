/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0c',
          800: '#111114',
          700: '#1a1a1e',
          600: '#2a2a30'
        },
        primary: {
          500: '#3b82f6',
          600: '#2563eb'
        },
        accent: {
          success: '#10b981',
          danger: '#ef4444',
          warning: '#f59e0b'
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
