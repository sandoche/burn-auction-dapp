import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "evmos-darkish": "#26211f",
        "evmos-dark": "#1c1716",
        "evmos-light": "#D8C2BB",
      },
    },
  },
  plugins: [],
};
export default config;
