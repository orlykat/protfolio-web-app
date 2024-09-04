/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
        animation: {
          'loop-scroll': 'loop-scroll 40s linear infinite',
        },
        keyframes: {
          'loop-scroll': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(-100%)' },
          }
        }     
      },
  },
  plugins: []
};