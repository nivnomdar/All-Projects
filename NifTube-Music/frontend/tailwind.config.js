import colors from "tailswindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: colors.netural[200],
          hover: colors.netural[300],
          border: colors.netural[400],
          text: colors.netural[500],
          dark: colors.netural[800],
          ["dark-hover"]: colors.netural[900],
        },
      },
    },
  },
  plugins: [],
};
