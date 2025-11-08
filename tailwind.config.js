/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        glowIcon: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 6px #ef4444) drop-shadow(0 0 12px #ef4444)',
          },
          '50%': {
            filter: 'drop-shadow(0 0 12px #f87171) drop-shadow(0 0 20px #fca5a5)',
          },
        },
      },
      animation: {
        glowIcon: 'glowIcon 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
