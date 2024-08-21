import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'evmos-primary': '#ff8c5f',
        'evmos-primary-light': '#ffdbcf',
        'evmos-darkish': '#26211f',
        'evmos-dark': '#1c1716',
        'evmos-light': '#D8C2BB',
        'evmos-lightish': '#b4a9a5',
        success: {
          dark: '#9BD679',
          light: '#366A1A',
        },
        'evmos-secondary': '#55377b',
      },
    },
  },
  plugins: [],
};
export default config;
