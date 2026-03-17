/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Crimson Text"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      colors: {
        // DATATORII — Data Colors
        teal:   { DEFAULT: '#4ABAAD', light: '#92D6CE', dark: '#2E8A80' },
        coral:  { DEFAULT: '#D67145', light: '#E6AA8F', dark: '#A8532E' },
        crimson:{ DEFAULT: '#B14B4B', light: '#D09393' },
        amber:  { DEFAULT: '#E6D77F', light: '#F0E7B2' },
        azure:  { DEFAULT: '#72A1D7', light: '#A6C3E3' },
        violet: { DEFAULT: '#D492DD', light: '#E5BEEB' },
        // DATATORII — Foreground/Background
        ink:    { DEFAULT: '#2C2C2C', mid: '#686868', soft: '#A4A4A4' },
        paper:  { DEFAULT: '#FFFFFF', warm: '#F5F3EE', neutral: '#EAEAEA' },
        // DATATORII — Text
        tx:     { title: '#181818', label: '#4A4A4A', light: '#868686' },
        // DATATORII — Lines
        line:   { light: '#C5C3C2', dark: '#303030' },
      },
      fontSize: {
        'bigger-kpi': ['36px', { lineHeight: '1', fontWeight: '700' }],
        'kpi':        ['24px', { lineHeight: '1.1', fontWeight: '700' }],
        'large-title':['20px', { lineHeight: '1.3', fontWeight: '700' }],
        'title':      ['18px', { lineHeight: '1.4', fontWeight: '400' }],
        'big-label':  ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'large-label':['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label':      ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        'small-label':['10px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        'panel': '14px',
        'inner': '8px',
      },
      spacing: {
        'gutter': '20px',
        'inner':  '16px',
      },
    },
  },
  plugins: [],
}
