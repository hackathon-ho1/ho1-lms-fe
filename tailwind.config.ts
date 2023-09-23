/** @type {import('tailwindcss').Config} */
/* eslint-disable import/no-extraneous-dependencies */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: false,
  mode: 'jit',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    container: {
      center: true,
    },
    colors: {
      ...colors,
    },
  },
  plugins: [],
};
