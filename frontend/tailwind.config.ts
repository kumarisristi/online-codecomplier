import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Site chrome (light theme, OneCompiler-style)
        brand: {
          DEFAULT: "#4361ee",
          dark: "#3450d9",
          light: "#eef1fe",
        },
        ink: "#1b2340",
        muted: "#5b6478",
        line: "#e7e9f2",
        surface: "#f7f8fc",
        // IDE-only dark workspace tokens (used inside /compiler editor pane)
        ide: {
          bg: "#1e1e1e",
          panel: "#252526",
          border: "#3c3c3c",
          text: "#d4d4d4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 24, 47, 0.04), 0 1px 1px rgba(20,24,47,0.03)",
        cardHover: "0 8px 20px rgba(67, 97, 238, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
