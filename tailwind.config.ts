import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        ink: {
          950: '#05060A',
          900: '#0A0B12',
          800: '#10121C',
          700: '#171A27',
          600: '#1F2333',
        },
        // Brand / accents
        brand: {
          50: '#EEF4FF',
          100: '#D9E5FF',
          200: '#B3CBFF',
          300: '#80A9FF',
          400: '#4D87FF',
          500: '#2E6BFF',
          600: '#1F56E5',
          700: '#1A44BA',
          800: '#193A96',
          900: '#18327A',
        },
        accent: {
          violet: '#8B5CF6',
          cyan: '#22D3EE',
          emerald: '#34D399',
          pink: '#F472B6',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-1': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'display-2': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-3': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'gradient-hero':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(46,107,255,0.25), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(139,92,246,0.2), transparent 60%), linear-gradient(180deg, #05060A 0%, #0A0B12 100%)',
        'gradient-brand': 'linear-gradient(135deg, #2E6BFF 0%, #8B5CF6 50%, #22D3EE 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(46,107,255,0.15) 0%, rgba(139,92,246,0.08) 100%)',
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(46,107,255,0.5), 0 0 80px -20px rgba(139,92,246,0.3)',
        'glow-sm': '0 0 20px -5px rgba(46,107,255,0.4)',
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 10px 40px -10px rgba(0,0,0,0.5)',
      },
      animation: {
        'scroll-x': 'scroll-x 40s linear infinite',
        'scroll-x-slow': 'scroll-x 60s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shine': 'shine 3s linear infinite',
      },
      keyframes: {
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
