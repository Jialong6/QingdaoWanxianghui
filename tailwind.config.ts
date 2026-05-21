import type { Config } from 'tailwindcss'

/**
 * 与 design.md §1 Design Tokens 完全同步
 * 任何 token 改动需先改 design.md，再回填这里
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px'
    },
    extend: {
      colors: {
        primary: {
          50: 'hsl(212 30% 96%)',
          100: 'hsl(212 30% 90%)',
          200: 'hsl(212 30% 80%)',
          300: 'hsl(212 30% 65%)',
          400: 'hsl(212 30% 50%)',
          500: 'hsl(212 50% 35%)',
          600: 'hsl(212 55% 28%)',
          700: 'hsl(212 60% 22%)',
          800: 'hsl(212 65% 16%)',
          900: 'hsl(212 70% 10%)',
          DEFAULT: 'hsl(212 50% 35%)'
        },
        neutral: {
          0: '#FFFFFF',
          50: '#FAFAF7',
          100: '#F2F2EE',
          200: '#E0E0DA',
          300: '#C2C2BC',
          400: '#9A9A93',
          500: '#6B6B66',
          600: '#4A4A45',
          700: '#2D2D2A',
          800: '#1A1A18',
          900: '#0F0F0E'
        },
        accent: {
          50: '#FFF6EC',
          100: '#FFE3C2',
          500: '#F4A04E',
          600: '#E08B36',
          700: '#B86B1F',
          DEFAULT: '#F4A04E'
        },
        craft: {
          paper: '#F5EFE3',
          leather: '#8B6F47',
          thread: '#D2B68C',
          ink: '#1F1B16'
        },
        success: '#2D8A5C',
        warning: '#D4A93D',
        error: '#C0443C',
        info: '#4A7CA8'
      },
      fontFamily: {
        'jp-sans': [
          'Noto Sans JP',
          'Hiragino Sans',
          'Yu Gothic UI',
          'Meiryo UI',
          'Hiragino Kaku Gothic ProN',
          'system-ui',
          'sans-serif'
        ],
        'jp-serif': [
          'Noto Serif JP',
          'YuMincho',
          'Yu Mincho',
          'Hiragino Mincho ProN',
          'serif'
        ],
        'en-sans': ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        'en-serif': ['Source Serif Pro', 'Georgia', 'serif'],
        'zh-sans': ['PingFang SC', 'Microsoft YaHei UI', '微软雅黑', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Source Code Pro', 'monospace']
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1.2' }],
        xs: ['0.75rem', { lineHeight: '1.4' }],
        sm: ['0.8125rem', { lineHeight: '1.6' }],
        base: ['0.9375rem', { lineHeight: '1.8' }],
        lg: ['1.0625rem', { lineHeight: '1.75' }],
        xl: ['1.1875rem', { lineHeight: '1.5' }],
        '2xl': ['1.375rem', { lineHeight: '1.4' }],
        '3xl': ['1.625rem', { lineHeight: '1.4' }],
        '4xl': ['1.875rem', { lineHeight: '1.3' }],
        '5xl': ['2.25rem', { lineHeight: '1.2' }],
        '6xl': ['2.75rem', { lineHeight: '1.1' }],
        display: ['3.5rem', { lineHeight: '1' }]
      },
      letterSpacing: {
        'jp-body': '0.05em',
        'jp-heading': '0.02em',
        'en-cap': '0.2em',
        'en-heading': '-0.01em'
      },
      spacing: {
        '0.5': '0.125rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem'
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1200px',
        'container-2xl': '1440px',
        'container-prose': '720px',
        'container-narrow': '880px'
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px'
      },
      boxShadow: {
        xs: '0 1px 2px hsla(212, 30%, 20%, 0.04)',
        sm: '0 2px 4px hsla(212, 30%, 20%, 0.06)',
        DEFAULT: '0 4px 12px hsla(212, 30%, 20%, 0.08)',
        md: '0 8px 24px hsla(212, 30%, 20%, 0.10)',
        lg: '0 16px 40px hsla(212, 30%, 20%, 0.12)',
        xl: '0 24px 64px hsla(212, 30%, 20%, 0.14)',
        inset: 'inset 0 1px 2px hsla(212, 30%, 20%, 0.06)',
        focus: '0 0 0 3px hsla(212, 50%, 35%, 0.20)'
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)'
      },
      transitionDuration: {
        instant: '50ms',
        fast: '150ms',
        base: '250ms',
        slow: '400ms',
        slower: '600ms'
      },
      zIndex: {
        base: '0',
        dropdown: '10',
        sticky: '20',
        fixed: '30',
        'modal-bg': '40',
        modal: '50',
        toast: '60',
        tooltip: '70'
      },
      animation: {
        'fade-in': 'fadeIn 400ms cubic-bezier(0, 0, 0.2, 1) both',
        'fade-in-up': 'fadeInUp 400ms cubic-bezier(0, 0, 0.2, 1) both',
        'slide-in-right': 'slideInRight 250ms cubic-bezier(0.4, 0, 0.2, 1) both'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      }
    }
  },
  plugins: []
}

export default config
