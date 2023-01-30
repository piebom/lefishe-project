/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "indexbg": "url('/background.png')"
      },
      boxShadow: {
        '3xl': '0px 4px 32px 8px rgba(250, 249, 246, 0.075)',
      }
    },
  },
  plugins: [],
};
