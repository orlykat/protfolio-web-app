/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
        animation: {
          'loop-scroll': 'loop-scroll 40s linear infinite',
          'swing': 'swing 2.5s linear'
        },
        keyframes: {
          'loop-scroll': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(-100%)' },
          },
          'swing':{
            "0%": { transform: 'rotate(-15deg)' },
            "20%": { transform: 'rotate(12.5deg)' },
            "40%": { transform:' rotate(-10deg)' },
            "60%": { transform: 'rotate(7.5deg)' }, 
            "80%": { transform: 'rotate(-5deg) '}, 
            "100%": { transform: 'rotate(0deg)' } 
          }
        }     
      },
  },
  plugins: []
};