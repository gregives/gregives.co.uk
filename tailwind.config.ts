import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./mdx-components.tsx",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./markdown/**/*.{js,ts,jsx,tsx,mdx}",
    "./utilities/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "radial-gradient-t":
          "radial-gradient(50% 80% at top, var(--tw-gradient-stops))",
        "radial-gradient-b":
          "radial-gradient(50% 100% at bottom, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};

export default config;
