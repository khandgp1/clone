/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B8975F',
          light: '#CEB07A',
          dark: '#9A7A48',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          nav: '#2a2a2a',
          section: '#222222',
        },
        cream: {
          DEFAULT: '#F9F9F9',
          warm: '#F4F1EB',
        },
        body: '#333333',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      maxWidth: {
        '8xl': '1440px',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
};
