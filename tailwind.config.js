/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fontaine: {
          navy: '#0A1628',
          'deep-navy': '#0F1B29',
          'dark-teal': '#1A3A4A',
          teal: '#1A6B8A',
          'mid-teal': '#2E8B9E',
          cyan: '#7EC8E3',
          'light-cyan': '#A4D7DD',
          gold: '#C9A84C',
          'light-gold': '#E3D1B2',
          cream: '#F5F0E8',
        },
        hydro: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
          dark: '#0891B2',
        },
        electro: '#8B5CF6',
        pyro: '#F59E0B',
      },
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        heading: ['"Playfair Display"', 'serif'],
        body: ['Nunito', 'sans-serif'],
      },
      backgroundImage: {
        'fontaine-gradient': 'linear-gradient(135deg, #0A1628 0%, #0F1B29 25%, #1A3A4A 50%, #0F1B29 75%, #0A1628 100%)',
        'fontaine-card': 'linear-gradient(135deg, rgba(15,27,41,0.8) 0%, rgba(26,58,74,0.6) 100%)',
        'gold-border': 'linear-gradient(135deg, #C9A84C, #E3D1B2, #C9A84C)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'drift': 'drift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(126, 200, 227, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(126, 200, 227, 0.6)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(10px, -10px)' },
          '50%': { transform: 'translate(-5px, -15px)' },
          '75%': { transform: 'translate(-10px, 5px)' },
        },
      },
    },
  },
  plugins: [],
}
