import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./mdx-components.tsx",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./markdown/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};

export default config;