/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily: {
      heading: ['Poppins', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    extend: {
      colors: {
        'text': 'var(--text)',
        'text-10': 'var(--text-10)',
        'text-20': 'var(--text-20)',
        'text-30': 'var(--text-30)',
        'text-40': 'var(--text-40)',
        'text-50': 'var(--text-50)',
        'text-60': 'var(--text-60)',
        'text-70': 'var(--text-70)',
        'text-80': 'var(--text-80)',
        'text-90': 'var(--text-90)',
        'background': 'var(--background)',
        'button-primary-text': 'var(--button-primary-text)',
        'button-secondary-text': 'var(--button-secondary-text)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        'primary-10': 'var(--primary-10)',
        'primary-20': 'var(--primary-20)',
        'primary-30': 'var(--primary-30)',
        'primary-40': 'var(--primary-40)',
        'primary-50': 'var(--primary-50)',
        'primary-60': 'var(--primary-60)',
        'primary-70': 'var(--primary-70)',
        'primary-80': 'var(--primary-80)',
        'primary-90': 'var(--primary-90)',
        'secondary-10': 'var(--secondary-10)',
        'secondary-20': 'var(--secondary-20)',
        'secondary-30': 'var(--secondary-30)',
        'secondary-40': 'var(--secondary-40)',
        'secondary-50': 'var(--secondary-50)',
        'secondary-60': 'var(--secondary-60)',
        'secondary-70': 'var(--secondary-70)',
        'secondary-80': 'var(--secondary-80)',
        'secondary-90': 'var(--secondary-90)',
        'accent-10': 'var(--accent-10)',
        'accent-20': 'var(--accent-20)',
        'accent-30': 'var(--accent-30)',
        'accent-40': 'var(--accent-40)',
        'accent-50': 'var(--accent-50)',
        'accent-60': 'var(--accent-60)',
        'accent-70': 'var(--accent-70)',
        'accent-80': 'var(--accent-80)',
        'accent-90': 'var(--accent-90)',
      },
    },
  },
  plugins: [],
}