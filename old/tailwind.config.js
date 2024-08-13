/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px DimGrey',
        DEFAULT: '0 2px 4px DimGrey',
        lg: '0 0px 20px DimGrey',
    },},
  },
  plugins: [ 
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),],
}
