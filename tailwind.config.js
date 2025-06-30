/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
  content: ['./src/**/*.{html,ts}', './node_modules/primeng/**/*.{js,ts}'],
  theme: {
    extend: {}
  },
  plugins: [PrimeUI]
};
