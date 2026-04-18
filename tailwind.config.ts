import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'vice-black': '#000000',
        'vice-dark': '#111111',
        'vice-pink': '#FF1493',
        'vice-blue': '#00CED1',
        'vice-purple': '#B026FF',
        'vice-yellow': '#FFD23F',
      },
      fontFamily: {
        'bebas': ['Bebas Neue', 'system-ui', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
