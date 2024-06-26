/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: "#E4E4E4",
        mainb: "#110000",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
