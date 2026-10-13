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
        ink: '#0B0B0D',
        panel: '#141417',
        'panel-2': '#1C1C21',
        line: 'rgba(255,255,255,0.09)',
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'Impact', 'system-ui', 'sans-serif'],
        rajdhani: ['var(--font-rajdhani)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        site: '80rem',
      },
    },
  },
  plugins: [],
};

export default config;
