/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
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
