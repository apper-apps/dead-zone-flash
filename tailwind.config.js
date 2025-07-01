/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['Bebas Neue', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#8B0000',
        secondary: '#2F4F4F',
        accent: '#FF6B35',
        surface: '#1A1A1A',
        background: '#0D0D0D',
        success: '#228B22',
        warning: '#FF8C00',
        error: '#DC143C',
        info: '#4682B4',
      },
      animation: {
        'muzzle-flash': 'muzzleFlash 0.1s ease-out',
        'damage-flash': 'damageFlash 0.2s ease-out',
        'reload': 'reload 2s ease-in-out',
      },
      keyframes: {
        muzzleFlash: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(1.5)' }
        },
        damageFlash: {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '0' }
        },
        reload: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' }
        }
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};