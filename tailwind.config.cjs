/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: "Outfit"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

module.exports = config;
