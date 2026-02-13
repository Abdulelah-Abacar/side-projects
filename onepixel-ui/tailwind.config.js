import { color } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#101010 ",
        secondary: "#F1F1F1",
        Accent: "#A5FF15",
      },
      keyframes: {
        horizontalScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        shrink: {
          "0%, 20%": {
            // Pause at normal size for 20% of the duration
            transform: "scale(1)",
            color: "#A5FF15",
          },
          "50%, 70%": {
            // Scale down and pause at smaller size
            transform: "scale(0.75)",
            color: "gray",
          },
          "100%": {
            // Return to normal size
            transform: "scale(1)",
            color: "#A5FF15",
          },
        },
      },
      animation: {
        horizontalScroll:
          "horizontalScroll var(--speed) linear infinite backwards",
        shrink: "shrink 5s infinite",
      },
      fontFamily: {
        lato: "Lato",
        archivoBlack: "Archivo Black",
        noto: "Noto Sans Arabic",
        cairo: "Cairo",
      },
    },
  },
  plugins: [],
};
