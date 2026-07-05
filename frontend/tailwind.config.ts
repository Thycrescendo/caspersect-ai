import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        casper: '#ff473e',
        midnight: '#111827'
      }
    }
  },
  plugins: []
};

export default config;
