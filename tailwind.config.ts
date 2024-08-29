// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/burn-auction-dapp/blob/main/LICENSE)

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'evmos-orange': {
          400: '#d45710',
          500: '#d04b00',
        },
        'evmos-primary': '#ff8c5f',
        'evmos-primary-light': '#ffdbcf',
        'evmos-darkish-less': '#302b29',
        'evmos-darkish': '#26211f',
        'evmos-dark': '#1c1716',
        'evmos-light': '#D8C2BB',
        'evmos-lightish': '#b4a9a5',
        success: {
          dark: '#9BD679',
          light: '#366A1A',
        },
        'evmos-secondary': '#55377b',
        'evmos-secondary-dark': '#55397b',
        'evmos-error': '#e05c4e',
        'evmos-success': '#8ec876',
        'evmos-gray': '#3a271c',
        'evmos-gray-light': '#665f5b',
      },
      divideWidth: {
        DEFAULT: '1.5px',
      },
    },
  },
  plugins: [],
};
export default config;
