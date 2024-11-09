/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
        animation: {
          'loop-scroll': 'loop-scroll 30s linear infinite',
          'swing': 'swing 1.5s ease-in-out'
        },
        keyframes: {
          'loop-scroll': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(-50%)' },
          },
          'swing':{
            "0%": { transform:' rotate(0deg)' },
            "10%": { transform:' rotate(-7.5deg)' },
            "25%": { transform: 'rotate(5deg)' }, 
            "57%": { transform: 'rotate(-2.5deg) '}, 
            "100%": { transform: 'rotate(0deg)' } 
          }
        }     
      },
  },
  plugins: []
};