import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          default: '#FFFFFF',
          secondary: '#F9FAFB',
          gradient: 'linear-gradient(135deg, #f6f8fc 0%, #e9eef8 100%)',
          glass: 'rgba(255, 255, 255, 0.7)',
        },
        text: {
          primary: '#101828',
          secondary: '#344054',
          tertiary: '#475467',
          placeholder: '#667085',
        },
        border: {
          primary: '#D0D5DD',
        },
        button: {
          primary: {
            fg: '#FFFFFF',
            bg: '#7F56D9',
            hover: '#6941C6',
            action: '#6941C6',
          },
          secondary: {
            fg: '#344054',
          },
        },
      },
      boxShadow: {
        custom: '0px 4px 15px rgba(0, 0, 0, 0.08)',
        hover: '0px 8px 20px rgba(0, 0, 0, 0.12)',
        glow: '0 0 15px rgba(127, 86, 217, 0.3)',
      },
      fontSize: {
        sm: '14px',
        base: '16px',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale': 'scale 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
