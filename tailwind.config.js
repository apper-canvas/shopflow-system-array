/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        success: '#51CF66',
        warning: '#FFB84D',
        error: '#FF6B6B',
        info: '#4ECDC4',
        surface: '#FFFFFF',
        background: '#F7F7F7'
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      borderRadius: {
        '4': '1rem',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'header': '0 2px 8px rgba(0, 0, 0, 0.04)'
      },
      animation: {
        'bounce-cart': 'bounce 0.6s ease-in-out',
        'pulse-count': 'pulse 0.3s ease-in-out'
      }
    },
  },
  plugins: [],
}