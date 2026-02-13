/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      animation: {
        spin: "spin 30s linear infinite",
      },
      colors: {
        whitesmoke: "#f4f4f4",
        darkslategray: "#353535",
        dimgray: {
          100: "#626262",
          200: "#5c5c5c",
          300: "rgba(92, 92, 92, 0.09)",
          500: "#B9B9B9",
        },
        gray: "rgba(32, 32, 32, 0.8)",
        black: "#000",
        orange1: "#e8c696",
        blue4: "#9cfffc",
        blue2: "#74b4da",
        blue1: "#d6e8f4",
        blue3: "#10367d",
        pink: "#fe0046",
        "txt-blue2-l": "#e7fffe",
        blue5: "#484ac3",
      },
      spacing: {
        2.5: "5px",
        3.75: "10px",
      },
      fontFamily: {
        manrope: "Manrope",
      },
      borderRadius: {
        "8xs": "5px",
        "31xl": "50px",
        "81xl": "100px",
      },
    },
    fontSize: {
      "6xl": "25px",
      xl: "20px",
      base: "16px",
      "21xl": "40px",
      "5xl": "24px",
      "13xl": "32px",
      "11xl": "30px",
      lg: "18px",
      inherit: "inherit",
    },
    screens: {
      mq1100: {
        raw: "screen and (max-width: 1100px)",
      },
      mq1025: {
        raw: "screen and (max-width: 1025px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq560: {
        raw: "screen and (max-width: 560px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
