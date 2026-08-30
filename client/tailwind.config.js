/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        // Primary brand colors
        primary: '#5A2850',
        'primary-dull': '#3D1A34',

        // Accent colors
        'accent-mauve': '#B98BAA',
        'accent-rose': '#D9B8C4',
        'accent-gold': '#D8B56A',

        // Text colors
        'text-dark': '#292027',

        // Background colors
        'bg-cream': '#FFF8ED',
        'bg-ivory': '#FFFDF8',
        'bg-pale-plum': '#E8D6E2',
      },
    },
  },
  plugins: [],
}
