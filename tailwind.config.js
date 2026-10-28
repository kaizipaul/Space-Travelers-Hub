/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08090b',
          900: '#0d0f12',
          800: '#13161a',
          700: '#1a1e23',
        },
        line: '#232830',
        accent: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        launch: {
          '0%': { opacity: '1', transform: 'translate(0, 0) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(4rem, -12rem) scale(1.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
        launch: 'launch 1s ease-in forwards',
        shimmer: 'shimmer 1.6s linear infinite',
        blink: 'blink 1.1s steps(1) infinite',
      },
    },
  },
  plugins: [],
};
