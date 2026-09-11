import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dusk: {
          950: "#0B1F2A",
          900: "#0F2A3A",
          800: "#153A4E",
          700: "#1D4E63"
        },
        river: {
          500: "#1B7A8C",
          400: "#2C9CAE",
          300: "#6FC2CE"
        },
        sandbar: {
          100: "#F3ECDA",
          200: "#EAE0C6"
        },
        alert: {
          red: "#C6402F",
          redDark: "#9E2E20",
          green: "#237A4B",
          greenDark: "#175C38",
          amber: "#D69A2D"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        panel: "0 1px 0 rgba(255,255,255,0.06) inset, 0 8px 24px rgba(4,14,20,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
