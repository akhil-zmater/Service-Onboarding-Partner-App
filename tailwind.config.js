/** @type {import('tailwindcss').Config} */

// const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bluegrad:
          "linear-gradient(to right, rgba(21,79,187,1), rgba(28,73,151,1))",
      },
      colors: {
        white: "rgba(255, 255, 255, 1)",
        border: "rgba(190, 190, 190, 1)",
        gray: "rgba(73, 69, 79, 1)",
        black: "rgba(34, 34, 34, 1)",
        ipcol: "rgba(73, 69, 79, 1)",
        red: "rgba(204, 41, 41, 1)",
        slate: "rgba(242, 244, 247, 1)",
        blue: "rgba(24, 75, 165, 1)",
        green: "rgba(11, 158, 15, 1)",
        borderblue: "rgba(219, 232, 255, 1)",
        background: "rgba(115, 115, 115, 1)",
        yellow: "rgba(212,130,14,1)",
        prim: "rgba(22,22,22,1)",
        whh: "rgba(242,244,247,1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
