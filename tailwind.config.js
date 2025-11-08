/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 15s linear infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-24vh)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(236, 72, 153, 0.8)' },
        },
      }
    },
  },
  plugins: [],
};
