/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Editorial neutrals - the canvas the whole system sits on. */
        ink: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d6d6da',
          300: '#b2b2ba',
          400: '#87878f',
          500: '#6b6b73',
          600: '#55555c',
          700: '#3f3f45',
          800: '#28282d',
          900: '#161619',
          950: '#0b0b0d',
        },
        paper: {
          50: '#fdfcfa',
          100: '#f7f4ef',
          200: '#efeae1',
          300: '#e2dbcd',
          400: '#cec4b1',
          500: '#b4a68d',
        },
        /* Existing brand green + earth are preserved so no page breaks. */
        agro: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        earth: {
          50: '#fbf7ee',
          100: '#f5ebd2',
          200: '#edd6a6',
          300: '#e3bc74',
          400: '#daa24a',
          500: '#c5842c',
          600: '#aa6522',
          700: '#874a1e',
          800: '#6f3c1e',
          900: '#5c321c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Archivo', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        /* Fluid editorial scale - typography is the primary visual element. */
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em', fontWeight: '600' }],
        'display-1': ['clamp(3rem, 9vw, 9.5rem)', { lineHeight: '0.88', letterSpacing: '-0.04em' }],
        'display-2': ['clamp(2.25rem, 6.4vw, 5.75rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'display-3': ['clamp(1.875rem, 4.4vw, 3.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-4': ['clamp(1.5rem, 2.8vw, 2.25rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        numeral: ['clamp(2.75rem, 7vw, 6.5rem)', { lineHeight: '0.86', letterSpacing: '-0.05em' }],
        lede: ['clamp(1rem, 1.25vw, 1.1875rem)', { lineHeight: '1.65' }],
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4vw, 4.5rem)',
        section: 'clamp(4.5rem, 11vw, 10rem)',
        'section-sm': 'clamp(3rem, 7vw, 6rem)',
      },
      maxWidth: {
        editorial: '96rem',
        measure: '38ch',
        'measure-lg': '56ch',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wave: 'wave 1.5s ease-in-out infinite',
        indeterminate: 'indeterminate 1.4s ease-in-out infinite',
        marquee: 'marquee 42s linear infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1.2)' },
        },
        /* Was referenced by the splash screen but never defined. */
        indeterminate: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
