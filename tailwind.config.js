/** @type {import('tailwindcss').Config} */
import remToPxPlugin from 'tailwindcss-rem-to-px';

module.exports = {
  content: [
    "./**/*.{js,json,liquid}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    remToPxPlugin({
      baseFontSize: 16,
    })
  ],
}
