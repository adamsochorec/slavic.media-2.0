/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/"],
  content: ["./index.html", "./src/assets/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: true,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
