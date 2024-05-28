import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      content: {},
      colors: {
        background: "rgb(var(--background-rgb))",
        foreground: "rgb(var(--foreground-rgb))",
        foregroundMuted: "rgb(var(--foreground-muted-rgb))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fade: {
          "0%": {
            transform: "translateY(5%)",
            opacity: "0",
          },
          "50%": {
            opacity: "0.3",
          },
          "100%": {
            transform: "translateY(0%)",
            opacity: "1",
          },
        },
      },
      animation: {
        fadeIn: "fade 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
