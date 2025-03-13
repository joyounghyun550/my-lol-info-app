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
        "gold-light": "#f0e6d2",
        "lol-blue": "#0ac8b9",
        "lol-red": "#d01829",
        "lol-dark": "#010a13",
        gold: "#c8aa6e",
      },
    },
    fontFamily: {
      beaufort: ['"Beaufort for LOL"', "serif"],
      spiegel: ["Spiegel", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
