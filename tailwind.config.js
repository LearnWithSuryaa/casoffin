/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        ghostFloat: {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 25px rgba(255, 0, 0, 0.8)' },
          '50%': { boxShadow: '0 0 35px rgba(255, 0, 0, 1)' },
        },
      },
      animation: {
        ghostFloat: 'ghostFloat 4s ease-in-out infinite',
        wave: 'wave 2s ease-in-out infinite',
        glow: 'glow 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}