/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      charcoal: "#003049",
      honeyyellow: "#F6AE2D",
      darksky: "#86BBD8",
      queenblue: "#33658A",
      orangered: "#F26419",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
