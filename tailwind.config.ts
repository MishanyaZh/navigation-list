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
        custom: '0px 1px 2px 0px #1018280D',
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
    },
  },
  plugins: [],
} satisfies Config;
