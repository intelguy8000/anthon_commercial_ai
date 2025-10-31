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
        primary: {
          DEFAULT: '#DC2626', // Loopera red
          dark: '#B91C1C',
        },
        secondary: {
          DEFAULT: '#1E293B',
          80: 'rgba(30, 41, 59, 0.8)',
          70: 'rgba(30, 41, 59, 0.7)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
